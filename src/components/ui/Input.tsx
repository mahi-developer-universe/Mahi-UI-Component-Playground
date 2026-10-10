import React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  hint,
  className,
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', width: '100%' }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            color: 'var(--text-secondary)'
          }}
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn('resource-category-select', className)}
        style={{
          width: '100%',
          background: 'var(--bg-input)',
          border: error ? '1px solid var(--danger)' : '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '0.55rem 0.85rem',
          color: 'var(--text-primary)',
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'border-color 0.2s ease'
        }}
        {...props}
      />
      {hint && !error && (
        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{hint}</span>
      )}
      {error && (
        <span style={{ fontSize: '0.72rem', color: 'var(--danger)', fontWeight: 500 }}>{error}</span>
      )}
    </div>
  );
};
