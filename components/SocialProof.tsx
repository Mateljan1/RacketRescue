'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Users, Star, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'

const recentOrders = [
  { name: 'Sarah M.', location: 'Laguna Beach', time: '2 min ago', service: 'Pro-Performance' },
  { name: 'Mike R.', location: 'Laguna Hills', time: '8 min ago', service: 'Match-Ready' },
  { name: 'Jennifer L.', location: 'Laguna Beach', time: '15 min ago', service: 'Pro-Performance' },
  { name: 'David K.', location: 'Laguna Niguel', time: '23 min ago', service: 'Match-Ready' },
  { name: 'Amanda S.', location: 'Laguna Beach', time: '31 min ago', service: 'Pro-Performance' },
]

export default function SocialProof() {
  const [currentOrder, setCurrentOrder] = useState(0)
  const [totalOrders, setTotalOrders] = useState(1247)

  useEffect(() => {
    // Rotate through recent orders
    const interval = setInterval(() => {
      setCurrentOrder((prev) => (prev + 1) % recentOrders.length)
    }, 5000)

    // Increment total orders counter slowly
    const orderInterval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% chance every 10 seconds
        setTotalOrders(prev => prev + 1)
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      clearInterval(orderInterval)
    }
  }, [])

  return (
    <div className="fixed bottom-8 left-8 z-40 space-y-4 max-w-sm hidden lg:block">
      {/* Total Orders Counter */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 100 }}
        className="bg-white rounded-2xl shadow-2xl p-6 border-2 border-racket-green/20"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 bg-racket-green/10 rounded-xl">
            <TrendingUp className="w-6 h-6 text-racket-green" />
          </div>
          <div>
            <motion.div
              key={totalOrders}
              initial={{ scale: 1.2, color: '#10b981' }}
              animate={{ scale: 1, color: '#030707' }}
              className="text-3xl font-bold"
            >
              {totalOrders.toLocaleString()}
            </motion.div>
            <div className="text-sm text-racket-gray">Rackets strung this year</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Order Notifications */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentOrder}
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="bg-white rounded-2xl shadow-2xl p-5 border-2 border-racket-red/20"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-racket-red/10 rounded-full flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-racket-red" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-racket-black truncate">
                {recentOrders[currentOrder].name}
              </div>
              <div className="text-sm text-racket-gray">
                {recentOrders[currentOrder].location}
              </div>
              <div className="text-xs text-racket-gray mt-1">
                Ordered {recentOrders[currentOrder].service} • {recentOrders[currentOrder].time}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Satisfaction Badge */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 100 }}
        className="bg-gradient-to-r from-racket-red to-red-600 text-white rounded-2xl shadow-2xl p-5"
      >
        <div className="flex items-center gap-3">
          <Star className="w-8 h-8 fill-current" />
          <div>
            <div className="text-3xl font-bold">99.7%</div>
            <div className="text-sm text-white/90">Customer Satisfaction</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

