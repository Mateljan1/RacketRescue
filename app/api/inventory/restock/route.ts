// Inventory Restock API
// Handles restocking inventory items

import { NextRequest, NextResponse } from 'next/server'
import { restockInventory } from '@/lib/automation/inventory-deduction'

export async function POST(request: NextRequest) {
  try {
    const { itemId, quantity, cost, notes } = await request.json()

    if (!itemId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Invalid itemId or quantity' },
        { status: 400 }
      )
    }

    const success = await restockInventory(itemId, quantity, notes)

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to restock inventory' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: `Restocked ${quantity} units`,
    })

  } catch (error) {
    console.error('Restock API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

