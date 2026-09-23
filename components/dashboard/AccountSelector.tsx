'use client';

import { ConnectedAccount } from '@/types';
import { Check, Camera, Music, Share2, Video, Briefcase } from 'lucide-react';
import { Card } from '../ui/Card';

interface AccountSelectorProps {
  accounts: ConnectedAccount[];
  selectedAccounts: string[];
  onToggleAccount: (accountId: string) => void;
}

const platformIcons = {
  instagram: Camera,
  tiktok: Music,
  facebook: Share2,
  youtube: Video,
  linkedin: Briefcase,
};

const platformColors = {
  instagram: 'bg-gradient-to-br from-purple-600 to-pink-600',
  tiktok: 'bg-black',
  facebook: 'bg-blue-600',
  youtube: 'bg-red-600',
  linkedin: 'bg-blue-700',
};

export default function AccountSelector({
  accounts,
  selectedAccounts,
  onToggleAccount,
}: AccountSelectorProps) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Select Accounts</h3>
      <div className="space-y-2">
        {accounts.map(account => {
          const isSelected = selectedAccounts.includes(account.id);
          const Icon = platformIcons[account.platform];
          const colorClass = platformColors[account.platform];

          return (
            <button
              key={account.id}
              onClick={() => onToggleAccount(account.id)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all hover:shadow-sm ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-border/60'
              }`}
            >
              <div className={`p-2 rounded-full ${colorClass} flex-shrink-0`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-sm">{account.username}</p>
                <p className="text-xs text-muted-foreground capitalize">{account.platform}</p>
              </div>
              {isSelected && (
                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary-foreground" />
                </div>
              )}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
