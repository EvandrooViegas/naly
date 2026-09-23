import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { cookies } from "next/headers";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const clientKey = process.env.TIKTOK_CLIENT_KEY;

  if (!clientKey) {
    return NextResponse.json(
      { error: "TikTok client key not configured" },
      { status: 500 }
    );
  }

  const redirectUri =
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/tiktok/callback`;

  // Generate CSRF state
  const state = randomBytes(32).toString("hex");

  const cookieStore = await cookies();

  cookieStore.set("tiktok_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 600,
    path: "/",
  });

  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: "code",
    scope: "user.info.basic",
    redirect_uri: redirectUri,
    state,
  });

  const url =
    `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}`;

  console.log("TikTok redirect:", url);

  return NextResponse.redirect(url);
}