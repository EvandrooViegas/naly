"use client";

import { useState, useEffect, useMemo } from "react";
import { useAccounts } from "@/components/dashboard/DashboardShell";
import { ConnectedAccount, DateRange, AccountAnalytics, MetricsData } from "@/types";
import { TrendingUp, HelpCircle, X, Check, Camera, Music, Share2, Video, Briefcase } from "lucide-react";
import { format, subDays } from "date-fns";
import MetricsChart from "@/components/dashboard/MetricsChart";
import ExportModal from "@/components/dashboard/ExportModal";
import Select from "@/components/ui/Select";
import { Platform } from "@/types";

const PLATFORM_CONFIG: Record<Platform, { name: string; icon: React.ElementType; color: string }> = {
  instagram: { name: "Instagram", icon: Camera,    color: "bg-gradient-to-br from-purple-600 to-pink-600" },
  tiktok:    { name: "TikTok",    icon: Music,     color: "bg-black border border-border"                 },
  facebook:  { name: "Facebook",  icon: Share2,    color: "bg-blue-600"                                   },
  youtube:   { name: "YouTube",   icon: Video,     color: "bg-red-600"                                    },
  linkedin:  { name: "LinkedIn",  icon: Briefcase, color: "bg-blue-700"                                   },
};

function GrowthBadge({ value }: { value: number }) {
  const pos = value >= 0;
  return (
    <span className={`text-xs font-medium ${pos ? "text-success" : "text-accent"}`}>
      {pos ? "+" : ""}{value.toFixed(1)}%
    </span>
  );
}

