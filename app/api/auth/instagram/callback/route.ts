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
    console.error("Instagram OAuth error:", error, searchParams.get("error_description"));
    return NextResponse.redirect(new URL("/?instagram=error", req.url));
  }

  const appId = process.env.FACEBOOK_APP_ID!;
  const appSecret = process.env.FACEBOOK_APP_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback`;

  // 1. Exchange code for a short-lived user access token
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
    console.error("Instagram token exchange failed:", await tokenRes.text());
    return NextResponse.redirect(new URL("/?instagram=error", req.url));
  }

  const { access_token: shortToken } = await tokenRes.json();

  // 2. Exchange for a long-lived token (60 days)
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
  const expiresIn: number = longTokenData.expires_in ?? 5183944; // ~60 days
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  // 3. Get Facebook user's Pages and their linked IG accounts
  const pagesRes = await fetch(
    `https://graph.facebook.com/v21.0/me/accounts?fields=id,name,instagram_business_account&access_token=${accessToken}`
  );

  if (!pagesRes.ok) {
    console.error("Failed to fetch pages:", await pagesRes.text());
    return NextResponse.redirect(new URL("/?instagram=error", req.url));
  }

  const pagesData = await pagesRes.json();
  const pages: Array<{ id: string; name: string; instagram_business_account?: { id: string } }> =
    pagesData.data ?? [];

  const igPage = pages.find((p) => p.instagram_business_account);
  if (!igPage?.instagram_business_account) {
    // No IG business account linked — redirect with a specific error
    return NextResponse.redirect(new URL("/?instagram=no_business_account", req.url));
  }

  const igId = igPage.instagram_business_account.id;

  // 4. Fetch IG profile
  const igRes = await fetch(
    `https://graph.facebook.com/v21.0/${igId}?fields=id,username,name,profile_picture_url,followers_count&access_token=${accessToken}`
  );

  let username = igId;
  let displayName = "Instagram Account";
  let profilePicture: string | null = null;

  if (igRes.ok) {
    const igData = await igRes.json();
    username = igData.username ?? igId;
    displayName = igData.name ?? username;
    profilePicture = igData.profile_picture_url ?? null;
  }

  const accountId = `instagram-${igId}`;

  await initDb();
  await sql`
    INSERT INTO connected_accounts
      (id, user_id, platform, username, display_name, profile_picture,
       access_token, token_expires_at, platform_user_id)
    VALUES
      (${accountId}, ${userId}, 'instagram', ${username}, ${displayName}, ${profilePicture},
       ${accessToken}, ${expiresAt}, ${igId})
    ON CONFLICT (id) DO UPDATE SET
      access_token     = EXCLUDED.access_token,
      token_expires_at = EXCLUDED.token_expires_at,
      display_name     = EXCLUDED.display_name,
      profile_picture  = EXCLUDED.profile_picture,
      is_connected     = TRUE
  `;

  return NextResponse.redirect(new URL("/?connected=instagram", req.url));
}
