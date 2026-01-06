// Business Metrics API
// Provides aggregated business metrics for owner dashboard

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function GET(request: NextRequest) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 500 }
    )
  }

  try {
    const now = new Date()
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    const yearStart = new Date(now.getFullYear(), 0, 1)

    // Fetch orders
    const { data: allOrders } = await supabaseAdmin
      .from('orders')
      .select('*')
      .neq('status', 'cancelled')

    if (!allOrders) {
      return NextResponse.json({ metrics: null })
    }

    // Calculate metrics
    const todayOrders = allOrders.filter(o => new Date(o.created_at) >= todayStart)
    const weekOrders = allOrders.filter(o => new Date(o.created_at) >= weekStart)
    const monthOrders = allOrders.filter(o => new Date(o.created_at) >= monthStart)
    const yearOrders = allOrders.filter(o => new Date(o.created_at) >= yearStart)

    const todayRevenue = todayOrders.reduce((sum, o) => sum + (o.amount_total || 0) / 100, 0)
    const weekRevenue = weekOrders.reduce((sum, o) => sum + (o.amount_total || 0) / 100, 0)
    const monthRevenue = monthOrders.reduce((sum, o) => sum + (o.amount_total || 0) / 100, 0)
    const yearRevenue = yearOrders.reduce((sum, o) => sum + (o.amount_total || 0) / 100, 0)

    const avgOrderValue = allOrders.length > 0
      ? allOrders.reduce((sum, o) => sum + (o.amount_total || 0) / 100, 0) / allOrders.length
      : 0

    // Get unique customers
    const uniqueEmails = new Set(allOrders.map(o => o.customer_email))
    const monthUniqueEmails = new Set(monthOrders.map(o => o.customer_email))

    // Calculate new vs returning
    const emailFirstOrder = new Map<string, string>()
    allOrders.forEach(o => {
      if (!emailFirstOrder.has(o.customer_email) || 
          new Date(o.created_at) < new Date(emailFirstOrder.get(o.customer_email)!)) {
        emailFirstOrder.set(o.customer_email, o.created_at)
      }
    })

    const newCustomers = Array.from(monthUniqueEmails).filter(email => {
      const firstOrder = emailFirstOrder.get(email)
      return firstOrder && new Date(firstOrder) >= monthStart
    }).length

    const returningCustomers = monthUniqueEmails.size - newCustomers

    return NextResponse.json({
      metrics: {
        today_revenue: todayRevenue,
        week_revenue: weekRevenue,
        month_revenue: monthRevenue,
        year_revenue: yearRevenue,
        total_orders: allOrders.length,
        average_order_value: avgOrderValue,
        new_customers: newCustomers,
        returning_customers: returningCustomers,
      },
    })

  } catch (error) {
    console.error('Business metrics error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

