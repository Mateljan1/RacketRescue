'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Show after 5 seconds of scrolling
    const handleScroll = () => {
      if (window.scrollY > 800 && !isDismissed) {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="fixed bottom-8 right-8 z-50 max-w-sm"
        >
          <div className="relative bg-gradient-to-r from-racket-red to-red-600 text-white rounded-2xl shadow-2xl p-6">
            <button
              onClick={() => setIsDismissed(true)}
              className="absolute -top-2 -right-2 p-2 bg-white text-racket-red rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Ready to Schedule?</h3>
                <p className="text-white/90 text-sm">Get started in 2 minutes</p>
              </div>
            </div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/schedule"
                className="block w-full bg-white text-racket-red py-3 rounded-full text-center font-bold hover:bg-gray-100 transition-colors"
              >
                Schedule Pickup Now
              </Link>
            </motion.div>

            <p className="text-center text-white/70 text-xs mt-3">
              Free pickup for members • Starting at $55
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

