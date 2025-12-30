import { createServiceRoleClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

interface RateLimitConfig {
  maxRequests: number
  windowMinutes: number
}

// Rate limit configurations per endpoint
const RATE_LIMITS: Record<string, RateLimitConfig> = {
  '/api/checkout': { maxRequests: 10, windowMinutes: 5 },
  '/api/payment': { maxRequests: 10, windowMinutes: 5 },
  '/api/orders': { maxRequests: 30, windowMinutes: 1 },
  '/api/auth': { maxRequests: 5, windowMinutes: 15 },
  'default': { maxRequests: 100, windowMinutes: 1 },
}

/**
 * Get the client IP address from the request
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  return 'unknown'
}

/**
 * Check if a request is rate limited
 * Returns { allowed: true } if request is allowed
 * Returns { allowed: false, retryAfter: number } if rate limited
 */
export async function checkRateLimit(
  request: NextRequest,
  endpoint: string
): Promise<{ allowed: boolean; remaining?: number; retryAfter?: number }> {
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS['default']
  const ip = getClientIP(request)

  try {
    const supabase = createServiceRoleClient()

    const { data, error } = await (supabase.rpc as unknown as Function)('check_rate_limit', {
      p_identifier: ip,
      p_identifier_type: 'ip',
      p_endpoint: endpoint,
      p_max_requests: config.maxRequests,
      p_window_minutes: config.windowMinutes,
    })

    if (error) {
      console.error('Rate limit check failed:', error)
      // Fail open - allow request if rate limiting fails
      return { allowed: true }
    }

    if (!data) {
      return {
        allowed: false,
        retryAfter: config.windowMinutes * 60
      }
    }

    return { allowed: true }

  } catch (error) {
    console.error('Rate limit error:', error)
    // Fail open
    return { allowed: true }
  }
}

/**
 * Check rate limit for authenticated users (by user ID)
 */
export async function checkUserRateLimit(
  userId: string,
  endpoint: string
): Promise<{ allowed: boolean; retryAfter?: number }> {
  const config = RATE_LIMITS[endpoint] || RATE_LIMITS['default']

  try {
    const supabase = createServiceRoleClient()

    const { data, error } = await (supabase.rpc as unknown as Function)('check_rate_limit', {
      p_identifier: userId,
      p_identifier_type: 'user',
      p_endpoint: endpoint,
      p_max_requests: config.maxRequests,
      p_window_minutes: config.windowMinutes,
    })

    if (error) {
      console.error('User rate limit check failed:', error)
      return { allowed: true }
    }

    if (!data) {
      return {
        allowed: false,
        retryAfter: config.windowMinutes * 60
      }
    }

    return { allowed: true }

  } catch (error) {
    console.error('User rate limit error:', error)
    return { allowed: true }
  }
}

/**
 * Return a rate limited response
 */
export function rateLimitedResponse(retryAfter: number = 60): NextResponse {
  return NextResponse.json(
    {
      error: 'Too many requests. Please try again later.',
      retryAfter
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': 'See endpoint documentation',
        'X-RateLimit-Remaining': '0',
      }
    }
  )
}

/**
 * Middleware helper for rate limiting
 * Use in API routes like:
 *
 * const rateLimitResult = await checkRateLimit(request, '/api/checkout')
 * if (!rateLimitResult.allowed) {
 *   return rateLimitedResponse(rateLimitResult.retryAfter)
 * }
 */
export async function withRateLimit(
  request: NextRequest,
  endpoint: string,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const rateLimitResult = await checkRateLimit(request, endpoint)

  if (!rateLimitResult.allowed) {
    return rateLimitedResponse(rateLimitResult.retryAfter)
  }

  return handler()
}
