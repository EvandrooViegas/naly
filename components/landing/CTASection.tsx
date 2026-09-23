import Link from 'next/link';

const trust = [
  { label: 'OAuth secured' },
  { label: '5-minute setup' },
  { label: 'No credit card' },
];

export default function CTASection() {
  return (
    <section style={{ padding: 'var(--section-y) 0', background: 'var(--landing-bg)' }}>
      <div className="landing-container">
        <div
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: 'clamp(2.5rem, 8vw, 5rem) clamp(2rem, 6vw, 4rem)',
            textAlign: 'center',
            background: 'rgba(255,255,255,0.02)',
          }}
        >
          <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', color: 'rgba(241,241,241,0.3)', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
            Free to start
          </p>

          <h2
            style={{
              fontSize: 'clamp(1.875rem, 5vw, 3rem)',
              fontWeight: 600,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              color: '#f1f1f1',
            }}
          >
            Your growth story starts right now
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.9375rem, 2vw, 1.0625rem)',
              color: 'rgba(241,241,241,0.42)',
              maxWidth: 440,
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}
          >
            Connect your first account for free. No credit card. No hidden limits.
            See real data in under five minutes.
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginBottom: '2rem',
            }}
          >
            <Link
              href="/sign-up"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#3ea6ff',
                color: '#0a0a0a',
                fontWeight: 600,
                fontSize: '0.9375rem',
                padding: '0.8125rem 2rem',
                borderRadius: '8px',
                transition: 'opacity 0.15s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Create free account
              <svg width="15" height="15" fill="none" viewBox="0 0 15 15" aria-hidden>
                <path d="M3 7.5h9M8.5 4l3.5 3.5L8.5 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            <Link
              href="/sign-in"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'transparent',
                color: 'rgba(241,241,241,0.65)',
                fontWeight: 500,
                fontSize: '0.9375rem',
                padding: '0.8125rem 2rem',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.1)',
                transition: 'border-color 0.15s, color 0.15s',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.color = '#f1f1f1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = 'rgba(241,241,241,0.65)';
              }}
            >
              Sign in
            </Link>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            {trust.map((item, i) => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ fontSize: '0.8125rem', color: 'rgba(241,241,241,0.3)' }}>{item.label}</span>
                {i < trust.length - 1 && (
                  <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.1)', display: 'inline-block' }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
