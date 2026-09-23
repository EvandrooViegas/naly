import Image from 'next/image';

const T1 = 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80&auto=format&fit=crop&crop=face';
const T2 = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80&auto=format&fit=crop&crop=face';
const T3 = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80&auto=format&fit=crop&crop=face';
const T4 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80&auto=format&fit=crop&crop=face';
const T5 = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&q=80&auto=format&fit=crop&crop=face';
const T6 = 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80&auto=format&fit=crop&crop=face';

const testimonials = [
  {
    quote:
      "I used to spend an hour every Monday pulling numbers from four different apps. Naly cut that to literally zero — I open one page and everything's there.",
    name: 'Sarah Chen',
    role: 'Content creator, 480k followers',
    avatar: T1,
  },
  {
    quote:
      "The PDF export is a game changer for client reporting. I select the date range, click export, and send it. Clients love how clean it looks.",
    name: 'Marcus Webb',
    role: 'Social media manager',
    avatar: T2,
  },
  {
    quote:
      "Finally a tool that shows me TikTok and YouTube side by side. I can actually see which platform is growing faster without juggling spreadsheets.",
    name: 'Priya Nair',
    role: 'YouTuber & TikToker, 1.2M views/month',
    avatar: T3,
  },
  {
    quote:
      "Super fast to set up. I connected all five of my brand accounts in about four minutes and had a report ready before my morning coffee was done.",
    name: 'James Torres',
    role: 'Brand strategist',
    avatar: T4,
  },
  {
    quote:
      "The engagement rate tracking is exactly what I needed. Now I can tell my sponsors actual numbers instead of rough estimates.",
    name: 'Lea Hoffman',
    role: 'Lifestyle influencer',
    avatar: T5,
  },
  {
    quote:
      "I recommended Naly to my whole team. We each manage a different brand page and finally have a shared view of all our stats.",
    name: 'Daniel Park',
    role: 'Agency owner',
    avatar: T6,
  },
];

function Stars() {
  return (
    <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#ffc107" aria-hidden>
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section
      style={{
        padding: 'var(--section-y) 0',
        background: 'var(--landing-bg)',
        overflow: 'hidden',
      }}
    >
      <div className="landing-container" style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
        <span className="badge" style={{ marginBottom: '1.25rem', display: 'inline-flex' }}>
          Testimonials
        </span>
        <h2
          style={{
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            marginBottom: '1rem',
          }}
        >
          Creators actually use it
        </h2>
        <p
          style={{
            fontSize: '1.0625rem',
            color: 'rgba(241,241,241,0.42)',
            maxWidth: 400,
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Don&apos;t take our word for it.
        </p>
      </div>

      <div className="landing-container">
        <div style={{ columns: 'auto 300px', columnGap: '1.25rem' }}>
          {testimonials.map((t) => (
            <div
              key={t.name}
              style={{
                breakInside: 'avoid',
                marginBottom: '1.25rem',
                background: 'var(--landing-card)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '14px',
                padding: '1.75rem',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(62,166,255,0.2)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)')
              }
            >
              <Stars />
              <p
                style={{
                  fontSize: '0.9375rem',
                  color: 'rgba(241,241,241,0.7)',
                  lineHeight: 1.7,
                  margin: '0 0 1.25rem',
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    flexShrink: 0,
                    position: 'relative',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <Image src={t.avatar} alt={t.name} fill style={{ objectFit: 'cover' }} sizes="36px" />
                </div>
                <div>
                  <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{t.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'rgba(241,241,241,0.35)' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