export default function DashboardPage() {
  const { accounts } = useAccounts();
  const [dateRange, setDateRange] = useState<DateRange>("30days");
  const [selectedIds, setSelectedIds] = useState<string[]>(accounts.map((a) => a.id));
  const [selectedMetrics, setSelectedMetrics] = useState({ views: true, likes: true, followers: true, engagement: false });
  const [analyticsMap, setAnalyticsMap] = useState<Map<string, AccountAnalytics>>(new Map());
  const [loading, setLoading] = useState(true);
  const [showExport, setShowExport] = useState(false);
  const [infoDismissed, setInfoDismissed] = useState(false);

  const days = useMemo(() => {
    const map: Record<DateRange, number> = { "7days": 7, "30days": 30, "90days": 90, custom: 30 };
    return map[dateRange] ?? 30;
  }, [dateRange]);

  // Fetch metrics for every connected account
  useEffect(() => {
    if (!accounts.length) { setLoading(false); return; }

    setLoading(true);
    const fetches = accounts.map(async (acc): Promise<[string, AccountAnalytics]> => {
      const res = await fetch("/api/metrics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accountId: acc.id, platform: acc.platform, username: acc.username, days }),
      });
      const data = await res.json();
      const metrics: MetricsData[] = data.metrics ?? [];

      const totalViews       = metrics.reduce((s, m) => s + m.views,      0);
      const totalLikes       = metrics.reduce((s, m) => s + m.likes,      0);
      const currentFollowers = metrics.at(-1)?.followers ?? 0;
      const initialFollowers = metrics.at(0)?.followers  ?? 0;
      const followerGrowth   = currentFollowers - initialFollowers;
      const engagementRate   = metrics.length
        ? metrics.reduce((s, m) => s + m.engagement, 0) / metrics.length
        : 0;

      return [acc.id, { accountId: acc.id, platform: acc.platform, username: acc.username, metrics, totalViews, totalLikes, currentFollowers, followerGrowth, engagementRate }];
    });

    Promise.all(fetches)
      .then((pairs) => setAnalyticsMap(new Map(pairs)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [accounts, days]);

  // Keep selection in sync when accounts change
  useEffect(() => { setSelectedIds(accounts.map((a) => a.id)); }, [accounts.length]); // eslint-disable-line

  const filteredAnalytics = useMemo(
    () => accounts.filter((a) => selectedIds.includes(a.id)).map((a) => analyticsMap.get(a.id)).filter(Boolean) as AccountAnalytics[],
    [accounts, selectedIds, analyticsMap],
  );

  const agg = useMemo(() => {
    if (!filteredAnalytics.length) return { totalViews: 0, totalLikes: 0, currentFollowers: 0, followerGrowth: 0, engagementRate: 0 };
    return {
      totalViews:       filteredAnalytics.reduce((s, a) => s + a.totalViews,      0),
      totalLikes:       filteredAnalytics.reduce((s, a) => s + a.totalLikes,      0),
      currentFollowers: filteredAnalytics.reduce((s, a) => s + a.currentFollowers,0),
      followerGrowth:   filteredAnalytics.reduce((s, a) => s + a.followerGrowth,  0),
      engagementRate:   filteredAnalytics.reduce((s, a) => s + a.engagementRate,  0) / filteredAnalytics.length,
    };
  }, [filteredAnalytics]);

  const combinedMetrics = useMemo(() => {
    const map = new Map<string, { views: number; likes: number; followers: number; engagement: number; count: number }>();
    filteredAnalytics.forEach((a) => a.metrics.forEach((m) => {
      const e = map.get(m.date) ?? { views: 0, likes: 0, followers: 0, engagement: 0, count: 0 };
      map.set(m.date, { views: e.views + m.views, likes: e.likes + m.likes, followers: e.followers + m.followers, engagement: e.engagement + m.engagement, count: e.count + 1 });
    }));
    return Array.from(map.entries())
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, v]) => ({ date, views: v.views, likes: v.likes, followers: Math.round(v.followers / v.count), engagement: +(v.engagement / v.count).toFixed(2) }));
  }, [filteredAnalytics]);

  const followerGrowthPct = agg.currentFollowers > 0 ? (agg.followerGrowth / agg.currentFollowers) * 100 : 0;
  const toggleId     = (id: string) => setSelectedIds((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);
  const toggleMetric = (k: keyof typeof selectedMetrics) => setSelectedMetrics((p) => ({ ...p, [k]: !p[k] }));

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-2xl font-normal mb-1">Channel analytics</h1>
          <p className="text-sm text-muted-foreground">
            {filteredAnalytics.length === 0
              ? "No channels selected"
              : `${filteredAnalytics.length} channel${filteredAnalytics.length > 1 ? "s" : ""} · ${agg.currentFollowers.toLocaleString()} total followers`}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onChange={(e) => setDateRange(e.target.value as DateRange)}>
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 28 days</option>
            <option value="90days">Last 90 days</option>
          </Select>
          <button
            onClick={() => setShowExport(true)}
            className="px-3 py-1.5 text-sm bg-primary text-primary-foreground hover:bg-primary/90 rounded transition-colors"
          >
            Export report
          </button>
        </div>
      </div>

      {/* Quick-insight pills */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        {[
          { icon: HelpCircle, label: "How did viewers find my content?" },
          { icon: TrendingUp, label: "How many new viewers did I reach?" },
        ].map(({ icon: Icon, label }) => (
          <button key={label} className="flex items-center gap-2 px-3 py-1.5 bg-card hover:bg-hover border border-border rounded text-sm transition-colors">
            <Icon className="w-3.5 h-3.5 text-primary" />
            {label}
          </button>
        ))}
      </div>

      {/* Info banner */}
      {!infoDismissed && (
        <div className="flex items-start gap-3 bg-card border border-border rounded-lg px-4 py-3 mb-5">
          <div className="mt-0.5 w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <div className="w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
          <p className="flex-1 text-sm text-muted-foreground">
            Metrics are fetched from each platform&apos;s API and cached for 6 hours. Add API keys in{" "}
            <a href="/dashboard/settings" className="text-primary hover:underline">Settings</a> to see live data. Without keys, realistic baseline data is shown.
          </p>
          <button onClick={() => setInfoDismissed(true)} className="text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Two-column layout */}
      <div className="flex gap-5">
        {/* Left panel */}
        <div className="w-56 flex-shrink-0 space-y-4">
          {/* Channel filter */}
          <div className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Channels</h3>
              <a href="/dashboard/settings" className="text-xs text-primary hover:underline">+ Add</a>
            </div>
            <div className="space-y-1">
              {accounts.map((acc) => {
                const cfg  = PLATFORM_CONFIG[acc.platform];
                const Icon = cfg.icon;
                const on   = selectedIds.includes(acc.id);
                return (
                  <button
                    key={acc.id}
                    onClick={() => toggleId(acc.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded text-sm transition-colors ${on ? "bg-hover text-foreground" : "text-muted-foreground hover:bg-hover hover:text-foreground"}`}
                  >
                    <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="truncate flex-1 text-left">{acc.username}</span>
                    {on && <Check className="w-3 h-3 text-primary flex-shrink-0" />}
                  </button>
                );
              })}
              {accounts.length === 0 && <p className="text-xs text-muted-foreground py-2">No channels yet.</p>}
            </div>
          </div>

          {/* Metric toggles */}
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Metrics</h3>
            <div className="space-y-1">
              {(Object.keys(selectedMetrics) as (keyof typeof selectedMetrics)[]).map((k) => (
                <button
                  key={k}
                  onClick={() => toggleMetric(k)}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded text-sm transition-colors capitalize ${selectedMetrics[k] ? "bg-hover text-foreground" : "text-muted-foreground hover:bg-hover hover:text-foreground"}`}
                >
                  {k}
                  {selectedMetrics[k] && <Check className="w-3 h-3 text-primary" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: main content */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Stat cards */}
          <div className="grid grid-cols-4 gap-3">
            {[
              { label: "Views",      value: agg.totalViews.toLocaleString(),       growth: 12.4           },
              { label: "Likes",      value: agg.totalLikes.toLocaleString(),       growth: 8.1            },
              { label: "Followers",  value: agg.currentFollowers.toLocaleString(), growth: followerGrowthPct },
              { label: "Engagement", value: `${agg.engagementRate.toFixed(1)}%`,  growth: 2.3            },
            ].map(({ label, value, growth }) => (
              <div key={label} className="bg-card border border-border rounded-lg px-5 py-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">{label}</p>
                <p className="text-2xl font-normal mb-1">{loading ? "—" : value}</p>
                {!loading && <><GrowthBadge value={growth} /><span className="text-xs text-muted-foreground ml-1">vs prev.</span></>}
              </div>
            ))}
          </div>

          {/* Chart */}
          <div className="bg-card border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-medium">Performance over time</h2>
              <p className="text-xs text-muted-foreground">
                {format(subDays(new Date(), days), "MMM d")} – {format(new Date(), "MMM d, yyyy")}
              </p>
            </div>
            {loading ? (
              <div className="h-80 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
            ) : (
              <MetricsChart data={combinedMetrics} title="" selectedMetrics={selectedMetrics} />
            )}
          </div>

          {/* Per-account breakdown */}
          {filteredAnalytics.length > 0 && !loading && (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="px-5 py-3 border-b border-border flex items-center justify-between">
                <h2 className="text-sm font-medium">Account breakdown</h2>
                <span className="text-xs text-muted-foreground">{filteredAnalytics.length} channels</span>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {["Channel","Views","Likes","Followers","Growth","Eng."].map((h) => (
                      <th key={h} className={`py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wide ${h === "Channel" ? "text-left px-5" : "text-right px-4"}`}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAnalytics.map((a) => {
                    const acc  = accounts.find((x) => x.id === a.accountId)!;
                    const cfg  = PLATFORM_CONFIG[a.platform];
                    const Icon = cfg.icon;
                    return (
                      <tr key={a.accountId} className="border-b border-border last:border-0 hover:bg-hover/50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <p className="font-medium leading-tight">{acc.username}</p>
                              <p className="text-xs text-muted-foreground capitalize">{a.platform}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right tabular-nums">{a.totalViews.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right tabular-nums">{a.totalLikes.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right tabular-nums">{a.currentFollowers.toLocaleString()}</td>
                        <td className="px-4 py-3 text-right"><span className="text-success text-xs">+{a.followerGrowth.toLocaleString()}</span></td>
                        <td className="px-4 py-3 text-right text-xs text-muted-foreground">{a.engagementRate.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {showExport && (
        <ExportModal
          accounts={accounts}
          analytics={filteredAnalytics}
          onClose={() => setShowExport(false)}
        />
      )}
    </>
  );
}
