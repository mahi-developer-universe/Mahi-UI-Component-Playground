'use client';

import React from 'react';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsModal: React.FC<ShortcutsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + K / ⌘K', description: 'Open omni command palette & global search' },
    { key: 'Esc', description: 'Close modals, drawers, and menus' },
    { key: 'Tab', description: 'Navigate through interactive elements sequentially' },
    { key: 'Enter / Space', description: 'Activate buttons, tabs, and toggles' },
    { key: 'Alt + T', description: 'Cycle through design themes' },
    { key: 'Home / End', description: 'Scroll to top or bottom of workspace' }
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="shortcuts-title"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9995,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: 'var(--bg-card, #161e2e)',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
          borderRadius: 'var(--radius-xl, 16px)',
          width: '100%',
          maxWidth: '540px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>⌨️</span>
            <h3 id="shortcuts-title" style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Keyboard Shortcuts
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close keyboard shortcuts modal"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: '4px',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {shortcuts.map((s, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.6rem 0.85rem',
                borderRadius: 'var(--radius-md, 8px)',
                background: 'var(--bg-input, rgba(255, 255, 255, 0.03))'
              }}
            >
              <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>{s.description}</span>
              <kbd
                style={{
                  padding: '3px 8px',
                  borderRadius: '6px',
                  background: 'var(--bg-card, #111827)',
                  border: '1px solid var(--border-color, rgba(255, 255, 255, 0.2))',
                  color: 'var(--accent-primary, #10b981)',
                  fontFamily: 'var(--font-mono, monospace)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  boxShadow: '0 2px 0 rgba(0, 0, 0, 0.4)'
                }}
              >
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div
          style={{
            padding: '1rem 1.5rem',
            background: 'rgba(0, 0, 0, 0.2)',
            borderTop: '1px solid var(--border-color)',
            textAlign: 'right'
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: '0.45rem 1.25rem',
              fontSize: '0.85rem',
              fontWeight: 600,
              background: 'var(--accent-primary, #10b981)',
              color: '#000',
              border: 'none',
              borderRadius: 'var(--radius-md, 8px)',
              cursor: 'pointer'
            }}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};
