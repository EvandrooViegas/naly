'use client';

import { Platform } from '@/types';
import { Camera, Music, Share2, Check, Video, Briefcase } from 'lucide-react';
import Button from '../ui/Button';
import { Card } from '../ui/Card';

interface PlatformCardProps {
  platform: Platform;
  isConnected: boolean;
  onConnect: (platform: Platform) => void;
}

const platformConfig = {
  instagram: {
    name: 'Instagram',
    icon: Camera,
    color: 'bg-gradient-to-br from-purple-600 to-pink-600',
    description: 'Track posts, reels, and stories performance',
  },
  tiktok: {
    name: 'TikTok',
    icon: Music,
    color: 'bg-black',
    description: 'Monitor video views, likes, and follower growth',
  },
  facebook: {
    name: 'Facebook',
    icon: Share2,
    color: 'bg-blue-600',
    description: 'Analyze page engagement and reach',
  },
  youtube: {
    name: 'YouTube',
    icon: Video,
    color: 'bg-red-600',
    description: 'Track channel views, subscribers, and watch time',
  },
  linkedin: {
    name: 'LinkedIn',
    icon: Briefcase,
    color: 'bg-blue-700',
    description: 'Monitor professional network growth and engagement',
  },
};

export default function PlatformCard({ platform, isConnected, onConnect }: PlatformCardProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

  return (
    <Card className="border-border hover:border-primary/50 transition-all">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`p-4 rounded-xl ${config.color}`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-2">{config.name}</h3>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </div>

        {isConnected ? (
          <div className="w-full">
            <div className="flex items-center justify-center gap-2 text-success py-2">
              <Check className="w-4 h-4" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full hover:bg-primary hover:text-primary-foreground hover:border-primary"
            onClick={() => onConnect(platform)}
          >
            Connect {config.name}
          </Button>
        )}
      </div>
    </Card>
  );
}
