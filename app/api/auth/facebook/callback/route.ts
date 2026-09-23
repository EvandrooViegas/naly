import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { sql, initDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    console.error("Facebook OAuth error:", error, searchParams.get("error_description"));
    return NextResponse.redirect(new URL("/?facebook=error", req.url));
  }

  const appId = process.env.FACEBOOK_APP_ID!;
  const appSecret = process.env.FACEBOOK_APP_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`;

  // 1. Exchange code for short-lived token
  const tokenRes = await fetch(
    `https://graph.facebook.com/v21.0/oauth/access_token?` +
      new URLSearchParams({
        client_id: appId,
        client_secret: appSecret,
        redirect_uri: redirectUri,
        code,
      })
  );

  if (!tokenRes.ok) {
    console.error("Facebook token exchange failed:", await tokenRes.text());
    return NextResponse.redirect(new URL("/?facebook=error", req.url));
  }

  const { access_token: shortToken } = await tokenRes.json();

  // 2. Exchange for long-lived token (~60 days)
  const longTokenRes = await fetch(
    `https://graph.facebook.com/v21.0/oauth/access_token?` +
      new URLSearchParams({
        grant_type: "fb_exchange_token",
        client_id: appId,
        client_secret: appSecret,
        fb_exchange_token: shortToken,
      })
  );

  const longTokenData = await longTokenRes.json();
  const accessToken: string = longTokenData.access_token ?? shortToken;
  const expiresIn: number = longTokenData.expires_in ?? 5183944;
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  // 3. Get the user's Facebook Pages (we track the first page they manage)
  const pagesRes = await fetch(
    `https://graph.facebook.com/v21.0/me/accounts?fields=id,name,picture&access_token=${accessToken}`
  );

  if (!pagesRes.ok) {
    console.error("Failed to fetch Facebook pages:", await pagesRes.text());
    return NextResponse.redirect(new URL("/?facebook=error", req.url));
  }

  const pagesData = await pagesRes.json();
  const pages: Array<{ id: string; name: string; picture?: { data: { url: string } } }> =
    pagesData.data ?? [];

  if (pages.length === 0) {
    return NextResponse.redirect(new URL("/?facebook=no_pages", req.url));
  }

  // Use the first page. In the future we can let users pick.
  const page = pages[0];
  const accountId = `facebook-${page.id}`;
  const profilePicture = page.picture?.data?.url ?? null;

  await initDb();
  await sql`
    INSERT INTO connected_accounts
      (id, user_id, platform, username, display_name, profile_picture,
       access_token, token_expires_at, platform_user_id)
    VALUES
      (${accountId}, ${userId}, 'facebook', ${page.name}, ${page.name}, ${profilePicture},
       ${accessToken}, ${expiresAt}, ${page.id})
    ON CONFLICT (id) DO UPDATE SET
      access_token     = EXCLUDED.access_token,
      token_expires_at = EXCLUDED.token_expires_at,
      display_name     = EXCLUDED.display_name,
      profile_picture  = EXCLUDED.profile_picture,
      is_connected     = TRUE
  `;

  return NextResponse.redirect(new URL("/?connected=facebook", req.url));
}
