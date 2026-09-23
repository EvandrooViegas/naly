// Social Media Platforms
export type Platform = 'instagram' | 'tiktok' | 'facebook' | 'youtube' | 'linkedin';
export type OAuthPlatform = 'instagram' | 'tiktok' | 'facebook';

// User
export interface User {
  id: string;
  email: string;
  name: string;
  image?: string;
  createdAt: Date;
}

// Connected Account
export interface ConnectedAccount {
  id: string;
  platform: Platform;
  username: string;
  displayName: string;
  profilePicture?: string;
  platformUserId?: string;
  isConnected: boolean;
  connectedAt: Date;
  userId?: string;
}

// Metrics Data
export interface MetricsData {
  date: string;
  views: number;
  likes: number;
  followers: number;
  engagement: number;
}

// Account Analytics
export interface AccountAnalytics {
  accountId: string;
  platform: Platform;
  username: string;
  metrics: MetricsData[];
  totalViews: number;
  totalLikes: number;
  currentFollowers: number;
  followerGrowth: number;
  engagementRate: number;
}

// Date Range
export type DateRange = '7days' | '30days' | '90days' | 'custom';

// Export Options
export interface ExportOptions {
  dateRange: {
    start: Date;
    end: Date;
  };
  selectedMetrics: {
    views: boolean;
    likes: boolean;
    followers: boolean;
    engagement: boolean;
  };
  accounts: string[]; // Account IDs to include
}

// Dashboard Filters
export interface DashboardFilters {
  dateRange: DateRange;
  customDateRange?: {
    start: Date;
    end: Date;
  };
  selectedAccounts: string[];
}
