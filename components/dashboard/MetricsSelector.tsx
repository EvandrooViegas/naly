'use client';

import { Eye, Heart, Users, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';

interface MetricsSelectorProps {
  selectedMetrics: {
    views: boolean;
    likes: boolean;
    followers: boolean;
    engagement: boolean;
  };
  onToggleMetric: (metric: keyof MetricsSelectorProps['selectedMetrics']) => void;
}

const metricConfig = [
  { key: 'views' as const, label: 'Views', icon: Eye, color: 'text-indigo-600 dark:text-indigo-400' },
  { key: 'likes' as const, label: 'Likes', icon: Heart, color: 'text-pink-600 dark:text-pink-400' },
  { key: 'followers' as const, label: 'Followers', icon: Users, color: 'text-green-600 dark:text-green-400' },
  { key: 'engagement' as const, label: 'Engagement', icon: TrendingUp, color: 'text-amber-600 dark:text-amber-400' },
];

export default function MetricsSelector({ selectedMetrics, onToggleMetric }: MetricsSelectorProps) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-3">Metrics to Display</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {metricConfig.map(({ key, label, icon: Icon, color }) => {
          const isSelected = selectedMetrics[key];
          return (
            <button
              key={key}
              onClick={() => onToggleMetric(key)}
              className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all ${
                isSelected
                  ? 'border-primary bg-primary/5'
                  : 'border-border bg-background hover:border-border/60'
              }`}
            >
              <Icon className={`w-4 h-4 flex-shrink-0 ${isSelected ? color : 'text-muted-foreground'}`} />
              <span className={`text-sm font-medium ${isSelected ? '' : 'text-muted-foreground'}`}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
