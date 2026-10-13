'use client';

import React, { useState } from 'react';
import { Check, Copy, Download, Sparkles, CreditCard, ShieldCheck, Zap } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';

interface PricingTier {
  name: string;
  monthlyPrice: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

const PLANS: PricingTier[] = [
  {
    name: 'Starter',
    monthlyPrice: 19,
    description: 'Perfect for individual developers and hobby projects prototyping UI designs.',
    features: [
      'Access to 30 frontend workspaces',
      'Unlimited CSS & SVG code copying',
      'Local storage configuration sync',
      'Standard community support',
    ],
    ctaText: 'Start Free Trial',
  },
  {
    name: 'Pro Systems',
    monthlyPrice: 49,
    description: 'Engineered for scaling product engineering teams building design systems.',
    features: [
      'Everything in Starter',
      'High-DPI PNG & SVG vector downloads',
      'Tailwind v4 token export engine',
      'DAG workflow execution runtime',
      'Priority GitHub architecture review',
    ],
    isPopular: true,
    ctaText: 'Deploy Pro Tier',
  },
  {
    name: 'Enterprise Platform',
    monthlyPrice: 149,
    description: 'Dedicated multi-seat workspace with white-label design token exports.',
    features: [
      'Everything in Pro Systems',
      'Custom WCAG 2.1 compliance audits',
      'Unlimited seat licenses',
      '99.99% SLA uptime guarantee',
      'Dedicated Slack architecture channel',
    ],
    ctaText: 'Contact Enterprise',
  },
];

export const PricingBuilderWorkspace: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [tierCount, setTierCount] = useState<2 | 3>(3);
  const [copied, setCopied] = useState(false);

  // Exact 20% annual discount math: annualPrice = Math.round(monthlyPrice * 0.8)
  const getDisplayPrice = (monthly: number) => {
    if (billingCycle === 'annual') {
      return Math.round(monthly * 0.8);
    }
    return monthly;
  };

  const handleCopyReact = async () => {
    const code = `// PricingSection.tsx
export const PricingSection = () => {
  const isAnnual = ${billingCycle === 'annual'};
  return (
    <div className="pricing-grid">
      ${PLANS.slice(0, tierCount).map(p => `
      <div className="pricing-card${p.isPopular ? ' popular' : ''}">
        <h3>${p.name}</h3>
        <div className="price">\${${billingCycle === 'annual' ? Math.round(p.monthlyPrice * 0.8) : p.monthlyPrice}}/mo</div>
        <button>${p.ctaText}</button>
      </div>`).join('')}
    </div>
  );
};`;

    await copyToClipboard(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Interactive Pricing Page Builder
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            Dynamic plan configuration, monthly/annual toggle with accurate 20% discount math, and React component export.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {/* Tier count toggle */}
          <div style={{ display: 'flex', gap: '4px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.08)' }}>
            <button
              onClick={() => setTierCount(2)}
              style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: tierCount === 2 ? 'var(--primary-color, #10b981)' : 'transparent', color: tierCount === 2 ? '#000' : '#cbd5e1', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}
            >
              2 Plans
            </button>
            <button
              onClick={() => setTierCount(3)}
              style={{ padding: '6px 12px', borderRadius: '6px', border: 'none', background: tierCount === 3 ? 'var(--primary-color, #10b981)' : 'transparent', color: tierCount === 3 ? '#000' : '#cbd5e1', fontWeight: '600', fontSize: '12px', cursor: 'pointer' }}
            >
              3 Plans
            </button>
          </div>

          <button
            onClick={handleCopyReact}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 18px', borderRadius: '8px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied Code!' : 'Copy React Component'}
          </button>
        </div>
      </div>

      {/* Monthly / Annual Billing Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', padding: '12px 0' }}>
        <span style={{ fontSize: '14px', fontWeight: '600', color: billingCycle === 'monthly' ? '#fff' : '#94a3b8' }}>
          Monthly Billing
        </span>
        <button
          onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
          style={{
            width: '52px',
            height: '28px',
            borderRadius: '14px',
            background: billingCycle === 'annual' ? '#10b981' : '#334155',
            border: 'none',
            cursor: 'pointer',
            position: 'relative',
            padding: '2px',
            transition: 'background 0.2s ease',
          }}
        >
          <div
            style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: '#fff',
              transform: billingCycle === 'annual' ? 'translateX(24px)' : 'translateX(0)',
              transition: 'transform 0.2s ease',
            }}
          />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '14px', fontWeight: '600', color: billingCycle === 'annual' ? '#fff' : '#94a3b8' }}>
            Annual Billing
          </span>
          <span style={{ fontSize: '11px', fontWeight: '800', background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', padding: '2px 8px', borderRadius: '4px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            SAVE 20%
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${tierCount}, 1fr)`, gap: '24px', alignItems: 'stretch' }}>
        {PLANS.slice(0, tierCount).map((plan) => {
          const displayPrice = getDisplayPrice(plan.monthlyPrice);

          return (
            <div
              key={plan.name}
              style={{
                background: plan.isPopular ? 'linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, #090d16 100%)' : 'var(--card-bg, #090d16)',
                borderRadius: '16px',
                border: plan.isPopular ? '2px solid #10b981' : '1px solid var(--border-color, rgba(255,255,255,0.08))',
                padding: '32px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '24px',
                position: 'relative',
                boxShadow: plan.isPopular ? '0 15px 35px -10px rgba(16, 185, 129, 0.2)' : 'none',
              }}
            >
              {plan.isPopular && (
                <div style={{ position: 'absolute', top: '-13px', left: '50%', transform: 'translateX(-50%)', background: '#10b981', color: '#000', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', padding: '3px 12px', borderRadius: '12px', letterSpacing: '0.05em' }}>
                  Most Popular Architecture
                </div>
              )}

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#fff', margin: 0 }}>{plan.name}</h3>
                <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.5, margin: '8px 0 20px' }}>{plan.description}</p>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                  <span style={{ fontSize: '42px', fontWeight: '900', color: '#fff', letterSpacing: '-0.02em' }}>${displayPrice}</span>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>/ month</span>
                </div>
                {billingCycle === 'annual' && (
                  <span style={{ fontSize: '11px', color: '#10b981', display: 'block', marginTop: '2px', fontWeight: '600' }}>
                    Billed annually (${displayPrice * 12}/yr)
                  </span>
                )}

                {/* Features List */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {plan.features.map((feat, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Check size={16} color="#10b981" />
                      <span style={{ fontSize: '13px', color: '#cbd5e1' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  background: plan.isPopular ? 'var(--primary-color, #10b981)' : 'rgba(255,255,255,0.06)',
                  border: plan.isPopular ? 'none' : '1px solid rgba(255,255,255,0.12)',
                  color: plan.isPopular ? '#000' : '#fff',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s',
                }}
              >
                {plan.ctaText}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
