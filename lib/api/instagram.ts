import { MetricsData } from "@/types";
import { format, subDays } from "date-fns";

export async function fetchInstagramMetrics(
  username: string,
  startDate: Date,
  endDate: Date
): Promise<MetricsData[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;

  if (!token || !userId) {
    // No credentials — return empty so the API route uses baseline
    return [];
  }

  try {
    const since = Math.floor(startDate.getTime() / 1000);
    const until = Math.floor(endDate.getTime()   / 1000);

    const url =
      `https://graph.instagram.com/v18.0/${userId}/insights` +
      `?metric=impressions,reach,profile_views` +
      `&period=day&since=${since}&until=${until}` +
      `&access_token=${token}`;

    const res  = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();

    // Parse Instagram Insights response into MetricsData[]
    const impressionsData: { end_time: string; value: number }[] =
      json?.data?.find((d: { name: string }) => d.name === "impressions")?.values ?? [];

    return impressionsData.map((v) => ({
      date:       format(new Date(v.end_time), "yyyy-MM-dd"),
      views:      v.value,
      likes:      0,  // likes require separate media endpoint
      followers:  0,
      engagement: 0,
    }));
  } catch {
    return [];
  }
}

export async function verifyInstagramAccount(username: string): Promise<boolean> {
  // Simple public profile check — works without auth
  try {
    const res = await fetch(`https://www.instagram.com/${username}/?__a=1&__d=dis`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    return res.ok;
  } catch {
    return true; // Assume valid if network fails
  }
}
