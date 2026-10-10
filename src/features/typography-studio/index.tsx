'use client';

import React, { useState, useMemo } from 'react';
import { CopyButton } from '@/components/ui/CopyButton';
import { Slider } from '@/components/ui/Slider';

interface FontFamilyOption {
  name: string;
  category: 'sans' | 'serif' | 'mono' | 'display';
  stack: string;
  weights: number[];
  googleFont?: string;
}

const FONT_FAMILIES: FontFamilyOption[] = [
  { name: 'Inter', category: 'sans', stack: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif", weights: [400, 500, 600, 700], googleFont: 'Inter:wght@400;500;600;700' },
  { name: 'Outfit', category: 'display', stack: "'Outfit', sans-serif", weights: [400, 500, 600, 700, 800], googleFont: 'Outfit:wght@400;500;600;700;800' },
  { name: 'Roboto', category: 'sans', stack: "'Roboto', sans-serif", weights: [400, 500, 700], googleFont: 'Roboto:wght@400;500;700' },
  { name: 'Open Sans', category: 'sans', stack: "'Open Sans', sans-serif", weights: [400, 600, 700], googleFont: 'Open+Sans:wght@400;600;700' },
  { name: 'Lato', category: 'sans', stack: "'Lato', sans-serif", weights: [400, 700], googleFont: 'Lato:wght@400;700' },
  { name: 'Poppins', category: 'sans', stack: "'Poppins', sans-serif", weights: [400, 500, 600, 700], googleFont: 'Poppins:wght@400;500;600;700' },
  { name: 'Montserrat', category: 'sans', stack: "'Montserrat', sans-serif", weights: [400, 600, 700], googleFont: 'Montserrat:wght@400;600;700' },
  { name: 'Nunito', category: 'sans', stack: "'Nunito', sans-serif", weights: [400, 600, 700], googleFont: 'Nunito:wght@400;600;700' },
  { name: 'Manrope', category: 'sans', stack: "'Manrope', sans-serif", weights: [400, 500, 600, 700], googleFont: 'Manrope:wght@400;500;600;700' },
  { name: 'DM Sans', category: 'sans', stack: "'DM Sans', sans-serif", weights: [400, 500, 700], googleFont: 'DM+Sans:wght@400;500;700' },
  { name: 'Plus Jakarta Sans', category: 'sans', stack: "'Plus Jakarta Sans', sans-serif", weights: [400, 500, 600, 700], googleFont: 'Plus+Jakarta+Sans:wght@400;500;600;700' },
  { name: 'Space Grotesk', category: 'display', stack: "'Space Grotesk', sans-serif", weights: [400, 500, 700], googleFont: 'Space+Grotesk:wght@400;500;700' },
  { name: 'Urbanist', category: 'sans', stack: "'Urbanist', sans-serif", weights: [400, 600, 700], googleFont: 'Urbanist:wght@400;600;700' },
  { name: 'Work Sans', category: 'sans', stack: "'Work Sans', sans-serif", weights: [400, 500, 600], googleFont: 'Work+Sans:wght@400;500;600' },
  { name: 'Source Sans 3', category: 'sans', stack: "'Source Sans 3', sans-serif", weights: [400, 600, 700], googleFont: 'Source+Sans+3:wght@400;600;700' },
  { name: 'IBM Plex Sans', category: 'sans', stack: "'IBM Plex Sans', sans-serif", weights: [400, 500, 600], googleFont: 'IBM+Plex+Sans:wght@400;500;600' },
  { name: 'JetBrains Mono', category: 'mono', stack: "'JetBrains Mono', monospace", weights: [400, 500, 700], googleFont: 'JetBrains+Mono:wght@400;500;700' },
  { name: 'System Native', category: 'sans', stack: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif", weights: [400, 500, 600, 700] }
];

const TYPE_SCALE_RATIOS: Record<string, { label: string; ratio: number }> = {
  minorSecond: { label: 'Minor Second (1.067)', ratio: 1.067 },
  majorSecond: { label: 'Major Second (1.125)', ratio: 1.125 },
  minorThird: { label: 'Minor Third (1.200)', ratio: 1.2 },
  majorThird: { label: 'Major Third (1.250)', ratio: 1.25 },
  perfectFourth: { label: 'Perfect Fourth (1.333)', ratio: 1.333 },
  goldenRatio: { label: 'Golden Ratio (1.618)', ratio: 1.618 }
};

export const TypographyStudio: React.FC = () => {
  const [headingFont, setHeadingFont] = useState<string>('Outfit');
  const [bodyFont, setBodyFont] = useState<string>('Inter');
  const [baseSize, setBaseSize] = useState<number>(16);
  const [scaleKey, setScaleKey] = useState<string>('majorThird');
  const [headingWeight, setHeadingWeight] = useState<number>(700);
  const [bodyWeight, setBodyWeight] = useState<number>(400);
  const [lineHeight, setLineHeight] = useState<number>(1.6);
  const [letterSpacing, setLetterSpacing] = useState<number>(-0.01);
  const [textTransform, setTextTransform] = useState<'none' | 'capitalize' | 'uppercase' | 'lowercase'>('none');

  const selectedHeadingOption = FONT_FAMILIES.find((f) => f.name === headingFont) || FONT_FAMILIES[0];
  const selectedBodyOption = FONT_FAMILIES.find((f) => f.name === bodyFont) || FONT_FAMILIES[0];

  const ratio = TYPE_SCALE_RATIOS[scaleKey].ratio;

  // Calculated type hierarchy sizes in pixels
  const sizes = useMemo(() => {
    return {
      h1: Math.round(baseSize * Math.pow(ratio, 4)),
      h2: Math.round(baseSize * Math.pow(ratio, 3)),
      h3: Math.round(baseSize * Math.pow(ratio, 2)),
      h4: Math.round(baseSize * ratio),
      base: baseSize,
      sm: Math.round(baseSize / ratio),
      xs: Math.round(baseSize / Math.pow(ratio, 2))
    };
  }, [baseSize, ratio]);

  // Dynamically load Google Font stylesheet link if not already injected
  React.useEffect(() => {
    const fontsToLoad = [selectedHeadingOption, selectedBodyOption].filter((f) => f.googleFont);
    fontsToLoad.forEach((font) => {
      const linkId = `google-font-${font.name.replace(/\s+/g, '-').toLowerCase()}`;
      if (!document.getElementById(linkId) && font.googleFont) {
        const link = document.createElement('link');
        link.id = linkId;
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?family=${font.googleFont}&display=swap`;
        document.head.appendChild(link);
      }
    });
  }, [selectedHeadingOption, selectedBodyOption]);

  // Generate CSS Variables bundle
  const cssVariables = useMemo(() => {
    return `:root {
  /* Typography Stacks */
  --font-heading: ${selectedHeadingOption.stack};
  --font-body: ${selectedBodyOption.stack};

  /* Type Scale System (${TYPE_SCALE_RATIOS[scaleKey].label}) */
  --font-size-xs: ${sizes.xs}px;
  --font-size-sm: ${sizes.sm}px;
  --font-size-base: ${sizes.base}px;
  --font-size-h4: ${sizes.h4}px;
  --font-size-h3: ${sizes.h3}px;
  --font-size-h2: ${sizes.h2}px;
  --font-size-h1: ${sizes.h1}px;

  /* Line Height & Letter Spacing */
  --line-height-body: ${lineHeight};
  --letter-spacing-body: ${letterSpacing}em;
}`;
  }, [selectedHeadingOption, selectedBodyOption, scaleKey, sizes, lineHeight, letterSpacing]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Configuration Controls Bar */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '1.75rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {/* Heading Font Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
            HEADING FONT FAMILY
          </label>
          <select
            value={headingFont}
            onChange={(e) => setHeadingFont(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem'
            }}
          >
            {FONT_FAMILIES.map((f) => (
              <option key={f.name} value={f.name}>
                {f.name} ({f.category})
              </option>
            ))}
          </select>
        </div>

        {/* Body Font Selector */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
            BODY FONT FAMILY
          </label>
          <select
            value={bodyFont}
            onChange={(e) => setBodyFont(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem'
            }}
          >
            {FONT_FAMILIES.map((f) => (
              <option key={f.name} value={f.name}>
                {f.name} ({f.category})
              </option>
            ))}
          </select>
        </div>

        {/* Type Scale Ratio */}
        <div>
          <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px' }}>
            TYPE SCALE HARMONY RATIO
          </label>
          <select
            value={scaleKey}
            onChange={(e) => setScaleKey(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-input)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.9rem'
            }}
          >
            {Object.entries(TYPE_SCALE_RATIOS).map(([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {/* Base Font Size */}
        <div>
          <Slider
            label="Base Font Size (px)"
            value={baseSize}
            min={12}
            max={22}
            step={1}
            unit="px"
            onChange={setBaseSize}
          />
        </div>

        {/* Line Height */}
        <div>
          <Slider
            label="Body Line Height"
            value={lineHeight}
            min={1.2}
            max={2.0}
            step={0.05}
            unit=""
            onChange={setLineHeight}
          />
        </div>

        {/* Letter Spacing */}
        <div>
          <Slider
            label="Letter Spacing"
            value={letterSpacing}
            min={-0.05}
            max={0.1}
            step={0.01}
            unit="em"
            onChange={setLetterSpacing}
          />
        </div>
      </div>

      {/* Live Typography Hierarchy Preview */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 700 }}>
            Live Editorial & SaaS Typographic System
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Heading: {headingFont} | Body: {bodyFont}
          </span>
        </div>

        {/* Hierarchy Specimen Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '2rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              H1 — {sizes.h1}px / {headingWeight} weight
            </span>
            <div
              style={{
                fontFamily: selectedHeadingOption.stack,
                fontSize: `${sizes.h1}px`,
                fontWeight: headingWeight,
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                letterSpacing: `${letterSpacing}em`
              }}
            >
              Crafting Exceptional Digital Interfaces
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              H2 — {sizes.h2}px
            </span>
            <div
              style={{
                fontFamily: selectedHeadingOption.stack,
                fontSize: `${sizes.h2}px`,
                fontWeight: headingWeight,
                lineHeight: 1.25,
                color: 'var(--text-primary)'
              }}
            >
              Modular Component Architecture & Modern Tokens
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              H3 — {sizes.h3}px
            </span>
            <div
              style={{
                fontFamily: selectedHeadingOption.stack,
                fontSize: `${sizes.h3}px`,
                fontWeight: 600,
                color: 'var(--text-primary)'
              }}
            >
              Synchronized Design Tools for Next.js & React
            </div>
          </div>

          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              Body Text — {sizes.base}px / Line-height {lineHeight}
            </span>
            <p
              style={{
                fontFamily: selectedBodyOption.stack,
                fontSize: `${sizes.base}px`,
                fontWeight: bodyWeight,
                lineHeight: lineHeight,
                letterSpacing: `${letterSpacing}em`,
                color: 'var(--text-secondary)',
                margin: 0,
                maxWidth: '750px'
              }}
            >
              Every typography scale authored in Mahi UI Component Playground conforms to harmonic musical ratios.
              By establishing unified vertical rhythm and predictable font hierarchies, frontend teams eliminate arbitrary font sizes and create consistent user experiences.
            </p>
          </div>
        </div>

        {/* Code Token Export */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              CSS Custom Properties Export
            </span>
            <CopyButton text={cssVariables} label="Copy CSS Tokens" />
          </div>
          <pre
            style={{
              background: '#090d16',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: '#38bdf8',
              margin: 0,
              border: '1px solid var(--border-color)',
              overflowX: 'auto'
            }}
          >
            {cssVariables}
          </pre>
        </div>
      </div>
    </div>
  );
};
