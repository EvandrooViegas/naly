import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { sql, initDb } from "@/lib/db";

export async function GET(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.redirect(new URL("/sign-in", req.url));

  const { searchParams } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    console.error("TikTok OAuth error:", error);
    return NextResponse.redirect(new URL("/?tiktok=error", req.url));
  }

  // Retrieve the PKCE verifier stored during the initial redirect
  const cookieStore = await cookies();
  const codeVerifier = cookieStore.get("tiktok_code_verifier")?.value;
  if (!codeVerifier) {
    console.error("TikTok PKCE: code_verifier cookie missing");
    return NextResponse.redirect(new URL("/?tiktok=error", req.url));
  }

  // Clear the cookie immediately
  cookieStore.delete("tiktok_code_verifier");

  const clientKey = process.env.TIKTOK_CLIENT_KEY!;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET!;
  const redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/tiktok/callback`;

  // Exchange code + verifier for access token
const tokenRes = await fetch(
  "https://open.tiktokapis.com/v2/oauth/token/",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
  }
);

  if (!tokenRes.ok) {
    console.error("TikTok token exchange failed:", await tokenRes.text());
    return NextResponse.redirect(new URL("/?tiktok=error", req.url));
  }

  const tokenData = await tokenRes.json();
  const { access_token, refresh_token, expires_in, open_id } = tokenData;

  if (!access_token) {
    console.error("TikTok token exchange: no access_token in response", tokenData);
    return NextResponse.redirect(new URL("/?tiktok=error", req.url));
  }

  // Fetch user profile
  const profileRes = await fetch(
    "https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url,username,follower_count",
    { headers: { Authorization: `Bearer ${access_token}` } }
  );

  let displayName = "TikTok User";
  let username = open_id;
  let profilePicture: string | null = null;

  if (profileRes.ok) {
    const profileData = await profileRes.json();
    const user = profileData?.data?.user;
    if (user) {
      displayName = user.display_name ?? displayName;
      username = user.username ?? open_id;
      profilePicture = user.avatar_url ?? null;
    }
  }

  const accountId = `tiktok-${open_id}`;
  const expiresAt = new Date(Date.now() + (expires_in ?? 86400) * 1000);

  await initDb();
  await sql`
    INSERT INTO connected_accounts
      (id, user_id, platform, username, display_name, profile_picture,
       access_token, refresh_token, token_expires_at, platform_user_id)
    VALUES
      (${accountId}, ${userId}, 'tiktok', ${username}, ${displayName}, ${profilePicture},
       ${access_token}, ${refresh_token ?? null}, ${expiresAt}, ${open_id})
    ON CONFLICT (id) DO UPDATE SET
      access_token     = EXCLUDED.access_token,
      refresh_token    = EXCLUDED.refresh_token,
      token_expires_at = EXCLUDED.token_expires_at,
      display_name     = EXCLUDED.display_name,
      profile_picture  = EXCLUDED.profile_picture,
      is_connected     = TRUE
  `;

  return NextResponse.redirect(new URL("/?connected=tiktok", req.url));
}
