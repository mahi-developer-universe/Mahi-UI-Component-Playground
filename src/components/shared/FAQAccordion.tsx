'use client';

import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQAccordionProps {
  items?: FAQItem[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: 'How do the 30 interactive projects work in a single unified website?',
    answer: 'Every project operates as an independent React 19 client workspace mounted directly within Next.js App Router dynamic routes (/projects/[id]). State is maintained reactively through Zustand and LocalStorage without page reload fragmentation.'
  },
  {
    question: 'How are design system tokens and themes structured?',
    answer: 'The architecture uses CSS Custom Properties adhering to W3C Design Tokens Community Group (DTCG) specifications. 5 curated themes (Emerald, Dark, Light, Cyberpunk, and Sunset) switch in real-time with zero flash of unstyled content.'
  },
  {
    question: 'Are the components accessible according to WCAG standards?',
    answer: 'Yes! All interactive elements, modals, dropdowns, and form components meet WCAG 2.1 AA/AAA contrast guidelines, feature visible focus indicators (:focus-visible), full keyboard navigability, and semantic ARIA landmarks.'
  },
  {
    question: 'What rate limiting and security protections are implemented?',
    answer: 'Client operations and API endpoints are guarded with an in-memory token bucket rate limiter (60 req/min global, 15 req/min sensitive actions). Error handlers redact stack traces and paths, and environment checks ensure no server secrets leak to client bundles.'
  },
  {
    question: 'Can I export component code to React, HTML/CSS, or Tailwind?',
    answer: 'Absolutely. The playground features 1-click clipboard copy buttons, multi-format code generators, and zip/JSON export utilities across all 30 developer studios.'
  }
];

export const FAQAccordion: React.FC<FAQAccordionProps> = ({
  items = DEFAULT_FAQS,
  title = 'Frequently Asked Questions',
  subtitle = 'Everything you need to know about Mahi UI, design tokens, and components.'
}) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <section aria-labelledby="faq-heading" style={{ margin: '3rem 0' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <h2 id="faq-heading" style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '780px', margin: '0 auto' }}>
        {items.map((item, idx) => {
          const isOpen = openIndexes.includes(idx);
          return (
            <div
              key={idx}
              style={{
                background: 'var(--bg-card, #161e2e)',
                border: `1px solid ${isOpen ? 'var(--accent-primary, #10b981)' : 'var(--border-color, rgba(255, 255, 255, 0.12))'}`,
                borderRadius: 'var(--radius-lg, 12px)',
                overflow: 'hidden',
                transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <button
                onClick={() => toggleIndex(idx)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${idx}`}
                id={`faq-btn-${idx}`}
                style={{
                  width: '100%',
                  padding: '1.15rem 1.4rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease'
                }}
              >
                <span>{item.question}</span>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: isOpen ? 'var(--accent-light, rgba(16, 185, 129, 0.15))' : 'var(--bg-input, rgba(255, 255, 255, 0.05))',
                    color: isOpen ? 'var(--accent-primary, #10b981)' : 'var(--text-secondary)',
                    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    flexShrink: 0
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </span>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-btn-${idx}`}
                  style={{
                    padding: '0 1.4rem 1.25rem 1.4rem',
                    color: 'var(--text-secondary)',
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    borderTop: '1px solid var(--border-color)',
                    paddingTop: '0.9rem',
                    animation: 'fadeIn 0.2s ease'
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
