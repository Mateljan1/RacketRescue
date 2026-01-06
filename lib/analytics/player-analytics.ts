// Player Analytics Engine
// Calculates LTV, churn risk, restring predictions, and recommendations

import { createClient } from '@supabase/supabase-js'
import type { PlayerProfile, PlayerAnalytics, SpendingTier } from '@/lib/types/operations'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// Calculate Lifetime Value
export function calculateLTV(
  totalSpent: number,
  membershipMonths: number = 0,
  monthlyFee: number = 19
): number {
  const membershipValue = membershipMonths * monthlyFee
  const predictedFutureValue = totalSpent * 0.5 // Assume 50% future growth
  return totalSpent + membershipValue + predictedFutureValue
}

// Calculate churn risk score (0-1)
export function calculateChurnRisk(
  daysSinceLastOrder: number,
  averageDaysBetweenOrders: number
): number {
  if (!averageDaysBetweenOrders || averageDaysBetweenOrders === 0) return 0
  
  const ratio = daysSinceLastOrder / averageDaysBetweenOrders
  
  if (ratio < 1) return 0.1 // Active customer
  if (ratio < 1.5) return 0.3 // Slightly overdue
  if (ratio < 2) return 0.6 // At risk
  if (ratio < 3) return 0.8 // High risk
  return 0.95 // Very high risk / churned
}

// Predict next restring date
export function predictNextRestringDate(
  lastOrderDate: string | null,
  averageDaysBetweenOrders: number | null
): string | null {
  if (!lastOrderDate || !averageDaysBetweenOrders) return null
  
  const lastDate = new Date(lastOrderDate)
  const nextDate = new Date(lastDate.getTime() + averageDaysBetweenOrders * 24 * 60 * 60 * 1000)
  
  return nextDate.toISOString().split('T')[0]
}

// Classify spending tier
export function getSpendingTier(ltv: number): SpendingTier {
  if (ltv >= 1000) return 'Platinum'
  if (ltv >= 500) return 'Gold'
  if (ltv >= 200) return 'Silver'
  return 'Bronze'
}

// Get player analytics
export async function getPlayerAnalytics(playerId: string): Promise<PlayerAnalytics | null> {
  if (!supabaseAdmin) return null

  try {
    // Get player profile
    const { data: player, error: playerError } = await supabaseAdmin
      .from('player_profiles')
      .select('*')
      .eq('id', playerId)
      .single()

    if (playerError || !player) {
      console.error('Player not found:', playerError)
      return null
    }

    // Get order history for charts
    const { data: orders, error: ordersError } = await supabaseAdmin
      .from('orders')
      .select('*')
      .eq('customer_email', player.email)
      .order('created_at', { ascending: true })

    if (ordersError) {
      console.error('Error fetching orders:', ordersError)
      return null
    }

    // Calculate order frequency chart (last 12 months)
    const orderFrequencyChart = calculateOrderFrequencyChart(orders || [])

    // Calculate spending trend (last 12 months)
    const spendingTrend = calculateSpendingTrend(orders || [])

    // Calculate string preferences
    const stringPreferences = calculateStringPreferences(orders || [])

    // Calculate tension preferences
    const tensionPreferences = calculateTensionPreferences(orders || [])

    // Calculate churn risk
    const daysSinceLastOrder = player.last_order_date
      ? Math.floor((Date.now() - new Date(player.last_order_date).getTime()) / (1000 * 60 * 60 * 24))
      : 999

    const churnRiskScore = calculateChurnRisk(
      daysSinceLastOrder,
      player.average_days_between_restrings || 30
    )

    // Generate recommendations
    const recommendedActions = generateRecommendations(player, orders || [])

    return {
      player_id: playerId,
      order_frequency_chart: orderFrequencyChart,
      spending_trend: spendingTrend,
      string_preferences: stringPreferences,
      tension_preferences: tensionPreferences,
      average_days_between_restrings: player.average_days_between_restrings || 0,
      predicted_next_restring_date: player.next_restring_prediction_date,
      churn_risk_score: churnRiskScore,
      recommended_actions: recommendedActions,
    }

  } catch (error) {
    console.error('Error getting player analytics:', error)
    return null
  }
}

// Helper functions
function calculateOrderFrequencyChart(orders: any[]): Array<{ month: string; orders: number }> {
  const last12Months = []
  const now = new Date()

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = date.toISOString().slice(0, 7) // YYYY-MM
    const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    
    const orderCount = orders.filter(o => {
      const orderDate = new Date(o.created_at)
      return orderDate.toISOString().slice(0, 7) === monthKey
    }).length

    last12Months.push({ month: monthLabel, orders: orderCount })
  }

  return last12Months
}

function calculateSpendingTrend(orders: any[]): Array<{ month: string; spent: number }> {
  const last12Months = []
  const now = new Date()

  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1)
    const monthKey = date.toISOString().slice(0, 7)
    const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
    
    const spent = orders
      .filter(o => new Date(o.created_at).toISOString().slice(0, 7) === monthKey)
      .reduce((sum, o) => sum + (o.amount_total || 0) / 100, 0)

    last12Months.push({ month: monthLabel, spent })
  }

  return last12Months
}

function calculateStringPreferences(orders: any[]): Array<{ string: string; count: number }> {
  const stringCounts = new Map<string, number>()

  orders.forEach(order => {
    const stringName = order.string_name || 'Unknown'
    stringCounts.set(stringName, (stringCounts.get(stringName) || 0) + 1)
  })

  return Array.from(stringCounts.entries())
    .map(([string, count]) => ({ string, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5) // Top 5
}

function calculateTensionPreferences(orders: any[]): Array<{ tension: number; count: number }> {
  const tensionCounts = new Map<number, number>()

  orders.forEach(order => {
    const tension = order.main_tension || 55
    tensionCounts.set(tension, (tensionCounts.get(tension) || 0) + 1)
  })

  return Array.from(tensionCounts.entries())
    .map(([tension, count]) => ({ tension, count }))
    .sort((a, b) => a.tension - b.tension)
}

function generateRecommendations(player: PlayerProfile, orders: any[]): string[] {
  const recommendations: string[] = []

  // Membership recommendation
  if (!player.tags.includes('member') && player.total_orders >= 3) {
    recommendations.push('Suggest membership - orders 3+ times')
  }

  // String upgrade recommendation
  const basicStrings = ['SG SpiralTek', 'Synthetic Gut']
  const usesBasicStrings = orders.some(o => 
    basicStrings.some(bs => o.string_name?.includes(bs))
  )
  if (usesBasicStrings && player.play_frequency === 'competitive') {
    recommendations.push('Recommend premium string upgrade for competitive play')
  }

  // Churn risk action
  if (player.churn_risk_score > 0.6) {
    recommendations.push('Send win-back campaign - high churn risk')
  }

  // Restring reminder
  const daysSinceLastOrder = player.last_order_date
    ? Math.floor((Date.now() - new Date(player.last_order_date).getTime()) / (1000 * 60 * 60 * 24))
    : 999

  if (daysSinceLastOrder >= (player.average_days_between_restrings || 30) - 3) {
    recommendations.push('Send restring reminder - due soon')
  }

  return recommendations
}

