'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Download, Copy, RefreshCw, Layout, Type, Palette, Sparkles, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/clipboard';
import { downloadFile } from '@/lib/download';

export interface OgConfig {
  title: string;
  subtitle: string;
  author: string;
  brand: string;
  badge: string;
  themeStyle: 'gradient' | 'minimal' | 'cyberpunk' | 'terminal' | 'card';
  palette: 'emerald' | 'sunset' | 'indigo' | 'slate' | 'neon';
  fontSize: number;
  showPattern: boolean;
  avatarSeed: string;
}

const PALETTE_MAP = {
  emerald: {
    bg1: '#022c22',
    bg2: '#064e3b',
    accent: '#10b981',
    accentLight: '#34d399',
    text: '#ffffff',
    subtext: '#94a3b8',
    cardBg: '#0f172a',
    border: 'rgba(16, 185, 129, 0.25)',
  },
  sunset: {
    bg1: '#431407',
    bg2: '#7c2d12',
    accent: '#f97316',
    accentLight: '#fb923c',
    text: '#ffffff',
    subtext: '#cbd5e1',
    cardBg: '#1e1b4b',
    border: 'rgba(249, 115, 22, 0.3)',
  },
  indigo: {
    bg1: '#0f172a',
    bg2: '#1e1b4b',
    accent: '#6366f1',
    accentLight: '#818cf8',
    text: '#ffffff',
    subtext: '#94a3b8',
    cardBg: '#18181b',
    border: 'rgba(99, 102, 241, 0.3)',
  },
  slate: {
    bg1: '#090d16',
    bg2: '#1e293b',
    accent: '#38bdf8',
    accentLight: '#7dd3fc',
    text: '#ffffff',
    subtext: '#94a3b8',
    cardBg: '#0f172a',
    border: 'rgba(56, 189, 248, 0.25)',
  },
  neon: {
    bg1: '#050505',
    bg2: '#111827',
    accent: '#ec4899',
    accentLight: '#f43f5e',
    text: '#ffffff',
    subtext: '#a1a1aa',
    cardBg: '#09090b',
    border: 'rgba(236, 72, 153, 0.4)',
  },
};

