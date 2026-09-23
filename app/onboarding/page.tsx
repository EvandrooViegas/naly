import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { sql, initDb } from "@/lib/db";
import OnboardingClient from "@/components/onboarding/OnboardingClient";

export default async function OnboardingPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  // If user already has accounts, skip onboarding
  await initDb();
  const rows = await sql`SELECT id FROM connected_accounts WHERE user_id = ${userId} LIMIT 1`;
  if (rows.length > 0) redirect("/dashboard");

  return <OnboardingClient />;
}
