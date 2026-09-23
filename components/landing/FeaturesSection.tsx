const features = [
  {
    tag: 'Multi-platform',
    title: 'Every channel, one dashboard',
    body: 'Stop switching between apps. See Instagram, TikTok, YouTube, Facebook, and LinkedIn side by side — followers, views, likes, and engagement rate, always up to date.',
    bullets: ['Real-time follower counts', 'Engagement rate tracking', 'Cross-platform comparison'],
  },
  {
    tag: 'Filtering',
    title: 'Slice your data any way you want',
    body: 'Filter by platform, date range, or account. Zoom into last 7 days or compare quarter over quarter. Custom date ranges give you full control.',
    bullets: ['Last 7, 30 or 90 days', 'Custom date range picker', 'Per-account breakdowns'],
  },
  {
    tag: 'Export',
    title: 'Reports your clients will love',
    body: 'Generate clean PDF reports in one click. Choose your metrics, pick a date range, and share a polished document — no spreadsheet juggling required.',
    bullets: ['One-click PDF export', 'Choose which metrics to include', 'White-label ready'],
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ padding: 'var(--section-y) 0', background: 'var(--landing-bg)' }}>
      <div className="landing-container">
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(241,241,241,0.3)', textTransform: 'uppercase', marginBottom: '0.875rem', margin: '0 0 0.875rem' }}>
            Features
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.025em', color: '#f1f1f1', maxWidth: 520, lineHeight: 1.2 }}>
            Built for creators who take growth seriously
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {features.map((f) => (
            <div
              key={f.tag}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.4fr',
                background: 'var(--landing-card)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '2rem 2rem', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', color: '#3ea6ff', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {f.tag}
                </p>
                <h3 style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.35, color: '#f1f1f1' }}>
                  {f.title}
                </h3>
              </div>
              <div style={{ padding: '2rem 2rem' }}>
                <p style={{ fontSize: '0.9375rem', color: 'rgba(241,241,241,0.46)', lineHeight: 1.75, marginBottom: '1.25rem' }}>
                  {f.body}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {f.bullets.map((b) => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                      <svg width="14" height="14" fill="none" viewBox="0 0 14 14" aria-hidden>
                        <path d="M3 7l2.5 2.5L11 4.5" stroke="#3ea6ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span style={{ fontSize: '0.875rem', color: 'rgba(241,241,241,0.5)' }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          #features [data-feat] { grid-template-columns: 1fr !important; }
          #features [data-feat] > div:first-child { border-right: none !important; border-bottom: 1px solid rgba(255,255,255,0.05); }
        }
      `}</style>
    </section>
  );
}
