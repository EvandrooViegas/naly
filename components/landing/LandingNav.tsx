'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useUser } from '@clerk/nextjs';

export default function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.3s ease, border-color 0.3s ease',
        background: scrolled ? 'rgba(6,6,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      <div
        className="landing-container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
          <Image
            src="/logo/logo-white.png"
            alt="Naly"
            width={72}
            height={24}
            style={{ objectFit: 'contain', display: 'block' }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav
          style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
          className="nav-links"
        >
          {[
            { label: 'Features', href: '#features' },
            { label: 'How it works', href: '#how-it-works' },
            { label: 'Platforms', href: '#platforms' },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              style={{
                fontSize: '0.875rem',
                color: 'rgba(241,241,241,0.55)',
                transition: 'color 0.2s',
                fontWeight: 400,
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f1f1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(241,241,241,0.55)')}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Auth CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          {isLoaded && isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#0a0a0a',
                  background: '#3ea6ff',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  transition: 'background 0.2s, transform 0.15s',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#5ab5ff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3ea6ff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Go to dashboard
              </Link>
              <Link
                href="/dashboard"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: 'rgba(255,255,255,0.1)',
                }}
              >
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user.fullName ?? 'Profile'}
                    width={32}
                    height={32}
                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                ) : (
                  <span style={{ fontSize: '0.75rem', color: '#f1f1f1', fontWeight: 500 }}>
                    {user?.firstName?.[0] ?? '?'}
                  </span>
                )}
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                style={{
                  fontSize: '0.875rem',
                  color: 'rgba(241,241,241,0.55)',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#f1f1f1')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(241,241,241,0.55)')}
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#0a0a0a',
                  background: '#3ea6ff',
                  padding: '0.5rem 1.25rem',
                  borderRadius: '8px',
                  transition: 'background 0.2s, transform 0.15s',
                  textDecoration: 'none',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#5ab5ff';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3ea6ff';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                Get started free
              </Link>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) { .nav-links { display: none !important; } }
      `}</style>
    </header>
  );
}
