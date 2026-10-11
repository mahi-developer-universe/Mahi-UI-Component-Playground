'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { CopyButton } from '@/components/ui/CopyButton';

export interface PageSection {
  id: string;
  type: 'hero' | 'features' | 'stats' | 'cta' | 'footer';
  title: string;
  subtitle: string;
  badge?: string;
  buttonText?: string;
  variant?: 'default' | 'glow' | 'bento';
}

const DEFAULT_SECTIONS: PageSection[] = [
  {
    id: 'hero-1',
    type: 'hero',
    title: 'Architect Next-Gen Web Experiences',
    subtitle: 'Composed with production-hardened design tokens, responsive layout grids, and WCAG AA accessible components.',
    badge: 'v2.4 Production Release',
    buttonText: 'Get Started Today',
    variant: 'glow'
  },
  {
    id: 'stats-1',
    type: 'stats',
    title: 'Engineered for Performance and Enterprise Scale',
    subtitle: 'Battle-tested across millions of daily developer interactions and mission-critical workflows.',
    variant: 'bento'
  },
  {
    id: 'features-1',
    type: 'features',
    title: 'Everything You Need in One Unified Studio',
    subtitle: 'From sub-atomic tokens to full-page layouts, streamline your frontend development workflow.',
    variant: 'default'
  },
  {
    id: 'cta-1',
    type: 'cta',
    title: 'Ready to build with Mahi UI?',
    subtitle: 'Jumpstart your next flagship web application in minutes.',
    buttonText: 'Explore Component Registry',
    variant: 'glow'
  }
];

