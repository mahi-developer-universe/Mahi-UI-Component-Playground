/**
 * Color and WCAG Contrast calculation utilities
 */

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface ColorScaleStep {
  step: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
  hex: string;
  contrastOnWhite: number;
  contrastOnDark: number;
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const cleanHex = hex.replace('#', '').trim();
  if (cleanHex.length === 3) {
    const r = parseInt(cleanHex[0] + cleanHex[0], 16);
    const g = parseInt(cleanHex[1] + cleanHex[1], 16);
    const b = parseInt(cleanHex[2] + cleanHex[2], 16);
    return { r, g, b };
  }
  if (cleanHex.length === 6) {
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (val: number) => Math.max(0, Math.min(255, Math.round(val)));
  const toHex = (c: number) => clamp(c).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function hexToHsl(hex: string): HSLColor {
  const rgb = hexToRgb(hex) || { r: 37, g: 99, b: 235 };
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

export function hslToHex(h: number, s: number, l: number): string {
  const hNorm = h / 360;
  const sNorm = s / 100;
  const lNorm = l / 100;

  if (sNorm === 0) {
    const val = Math.round(lNorm * 255);
    return rgbToHex(val, val, val);
  }

  const hue2rgb = (p: number, q: number, t: number) => {
    let tNorm = t;
    if (tNorm < 0) tNorm += 1;
    if (tNorm > 1) tNorm -= 1;
    if (tNorm < 1 / 6) return p + (q - p) * 6 * tNorm;
    if (tNorm < 1 / 2) return q;
    if (tNorm < 2 / 3) return p + (q - p) * (2 / 3 - tNorm) * 6;
    return p;
  };

  const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
  const p = 2 * lNorm - q;

  const r = Math.round(hue2rgb(p, q, hNorm + 1 / 3) * 255);
  const g = Math.round(hue2rgb(p, q, hNorm) * 255);
  const b = Math.round(hue2rgb(p, q, hNorm - 1 / 3) * 255);

  return rgbToHex(r, g, b);
}

export function getLuminance(hex: string): number {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function calculateContrastRatio(hex1: string, hex2: string): number {
  const l1 = getLuminance(hex1);
  const l2 = getLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  const ratio = (lighter + 0.05) / (darker + 0.05);
  return Math.round(ratio * 100) / 100;
}

export function getWcagRating(ratio: number): { aa: boolean; aaa: boolean; label: string } {
  const aa = ratio >= 4.5;
  const aaa = ratio >= 7;
  let label = 'Fail';
  if (aaa) label = 'AAA (Optimal)';
  else if (aa) label = 'AA (Compliant)';
  else if (ratio >= 3) label = 'AA Large';

  return { aa, aaa, label };
}

/**
 * Generates an 11-step Tailwind/Design System tonal scale (50-950) from any base color
 */
export function generateTonalScale(baseHex: string): ColorScaleStep[] {
  const hsl = hexToHsl(baseHex);
  const steps: Array<50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950> = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950
  ];

  const lightnessMap: Record<number, number> = {
    50: 97,
    100: 93,
    200: 85,
    300: 74,
    400: 62,
    500: hsl.l, // Base anchor
    600: Math.max(10, hsl.l - 10),
    700: Math.max(8, hsl.l - 20),
    800: Math.max(6, hsl.l - 30),
    900: Math.max(4, hsl.l - 40),
    950: Math.max(2, hsl.l - 46)
  };

  return steps.map((step) => {
    const l = lightnessMap[step];
    const hex = hslToHex(hsl.h, hsl.s, l);
    return {
      step,
      hex,
      contrastOnWhite: calculateContrastRatio(hex, '#ffffff'),
      contrastOnDark: calculateContrastRatio(hex, '#0b0f19')
    };
  });
}
