'use client';

import { formatNumber, formatPercentage } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';

interface MetricCardProps {
  title: string;
  value: number;
  growth?: number;
  icon: LucideIcon;
  iconColor: string;
  format?: 'number' | 'percentage';
}

export default function MetricCard({
  title,
  value,
  growth,
  icon: Icon,
  iconColor,
  format = 'number',
}: MetricCardProps) {
  const displayValue = format === 'number' ? formatNumber(value) : `${value.toFixed(1)}%`;
  const hasGrowth = growth !== undefined;
  const isPositive = growth && growth >= 0;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-3xl font-bold mb-2">{displayValue}</h3>
            {hasGrowth && (
              <div className="flex items-center gap-1">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
                )}
                <span
                  className={`text-sm font-medium ${
                    isPositive
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {formatPercentage(growth)}
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last period</span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${iconColor}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
