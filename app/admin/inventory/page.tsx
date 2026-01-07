'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, RefreshCw, Plus, AlertTriangle, TrendingUp, DollarSign, Download } from 'lucide-react'
import type { InventoryItem, InventoryUsageSummary } from '@/lib/types/operations'
import RestockModal from '@/components/admin/RestockModal'
import { exportInventory } from '@/lib/utils/export'

export default function InventoryPage() {
  const [items, setItems] = useState<(InventoryItem & { usage_count_30d?: number; total_used_30d?: number })[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null)
  const [restockModalOpen, setRestockModalOpen] = useState(false)

  const fetchInventory = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/inventory')
      const data = await response.json()
      setItems(data.items || [])
    } catch (error) {
      console.error('Error fetching inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventory()
  }, [])

  const lowStockItems = items.filter(item => item.quantity_in_stock <= item.reorder_point)
  const totalValue = items.reduce((sum, item) => sum + (item.quantity_in_stock * item.cost_per_unit), 0)

  const openRestockModal = (item: InventoryItem) => {
    setSelectedItem(item)
    setRestockModalOpen(true)
  }

  const handleRestock = async (itemId: string, quantity: number, cost: number, notes: string) => {
    try {
      const response = await fetch('/api/inventory/restock', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity, cost, notes }),
      })

      if (response.ok) {
        // Refresh inventory
        await fetchInventory()
      }
    } catch (error) {
      console.error('Restock error:', error)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <RefreshCw className="w-12 h-12 animate-spin text-racket-red" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-1">{items.length} items • ${totalValue.toFixed(2)} total value</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchInventory}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => exportInventory(items)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-racket-red text-white rounded-lg hover:bg-red-600 transition-colors">
              <Plus className="w-4 h-4" />
              Add Item
            </button>
          </div>
        </div>

        {/* Alerts */}
        {lowStockItems.length > 0 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-bold text-orange-900 mb-2">
                  {lowStockItems.length} Item{lowStockItems.length !== 1 ? 's' : ''} Need Reordering
                </h3>
                <div className="space-y-1">
                  {lowStockItems.map(item => (
                    <div key={item.id} className="text-sm text-orange-800">
                      • {item.brand} {item.name} - Only {item.quantity_in_stock} left (reorder at {item.reorder_point})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Items</span>
              <Package className="w-5 h-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{items.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Low Stock Items</span>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-orange-600">{lowStockItems.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Value</span>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">${totalValue.toFixed(2)}</div>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => {
            const isLowStock = item.quantity_in_stock <= item.reorder_point
            const isCritical = item.quantity_in_stock <= 3
            const stockPercentage = Math.min(100, (item.quantity_in_stock / (item.reorder_point * 2)) * 100)

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-xl shadow-sm p-6 border-2 ${
                  isCritical ? 'border-red-300' : isLowStock ? 'border-orange-300' : 'border-gray-100'
                }`}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{item.brand}</div>
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <div className="text-xs text-gray-500 mt-1">SKU: {item.sku}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    item.type === 'string' ? 'bg-blue-100 text-blue-800' :
                    item.type === 'grip' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {item.type}
                  </span>
                </div>

                {/* Stock Level */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">Stock Level</span>
                    <span className={`text-2xl font-bold ${
                      isCritical ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-green-600'
                    }`}>
                      {item.quantity_in_stock}
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        isCritical ? 'bg-red-500' : isLowStock ? 'bg-orange-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${stockPercentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Reorder at {item.reorder_point} units
                  </div>
                </div>

                {/* Usage Stats */}
                {item.usage_count_30d !== undefined && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      Last 30 Days
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {item.total_used_30d || 0} units used
                    </div>
                  </div>
                )}

                {/* Pricing */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Cost</div>
                    <div className="font-medium text-gray-900">${item.cost_per_unit.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 mb-1">Price</div>
                    <div className="font-medium text-gray-900">${item.price_per_unit.toFixed(2)}</div>
                  </div>
                </div>

                {/* Actions */}
                <button
                  onClick={() => openRestockModal(item)}
                  className="w-full py-2 bg-racket-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Restock
                </button>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Restock Modal */}
      <RestockModal
        item={selectedItem}
        isOpen={restockModalOpen}
        onClose={() => {
          setRestockModalOpen(false)
          setSelectedItem(null)
        }}
        onRestock={handleRestock}
      />
    </main>
  )
}
