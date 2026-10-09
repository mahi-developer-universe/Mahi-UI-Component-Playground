# Design System & Token Architecture

Mahi UI uses a semantic, multi-theme design-token system built on CSS Custom Properties with seamless export to Tailwind CSS (`tailwind.config.js`).

## 1. Core Token Hierarchy

```css
:root {
  /* Surfaces & Backgrounds */
  --bg-primary: #090d16;
  --bg-secondary: #0f172a;
  --bg-card: rgba(15, 23, 42, 0.75);
  --bg-card-hover: rgba(30, 41, 59, 0.85);
  --bg-input: #1e293b;

  /* Borders & Focus Rings */
  --border-color: rgba(255, 255, 255, 0.08);
  --border-color-hover: rgba(255, 255, 255, 0.2);
  --border-focus: #6366f1;

  /* Typography Colors */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* Accent & Gradients */
  --accent-primary: #6366f1;
  --accent-hover: #4f46e5;
  --accent-light: rgba(99, 102, 241, 0.15);
  --accent-gradient: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  --accent-glow: rgba(99, 102, 241, 0.35);

  /* Status Colors */
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --info: #06b6d4;

  /* Radius & Elevation */
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 9999px;
}
```

## 2. Five Curated Themes

1. **Midnight Dark** (`[data-theme="dark"]`): Default deep blue-indigo space aesthetic.
2. **Clean Light** (`[data-theme="light"]`): High-contrast light mode with crisp borders.
3. **Cyberpunk Neon** (`[data-theme="cyberpunk"]`): High-voltage magenta (`#ff007f`) and cyan (`#00f5ff`).
4. **Emerald Forest** (`[data-theme="emerald"]`): Deep botanical green with emerald accents (`#10b981`).
5. **Sunset Violet** (`[data-theme="sunset"]`): Warm purple and rose dusk palette.

## 3. Tailwind Configuration Export

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: 'var(--bg-primary)',
        card: 'var(--bg-card)',
        accent: {
          DEFAULT: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
          light: 'var(--accent-light)'
        }
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        md: 'var(--radius-md)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)'
      }
    }
  }
};
```
