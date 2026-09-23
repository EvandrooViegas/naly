"use client";

import Link from "next/link";
import { LayoutDashboard, BarChart3, Settings, HelpCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  currentPath: string;
}

const navItems = [
  { href: "/dashboard",          label: "Dashboard",  icon: LayoutDashboard },
  { href: "/dashboard/analytics",label: "Analytics",  icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings",   icon: Settings },
  { href: "/dashboard/help",     label: "Help",       icon: HelpCircle },
];

export default function Sidebar({ currentPath }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-card border-r border-border z-40 flex flex-col transition-[width] duration-200 ${
        collapsed ? "w-[60px]" : "w-60"
      }`}
    >
      {/* Logo */}
      <div className="h-14 flex items-center px-4 border-b border-border flex-shrink-0 overflow-hidden">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-sm font-bold text-primary-foreground">N</span>
          </div>
          {!collapsed && <span className="font-medium text-base whitespace-nowrap">Naly</span>}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 pt-3 overflow-hidden">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = currentPath === href || (href !== "/dashboard" && currentPath.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors mb-0.5 ${
                active
                  ? "bg-hover text-foreground"
                  : "text-muted-foreground hover:bg-hover hover:text-foreground"
              }`}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <div className="p-2 border-t border-border flex-shrink-0">
        <button
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? "Expand" : "Collapse"}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-hover hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4" />
              <span className="text-xs whitespace-nowrap">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
