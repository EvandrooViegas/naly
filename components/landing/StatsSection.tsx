const stats = [
  { value: '5',      unit: 'platforms', label: 'Instagram, TikTok, YouTube, Facebook & LinkedIn' },
  { value: '2,400+', unit: 'creators',  label: 'Active users tracking their growth every day' },
  { value: '98%',    unit: 'uptime',    label: 'Data pipelines keeping your metrics fresh' },
  { value: '< 5min', unit: 'setup',     label: 'Connect all accounts and see your first report' },
];

export default function StatsSection() {
  return (
    <section style={{ background: 'var(--landing-bg)', padding: '5rem 0' }}>
      <div className="landing-container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {stats.map((s) => (
            <div
              key={s.value}
              style={{
                background: 'var(--landing-card)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '1.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.375rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: 'clamp(1.875rem, 4vw, 2.5rem)', fontWeight: 700, letterSpacing: '-0.04em', color: '#f1f1f1', lineHeight: 1 }}>
                  {s.value}
                </span>
                <span style={{ fontSize: '0.8125rem', color: 'rgba(241,241,241,0.35)' }}>
                  {s.unit}
                </span>
              </div>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(241,241,241,0.38)', margin: 0, lineHeight: 1.5 }}>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
