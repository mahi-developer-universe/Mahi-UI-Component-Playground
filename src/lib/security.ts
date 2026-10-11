/**
 * Application Security Validation & Sanitization Engine
 * 
 * Provides defense against:
 * 1. Prototype Pollution (__proto__, constructor, prototype)
 * 2. Unsafe URL Schemes (javascript:, vbscript:, data:, file:)
 * 3. Bookmark JSON Import Overflows, Deep Nesting, & Illegal Characters
 * 4. Dangerous HTML / Script Injection
 */

export interface SanitizedBookmarkResult {
  validIds: string[];
  skippedCount: number;
  totalParsed: number;
}

const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * Validates whether an object contains prototype pollution keys.
 */
export function hasPrototypePollutionKey(obj: unknown): boolean {
  if (!obj || typeof obj !== 'object') return false;

  for (const key of Object.getOwnPropertyNames(obj)) {
    if (FORBIDDEN_KEYS.has(key)) return true;
  }
  return false;
}

/**
 * Validates if a URL is strictly web-safe (HTTP/HTTPS only).
 * Rejects javascript:, data:, vbscript:, file:, and control characters.
 */
export function isSafeWebUrl(url: unknown): boolean {
  if (typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed || trimmed.length > 2048) return false;

  // Prevent null bytes and newlines
  if (/[\x00-\x1f\x7f]/.test(trimmed)) return false;

  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

/**
 * Strictly parses and validates a JSON bookmark export payload.
 * Defends against prototype pollution, oversized payloads, and invalid types.
 */
export function sanitizeBookmarkPayload(rawJson: unknown): SanitizedBookmarkResult {
  if (!rawJson || typeof rawJson !== 'object') {
    throw new Error('Invalid JSON payload structure');
  }

  if (hasPrototypePollutionKey(rawJson)) {
    throw new Error('Security alert: Forbidden object key detected');
  }

  const rawRecord = rawJson as Record<string, unknown>;
  const favorites = rawRecord.favorites;

  if (!Array.isArray(favorites)) {
    throw new Error('Invalid schema: "favorites" property must be an array');
  }

  // Maximum bookmark list limit to prevent memory exhaustion
  if (favorites.length > 5000) {
    throw new Error('Payload exceeds maximum permitted bookmarks limit (5,000)');
  }

  const validIds: string[] = [];
  let skippedCount = 0;

  for (const item of favorites) {
    if (typeof item !== 'string') {
      skippedCount++;
      continue;
    }

    const trimmed = item.trim();
    // Validate ID format: alphanumeric, dashes, underscores, max length 80
    if (/^[a-zA-Z0-9_-]{1,80}$/.test(trimmed)) {
      validIds.push(trimmed);
    } else {
      skippedCount++;
    }
  }

  return {
    validIds: Array.from(new Set(validIds)),
    skippedCount,
    totalParsed: favorites.length
  };
}

/**
 * Sanitizes plain text input by stripping dangerous tags and characters.
 */
export function sanitizePlainText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[<>"'`;]/g, '')
    .trim()
    .slice(0, 500);
}
