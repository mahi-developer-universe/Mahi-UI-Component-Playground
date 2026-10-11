'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Alert } from '@/components/ui/Alert';
import { StatCard } from '@/components/ui/StatCard';
import { CopyButton } from '@/components/ui/CopyButton';

type RecipeType = 'auth_card' | 'analytics_summary' | 'filter_bar' | 'feedback_banner';

export const ComponentRecipeBuilder: React.FC = () => {
  const [activeRecipe, setActiveRecipe] = useState<RecipeType>('auth_card');
  const [recipeTitle, setRecipeTitle] = useState('Welcome Back');
  const [primaryActionLabel, setPrimaryActionLabel] = useState('Continue with Email');

  const recipes = [
    { id: 'auth_card', label: 'Authentication Card', description: 'Compound modal/card with inputs, social OAuth, and feedback alerts' },
    { id: 'analytics_summary', label: 'KPI Dashboard Header', description: 'Metrics summary with trend deltas, badges, and filters' },
    { id: 'filter_bar', label: 'Resource Filter Bar', description: 'Search inputs, category select, and clear tags composite' },
    { id: 'feedback_banner', label: 'Actionable Status Banner', description: 'Contextual notification with action button and dismiss trigger' }
  ];

  const getCodeSnippet = () => {
    switch (activeRecipe) {
      case 'auth_card':
        return `import React from 'react';
import { Card, Input, Button, Alert } from '@/components/ui';

export const AuthCardRecipe = () => {
  return (
    <Card variant="bento" style={{ maxWidth: '420px', margin: '0 auto' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', fontWeight: 700 }}>${recipeTitle}</h3>
      <p style={{ margin: '0 0 1.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
        Enter your enterprise credentials to access your dashboard.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        <Input label="Work Email" placeholder="alex@company.com" />
        <Input label="Password" type="password" placeholder="••••••••••••" />
        <Button variant="primary" style={{ width: '100%', marginTop: '0.5rem' }}>
          ${primaryActionLabel}
        </Button>
      </div>
    </Card>
  );
};`;

      case 'analytics_summary':
        return `import React from 'react';
import { StatCard, Badge, Button } from '@/components/ui';

export const AnalyticsSummaryRecipe = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>Production Overview</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated 3 minutes ago</span>
        </div>
        <Badge variant="success">All Systems Operational</Badge>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <StatCard label="Edge Invocations" value="2.4M" change="+12.5%" trend="up" />
        <StatCard label="Avg Response Latency" value="18ms" change="-4.1%" trend="up" />
        <StatCard label="Active Sessions" value="14,890" change="+8.2%" trend="up" />
      </div>
    </div>
  );
};`;

      case 'filter_bar':
        return `import React from 'react';
import { Input, Select, Button, Badge } from '@/components/ui';

export const FilterBarRecipe = () => {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', padding: '1rem', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ flex: 1, minWidth: '220px' }}>
        <Input placeholder="Filter by component name..." />
      </div>
      <div style={{ width: '180px' }}>
        <Select options={['All Frameworks', 'React 19', 'Next.js 16', 'Tailwind CSS']} />
      </div>
      <Button variant="secondary" size="md">Clear Filters</Button>
    </div>
  );
};`;

      case 'feedback_banner':
        return `import React from 'react';
import { Alert, Button } from '@/components/ui';

export const FeedbackBannerRecipe = () => {
  return (
    <Alert variant="info" title="System Maintenance Scheduled">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
        <span>Scheduled cluster upgrade occurring on Sunday at 02:00 UTC with zero downtime anticipated.</span>
        <Button variant="primary" size="sm">Review Details</Button>
      </div>
    </Alert>
  );
};`;
    }
  };

  const renderActiveRecipePreview = () => {
    switch (activeRecipe) {
      case 'auth_card':
        return (
          <div style={{ maxWidth: '420px', width: '100%', margin: '0 auto' }}>
            <Card variant="bento">
              <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {recipeTitle}
              </h3>
              <p style={{ margin: '0 0 1.25rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Enter your verified developer credentials to enter the workspace.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <Input label="Work Email" placeholder="developer@domain.com" />
                <Input label="Password" type="password" placeholder="••••••••••••" />
                <Button variant="primary" style={{ width: '100%', marginTop: '0.5rem' }}>
                  {primaryActionLabel}
                </Button>
              </div>
            </Card>
          </div>
        );

      case 'analytics_summary':
        return (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Platform Telemetry Overview
                </h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Active cluster monitoring • Edge Node US-East
                </span>
              </div>
              <Badge variant="success">All Services Online</Badge>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <StatCard label="Global Invocations" value="2.4M" change="+12.5%" trend="up" />
              <StatCard label="Avg Response Latency" value="18ms" change="-4.1%" trend="up" />
              <StatCard label="Active Sessions" value="14,890" change="+8.2%" trend="up" />
            </div>
          </div>
        );

      case 'filter_bar':
        return (
          <div style={{ width: '100%', display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap', padding: '1.25rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
            <div style={{ flex: 1, minWidth: '220px' }}>
              <Input placeholder="Filter by component name..." />
            </div>
            <div style={{ width: '180px' }}>
              <Select options={['All Frameworks', 'React 19', 'Next.js 16', 'Tailwind CSS']} />
            </div>
            <Button variant="secondary" size="md">Reset</Button>
          </div>
        );

      case 'feedback_banner':
        return (
          <div style={{ width: '100%', maxWidth: '640px', margin: '0 auto' }}>
            <Alert variant="info" title="Scheduled Maintenance Notice">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.85rem' }}>Next generation Turbopack cluster release occurring this Sunday at 02:00 UTC.</span>
                <Button variant="primary" size="sm">View Schedule</Button>
              </div>
            </Alert>
          </div>
        );
    }
  };

  const codeSnippet = getCodeSnippet();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <div>
          <h3 style={{ margin: '0 0 6px 0', fontSize: '1.25rem', fontWeight: 700 }}>
            Component Recipe Builder & Pattern Studio
          </h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Combine individual design system primitives into compound, production-ready full application recipes.
          </p>
        </div>

        {/* Recipe Selection Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {recipes.map((r) => {
            const isSelected = activeRecipe === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setActiveRecipe(r.id as RecipeType)}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-lg)',
                  border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  background: isSelected ? 'var(--accent-light)' : 'rgba(255, 255, 255, 0.03)',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
                  {r.label}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  {r.description}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Controls for Active Recipe */}
        {activeRecipe === 'auth_card' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            <Input
              label="Card Headline"
              value={recipeTitle}
              onChange={(e) => setRecipeTitle(e.target.value)}
            />
            <Input
              label="Primary CTA Label"
              value={primaryActionLabel}
              onChange={(e) => setPrimaryActionLabel(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Live Composite Canvas */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 1.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '260px'
        }}
      >
        {renderActiveRecipePreview()}
      </div>

      {/* Composite Code Output */}
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
            padding: '0.65rem 1rem',
            borderBottom: '1px solid var(--border-color)',
            background: 'rgba(0, 0, 0, 0.2)'
          }}
        >
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Full Composite Recipe Source (React + TypeScript)
          </span>
          <CopyButton textToCopy={codeSnippet} label="Copy Recipe Code" />
        </div>
        <pre
          style={{
            margin: 0,
            padding: '1.25rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            lineHeight: 1.6,
            color: '#e2e8f0',
            background: '#090d16',
            overflowX: 'auto'
          }}
        >
          <code>{codeSnippet}</code>
        </pre>
      </div>
    </div>
  );
};