export const OgGeneratorWorkspace: React.FC = () => {
  const [config, setConfig] = useState<OgConfig>({
    title: 'Building Modern Frontend Systems at Scale',
    subtitle: 'A deep-dive architectural handbook for reactive, accessible, high-performance web engineering.',
    author: 'Mahi Developer Universe',
    brand: 'Mahi UI · Developer Platform',
    badge: 'ENGINEERING BLOG',
    themeStyle: 'gradient',
    palette: 'emerald',
    fontSize: 54,
    showPattern: true,
    avatarSeed: 'mahi-og',
  });

  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // High-resolution Canvas rendering at exact 1200x630
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1200;
    const height = 630;
    canvas.width = width;
    canvas.height = height;

    const colors = PALETTE_MAP[config.palette];

    // Background fill
    if (config.themeStyle === 'terminal') {
      ctx.fillStyle = '#0a0d14';
      ctx.fillRect(0, 0, width, height);
    } else {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, colors.bg1);
      grad.addColorStop(1, colors.bg2);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    // Pattern overlay
    if (config.showPattern) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Ambient radial glows
    const radial = ctx.createRadialGradient(width - 200, 100, 10, width - 200, 100, 450);
    radial.addColorStop(0, colors.accent + '33');
    radial.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = radial;
    ctx.fillRect(0, 0, width, height);

    // Terminal header simulation
    if (config.themeStyle === 'terminal') {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.fillRect(60, 50, width - 120, height - 100);
      ctx.strokeStyle = colors.border;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(60, 50, width - 120, height - 100);

      // Terminal dots
      const dots = ['#ef4444', '#f59e0b', '#10b981'];
      dots.forEach((color, i) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(90 + i * 22, 80, 6, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    const startX = config.themeStyle === 'terminal' ? 100 : 80;
    let currentY = config.themeStyle === 'terminal' ? 150 : 110;

    // Badge pill
    if (config.badge) {
      ctx.font = '600 16px Inter, system-ui, sans-serif';
      const badgeText = config.badge.toUpperCase();
      const badgeWidth = ctx.measureText(badgeText).width + 30;
      const badgeHeight = 32;

      ctx.fillStyle = colors.accent + '22';
      ctx.beginPath();
      ctx.roundRect(startX, currentY, badgeWidth, badgeHeight, 16);
      ctx.fill();

      ctx.strokeStyle = colors.accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(startX, currentY, badgeWidth, badgeHeight, 16);
      ctx.stroke();

      ctx.fillStyle = colors.accentLight;
      ctx.fillText(badgeText, startX + 15, currentY + 21);
      currentY += 56;
    }

    // Title wrapping
    ctx.fillStyle = colors.text;
    ctx.font = `700 ${config.fontSize}px Inter, system-ui, sans-serif`;
    const maxWidth = width - startX - 100;
    const words = config.title.split(' ');
    let line = '';
    const lineHeight = config.fontSize * 1.18;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(line, startX, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, startX, currentY);
    currentY += 28;

    // Subtitle
    if (config.subtitle) {
      ctx.fillStyle = colors.subtext;
      ctx.font = '400 24px Inter, system-ui, sans-serif';
      const subWords = config.subtitle.split(' ');
      let subLine = '';
      const subLineHeight = 34;

      for (let n = 0; n < subWords.length; n++) {
        const testLine = subLine + subWords[n] + ' ';
        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
          ctx.fillText(subLine, startX, currentY);
          subLine = subWords[n] + ' ';
          currentY += subLineHeight;
          if (currentY > height - 120) break; // keep footer visible
        } else {
          subLine = testLine;
        }
      }
      ctx.fillText(subLine, startX, currentY);
    }

    // Footer divider line
    const footerY = height - 90;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startX, footerY - 24);
    ctx.lineTo(width - startX, footerY - 24);
    ctx.stroke();

    // Footer Author & Brand
    ctx.fillStyle = colors.accentLight;
    ctx.font = '600 20px Inter, system-ui, sans-serif';
    ctx.fillText(config.author, startX, footerY + 8);

    ctx.fillStyle = colors.subtext;
    ctx.font = '500 18px Inter, system-ui, sans-serif';
    const brandMetrics = ctx.measureText(config.brand);
    ctx.fillText(config.brand, width - startX - brandMetrics.width, footerY + 8);
  }, [config]);

  useEffect(() => {
    renderCanvas();
  }, [renderCanvas]);

  const handleDownloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `og-${config.author.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'card'}.png`;
    link.href = dataUrl;
    link.click();
  };

  const handleCopyMetaTags = async () => {
    const metaTags = `<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${config.title.replace(/"/g, '&quot;')}" />
<meta property="og:description" content="${config.subtitle.replace(/"/g, '&quot;')}" />
<meta property="og:image" content="https://yourdomain.com/og-image.png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${config.title.replace(/"/g, '&quot;')}" />
<meta name="twitter:description" content="${config.subtitle.replace(/"/g, '&quot;')}" />
<meta name="twitter:image" content="https://yourdomain.com/og-image.png" />`;

    await copyToClipboard(metaTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header controls bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--card-bg, #090d16)', padding: '16px 24px', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: 'var(--text-primary, #fff)' }}>
            Open Graph Image Generator (1200 × 630)
          </h2>
          <p style={{ margin: '4px 0 0', fontSize: '13px', color: 'var(--text-muted, #94a3b8)' }}>
            High-DPI social media card generator with instant PNG export and HTML meta tags.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleCopyMetaTags}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 16px', borderRadius: '8px', background: 'var(--card-bg-subtle, rgba(255,255,255,0.05))', border: '1px solid var(--border-color, rgba(255,255,255,0.12))', color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
          >
            {copied ? <Check size={16} color="#10b981" /> : <Copy size={16} />}
            {copied ? 'Copied Meta Tags!' : 'Copy <meta> Tags'}
          </button>
          <button
            onClick={handleDownloadPng}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '9px 18px', borderRadius: '8px', background: 'var(--primary-color, #10b981)', border: 'none', color: '#000', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
          >
            <Download size={16} />
            Download PNG (1200×630)
          </button>
        </div>
      </div>

      {/* Main 2-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(340px, 420px) 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Controls Sidebar */}
        <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted, #94a3b8)', marginBottom: '6px' }}>
              Headline / Title
            </label>
            <textarea
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              rows={3}
              style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted, #94a3b8)', marginBottom: '6px' }}>
              Subtitle / Summary
            </label>
            <textarea
              value={config.subtitle}
              onChange={(e) => setConfig({ ...config, subtitle: e.target.value })}
              rows={2}
              style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '10px', color: '#fff', fontSize: '13px', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted, #94a3b8)', marginBottom: '6px' }}>
                Badge Pill
              </label>
              <input
                type="text"
                value={config.badge}
                onChange={(e) => setConfig({ ...config, badge: e.target.value })}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted, #94a3b8)', marginBottom: '6px' }}>
                Title Font Size ({config.fontSize}px)
              </label>
              <input
                type="range"
                min={36}
                max={72}
                value={config.fontSize}
                onChange={(e) => setConfig({ ...config, fontSize: Number(e.target.value) })}
                style={{ width: '100%', accentColor: 'var(--primary-color, #10b981)', marginTop: '8px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted, #94a3b8)', marginBottom: '6px' }}>
                Author
              </label>
              <input
                type="text"
                value={config.author}
                onChange={(e) => setConfig({ ...config, author: e.target.value })}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted, #94a3b8)', marginBottom: '6px' }}>
                Brand / Domain
              </label>
              <input
                type="text"
                value={config.brand}
                onChange={(e) => setConfig({ ...config, brand: e.target.value })}
                style={{ width: '100%', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 10px', color: '#fff', fontSize: '13px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted, #94a3b8)', marginBottom: '8px' }}>
              Palette
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {(['emerald', 'sunset', 'indigo', 'slate', 'neon'] as const).map((pal) => (
                <button
                  key={pal}
                  onClick={() => setConfig({ ...config, palette: pal })}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    borderRadius: '6px',
                    border: config.palette === pal ? '2px solid #fff' : '1px solid rgba(255,255,255,0.1)',
                    background: PALETTE_MAP[pal].accent,
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '700',
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                  }}
                >
                  {pal}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted, #94a3b8)', marginBottom: '8px' }}>
              Style Mode
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {(['gradient', 'terminal'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setConfig({ ...config, themeStyle: mode })}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '6px',
                    border: config.themeStyle === mode ? '1px solid var(--primary-color, #10b981)' : '1px solid rgba(255,255,255,0.1)',
                    background: config.themeStyle === mode ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0,0,0,0.2)',
                    color: config.themeStyle === mode ? 'var(--primary-color, #10b981)' : '#cbd5e1',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'capitalize',
                    cursor: 'pointer',
                  }}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
            <input
              type="checkbox"
              id="pattern-toggle"
              checked={config.showPattern}
              onChange={(e) => setConfig({ ...config, showPattern: e.target.checked })}
              style={{ width: '16px', height: '16px', accentColor: 'var(--primary-color, #10b981)' }}
            />
            <label htmlFor="pattern-toggle" style={{ fontSize: '13px', color: '#cbd5e1', cursor: 'pointer' }}>
              Overlay geometric grid lines
            </label>
          </div>
        </div>

        {/* Live Preview Screen */}
        <div style={{ background: 'var(--card-bg, #090d16)', borderRadius: '12px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted, #94a3b8)' }}>
              Canvas Preview (Scaled down to fit screen · Native 1200×630)
            </span>
            <span style={{ fontSize: '11px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', padding: '3px 8px', borderRadius: '4px', fontWeight: '700' }}>
              1.905 : 1 Ratio
            </span>
          </div>

          <div style={{ width: '100%', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <canvas
              ref={canvasRef}
              style={{ width: '100%', height: 'auto', display: 'block', aspectRatio: '1200 / 630' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
