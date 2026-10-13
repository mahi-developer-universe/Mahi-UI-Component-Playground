import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Mahi UI Component Playground',
  description: 'Terms of service and MIT open-source licensing agreement for the Mahi UI developer platform.'
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '850px', margin: '3rem auto', padding: '0 1.5rem', lineHeight: 1.7 }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          Terms of Service
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', margin: 0 }}>
          Last updated: October 2026 • MIT Open Source License
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 0 }}>1. License & Permitted Use</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            The Mahi UI Component Playground, its source code, tokens, and components are provided under the terms of the MIT License. You are permitted to inspect, fork, embed, and incorporate the component designs into commercial and non-commercial software products without royalty fees.
          </p>
        </section>

        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 0 }}>2. Acceptable Conduct & Fair Use</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Users must not perform automated denial of service (DoS) floods, credential stuffing, or distributed attacks against the public demo platform. Endpoints are guarded with automatic token-bucket rate limits and requests exceeding quotas will receive HTTP 429 status responses.
          </p>
        </section>

        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 0 }}>3. Disclaimer of Warranty</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            The software is provided &quot;as is&quot;, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and noninfringement.
          </p>
        </section>

        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginTop: 0 }}>4. Maintainer Physical Address</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            Mahi Developer Universe Lab, Cyber City Tech Center, Hyderabad, Telangana 500081, India.<br />
            Email: <a href="mailto:terms@developeruniverse.dev" style={{ color: 'var(--accent-primary)' }}>terms@developeruniverse.dev</a>
          </p>
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
