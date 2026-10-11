import React from 'react';

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
  description?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  change,
  trend = 'neutral',
  icon,
  description,
  style,
  ...props
}) => {
  const trendColor = {
    up: '#10b981',
    down: '#ef4444',
    neutral: 'var(--text-muted, #94a3b8)'
  }[trend];

  const trendIcon = {
    up: '↑',
    down: '↓',
    neutral: '•'
  }[trend];

  return (
    <div
      style={{
        background: 'var(--bg-card, #161e2e)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
        borderRadius: 'var(--radius-lg, 12px)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        minWidth: '200px',
        ...style
      }}
      {...props}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {label}
        </span>
        {icon && <span style={{ color: 'var(--text-muted)' }}>{icon}</span>}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
          {value}
        </span>
        {change && (
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: trendColor }}>
            {trendIcon} {change}
          </span>
        )}
      </div>

      {description && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          {description}
        </span>
      )}
    </div>
  );
};
