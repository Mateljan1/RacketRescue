// Inventory Alert System
// Sends alerts to owner when inventory is low, critical, or out of stock

import type { InventoryAlert } from '@/lib/types/operations'

const ADMIN_EMAIL = process.env.ADMIN_EMAIL
const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL || 'https://tennisbeast.api-us1.com'
const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY || ''

export async function sendInventoryAlert(alert: Omit<InventoryAlert, 'id' | 'created_at'>): Promise<boolean> {
  if (!ADMIN_EMAIL || !AC_API_KEY) {
    console.warn('[Inventory Alerts] Not configured')
    return false
  }

  try {
    // Find owner contact in ActiveCampaign
    const searchResponse = await fetch(
      `${AC_API_URL}/api/3/contacts?email=${encodeURIComponent(ADMIN_EMAIL)}`,
      {
        headers: { 'Api-Token': AC_API_KEY },
      }
    )

    const searchData = await searchResponse.json()
    const contact = searchData.contacts?.[0]

    if (!contact) {
      console.warn('[Inventory Alerts] Owner contact not found')
      return false
    }

    // Create alert note
    const alertEmoji = {
      low_stock: '⚠️',
      critical_stock: '🚨',
      out_of_stock: '❌',
      high_usage: '📈',
      slow_moving: '📉',
    }[alert.alert_type]

    const noteContent = `
${alertEmoji} INVENTORY ALERT
━━━━━━━━━━━━━━━━━━━━
Type: ${alert.alert_type.toUpperCase().replace('_', ' ')}
Item: ${alert.item_name}
Current Stock: ${alert.current_stock} units
Reorder Point: ${alert.reorder_point} units
${alert.days_until_stockout ? `Days Until Stockout: ${alert.days_until_stockout}` : ''}

${alert.message}

Action Required: ${alert.alert_type === 'out_of_stock' ? 'REORDER IMMEDIATELY' : 'Review and reorder if needed'}
━━━━━━━━━━━━━━━━━━━━
Time: ${new Date().toLocaleString()}
    `.trim()

    await fetch(`${AC_API_URL}/api/3/notes`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note: {
          contact: contact.id,
          note: noteContent,
        },
      }),
    })

    // Add tag based on alert type
    const alertTags: Record<string, string> = {
      low_stock: '98',      // RR - Low Inventory
      critical_stock: '99', // RR - Critical Inventory
      out_of_stock: '100',  // RR - Out of Stock
    }

    const tagId = alertTags[alert.alert_type]
    if (tagId) {
      await fetch(`${AC_API_URL}/api/3/contactTags`, {
        method: 'POST',
        headers: {
          'Api-Token': AC_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactTag: {
            contact: contact.id,
            tag: tagId,
          },
        }),
      })
    }

    console.log(`[Inventory Alerts] ${alert.alert_type} alert sent for ${alert.item_name}`)
    return true

  } catch (error) {
    console.error('[Inventory Alerts] Error sending alert:', error)
    return false
  }
}

// Calculate days until stockout based on usage rate
export function calculateDaysUntilStockout(
  currentStock: number,
  usageCount30Days: number
): number | null {
  if (usageCount30Days === 0) return null
  
  const dailyUsageRate = usageCount30Days / 30
  if (dailyUsageRate === 0) return null
  
  return Math.floor(currentStock / dailyUsageRate)
}

// Check if item should trigger alert
export function shouldTriggerAlert(
  currentStock: number,
  reorderPoint: number,
  usageCount30Days: number
): { shouldAlert: boolean; alertType: string | null } {
  // Out of stock
  if (currentStock === 0) {
    return { shouldAlert: true, alertType: 'out_of_stock' }
  }

  // Critical stock (3 or fewer units)
  if (currentStock <= 3) {
    return { shouldAlert: true, alertType: 'critical_stock' }
  }

  // Low stock (below reorder point)
  if (currentStock <= reorderPoint) {
    return { shouldAlert: true, alertType: 'low_stock' }
  }

  // High usage (2x normal rate)
  const normalUsage = 10 // Assume 10 uses per month is normal
  if (usageCount30Days >= normalUsage * 2) {
    return { shouldAlert: true, alertType: 'high_usage' }
  }

  // Slow moving (no usage in 30 days)
  if (usageCount30Days === 0 && currentStock > 0) {
    return { shouldAlert: true, alertType: 'slow_moving' }
  }

  return { shouldAlert: false, alertType: null }
}

