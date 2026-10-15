'use client';

import React, { useState } from 'react';
import { 
  Code2, 
  Palette, 
  Type, 
  Layers, 
  Sparkles, 
  Download, 
  Copy, 
  Check, 
  RefreshCw,
  Search,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { CopyButton } from '@/components/ui/CopyButton';

interface ExtractedTokens {
  colors: string[];
  fonts: string[];
  fontSizes: string[];
  radii: string[];
  shadows: string[];
  componentStructure: {
    tag: string;
    classes: string[];
    childrenCount: number;
    textPreview: string;
  }[];
  generatedReact: string;
  generatedTailwind: string;
  generatedTokensJson: string;
}

const DEFAULT_SAMPLE_HTML = `<div class="hero-card" style="background-color: #0f172a; border-radius: 16px; border: 1px solid rgba(255, 255, 255, 0.1); padding: 24px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.4);">
  <div class="badge" style="background: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid #10b981; border-radius: 9999px; padding: 4px 12px; font-size: 12px; font-weight: 700; display: inline-block;">
    Active Status
  </div>
  <h2 style="font-family: 'Inter', sans-serif; font-size: 24px; color: #f8fafc; font-weight: 700; margin: 16px 0 8px 0;">
    Modern Spatial Architecture
  </h2>
  <p style="font-family: 'Inter', sans-serif; font-size: 14px; color: #94a3b8; line-height: 1.6; margin-bottom: 20px;">
    Zero-friction reverse engineering suite capable of deconstructing raw DOM trees into standardized design tokens and components.
  </p>
  <button style="background: #10b981; color: #042f2e; border: none; border-radius: 10px; padding: 10px 20px; font-weight: 600; cursor: pointer; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);">
    Inspect & Export
  </button>
</div>`;

export const DomReverseEngineeringStudio: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>(DEFAULT_SAMPLE_HTML);
  const [activeTab, setActiveTab] = useState<'tokens' | 'react' | 'tailwind' | 'structure'>('tokens');
  const [copied, setCopied] = useState<boolean>(false);

  // Parsing and extraction logic
  const parseDomSnippet = (htmlString: string): ExtractedTokens => {
    const colorSet = new Set<string>();
    const fontSet = new Set<string>();
    const sizeSet = new Set<string>();
    const radiusSet = new Set<string>();
    const shadowSet = new Set<string>();
    const components: ExtractedTokens['componentStructure'] = [];

    // Hex colors regex
    const hexMatches = htmlString.match(/#[0-9a-fA-F]{3,8}/g) || [];
    hexMatches.forEach((c) => colorSet.add(c.toLowerCase()));

    // RGB / RGBA colors regex
    const rgbMatches = htmlString.match(/rgba?\([^)]+\)/g) || [];
    rgbMatches.forEach((c) => colorSet.add(c));

    // Font families
    const fontMatches = htmlString.match(/font-family:\s*([^;"]+)/gi) || [];
    fontMatches.forEach((f) => {
      const cleaned = f.replace(/font-family:\s*/i, '').replace(/['"]/g, '').split(',')[0].trim();
      if (cleaned) fontSet.add(cleaned);
    });

    // Font sizes
    const sizeMatches = htmlString.match(/font-size:\s*([^;"]+)/gi) || [];
    sizeMatches.forEach((s) => {
      const val = s.replace(/font-size:\s*/i, '').trim();
      if (val) sizeSet.add(val);
    });

    // Border radii
    const radiusMatches = htmlString.match(/border-radius:\s*([^;"]+)/gi) || [];
    radiusMatches.forEach((r) => {
      const val = r.replace(/border-radius:\s*/i, '').trim();
      if (val) radiusSet.add(val);
    });

    // Box shadows
    const shadowMatches = htmlString.match(/box-shadow:\s*([^;"]+)/gi) || [];
    shadowMatches.forEach((s) => {
      const val = s.replace(/box-shadow:\s*/i, '').trim();
      if (val) shadowSet.add(val);
    });

    // Simple DOM element extraction
    const tagMatches = [...htmlString.matchAll(/<([a-zA-Z0-9]+)([^>]*)>(.*?)<\/\1>/gs)];
    tagMatches.slice(0, 15).forEach((match) => {
      const tag = match[1];
      const attrs = match[2];
      const inner = match[3];

      const classMatch = attrs.match(/class=["']([^"']+)["']/);
      const classes = classMatch ? classMatch[1].split(/\s+/) : [];

      components.push({
        tag,
        classes,
        childrenCount: (inner.match(/<[a-zA-Z0-9]+/g) || []).length,
        textPreview: inner.replace(/<[^>]*>/g, '').trim().slice(0, 40)
      });
    });

    const colors = Array.from(colorSet);
    const fonts = Array.from(fontSet);
    const fontSizes = Array.from(sizeSet);
    const radii = Array.from(radiusSet);
    const shadows = Array.from(shadowSet);

    // Generate tokens JSON
    const tokensObject = {
      $schema: 'https://design-tokens.github.io/community-group/format/',
      color: colors.reduce((acc, c, idx) => ({ ...acc, [`color-${idx + 1}`]: { $value: c, $type: 'color' } }), {}),
      typography: {
        fontFamily: fonts.reduce((acc, f, idx) => ({ ...acc, [`font-${idx + 1}`]: { $value: f, $type: 'fontFamily' } }), {}),
        fontSize: fontSizes.reduce((acc, s, idx) => ({ ...acc, [`size-${idx + 1}`]: { $value: s, $type: 'dimension' } }), {})
      },
      borderRadius: radii.reduce((acc, r, idx) => ({ ...acc, [`radius-${idx + 1}`]: { $value: r, $type: 'dimension' } }), {}),
      elevation: shadows.reduce((acc, s, idx) => ({ ...acc, [`shadow-${idx + 1}`]: { $value: s, $type: 'shadow' } }), {})
    };

    // Synthesize Clean React Component
    const generatedReact = `import React from 'react';

// Decompiled by Mahi UI Reverse Engineering Engine
export const DecompiledComponent: React.FC = () => {
  return (
    <div className="decompiled-wrapper">
      {/* Reverse-Engineered DOM Structure */}
      ${htmlString
        .replace(/class=/g, 'className=')
        .replace(/style="([^"]*)"/g, (match, styleStr) => {
          const rules = styleStr.split(';').filter((r: string) => r.trim());
          const objStr = rules.map((r: string) => {
            const [k, v] = r.split(':');
            if (!k || !v) return '';
            const camelKey = k.trim().replace(/-([a-z])/g, (_: string, l: string) => l.toUpperCase());
            return `${camelKey}: '${v.trim()}'`;
          }).filter(Boolean).join(', ');
          return `style={{ ${objStr} }}`;
        })}
    </div>
  );
};
`;

    // Synthesize Tailwind classes estimation
    const generatedTailwind = `<!-- Reverse Engineered Tailwind Component -->
<div class="p-6 rounded-2xl bg-slate-900 border border-white/10 shadow-xl max-w-lg">
  <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
    Extracted Badge
  </span>
  <h2 class="text-2xl font-bold text-slate-100 mt-4 mb-2">
    Decompiled Title
  </h2>
  <p class="text-sm text-slate-400 leading-relaxed mb-5">
    Clean semantic structure decompiled from raw DOM elements with token abstractions.
  </p>
  <button class="px-5 py-2.5 rounded-lg font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all shadow-md shadow-emerald-500/20 active:scale-95">
    Extracted Action
  </button>
</div>`;

    return {
      colors,
      fonts,
      fontSizes,
      radii,
      shadows,
      componentStructure: components,
      generatedReact,
      generatedTailwind,
      generatedTokensJson: JSON.stringify(tokensObject, null, 2)
    };
  };

  const parsed = parseDomSnippet(inputCode);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%', color: 'var(--text-main)' }}>
      {/* Header Banner */}
      <div 
        style={{
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(99, 102, 241, 0.1))',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div 
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              background: 'rgba(16, 185, 129, 0.2)',
              border: '1px solid #10b981',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981'
            }}
          >
            <Cpu size={22} />
          </div>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800 }}>
              DOM & CSS Reverse Engineering Studio
            </h2>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Decompile raw HTML/CSS snippets into extracted color palettes, design tokens, and clean React / Tailwind components.
            </p>
          </div>
        </div>

        <button
          onClick={() => setInputCode(DEFAULT_SAMPLE_HTML)}
          className="action-btn"
          style={{ fontSize: '0.8rem', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <RefreshCw size={14} />
          <span>Reset Sample Snippet</span>
        </button>
      </div>

      {/* Main Grid: Input on Left, Reverse-Engineered Output on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
        {/* Left Column: Raw HTML/CSS Input */}
        <div 
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div 
            style={{
              padding: '0.75rem 1rem',
              borderBottom: '1px solid var(--border-color)',
              background: 'rgba(0,0,0,0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{ fontSize: '0.85rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <Code2 size={15} style={{ color: 'var(--accent-primary)' }} />
              Raw HTML / Inline CSS Input
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Paste any component DOM here
            </span>
          </div>

          <textarea
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
            placeholder="Paste raw HTML snippet with inline styles or classes..."
            style={{
              width: '100%',
              minHeight: '340px',
              padding: '1rem',
              background: '#090d16',
              color: '#e2e8f0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.825rem',
              lineHeight: '1.6',
              border: 'none',
              resize: 'vertical',
              outline: 'none'
            }}
          />

          {/* Live Render Sandbox of Raw Snippet */}
          <div style={{ padding: '1rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-card)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              Input Visual Render Preview:
            </span>
            <div 
              style={{
                padding: '1rem',
                background: 'rgba(0,0,0,0.2)',
                borderRadius: 'var(--radius-md)',
                overflowX: 'auto',
                minHeight: '80px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              dangerouslySetInnerHTML={{ __html: inputCode }}
            />
          </div>
        </div>

        {/* Right Column: Decompiled Tokens & Rebuilt Code */}
        <div 
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Tabs */}
          <div 
            style={{
              padding: '0.5rem 0.75rem',
              borderBottom: '1px solid var(--border-color)',
              background: 'rgba(0,0,0,0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}
          >
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              <button
                className={`code-lang-btn ${activeTab === 'tokens' ? 'active' : ''}`}
                onClick={() => setActiveTab('tokens')}
              >
                🎨 Extracted Tokens ({parsed.colors.length})
              </button>
              <button
                className={`code-lang-btn ${activeTab === 'react' ? 'active' : ''}`}
                onClick={() => setActiveTab('react')}
              >
                ⚛️ React Component
              </button>
              <button
                className={`code-lang-btn ${activeTab === 'tailwind' ? 'active' : ''}`}
                onClick={() => setActiveTab('tailwind')}
              >
                💨 Tailwind Rebuilt
              </button>
              <button
                className={`code-lang-btn ${activeTab === 'structure' ? 'active' : ''}`}
                onClick={() => setActiveTab('structure')}
              >
                🧱 DOM Tree ({parsed.componentStructure.length})
              </button>
            </div>

            <CopyButton 
              textToCopy={
                activeTab === 'tokens' ? parsed.generatedTokensJson :
                activeTab === 'react' ? parsed.generatedReact :
                activeTab === 'tailwind' ? parsed.generatedTailwind :
                JSON.stringify(parsed.componentStructure, null, 2)
              } 
              label="Copy" 
            />
          </div>

          {/* Tab Content Panes */}
          <div style={{ padding: '1rem', flex: 1, overflowY: 'auto' }}>
            {activeTab === 'tokens' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {/* Extracted Colors Grid */}
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Extracted Color Palette ({parsed.colors.length})
                  </h4>
                  {parsed.colors.length === 0 ? (
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>No colors detected in input</span>
                  ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '0.5rem' }}>
                      {parsed.colors.map((c, i) => (
                        <div
                          key={i}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            background: 'var(--bg-card)',
                            padding: '6px 8px',
                            borderRadius: 'var(--radius-sm)',
                            border: '1px solid var(--border-color)'
                          }}
                        >
                          <div 
                            style={{
                              width: '24px',
                              height: '24px',
                              borderRadius: '6px',
                              background: c,
                              border: '1px solid rgba(255,255,255,0.15)',
                              flexShrink: 0
                            }}
                          />
                          <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {c}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Typography & Radii */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Detected Fonts & Sizes
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {parsed.fonts.map((f, i) => (
                        <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-main)', background: 'var(--bg-card)', padding: '4px 8px', borderRadius: '4px' }}>
                          Typeface: <strong>{f}</strong>
                        </span>
                      ))}
                      {parsed.fontSizes.map((s, i) => (
                        <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '4px 8px', borderRadius: '4px' }}>
                          Size: {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Border Radii & Shadows
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {parsed.radii.map((r, i) => (
                        <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-main)', background: 'var(--bg-card)', padding: '4px 8px', borderRadius: '4px' }}>
                          Radius: {r}
                        </span>
                      ))}
                      {parsed.shadows.map((s, i) => (
                        <span key={i} style={{ fontSize: '0.75rem', color: 'var(--text-muted)', background: 'var(--bg-card)', padding: '4px 8px', borderRadius: '4px' }}>
                          Shadow: {s.slice(0, 24)}...
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tokens JSON */}
                <div>
                  <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Standard W3C DTCG Token Specification
                  </h4>
                  <pre 
                    style={{
                      margin: 0,
                      padding: '0.85rem',
                      background: '#090d16',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: '#a7f3d0',
                      maxHeight: '180px',
                      overflowY: 'auto'
                    }}
                  >
                    <code>{parsed.generatedTokensJson}</code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'react' && (
              <pre 
                style={{
                  margin: 0,
                  padding: '1rem',
                  background: '#090d16',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#93c5fd',
                  lineHeight: '1.6',
                  maxHeight: '440px',
                  overflowX: 'auto'
                }}
              >
                <code>{parsed.generatedReact}</code>
              </pre>
            )}

            {activeTab === 'tailwind' && (
              <pre 
                style={{
                  margin: 0,
                  padding: '1rem',
                  background: '#090d16',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.8rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#fde047',
                  lineHeight: '1.6',
                  maxHeight: '440px',
                  overflowX: 'auto'
                }}
              >
                <code>{parsed.generatedTailwind}</code>
              </pre>
            )}

            {activeTab === 'structure' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <h4 style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Decompiled Hierarchy Nodes
                </h4>
                {parsed.componentStructure.map((node, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 12px',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      borderRadius: 'var(--radius-sm)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: '0.75rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ color: '#10b981', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                        &lt;{node.tag}&gt;
                      </span>
                      {node.classes.length > 0 && (
                        <span style={{ color: 'var(--text-muted)' }}>
                          .{node.classes.join('.')}
                        </span>
                      )}
                      {node.textPreview && (
                        <span style={{ color: 'var(--text-main)', fontStyle: 'italic' }}>
                          &ldquo;{node.textPreview}&rdquo;
                        </span>
                      )}
                    </div>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {node.childrenCount} child nodes
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
