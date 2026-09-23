"use client";

import { Search, Bell, Plus } from "lucide-react";
import { ConnectedAccount } from "@/types";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

interface TopNavProps {
  accounts: ConnectedAccount[];
}

export default function TopNav({ accounts }: TopNavProps) {
  const { user } = useUser();

  return (
    <header className="fixed top-0 right-0 left-60 h-14 bg-background border-b border-border z-30 flex items-center justify-between px-6 gap-4">
      {/* Search */}
      <div className="flex-1 max-w-lg">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder="Search across your channels"
            className="w-full bg-secondary border border-transparent hover:border-border focus:border-primary rounded-full pl-9 pr-4 py-1.5 text-sm outline-none transition-all placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button className="relative p-2 hover:bg-hover rounded-full transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        <Link
          href="/dashboard/settings"
          className="inline-flex items-center gap-1.5 bg-secondary hover:bg-hover border border-border text-sm px-3 py-1.5 rounded transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add channel</span>
        </Link>

        <div className="flex items-center gap-2.5 pl-3 border-l border-border">
          {user && (
            <div className="hidden md:block text-right leading-tight">
              <p className="text-sm font-medium">{user.fullName ?? user.username}</p>
              <p className="text-xs text-muted-foreground">{user.primaryEmailAddress?.emailAddress}</p>
            </div>
          )}
          {/* UserButton handles sign-out natively */}
          <UserButton
            
            appearance={{
              elements: {
                avatarBox: "w-8 h-8",
                userButtonPopoverCard: "bg-card border border-border",
                userButtonPopoverActionButton: "hover:bg-hover text-foreground",
                userButtonPopoverActionButtonText: "text-foreground",
                userButtonPopoverFooter: "hidden",
              },
            }}
          />
        </div>
      </div>
    </header>
  );
}
