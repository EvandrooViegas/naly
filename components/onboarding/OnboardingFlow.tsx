'use client';

import { ConnectedAccount, Platform } from '@/types';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import ConnectAccountModal from './ConnectAccountModal';

interface OnboardingFlowProps {
  onComplete: (accounts: ConnectedAccount[]) => void;
}

const PLATFORMS: {
  id: Platform;
  name: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    description: 'Posts, reels & stories',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    description: 'Videos & follower growth',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    description: 'Page reach & engagement',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 8h-2a1 1 0 00-1 1v2h3l-.5 3H12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [connected, setConnected] = useState<ConnectedAccount[]>([]);
  const [activePlatform, setActive] = useState<Platform | null>(null);
  const [loadingDemo, setLoadingDemo] = useState(false);

  // Pick up accounts that were connected via OAuth redirect (callback sets ?connected=platform)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const justConnected = params.get('connected') as Platform | null;
    if (justConnected && PLATFORMS.some((p) => p.id === justConnected)) {
      // Fetch real accounts from DB so we get the actual profile data
      fetch('/api/accounts')
        .then((r) => r.json())
        .then((data) => {
          const accounts: ConnectedAccount[] = (data.accounts ?? []).map(
            (a: Record<string, unknown>) => ({ ...a, connectedAt: new Date(a.connectedAt as string) })
          );
          setConnected(accounts);
          // Clean the URL without triggering a navigation
          window.history.replaceState({}, '', window.location.pathname);
        })
        .catch(console.error);
    }
  }, []);

  const isConnected = (p: Platform) => connected.some((a) => a.platform === p);

  // For OAuth platforms the modal handles the redirect; onConnect is a no-op fallback
  const handleConnect = (platform: Platform, username: string) => {
    const acc: ConnectedAccount = {
      id: `${platform}-${Date.now()}`,
      platform,
      username,
      displayName: username,
      isConnected: true,
      connectedAt: new Date(),
    };
    setConnected((prev) => [...prev, acc]);
    setActive(null);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-lg">

        {/* Logo + heading */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-5">
            <Image
              src="/logo/logo-white.png"
              alt="Naly"
              width={96}
              height={32}
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <h1 className="text-2xl font-semibold mb-2">Connect your accounts</h1>
          <p className="text-muted-foreground text-sm max-w-sm mx-auto">
            Connect at least one account to start tracking your performance.
          </p>
        </div>

        {/* Platform list */}
        <div className="flex flex-col gap-2 mb-6">
          {PLATFORMS.map(({ id, name, icon, description }) => {
            const on = isConnected(id);
            return (
              <button
                key={id}
                onClick={() => !on && setActive(id)}
                disabled={on}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-lg border text-left transition-colors ${
                  on
                    ? 'border-success/30 bg-success/5 cursor-default'
                    : 'border-border hover:border-border hover:bg-hover'
                }`}
              >
                <span className={on ? 'text-success' : 'text-muted-foreground'}>
                  {icon}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">{description}</p>
                </div>
                {on ? (
                  <Check className="w-4 h-4 text-success flex-shrink-0" />
                ) : (
                  <span className="text-xs text-muted-foreground flex-shrink-0">Connect →</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Connected summary */}
        {connected.length > 0 && (
          <p className="text-xs text-muted-foreground text-center mb-5">
            {connected.length} account{connected.length > 1 ? 's' : ''} connected
          </p>
        )}

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <Button
            variant="primary"
            size="lg"
            onClick={() => onComplete(connected)}
            disabled={connected.length === 0}
            className="w-full"
          >
            Go to dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button
            variant="outline"
            size="lg"
            onClick={async () => {
              setLoadingDemo(true);
              try {
                await fetch('/api/seed-demo', { method: 'POST' });
                window.location.href = '/dashboard';
              } catch {
                setLoadingDemo(false);
              }
            }}
            disabled={loadingDemo}
            className="w-full"
          >
            {loadingDemo ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Loading demo…
              </span>
            ) : (
              'Try with demo data'
            )}
          </Button>

          <p className="text-xs text-muted-foreground">
            You can add or remove accounts any time from Settings.
          </p>
        </div>
      </div>

      {activePlatform && (
        <ConnectAccountModal
          platform={activePlatform}
          onClose={() => setActive(null)}
          onConnect={handleConnect}
        />
      )}
    </div>
  );
}
