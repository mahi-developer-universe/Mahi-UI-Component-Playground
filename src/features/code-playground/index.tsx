'use client';

import React, { useState, useMemo } from 'react';
import { COMPONENT_REGISTRY } from '@/data/components/registry';
import { PropertyEditor } from './PropertyEditor';
import { ComponentPreviewCanvas } from './PreviewCanvas';
import { CodeExporter } from './CodeExporter';
import { ComponentApiExplorer } from './ComponentApiExplorer';
import { LiveCodeSandbox } from './LiveCodeSandbox';
import { generateCodeSnippet } from '@/lib/registry';
import { generateReactNativeSnippet } from '@/lib/reactNativeGenerator';
import { generateVueSnippet } from '@/lib/vueGenerator';
import { generateSvelteSnippet } from '@/lib/svelteGenerator';

export const InteractiveComponentPlayground: React.FC = () => {
  const [selectedComponentId, setSelectedComponentId] = useState<string>(COMPONENT_REGISTRY[0].id);
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile' | 'ultrawide'>('desktop');
  const [activeViewMode, setActiveViewMode] = useState<'workbench' | 'live-editor' | 'api-docs'>('workbench');
  const [simulatedState, setSimulatedState] = useState<'default' | 'hover' | 'focus' | 'disabled' | 'loading' | 'error'>('default');

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

  // Safely restore component and prop state from URL query parameters if present
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams(window.location.search);
      const urlComp = params.get('component');
      const urlProps = params.get('props');

      if (urlComp && COMPONENT_REGISTRY.some((c) => c.id === urlComp)) {
        setSelectedComponentId(urlComp);
      }

      if (urlProps) {
        const decoded = JSON.parse(decodeURIComponent(urlProps));
        if (decoded && typeof decoded === 'object' && !Array.isArray(decoded)) {
          const compId = urlComp || selectedComponentId;
          setPropsState((prev) => ({
            ...prev,
            [compId]: {
              ...prev[compId],
              ...decoded
            }
          }));
        }
      }
    } catch {
      // Graceful fallback if URL parameter is malformed
    }
  }, []);

  // History stacks for Undo / Redo
  const [historyPast, setHistoryPast] = useState<Record<string, Record<string, any>[]>>({});
  const [historyFuture, setHistoryFuture] = useState<Record<string, Record<string, any>[]>>({});

  const activeProps = propsState[selectedItem.id] || {};

  const handlePropChange = (name: string, value: any) => {
    const current = propsState[selectedItem.id] || {};
    setHistoryPast((prev) => ({
      ...prev,
      [selectedItem.id]: [...(prev[selectedItem.id] || []), { ...current }]
    }));
    setHistoryFuture((prev) => ({
      ...prev,
      [selectedItem.id]: []
    }));
    setPropsState((prev) => ({
      ...prev,
      [selectedItem.id]: {
        ...prev[selectedItem.id],
        [name]: value
      }
    }));
  };

  const handleUndo = () => {
    const past = historyPast[selectedItem.id] || [];
    if (past.length === 0) return;
    const previous = past[past.length - 1];
    const newPast = past.slice(0, past.length - 1);
    const current = propsState[selectedItem.id] || {};

    setHistoryPast((prev) => ({ ...prev, [selectedItem.id]: newPast }));
    setHistoryFuture((prev) => ({ ...prev, [selectedItem.id]: [current, ...(prev[selectedItem.id] || [])] }));
    setPropsState((prev) => ({ ...prev, [selectedItem.id]: previous }));
  };

  const handleRedo = () => {
    const future = historyFuture[selectedItem.id] || [];
    if (future.length === 0) return;
    const next = future[0];
    const newFuture = future.slice(1);
    const current = propsState[selectedItem.id] || {};

    setHistoryFuture((prev) => ({ ...prev, [selectedItem.id]: newFuture }));
    setHistoryPast((prev) => ({ ...prev, [selectedItem.id]: [...(prev[selectedItem.id] || []), current] }));
    setPropsState((prev) => ({ ...prev, [selectedItem.id]: next }));
  };

  const handleResetProps = () => {
    const current = propsState[selectedItem.id] || {};
    const defaults: Record<string, any> = {};
    selectedItem.props.forEach((p) => {
      defaults[p.name] = p.defaultValue;
    });

    setHistoryPast((prev) => ({
      ...prev,
      [selectedItem.id]: [...(prev[selectedItem.id] || []), { ...current }]
    }));
    setHistoryFuture((prev) => ({ ...prev, [selectedItem.id]: [] }));
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

  const generatedReactNative = useMemo(() => {
    return generateReactNativeSnippet(selectedItem.id, activeProps);
  }, [selectedItem, activeProps]);

  const generatedVue = useMemo(() => {
    return generateVueSnippet(selectedItem.id, activeProps);
  }, [selectedItem, activeProps]);

  const generatedSvelte = useMemo(() => {
    return generateSvelteSnippet(selectedItem.id, activeProps);
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

        {/* Viewport & View Mode Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button
              onClick={() => setActiveViewMode('workbench')}
              style={{
                background: activeViewMode === 'workbench' ? 'var(--accent-primary)' : 'transparent',
                color: activeViewMode === 'workbench' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Workbench
            </button>
            <button
              onClick={() => setActiveViewMode('live-editor')}
              style={{
                background: activeViewMode === 'live-editor' ? 'var(--accent-primary)' : 'transparent',
                color: activeViewMode === 'live-editor' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>⚡ Live Sandbox</span>
            </button>
            <button
              onClick={() => setActiveViewMode('api-docs')}
              style={{
                background: activeViewMode === 'api-docs' ? 'var(--accent-primary)' : 'transparent',
                color: activeViewMode === 'api-docs' ? '#fff' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              API Spec
            </button>
          </div>

          {(activeViewMode === 'workbench' || activeViewMode === 'live-editor') && (
            <div className="responsive-controls" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}>
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
                title="Desktop (1024px)"
              >
                <span>Desktop</span>
              </button>
              <button
                className={`size-btn ${viewport === 'ultrawide' ? 'active' : ''}`}
                onClick={() => setViewport('ultrawide')}
                title="Ultrawide (100%)"
              >
                <span>Full</span>
              </button>

              {/* Interactive State Simulator Pills */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px', marginLeft: '6px', paddingLeft: '6px', borderLeft: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginRight: '2px' }}>State:</span>
                {(['default', 'hover', 'focus', 'disabled', 'loading', 'error'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setSimulatedState(st)}
                    style={{
                      background: simulatedState === st ? 'var(--accent-primary)' : 'var(--bg-secondary)',
                      color: simulatedState === st ? '#fff' : 'var(--text-muted)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '2px 6px',
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  try {
                    const encoded = encodeURIComponent(JSON.stringify(activeProps));
                    const shareUrl = `${window.location.origin}${window.location.pathname}?component=${selectedComponentId}&props=${encoded}`;
                    navigator.clipboard.writeText(shareUrl);
                    alert('Copied shareable configuration link to clipboard!');
                  } catch {
                    alert('Could not copy link');
                  }
                }}
                className="action-btn"
                style={{ fontSize: '0.75rem', padding: '4px 8px', marginLeft: '6px' }}
                title="Share component configuration URL"
              >
                🔗 Share Link
              </button>
            </div>
          )}
        </div>
      </div>

      {activeViewMode === 'api-docs' ? (
        <ComponentApiExplorer component={selectedItem} />
      ) : activeViewMode === 'live-editor' ? (
        <LiveCodeSandbox
          component={selectedItem}
          initialProps={activeProps}
          viewport={viewport}
        />
      ) : (
        <>
          {/* Main Split Layout: Live Canvas + Property Controls */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <ComponentPreviewCanvas
                componentId={selectedItem.id}
                propValues={activeProps}
                viewport={viewport}
                simulatedState={simulatedState}
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
              onUndo={handleUndo}
              onRedo={handleRedo}
              canUndo={(historyPast[selectedItem.id] || []).length > 0}
              canRedo={(historyFuture[selectedItem.id] || []).length > 0}
            />
          </div>

          {/* Synchronized Generated Code Viewer & Standalone Exporter */}
          <CodeExporter
            codeReact={generatedReact}
            codeHtml={generatedHtml}
            codeTailwind={generatedTailwind}
            codeReactNative={generatedReactNative}
            codeVue={generatedVue}
            codeSvelte={generatedSvelte}
            component={selectedItem}
            props={activeProps}
          />
        </>
      )}
    </div>
  );
};
