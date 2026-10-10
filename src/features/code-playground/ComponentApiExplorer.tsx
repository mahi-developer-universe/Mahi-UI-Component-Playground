'use client';

import React from 'react';
import { ComponentRegistryItem } from '@/types/registry';

interface ComponentApiExplorerProps {
  component: ComponentRegistryItem;
}

export const ComponentApiExplorer: React.FC<ComponentApiExplorerProps> = ({ component }) => {
  return (
    <div
      style={{
        background: 'var(--bg-card, #161e2e)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.1))',
        borderRadius: 'var(--radius-lg, 12px)',
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}
    >
      {/* Component Header info */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {component.title}
            </h3>
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                padding: '2px 8px',
                borderRadius: '12px',
                background: 'rgba(56, 189, 248, 0.1)',
                color: 'var(--accent-primary, #38bdf8)',
                fontWeight: 700
              }}
            >
              {component.category}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {component.description}
          </p>
        </div>

        {/* Installation copy tip */}
        <div
          style={{
            background: 'var(--bg-secondary, #0f172a)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-md, 8px)',
            padding: '6px 12px',
            fontSize: '0.8rem',
            fontFamily: 'monospace',
            color: 'var(--text-muted)'
          }}
        >
          import &#123; {component.previewComponent.replace('Preview', '')} &#125; from &apos;@/components/ui/{component.previewComponent.replace('Preview', '')}&apos;;
        </div>
      </div>

      {/* Props Specification Table */}
      <div>
        <h4 style={{ margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
          Component Props & Parameter Specification
        </h4>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.85rem'
            }}
          >
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 12px' }}>Prop</th>
                <th style={{ padding: '8px 12px' }}>Type</th>
                <th style={{ padding: '8px 12px' }}>Default</th>
                <th style={{ padding: '8px 12px' }}>Options / Values</th>
                <th style={{ padding: '8px 12px' }}>Description</th>
              </tr>
            </thead>
            <tbody>
              {component.props.map((prop) => (
                <tr
                  key={prop.name}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-primary)'
                  }}
                >
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--accent-primary, #38bdf8)', fontWeight: 600 }}>
                    {prop.name}
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: '#a78bfa' }}>
                    {prop.type}
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', color: 'var(--text-secondary)' }}>
                    {String(prop.defaultValue ?? '-')}
                  </td>
                  <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {prop.options ? prop.options.join(' | ') : 'any'}
                  </td>
                  <td style={{ padding: '8px 12px', color: 'var(--text-secondary)' }}>
                    {prop.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Accessibility & Interaction matrix notes */}
      {component.accessibility && (
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: 'var(--radius-md, 8px)',
            padding: '12px 16px',
            fontSize: '0.85rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 700 }}>
            <span>♿ Accessibility & Interaction Specification</span>
            {component.accessibility.role && (
              <span style={{ fontSize: '0.75rem', padding: '1px 6px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '4px' }}>
                role=&quot;{component.accessibility.role}&quot;
              </span>
            )}
          </div>
          {component.accessibility.keyboardNavigation && (
            <div style={{ color: 'var(--text-secondary)' }}>
              <strong>Keyboard Navigation:</strong> {component.accessibility.keyboardNavigation}
            </div>
          )}
          {component.accessibility.wcagNotes && (
            <div style={{ color: 'var(--text-secondary)' }}>
              <strong>WCAG Compliance:</strong> {component.accessibility.wcagNotes}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
