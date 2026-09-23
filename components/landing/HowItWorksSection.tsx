const steps = [
  {
    number: '01',
    title: 'Create your account',
    body: 'Sign up in seconds — just an email and password. No credit card required.',
  },
  {
    number: '02',
    title: 'Connect your platforms',
    body: 'Link Instagram, TikTok, YouTube, Facebook, or LinkedIn through secure OAuth — no passwords shared.',
  },
  {
    number: '03',
    title: 'See your data',
    body: 'Naly fetches your metrics instantly — followers, views, likes, and engagement in clean charts.',
  },
  {
    number: '04',
    title: 'Export and share',
    body: 'Generate a PDF for any time range and metrics. Share with your team or clients.',
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
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
            How it works
          </p>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 600, letterSpacing: '-0.025em', color: '#f1f1f1', maxWidth: 420, lineHeight: 1.2 }}>
            Up and running in minutes
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                background: 'var(--landing-card)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                padding: '1.75rem',
              }}
            >
              <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgba(241,241,241,0.22)', letterSpacing: '0.12em', marginBottom: '1rem' }}>
                {step.number}
              </p>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: '0.5rem', color: '#f1f1f1' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(241,241,241,0.42)', lineHeight: 1.65, margin: 0 }}>
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