export const VisualPageBuilder: React.FC = () => {
  const [sections, setSections] = useState<PageSection[]>(DEFAULT_SECTIONS);
  const [activeSectionId, setActiveSectionId] = useState<string>(DEFAULT_SECTIONS[0].id);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'canvas' | 'code'>('canvas');

  const activeSection = sections.find((s) => s.id === activeSectionId) || sections[0];

  const updateActiveSection = (key: keyof PageSection, val: any) => {
    setSections((prev) =>
      prev.map((s) => (s.id === activeSectionId ? { ...s, [key]: val } : s))
    );
  };

  const addSection = (type: PageSection['type']) => {
    const newId = `${type}-${Date.now().toString(36)}`;
    const newSection: PageSection = {
      id: newId,
      type,
      title: type === 'hero' ? 'New Hero Headline' : type === 'features' ? 'Key Platform Capabilities' : type === 'stats' ? 'Key Metrics & Telemetry' : type === 'cta' ? 'Call to Action' : 'Footer Navigation',
      subtitle: 'Easily customize subtitles, badge highlights, and action triggers via the visual controls.',
      badge: 'Feature Spotlight',
      buttonText: 'Take Action',
      variant: 'default'
    };
    setSections((prev) => [...prev, newSection]);
    setActiveSectionId(newId);
  };

  const removeSection = (id: string) => {
    if (sections.length <= 1) return;
    const remaining = sections.filter((s) => s.id !== id);
    setSections(remaining);
    if (activeSectionId === id) {
      setActiveSectionId(remaining[0].id);
    }
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;
    const copy = [...sections];
    const [moved] = copy.splice(index, 1);
    copy.splice(targetIndex, 0, moved);
    setSections(copy);
  };

  // Generate complete Next.js Page JSX
  const generateExportCode = () => {
    return `import React from 'react';
import { Card, Button, Badge, StatCard } from '@/components/ui';

export default function CustomMarketingPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-main)', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '4rem' }}>
${sections
  .map((sec) => {
    switch (sec.type) {
      case 'hero':
        return `        {/* Hero Section */}
        <section style={{ textAlign: 'center', padding: '3.5rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
          ${sec.badge ? `<Badge variant="primary">${sec.badge}</Badge>` : ''}
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            ${sec.title}
          </h1>
          <p style={{ maxWidth: '680px', color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.6, margin: 0 }}>
            ${sec.subtitle}
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem' }}>
            <Button variant="primary" size="lg">${sec.buttonText || 'Get Started'}</Button>
            <Button variant="outline" size="lg">Documentation</Button>
          </div>
        </section>`;

      case 'stats':
        return `        {/* Metrics & Stats Section */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>${sec.title}</h2>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>${sec.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <StatCard label="Active Deployments" value="99.98%" change="+0.4% this mo" trend="up" />
            <StatCard label="Global Latency (p99)" value="24ms" change="-12ms optimal" trend="down" />
            <StatCard label="Weekly Active Teams" value="48,200+" change="+14.8%" trend="up" />
          </div>
        </section>`;

      case 'features':
        return `        {/* Key Features Grid */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.5rem 0' }}>${sec.title}</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>${sec.subtitle}</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            <Card variant="bento">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px 0' }}>Adaptive Token Engine</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Instant fluid scaling across typographic musical ratios, border elevations, and high-contrast color palettes.
              </p>
            </Card>
            <Card variant="bento">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px 0' }}>WCAG 2.2 AA Verified</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Built-in automated contrast ratios, screen reader announcements, and robust focus ring navigation.
              </p>
            </Card>
            <Card variant="bento">
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 8px 0' }}>Full Code Portability</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, margin: 0 }}>
                Export clean React+TS, standard HTML5/CSS, and Tailwind snippets without lock-in or extra runtime dependencies.
              </p>
            </Card>
          </div>
        </section>`;

      case 'cta':
        return `        {/* Call to Action Banner */}
        <section style={{ padding: '3rem 2rem', borderRadius: 'var(--radius-xl)', background: 'var(--card-bg)', border: '1px solid var(--border-color)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>${sec.title}</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '540px', margin: 0 }}>${sec.subtitle}</p>
          <Button variant="primary" size="lg" style={{ marginTop: '0.5rem' }}>
            ${sec.buttonText || 'Get Started Now'}
          </Button>
        </section>`;

      default:
        return '';
    }
  })
  .join('\n\n')}
      </div>
    </main>
  );
}`;
  };

  const viewportWidth = viewport === 'desktop' ? '100%' : viewport === 'tablet' ? '768px' : '390px';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      {/* Top Controls Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', background: 'var(--bg-secondary)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Visual Page Canvas Builder</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>
            Compose landing pages, dashboards, and marketing rails with live viewport breakpoints and instant Next.js page export.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          {/* Breakpoint Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            {(['desktop', 'tablet', 'mobile'] as const).map((vp) => (
              <button
                key={vp}
                onClick={() => setViewport(vp)}
                style={{
                  background: viewport === vp ? 'var(--accent-primary)' : 'transparent',
                  color: viewport === vp ? '#fff' : 'var(--text-muted)',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {vp}
              </button>
            ))}
          </div>

          {/* Mode Switcher */}
          <div style={{ display: 'flex', background: 'var(--bg-primary)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveTab('canvas')}
              style={{
                background: activeTab === 'canvas' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'canvas' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Canvas View
            </button>
            <button
              onClick={() => setActiveTab('code')}
              style={{
                background: activeTab === 'code' ? 'var(--accent-primary)' : 'transparent',
                color: activeTab === 'code' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 12px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.75rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Export Code
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'canvas' ? (
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 300px', gap: '1.25rem', alignItems: 'start' }}>
          {/* Left Column: Section Organizer */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
                Page Sections ({sections.length})
              </h4>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  onClick={() => setActiveSectionId(sec.id)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: activeSectionId === sec.id ? 'var(--accent-light)' : 'var(--bg-primary)',
                    border: `1px solid ${activeSectionId === sec.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>#{idx + 1}</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'capitalize' }}>{sec.type}</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(idx, 'up');
                      }}
                      disabled={idx === 0}
                      style={{ background: 'none', border: 'none', cursor: idx === 0 ? 'not-allowed' : 'pointer', opacity: idx === 0 ? 0.3 : 1, fontSize: '0.8rem', color: 'var(--text-main)', padding: '2px 4px' }}
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        moveSection(idx, 'down');
                      }}
                      disabled={idx === sections.length - 1}
                      style={{ background: 'none', border: 'none', cursor: idx === sections.length - 1 ? 'not-allowed' : 'pointer', opacity: idx === sections.length - 1 ? 0.3 : 1, fontSize: '0.8rem', color: 'var(--text-main)', padding: '2px 4px' }}
                      title="Move down"
                    >
                      ▼
                    </button>
                    {sections.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSection(sec.id);
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--status-danger)', fontSize: '0.8rem', padding: '2px 4px' }}
                        title="Remove section"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>+ Add New Section:</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                <Button variant="outline" size="sm" onClick={() => addSection('hero')}>+ Hero</Button>
                <Button variant="outline" size="sm" onClick={() => addSection('features')}>+ Features</Button>
                <Button variant="outline" size="sm" onClick={() => addSection('stats')}>+ Stats</Button>
                <Button variant="outline" size="sm" onClick={() => addSection('cta')}>+ CTA Banner</Button>
              </div>
            </div>
          </div>

          {/* Middle Column: Interactive Responsive Canvas */}
          <div style={{ display: 'flex', justifyContent: 'center', background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', minHeight: '600px', overflowX: 'auto' }}>
            <div
              style={{
                width: viewportWidth,
                transition: 'width 0.25s ease-out',
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                padding: '2rem 1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '2.5rem',
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              {sections.map((sec) => {
                const isSelected = sec.id === activeSectionId;
                const outline = isSelected ? '2px dashed var(--accent-primary)' : '1px dashed transparent';

                switch (sec.type) {
                  case 'hero':
                    return (
                      <div
                        key={sec.id}
                        onClick={() => setActiveSectionId(sec.id)}
                        style={{ outline, outlineOffset: '8px', borderRadius: 'var(--radius-md)', padding: '1rem', cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}
                      >
                        {sec.badge && <Badge variant="primary">{sec.badge}</Badge>}
                        <h1 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                          {sec.title}
                        </h1>
                        <p style={{ maxWidth: '580px', color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, margin: 0 }}>
                          {sec.subtitle}
                        </p>
                        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                          <Button variant="primary">{sec.buttonText || 'Get Started'}</Button>
                          <Button variant="outline">Learn More</Button>
                        </div>
                      </div>
                    );

                  case 'stats':
                    return (
                      <div
                        key={sec.id}
                        onClick={() => setActiveSectionId(sec.id)}
                        style={{ outline, outlineOffset: '8px', borderRadius: 'var(--radius-md)', padding: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                      >
                        <div style={{ textAlign: 'center' }}>
                          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 4px 0' }}>{sec.title}</h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{sec.subtitle}</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: viewport === 'mobile' ? '1fr' : 'repeat(3, 1fr)', gap: '1rem' }}>
                          <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UPTIME SLA</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '4px' }}>99.98%</div>
                          </div>
                          <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>GLOBAL P99</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '4px' }}>24ms</div>
                          </div>
                          <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ENGINEERS</div>
                            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-primary)', marginTop: '4px' }}>48,000+</div>
                          </div>
                        </div>
                      </div>
                    );

                  case 'features':
                    return (
                      <div
                        key={sec.id}
                        onClick={() => setActiveSectionId(sec.id)}
                        style={{ outline, outlineOffset: '8px', borderRadius: 'var(--radius-md)', padding: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                      >
                        <div style={{ textAlign: 'center' }}>
                          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: '0 0 4px 0' }}>{sec.title}</h3>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>{sec.subtitle}</p>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: viewport === 'mobile' ? '1fr' : 'repeat(2, 1fr)', gap: '1rem' }}>
                          <Card variant="bento">
                            <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 700 }}>Adaptive Design Tokens</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Harmonic typography ratios and fluid contrast calculation.</p>
                          </Card>
                          <Card variant="bento">
                            <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', fontWeight: 700 }}>Clean Zero-Lockin Export</h4>
                            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Independent React and HTML files ready for immediate production deployment.</p>
                          </Card>
                        </div>
                      </div>
                    );

                  case 'cta':
                    return (
                      <div
                        key={sec.id}
                        onClick={() => setActiveSectionId(sec.id)}
                        style={{ outline, outlineOffset: '8px', borderRadius: 'var(--radius-md)', padding: '1.75rem 1.25rem', cursor: 'pointer', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}
                      >
                        <h3 style={{ fontSize: '1.35rem', fontWeight: 700, margin: 0 }}>{sec.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '440px', margin: 0 }}>{sec.subtitle}</p>
                        <Button variant="primary">{sec.buttonText || 'Get Started Now'}</Button>
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          </div>

          {/* Right Column: Section Properties Inspector */}
          <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
              Section Properties
            </h4>

            {activeSection && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Section Type</span>
                  <div style={{ marginTop: '4px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'capitalize' }}>
                    {activeSection.type}
                  </div>
                </div>

                <Input
                  label="Headline Title"
                  value={activeSection.title}
                  onChange={(e) => updateActiveSection('title', e.target.value)}
                />

                <Input
                  label="Subtitle / Description"
                  value={activeSection.subtitle}
                  onChange={(e) => updateActiveSection('subtitle', e.target.value)}
                />

                {(activeSection.type === 'hero' || activeSection.type === 'cta') && (
                  <Input
                    label="Action Button Label"
                    value={activeSection.buttonText || ''}
                    onChange={(e) => updateActiveSection('buttonText', e.target.value)}
                  />
                )}

                {activeSection.type === 'hero' && (
                  <Input
                    label="Spotlight Badge Text"
                    value={activeSection.badge || ''}
                    onChange={(e) => updateActiveSection('badge', e.target.value)}
                  />
                )}

                <div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Container Variant</span>
                  <Select
                    value={activeSection.variant || 'default'}
                    onChange={(e) => updateActiveSection('variant', e.target.value)}
                    options={[
                      { value: 'default', label: 'Default Minimal' },
                      { value: 'bento', label: 'Bento Surface' },
                      { value: 'glow', label: 'Ambient Glow' }
                    ]}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Code Export Tab */
        <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-lg)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700 }}>Production Next.js Page Export</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Zero-dependency Next.js 16 / React 19 functional component using Mahi UI design tokens.
              </p>
            </div>
            <CopyButton text={generateExportCode()} label="Copy Page Component" />
          </div>

          <pre style={{ margin: 0, padding: '1.25rem', background: '#0a0d14', color: '#e6edf3', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', overflowX: 'auto', fontFamily: 'monospace', lineHeight: 1.5 }}>
            {generateExportCode()}
          </pre>
        </div>
      )}
    </div>
  );
};
