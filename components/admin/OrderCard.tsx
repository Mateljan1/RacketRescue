'use client'

import { motion } from 'framer-motion'
import { Package, Clock, Phone, Mail, MapPin, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'

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
  main_tension?: number
  cross_tension?: number
  amount: number
  created_at: string
  is_express: boolean
  pickup_address?: string
  pickup_time?: string
  special_instructions?: string
}

interface OrderCardProps {
  order: Order
  onStatusUpdate: (orderId: string, newStatus: string) => Promise<void>
  onViewDetails: (order: Order) => void
  updating: boolean
}

const STATUS_OPTIONS = [
  { id: 'pending', label: 'Order Received', color: 'bg-yellow-100 text-yellow-800', icon: Package },
  { id: 'picked_up', label: 'Picked Up', color: 'bg-blue-100 text-blue-800', icon: Package },
  { id: 'in_progress', label: 'Stringing', color: 'bg-purple-100 text-purple-800', icon: Clock },
  { id: 'quality_check', label: 'QC', color: 'bg-indigo-100 text-indigo-800', icon: CheckCircle },
  { id: 'ready', label: 'Ready', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  { id: 'out_for_delivery', label: 'Delivering', color: 'bg-blue-100 text-blue-800', icon: Package },
  { id: 'delivered', label: 'Delivered', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
]

export default function OrderCard({ order, onStatusUpdate, onViewDetails, updating }: OrderCardProps) {
  const statusInfo = STATUS_OPTIONS.find(s => s.id === order.status) || STATUS_OPTIONS[0]
  const currentIndex = STATUS_OPTIONS.findIndex(s => s.id === order.status)
  const nextStatus = STATUS_OPTIONS[currentIndex + 1]
  const StatusIcon = statusInfo.icon

  // Calculate time since order
  const hoursSinceOrder = Math.floor((Date.now() - new Date(order.created_at).getTime()) / (1000 * 60 * 60))
  const isOverdue = hoursSinceOrder > 48 && order.status !== 'delivered'

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-lg ${statusInfo.color}`}>
            <StatusIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-medium text-gray-900">
                #{order.id.slice(-8)}
              </span>
              {order.is_express && (
                <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                  EXPRESS
                </span>
              )}
              {isOverdue && (
                <span className="px-2 py-0.5 bg-orange-500 text-white text-xs rounded-full font-bold flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  OVERDUE
                </span>
              )}
            </div>
            <div className="text-sm text-gray-500 mt-0.5">
              {new Date(order.created_at).toLocaleString()} ({hoursSinceOrder}h ago)
            </div>
          </div>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      {/* Customer Info */}
      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Customer</div>
          <div className="font-medium text-gray-900">{order.customer_name}</div>
          <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
            <Mail className="w-3 h-3" />
            <a href={`mailto:${order.customer_email}`} className="hover:text-racket-red">
              {order.customer_email}
            </a>
          </div>
          {order.customer_phone && (
            <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
              <Phone className="w-3 h-3" />
              <a href={`tel:${order.customer_phone}`} className="hover:text-racket-red">
                {order.customer_phone}
              </a>
            </div>
          )}
        </div>

        <div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">Racket Details</div>
          <div className="font-medium text-gray-900">
            {order.racket_brand} {order.racket_model || order.racket}
          </div>
          <div className="text-sm text-gray-600 mt-1">
            String: {order.string_name}
          </div>
          {order.main_tension && (
            <div className="text-sm text-gray-600">
              Tension: {order.main_tension}/{order.cross_tension || order.main_tension} lbs
            </div>
          )}
        </div>
      </div>

      {/* Pickup Info */}
      {order.pickup_address && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
            <div className="flex-1">
              <div className="text-sm text-gray-600">{order.pickup_address}</div>
              {order.pickup_time && (
                <div className="text-xs text-gray-500 mt-1">
                  Pickup: {new Date(order.pickup_time).toLocaleString()}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Special Instructions */}
      {order.special_instructions && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-xs text-yellow-800 font-medium uppercase tracking-wide mb-1">
            Special Instructions
          </div>
          <div className="text-sm text-yellow-900">{order.special_instructions}</div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="text-lg font-bold text-gray-900">
          ${(order.amount / 100).toFixed(2)}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(order)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Details
          </button>
          {nextStatus && order.status !== 'delivered' && (
            <button
              onClick={() => onStatusUpdate(order.id, nextStatus.id)}
              disabled={updating}
              className="flex items-center gap-2 px-4 py-2 bg-racket-red text-white rounded-lg text-sm font-medium hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {updating ? (
                <Clock className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ArrowRight className="w-4 h-4" />
                  {nextStatus.label}
                </>
              )}
            </button>
          )}
          {order.status === 'delivered' && (
            <span className="text-green-600 font-medium flex items-center gap-1 px-4 py-2">
              <CheckCircle className="w-4 h-4" />
              Complete
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

