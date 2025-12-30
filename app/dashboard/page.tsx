'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, Truck, RefreshCw, Crown, ArrowRight, Plus, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface Order {
  id: string
  status: string
  service_package: string
  racket_brand: string
  racket_model: string
  string_name: string
  is_express: boolean
  total_cents: number
  created_at: string
  pickup_date?: string
  pickup_time?: string
}

interface DashboardData {
  orders: Order[]
  membership: { tier: string; status: string } | null
  user: { name: string; email: string }
  stats: {
    totalOrders: number
    totalSaved: number
    memberSince: string | null
  }
}

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string; label: string }> = {
  pending: { icon: Clock, color: 'text-racket-orange', bg: 'bg-racket-orange/10', label: 'Pending Pickup' },
  picked_up: { icon: Truck, color: 'text-racket-blue', bg: 'bg-racket-blue/10', label: 'Picked Up' },
  stringing: { icon: Package, color: 'text-racket-blue', bg: 'bg-racket-blue/10', label: 'Being Strung' },
  quality_check: { icon: CheckCircle, color: 'text-racket-green', bg: 'bg-racket-green/10', label: 'Quality Check' },
  ready_for_pickup: { icon: CheckCircle, color: 'text-racket-green', bg: 'bg-racket-green/10', label: 'Ready for Pickup' },
  out_for_delivery: { icon: Truck, color: 'text-racket-orange', bg: 'bg-racket-orange/10', label: 'Out for Delivery' },
  delivered: { icon: CheckCircle, color: 'text-racket-green', bg: 'bg-racket-green/10', label: 'Delivered' },
}

