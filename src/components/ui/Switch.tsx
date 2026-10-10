import React from 'react';
import { cn } from '@/lib/utils';

export interface SwitchProps {
  id?: string;
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
  className = ''
}) => {
  const switchId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.65rem',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1
      }}
      onClick={() => !disabled && onChange(!checked)}
      className={className}
    >
      <button
        type="button"
        role="switch"
        id={switchId}
        aria-checked={checked}
        disabled={disabled}
        style={{
          width: '38px',
          height: '22px',
          borderRadius: '9999px',
          background: checked ? 'var(--accent-primary)' : 'var(--bg-input)',
          border: '1px solid var(--border-color)',
          position: 'relative',
          padding: '2px',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s ease, border-color 0.2s ease',
          outline: 'none'
        }}
      >
        <span
          style={{
            display: 'block',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            background: '#ffffff',
            transform: checked ? 'translateX(16px)' : 'translateX(0)',
            transition: 'transform 0.2s ease',
            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
          }}
        />
      </button>
      {label && (
        <label
          htmlFor={switchId}
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-primary)',
            cursor: disabled ? 'not-allowed' : 'pointer',
            userSelect: 'none'
          }}
        >
          {label}
        </label>
      )}
    </div>
  );
};
