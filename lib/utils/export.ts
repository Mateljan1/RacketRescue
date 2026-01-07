// CSV Export Utilities
// Helper functions to export data to CSV format

export function exportToCSV(data: any[], filename: string, headers: string[]) {
  // Create CSV content
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header.toLowerCase().replace(/\s+/g, '_')]
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value || ''
      }).join(',')
    )
  ].join('\n')

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`
  link.click()
  window.URL.revokeObjectURL(url)
}

// Export orders to CSV
export function exportOrders(orders: any[]) {
  const data = orders.map(order => ({
    order_id: order.id,
    date: new Date(order.created_at).toLocaleDateString(),
    customer_name: order.customer_name,
    customer_email: order.customer_email,
    customer_phone: order.customer_phone || '',
    racket: `${order.racket_brand || ''} ${order.racket_model || ''}`.trim(),
    string: order.string_name,
    tension: order.main_tension ? `${order.main_tension}/${order.cross_tension || order.main_tension}` : '',
    status: order.status,
    amount: `$${(order.amount_total / 100).toFixed(2)}`,
    is_express: order.is_express ? 'Yes' : 'No',
    pickup_address: order.pickup_address || '',
    special_instructions: order.special_instructions || '',
  }))

  exportToCSV(data, 'orders', [
    'Order ID',
    'Date',
    'Customer Name',
    'Customer Email',
    'Customer Phone',
    'Racket',
    'String',
    'Tension',
    'Status',
    'Amount',
    'Is Express',
    'Pickup Address',
    'Special Instructions',
  ])
}

// Export inventory to CSV
export function exportInventory(items: any[]) {
  const data = items.map(item => ({
    sku: item.sku,
    type: item.type,
    brand: item.brand,
    name: item.name,
    quantity_in_stock: item.quantity_in_stock,
    reorder_point: item.reorder_point,
    cost_per_unit: `$${item.cost_per_unit.toFixed(2)}`,
    price_per_unit: `$${item.price_per_unit.toFixed(2)}`,
    total_value: `$${(item.quantity_in_stock * item.cost_per_unit).toFixed(2)}`,
    usage_30d: item.usage_count_30d || 0,
    supplier: item.supplier || '',
  }))

  exportToCSV(data, 'inventory', [
    'SKU',
    'Type',
    'Brand',
    'Name',
    'Quantity in Stock',
    'Reorder Point',
    'Cost Per Unit',
    'Price Per Unit',
    'Total Value',
    'Usage 30d',
    'Supplier',
  ])
}

// Export players to CSV
export function exportPlayers(players: any[]) {
  const data = players.map(player => ({
    name: player.name,
    email: player.email,
    phone: player.phone || '',
    total_orders: player.total_orders,
    total_spent: `$${player.total_spent.toFixed(2)}`,
    lifetime_value: `$${player.lifetime_value.toFixed(2)}`,
    average_order_value: `$${player.average_order_value.toFixed(2)}`,
    last_order_date: player.last_order_date ? new Date(player.last_order_date).toLocaleDateString() : 'Never',
    average_days_between_restrings: player.average_days_between_restrings || 'N/A',
    preferred_string: player.preferred_string_type || '',
    preferred_tension: player.preferred_tension || '',
    play_frequency: player.play_frequency || '',
    churn_risk: `${(player.churn_risk_score * 100).toFixed(0)}%`,
    tags: player.tags?.join('; ') || '',
  }))

  exportToCSV(data, 'players', [
    'Name',
    'Email',
    'Phone',
    'Total Orders',
    'Total Spent',
    'Lifetime Value',
    'Average Order Value',
    'Last Order Date',
    'Average Days Between Restrings',
    'Preferred String',
    'Preferred Tension',
    'Play Frequency',
    'Churn Risk',
    'Tags',
  ])
}
