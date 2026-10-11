import React from 'react';

export interface RadioOption {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  label?: string;
  error?: string;
  disabled?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  label,
  error,
  disabled = false
}) => {
  const [internalValue, setInternalValue] = React.useState(defaultValue || (options[0] ? options[0].value : ''));
  const activeValue = value !== undefined ? value : internalValue;

  const handleChange = (val: string) => {
    if (value === undefined) {
      setInternalValue(val);
    }
    onChange?.(val);
  };

  return (
    <fieldset
      style={{
        border: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.65rem'
      }}
    >
      {label && (
        <legend style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
          {label}
        </legend>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {options.map((opt) => {
          const isSelected = activeValue === opt.value;
          const isDisabled = disabled || opt.disabled;
          const optionId = `${name}-${opt.value}`;

          return (
            <label
              key={opt.value}
              htmlFor={optionId}
              style={{
                display: 'inline-flex',
                alignItems: 'flex-start',
                gap: '0.65rem',
                cursor: isDisabled ? 'not-allowed' : 'pointer',
                opacity: isDisabled ? 0.6 : 1,
                userSelect: 'none'
              }}
            >
              <input
                type="radio"
                id={optionId}
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={isDisabled}
                onChange={() => !isDisabled && handleChange(opt.value)}
                style={{
                  width: '18px',
                  height: '18px',
                  accentColor: 'var(--accent-primary, #2563eb)',
                  cursor: isDisabled ? 'not-allowed' : 'pointer',
                  margin: '2px 0 0 0'
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {opt.label}
                </span>
                {opt.description && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {opt.description}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>

      {error && (
        <span style={{ fontSize: '0.72rem', color: 'var(--danger, #ef4444)', fontWeight: 500 }}>
          {error}
        </span>
      )}
    </fieldset>
  );
};
