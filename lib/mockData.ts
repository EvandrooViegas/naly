import { AccountAnalytics, ConnectedAccount, MetricsData, Platform } from '@/types';
import { subDays, format } from 'date-fns';

// Generate mock metrics data for a given date range
export function generateMockMetrics(days: number, platform: Platform): MetricsData[] {
  const metrics: MetricsData[] = [];
  const baseValues = {
    instagram: { views: 5000, likes: 500, followers: 10000 },
    tiktok: { views: 15000, likes: 1200, followers: 25000 },
    facebook: { views: 3000, likes: 300, followers: 8000 },
    youtube: { views: 50000, likes: 2500, followers: 75000 },
    linkedin: { views: 2000, likes: 200, followers: 5000 },
  };

  const base = baseValues[platform];

  for (let i = days - 1; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2
    const growthFactor = 1 + (days - i) / (days * 20); // Slight upward trend

    metrics.push({
      date: format(date, 'yyyy-MM-dd'),
      views: Math.floor(base.views * randomFactor * growthFactor),
      likes: Math.floor(base.likes * randomFactor * growthFactor),
      followers: Math.floor(base.followers + (days - i) * (Math.random() * 10 + 5)),
      engagement: Number((Math.random() * 2 + 3).toFixed(2)), // 3-5% engagement
    });
  }

  return metrics;
}

// Generate mock connected accounts
export function generateMockAccounts(): ConnectedAccount[] {
  return [
    {
      id: '1',
      platform: 'instagram',
      username: 'john.doe',
      displayName: 'John Doe',
      profilePicture: 'https://ui-avatars.com/api/?name=John+Doe&background=E1306C&color=fff',
      isConnected: true,
      connectedAt: subDays(new Date(), 30),
    },
    {
      id: '2',
      platform: 'tiktok',
      username: '@johndoe',
      displayName: 'John Doe',
      profilePicture: 'https://ui-avatars.com/api/?name=John+Doe&background=000000&color=fff',
      isConnected: true,
      connectedAt: subDays(new Date(), 25),
    },
    {
      id: '3',
      platform: 'facebook',
      username: 'john.doe.page',
      displayName: 'John Doe Official',
      profilePicture: 'https://ui-avatars.com/api/?name=John+Doe&background=1877F2&color=fff',
      isConnected: true,
      connectedAt: subDays(new Date(), 20),
    },
  ];
}

// Generate full analytics for an account
export function generateAccountAnalytics(
  account: ConnectedAccount,
  days: number = 30
): AccountAnalytics {
  const metrics = generateMockMetrics(days, account.platform);
  const totalViews = metrics.reduce((sum, m) => sum + m.views, 0);
  const totalLikes = metrics.reduce((sum, m) => sum + m.likes, 0);
  const currentFollowers = metrics[metrics.length - 1]?.followers || 0;
  const initialFollowers = metrics[0]?.followers || 0;
  const followerGrowth = currentFollowers - initialFollowers;
  const engagementRate = metrics.reduce((sum, m) => sum + m.engagement, 0) / metrics.length;

  return {
    accountId: account.id,
    platform: account.platform,
    username: account.username,
    metrics,
    totalViews,
    totalLikes,
    currentFollowers,
    followerGrowth,
    engagementRate,
  };
}
