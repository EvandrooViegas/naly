import { Platform, MetricsData } from '@/types';
import { fetchInstagramMetrics, verifyInstagramAccount } from './instagram';
import { fetchTikTokMetrics, verifyTikTokAccount }       from './tiktok';
import { fetchFacebookMetrics, verifyFacebookPage }       from './facebook';
import { fetchYouTubeMetrics, verifyYouTubeChannel }      from './youtube';
import { fetchLinkedInMetrics, verifyLinkedInProfile }    from './linkedin';

export async function fetchPlatformMetrics(
  platform: Platform,
  username: string,
  startDate: Date,
  endDate: Date,
): Promise<MetricsData[]> {
  switch (platform) {
    case 'instagram': return fetchInstagramMetrics(username, startDate, endDate);
    case 'tiktok':    return fetchTikTokMetrics(username, startDate, endDate);
    case 'facebook':  return fetchFacebookMetrics(username, startDate, endDate);
    case 'youtube':   return fetchYouTubeMetrics(username, startDate, endDate);
    case 'linkedin':  return fetchLinkedInMetrics(username, startDate, endDate);
    default:          return [];
  }
}

export async function verifyAccount(platform: Platform, username: string): Promise<boolean> {
  switch (platform) {
    case 'instagram': return verifyInstagramAccount(username);
    case 'tiktok':    return verifyTikTokAccount(username);
    case 'facebook':  return verifyFacebookPage(username);
    case 'youtube':   return verifyYouTubeChannel(username);
    case 'linkedin':  return verifyLinkedInProfile(username);
    default:          return false;
  }
}
