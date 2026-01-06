// Smart Scheduling System
// Predicts busy days and suggests optimal pickup slots

import { createClient } from '@supabase/supabase-js'
import { predictBusyDays } from './predictive-analytics'
import type { SmartSchedulingSuggestion } from '@/lib/types/operations'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

const MAX_ORDERS_PER_DAY = 10 // Stringer capacity

export async function generateSchedulingSuggestions(): Promise<SmartSchedulingSuggestion[]> {
  if (!supabaseAdmin) return []

  try {
    // Get busy day predictions
    const predictions = await predictBusyDays(7)

    // Get actual bookings for next 7 days
    const { data: orders } = await supabaseAdmin
      .from('orders')
      .select('pickup_time')
      .gte('pickup_time', new Date().toISOString())
      .lte('pickup_time', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())

    if (!orders) return []

    // Count bookings by date
    const bookingsByDate = new Map<string, number>()
    orders.forEach(order => {
      if (order.pickup_time) {
        const dateKey = order.pickup_time.split('T')[0]
        bookingsByDate.set(dateKey, (bookingsByDate.get(dateKey) || 0) + 1)
      }
    })

    // Generate suggestions
    const suggestions: SmartSchedulingSuggestion[] = []

    Object.entries(predictions).forEach(([date, predictedDemand]) => {
      const actualBookings = bookingsByDate.get(date) || 0
      const availableCapacity = MAX_ORDERS_PER_DAY - actualBookings
      const utilizationRate = actualBookings / MAX_ORDERS_PER_DAY

      let suggestedAction: 'promote' | 'normal' | 'limit' = 'normal'
      let message = ''

      if (utilizationRate < 0.3) {
        suggestedAction = 'promote'
        message = `Low bookings (${actualBookings}/${MAX_ORDERS_PER_DAY}). Send "Book now for ${new Date(date).toLocaleDateString()}" campaign.`
      } else if (utilizationRate > 0.8) {
        suggestedAction = 'limit'
        message = `High demand (${actualBookings}/${MAX_ORDERS_PER_DAY}). Consider surge pricing or limiting slots.`
      } else {
        message = `Normal capacity (${actualBookings}/${MAX_ORDERS_PER_DAY}). No action needed.`
      }

      suggestions.push({
        date,
        time_slot: '9am-5pm',
        available_capacity: availableCapacity,
        predicted_demand: predictedDemand,
        suggested_action: suggestedAction,
        message,
      })
    })

    return suggestions

  } catch (error) {
    console.error('[Smart Scheduling] Error:', error)
    return []
  }
}

// Auto-assign orders to optimal time slots
export async function autoAssignTimeSlot(orderId: string): Promise<string | null> {
  if (!supabaseAdmin) return null

  try {
    // Get next 7 days of availability
    const suggestions = await generateSchedulingSuggestions()

    // Find first day with available capacity
    const availableDay = suggestions.find(s => s.available_capacity > 0)

    if (!availableDay) return null

    // Suggest 9am slot (first available)
    const suggestedTime = `${availableDay.date}T09:00:00`

    return suggestedTime

  } catch (error) {
    console.error('[Smart Scheduling] Auto-assign error:', error)
    return null
  }
}

