'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, RefreshCw, ArrowRight, Search, Filter } from 'lucide-react'

interface Order {
  id: string
  status: string
  type: string
  customer_email: string
  customer_name: string
  racket: string
  string_name: string
  amount: number
  created_at: string
  is_express: boolean
}

const STATUS_OPTIONS = [
  { id: 'pending', label: 'Order Received', color: 'bg-yellow-100 text-yellow-800' },
  { id: 'picked_up', label: 'Picked Up', color: 'bg-blue-100 text-blue-800' },
  { id: 'in_progress', label: 'Stringing', color: 'bg-purple-100 text-purple-800' },
  { id: 'quality_check', label: 'QC', color: 'bg-indigo-100 text-indigo-800' },
  { id: 'ready', label: 'Ready', color: 'bg-green-100 text-green-800' },
  { id: 'out_for_delivery', label: 'Delivering', color: 'bg-blue-100 text-blue-800' },
  { id: 'delivered', label: 'Delivered', color: 'bg-gray-100 text-gray-800' },
]

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const fetchOrders = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/orders?limit=50')
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
  }, [])

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
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

  const filteredOrders = filter === 'all'
    ? orders
    : orders.filter(o => o.status === filter)

  const getStatusInfo = (status: string) =>
    STATUS_OPTIONS.find(s => s.id === status) || STATUS_OPTIONS[0]

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
            <p className="text-gray-600 mt-1">{orders.length} total orders</p>
          </div>
          <button
            onClick={fetchOrders}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filter === 'all' ? 'bg-racket-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {STATUS_OPTIONS.map(status => (
              <button
                key={status.id}
                onClick={() => setFilter(status.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filter === status.id ? 'bg-racket-red text-white' : `${status.color} hover:opacity-80`
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Order</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Customer</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Racket</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order, i) => {
                const statusInfo = getStatusInfo(order.status)
                const currentIndex = STATUS_OPTIONS.findIndex(s => s.id === order.status)
                const nextStatus = STATUS_OPTIONS[currentIndex + 1]

                return (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {order.is_express && (
                          <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded font-bold">
                            EXPRESS
                          </span>
                        )}
                        <div>
                          <div className="font-mono text-sm text-gray-500">
                            #{order.id.slice(-8)}
                          </div>
                          <div className="text-xs text-gray-400">
                            {new Date(order.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{order.customer_name}</div>
                      <div className="text-sm text-gray-500">{order.customer_email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{order.racket}</div>
                      <div className="text-sm text-gray-500">{order.string_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {nextStatus && order.status !== 'delivered' ? (
                        <button
                          onClick={() => updateStatus(order.id, nextStatus.id)}
                          disabled={updating === order.id}
                          className="flex items-center gap-2 px-3 py-1.5 bg-racket-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                          {updating === order.id ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <ArrowRight className="w-4 h-4" />
                              {nextStatus.label}
                            </>
                          )}
                        </button>
                      ) : (
                        <span className="text-green-600 font-medium flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          Complete
                        </span>
                      )}
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
