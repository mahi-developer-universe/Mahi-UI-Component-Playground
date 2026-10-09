import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return fallbackCopyToClipboard(text);
    }
  }
  return fallbackCopyToClipboard(text);
}

function fallbackCopyToClipboard(text: string): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

// WCAG 2.1 relative luminance formula
function getLuminance(hex: string): number {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculates accurate WCAG relative luminance contrast ratio between two hex colors.
 * Returns ratio from 1:1 to 21:1 rounded to 2 decimal places.
 */
export function calculateContrastRatio(hex1: string, hex2: string): number {
  try {
    const l1 = getLuminance(hex1);
    const l2 = getLuminance(hex2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);
    return Math.round(ratio * 100) / 100;
  } catch {
    return 1;
  }
}

/**
 * Evaluates WCAG compliance against AA and AAA standards.
 */
export function checkWcagCompliance(ratio: number) {
  return {
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7.0,
    largeAA: ratio >= 3.0,
    largeAAA: ratio >= 4.5,
    uiComponents: ratio >= 3.0
  };
}
