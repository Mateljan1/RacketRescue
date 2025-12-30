'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Users, Star, CheckCircle, X } from 'lucide-react'
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
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if dismissed in session
    if (sessionStorage.getItem('social-proof-dismissed') === 'true') {
      setIsDismissed(true)
      return
    }

    // Only show after scrolling past hero (90vh)
    const handleScroll = () => {
      const scrollY = window.scrollY
      const heroHeight = window.innerHeight * 0.9
      setIsVisible(scrollY > heroHeight)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isVisible || isDismissed) return

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
  }, [isVisible, isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    sessionStorage.setItem('social-proof-dismissed', 'true')
  }

  if (isDismissed || !isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="fixed bottom-8 right-8 z-40 max-w-xs hidden lg:block"
    >
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute -top-2 -left-2 w-6 h-6 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center shadow-md transition-colors z-10"
        aria-label="Dismiss notifications"
      >
        <X className="w-3 h-3 text-gray-600" />
      </button>

      {/* Single compact notification card */}
      <div className="bg-white rounded-2xl shadow-2xl p-4 border border-gray-100">
        {/* Stats row */}
        <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
          <div className="p-2 bg-racket-green/10 rounded-lg">
            <TrendingUp className="w-5 h-5 text-racket-green" />
          </div>
          <div>
            <motion.div
              key={totalOrders}
              initial={{ scale: 1.1, color: '#10b981' }}
              animate={{ scale: 1, color: '#030707' }}
              className="text-xl font-bold"
            >
              {totalOrders.toLocaleString()}
            </motion.div>
            <div className="text-xs text-racket-gray">Rackets strung this year</div>
          </div>
        </div>

        {/* Recent order */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentOrder}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pt-3"
          >
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-racket-red/10 rounded-full flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-racket-red" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-racket-black truncate">
                  {recentOrders[currentOrder].name} • {recentOrders[currentOrder].location}
                </div>
                <div className="text-xs text-racket-gray">
                  Ordered {recentOrders[currentOrder].time}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Rating badge */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
          <Star className="w-4 h-4 text-yellow-500 fill-current" />
          <span className="text-sm font-bold text-racket-black">4.9</span>
          <span className="text-xs text-racket-gray">(312 reviews)</span>
        </div>
      </div>
    </motion.div>
  )
}

