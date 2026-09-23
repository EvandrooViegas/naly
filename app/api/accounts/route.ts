import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { sql, initDb } from "@/lib/db";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await initDb();
    const rows = await sql`SELECT id, platform, username, display_name, profile_picture, is_connected, connected_at FROM connected_accounts WHERE user_id = ${userId} ORDER BY connected_at ASC`;
    const accounts = rows.map((r) => ({ id: r.id, platform: r.platform, username: r.username, displayName: r.display_name, profilePicture: r.profile_picture, isConnected: r.is_connected, connectedAt: r.connected_at, userId }));
    return NextResponse.json({ accounts });
  } catch (err) { console.error(err); return NextResponse.json({ error: "Database error" }, { status: 500 }); }
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id, platform, username, displayName, profilePicture } = await req.json();
  if (!id || !platform || !username) return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  try {
    await initDb();
    const dn = displayName ?? username;
    const pp = profilePicture ?? null;
    await sql`INSERT INTO connected_accounts (id, user_id, platform, username, display_name, profile_picture) VALUES (${id}, ${userId}, ${platform}, ${username}, ${dn}, ${pp}) ON CONFLICT (id) DO NOTHING`;
    return NextResponse.json({ success: true });
  } catch (err) { console.error(err); return NextResponse.json({ error: "Database error" }, { status: 500 }); }
}
