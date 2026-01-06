import { NextRequest, NextResponse } from 'next/server'

// Admin emails that have access to order management
// In production, use a proper auth system (NextAuth, Clerk, etc.)
const ADMIN_EMAILS = [
  'support@lagunabeachtennisacademy.com',
  'admin@racketrescue.com',
]

// Simple admin key for API access (set in environment)
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || ''

export interface AuthResult {
  authenticated: boolean
  email?: string
  error?: string
}

/**
 * Validates admin access via API key or email verification
 *
 * Methods:
 * 1. x-admin-key header with ADMIN_API_KEY
 * 2. x-admin-email header with verified admin email
 *
 * In production, replace with proper session-based auth
 */
export function validateAdminAccess(request: NextRequest): AuthResult {
  // Method 1: API Key
  const apiKey = request.headers.get('x-admin-key')
  if (apiKey && ADMIN_API_KEY && apiKey === ADMIN_API_KEY) {
    return { authenticated: true }
  }

  // Method 2: Admin email (for dashboard use)
  const adminEmail = request.headers.get('x-admin-email')
  if (adminEmail && ADMIN_EMAILS.includes(adminEmail.toLowerCase())) {
    return { authenticated: true, email: adminEmail }
  }

  return {
    authenticated: false,
    error: 'Unauthorized. Admin access required.',
  }
}

/**
 * Returns 401 response for unauthorized access
 */
export function unauthorizedResponse(message = 'Unauthorized') {
  return NextResponse.json(
    { error: message },
    {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Bearer realm="admin"',
      },
    }
  )
}

/**
 * Validates that an email matches the order's customer
 * Used for customer-facing order tracking
 */
export function validateCustomerAccess(
  requestEmail: string | null,
  orderEmail: string | null
): boolean {
  if (!requestEmail || !orderEmail) return false
  return requestEmail.toLowerCase() === orderEmail.toLowerCase()
}

// ============================================
// ROLE-BASED ACCESS CONTROL
// ============================================

export type AdminRole = 'owner' | 'stringer'

export function getAdminRole(email: string | null | undefined): AdminRole | null {
  if (!email) return null
  
  // Owner has full access
  if (email === process.env.ADMIN_EMAIL) {
    return 'owner'
  }
  
  // Check if email is in stringers list
  const stringerEmails = (process.env.STRINGER_EMAILS || '').split(',').map(e => e.trim())
  if (stringerEmails.includes(email)) {
    return 'stringer'
  }
  
  return null
}

// Permission checks
export function canAccessInventory(role: AdminRole): boolean {
  return role === 'owner'
}

export function canAccessPlayers(role: AdminRole): boolean {
  return role === 'owner'
}

export function canAccessAnalytics(role: AdminRole): boolean {
  return role === 'owner'
}

export function canUpdateOrders(role: AdminRole): boolean {
  return true // Both owner and stringer
}

export function canAccessDashboard(role: AdminRole): boolean {
  return role === 'owner'
}
