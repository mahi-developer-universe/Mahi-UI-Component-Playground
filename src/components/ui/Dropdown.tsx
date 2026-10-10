import React, { useState, useRef, useEffect } from 'react';

export interface DropdownItem {
  id: string;
  label: string;
  onClick: () => void;
  isDanger?: boolean;
}

export interface DropdownProps {
  label: string;
  items: DropdownItem[];
}

export const Dropdown: React.FC<DropdownProps> = ({ label, items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0.5rem 1rem',
          borderRadius: 'var(--radius-md, 8px)',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
          background: 'var(--bg-secondary, #111827)',
          color: 'var(--text-primary, #ffffff)',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer'
        }}
      >
        <span>{label}</span>
        <span style={{ fontSize: '0.7rem' }}>▼</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            left: 0,
            minWidth: '180px',
            background: 'var(--bg-secondary, #111827)',
            border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
            borderRadius: 'var(--radius-md, 8px)',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
            padding: '4px',
            zIndex: 1000
          }}
        >
          {items.map((item) => (
            <button
              key={item.id}
              role="menuitem"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '0.5rem 0.75rem',
                border: 'none',
                borderRadius: 'var(--radius-sm, 6px)',
                background: 'transparent',
                color: item.isDanger ? '#ef4444' : 'var(--text-secondary, #94a3b8)',
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'background 0.15s ease'
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.08)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
