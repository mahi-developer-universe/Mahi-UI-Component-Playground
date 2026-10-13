import { NextRequest, NextResponse } from 'next/server';
import { globalRateLimiter, sensitiveActionLimiter } from '@/lib/rateLimit';

export const dynamic = 'force-static';

export async function GET(request: NextRequest) {
  // Client IP identification (x-forwarded-for or default client identifier)
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'client-anon';

  // Apply rate limiter
  const check = globalRateLimiter.check(clientIp);

  if (!check.allowed) {
    return NextResponse.json(
      {
        error: 'Too Many Requests',
        message: 'Rate limit exceeded. Please wait before making more requests.',
        retryAfterMs: check.retryAfterMs
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(check.retryAfterMs / 1000)),
          'X-RateLimit-Limit': '60',
          'X-RateLimit-Remaining': '0'
        }
      }
    );
  }

  return NextResponse.json(
    {
      status: 'operational',
      service: 'Mahi UI Developer Platform API',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
      version: '1.0.0',
      projectsCount: 30,
      resourcesCount: 459
    },
    {
      headers: {
        'X-RateLimit-Limit': '60',
        'X-RateLimit-Remaining': String(check.remaining)
      }
    }
  );
}

export async function POST(request: NextRequest) {
  const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'client-anon';
  const check = sensitiveActionLimiter.check(clientIp);

  if (!check.allowed) {
    return NextResponse.json(
      {
        error: 'Too Many Requests',
        message: 'Rate limit exceeded on sensitive endpoint. Please wait before retrying.',
        retryAfterMs: check.retryAfterMs
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil(check.retryAfterMs / 1000)),
          'X-RateLimit-Limit': '15',
          'X-RateLimit-Remaining': '0'
        }
      }
    );
  }

  return NextResponse.json({
    status: 'received',
    message: 'Telemetry ping accepted.'
  });
}
