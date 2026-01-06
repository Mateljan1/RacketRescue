// Automatic Inventory Deduction
// Deducts inventory when order status changes to 'in_progress'

import { createClient } from '@supabase/supabase-js'
import { sendInventoryAlert } from './inventory-alerts'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function deductInventory(
  orderId: string,
  stringName: string,
  customerEmail: string
): Promise<boolean> {
  if (!supabaseAdmin) {
    console.error('[Inventory] Supabase not configured')
    return false
  }

  try {
    // Find inventory item by string name
    const { data: item, error: findError } = await supabaseAdmin
      .from('inventory_items')
      .select('*')
      .eq('name', stringName)
      .eq('type', 'string')
      .single()

    if (findError || !item) {
      console.warn(`[Inventory] String not found in inventory: ${stringName}`)
      return false
    }

    // Check if already deducted for this order
    const { data: existing } = await supabaseAdmin
      .from('inventory_transactions')
      .select('id')
      .eq('order_id', orderId)
      .eq('transaction_type', 'usage')
      .single()

    if (existing) {
      console.log(`[Inventory] Already deducted for order ${orderId}`)
      return true
    }

    // Deduct 1 unit
    const newQuantity = Math.max(0, item.quantity_in_stock - 1)
    
    const { error: updateError } = await supabaseAdmin
      .from('inventory_items')
      .update({ quantity_in_stock: newQuantity })
      .eq('id', item.id)

    if (updateError) {
      console.error('[Inventory] Failed to update stock:', updateError)
      return false
    }

    // Log transaction
    const { error: logError } = await supabaseAdmin
      .from('inventory_transactions')
      .insert({
        item_id: item.id,
        order_id: orderId,
        quantity_used: 1,
        transaction_type: 'usage',
        notes: `Used for order ${orderId} - Customer: ${customerEmail}`,
        created_by: 'system',
      })

    if (logError) {
      console.error('[Inventory] Failed to log transaction:', logError)
    }

    console.log(`[Inventory] Deducted 1 unit of ${stringName}. New stock: ${newQuantity}`)

    // Check if stock is below reorder point
    if (newQuantity <= item.reorder_point) {
      await sendInventoryAlert({
        item_id: item.id,
        item_name: item.name,
        alert_type: newQuantity === 0 ? 'out_of_stock' : newQuantity <= 3 ? 'critical_stock' : 'low_stock',
        current_stock: newQuantity,
        reorder_point: item.reorder_point,
        message: newQuantity === 0 
          ? `OUT OF STOCK: ${item.brand} ${item.name}`
          : `LOW STOCK: ${item.brand} ${item.name} - Only ${newQuantity} units left`,
      })
    }

    return true

  } catch (error) {
    console.error('[Inventory] Deduction error:', error)
    return false
  }
}

// Restock inventory (manual or from purchase order)
export async function restockInventory(
  itemId: string,
  quantity: number,
  notes?: string
): Promise<boolean> {
  if (!supabaseAdmin) return false

  try {
    // Get current stock
    const { data: item, error: findError } = await supabaseAdmin
      .from('inventory_items')
      .select('quantity_in_stock')
      .eq('id', itemId)
      .single()

    if (findError || !item) {
      console.error('[Inventory] Item not found')
      return false
    }

    // Add quantity
    const newQuantity = item.quantity_in_stock + quantity

    const { error: updateError } = await supabaseAdmin
      .from('inventory_items')
      .update({ 
        quantity_in_stock: newQuantity,
        last_ordered_date: new Date().toISOString(),
      })
      .eq('id', itemId)

    if (updateError) {
      console.error('[Inventory] Failed to restock:', updateError)
      return false
    }

    // Log transaction
    await supabaseAdmin
      .from('inventory_transactions')
      .insert({
        item_id: itemId,
        order_id: null,
        quantity_used: quantity,
        transaction_type: 'restock',
        notes: notes || `Restocked ${quantity} units`,
        created_by: 'admin',
      })

    console.log(`[Inventory] Restocked ${quantity} units. New stock: ${newQuantity}`)
    return true

  } catch (error) {
    console.error('[Inventory] Restock error:', error)
    return false
  }
}

// Adjust inventory (manual correction)
export async function adjustInventory(
  itemId: string,
  newQuantity: number,
  reason: string
): Promise<boolean> {
  if (!supabaseAdmin) return false

  try {
    const { error: updateError } = await supabaseAdmin
      .from('inventory_items')
      .update({ quantity_in_stock: newQuantity })
      .eq('id', itemId)

    if (updateError) {
      console.error('[Inventory] Failed to adjust:', updateError)
      return false
    }

    // Log adjustment
    await supabaseAdmin
      .from('inventory_transactions')
      .insert({
        item_id: itemId,
        order_id: null,
        quantity_used: 0, // Adjustment, not usage
        transaction_type: 'adjustment',
        notes: `Inventory adjusted: ${reason}`,
        created_by: 'admin',
      })

    console.log(`[Inventory] Adjusted to ${newQuantity} units`)
    return true

  } catch (error) {
    console.error('[Inventory] Adjustment error:', error)
    return false
  }
}

