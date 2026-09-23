"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccounts } from "@/components/dashboard/DashboardShell";
import { createAccount, deleteAccount } from "@/lib/accounts";
import ConnectAccountModal from "@/components/onboarding/ConnectAccountModal";
import { ConnectedAccount, Platform } from "@/types";
import { Camera, Music, Share2, Video, Briefcase, Trash2, Check, Plus } from "lucide-react";
import { format } from "date-fns";

const PLATFORM_CONFIG: Record<Platform, { name: string; icon: React.ElementType; color: string }> = {
  instagram: { name: "Instagram", icon: Camera,    color: "bg-gradient-to-br from-purple-600 to-pink-600" },
  tiktok:    { name: "TikTok",    icon: Music,     color: "bg-black border border-border"                 },
  facebook:  { name: "Facebook",  icon: Share2,    color: "bg-blue-600"                                   },
  youtube:   { name: "YouTube",   icon: Video,     color: "bg-red-600"                                    },
  linkedin:  { name: "LinkedIn",  icon: Briefcase, color: "bg-blue-700"                                   },
};

export default function SettingsPage() {
  const { accounts, setAccounts } = useAccounts();
  const router = useRouter();
  const [confirmId,    setConfirmId]    = useState<string | null>(null);
  const [addPlatform,  setAddPlatform]  = useState<Platform | null>(null);

  const handleRemove = async (id: string) => {
    await deleteAccount(id).catch(console.error);
    const updated = accounts.filter((a) => a.id !== id);
    setAccounts(updated);
    setConfirmId(null);
    // If no accounts left, redirect to onboarding
    if (updated.length === 0) router.replace("/onboarding");
  };

  const handleConnect = async (platform: Platform, username: string) => {
    const newAcc: ConnectedAccount = {
      id:             `${platform}-${Date.now()}`,
      platform,
      username,
      displayName:    username,
      profilePicture: `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random&color=fff`,
      isConnected:    true,
      connectedAt:    new Date(),
    };
    await createAccount(newAcc).catch(console.error);
    setAccounts([...accounts, newAcc]);
    setAddPlatform(null);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-normal mb-1">Settings</h1>
      <p className="text-sm text-muted-foreground mb-8">Manage your connected channels and API keys</p>

      {/* Connected channels */}
      <section className="bg-card border border-border rounded-lg overflow-hidden mb-6">
        <div className="px-5 py-3 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-medium">Connected channels</h2>
          <span className="text-xs text-muted-foreground">{accounts.length} / 10</span>
        </div>
        {accounts.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">No channels connected yet.</div>
        ) : (
          <ul className="divide-y divide-border">
            {accounts.map((acc) => {
              const cfg  = PLATFORM_CONFIG[acc.platform];
              const Icon = cfg.icon;
              return (
                <li key={acc.id} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded flex items-center justify-center ${cfg.color}`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{acc.username}</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {acc.platform} · Connected {format(new Date(acc.connectedAt), "MMM d, yyyy")}
                      </p>
                    </div>
                  </div>
                  {confirmId === acc.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">Remove?</span>
                      <button onClick={() => handleRemove(acc.id)} className="text-xs text-accent hover:underline">Yes</button>
                      <button onClick={() => setConfirmId(null)}   className="text-xs text-muted-foreground hover:underline">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmId(acc.id)} className="p-2 text-muted-foreground hover:text-accent hover:bg-hover rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Add channel */}
      <section className="bg-card border border-border rounded-lg p-5 mb-6">
        <h2 className="text-sm font-medium mb-4">Add a new channel</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {(Object.entries(PLATFORM_CONFIG) as [Platform, typeof PLATFORM_CONFIG[Platform]][]).map(([platform, cfg]) => {
            const Icon      = cfg.icon;
            const connected = accounts.some((a) => a.platform === platform);
            return (
              <button
                key={platform}
                onClick={() => !connected && setAddPlatform(platform)}
                disabled={connected}
                className={`flex items-center gap-3 px-4 py-3 border border-border rounded-lg text-sm transition-colors ${connected ? "opacity-40 cursor-not-allowed" : "hover:border-primary hover:bg-hover"}`}
              >
                <div className={`w-7 h-7 rounded flex items-center justify-center ${cfg.color}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <span>{cfg.name}</span>
                {connected && <Check className="w-3.5 h-3.5 text-success ml-auto" />}
              </button>
            );
          })}
        </div>
      </section>

      {/* API Keys notice */}
      <section className="bg-card border border-border rounded-lg p-5">
        <h2 className="text-sm font-medium mb-2">API keys</h2>
        <p className="text-sm text-muted-foreground mb-3">
          Add platform credentials to your <code className="bg-hover px-1 py-0.5 rounded text-xs">.env.local</code> to fetch live data.
          Without keys, Naly displays realistic baseline metrics.
        </p>
        <div className="space-y-1.5 text-xs font-mono bg-secondary rounded p-3 text-muted-foreground">
          <p>INSTAGRAM_ACCESS_TOKEN=</p>
          <p>INSTAGRAM_USER_ID=</p>
          <p>YOUTUBE_API_KEY=</p>
          <p>FACEBOOK_ACCESS_TOKEN=</p>
          <p>TIKTOK_CLIENT_KEY=</p>
          <p>LINKEDIN_ACCESS_TOKEN=</p>
        </div>
      </section>

      {addPlatform && (
        <ConnectAccountModal
          platform={addPlatform}
          onClose={() => setAddPlatform(null)}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
}
