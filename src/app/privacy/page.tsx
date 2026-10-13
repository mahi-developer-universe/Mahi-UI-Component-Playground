import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Mahi UI Component Playground',
  description: 'Privacy Policy, data governance, and local browser storage transparency for the Mahi UI platform.'
};

export default function PrivacyPolicyPage() {
  return (
    <div style={{ maxWidth: '850px', margin: '3rem auto', padding: '0 1.5rem', lineHeight: 1.7 }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
          Last updated: October 2026 • Effective immediately
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 0 }}>1. Zero Tracking Philosophy</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Mahi UI is an open-source frontend engineering laboratory designed with strict user privacy principles. We do not use third-party analytics trackers, tracking beacons, cross-site trackers, or commercial advertising scripts.
          </p>
        </section>

        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 0 }}>2. Client-Side Browser Storage (LocalStorage)</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            To personalize your developer experience, Mahi UI saves your active theme choice (<kbd>emerald</kbd>, <kbd>dark</kbd>, <kbd>light</kbd>, <kbd>cyberpunk</kbd>, <kbd>sunset</kbd>), saved bookmarks, and custom token presets strictly in your browser’s LocalStorage. This data never leaves your device and is not synchronized to external marketing servers.
          </p>
        </section>

        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 0 }}>3. Token-Bucket Rate Limiting & Abuse Defense</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Our API endpoints enforce strict in-memory token-bucket rate limiting (60 requests/minute global) to protect against denial of service and automated scraping loops. Network IP strings are processed transiently in memory for rate calculations and are never harvested for behavioral tracking.
          </p>
        </section>

        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 0 }}>4. Contact & Maintainer Address</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            For privacy inquiries, open-source compliance, or audit requests, please contact our core engineering team:
          </p>
          <div style={{ padding: '1rem', background: 'var(--bg-input)', borderRadius: 'var(--radius-md)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
            <strong>Mahi Developer Universe Engineering Office</strong><br />
            Address: Block 4, Cyber City Tech Center, Hyderabad, Telangana 500081, India<br />
            Direct Engineering Email: <a href="mailto:privacy@developeruniverse.dev" style={{ color: 'var(--accent-primary)' }}>privacy@developeruniverse.dev</a><br />
            Repository: <a href="https://github.com/mahi-developer-universe/Mahi-UI-Component-Playground" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>GitHub Open Source</a>
          </div>
        </section>
      </div>

      <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
        <Link href="/" style={{ color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 600 }}>
          ← Return to Playground Hub
        </Link>
      </div>
    </div>
  );
}
