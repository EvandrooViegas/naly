import Image from 'next/image';
import Link from 'next/link';

const links: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Platforms', href: '#platforms' },
  ],
  Account: [
    { label: 'Sign in', href: '/sign-in' },
    { label: 'Create account', href: '/sign-up' },
  ],
  Company: [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
};

export default function LandingFooter() {
  return (
    <footer
      style={{
        background: 'var(--landing-bg)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '4rem 0 2.5rem',
      }}
    >
      <div className="landing-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '3rem',
            marginBottom: '3.5rem',
          }}
        >
          {/* Brand */}
          <div>
            <Link href="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
              <Image
                src="/logo/logo-white.png"
                alt="Naly"
                width={88}
                height={30}
                style={{ objectFit: 'contain' }}
              />
            </Link>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'rgba(241,241,241,0.35)',
                lineHeight: 1.65,
                maxWidth: 220,
                margin: 0,
              }}
            >
              The analytics dashboard for creators who want to grow across every platform.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: 'rgba(241,241,241,0.28)',
                  textTransform: 'uppercase',
                  marginBottom: '1rem',
                }}
              >
                {group}
              </div>
              <ul
                style={{
                  listStyle: 'none',
                  margin: 0,
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.625rem',
                }}
              >
                {items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      style={{
                        fontSize: '0.875rem',
                        color: 'rgba(241,241,241,0.42)',
                        transition: 'color 0.15s',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f1f1')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(241,241,241,0.42)')}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.06)',
            paddingTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <p style={{ fontSize: '0.8125rem', color: 'rgba(241,241,241,0.22)', margin: 0 }}>
            © {new Date().getFullYear()} Naly. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {['Privacy', 'Terms', 'Cookies'].map((label) => (
              <Link
                key={label}
                href={label === 'Privacy' ? '/privacy' : label === 'Terms' ? '/terms' : '#'}
                style={{
                  fontSize: '0.8125rem',
                  color: 'rgba(241,241,241,0.22)',
                  transition: 'color 0.15s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(241,241,241,0.55)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(241,241,241,0.22)')}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
