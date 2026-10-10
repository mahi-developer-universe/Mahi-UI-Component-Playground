import React from 'react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '3.5rem 1.5rem',
        borderRadius: 'var(--radius-xl, 16px)',
        background: 'var(--bg-card, #161e2e)',
        border: '1px dashed var(--border-color, rgba(255, 255, 255, 0.15))',
        color: 'var(--text-secondary)'
      }}
    >
      {icon && (
        <div style={{ marginBottom: '1rem', color: 'var(--text-muted)' }}>
          {icon}
        </div>
      )}
      <h4 style={{ margin: '0 0 6px 0', fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)' }}>
        {title}
      </h4>
      <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.9rem', maxWidth: '440px', lineHeight: 1.5 }}>
        {description}
      </p>
      {action && <div>{action}</div>}
    </div>
  );
};
