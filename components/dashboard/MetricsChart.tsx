'use client';

import { MetricsData } from '@/types';
import { format, parseISO } from 'date-fns';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

interface MetricsChartProps {
  data: MetricsData[];
  title: string;
  selectedMetrics: {
    views: boolean;
    likes: boolean;
    followers: boolean;
    engagement: boolean;
  };
}

export default function MetricsChart({ data, title, selectedMetrics }: MetricsChartProps) {
  const chartData = data.map(item => ({
    ...item,
    date: format(parseISO(item.date), 'MMM dd'),
  }));

  const lines = [
    { key: 'views', name: 'Views', color: '#3ea6ff', enabled: selectedMetrics.views },
    { key: 'likes', name: 'Likes', color: '#ff6b6b', enabled: selectedMetrics.likes },
    { key: 'followers', name: 'Followers', color: '#00d4aa', enabled: selectedMetrics.followers },
    { key: 'engagement', name: 'Engagement %', color: '#ffc107', enabled: selectedMetrics.engagement },
  ];

  const enabledLines = lines.filter(line => line.enabled);

  if (enabledLines.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        Select at least one metric to display the chart
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            {enabledLines.map(line => (
              <linearGradient key={line.key} id={`gradient-${line.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={line.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={line.color} stopOpacity={0}/>
              </linearGradient>
            ))}
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#303030" vertical={false} />
          <XAxis
            dataKey="date"
            stroke="#aaaaaa"
            tick={{ fill: '#aaaaaa', fontSize: 11 }}
            axisLine={{ stroke: '#303030' }}
          />
          <YAxis
            stroke="#aaaaaa"
            tick={{ fill: '#aaaaaa', fontSize: 11 }}
            axisLine={{ stroke: '#303030' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#212121',
              border: '1px solid #303030',
              borderRadius: '8px',
              fontSize: '12px',
            }}
            itemStyle={{ color: '#f1f1f1' }}
            labelStyle={{ color: '#aaaaaa', marginBottom: '4px' }}
          />
          {enabledLines.map(line => (
            <Area
              key={line.key}
              type="monotone"
              dataKey={line.key}
              stroke={line.color}
              strokeWidth={2}
              fill={`url(#gradient-${line.key})`}
              name={line.name}
              dot={false}
              activeDot={{ r: 4, fill: line.color }}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
