'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Sliders, Terminal, Bot, RefreshCw } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

interface PromptTemplate {
  name: string;
  system: string;
  user: string;
  variables: Record<string, string>;
}

const TEMPLATES: PromptTemplate[] = [
  {
    name: 'Frontend Code Refactoring',
    system: 'You are a principal frontend systems engineer. Refactor component code for zero unnecessary re-renders, strict WCAG 2.1 compliance, and semantic HTML5.',
    user: 'Please review and optimize this {{framework}} component: \n\n{{component_name}} with features: {{features}}',
    variables: {
      framework: 'Next.js 16 App Router',
      component_name: 'NavigationDropdown.tsx',
      features: 'Keyboard escape, focus-trap, glassmorphic blur',
    },
  },
  {
    name: 'API Payload Schema Design',
    system: 'You are a database architect. Generate TypeScript interfaces and strict Zod validation schemas.',
    user: 'Create a schema for the {{entity}} resource including fields: {{fields}} with strict input sanitization.',
    variables: {
      entity: 'UserProfile',
      fields: 'id, username, email, avatarUrl, role, createdAt',
    },
  },
  {
    name: 'Design System Documentation',
    system: 'You are a technical design system lead. Write clean developer documentation for component tokens and accessibility.',
    user: 'Document the {{component}} component including variants: {{variants}} and WCAG criteria.',
    variables: {
      component: 'ButtonEffects',
      variants: 'shimmer, ripple, glow, 3d-press',
    },
  },
];

export const PromptPlaygroundWorkspace: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [systemPrompt, setSystemPrompt] = useState(TEMPLATES[0].system);
  const [userPrompt, setUserPrompt] = useState(TEMPLATES[0].user);
  const [variables, setVariables] = useState<Record<string, string>>(TEMPLATES[0].variables);
  const [temperature, setTemperature] = useState(0.7);
  const [topP, setTopP] = useState(0.9);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [copied, setCopied] = useState(false);

  // Dynamic variable replacement (safe regex substitution)
  const resolvedUserPrompt = useMemo(() => {
    let result = userPrompt;
    Object.entries(variables).forEach(([key, val]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, val);
    });
    return result;
  }, [userPrompt, variables]);

  // Approximate token calculation (~4 characters per token heuristic)
  const estimatedTokens = useMemo(() => {
    const totalChars = systemPrompt.length + resolvedUserPrompt.length;
    return Math.ceil(totalChars / 4);
  }, [systemPrompt, resolvedUserPrompt]);

  const handleTemplateChange = (idx: number) => {
    setSelectedTemplate(idx);
    setSystemPrompt(TEMPLATES[idx].system);
    setUserPrompt(TEMPLATES[idx].user);
    setVariables(TEMPLATES[idx].variables);
  };

  const handleCopyPayload = async () => {
    const payload = {
      model: 'gemini-1.5-pro',
      temperature,
      top_p: topP,
      max_output_tokens: maxTokens,
      system_instruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: 'user', parts: [{ text: resolvedUserPrompt }] }],
    };

    await copyToClipboard(JSON.stringify(payload, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            AI Prompt Playground & Variable Workbench
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Structured prompt testing studio with dynamic &#123;&#123;variable&#125;&#125; injection, token estimation, and payload export.
          </p>
        </div>

        <button
          onClick={handleCopyPayload}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 18px', borderRadius: '8px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          {copied ? 'Copied Payload!' : 'Copy API Payload JSON'}
        </button>
      </div>

      {/* Main 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left Column: Prompts & Variables */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Template pills */}
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {TEMPLATES.map((tpl, i) => (
              <button
                key={tpl.name}
                onClick={() => handleTemplateChange(i)}
                style={{
                  padding: '7px 14px',
                  borderRadius: '6px',
                  border: selectedTemplate === i ? '1px solid var(--primary-color, #10b981)' : '1px solid rgba(255,255,255,0.08)',
                  background: selectedTemplate === i ? 'rgba(16, 185, 129, 0.12)' : 'var(--card-bg, #090d16)',
                  color: selectedTemplate === i ? 'var(--primary-color, #10b981)' : '#cbd5e1',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                {tpl.name}
              </button>
            ))}
          </div>

          {/* System Prompt Box */}
          <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>
              System Prompt / Persona Instructions
            </label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={3}
              style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px', resize: 'vertical' }}
            />
          </div>

          {/* User Prompt Box */}
          <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '8px' }}>
              User Prompt Template (Supports &#123;&#123;variable&#125;&#125; syntax)
            </label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              rows={4}
              style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px', resize: 'vertical' }}
            />
          </div>

          {/* Variables Form */}
          <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '18px' }}>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', marginBottom: '12px' }}>
              Dynamic Variables Injection
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {Object.entries(variables).map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: '10px', alignItems: 'center' }}>
                  <code style={{ fontSize: '12px', color: '#38bdf8', fontFamily: 'monospace' }}>&#123;&#123;{k}&#125;&#125;</code>
                  <input
                    type="text"
                    value={v}
                    onChange={(e) => setVariables({ ...variables, [k]: e.target.value })}
                    style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '6px', padding: '8px 10px', color: '#fff', fontSize: '13px' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Parameters & Live Compiled View */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Model Parameters */}
          <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
              Generation Hyperparameters
            </span>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
                <span>Temperature</span>
                <span>{temperature}</span>
              </div>
              <input type="range" min={0} max={1.5} step={0.05} value={temperature} onChange={(e) => setTemperature(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
                <span>Top-P</span>
                <span>{topP}</span>
              </div>
              <input type="range" min={0.1} max={1.0} step={0.05} value={topP} onChange={(e) => setTopP(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#cbd5e1', marginBottom: '6px' }}>
                <span>Max Output Tokens</span>
                <span>{maxTokens}</span>
              </div>
              <input type="range" min={256} max={4096} step={256} value={maxTokens} onChange={(e) => setMaxTokens(Number(e.target.value))} style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)' }} />
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#94a3b8' }}>Estimated Context Tokens</span>
              <span style={{ fontSize: '14px', fontWeight: '800', color: '#10b981' }}>~{estimatedTokens} tokens</span>
            </div>
          </div>

          {/* Compiled Output Preview */}
          <div style={{ background: '#05070e', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
              Resolved User Prompt Preview
            </span>
            <div style={{ minHeight: '120px', background: 'rgba(0,0,0,0.5)', padding: '14px', borderRadius: '8px', color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6, whiteSpace: 'pre-wrap', border: '1px solid rgba(255,255,255,0.06)' }}>
              {resolvedUserPrompt}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
