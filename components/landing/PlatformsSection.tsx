const platforms = [
  {
    name: 'Instagram',
    color: '#E1306C',
    metrics: ['Followers', 'Reach', 'Impressions', 'Engagement'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    color: '#f1f1f1',
    metrics: ['Views', 'Likes', 'Shares', 'Followers'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M9 12a4 4 0 104 4V4a5 5 0 005 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    color: '#FF0000',
    metrics: ['Views', 'Subscribers', 'Watch time', 'CTR'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 9l5 3-5 3V9z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    color: '#1877F2',
    metrics: ['Page likes', 'Reach', 'Engagement', 'Shares'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M15 8h-2a1 1 0 00-1 1v2h3l-.5 3H12v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    color: '#0A66C2',
    metrics: ['Followers', 'Impressions', 'Engagement', 'Clicks'],
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 10v7M7 7v1M12 17v-4a2 2 0 014 0v4M12 10v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function PlatformsSection() {
  return (
    <section
      id="platforms"
      style={{
        padding: 'var(--section-y) 0',
        background: 'var(--landing-surface)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="landing-container">
        <div style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(241,241,241,0.3)', textTransform: 'uppercase', margin: '0 0 0.875rem' }}>
            Integrations
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.025em', color: '#f1f1f1', maxWidth: 420, lineHeight: 1.2 }}>
            Every platform you're on
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {platforms.map((p) => (
            <div
              key={p.name}
              style={{
                background: 'var(--landing-card)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '1.5rem',
              }}
            >
              <div style={{ color: p.color, marginBottom: '0.875rem' }}>
                {p.icon}
              </div>
              <p style={{ fontSize: '0.9375rem', fontWeight: 600, color: '#f1f1f1', marginBottom: '0.75rem' }}>
                {p.name}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                {p.metrics.map((m) => (
                  <span key={m} style={{ fontSize: '0.8125rem', color: 'rgba(241,241,241,0.35)' }}>{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
