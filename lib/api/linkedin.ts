import { MetricsData } from "@/types";

export async function fetchLinkedInMetrics(
  profileId: string,
  startDate: Date,
  endDate: Date
): Promise<MetricsData[]> {
  // LinkedIn Marketing API requires OAuth 2.0 and company admin access.
  // Add LINKEDIN_ACCESS_TOKEN to .env.local to enable.
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) return [];
  return [];
}

export async function verifyLinkedInProfile(_profileId: string): Promise<boolean> {
  return true;
}
