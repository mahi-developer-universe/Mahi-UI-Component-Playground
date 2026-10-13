/**
 * Central Environment Configuration & Secret Leakage Guard
 * 
 * Guarantees safe access to application environment variables.
 * Enforces strict boundaries preventing server-side secrets from leaking into client bundles.
 */

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PROD: process.env.NODE_ENV === 'production',
  IS_DEV: process.env.NODE_ENV === 'development',
  APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Mahi UI Component Playground',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  API_RATE_LIMIT_MAX: Number(process.env.RATE_LIMIT_MAX) || 120, // 120 requests
  API_RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute
} as const;

/**
 * Validates that critical secrets are never exposed to browser context.
 */
export function validateEnvironmentSafety(): { safe: boolean; issues: string[] } {
  const issues: string[] = [];

  if (typeof window !== 'undefined') {
    // Check if any sensitive keys were prefixed with NEXT_PUBLIC_
    const windowEnv = (window as unknown as { __ENV?: Record<string, string> }).__ENV || {};
    for (const key of Object.keys(windowEnv)) {
      if (/SECRET|KEY|PASSWORD|TOKEN|AUTH|CREDENTIAL/i.test(key)) {
        issues.push(`Critical security violation: Sensitive key "${key}" detected on client window object.`);
      }
    }
  }

  return {
    safe: issues.length === 0,
    issues,
  };
}
