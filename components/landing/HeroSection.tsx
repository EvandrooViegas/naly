import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--landing-bg)',
        paddingTop: '10rem',
        paddingBottom: '6rem',
      }}
    >
      {/* Subtle radial glow — kept intentionally dim */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background:
            'radial-gradient(ellipse at center, rgba(62,166,255,0.09) 0%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />

      <div className="landing-container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Label */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '2rem',
            padding: '0.3rem 0.875rem',
            borderRadius: '9999px',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.8125rem',
            color: 'rgba(241,241,241,0.45)',
            letterSpacing: '0.02em',
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: '#00d4aa',
              display: 'inline-block',
              flexShrink: 0,
            }}
          />
          Now supporting YouTube &amp; LinkedIn
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.25rem)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            color: '#f1f1f1',
          }}
        >
          All your social analytics
          <br />
          <span style={{ color: '#3ea6ff' }}>in one place</span>
        </h1>

        {/* Sub-headline */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            color: 'rgba(241,241,241,0.45)',
            maxWidth: '500px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.75,
          }}
        >
          Connect Instagram, TikTok, YouTube, Facebook and LinkedIn.
          Track growth, compare performance, and export reports — without switching tabs.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
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
              padding: '0.75rem 1.875rem',
              borderRadius: '8px',
              transition: 'opacity 0.15s',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
          >
            Start for free
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
              padding: '0.75rem 1.875rem',
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
      </div>
    </section>
  );
}
