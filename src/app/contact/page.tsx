'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { sensitiveActionLimiter } from '@/lib/rateLimit';

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Rate limit submissions
    const check = sensitiveActionLimiter.check('contact-form-user');
    if (!check.allowed) {
      setErrorMsg(`Too many submissions. Please wait ${Math.ceil(check.retryAfterMs / 1000)} seconds before trying again.`);
      return;
    }

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/thank-you');
    }, 600);
  };

  return (
    <div style={{ maxWidth: '850px', margin: '3rem auto', padding: '0 1.5rem', lineHeight: 1.6 }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
          Contact Engineering & Support
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', margin: 0 }}>
          Reach out to our core team for design token partnerships, open-source queries, or bug reports.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
        {/* Contact Information & Physical Address */}
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              Headquarters Office
            </h3>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              <strong>Mahi Developer Universe Lab</strong><br />
              Cyber City Tech Center, 4th Floor<br />
              Hitec City, Madhapur, Hyderabad<br />
              Telangana 500081, India
            </p>
          </div>

          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>
              Direct Channels
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <div>📧 <strong>Engineering:</strong> <a href="mailto:support@developeruniverse.dev" style={{ color: 'var(--accent-primary)' }}>support@developeruniverse.dev</a></div>
              <div>⚡ <strong>GitHub Issues:</strong> <a href="https://github.com/mahi-developer-universe/Mahi-UI-Component-Playground/issues" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-primary)' }}>GitHub Tracker</a></div>
              <div>💬 <strong>Working Hours:</strong> Mon – Fri, 9:00 AM – 6:00 PM IST (UTC +5:30)</div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>
            Send Us a Message
          </h3>

          {errorMsg && (
            <div style={{ padding: '0.75rem 1rem', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid var(--danger, #ef4444)', borderRadius: 'var(--radius-md)', color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="name" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label htmlFor="email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Your Email *
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none' }}
                placeholder="jane@company.com"
              />
            </div>

            <div>
              <label htmlFor="message" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Your Message *
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-md)', background: 'var(--bg-input)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', outline: 'none', resize: 'vertical' }}
                placeholder="How can we help your team?"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="interactive-hover"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary, #10b981)',
                color: '#000',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message ✉️'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
