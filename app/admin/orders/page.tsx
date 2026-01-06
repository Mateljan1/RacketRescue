'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, RefreshCw, Search, Filter, Download, Calendar } from 'lucide-react'
import OrderCard from '@/components/admin/OrderCard'
import OrderDetailsModal from '@/components/admin/OrderDetailsModal'
import { exportOrders } from '@/lib/utils/export'

interface Order {
  id: string
  status: string
  type: string
  customer_email: string
  customer_name: string
  customer_phone?: string
  racket_brand?: string
  racket_model?: string
  racket?: string
  string_name: string
  string_type?: string
  main_tension?: number
  cross_tension?: number
  amount: number
  created_at: string
  is_express: boolean
  pickup_address?: string
  delivery_address?: string
  pickup_time?: string
  special_instructions?: string
  add_regrip?: boolean
  add_overgrip?: boolean
  add_dampener?: boolean
}

const STATUS_OPTIONS = [
  { id: 'all', label: 'All Orders', count: 0 },
  { id: 'pending', label: 'Pending', count: 0 },
  { id: 'picked_up', label: 'Picked Up', count: 0 },
  { id: 'in_progress', label: 'In Progress', count: 0 },
  { id: 'quality_check', label: 'QC', count: 0 },
  { id: 'ready', label: 'Ready', count: 0 },
  { id: 'out_for_delivery', label: 'Delivering', count: 0 },
  { id: 'delivered', label: 'Delivered', count: 0 },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [dateFilter, setDateFilter] = useState<'today' | 'week' | 'month' | 'all'>('week')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/orders?limit=100')
      const data = await response.json()
      setOrders(data.orders || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    try {
      const response = await fetch(`/api/orders/update-status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      })

      if (response.ok) {
        // Update local state
        setOrders(orders.map(o =>
          o.id === orderId ? { ...o, status: newStatus } : o
        ))
      }
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setUpdating(null)
    }
  }

  const openDetails = (order: Order) => {
    setSelectedOrder(order)
    setModalOpen(true)
  }

  // Filter orders by status, search, and date
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (filter !== 'all' && order.status !== filter) return false

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      const matchesSearch = 
        order.customer_name.toLowerCase().includes(query) ||
        order.customer_email.toLowerCase().includes(query) ||
        order.id.toLowerCase().includes(query) ||
        (order.racket_brand || order.racket || '').toLowerCase().includes(query)
      if (!matchesSearch) return false
    }

    // Date filter
    const orderDate = new Date(order.created_at)
    const now = new Date()
    if (dateFilter === 'today') {
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
      if (orderDate < today) return false
    } else if (dateFilter === 'week') {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      if (orderDate < weekAgo) return false
    } else if (dateFilter === 'month') {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
      if (orderDate < monthAgo) return false
    }

    return true
  })

  // Calculate status counts
  const statusCounts = STATUS_OPTIONS.map(status => ({
    ...status,
    count: status.id === 'all' 
      ? orders.length 
      : orders.filter(o => o.status === status.id).length
  }))

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4 text-racket-red" />
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
            <p className="text-gray-600 mt-1">{filteredOrders.length} orders</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchOrders}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button
              onClick={() => exportOrders(filteredOrders)}
              className="flex items-center gap-2 px-4 py-2 bg-racket-black text-white rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Search & Date Filter */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by customer, order ID, or racket..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-racket-red/20 focus:border-racket-red"
              />
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value as any)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-racket-red/20 focus:border-racket-red"
              >
                <option value="today">Today</option>
                <option value="week">Last 7 Days</option>
                <option value="month">Last 30 Days</option>
                <option value="all">All Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            {statusCounts.map(status => (
              <button
                key={status.id}
                onClick={() => setFilter(status.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === status.id 
                    ? 'bg-racket-red text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.label}
                <span className="ml-2 opacity-70">({status.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid gap-6">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onStatusUpdate={updateStatus}
              onViewDetails={openDetails}
              updating={updating === order.id}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery ? 'Try adjusting your search or filters' : 'No orders match the selected filters'}
            </p>
            {(searchQuery || filter !== 'all' || dateFilter !== 'week') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setFilter('all')
                  setDateFilter('week')
                }}
                className="px-6 py-2 bg-racket-red text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </motion.div>
        )}
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setSelectedOrder(null)
        }}
      />
    </main>
  )
}
