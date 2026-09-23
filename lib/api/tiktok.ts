import { MetricsData } from "@/types";

export async function fetchTikTokMetrics(
  username: string,
  startDate: Date,
  endDate: Date
): Promise<MetricsData[]> {
  // TikTok Research/Business API requires approved app credentials.
  // Add TIKTOK_CLIENT_KEY and TIKTOK_CLIENT_SECRET to .env.local to enable.
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  if (!clientKey) return [];

  // OAuth + data fetch would go here.
  return [];
}

export async function verifyTikTokAccount(_username: string): Promise<boolean> {
  return true;
}
