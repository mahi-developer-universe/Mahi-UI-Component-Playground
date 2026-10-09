'use client';

import React from 'react';
import { FrontendProject } from '@/types';
import interactiveRendered from '@/data/projects/interactive-rendered.json';

interface ProjectModalProps {
  project: FrontendProject;
  onClose: () => void;
  onToast: (msg: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onToast }) => {
  const renderedHtml = project.interactiveModule
    ? (interactiveRendered as Record<string, string>)[project.interactiveModule]
    : null;

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(5, 8, 16, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="interactive-modal-window"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl, 16px)',
          boxShadow: 'var(--glass-shadow)',
          width: '100%',
          maxWidth: '920px',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Modal Header */}
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-mono, monospace)',
                fontSize: '0.85rem',
                fontWeight: 700,
                color: 'var(--accent-primary)',
                background: 'rgba(16, 185, 129, 0.15)',
                padding: '4px 10px',
                borderRadius: '6px'
              }}
            >
              Project #{project.num}
            </span>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-main)' }}>
                {project.title}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Category: {project.sectionLabel} • Inspired by {project.inspiredBy}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s'
            }}
            title="Close Modal"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div
          style={{
            padding: '1.75rem',
            overflowY: 'auto',
            flex: 1
          }}
        >
          <div style={{ marginBottom: '1.25rem' }}>
            <p style={{ margin: '0 0 1rem 0', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {project.features.map((feat) => (
                <span
                  key={feat}
                  style={{
                    fontSize: '0.75rem',
                    background: 'var(--bg-secondary, rgba(255,255,255,0.06))',
                    border: '1px solid var(--border-color)',
                    padding: '3px 8px',
                    borderRadius: '4px',
                    color: 'var(--text-muted)'
                  }}
                >
                  ✓ {feat}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive Workspace */}
          {renderedHtml ? (
            <div
              className="interactive-mount-wrapper"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                const button = target.closest('button');
                if (button) {
                  const text = button.innerText.trim();
                  onToast(`Interacted with: ${text || 'Action Button'}`);
                }
              }}
            />
          ) : (
            <div
              style={{
                padding: '3rem 2rem',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.02)',
                borderRadius: '12px',
                border: '1px dashed var(--border-color)'
              }}
            >
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>
                Component Playground Suite
              </h4>
              <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                This is the core foundation suite (#1). You can preview and test all 7 component suites in the main showcase section!
              </p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div
          style={{
            padding: '1rem 1.75rem',
            borderTop: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Status: Verified Functional Implementation
          </span>
          <button
            onClick={onClose}
            className="action-btn"
            style={{
              padding: '6px 16px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};
