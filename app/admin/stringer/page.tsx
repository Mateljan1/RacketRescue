'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, Phone, MapPin, ArrowRight } from 'lucide-react'

interface Order {
  id: string
  status: string
  customer_name: string
  customer_phone?: string
  racket?: string
  racket_brand?: string
  racket_model?: string
  string_name: string
  main_tension?: number
  cross_tension?: number
  is_express: boolean
  pickup_address?: string
  special_instructions?: string
  created_at: string
}

const STATUS_OPTIONS = [
  { id: 'picked_up', label: 'Start Stringing', next: 'in_progress' },
  { id: 'in_progress', label: 'Quality Check', next: 'quality_check' },
  { id: 'quality_check', label: 'Mark Ready', next: 'ready' },
  { id: 'ready', label: 'Out for Delivery', next: 'out_for_delivery' },
]

export default function StringerPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    fetchTodayOrders()
    const interval = setInterval(fetchTodayOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchTodayOrders = async () => {
    try {
      const response = await fetch('/api/orders?limit=50')
      const data = await response.json()
      
      // Filter to today's orders that aren't delivered
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      
      const todayOrders = (data.orders || []).filter((o: Order) => {
        const orderDate = new Date(o.created_at)
        orderDate.setHours(0, 0, 0, 0)
        return orderDate.getTime() === today.getTime() && o.status !== 'delivered'
      })
      
      setOrders(todayOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (orderId: string, newStatus: string) => {
    setUpdating(orderId)
    try {
      const response = await fetch('/api/orders/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }),
      })

      if (response.ok) {
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

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <Clock className="w-12 h-12 animate-spin text-racket-red" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Today's Orders</h1>
          <p className="text-gray-600 mt-1">{orders.length} orders to complete</p>
        </div>

        <div className="space-y-4">
          {orders.map((order) => {
            const statusOption = STATUS_OPTIONS.find(s => s.id === order.status)
            const hoursAgo = Math.floor((Date.now() - new Date(order.created_at).getTime()) / (1000 * 60 * 60))

            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 border-2 border-gray-100"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-racket-red/10 rounded-full flex items-center justify-center">
                      <Package className="w-6 h-6 text-racket-red" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-gray-900">{order.customer_name}</div>
                      <div className="text-sm text-gray-500">{hoursAgo}h ago</div>
                    </div>
                  </div>
                  {order.is_express && (
                    <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full font-bold">
                      EXPRESS
                    </span>
                  )}
                </div>

                {/* Racket Details */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <div className="text-xs text-gray-500 uppercase mb-1">Racket</div>
                    <div className="font-medium text-gray-900">
                      {order.racket_brand} {order.racket_model || order.racket}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase mb-1">String</div>
                    <div className="font-medium text-gray-900">{order.string_name}</div>
                  </div>
                  {order.main_tension && (
                    <div className="col-span-2">
                      <div className="text-xs text-gray-500 uppercase mb-1">Tension</div>
                      <div className="text-2xl font-bold text-racket-red">
                        {order.main_tension}/{order.cross_tension || order.main_tension} lbs
                      </div>
                    </div>
                  )}
                </div>

                {/* Special Instructions */}
                {order.special_instructions && (
                  <div className="mb-4 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg">
                    <div className="text-xs font-bold text-yellow-900 uppercase mb-1">Special Instructions</div>
                    <div className="text-sm text-yellow-900">{order.special_instructions}</div>
                  </div>
                )}

                {/* Contact */}
                {order.customer_phone && (
                  <a
                    href={`tel:${order.customer_phone}`}
                    className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Phone className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-900 font-medium">{order.customer_phone}</span>
                  </a>
                )}

                {/* Action Button */}
                {statusOption && (
                  <button
                    onClick={() => updateStatus(order.id, statusOption.next)}
                    disabled={updating === order.id}
                    className="w-full flex items-center justify-center gap-3 py-4 bg-racket-red text-white rounded-xl text-lg font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                  >
                    {updating === order.id ? (
                      <Clock className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <ArrowRight className="w-6 h-6" />
                        {statusOption.label}
                      </>
                    )}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-16">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">All Done!</h2>
            <p className="text-gray-600">No orders to complete today</p>
          </div>
        )}
      </div>
    </main>
  )
}
