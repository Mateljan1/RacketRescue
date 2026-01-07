// Predictive Analytics Engine
// Forecasts revenue, inventory needs, churn, and upsell opportunities

import { createClient } from '@supabase/supabase-js'
import type { ChurnPrediction, UpsellOpportunity } from '@/lib/types/operations'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// ============================================
// REVENUE FORECASTING
// ============================================

export async function forecastRevenue(days: number = 30): Promise<number> {
  if (!supabaseAdmin) return 0

  try {
    // Get revenue for last 90 days
    const { data: orders } = await supabaseAdmin
      .from('orders')
      .select('amount_total, created_at')
      .gte('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())
      .neq('status', 'cancelled')

    if (!orders || orders.length === 0) return 0

    // Calculate daily average
    const totalRevenue = orders.reduce((sum, o) => sum + (o.amount_total || 0) / 100, 0)
    const dailyAverage = totalRevenue / 90

    // Simple forecast: daily average * days (with 10% growth factor)
    const forecast = dailyAverage * days * 1.1

    return Math.round(forecast)

  } catch (error) {
    console.error('[Predictive] Revenue forecast error:', error)
    return 0
  }
}

// ============================================
// INVENTORY NEEDS PREDICTION
// ============================================

export async function predictInventoryNeeds(days: number = 30): Promise<Record<string, number>> {
  if (!supabaseAdmin) return {}

  try {
    // Get string usage for last 30 days
    const { data: transactions } = await supabaseAdmin
      .from('inventory_transactions')
      .select('item_id, quantity_used, inventory_items(name)')
      .eq('transaction_type', 'usage')
      .gte('transaction_date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

    if (!transactions) return {}

    // Calculate usage by string
    const usageByString = new Map<string, number>()
    transactions.forEach(t => {
      const name = (t.inventory_items as any)?.name || 'Unknown'
      usageByString.set(name, (usageByString.get(name) || 0) + t.quantity_used)
    })

    // Predict needs (usage rate * days)
    const predictions: Record<string, number> = {}
    usageByString.forEach((usage, name) => {
      const dailyRate = usage / 30
      predictions[name] = Math.ceil(dailyRate * days)
    })

    return predictions

  } catch (error) {
    console.error('[Predictive] Inventory needs error:', error)
    return {}
  }
}

// ============================================
// CHURN PREDICTION
// ============================================

export async function predictChurn(): Promise<ChurnPrediction[]> {
  if (!supabaseAdmin) return []

  try {
    const { data: players } = await supabaseAdmin
      .from('player_profiles')
      .select('*')
      .not('last_order_date', 'is', null)
      .not('average_days_between_restrings', 'is', null)

    if (!players) return []

    const predictions: ChurnPrediction[] = []
    const now = Date.now()

    players.forEach(player => {
      const lastOrderDate = new Date(player.last_order_date!).getTime()
      const daysSinceLastOrder = Math.floor((now - lastOrderDate) / (1000 * 60 * 60 * 24))
      const avgFrequency = player.average_days_between_restrings!

      // Calculate churn probability
      const ratio = daysSinceLastOrder / avgFrequency
      let churnProbability = 0

      if (ratio < 1) churnProbability = 0.1
      else if (ratio < 1.5) churnProbability = 0.3
      else if (ratio < 2) churnProbability = 0.6
      else if (ratio < 3) churnProbability = 0.8
      else churnProbability = 0.95

      // Only include at-risk customers
      if (churnProbability >= 0.6) {
        predictions.push({
          player_id: player.id,
          player_name: player.name,
          player_email: player.email,
          last_order_date: player.last_order_date!,
          days_since_last_order: daysSinceLastOrder,
          average_frequency: avgFrequency,
          churn_probability: churnProbability,
          recommended_action: churnProbability >= 0.8 
            ? 'Send win-back campaign with 15% discount'
            : 'Send friendly restring reminder',
        })
      }
    })

    return predictions.sort((a, b) => b.churn_probability - a.churn_probability)

  } catch (error) {
    console.error('[Predictive] Churn prediction error:', error)
    return []
  }
}

// ============================================
// UPSELL OPPORTUNITIES
// ============================================

export async function identifyUpsellOpportunities(): Promise<UpsellOpportunity[]> {
  if (!supabaseAdmin) return []

  try {
    const { data: players } = await supabaseAdmin
      .from('player_profiles')
      .select('*')

    if (!players) return []

    const opportunities: UpsellOpportunity[] = []

    for (const player of players) {
      // Membership upsell (orders 3+ times, not a member)
      if (player.total_orders >= 3 && !player.tags.includes('member')) {
        opportunities.push({
          player_id: player.id,
          player_name: player.name,
          player_email: player.email,
          opportunity_type: 'membership',
          confidence_score: Math.min(0.95, player.total_orders / 5),
          estimated_value: 228, // $19/mo * 12 months
          reason: `Orders ${player.total_orders} times - would save with membership`,
        })
      }

      // Premium string upsell (uses basic strings, competitive player)
      if (player.play_frequency === 'competitive' && player.preferred_string_type?.includes('Synthetic')) {
        opportunities.push({
          player_id: player.id,
          player_name: player.name,
          player_email: player.email,
          opportunity_type: 'premium_string',
          confidence_score: 0.7,
          estimated_value: 40, // $10 upgrade * 4 restrings/year
          reason: 'Competitive player using basic strings',
        })
      }

      // Multi-racket upsell (single racket, orders frequently)
      if (player.total_orders >= 5 && player.average_order_value < 100) {
        opportunities.push({
          player_id: player.id,
          player_name: player.name,
          player_email: player.email,
          opportunity_type: 'multi_racket',
          confidence_score: 0.6,
          estimated_value: 150, // 3-racket pack
          reason: 'Frequent orders - could benefit from multi-racket service',
        })
      }
    }

    return opportunities.sort((a, b) => b.estimated_value * b.confidence_score - a.estimated_value * a.confidence_score)

  } catch (error) {
    console.error('[Predictive] Upsell opportunities error:', error)
    return []
  }
}

// ============================================
// BUSY DAY PREDICTION
// ============================================

export async function predictBusyDays(daysAhead: number = 7): Promise<Record<string, number>> {
  if (!supabaseAdmin) return {}

  try {
    // Get historical orders by day of week
    const { data: orders } = await supabaseAdmin
      .from('orders')
      .select('created_at')
      .gte('created_at', new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString())

    if (!orders) return {}

    // Count orders by day of week
    const dayOfWeekCounts = new Array(7).fill(0)
    orders.forEach(order => {
      const dayOfWeek = new Date(order.created_at).getDay()
      dayOfWeekCounts[dayOfWeek]++
    })

    // Predict next 7 days
    const predictions: Record<string, number> = {}
    const today = new Date()

    for (let i = 0; i < daysAhead; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000)
      const dayOfWeek = date.getDay()
      const dateKey = date.toISOString().split('T')[0]
      
      // Average orders for this day of week
      const avgOrders = dayOfWeekCounts[dayOfWeek] / 13 // 90 days ≈ 13 weeks
      
      predictions[dateKey] = Math.round(avgOrders)
    }

    return predictions

  } catch (error) {
    console.error('[Predictive] Busy days error:', error)
    return {}
  }
}
