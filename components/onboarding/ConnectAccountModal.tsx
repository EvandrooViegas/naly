'use client';

import { Platform } from '@/types';
import { X, Loader2 } from 'lucide-react';
import { useState } from 'react';
import Button from '../ui/Button';

interface ConnectAccountModalProps {
  platform: Platform;
  onClose: () => void;
  // onConnect is not called directly for OAuth platforms — the page reloads after callback
  onConnect: (platform: Platform, username: string) => void;
}

const CONFIG: Record<Platform, {
  name: string;
  oauthPath: string | null; // null = not supported yet
  description: string;
  icon: React.ReactNode;
}> = {
  instagram: {
    name: 'Instagram',
    oauthPath: '/api/auth/instagram',
    description: 'You need a Facebook-linked Instagram Business or Creator account.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  tiktok: {
    name: 'TikTok',
    oauthPath: '/api/auth/tiktok',
    description: 'You will be redirected to TikTok to authorise access to your account.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  facebook: {
    name: 'Facebook',
    oauthPath: '/api/auth/facebook',
    description: 'Connect a Facebook Page you manage to track reach and engagement.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 8h-2a1 1 0 00-1 1v2h3l-.5 3H12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  youtube: {
    name: 'YouTube',
    oauthPath: null,
    description: 'YouTube integration coming soon.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </svg>
    ),
  },
  linkedin: {
    name: 'LinkedIn',
    oauthPath: null,
    description: 'LinkedIn integration coming soon.',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10v7M7 7v1M12 17v-4a2 2 0 014 0v4M12 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
};

export default function ConnectAccountModal({ platform, onClose }: ConnectAccountModalProps) {
  const [loading, setLoading] = useState(false);
  const cfg = CONFIG[platform];

  const handleOAuth = () => {
    if (!cfg.oauthPath) return;
    setLoading(true);
    window.location.href = cfg.oauthPath;
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-sm">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-3 text-foreground">
            {cfg.icon}
            <h2 className="text-base font-medium">Connect {cfg.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-hover rounded transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-sm text-muted-foreground leading-relaxed">{cfg.description}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 py-4 border-t border-border">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          {cfg.oauthPath ? (
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleOAuth}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Redirecting…
                </span>
              ) : (
                `Continue with ${cfg.name}`
              )}
            </Button>
          ) : (
            <Button variant="outline" className="flex-1" disabled>
              Coming soon
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
