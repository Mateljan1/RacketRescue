// Inventory API
// Fetch inventory items with usage statistics

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
    // Fetch inventory with usage stats from view
    const { data: items, error } = await supabaseAdmin
      .from('inventory_usage_summary')
      .select('*')
      .order('type', { ascending: true })
      .order('brand', { ascending: true })

    if (error) {
      console.error('Error fetching inventory:', error)
      return NextResponse.json(
        { error: 'Failed to fetch inventory' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      items: items || [],
      total_items: items?.length || 0,
      low_stock_count: items?.filter(i => i.quantity_in_stock <= i.reorder_point).length || 0,
    })

  } catch (error) {
    console.error('Inventory API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
