// Status Update Notifications
// Sends SMS/email via ActiveCampaign when order status changes

import type { OrderStatus } from '@/app/api/orders/update-status/route'

const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL || 'https://tennisbeast.api-us1.com'
const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY || ''

// ActiveCampaign Tag IDs for status triggers
const STATUS_TAGS: Record<OrderStatus, string> = {
  pending: '91',          // RR - Order Received
  picked_up: '92',        // RR - Racket Picked Up
  in_progress: '93',      // RR - Stringing Started
  quality_check: '94',    // RR - Quality Check
  ready: '95',            // RR - Ready for Pickup (triggers SMS!)
  out_for_delivery: '96', // RR - Out for Delivery
  delivered: '97',        // RR - Delivered
}

export async function sendStatusNotification(
  customerEmail: string,
  customerName: string,
  customerPhone: string | null | undefined,
  status: OrderStatus,
  orderId: string
): Promise<boolean> {
  if (!AC_API_KEY) {
    console.warn('[Notifications] ActiveCampaign not configured')
    return false
  }

  try {
    // Find contact in ActiveCampaign
    const searchResponse = await fetch(
      `${AC_API_URL}/api/3/contacts?email=${encodeURIComponent(customerEmail)}`,
      {
        headers: { 'Api-Token': AC_API_KEY },
      }
    )

    const searchData = await searchResponse.json()
    const contact = searchData.contacts?.[0]

    if (!contact) {
      console.warn(`[Notifications] Contact not found: ${customerEmail}`)
      return false
    }

    // Add status-specific tag to trigger automation
    const tagId = STATUS_TAGS[status]
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

      console.log(`[Notifications] Triggered ${status} notification for ${customerEmail}`)
    }

    // Create note with status update
    const trackingUrl = `https://www.racketrescue.com/track/${orderId}`
    const noteContent = `
🎾 ORDER STATUS UPDATE
━━━━━━━━━━━━━━━━━━━━
Status: ${status.toUpperCase().replace('_', ' ')}
Order ID: ${orderId}
Track Order: ${trackingUrl}
Updated: ${new Date().toLocaleString()}
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

    return true

  } catch (error) {
    console.error('[Notifications] Error sending notification:', error)
    return false
  }
}

// Send custom notification (for manual use)
export async function sendCustomNotification(
  customerEmail: string,
  subject: string,
  message: string
): Promise<boolean> {
  if (!AC_API_KEY) return false

  try {
    const searchResponse = await fetch(
      `${AC_API_URL}/api/3/contacts?email=${encodeURIComponent(customerEmail)}`,
      {
        headers: { 'Api-Token': AC_API_KEY },
      }
    )

    const searchData = await searchResponse.json()
    const contact = searchData.contacts?.[0]

    if (!contact) return false

    // Create note
    await fetch(`${AC_API_URL}/api/3/notes`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note: {
          contact: contact.id,
          note: `${subject}\n\n${message}`,
        },
      }),
    })

    console.log(`[Notifications] Custom notification sent to ${customerEmail}`)
    return true

  } catch (error) {
    console.error('[Notifications] Error sending custom notification:', error)
    return false
  }
}

