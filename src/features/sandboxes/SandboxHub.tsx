'use client';

import React, { useState, useMemo } from 'react';
import { SANDBOX_REGISTRY, SandboxItem } from './sandboxRegistry';
import { SandboxModal } from './SandboxModal';
import { SandboxVectorIcon } from './SandboxVectorIcon';
import interactiveRendered from '@/data/projects/interactive-rendered.json';

// Embedded Studio Components
import { ColorPaletteStudio } from '@/features/color-palette-studio';
import { ThemeStudio } from '@/features/theme-studio';
import { TypographyStudio } from '@/features/typography-studio';
import { IconExplorer } from '@/features/icon-explorer';
import { BackgroundStudio } from '@/features/background-studio';
import { MotionLab } from '@/features/animation-lab';
import { VisualPageBuilder } from '@/features/page-builder';
import { ComponentRecipeBuilder, AccessibleChartStudio } from '@/features/design-system';
import { ThreeLab } from '@/features/three-d-studio/ThreeLab';

interface SandboxHubProps {
  onShowToast: (msg: string) => void;
}

export const SandboxHub: React.FC<SandboxHubProps> = ({ onShowToast }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeInlineSandbox, setActiveInlineSandbox] = useState<SandboxItem | null>(SANDBOX_REGISTRY[0]);
  const [modalSandbox, setModalSandbox] = useState<SandboxItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Sandboxes', count: SANDBOX_REGISTRY.length },
    { id: 'studios', label: 'Creative Studios', count: SANDBOX_REGISTRY.filter((s) => s.category === 'studios').length },
    { id: 'fx-labs', label: 'Animations & FX', count: SANDBOX_REGISTRY.filter((s) => s.category === 'fx-labs').length },
    { id: 'dev-tools', label: 'Dev Productivity', count: SANDBOX_REGISTRY.filter((s) => s.category === 'dev-tools').length }
  ];

  const filteredSandboxes = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return SANDBOX_REGISTRY.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q));
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const renderActiveInlineWorkspace = () => {
    if (!activeInlineSandbox) return null;

    switch (activeInlineSandbox.id) {
      case 'studio-colors':
        return <ColorPaletteStudio />;
      case 'studio-themes':
        return <ThemeStudio />;
      case 'studio-typography':
        return <TypographyStudio />;
      case 'studio-icons':
        return <IconExplorer />;
      case 'studio-backgrounds':
        return <BackgroundStudio />;
      case 'studio-motion':
        return <MotionLab />;
      case 'studio-pagebuilder':
        return <VisualPageBuilder />;
      case 'studio-recipes':
        return <ComponentRecipeBuilder />;
      case 'studio-charts':
        return <AccessibleChartStudio />;
      case 'studio-threed':
        return (
          <div style={{ height: '420px', width: '100%', position: 'relative' }}>
            <ThreeLab />
          </div>
        );
      default:
        if (activeInlineSandbox.interactiveModule) {
          const html = (interactiveRendered as Record<string, string>)[activeInlineSandbox.interactiveModule];
          if (html) {
            return (
              <div
                className="interactive-mount-wrapper"
                dangerouslySetInnerHTML={{ __html: html }}
                onClick={async (e) => {
                  const target = e.target as HTMLElement;
                  const button = target.closest('button') as HTMLButtonElement | null;
                  if (!button) return;
                  const text = button.innerText.trim();
                  if (text.toLowerCase().includes('copy')) {
                    const { copyToClipboard } = await import('@/lib/utils');
                    await copyToClipboard(button.getAttribute('data-code') || text);
                    onShowToast(`Copied snippet to clipboard 📋`);
                  } else {
                    onShowToast(`Action Triggered: ${text || 'Interactive Control'}`);
                  }
                }}
              />
            );
          }
        }
        return (
          <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Interactive sandbox initialized.
          </div>
        );
    }
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Top Banner & Heading */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '1.25rem',
          paddingBottom: '1.5rem',
          borderBottom: '1px solid var(--border-color)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '3px 8px',
                borderRadius: '4px'
              }}
            >
              Interactive Hub
            </span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {SANDBOX_REGISTRY.length} Interactive Sandboxes Available
            </span>
          </div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 6px 0', color: 'var(--text-main)' }}>
            Developer Sandboxes & <span className="gradient-text">Interactive Labs</span>
          </h2>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '720px' }}>
            Test live color scales, design tokens, cubic-bezier motion curves, 3D spatial scenes, page section layouts, and interactive developer tools with zero setup.
          </p>
        </div>

        {/* Global Search inside Sandboxes */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%', maxWidth: '380px' }}>
          <div className="search-bar-wrapper" style={{ width: '100%' }}>
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search sandboxes (e.g. contrast, bezier, canvas)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '0 4px' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            style={{
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${selectedCategory === cat.id ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              background: selectedCategory === cat.id ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.03)',
              color: selectedCategory === cat.id ? 'var(--accent-primary)' : 'var(--text-secondary)',
              fontWeight: selectedCategory === cat.id ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.15s ease'
            }}
          >
            <span>{cat.label}</span>
            <span
              style={{
                fontSize: '0.75rem',
                padding: '1px 6px',
                borderRadius: '10px',
                background: selectedCategory === cat.id ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.08)',
                color: selectedCategory === cat.id ? '#ffffff' : 'var(--text-muted)'
              }}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Active Featured Sandbox Runner */}
      {activeInlineSandbox && (
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl, 16px)',
            boxShadow: 'var(--glass-shadow)',
            overflow: 'hidden'
          }}
        >
          {/* Active Workspace Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1rem 1.5rem',
              borderBottom: '1px solid var(--border-color)',
              background: 'rgba(255, 255, 255, 0.02)',
              flexWrap: 'wrap',
              gap: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <span
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  background: 'var(--accent-light)',
                  border: '1px solid var(--border-color)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-primary)'
                }}
              >
                <SandboxVectorIcon iconId={activeInlineSandbox.id} size={20} />
              </span>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {activeInlineSandbox.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono, monospace)',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: 'var(--accent-primary)',
                      background: 'rgba(16, 185, 129, 0.15)',
                      padding: '2px 8px',
                      borderRadius: '4px'
                    }}
                  >
                    {activeInlineSandbox.badge}
                  </span>
                </div>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Active Workspace • {activeInlineSandbox.categoryLabel}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => {
                  setModalSandbox(activeInlineSandbox);
                  onShowToast(`Opened ${activeInlineSandbox.title} in Full Screen Modal`);
                }}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid var(--accent-primary)',
                  background: 'var(--accent-light)',
                  color: 'var(--accent-primary)',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
                title="Open Sandbox in Full Screen Dialog"
              >
                <span>⤢ Full-Screen Modal</span>
              </button>
              <button
                onClick={() => {
                  setActiveInlineSandbox(null);
                  onShowToast('Closed sandbox workspace preview');
                }}
                style={{
                  padding: '6px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-color)',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
                title="Collapse Workspace"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Active Workspace Interactive Body */}
          <div style={{ padding: '1.75rem' }}>
            {renderActiveInlineWorkspace()}
          </div>
        </div>
      )}

      {/* Grid of All Available Sandboxes */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
            Catalog of Live Sandboxes ({filteredSandboxes.length})
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Click &apos;Launch Sandbox&apos; to load inline or &apos;Full Screen&apos; to maximize
          </span>
        </div>

        {filteredSandboxes.length === 0 ? (
          <div
            style={{
              padding: '3rem',
              textAlign: 'center',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-muted)'
            }}
          >
            No sandboxes match &quot;{searchQuery}&quot;. Try adjusting your keywords.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
            {filteredSandboxes.map((item) => {
              const isActive = activeInlineSandbox?.id === item.id;
              return (
                <div
                  key={item.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                    borderRadius: 'var(--radius-lg, 12px)',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    boxShadow: isActive ? '0 0 20px var(--accent-glow)' : 'var(--glass-shadow)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                      <span
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '8px',
                          background: 'var(--bg-secondary)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid var(--border-color)',
                          color: 'var(--accent-primary)',
                          flexShrink: 0
                        }}
                      >
                        <SandboxVectorIcon iconId={item.id} size={18} />
                      </span>
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-main)' }}>
                          {item.title}
                        </h4>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          {item.categoryLabel}
                        </span>
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '2px 6px',
                        borderRadius: '4px',
                        background: 'var(--accent-light)',
                        color: 'var(--accent-primary)',
                        fontFamily: 'var(--font-mono, monospace)'
                      }}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.825rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      flex: 1
                    }}
                  >
                    {item.description}
                  </p>

                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {item.keywords.slice(0, 4).map((kw) => (
                      <span
                        key={kw}
                        style={{
                          fontSize: '0.7rem',
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          color: 'var(--text-muted)',
                          border: '1px solid var(--border-color)'
                        }}
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '8px', marginTop: 'auto', paddingTop: '0.5rem' }}>
                    <button
                      onClick={() => {
                        setActiveInlineSandbox(item);
                        onShowToast(`Loaded ${item.title} Sandbox 🚀`);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      style={{
                        flex: 1,
                        padding: '7px 12px',
                        borderRadius: '6px',
                        background: isActive ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                        color: isActive ? '#ffffff' : 'var(--text-primary)',
                        border: '1px solid var(--border-color)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <span>{isActive ? '✓ Active Inline' : 'Launch Inline'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setModalSandbox(item);
                        onShowToast(`Expanded ${item.title} to Full Screen Modal`);
                      }}
                      style={{
                        padding: '7px 12px',
                        borderRadius: '6px',
                        background: 'var(--accent-light)',
                        border: '1px solid var(--accent-primary)',
                        color: 'var(--accent-primary)',
                        fontWeight: 600,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title="Launch in Full-Screen Modal View"
                    >
                      <span>⤢ Modal</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Full-Screen Modal Runner */}
      {modalSandbox && (
        <SandboxModal
          sandbox={modalSandbox}
          onClose={() => setModalSandbox(null)}
          onToast={onShowToast}
        />
      )}
    </div>
  );
};
