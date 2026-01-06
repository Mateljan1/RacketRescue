// Order Status Update API with Automation
// Updates order status and triggers: inventory deduction, notifications, ActiveCampaign tags

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { deductInventory } from '@/lib/automation/inventory-deduction'
import { sendStatusNotification } from '@/lib/automation/status-notifications'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export type OrderStatus = 'pending' | 'picked_up' | 'in_progress' | 'quality_check' | 'ready' | 'out_for_delivery' | 'delivered'

export async function POST(request: NextRequest) {
  try {
    const { orderId, status, notes } = await request.json()

    if (!orderId || !status) {
      return NextResponse.json(
        { error: 'Missing orderId or status' },
        { status: 400 }
      )
    }

    if (!supabaseAdmin) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      )
    }

    // Update order status in database
    const { data: order, error: updateError } = await supabaseAdmin
      .from('orders')
      .update({ 
        status,
        updated_at: new Date().toISOString(),
        ...(notes && { stringer_notes: notes })
      })
      .eq('id', orderId)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating order:', updateError)
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }

    // Trigger automations based on status change
    const automationPromises = []

    // 1. Deduct inventory when stringing starts
    if (status === 'in_progress' && order) {
      automationPromises.push(
        deductInventory(orderId, order.string_name, order.customer_email)
      )
    }

    // 2. Send status notification
    if (order) {
      automationPromises.push(
        sendStatusNotification(
          order.customer_email,
          order.customer_name,
          order.customer_phone,
          status,
          orderId
        )
      )
    }

    // 3. Update player profile stats
    if (status === 'delivered' && order) {
      automationPromises.push(
        updatePlayerProfileStats(order.customer_email)
      )
    }

    // Execute all automations in parallel (don't block response)
    Promise.all(automationPromises).catch(error => {
      console.error('Automation error:', error)
    })

    return NextResponse.json({
      success: true,
      order,
      message: `Order status updated to ${status}`,
    })

  } catch (error) {
    console.error('Status update error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Helper function to update player profile stats
async function updatePlayerProfileStats(customerEmail: string): Promise<void> {
  if (!supabaseAdmin) return

  try {
    // Call the SQL function we created in migration
    await supabaseAdmin.rpc('update_player_profile_stats', {
      player_email: customerEmail
    })
  } catch (error) {
    console.error('Error updating player stats:', error)
  }
}

