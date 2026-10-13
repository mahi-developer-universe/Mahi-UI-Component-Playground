import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You | Mahi UI Component Playground',
  description: 'Thank you for connecting with the Mahi UI developer platform.'
};

export default function ThankYouPage() {
  return (
    <div style={{ maxWidth: '780px', margin: '4rem auto', padding: '0 1.5rem', textAlign: 'center' }}>
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: 'var(--accent-light, rgba(16, 185, 129, 0.15))',
          color: 'var(--accent-primary, #10b981)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          marginBottom: '1.5rem'
        }}
      >
        ✓
      </div>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>
        Thank You for Your Feedback!
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, margin: '0 auto 2.5rem auto' }}>
        Your inquiry or feedback has been registered with the Mahi Developer Universe team. We will review your submission and continue shipping open-source frontend improvements.
      </p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          href="/"
          className="interactive-hover"
          style={{
            padding: '0.8rem 1.8rem',
            background: 'var(--accent-primary, #10b981)',
            color: '#000',
            fontWeight: 700,
            borderRadius: 'var(--radius-md, 8px)',
            textDecoration: 'none'
          }}
        >
          Return to Hub
        </Link>
        <Link
          href="/projects"
          style={{
            padding: '0.8rem 1.8rem',
            background: 'var(--bg-card, #161e2e)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontWeight: 600,
            borderRadius: 'var(--radius-md, 8px)',
            textDecoration: 'none'
          }}
        >
          Browse 30 Projects
        </Link>
      </div>
    </div>
  );
}
