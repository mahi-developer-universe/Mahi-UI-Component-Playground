'use client';

import React from 'react';
import { SandboxItem } from './sandboxRegistry';
import { SandboxVectorIcon } from './SandboxVectorIcon';
import interactiveRendered from '@/data/projects/interactive-rendered.json';

// Direct Studios Components
import { ColorPaletteStudio } from '@/features/color-palette-studio';
import { ThemeStudio } from '@/features/theme-studio';
import { TypographyStudio } from '@/features/typography-studio';
import { IconExplorer } from '@/features/icon-explorer';
import { BackgroundStudio } from '@/features/background-studio';
import { MotionLab } from '@/features/animation-lab';
import { VisualPageBuilder } from '@/features/page-builder';
import { ComponentRecipeBuilder, AccessibleChartStudio, ReactNativeStudio, DomReverseEngineeringStudio } from '@/features/design-system';
import { ThreeLab } from '@/features/three-d-studio/ThreeLab';

interface SandboxModalProps {
  sandbox: SandboxItem;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const SandboxModal: React.FC<SandboxModalProps> = ({
  sandbox,
  onClose,
  onToast
}) => {
  // Render embedded studio or interactive module HTML
  const renderSandboxContent = () => {
    switch (sandbox.id) {
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
          <div style={{ height: '480px', width: '100%', position: 'relative' }}>
            <ThreeLab onClose={onClose} />
          </div>
        );
      case 'studio-reactnative':
        return <ReactNativeStudio />;
      case 'studio-reverse':
        return <DomReverseEngineeringStudio />;
      default:
        if (sandbox.interactiveModule) {
          const html = (interactiveRendered as Record<string, string>)[sandbox.interactiveModule];
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
                    onToast(`Copied snippet to clipboard 📋`);
                  } else {
                    onToast(`Action Triggered: ${text || 'Interactive Control'}`);
                  }
                }}
              />
            );
          }
        }
        return (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            Sandbox container loaded and ready.
          </div>
        );
    }
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        background: 'rgba(5, 8, 16, 0.88)',
        backdropFilter: 'blur(14px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.25rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="interactive-modal-window"
        style={{
          background: 'var(--bg-primary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl, 16px)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px var(--accent-glow)',
          width: '100%',
          maxWidth: '1200px',
          maxHeight: '94vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Window Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'var(--bg-card)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                background: 'var(--accent-light)',
                border: '1px solid var(--border-color)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-primary)',
                flexShrink: 0
              }}
            >
              <SandboxVectorIcon iconId={sandbox.id} size={22} />
            </span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  {sandbox.title}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-mono, monospace)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--accent-primary)',
                    background: 'rgba(16, 185, 129, 0.15)',
                    padding: '2px 8px',
                    borderRadius: '4px'
                  }}
                >
                  {sandbox.badge}
                </span>
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                {sandbox.categoryLabel} Sandbox • Full Screen Interactive Mode
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => {
                onToast('Sandbox expanded to maximum workspace view');
              }}
              style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                borderRadius: '6px',
                padding: '5px 10px',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              ⤢ Focus
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                fontWeight: 600,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
              title="Close Full Screen Sandbox"
            >
              ✕ Close Sandbox
            </button>
          </div>
        </div>

        {/* Modal Window Content Area */}
        <div
          style={{
            padding: '1.75rem',
            overflowY: 'auto',
            flex: 1,
            background: 'var(--bg-primary)'
          }}
        >
          {renderSandboxContent()}
        </div>
      </div>
    </div>
  );
};
