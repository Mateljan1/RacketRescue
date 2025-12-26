'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Mail, RefreshCw, Star } from 'lucide-react'
import { use } from 'react'
import Link from 'next/link'

interface OrderData {
  id: string
  status: string
  progress: number
  customer_name: string
  customer_email: string
  customer_phone: string
  racket_brand: string
  racket_model: string
  string_name: string
  main_tension: string
  cross_tension: string
  service_type: string
  is_express: boolean
  pickup_address: string
  pickup_time: string
  amount_total: number
  estimated_ready: string
  created_at: string
  status_history: Array<{
    status: string
    timestamp: string
    note: string
  }>
}

const statusSteps = [
  { id: 'pending', label: 'Order Received', icon: Clock, description: 'We\'ve received your order' },
  { id: 'picked_up', label: 'Racket Picked Up', icon: Truck, description: 'Your racket is on its way to us' },
  { id: 'in_progress', label: 'Being Strung', icon: Package, description: 'Our experts are stringing your racket' },
  { id: 'quality_check', label: 'Quality Check', icon: CheckCircle, description: 'Final inspection in progress' },
  { id: 'ready', label: 'Ready!', icon: Star, description: 'Your racket is ready for pickup/delivery' },
  { id: 'out_for_delivery', label: 'On The Way', icon: Truck, description: 'Your racket is being delivered' },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle, description: 'Enjoy your freshly strung racket!' },
]

