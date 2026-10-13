'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CANONICAL_PROJECTS } from '@/data/projects/canonicalRegistry';
import { useAppStore } from '@/stores/appStore';
import { ThemeName } from '@/types';
import { THEMES } from '@/types/theme.types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { setTheme } = useAppStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProjects = CANONICAL_PROJECTS.filter((p) => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q))
    );
  }).slice(0, 8);

  const themeActions = THEMES.map((t) => ({
    type: 'theme' as const,
    id: t.id,
    title: `Switch Theme: ${t.name}`,
    theme: t.id
  }));

  const allActions = [
    ...filteredProjects.map((p) => ({
      type: 'project' as const,
      id: p.id,
      title: `#${p.num < 10 ? `0${p.num}` : p.num} ${p.title}`,
      subtitle: p.categoryLabel,
      route: p.route
    })),
    ...(query.toLowerCase().includes('theme') ? themeActions : [])
  ];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % allActions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + allActions.length) % allActions.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const action = allActions[selectedIndex];
      if (action) {
        if (action.type === 'project' && action.route) {
          router.push(action.route);
          onClose();
        } else if (action.type === 'theme' && action.theme) {
          setTheme(action.theme);
          document.documentElement.setAttribute('data-theme', action.theme);
          onClose();
        }
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(5, 8, 16, 0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '15vh'
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '620px',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--glass-shadow)',
          overflow: 'hidden'
        }}
        onKeyDown={handleKeyDown}
      >
        <div style={{ display: 'flex', alignItems: 'center', padding: '14px 18px', borderBottom: '1px solid var(--border-color)' }}>
          <span style={{ color: 'var(--text-muted)', marginRight: '10px' }}>🔍</span>
          <input
            autoFocus
            type="text"
            placeholder="Type a project, tool, or 'theme'..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '1rem',
              fontFamily: 'inherit'
            }}
          />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ESC to close</span>
        </div>

        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '6px' }}>
          {allActions.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              No matching projects or actions found for &quot;{query}&quot;
            </div>
          ) : (
            allActions.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    if (item.type === 'project' && item.route) {
                      router.push(item.route);
                      onClose();
                    } else if (item.type === 'theme' && item.theme) {
                      setTheme(item.theme);
                      document.documentElement.setAttribute('data-theme', item.theme);
                      onClose();
                    }
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: isSelected ? 'var(--accent-light)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {item.title}
                    </div>
                    {'subtitle' in item && item.subtitle && (
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {item.subtitle}
                      </div>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                    Jump →
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
