import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { sql, initDb } from "@/lib/db";

const DEMO_ACCOUNTS = [
  {
    id:              "demo-instagram",
    platform:        "instagram",
    username:        "@demo.creator",
    display_name:    "Demo Creator",
    profile_picture: "https://ui-avatars.com/api/?name=Demo+Creator&background=E1306C&color=fff&size=128",
    platform_user_id: "demo_ig_123",
  },
  {
    id:              "demo-tiktok",
    platform:        "tiktok",
    username:        "@democreator",
    display_name:    "Demo Creator",
    profile_picture: "https://ui-avatars.com/api/?name=Demo+Creator&background=010101&color=fff&size=128",
    platform_user_id: "demo_tt_456",
  },
  {
    id:              "demo-facebook",
    platform:        "facebook",
    username:        "Demo Creator Page",
    display_name:    "Demo Creator Page",
    profile_picture: "https://ui-avatars.com/api/?name=Demo+Page&background=1877F2&color=fff&size=128",
    platform_user_id: "demo_fb_789",
  },
];

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await initDb();

  for (const acc of DEMO_ACCOUNTS) {
    await sql`
      INSERT INTO connected_accounts
        (id, user_id, platform, username, display_name, profile_picture, platform_user_id, is_connected)
      VALUES
        (${acc.id + "-" + userId}, ${userId}, ${acc.platform}, ${acc.username},
         ${acc.display_name}, ${acc.profile_picture}, ${acc.platform_user_id}, true)
      ON CONFLICT (id) DO NOTHING
    `;
  }

  return NextResponse.json({ ok: true });
}

// Allow deleting demo accounts to reset
export async function DELETE() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await sql`
    DELETE FROM connected_accounts
    WHERE user_id = ${userId}
      AND id LIKE 'demo-%'
  `;

  return NextResponse.json({ ok: true });
}