export default function TrackOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  const fetchOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${id}`)
      const data = await response.json()

      if (data.error) {
        setError(data.error)
      } else {
        setOrder(data.order)
        setError(null)
      }
    } catch (err) {
      setError('Failed to load order')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchOrder()
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchOrder, 30000)
    return () => clearInterval(interval)
  }, [id])

  const handleRefresh = () => {
    setRefreshing(true)
    fetchOrder()
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-racket-lightgray pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-racket-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-racket-gray">Loading your order...</p>
        </div>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-racket-lightgray pt-24">
        <div className="container-racket text-center py-20">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-racket-black mb-4">Order Not Found</h1>
          <p className="text-racket-gray mb-8 max-w-md mx-auto">
            We couldn&apos;t find an order with this ID. Please check your confirmation email for the correct tracking link.
          </p>
          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 bg-racket-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition-colors"
          >
            Schedule New Service
          </Link>
        </div>
      </main>
    )
  }

  const currentStepIndex = statusSteps.findIndex(s => s.id === order.status)
  const currentStep = statusSteps[currentStepIndex] || statusSteps[0]

  return (
    <main className="min-h-screen bg-racket-lightgray pt-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-racket-black to-racket-charcoal text-white py-12">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">Track Your Order</h1>
              <p className="text-white/70 font-mono">#{id.slice(0, 20)}...</p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg transition-colors self-start"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              {refreshing ? 'Refreshing...' : 'Refresh Status'}
            </button>
          </motion.div>
        </div>
      </section>

      <div className="container-racket py-12 max-w-5xl">
        {/* Current Status Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-2xl p-6 mb-8 ${
            order.status === 'delivered'
              ? 'bg-racket-green text-white'
              : order.status === 'ready'
              ? 'bg-gradient-to-r from-racket-red to-red-500 text-white'
              : 'bg-white shadow-xl'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              order.status === 'delivered' || order.status === 'ready'
                ? 'bg-white/20'
                : 'bg-racket-red/10'
            }`}>
              <currentStep.icon className={`w-8 h-8 ${
                order.status === 'delivered' || order.status === 'ready'
                  ? 'text-white'
                  : 'text-racket-red'
              }`} />
            </div>
            <div className="flex-1">
              <div className={`text-sm ${
                order.status === 'delivered' || order.status === 'ready'
                  ? 'text-white/80'
                  : 'text-racket-gray'
              }`}>
                Current Status
              </div>
              <div className="text-2xl font-bold">{currentStep.label}</div>
              <div className={`text-sm ${
                order.status === 'delivered' || order.status === 'ready'
                  ? 'text-white/80'
                  : 'text-racket-gray'
              }`}>
                {currentStep.description}
              </div>
            </div>
            <div className="text-right">
              <div className={`text-4xl font-bold ${
                order.status === 'delivered' || order.status === 'ready'
                  ? 'text-white'
                  : 'text-racket-red'
              }`}>
                {order.progress}%
              </div>
              <div className={`text-sm ${
                order.status === 'delivered' || order.status === 'ready'
                  ? 'text-white/80'
                  : 'text-racket-gray'
              }`}>
                Complete
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className={`w-full h-3 rounded-full overflow-hidden ${
              order.status === 'delivered' || order.status === 'ready'
                ? 'bg-white/20'
                : 'bg-gray-200'
            }`}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${order.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-full rounded-full ${
                  order.status === 'delivered' || order.status === 'ready'
                    ? 'bg-white'
                    : 'bg-racket-red'
                }`}
              />
            </div>
          </div>
        </motion.div>

        {/* Status Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-racket-black mb-8">Order Progress</h2>

          <div className="relative">
            {statusSteps.map((step, i) => {
              const StepIcon = step.icon
              const isComplete = i <= currentStepIndex
              const isCurrent = i === currentStepIndex

              // Find history entry for this step
              const historyEntry = order.status_history?.find(h => h.status === step.id)

              return (
                <div key={step.id} className="relative">
                  <div className="flex items-start gap-6 mb-6">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1, type: "spring", stiffness: 200 }}
                      className={`relative z-10 w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                        isComplete
                          ? 'bg-racket-green text-white shadow-lg'
                          : 'bg-gray-100 text-gray-400'
                      } ${isCurrent ? 'ring-4 ring-racket-red/30 scale-110' : ''}`}
                    >
                      <StepIcon className="w-7 h-7" />
                    </motion.div>

                    <div className="flex-1 pt-2">
                      <div className={`text-lg font-bold ${isComplete ? 'text-racket-black' : 'text-gray-400'}`}>
                        {step.label}
                      </div>
                      <div className={`text-sm ${isComplete ? 'text-racket-gray' : 'text-gray-400'}`}>
                        {step.description}
                      </div>
                      {historyEntry && (
                        <div className="mt-1 text-xs text-racket-gray">
                          {new Date(historyEntry.timestamp).toLocaleString()}
                          {historyEntry.note && ` • ${historyEntry.note}`}
                        </div>
                      )}
                      {isCurrent && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="mt-2 inline-flex items-center gap-2 px-3 py-1 bg-racket-red/10 text-racket-red text-sm font-semibold rounded-full"
                        >
                          <div className="w-2 h-2 bg-racket-red rounded-full animate-pulse" />
                          Current Step
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Connecting line */}
                  {i < statusSteps.length - 1 && (
                    <div className="absolute left-7 top-14 w-0.5 h-10 bg-gray-200 -z-0">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: isComplete ? 1 : 0 }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                        style={{ transformOrigin: 'top' }}
                        className="w-full h-full bg-racket-green"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-racket-black mb-6">Order Details</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Racket</div>
                <div className="text-lg font-bold text-racket-black">
                  {order.racket_brand} {order.racket_model}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">String</div>
                <div className="text-lg font-bold text-racket-black">
                  {order.string_name || 'Customer Provided'}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Tension</div>
                <div className="text-lg font-bold text-racket-black">
                  Mains: {order.main_tension} lbs / Crosses: {order.cross_tension} lbs
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Service</div>
                <div className="text-lg font-bold text-racket-black flex items-center gap-2">
                  {order.service_type}
                  {order.is_express && (
                    <span className="px-2 py-1 bg-racket-red text-white text-xs rounded-full font-bold">
                      EXPRESS
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-racket-green/10 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Estimated Ready</div>
                <div className="text-lg font-bold text-racket-green flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {order.estimated_ready
                    ? new Date(order.estimated_ready).toLocaleString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })
                    : 'Calculating...'}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Total Paid</div>
                <div className="text-lg font-bold text-racket-black">
                  ${order.amount_total?.toFixed(2)}
                </div>
              </div>
            </div>
          </div>

          {/* Pickup Location */}
          {order.pickup_address && (
            <div className="mt-6 p-4 bg-racket-blue/10 rounded-xl">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-racket-blue mt-0.5" />
                <div>
                  <div className="text-sm text-racket-gray mb-1">Pickup/Delivery Location</div>
                  <div className="font-semibold text-racket-black">{order.pickup_address}</div>
                  {order.pickup_time && (
                    <div className="text-sm text-racket-gray mt-1">{order.pickup_time}</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <p className="text-racket-gray mb-4">Questions about your order?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+19494646645"
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow font-semibold text-racket-black"
            >
              <Phone className="w-5 h-5 text-racket-red" />
              (949) 464-6645
            </a>
            <a
              href="mailto:info@racketrescue.com"
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow font-semibold text-racket-black"
            >
              <Mail className="w-5 h-5 text-racket-blue" />
              info@racketrescue.com
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
