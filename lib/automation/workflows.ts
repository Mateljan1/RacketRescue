// Automated Workflow System
// Orchestrates multi-step automations for orders, inventory, and customer engagement

import { sendStatusNotification } from './status-notifications'
import { sendInventoryAlert } from './inventory-alerts'
import type { OrderStatus } from '@/app/api/orders/update-status/route'

// ============================================
// NEW ORDER WORKFLOW
// ============================================

export async function executeNewOrderWorkflow(
  orderId: string,
  customerEmail: string,
  customerName: string,
  customerPhone: string | null
): Promise<void> {
  // Step 1: Send confirmation email (handled by Stripe/ActiveCampaign)
  console.log(`[Workflow] New order workflow started for ${orderId}`)

  // Step 2-7: Status-based notifications (handled by status update API)
  // This workflow is triggered automatically when order status changes
}

// ============================================
// LOW INVENTORY WORKFLOW
// ============================================

export async function executeLowInventoryWorkflow(
  itemId: string,
  itemName: string,
  currentStock: number,
  reorderPoint: number
): Promise<void> {
  console.log(`[Workflow] Low inventory workflow for ${itemName}`)

  // Step 1: Alert owner
  await sendInventoryAlert({
    item_id: itemId,
    item_name: itemName,
    alert_type: 'low_stock',
    current_stock: currentStock,
    reorder_point: reorderPoint,
    message: `${itemName} is running low. Current stock: ${currentStock} units. Reorder point: ${reorderPoint} units.`,
  })

  // Step 2: If not restocked in 3 days, send urgent alert
  // (This would be handled by a cron job checking alert age)

  // Step 3: If stock reaches 0, block orders
  // (This would be handled in the checkout flow)

  // Step 4: Auto-generate purchase order
  // (Future enhancement)
}

// ============================================
// CHURN PREVENTION WORKFLOW
// ============================================

export async function executeChurnPreventionWorkflow(
  playerEmail: string,
  playerName: string,
  daysSinceLastOrder: number,
  averageFrequency: number
): Promise<void> {
  console.log(`[Workflow] Churn prevention for ${playerEmail}`)

  const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL || 'https://tennisbeast.api-us1.com'
  const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY || ''

  if (!AC_API_KEY) return

  try {
    // Find contact
    const searchResponse = await fetch(
      `${AC_API_URL}/api/3/contacts?email=${encodeURIComponent(playerEmail)}`,
      {
        headers: { 'Api-Token': AC_API_KEY },
      }
    )

    const searchData = await searchResponse.json()
    const contact = searchData.contacts?.[0]

    if (!contact) return

    // Step 1: Send "Miss you" email (1.5x average frequency)
    if (daysSinceLastOrder >= averageFrequency * 1.5) {
      await fetch(`${AC_API_URL}/api/3/contactTags`, {
        method: 'POST',
        headers: {
          'Api-Token': AC_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contactTag: {
            contact: contact.id,
            tag: '102', // RR - Churn Risk
          },
        }),
      })
    }

    // Step 2: Send discount offer (7 days after step 1)
    // Step 3: Send win-back campaign (14 days after step 2)
    // These are handled by ActiveCampaign automations triggered by the tag

  } catch (error) {
    console.error('[Workflow] Churn prevention error:', error)
  }
}

// ============================================
// PICKUP REMINDER WORKFLOW
// ============================================

export async function executePickupReminderWorkflow(
  orderId: string,
  customerEmail: string,
  customerName: string,
  pickupTime: string
): Promise<void> {
  console.log(`[Workflow] Pickup reminder for order ${orderId}`)

  const pickupDate = new Date(pickupTime)
  const now = new Date()
  const hoursUntilPickup = (pickupDate.getTime() - now.getTime()) / (1000 * 60 * 60)

  // Send reminder 1 hour before pickup
  if (hoursUntilPickup <= 1 && hoursUntilPickup > 0) {
    await sendStatusNotification(
      customerEmail,
      customerName,
      null,
      'pending' as OrderStatus,
      orderId
    )
  }
}

// ============================================
// QUALITY CHECK WORKFLOW
// ============================================

export async function executeQualityCheckWorkflow(
  orderId: string,
  stringName: string,
  tension: number
): Promise<void> {
  console.log(`[Workflow] Quality check for order ${orderId}`)

  // Automated quality checks:
  // 1. Verify tension is within ±1 lb of requested
  // 2. Check string pattern is correct
  // 3. Inspect for frame damage
  // 4. Test string bed for proper tension

  // For now, this is a manual process
  // Future: Integrate with smart stringing machine API
}

