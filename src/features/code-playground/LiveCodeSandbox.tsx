'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAppStore } from '@/stores/appStore';
import { ComponentRegistryItem } from '@/types/registry';
import { RotateCcw, Play, Copy, Check, ShieldCheck, AlertCircle, Maximize2, Sparkles, Terminal } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

interface LiveCodeSandboxProps {
  component: ComponentRegistryItem;
  initialProps: Record<string, any>;
  viewport: 'desktop' | 'tablet' | 'mobile' | 'ultrawide';
}

export const LiveCodeSandbox: React.FC<LiveCodeSandboxProps> = ({
  component,
  initialProps,
  viewport
}) => {
  const { theme } = useAppStore();
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState<boolean>(false);
  const [iframeReady, setIframeReady] = useState<boolean>(false);
  const [runtimeStatus, setRuntimeStatus] = useState<'ready' | 'rendering' | 'error'>('ready');
  const [statusMessage, setStatusMessage] = useState<string>('Sandboxed Iframe Active');

  // Derive initial code from component
  const defaultHtml = component.codeTemplates.html || `<div class="card">\n  <h3>${component.title}</h3>\n  <p>${component.description}</p>\n  <button class="btn btn-primary">Interactive Action</button>\n</div>`;
  const defaultCss = `/* Custom Component Styles */\n.interactive-box {\n  padding: 1.5rem;\n  border-radius: var(--radius-md);\n  background: var(--bg-card);\n  border: 1px solid var(--border-color);\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n  align-items: center;\n  text-align: center;\n}\n\n.interactive-box:hover {\n  border-color: var(--accent-primary);\n}`;
  const defaultJs = `// Micro-interaction handlers\nconst btn = root.querySelector('.btn-primary') || root.querySelector('button');\nif (btn) {\n  btn.addEventListener('click', () => {\n    btn.style.transform = 'scale(0.95)';\n    setTimeout(() => { btn.style.transform = ''; }, 150);\n  });\n}`;

  const [codeState, setCodeState] = useState<{ html: string; css: string; js: string }>({
    html: defaultHtml,
    css: defaultCss,
    js: defaultJs
  });

  // When selected component changes, reset code to match
  useEffect(() => {
    setCodeState({
      html: component.codeTemplates.html || defaultHtml,
      css: defaultCss,
      js: defaultJs
    });
  }, [component.id]);

  // Sync theme to iframe with explicit origin
  useEffect(() => {
    if (!iframeRef.current || !iframeReady) return;
    const targetOrigin = window.location.origin;
    iframeRef.current.contentWindow?.postMessage(
      { type: 'SET_THEME', theme },
      targetOrigin
    );
  }, [theme, iframeReady]);

  // Handle messages from iframe with origin and source validation
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      // Validate that message came from our sandbox iframe
      if (iframeRef.current && e.source !== iframeRef.current.contentWindow) {
        return;
      }
      if (e.origin !== window.location.origin && e.origin !== 'null' && e.origin !== '') {
        return;
      }

      if (e.data && e.data.type === 'SANDBOX_READY') {
        setIframeReady(true);
        setRuntimeStatus('ready');
        setStatusMessage('Sandboxed Iframe Connected');
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Post code update to iframe with strict target origin
  const executeSandbox = () => {
    if (!iframeRef.current) return;
    setRuntimeStatus('rendering');
    const targetOrigin = window.location.origin;
    iframeRef.current.contentWindow?.postMessage(
      {
        type: 'RENDER_CODE',
        html: codeState.html,
        css: codeState.css,
        js: codeState.js
      },
      targetOrigin
    );
    setTimeout(() => {
      setRuntimeStatus('ready');
      setStatusMessage('Compiled & Executed');
    }, 150);
  };

  // Automatically execute on code state change or when ready
  useEffect(() => {
    if (iframeReady) {
      executeSandbox();
    }
  }, [codeState, iframeReady, theme]);

  const handleCopyCode = async () => {
    const content = `<!-- HTML -->\n${codeState.html}\n\n/* CSS */\n${codeState.css}\n\n// JS\n${codeState.js}`;
    const ok = await copyToClipboard(content);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setCodeState({
      html: component.codeTemplates.html || defaultHtml,
      css: defaultCss,
      js: defaultJs
    });
  };

  const widthStyle: Record<string, string> = {
    ultrawide: '100%',
    desktop: '100%',
    tablet: '720px',
    mobile: '380px'
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        width: '100%'
      }}
    >
      {/* Sandbox Sub-Header Controls */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          padding: '0.85rem 1.25rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: '20px',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              color: '#34d399',
              fontSize: '0.75rem',
              fontWeight: 700
            }}
          >
            <ShieldCheck size={14} />
            <span>SANDBOXED RUNTIME (CSP ISOLATED)</span>
          </div>

          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Editing: <strong style={{ color: 'var(--text-primary)' }}>{component.title}</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={executeSandbox}
            className="btn btn-primary"
            style={{ padding: '4px 12px', fontSize: '0.75rem', height: '28px', gap: '4px' }}
            title="Re-run and evaluate inside sandbox"
          >
            <Play size={12} />
            <span>Run Code</span>
          </button>

          <button
            onClick={handleReset}
            className="action-btn"
            style={{ padding: '4px 10px', fontSize: '0.75rem', height: '28px' }}
            title="Reset code to default component template"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>

          <button
            onClick={handleCopyCode}
            className="action-btn"
            style={{ padding: '4px 10px', fontSize: '0.75rem', height: '28px' }}
            title="Copy bundle to clipboard"
          >
            {copied ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
            <span>{copied ? 'Copied!' : 'Copy Bundle'}</span>
          </button>
        </div>
      </div>

      {/* Main Split: Code Editor (Left/Top) + Live Isolated Preview (Right/Bottom) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))',
          gap: '1.25rem',
          alignItems: 'stretch'
        }}
      >
        {/* Source Code Editor Panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            background: '#090d16',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}
        >
          {/* Language Tabs */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderBottom: '1px solid var(--border-color)'
            }}
          >
            <div style={{ display: 'flex', gap: '4px' }}>
              {(['html', 'css', 'js'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveTab(lang)}
                  style={{
                    background: activeTab === lang ? 'var(--accent-primary)' : 'transparent',
                    color: activeTab === lang ? '#000' : 'var(--text-muted)',
                    border: 'none',
                    borderRadius: 'var(--radius-sm)',
                    padding: '4px 10px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase'
                  }}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <Terminal size={12} />
              <span>Live Synced</span>
            </div>
          </div>

          {/* Interactive Code Textarea */}
          <textarea
            value={codeState[activeTab]}
            onChange={(e) =>
              setCodeState((prev) => ({
                ...prev,
                [activeTab]: e.target.value
              }))
            }
            spellCheck={false}
            style={{
              flex: 1,
              minHeight: '380px',
              width: '100%',
              padding: '1.25rem',
              fontFamily: 'var(--font-mono, monospace)',
              fontSize: '0.85rem',
              lineHeight: 1.6,
              background: '#040711',
              color: '#38bdf8',
              border: 'none',
              outline: 'none',
              resize: 'vertical'
            }}
          />

          <div
            style={{
              padding: '6px 12px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <span>Type HTML, CSS, or JS to see immediate live execution.</span>
            <span>{codeState[activeTab].length} characters</span>
          </div>
        </div>

        {/* Live Sandboxed Iframe Preview */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}
        >
          {/* Preview Canvas Bar */}
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '8px 14px',
              background: 'rgba(255, 255, 255, 0.02)',
              borderBottom: '1px solid var(--border-color)',
              fontSize: '0.75rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }} />
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Live Isolated Preview</span>
              <span style={{ color: 'var(--text-muted)' }}>({viewport})</span>
            </div>

            <div style={{ fontSize: '0.7rem', color: '#10b981', fontFamily: 'monospace' }}>
              {statusMessage}
            </div>
          </div>

          {/* Iframe Stage */}
          <div
            style={{
              width: '100%',
              flex: 1,
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              background: 'var(--bg-card)',
              overflow: 'auto'
            }}
          >
            <div
              style={{
                width: widthStyle[viewport],
                maxWidth: '100%',
                height: '420px',
                transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: viewport === 'ultrawide' ? 'none' : '0 15px 35px -5px rgba(0, 0, 0, 0.5)',
                borderRadius: viewport === 'mobile' ? '18px' : 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-color)'
              }}
            >
              <iframe
                ref={iframeRef}
                src="/preview-sandbox.html"
                title="Mahi UI Component Live Sandbox"
                sandbox="allow-scripts allow-same-origin"
                style={{
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  background: 'var(--bg-primary)'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
