'use client'

import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, Truck, RefreshCw, Crown, ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const mockOrders = [
  {
    id: '1',
    status: 'in_progress',
    service: 'Pro-Performance',
    racket: 'Wilson Pro Staff 97',
    pickup_date: '2025-12-25',
    estimated_delivery: '2025-12-27',
    total: 68,
  },
  {
    id: '2',
    status: 'delivered',
    service: 'Match-Ready',
    racket: 'Babolat Pure Aero',
    pickup_date: '2025-12-20',
    delivered_date: '2025-12-23',
    total: 53,
  },
]

const statusConfig = {
  pending: { icon: Clock, color: 'text-racket-orange', bg: 'bg-racket-orange/10', label: 'Pending Pickup' },
  picked_up: { icon: Truck, color: 'text-racket-blue', bg: 'bg-racket-blue/10', label: 'In Progress' },
  in_progress: { icon: Package, color: 'text-racket-blue', bg: 'bg-racket-blue/10', label: 'Being Strung' },
  out_for_delivery: { icon: Truck, color: 'text-racket-orange', bg: 'bg-racket-orange/10', label: 'Out for Delivery' },
  delivered: { icon: CheckCircle, color: 'text-racket-green', bg: 'bg-racket-green/10', label: 'Delivered' },
}

export default function DashboardPage() {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const membershipType = 'standard' // TODO: Get from Base44

  return (
    <main className="min-h-screen bg-racket-lightgray pt-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-racket-black to-racket-charcoal text-white py-16">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-4">Welcome Back!</h1>
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
                <Link href="/orders" className="text-racket-red font-semibold hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {mockOrders.map((order, i) => {
                  const status = statusConfig[order.status as keyof typeof statusConfig]
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
                          </div>
                          <h3 className="text-xl font-bold text-racket-black mb-1">{order.racket}</h3>
                          <p className="text-racket-gray">{order.service}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-racket-red">${order.total}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-racket-gray">
                        <span>Pickup: {new Date(order.pickup_date).toLocaleDateString()}</span>
                        {order.status === 'delivered' ? (
                          <span>Delivered: {new Date(order.delivered_date!).toLocaleDateString()}</span>
                        ) : (
                          <span>Est. Delivery: {new Date(order.estimated_delivery!).toLocaleDateString()}</span>
                        )}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Membership Status */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-racket-red to-red-600 text-white rounded-3xl shadow-2xl p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Crown className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Your Membership</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-4xl font-bold mb-2">Standard</div>
                  <div className="text-white/80">Renews Feb 24, 2026</div>
                </div>

                <div className="pt-4 border-t border-white/20">
                  <div className="text-sm text-white/70 mb-2">This month you&apos;ve saved:</div>
                  <div className="text-3xl font-bold text-white">$32</div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-racket-red py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
                >
                  Upgrade to Elite
                </motion.button>
              </div>
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
                  <div className="text-4xl font-bold text-racket-red">12</div>
                </div>
                <div>
                  <div className="text-sm text-racket-gray mb-2">Total Saved</div>
                  <div className="text-4xl font-bold text-racket-green">$196</div>
                </div>
                <div>
                  <div className="text-sm text-racket-gray mb-2">Member Since</div>
                  <div className="text-xl font-bold text-racket-black">Nov 2025</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}

