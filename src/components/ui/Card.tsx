import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bento' | 'glass' | 'interactive';
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    default: {
      background: 'var(--bg-card, #161e2e)',
      border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
      borderRadius: 'var(--radius-lg, 12px)',
      padding: '1.5rem',
      boxShadow: 'var(--shadow-sm)'
    },
    bento: {
      background: 'var(--bg-secondary, #111827)',
      border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
      borderRadius: 'var(--radius-xl, 16px)',
      padding: '1.75rem',
      transition: 'transform 0.2s ease, border-color 0.2s ease'
    },
    glass: {
      background: 'rgba(255, 255, 255, 0.04)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      borderRadius: 'var(--radius-lg, 12px)',
      padding: '1.5rem'
    },
    interactive: {
      background: 'var(--bg-card, #161e2e)',
      border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
      borderRadius: 'var(--radius-lg, 12px)',
      padding: '1.5rem',
      cursor: 'pointer',
      transition: 'transform 0.2s ease, box-shadow 0.2s ease'
    }
  };

  return (
    <div
      style={{
        ...variantStyles[variant],
        position: 'relative'
      }}
      className={`card ${variant === 'interactive' ? 'card-hoverable' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
