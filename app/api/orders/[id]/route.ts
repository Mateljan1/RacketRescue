import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

// Order status types
export type OrderStatus =
  | 'pending'
  | 'picked_up'
  | 'in_progress'
  | 'quality_check'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'

// GET - Fetch order details from Stripe
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Try to get checkout session
    const session = await stripe.checkout.sessions.retrieve(id, {
      expand: ['line_items', 'customer']
    })

    if (!session) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const metadata = session.metadata || {}

    // Calculate progress based on status
    const statusProgress: Record<OrderStatus, number> = {
      pending: 10,
      picked_up: 25,
      in_progress: 50,
      quality_check: 70,
      ready: 85,
      out_for_delivery: 95,
      delivered: 100,
    }

    const currentStatus = (metadata.order_status as OrderStatus) || 'pending'

    const order = {
      id: session.id,
      status: currentStatus,
      progress: statusProgress[currentStatus] || 10,

      // Customer info
      customer_email: session.customer_details?.email || '',
      customer_name: session.customer_details?.name || '',
      customer_phone: session.customer_details?.phone || '',

      // Order details from metadata
      type: metadata.type || 'stringing',
      racket_brand: metadata.racket_brand || '',
      racket_model: metadata.racket_model || '',
      string_name: metadata.string_name || '',
      main_tension: metadata.main_tension || '',
      cross_tension: metadata.cross_tension || '',
      service_type: metadata.service_type || '',
      is_express: metadata.is_express === 'true',

      // Pickup/delivery
      pickup_address: metadata.pickup_address || '',
      pickup_time: metadata.pickup_time || '',
      special_instructions: metadata.special_instructions || '',

      // Timestamps
      created_at: new Date(session.created * 1000).toISOString(),
      estimated_ready: metadata.estimated_ready || calculateEstimatedReady(metadata),
      status_updated_at: metadata.status_updated_at || new Date(session.created * 1000).toISOString(),

      // Amount
      amount_total: session.amount_total ? session.amount_total / 100 : 0,

      // Status history (stored in metadata as JSON)
      status_history: metadata.status_history ? JSON.parse(metadata.status_history) : [
        { status: 'pending', timestamp: new Date(session.created * 1000).toISOString(), note: 'Order placed' }
      ],
    }

    return NextResponse.json({ order })

  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    )
  }
}

// PATCH - Update order status (for admin use)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, note } = body as { status: OrderStatus; note?: string }

    // Get current session
    const session = await stripe.checkout.sessions.retrieve(id)
    const currentMetadata = session.metadata || {}

    // Parse existing history or create new
    const statusHistory = currentMetadata.status_history
      ? JSON.parse(currentMetadata.status_history)
      : []

    // Add new status to history
    statusHistory.push({
      status,
      timestamp: new Date().toISOString(),
      note: note || getDefaultStatusNote(status),
    })

    // Update session metadata
    // Note: Stripe doesn't allow updating checkout session metadata after creation
    // In production, you'd use a database. For now, we'll store in customer metadata

    if (session.customer && typeof session.customer === 'string') {
      await stripe.customers.update(session.customer, {
        metadata: {
          [`order_${id}_status`]: status,
          [`order_${id}_history`]: JSON.stringify(statusHistory),
          [`order_${id}_updated`]: new Date().toISOString(),
        }
      })
    }

    // Trigger notifications based on status
    await triggerStatusNotification({
      customer_details: session.customer_details || undefined,
      id: session.id,
      metadata: session.metadata,
    }, status)

    return NextResponse.json({
      success: true,
      status,
      message: `Order status updated to ${status}`
    })

  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Failed to update order' },
      { status: 500 }
    )
  }
}

function calculateEstimatedReady(metadata: Record<string, string>): string {
  const isExpress = metadata.is_express === 'true'
  const hours = isExpress ? 4 : 24
  const estimated = new Date()
  estimated.setHours(estimated.getHours() + hours)
  return estimated.toISOString()
}

function getDefaultStatusNote(status: OrderStatus): string {
  const notes: Record<OrderStatus, string> = {
    pending: 'Order received',
    picked_up: 'Racket picked up from customer',
    in_progress: 'Stringing in progress',
    quality_check: 'Quality inspection',
    ready: 'Ready for delivery/pickup',
    out_for_delivery: 'On the way',
    delivered: 'Delivered to customer',
  }
  return notes[status]
}

async function triggerStatusNotification(
  session: { customer_details?: { email?: string | null; name?: string | null; phone?: string | null }; id: string; metadata?: Record<string, string> | null },
  status: OrderStatus
) {
  const email = session.customer_details?.email
  const phone = session.customer_details?.phone
  const name = session.customer_details?.name || 'Customer'

  if (!email) return

  // Call ActiveCampaign to trigger automation based on status
  const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL
  const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY

  if (!AC_API_KEY) return

  try {
    // Find contact by email
    const searchResponse = await fetch(
      `${AC_API_URL}/api/3/contacts?email=${encodeURIComponent(email)}`,
      {
        headers: { 'Api-Token': AC_API_KEY },
      }
    )
    const searchData = await searchResponse.json()
    const contact = searchData.contacts?.[0]

    if (!contact) return

    // Add status-specific tag to trigger automation
    // These tag IDs match the ones created in ActiveCampaign
    const statusTags: Record<OrderStatus, string> = {
      pending: '91', // RR - Order Received
      picked_up: '92', // RR - Racket Picked Up
      in_progress: '93', // RR - Stringing Started
      quality_check: '94', // RR - Quality Check
      ready: '95', // RR - Ready for Pickup (triggers SMS!)
      out_for_delivery: '96', // RR - Out for Delivery
      delivered: '97', // RR - Delivered
    }

    const tagId = statusTags[status]
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

    // Create note with status update
    await fetch(`${AC_API_URL}/api/3/notes`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note: {
          note: `📍 Order Status: ${status.toUpperCase().replace('_', ' ')}\nOrder ID: ${session.id}`,
          relid: contact.id,
          reltype: 'Subscriber',
        },
      }),
    })

  } catch (error) {
    console.error('Error triggering notification:', error)
  }
}
