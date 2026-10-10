'use client';

import React from 'react';
import { ComponentProp } from '@/types/registry';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Slider } from '@/components/ui/Slider';

interface PropertyEditorProps {
  propsConfig: ComponentProp[];
  values: Record<string, any>;
  onChange: (name: string, value: any) => void;
  onReset: () => void;
}

export const PropertyEditor: React.FC<PropertyEditorProps> = ({
  propsConfig,
  values,
  onChange,
  onReset
}) => {
  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-muted)' }}>
          Component Properties
        </h4>
        <button
          onClick={onReset}
          className="action-btn"
          style={{ fontSize: '0.75rem', padding: '3px 8px' }}
          title="Reset to default props"
        >
          Reset Defaults
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {propsConfig.map((prop) => {
          const val = values[prop.name] !== undefined ? values[prop.name] : prop.defaultValue;

          if (prop.type === 'string') {
            return (
              <Input
                key={prop.name}
                label={prop.label}
                value={String(val)}
                onChange={(e) => onChange(prop.name, e.target.value)}
                hint={prop.description}
              />
            );
          }

          if (prop.type === 'select' && prop.options) {
            return (
              <Select
                key={prop.name}
                label={prop.label}
                options={prop.options}
                value={String(val)}
                onChange={(e) => onChange(prop.name, e.target.value)}
              />
            );
          }

          if (prop.type === 'boolean') {
            return (
              <div key={prop.name} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <Switch
                  label={prop.label}
                  checked={Boolean(val)}
                  onChange={(checked) => onChange(prop.name, checked)}
                />
                {prop.description && (
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {prop.description}
                  </span>
                )}
              </div>
            );
          }

          if (prop.type === 'number') {
            return (
              <Slider
                key={prop.name}
                label={prop.label}
                value={Number(val)}
                min={prop.min ?? 0}
                max={prop.max ?? 100}
                step={prop.step ?? 1}
                onChange={(num) => onChange(prop.name, num)}
              />
            );
          }

          return null;
        })}
      </div>
    </div>
  );
};
