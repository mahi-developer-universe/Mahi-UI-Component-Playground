/**
 * In-Memory Token Bucket Rate Limiter
 * 
 * Protects client-side operations, form submissions, and API interactions
 * against Denial of Service (DoS) and rapid brute-force loops.
 */

interface RateLimitRecord {
  tokens: number;
  lastRefill: number;
}

class TokenBucketRateLimiter {
  private buckets = new Map<string, RateLimitRecord>();
  private readonly maxTokens: number;
  private readonly refillRatePerMs: number;

  constructor(maxTokens = 60, refillWindowMs = 60000) {
    this.maxTokens = maxTokens;
    this.refillRatePerMs = maxTokens / refillWindowMs;
  }

  /**
   * Check if an action by an identifier (e.g. IP, session, user key) is allowed.
   */
  public check(identifier: string, cost = 1): { allowed: boolean; remaining: number; retryAfterMs: number } {
    const now = Date.now();
    let bucket = this.buckets.get(identifier);

    if (!bucket) {
      bucket = { tokens: this.maxTokens, lastRefill: now };
      this.buckets.set(identifier, bucket);
    } else {
      // Refill tokens based on elapsed time
      const elapsed = now - bucket.lastRefill;
      const refilledTokens = elapsed * this.refillRatePerMs;
      bucket.tokens = Math.min(this.maxTokens, bucket.tokens + refilledTokens);
      bucket.lastRefill = now;
    }

    if (bucket.tokens >= cost) {
      bucket.tokens -= cost;
      return {
        allowed: true,
        remaining: Math.floor(bucket.tokens),
        retryAfterMs: 0,
      };
    }

    const missingTokens = cost - bucket.tokens;
    const retryAfterMs = Math.ceil(missingTokens / this.refillRatePerMs);

    return {
      allowed: false,
      remaining: 0,
      retryAfterMs,
    };
  }

  /**
   * Clear expired records to prevent unbounded memory growth.
   */
  public cleanup(maxAgeMs = 300000) {
    const now = Date.now();
    for (const [id, bucket] of this.buckets.entries()) {
      if (now - bucket.lastRefill > maxAgeMs) {
        this.buckets.delete(id);
      }
    }
  }
}

// Global default rate limiter: 60 requests per minute
export const globalRateLimiter = new TokenBucketRateLimiter(60, 60000);

// Sensitive action limiter (e.g. import, export, bulk mutate): 15 operations per minute
export const sensitiveActionLimiter = new TokenBucketRateLimiter(15, 60000);
