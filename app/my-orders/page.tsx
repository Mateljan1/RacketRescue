'use client'

import { useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, Search, ArrowRight, Star, Mail, RefreshCw } from 'lucide-react'
import Link from 'next/link'

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

const statusLabels: Record<string, { label: string; color: string; icon: typeof Clock }> = {
  pending: { label: 'Order Received', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  picked_up: { label: 'Picked Up', color: 'bg-blue-100 text-blue-800', icon: Package },
  in_progress: { label: 'Being Strung', color: 'bg-purple-100 text-purple-800', icon: Package },
  quality_check: { label: 'Quality Check', color: 'bg-indigo-100 text-indigo-800', icon: CheckCircle },
  ready: { label: 'Ready!', color: 'bg-green-100 text-green-800', icon: Star },
  out_for_delivery: { label: 'On The Way', color: 'bg-blue-100 text-blue-800', icon: Package },
  delivered: { label: 'Delivered', color: 'bg-gray-100 text-gray-800', icon: CheckCircle },
}

function MyOrdersContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const emailParam = searchParams.get('email')

  const [email, setEmail] = useState(emailParam || '')
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!email) return

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/orders?email=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setOrders([])
      } else {
        setOrders(data.orders || [])
        // Update URL with email for easy sharing/bookmarking
        router.push(`/my-orders?email=${encodeURIComponent(email)}`, { scroll: false })
      }
    } catch (err) {
      setError('Failed to fetch orders')
      setOrders([])
    } finally {
      setLoading(false)
      setSearched(true)
    }
  }

  // Auto-fetch if email in URL
  useState(() => {
    if (emailParam) {
      fetchOrders()
    }
  })

  return (
    <main className="min-h-screen bg-racket-lightgray pt-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-racket-black to-racket-charcoal text-white py-16">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">My Orders</h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Track all your stringing orders in one place
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-racket py-12 max-w-4xl">
        {/* Email Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl p-6 mb-8"
        >
          <form onSubmit={fetchOrders} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none text-lg"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 bg-racket-red text-white px-8 py-3 rounded-xl font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
              {loading ? 'Searching...' : 'Find Orders'}
            </button>
          </form>
        </motion.div>

        {/* Results */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error ? (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center">
                {error}
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-racket-black mb-2">No Orders Found</h2>
                <p className="text-racket-gray mb-6">
                  We couldn&apos;t find any orders for <strong>{email}</strong>
                </p>
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 bg-racket-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition-colors"
                >
                  Schedule Your First Service
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-racket-black">
                    {orders.length} Order{orders.length !== 1 ? 's' : ''} Found
                  </h2>
                  <button
                    onClick={() => fetchOrders()}
                    className="flex items-center gap-2 text-racket-gray hover:text-racket-red transition-colors text-sm"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>

                {orders.map((order, i) => {
                  const statusInfo = statusLabels[order.status] || statusLabels.pending
                  const StatusIcon = statusInfo.icon

                  return (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${statusInfo.color}`}>
                                <StatusIcon className="w-4 h-4" />
                                {statusInfo.label}
                              </span>
                              {order.is_express && (
                                <span className="px-2 py-1 bg-racket-red text-white text-xs rounded-full font-bold">
                                  EXPRESS
                                </span>
                              )}
                            </div>

                            <h3 className="text-xl font-bold text-racket-black mb-1">
                              {order.racket || 'Racket Stringing'}
                            </h3>

                            <div className="text-racket-gray text-sm space-y-1">
                              <p>String: {order.string_name || 'Customer Provided'}</p>
                              <p>
                                Ordered: {new Date(order.created_at).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-3">
                            <div className="text-2xl font-bold text-racket-black">
                              ${order.amount?.toFixed(2)}
                            </div>
                            <Link
                              href={`/track/${order.id}`}
                              className="flex items-center gap-2 bg-racket-black text-white px-4 py-2 rounded-lg font-semibold hover:bg-racket-charcoal transition-colors"
                            >
                              Track Order
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Quick Progress Bar */}
                      <div className="h-1 bg-gray-100">
                        <div
                          className={`h-full transition-all ${
                            order.status === 'delivered' ? 'bg-racket-green' : 'bg-racket-red'
                          }`}
                          style={{
                            width: `${
                              order.status === 'pending' ? 15 :
                              order.status === 'picked_up' ? 30 :
                              order.status === 'in_progress' ? 50 :
                              order.status === 'quality_check' ? 70 :
                              order.status === 'ready' ? 85 :
                              order.status === 'out_for_delivery' ? 95 :
                              100
                            }%`
                          }}
                        />
                      </div>
                    </motion.div>
                  )
                })}

                {/* Re-order CTA */}
                <div className="mt-8 text-center">
                  <Link
                    href="/schedule"
                    className="inline-flex items-center gap-2 bg-racket-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors shadow-lg hover:shadow-xl"
                  >
                    Schedule Another Service
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* First Visit State */}
        {!searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <div className="w-20 h-20 bg-racket-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-racket-red" />
            </div>
            <h2 className="text-2xl font-bold text-racket-black mb-2">Find Your Orders</h2>
            <p className="text-racket-gray max-w-md mx-auto">
              Enter the email address you used when placing your order to see all your stringing history.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  )
}

export default function MyOrdersPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-racket-lightgray pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-racket-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-racket-gray">Loading...</p>
        </div>
      </main>
    }>
      <MyOrdersContent />
    </Suspense>
  )
}
