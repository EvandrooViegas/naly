"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ConnectedAccount } from "@/types";
import Sidebar from "./Sidebar";
import TopNav from "./TopNav";

interface DashboardShellProps {
  accounts: ConnectedAccount[];
  children: React.ReactNode;
}

export default function DashboardShell({ accounts: initial, children }: DashboardShellProps) {
  const [accounts, setAccounts] = useState<ConnectedAccount[]>(initial);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar currentPath={pathname} />
      <TopNav accounts={accounts} />
      <main className="ml-60 mt-14 p-6 max-w-[1400px]">
        {/* Pass accounts state down via a custom event / context.
            Pages that need to mutate accounts import useAccounts(). */}
        <AccountsContext.Provider value={{ accounts, setAccounts }}>
          {children}
        </AccountsContext.Provider>
      </main>
    </div>
  );
}

// ── Shared accounts context (used by dashboard pages + settings) ──────────────
import { createContext, useContext, Dispatch, SetStateAction } from "react";

interface AccountsCtx {
  accounts: ConnectedAccount[];
  setAccounts: Dispatch<SetStateAction<ConnectedAccount[]>>;
}

export const AccountsContext = createContext<AccountsCtx>({
  accounts: [],
  setAccounts: () => {},
});

export function useAccounts() {
  return useContext(AccountsContext);
}
