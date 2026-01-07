// Inventory Stock Check Cron Job
// Runs daily at 8am to check stock levels and send alerts

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { sendInventoryAlert, calculateDaysUntilStockout } from '@/lib/automation/inventory-alerts'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 500 }
    )
  }

  try {
    // Get all inventory items with usage stats
    const { data: items, error } = await supabaseAdmin
      .from('inventory_usage_summary')
      .select('*')

    if (error || !items) {
      console.error('[Cron] Error fetching inventory:', error)
      return NextResponse.json(
        { error: 'Failed to fetch inventory' },
        { status: 500 }
      )
    }

    let alertsSent = 0

    // Check each item
    for (const item of items) {
      const isLowStock = item.quantity_in_stock <= item.reorder_point
      const isCritical = item.quantity_in_stock <= 3
      const isOutOfStock = item.quantity_in_stock === 0

      if (isOutOfStock || isCritical || isLowStock) {
        const daysUntilStockout = calculateDaysUntilStockout(
          item.quantity_in_stock,
          item.usage_count_30d || 0
        )

        await sendInventoryAlert({
          item_id: item.id,
          item_name: `${item.brand} ${item.name}`,
          alert_type: isOutOfStock ? 'out_of_stock' : isCritical ? 'critical_stock' : 'low_stock',
          current_stock: item.quantity_in_stock,
          reorder_point: item.reorder_point,
          days_until_stockout: daysUntilStockout,
          message: isOutOfStock
            ? `OUT OF STOCK: ${item.brand} ${item.name} - Cannot fulfill orders requiring this item`
            : isCritical
            ? `CRITICAL: ${item.brand} ${item.name} - Only ${item.quantity_in_stock} units left`
            : `LOW STOCK: ${item.brand} ${item.name} - ${item.quantity_in_stock} units remaining`,
        })

        alertsSent++
      }
    }

    return NextResponse.json({
      success: true,
      items_checked: items.length,
      alerts_sent: alertsSent,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('[Cron] Inventory check error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
