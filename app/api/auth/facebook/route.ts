import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const clientId = process.env.FACEBOOK_APP_ID;

  if (!clientId) {
    return NextResponse.json(
      { error: "Facebook App ID not configured" },
      { status: 500 }
    );
  }

  const redirectUri =
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/facebook/callback`;

  const state = Buffer.from(
    JSON.stringify({
      userId,
      ts: Date.now(),
    })
  ).toString("base64url");

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    state,
    response_type: "code",
  });

  return NextResponse.redirect(
    `https://www.facebook.com/v23.0/dialog/oauth?${params.toString()}`
  );
}