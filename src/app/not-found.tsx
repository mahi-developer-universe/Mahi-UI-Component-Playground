import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', flexDirection: 'column', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 800 }}>404 — Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '440px', fontSize: '0.9rem' }}>
        The component or studio page you are looking for does not exist.
      </p>
      <Link href="/" className="btn btn-primary" style={{ marginTop: '0.5rem', textDecoration: 'none' }}>
        Return to Playground
      </Link>
    </div>
  );
}
