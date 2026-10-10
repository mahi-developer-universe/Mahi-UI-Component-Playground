import React from 'react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  children,
  onClose,
  style,
  ...props
}) => {
  const variantMap: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    info: {
      bg: 'rgba(56, 189, 248, 0.1)',
      border: 'rgba(56, 189, 248, 0.3)',
      text: '#38bdf8',
      icon: 'ℹ'
    },
    success: {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.3)',
      text: '#10b981',
      icon: '✓'
    },
    warning: {
      bg: 'rgba(245, 158, 11, 0.1)',
      border: 'rgba(245, 158, 11, 0.3)',
      text: '#f59e0b',
      icon: '⚠'
    },
    danger: {
      bg: 'rgba(239, 68, 68, 0.1)',
      border: 'rgba(239, 68, 68, 0.3)',
      text: '#ef4444',
      icon: '✕'
    }
  };

  const current = variantMap[variant];

  return (
    <div
      role="alert"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '1rem 1.25rem',
        borderRadius: 'var(--radius-md, 8px)',
        background: current.bg,
        border: `1px solid ${current.border}`,
        color: 'var(--text-primary)',
        ...style
      }}
      {...props}
    >
      <span
        style={{
          color: current.text,
          fontWeight: 800,
          fontSize: '1rem',
          lineHeight: 1.2
        }}
      >
        {current.icon}
      </span>
      <div style={{ flex: 1 }}>
        {title && (
          <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '2px', color: current.text }}>
            {title}
          </div>
        )}
        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
          {children}
        </div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss alert"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px 4px',
            fontSize: '1rem'
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};
