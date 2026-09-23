import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { sql, initDb } from "@/lib/db";
import { ConnectedAccount } from "@/types";
import DashboardShell from "@/components/dashboard/DashboardShell";

async function getAccounts(userId: string): Promise<ConnectedAccount[]> {
  try {
    await initDb();
    const rows = await sql`
      SELECT id, platform, username, display_name, profile_picture,
             is_connected, connected_at
      FROM   connected_accounts
      WHERE  user_id = ${userId}
      ORDER  BY connected_at ASC
    `;
    return rows.map((r) => ({
      id:             r.id as string,
      platform:       r.platform as ConnectedAccount["platform"],
      username:       r.username as string,
      displayName:    r.display_name as string,
      profilePicture: r.profile_picture as string | undefined,
      isConnected:    r.is_connected as boolean,
      connectedAt:    new Date(r.connected_at as string),
      userId,
    }));
  } catch {
    return [];
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const accounts = await getAccounts(userId);

  // New users with no accounts go to onboarding
  if (accounts.length === 0) redirect("/onboarding");

  return <DashboardShell accounts={accounts}>{children}</DashboardShell>;
}
