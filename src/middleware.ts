import { NextRequest, NextResponse } from 'next/server';
import { globalRateLimiter } from '@/lib/rateLimit';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rate limiting defense for all API routes
  if (pathname.startsWith('/api')) {
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'anon-client';
    const limit = globalRateLimiter.check(clientIp);

    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: 'Too Many Requests',
          message: 'Rate limit threshold exceeded.',
          retryAfterMs: limit.retryAfterMs
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(Math.ceil(limit.retryAfterMs / 1000)),
            'X-RateLimit-Limit': '60',
            'X-RateLimit-Remaining': '0'
          }
        }
      );
    }
  }

  // Security headers for all responses
  const response = NextResponse.next();
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export const config = {
  matcher: ['/api/:path*']
};
