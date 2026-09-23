import { MetricsData } from "@/types";
import { format, subDays, eachDayOfInterval } from "date-fns";

export async function fetchYouTubeMetrics(
  channelId: string,
  startDate: Date,
  endDate: Date
): Promise<MetricsData[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return [];

  try {
    const start = format(startDate, "yyyy-MM-dd");
    const end   = format(endDate,   "yyyy-MM-dd");

    const url =
      `https://youtubeanalytics.googleapis.com/v2/reports` +
      `?ids=channel==MINE` +
      `&startDate=${start}&endDate=${end}` +
      `&metrics=views,likes,subscribersGained` +
      `&dimensions=day&sort=day` +
      `&key=${apiKey}`;

    const res  = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const json = await res.json();

    return (json.rows ?? []).map(([day, views, likes, subs]: [string, number, number, number]) => ({
      date:       day,
      views,
      likes,
      followers:  subs,
      engagement: views > 0 ? Number(((likes / views) * 100).toFixed(2)) : 0,
    }));
  } catch {
    return [];
  }
}

export async function verifyYouTubeChannel(_channelId: string): Promise<boolean> {
  return true;
}
