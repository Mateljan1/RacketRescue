import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'

// Only create client if env vars exist
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!supabase) {
    // Return empty data if Supabase not configured
    return NextResponse.json({
      orders: [],
      membership: null,
      user: {
        name: session.user.name,
        email: session.user.email,
      },
      stats: {
        totalOrders: 0,
        totalSaved: 0,
        memberSince: null,
      }
    })
  }

  try {
    // Get orders for this user (by user_id or email)
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('*')
      .or(`customer_email.eq.${session.user.email}`)
      .order('created_at', { ascending: false })
      .limit(20)

    if (ordersError) {
      console.error('Orders fetch error:', ordersError)
    }

    // Get user membership info
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('membership_tier, membership_status, created_at')
      .eq('email', session.user.email)
      .single()

    if (userError && userError.code !== 'PGRST116') {
      console.error('User fetch error:', userError)
    }

    // Calculate stats
    const totalOrders = orders?.length || 0
    const totalSaved = orders?.reduce((acc, order) => {
      // Estimate savings based on membership discount
      return acc + (order.is_member ? Math.round((order.total_cents || 0) * 0.1 / 100) : 0)
    }, 0) || 0

    return NextResponse.json({
      orders: orders || [],
      membership: user ? {
        tier: user.membership_tier,
        status: user.membership_status,
      } : null,
      user: {
        name: session.user.name,
        email: session.user.email,
      },
      stats: {
        totalOrders,
        totalSaved,
        memberSince: user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : null,
      }
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
