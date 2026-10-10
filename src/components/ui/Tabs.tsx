import React, { useState } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
}

export const Tabs: React.FC<TabsProps> = ({ items, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab || (items[0] ? items[0].id : ''));

  return (
    <div style={{ width: '100%' }}>
      <div
        role="tablist"
        style={{
          display: 'flex',
          gap: '4px',
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '4px',
          borderRadius: 'var(--radius-md, 8px)',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))'
        }}
      >
        {items.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(item.id)}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: 'var(--radius-sm, 6px)',
                background: isActive ? 'var(--accent-primary, #2563eb)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        style={{
          marginTop: '1rem',
          padding: '1.25rem',
          background: 'var(--bg-card, #161e2e)',
          borderRadius: 'var(--radius-lg, 12px)',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))'
        }}
      >
        {items.find((item) => item.id === activeTab)?.content}
      </div>
    </div>
  );
};
