import React, { useState } from 'react';
import { CopyButton } from '@/components/ui/CopyButton';
import { exportComponentZip } from '@/lib/exporter';
import { ComponentRegistryItem } from '@/types/registry';
import { Package, Download } from 'lucide-react';

interface CodeExporterProps {
  codeReact: string;
  codeHtml: string;
  codeTailwind?: string;
  codeReactNative?: string;
  component?: ComponentRegistryItem;
  props?: Record<string, any>;
}

export const CodeExporter: React.FC<CodeExporterProps> = ({
  codeReact,
  codeHtml,
  codeTailwind,
  codeReactNative,
  component,
  props = {}
}) => {
  const [activeTab, setActiveTab] = useState<'react' | 'html' | 'tailwind' | 'react-native'>('react');
  const [isExportingZip, setIsExportingZip] = useState<boolean>(false);

  const currentCode = {
    react: codeReact,
    html: codeHtml,
    tailwind: codeTailwind || codeHtml,
    'react-native': codeReactNative || codeReact
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
          <button
            className={`code-lang-btn ${activeTab === 'react-native' ? 'active' : ''}`}
            onClick={() => setActiveTab('react-native')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}
          >
            <span>📱 React Native</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {component && (
            <button
              onClick={async () => {
                try {
                  setIsExportingZip(true);
                  const blob = await exportComponentZip({
                    component,
                    props,
                    reactCode: codeReact,
                    htmlCode: codeHtml,
                    tailwindCode: codeTailwind,
                    reactNativeCode: codeReactNative
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${component.id}-package.zip`;
                  a.click();
                  URL.revokeObjectURL(url);
                } catch (err) {
                  console.error('ZIP export failed:', err);
                  alert('Failed to generate ZIP package.');
                } finally {
                  setIsExportingZip(false);
                }
              }}
              disabled={isExportingZip}
              className="action-btn"
              style={{
                fontSize: '0.75rem',
                padding: '4px 10px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                background: 'rgba(16, 185, 129, 0.15)',
                color: '#34d399',
                border: '1px solid rgba(16, 185, 129, 0.3)'
              }}
              title="Download standalone project ZIP package with package.json & README"
            >
              <Package size={13} />
              <span>{isExportingZip ? 'Packaging...' : 'Export ZIP Project'}</span>
            </button>
          )}

          <button
            onClick={() => {
              const extension = activeTab === 'react' ? 'tsx' : activeTab === 'html' ? 'html' : activeTab === 'react-native' ? 'native.tsx' : 'css';
              const mime = activeTab === 'html' ? 'text/html' : 'text/typescript';
              const blob = new Blob([currentCode], { type: mime });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${component?.id || 'Component'}.${extension}`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="action-btn"
            style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
            title="Download snippet file"
          >
            <span>↓ Download File</span>
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
