import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'About & Architecture | Mahi UI Component Playground',
  description: 'Architecture documentation, technology stack, and engineering guidelines for the Mahi UI 30-project platform.'
};

export default function AboutPage() {
  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '900px', margin: '0 auto', lineHeight: 1.7 }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          About Mahi UI Component Playground
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', margin: 0 }}>
          One unified website powering 30 interactive frontend tools and design systems.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 0 }}>Mission & Core Philosophy</h2>
          <p style={{ color: 'var(--text-secondary)' }}>
            The Mahi UI Component Playground brings together the power of modern frontend development into a single, cohesive developer platform. Instead of splintering into 30 disconnected repositories or surface-level decorative galleries, every tool is genuinely interactive, client-side verified, and accessible from a unified shell.
          </p>
        </section>

        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 0 }}>Architecture & Technology Stack</h2>
          <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.25rem' }}>
            <li><strong>Framework:</strong> Next.js 16.4.0 with App Router and Turbopack compiler</li>
            <li><strong>UI Layer:</strong> React 19, TypeScript 5.8 with strict typing</li>
            <li><strong>State Management:</strong> Zustand 5 with versioned localStorage schema persistence</li>
            <li><strong>Design Tokens:</strong> Vanilla CSS custom properties with 5 WCAG AAA verified themes</li>
            <li><strong>Graphics & Spatial:</strong> HTML5 Canvas 2D, SVG math, and Three.js 0.186 WebGL studio</li>
            <li><strong>Security:</strong> Zero arbitrary runtime evaluation, strict URL scheme whitelisting, sanitized inputs</li>
          </ul>
        </section>

        <section style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginTop: 0 }}>Quick Navigation</h2>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link href="/projects" style={{ padding: '8px 16px', borderRadius: '6px', background: 'var(--accent-primary)', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
              All 30 Projects Directory →
            </Link>
            <Link href="/studios" style={{ padding: '8px 16px', borderRadius: '6px', background: 'rgba(255,255,255,0.08)', color: 'var(--text-primary)', textDecoration: 'none', fontWeight: 600 }}>
              Design Studios →
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
