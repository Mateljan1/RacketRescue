'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Package, User, Phone, Mail, MapPin, Calendar, DollarSign, FileText, Clock, Camera } from 'lucide-react'
import PhotoUpload from './PhotoUpload'

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

interface OrderDetailsModalProps {
  order: Order | null
  isOpen: boolean
  onClose: () => void
}

const STATUS_TIMELINE = [
  { id: 'pending', label: 'Order Received' },
  { id: 'picked_up', label: 'Picked Up' },
  { id: 'in_progress', label: 'Stringing' },
  { id: 'quality_check', label: 'Quality Check' },
  { id: 'ready', label: 'Ready' },
  { id: 'out_for_delivery', label: 'Out for Delivery' },
  { id: 'delivered', label: 'Delivered' },
]

export default function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  const [beforePhotos, setBeforePhotos] = useState<string[]>([])
  const [afterPhotos, setAfterPhotos] = useState<string[]>([])

  if (!order) return null

  const currentStatusIndex = STATUS_TIMELINE.findIndex(s => s.id === order.status)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <p className="text-sm text-gray-500 mt-1">#{order.id}</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-400" />
                </button>
              </div>

              {/* Content */}
              <div className="p-8 space-y-8">
                {/* Status Timeline */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Status Timeline</h3>
                  <div className="flex items-center gap-2">
                    {STATUS_TIMELINE.map((status, index) => (
                      <div key={status.id} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
                            index <= currentStatusIndex
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            {index + 1}
                          </div>
                          <div className={`text-xs mt-2 text-center ${
                            index <= currentStatusIndex ? 'text-gray-900 font-medium' : 'text-gray-400'
                          }`}>
                            {status.label}
                          </div>
                        </div>
                        {index < STATUS_TIMELINE.length - 1 && (
                          <div className={`h-1 flex-1 ${
                            index < currentStatusIndex ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Name</div>
                      <div className="font-medium text-gray-900">{order.customer_name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Email</div>
                      <a href={`mailto:${order.customer_email}`} className="font-medium text-racket-red hover:underline">
                        {order.customer_email}
                      </a>
                    </div>
                    {order.customer_phone && (
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Phone</div>
                        <a href={`tel:${order.customer_phone}`} className="font-medium text-racket-red hover:underline">
                          {order.customer_phone}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Racket Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Racket & String Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Racket</div>
                      <div className="font-medium text-gray-900">
                        {order.racket_brand} {order.racket_model || order.racket}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">String</div>
                      <div className="font-medium text-gray-900">{order.string_name}</div>
                      {order.string_type && (
                        <div className="text-xs text-gray-500 mt-0.5">{order.string_type}</div>
                      )}
                    </div>
                    {order.main_tension && (
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Tension</div>
                        <div className="font-medium text-gray-900">
                          {order.main_tension}/{order.cross_tension || order.main_tension} lbs
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Service Type</div>
                      <div className="font-medium text-gray-900">
                        {order.is_express ? 'Same-Day Rush' : 'Standard 24-Hour'}
                      </div>
                    </div>
                  </div>

                  {/* Add-ons */}
                  {(order.add_regrip || order.add_overgrip || order.add_dampener) && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                      <div className="text-sm font-medium text-blue-900 mb-2">Add-ons:</div>
                      <div className="flex flex-wrap gap-2">
                        {order.add_regrip && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Regrip
                          </span>
                        )}
                        {order.add_overgrip && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Overgrip
                          </span>
                        )}
                        {order.add_dampener && (
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            Dampener
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Pickup & Delivery */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Pickup & Delivery
                  </h3>
                  <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                    {order.pickup_address && (
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Pickup Address</div>
                        <div className="font-medium text-gray-900">{order.pickup_address}</div>
                      </div>
                    )}
                    {order.pickup_time && (
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Pickup Time</div>
                        <div className="font-medium text-gray-900">
                          {new Date(order.pickup_time).toLocaleString()}
                        </div>
                      </div>
                    )}
                    {order.delivery_address && order.delivery_address !== order.pickup_address && (
                      <div>
                        <div className="text-sm text-gray-500 mb-1">Delivery Address</div>
                        <div className="font-medium text-gray-900">{order.delivery_address}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Special Instructions */}
                {order.special_instructions && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Special Instructions
                    </h3>
                    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                      <p className="text-gray-900">{order.special_instructions}</p>
                    </div>
                  </div>
                )}

                {/* Payment Info */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Payment Information
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="text-2xl font-bold text-gray-900">
                        ${(order.amount / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-green-600 font-medium">
                      ✓ Payment Confirmed
                    </div>
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Work Photos
                  </h3>
                  <div className="space-y-6">
                    <PhotoUpload
                      orderId={order.id}
                      photoType="before"
                      existingPhotos={beforePhotos}
                      onUploadComplete={(url) => setBeforePhotos([...beforePhotos, url])}
                    />
                    <PhotoUpload
                      orderId={order.id}
                      photoType="after"
                      existingPhotos={afterPhotos}
                      onUploadComplete={(url) => setAfterPhotos([...afterPhotos, url])}
                    />
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-8 py-4 flex items-center justify-between">
                <button
                  onClick={onClose}
                  className="px-6 py-2 text-gray-700 font-medium hover:text-gray-900 transition-colors"
                >
                  Close
                </button>
                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${order.customer_email}`}
                    className="px-6 py-2 bg-gray-200 text-gray-900 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                  >
                    Email Customer
                  </a>
                  {order.customer_phone && (
                    <a
                      href={`tel:${order.customer_phone}`}
                      className="px-6 py-2 bg-racket-red text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
                    >
                      Call Customer
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

