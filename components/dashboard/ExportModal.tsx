'use client';

import { useState } from 'react';
import { X, Download } from 'lucide-react';
import { ConnectedAccount, AccountAnalytics, Platform } from '@/types';
import { format, subDays } from 'date-fns';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { generatePDFReport } from '@/lib/pdfExport';

// Platform icons inline (avoid importing lucide icons that may not exist)
import { Camera, Music, Share2, Video, Briefcase, Check } from 'lucide-react';

const PLATFORM_ICONS: Record<Platform, React.ElementType> = {
  instagram: Camera,
  tiktok:    Music,
  facebook:  Share2,
  youtube:   Video,
  linkedin:  Briefcase,
};

const PLATFORM_COLORS: Record<Platform, string> = {
  instagram: 'bg-gradient-to-br from-purple-600 to-pink-600',
  tiktok:    'bg-black border border-border',
  facebook:  'bg-blue-600',
  youtube:   'bg-red-600',
  linkedin:  'bg-blue-700',
};

interface ExportModalProps {
  accounts: ConnectedAccount[];
  analytics: AccountAnalytics[];
  onClose: () => void;
}

const METRICS = ['views', 'likes', 'followers', 'engagement'] as const;
type Metric = typeof METRICS[number];

export default function ExportModal({ accounts, analytics, onClose }: ExportModalProps) {
  const [startDate, setStartDate]   = useState(format(subDays(new Date(), 30), 'yyyy-MM-dd'));
  const [endDate,   setEndDate]     = useState(format(new Date(), 'yyyy-MM-dd'));
  const [metrics,   setMetrics]     = useState<Record<Metric, boolean>>({
    views: true, likes: true, followers: true, engagement: true,
  });
  const [selAccounts, setSelAccounts] = useState<string[]>(accounts.map((a) => a.id));
  const [isExporting, setIsExporting] = useState(false);

  const toggleMetric  = (m: Metric)  => setMetrics((p) => ({ ...p, [m]: !p[m] }));
  const toggleAccount = (id: string) =>
    setSelAccounts((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  const canExport =
    selAccounts.length > 0 && METRICS.some((m) => metrics[m]) && startDate && endDate;

  const handleExport = async () => {
    setIsExporting(true);
    try {
      generatePDFReport(
        accounts,
        analytics.filter((a) => selAccounts.includes(a.accountId)),
        {
          dateRange: { start: new Date(startDate), end: new Date(endDate) },
          selectedMetrics: metrics,
          accounts: selAccounts,
        },
      );
      setTimeout(() => { setIsExporting(false); onClose(); }, 800);
    } catch (err) {
      console.error(err);
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-lg my-8">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2.5">
            <Download className="w-4 h-4 text-primary" />
            <h2 className="text-base font-medium">Export analytics report</h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-hover rounded transition-colors text-muted-foreground hover:text-foreground">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">

          {/* Date range */}
          <section>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Date range</p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">From</label>
                <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} max={endDate} />
              </div>
              <div>
                <label className="text-xs text-muted-foreground block mb-1.5">To</label>
                <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                  min={startDate} max={format(new Date(), 'yyyy-MM-dd')} />
              </div>
            </div>
          </section>

          {/* Metrics */}
          <section>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">Metrics to include</p>
            <div className="grid grid-cols-2 gap-2">
              {METRICS.map((m) => (
                <button
                  key={m}
                  onClick={() => toggleMetric(m)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded border text-sm transition-colors capitalize ${
                    metrics[m]
                      ? 'border-primary bg-primary/10 text-foreground'
                      : 'border-border text-muted-foreground hover:bg-hover'
                  }`}
                >
                  {m}
                  {metrics[m] && <Check className="w-3.5 h-3.5 text-primary" />}
                </button>
              ))}
            </div>
          </section>

          {/* Channels */}
          <section>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground mb-3">
              Channels ({selAccounts.length} / {accounts.length})
            </p>
            <div className="space-y-1.5">
              {accounts.map((acc) => {
                const Icon  = PLATFORM_ICONS[acc.platform];
                const color = PLATFORM_COLORS[acc.platform];
                const on    = selAccounts.includes(acc.id);
                return (
                  <button
                    key={acc.id}
                    onClick={() => toggleAccount(acc.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded border text-sm transition-colors ${
                      on ? 'border-primary bg-primary/10' : 'border-border hover:bg-hover'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 ${color}`}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium leading-tight">{acc.username}</p>
                      <p className="text-xs text-muted-foreground capitalize">{acc.platform}</p>
                    </div>
                    {on && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex gap-2 px-5 py-4 border-t border-border">
          <Button variant="outline" className="flex-1" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleExport}
            disabled={!canExport || isExporting}
          >
            {isExporting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                Generating…
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Download className="w-3.5 h-3.5" />
                Export PDF
              </span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
