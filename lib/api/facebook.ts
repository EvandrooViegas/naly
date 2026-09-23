import { MetricsData } from "@/types";
import { format } from "date-fns";

export async function fetchFacebookMetrics(
  pageId: string,
  startDate: Date,
  endDate: Date
): Promise<MetricsData[]> {
  const token = process.env.FACEBOOK_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const since = Math.floor(startDate.getTime() / 1000);
    const until = Math.floor(endDate.getTime()   / 1000);

    const url =
      `https://graph.facebook.com/v18.0/${pageId}/insights` +
      `?metric=page_impressions_unique,page_post_engagements,page_fan_adds` +
      `&period=day&since=${since}&until=${until}` +
      `&access_token=${token}`;

    const res  = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();

    const impressions: { end_time: string; value: number }[] =
      json?.data?.find((d: { name: string }) => d.name === "page_impressions_unique")?.values ?? [];
    const engagements: { end_time: string; value: number }[] =
      json?.data?.find((d: { name: string }) => d.name === "page_post_engagements")?.values ?? [];
    const fans: { end_time: string; value: number }[] =
      json?.data?.find((d: { name: string }) => d.name === "page_fan_adds")?.values ?? [];

    return impressions.map((v, i) => ({
      date:       format(new Date(v.end_time), "yyyy-MM-dd"),
      views:      v.value,
      likes:      engagements[i]?.value ?? 0,
      followers:  fans[i]?.value ?? 0,
      engagement: v.value > 0
        ? Number(((( engagements[i]?.value ?? 0) / v.value) * 100).toFixed(2))
        : 0,
    }));
  } catch {
    return [];
  }
}

export async function verifyFacebookPage(_pageId: string): Promise<boolean> {
  return true;
}
