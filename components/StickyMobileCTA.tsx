'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Calendar } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function StickyMobileCTA() {
  const [isVisible, setIsVisible] = useState(false)

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

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset-bottom"
        >
          <div className="bg-white border-t border-gray-200 shadow-2xl px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Call Button */}
              <a
                href="tel:+19494646645"
                className="flex-1 flex items-center justify-center gap-2 bg-racket-black text-white py-3 rounded-xl font-bold text-sm hover:bg-racket-charcoal transition-colors"
              >
                <Phone className="w-4 h-4" />
                Call Now
              </a>

              {/* Schedule Button - Primary CTA */}
              <Link
                href="/schedule"
                className="flex-[2] flex items-center justify-center gap-2 bg-racket-red text-white py-3 rounded-xl font-bold text-sm hover:bg-red-600 transition-colors shadow-lg"
              >
                <Calendar className="w-4 h-4" />
                Schedule Pickup - $55
              </Link>
            </div>

            {/* Urgency Text */}
            <div className="text-center mt-2">
              <span className="text-xs text-racket-gray">
                <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                Next pickup: Tomorrow • Free for members
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