function LoadingSpinner() {
  return (
    <main className="min-h-screen bg-racket-lightgray pt-24 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-racket-red mx-auto mb-4" />
        <p className="text-racket-gray">Loading your dashboard...</p>
      </div>
    </main>
  )
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
      return
    }

    if (status === 'authenticated') {
      fetch('/api/user/orders')
        .then(res => {
          if (!res.ok) throw new Error('Failed to fetch data')
          return res.json()
        })
        .then(setData)
        .catch(err => setError(err.message))
        .finally(() => setLoading(false))
    }
  }, [status, router])

  if (status === 'loading' || loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <main className="min-h-screen bg-racket-lightgray pt-24 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">Error loading dashboard: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="text-racket-red hover:underline"
          >
            Try again
          </button>
        </div>
      </main>
    )
  }

  const userName = data?.user?.name || session?.user?.name || 'there'
  const orders = data?.orders || []
  const membership = data?.membership
  const stats = data?.stats || { totalOrders: 0, totalSaved: 0, memberSince: null }

  return (
    <main className="min-h-screen bg-racket-lightgray pt-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-racket-black to-racket-charcoal text-white py-16">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-4">Welcome Back, {userName.split(' ')[0]}!</h1>
            <p className="text-2xl text-white/80">Manage your orders and membership</p>
          </motion.div>
        </div>
      </section>

      <div className="container-racket py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-racket-black mb-6">Quick Actions</h2>

              <div className="grid md:grid-cols-2 gap-4">
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/schedule"
                    className="flex items-center gap-4 p-6 bg-gradient-to-r from-racket-red to-red-600 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all"
                  >
                    <Plus className="w-8 h-8" />
                    <div className="text-left">
                      <div className="font-bold text-lg">New Order</div>
                      <div className="text-white/80 text-sm">Schedule service</div>
                    </div>
                    <ArrowRight className="w-6 h-6 ml-auto" />
                  </Link>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-6 bg-gray-100 hover:bg-gray-200 rounded-2xl transition-colors text-left"
                  onClick={() => {
                    // TODO: Implement reorder last order
                    router.push('/schedule')
                  }}
                >
                  <RefreshCw className="w-8 h-8 text-racket-gray" />
                  <div>
                    <div className="font-bold text-lg text-racket-black">Reorder</div>
                    <div className="text-racket-gray text-sm">Repeat last order</div>
                  </div>
                  <ArrowRight className="w-6 h-6 ml-auto text-racket-gray" />
                </motion.button>
              </div>
            </motion.div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-racket-black">Recent Orders</h2>
                <Link href="/my-orders" className="text-racket-red font-semibold hover:underline">
                  View All
                </Link>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-racket-gray text-lg mb-4">No orders yet</p>
                  <Link
                    href="/schedule"
                    className="inline-flex items-center gap-2 text-racket-red font-semibold hover:underline"
                  >
                    Schedule your first stringing <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order, i) => {
                    const status = statusConfig[order.status] || statusConfig.pending
                    const StatusIcon = status.icon

                    return (
                      <motion.div
                        key={order.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        whileHover={{ x: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
                        className="p-6 bg-gray-50 rounded-2xl border-2 border-gray-100 hover:border-racket-red/30 transition-all cursor-pointer"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <span className={`inline-flex items-center gap-2 ${status.bg} ${status.color} px-3 py-1.5 rounded-full text-sm font-bold`}>
                                <StatusIcon className="w-4 h-4" />
                                {status.label}
                              </span>
                              {order.is_express && (
                                <span className="bg-racket-orange/10 text-racket-orange px-2 py-1 rounded-full text-xs font-bold">
                                  EXPRESS
                                </span>
                              )}
                            </div>
                            <h3 className="text-xl font-bold text-racket-black mb-1">
                              {order.racket_brand} {order.racket_model}
                            </h3>
                            <p className="text-racket-gray">{order.string_name || order.service_package}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-racket-red">
                              ${((order.total_cents || 0) / 100).toFixed(0)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-racket-gray">
                          <span>Order Date: {new Date(order.created_at).toLocaleDateString()}</span>
                          {order.pickup_time && (
                            <span>Pickup: {order.pickup_time}</span>
                          )}
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Membership Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`rounded-3xl shadow-2xl p-8 ${
                membership
                  ? 'bg-gradient-to-br from-racket-red to-red-600 text-white'
                  : 'bg-white border-2 border-dashed border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <Crown className={`w-8 h-8 ${membership ? '' : 'text-racket-gray'}`} />
                <h3 className={`text-2xl font-bold ${membership ? '' : 'text-racket-black'}`}>
                  {membership ? 'Your Membership' : 'Become a Member'}
                </h3>
              </div>

              {membership ? (
                <div className="space-y-4">
                  <div>
                    <div className="text-4xl font-bold mb-2 capitalize">{membership.tier}</div>
                    <div className="text-white/80">Status: {membership.status}</div>
                  </div>

                  {stats.totalSaved > 0 && (
                    <div className="pt-4 border-t border-white/20">
                      <div className="text-sm text-white/70 mb-2">Total saved with membership:</div>
                      <div className="text-3xl font-bold text-white">${stats.totalSaved}</div>
                    </div>
                  )}

                  {membership.tier !== 'elite' && (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                      <Link
                        href="/membership"
                        className="block w-full bg-white text-racket-red py-3 rounded-full font-bold hover:bg-gray-100 transition-colors text-center"
                      >
                        Upgrade to Elite
                      </Link>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-racket-gray">
                    Save 10-20% on every order with free pickup & delivery!
                  </p>
                  <ul className="text-sm text-racket-gray space-y-2">
                    <li>✓ Free pickup & delivery</li>
                    <li>✓ 10-20% off all services</li>
                    <li>✓ Priority scheduling</li>
                  </ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      href="/membership"
                      className="block w-full bg-racket-red text-white py-3 rounded-full font-bold hover:bg-red-600 transition-colors text-center"
                    >
                      View Plans
                    </Link>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-racket-black mb-6">Your Stats</h3>

              <div className="space-y-6">
                <div>
                  <div className="text-sm text-racket-gray mb-2">Total Orders</div>
                  <div className="text-4xl font-bold text-racket-red">{stats.totalOrders}</div>
                </div>
                {stats.totalSaved > 0 && (
                  <div>
                    <div className="text-sm text-racket-gray mb-2">Total Saved</div>
                    <div className="text-4xl font-bold text-racket-green">${stats.totalSaved}</div>
                  </div>
                )}
                {stats.memberSince && (
                  <div>
                    <div className="text-sm text-racket-gray mb-2">Member Since</div>
                    <div className="text-xl font-bold text-racket-black">{stats.memberSince}</div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
