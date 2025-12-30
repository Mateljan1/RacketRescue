'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Calendar, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import BookingDrawer from './BookingDrawer'

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling past hero section
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Respect reduced motion preferences
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const springTransition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 300, damping: 30 }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { y: 100, opacity: 0 }}
            transition={springTransition}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
          >
            <div className="bg-white border-t border-gray-200 shadow-2xl px-4 py-3 pb-safe">
              {/* Urgency Bar */}
              <div className="flex items-center justify-center gap-2 mb-3 py-1.5 bg-green-50 rounded-lg">
                <motion.div
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span className="text-xs font-medium text-green-700">
                  3 pickup slots left today
                </span>
                <Clock className="w-3 h-3 text-green-600" />
              </div>

              <div className="flex items-center gap-3">
                {/* Call Button - Secondary */}
                <a
                  href="tel:+19494646645"
                  className="flex items-center justify-center gap-1.5 bg-racket-black text-white px-4 py-3.5 rounded-xl font-bold text-sm hover:bg-racket-charcoal transition-colors focus:outline-none focus:ring-2 focus:ring-racket-red focus:ring-offset-2"
                  aria-label="Call Racket Rescue"
                >
                  <Phone className="w-4 h-4" />
                  <span className="sr-only sm:not-sr-only">Call</span>
                </a>

                {/* Schedule Button - Primary CTA */}
                <button
                  onClick={() => setDrawerOpen(true)}
                  className="flex-1 flex items-center justify-center gap-2 bg-racket-red text-white py-3.5 rounded-xl font-bold text-base hover:bg-red-600 transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-racket-red focus:ring-offset-2"
                  aria-label="Schedule a pickup"
                >
                  <Calendar className="w-5 h-5" />
                  Rescue My Racquet — $55
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Drawer */}
      <BookingDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  )
}
