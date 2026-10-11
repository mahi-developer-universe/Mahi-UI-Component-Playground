import React from 'react';
import { cn } from '@/lib/utils';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  description?: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, error, className, id, checked, disabled, onChange, ...props }, ref) => {
    const checkboxId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <label
          htmlFor={checkboxId}
          style={{
            display: 'inline-flex',
            alignItems: 'flex-start',
            gap: '0.65rem',
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            userSelect: 'none'
          }}
          className={className}
        >
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', marginTop: '2px' }}>
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              checked={checked}
              disabled={disabled}
              onChange={onChange}
              style={{
                width: '18px',
                height: '18px',
                borderRadius: '4px',
                accentColor: 'var(--accent-primary, #2563eb)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                margin: 0
              }}
              {...props}
            />
          </div>
          {label && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                {label}
              </span>
              {description && (
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {description}
                </span>
              )}
            </div>
          )}
        </label>
        {error && (
          <span style={{ fontSize: '0.72rem', color: 'var(--danger, #ef4444)', fontWeight: 500, marginLeft: '28px' }}>
            {error}
          </span>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
