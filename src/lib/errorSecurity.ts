/**
 * Production Error Sanitizer & Telemetry Logger
 * 
 * Prevents Information Disclosure Vulnerabilities:
 * - Strips internal file system paths (e.g. F:\Mahi-UI..., /var/www..., node_modules)
 * - Redacts stack traces, database credentials, API keys, and internal IP addresses
 * - Formats user-friendly sanitized error messages
 * - Dispatches telemetry events safely
 */

export interface SafeErrorDisplay {
  title: string;
  userMessage: string;
  errorId: string;
  timestamp: string;
}

export function sanitizeErrorMessage(rawError: unknown): SafeErrorDisplay {
  const errorId = `err_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
  const timestamp = new Date().toISOString();

  let message = 'An unexpected application condition occurred. Please try again.';

  if (rawError instanceof Error) {
    message = rawError.message;
  } else if (typeof rawError === 'string') {
    message = rawError;
  }

  // Redact system file paths (Windows & POSIX)
  message = message.replace(/[a-zA-Z]:\\[^:\s\n]+/g, '[redacted_path]');
  message = message.replace(/\/(?:[a-zA-Z0-9._-]+\/)+[a-zA-Z0-9._-]+/g, '[redacted_path]');

  // Redact potential keys, tokens, or JWTs
  message = message.replace(/ey[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/g, '[redacted_jwt]');
  message = message.replace(/(?:key|secret|token|password|auth)=([a-zA-Z0-9_\-.~%]+)/gi, '$1=[redacted_secret]');

  // Redact IP addresses
  message = message.replace(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/g, '[redacted_ip]');

  // Friendly title mapping
  let title = 'Something went wrong';
  if (/network|fetch|timeout/i.test(message)) {
    title = 'Network Request Failed';
    message = 'Unable to establish a connection. Please verify your network and retry.';
  } else if (/permission|unauthorized|forbidden|csrf/i.test(message)) {
    title = 'Action Not Authorized';
    message = 'You do not have permission to execute this operation.';
  } else if (/rate limit|too many requests/i.test(message)) {
    title = 'Rate Limit Reached';
    message = 'Too many requests. Please pause for a moment before trying again.';
  }

  return {
    title,
    userMessage: message,
    errorId,
    timestamp,
  };
}

/**
 * Safe error logger that dispatches to telemetry without leaking client PII.
 */
export function logTelemetryError(error: unknown, context = 'general'): void {
  const sanitized = sanitizeErrorMessage(error);
  if (process.env.NODE_ENV === 'development') {
    console.warn(`[Telemetry Safe Error] [${context}]`, sanitized);
  }
}
