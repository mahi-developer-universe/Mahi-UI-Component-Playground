import React from 'react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id?: string;
  message: string;
  variant?: 'info' | 'success' | 'warning' | 'danger';
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  variant = 'success',
  onClose
}) => {
  const iconMap = {
    info: 'ℹ',
    success: '✓',
    warning: '⚠',
    danger: '✕'
  };

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('toast', `toast-${variant}`)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        background: 'var(--bg-secondary, #111827)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
        color: 'var(--text-primary, #ffffff)',
        padding: '0.65rem 1rem',
        borderRadius: 'var(--radius-md, 8px)',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)',
        fontSize: '0.875rem',
        fontWeight: 500,
        animation: 'slideUp 0.25s ease-out'
      }}
    >
      <span
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.75rem',
          fontWeight: 800,
          background: variant === 'success' ? '#10b981' : variant === 'danger' ? '#ef4444' : 'var(--accent-primary)',
          color: '#ffffff'
        }}
      >
        {iconMap[variant]}
      </span>
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          aria-label="Dismiss toast"
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
            padding: '2px 4px',
            fontSize: '0.9rem',
            marginLeft: '6px'
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
};
