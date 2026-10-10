'use client';

import React, { useState, useMemo } from 'react';
import { COMPONENT_REGISTRY } from '@/data/components/registry';
import { PropertyEditor } from './PropertyEditor';
import { ComponentPreviewCanvas } from './PreviewCanvas';
import { CodeExporter } from './CodeExporter';
import { generateCodeSnippet } from '@/lib/registry';

export const InteractiveComponentPlayground: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>(COMPONENT_REGISTRY[0].id);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const selectedItem = useMemo(() => {
    return COMPONENT_REGISTRY.find((c) => c.id === selectedComponentId) || COMPONENT_REGISTRY[0];
  }, [selectedComponentId]);

  // Track active props for selected component
  const [propsState, setPropsState] = useState<Record<string, Record<string, any>>>(() => {
    const initial: Record<string, Record<string, any>> = {};
    COMPONENT_REGISTRY.forEach((item) => {
      initial[item.id] = {};
      item.props.forEach((p) => {
        initial[item.id][p.name] = p.defaultValue;
      });
    });
    return initial;
  });

  const activeProps = propsState[selectedItem.id] || {};

  const handlePropChange = (name: string, value: any) => {
    setPropsState((prev) => ({
      ...prev,
      [selectedItem.id]: {
        ...prev[selectedItem.id],
        [name]: value
      }
    }));
  };

  const handleResetProps = () => {
    const defaults: Record<string, any> = {};
    selectedItem.props.forEach((p) => {
      defaults[p.name] = p.defaultValue;
    });
    setPropsState((prev) => ({
      ...prev,
      [selectedItem.id]: defaults
    }));
  };

  // Generate live code snippets based on active prop state
  const generatedReact = useMemo(() => {
    return generateCodeSnippet(selectedItem.codeTemplates.react, activeProps);
  }, [selectedItem, activeProps]);

  const generatedHtml = useMemo(() => {
    return generateCodeSnippet(selectedItem.codeTemplates.html, activeProps);
  }, [selectedItem, activeProps]);

  const generatedTailwind = useMemo(() => {
    return selectedItem.codeTemplates.tailwind
      ? generateCodeSnippet(selectedItem.codeTemplates.tailwind, activeProps)
      : undefined;
  }, [selectedItem, activeProps]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
      {/* Component Selector Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {COMPONENT_REGISTRY.map((comp) => (
            <button
              key={comp.id}
              onClick={() => setSelectedComponentId(comp.id)}
              className={`proj-tab-btn ${selectedComponentId === comp.id ? 'active' : ''}`}
              style={{ fontSize: '0.85rem', padding: '0.5rem 1rem' }}
            >
              {comp.title}
            </button>
          ))}
        </div>

        {/* Viewport size controls */}
        <div className="responsive-controls" style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            className={`size-btn ${viewport === 'mobile' ? 'active' : ''}`}
            onClick={() => setViewport('mobile')}
            title="Mobile (380px)"
          >
            <span>Mobile</span>
          </button>
          <button
            className={`size-btn ${viewport === 'tablet' ? 'active' : ''}`}
            onClick={() => setViewport('tablet')}
            title="Tablet (720px)"
          >
            <span>Tablet</span>
          </button>
          <button
            className={`size-btn ${viewport === 'desktop' ? 'active' : ''}`}
            onClick={() => setViewport('desktop')}
            title="Desktop (100%)"
          >
            <span>Desktop</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Live Canvas + Property Controls */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <ComponentPreviewCanvas
            componentId={selectedItem.id}
            propValues={activeProps}
            viewport={viewport}
          />

          {/* Accessibility Info Bar */}
          {selectedItem.accessibility && (
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '0.65rem 0.85rem',
                display: 'flex',
                gap: '0.5rem',
                alignItems: 'center'
              }}
            >
              <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>A11y:</span>
              <span>{selectedItem.accessibility.keyboardNavigation || selectedItem.accessibility.wcagNotes}</span>
            </div>
          )}
        </div>

        {/* Property Controls */}
        <PropertyEditor
          propsConfig={selectedItem.props}
          values={activeProps}
          onChange={handlePropChange}
          onReset={handleResetProps}
        />
      </div>

      {/* Synchronized Generated Code Viewer */}
      <CodeExporter
        codeReact={generatedReact}
        codeHtml={generatedHtml}
        codeTailwind={generatedTailwind}
      />
    </div>
  );
};
