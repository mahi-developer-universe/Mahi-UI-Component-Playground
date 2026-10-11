'use client';

import React, { useState } from 'react';
import { CopyButton } from '@/components/ui/CopyButton';

interface CodeExporterProps {
  codeReact: string;
  codeHtml: string;
  codeTailwind?: string;
}

export const CodeExporter: React.FC<CodeExporterProps> = ({
  codeReact,
  codeHtml,
  codeTailwind
}) => {
  const [activeTab, setActiveTab] = useState<'react' | 'html' | 'tailwind'>('react');

  const currentCode = {
    react: codeReact,
    html: codeHtml,
    tailwind: codeTailwind || codeHtml
  }[activeTab];

  return (
    <div
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.5rem 0.85rem',
          borderBottom: '1px solid var(--border-color)',
          background: 'rgba(0,0,0,0.15)'
        }}
      >
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          <button
            className={`code-lang-btn ${activeTab === 'react' ? 'active' : ''}`}
            onClick={() => setActiveTab('react')}
          >
            React + TypeScript
          </button>
          <button
            className={`code-lang-btn ${activeTab === 'html' ? 'active' : ''}`}
            onClick={() => setActiveTab('html')}
          >
            HTML + CSS
          </button>
          {codeTailwind && (
            <button
              className={`code-lang-btn ${activeTab === 'tailwind' ? 'active' : ''}`}
              onClick={() => setActiveTab('tailwind')}
            >
              Tailwind CSS
            </button>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => {
              const extension = activeTab === 'react' ? 'tsx' : activeTab === 'html' ? 'html' : 'css';
              const mime = activeTab === 'react' ? 'text/typescript' : 'text/plain';
              const blob = new Blob([currentCode], { type: mime });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `Component.${extension}`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="action-btn"
            style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            title="Download snippet file"
          >
            <span>↓ Download</span>
          </button>
          <CopyButton textToCopy={currentCode} label="Copy Code" />
        </div>
      </div>

      <pre
        style={{
          margin: 0,
          padding: '1.25rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.825rem',
          lineHeight: '1.6',
          overflowX: 'auto',
          color: '#e2e8f0',
          background: '#090d16'
        }}
      >
        <code>{currentCode}</code>
      </pre>
    </div>
  );
};
