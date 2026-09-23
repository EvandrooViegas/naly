import { ConnectedAccount } from "@/types";

export async function fetchAccounts(): Promise<ConnectedAccount[]> {
  const res = await fetch("/api/accounts", { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch accounts");
  const data = await res.json();
  return data.accounts.map((a: Record<string, unknown>) => ({
    ...a,
    connectedAt: new Date(a.connectedAt as string),
  }));
}

export async function createAccount(account: ConnectedAccount): Promise<void> {
  const res = await fetch("/api/accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  });
  if (!res.ok) throw new Error("Failed to create account");
}

export async function deleteAccount(id: string): Promise<void> {
  const res = await fetch(`/api/accounts/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete account");
}
