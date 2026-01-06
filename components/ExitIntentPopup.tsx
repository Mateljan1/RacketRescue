'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, ArrowRight } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { analytics } from '@/lib/analytics'

const STORAGE_KEY = 'racket-rescue-exit-popup'
const COOLDOWN_DAYS = 7 // Don't show again for 7 days after dismissing

export default function ExitIntentPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const shouldShowPopup = useCallback(() => {
    if (typeof window === 'undefined') return false

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return true // Never shown before

      const data = JSON.parse(stored)

      // If submitted email, never show again
      if (data.submitted) return false

      // If dismissed, check cooldown period
      if (data.dismissedAt) {
        const dismissedDate = new Date(data.dismissedAt)
        const now = new Date()
        const daysSinceDismissed = (now.getTime() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)

        if (daysSinceDismissed < COOLDOWN_DAYS) return false
      }

      // If shown this session, don't show again
      if (data.shownThisSession && sessionStorage.getItem(STORAGE_KEY)) return false

      return true
    } catch {
      return true
    }
  }, [])

  const markAsShown = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const data = stored ? JSON.parse(stored) : {}
      data.lastShown = new Date().toISOString()
      data.shownThisSession = true
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      sessionStorage.setItem(STORAGE_KEY, 'shown')
    } catch {}
  }, [])

  const handleDismiss = useCallback(() => {
    setIsOpen(false)
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const data = stored ? JSON.parse(stored) : {}
      data.dismissedAt = new Date().toISOString()
      data.dismissCount = (data.dismissCount || 0) + 1
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {}
  }, [])

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse leaves through the top of the page
      if (e.clientY <= 0 && !isOpen && !submitted && shouldShowPopup()) {
        setIsOpen(true)
        markAsShown()
        analytics.exitIntentShown() // Track exit intent shown
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [submitted, isOpen, shouldShowPopup, markAsShown])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Track email capture
    analytics.exitIntentEmailCaptured(email)
    
    // TODO: Integrate with email service (ConvertKit, Mailchimp, etc.)
    console.log('Email captured:', email)
    setSubmitted(true)

    // Mark as submitted so popup never shows again
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      const data = stored ? JSON.parse(stored) : {}
      data.submitted = true
      data.submittedAt = new Date().toISOString()
      data.email = email
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    } catch {}

    setTimeout(() => {
      setIsOpen(false)
    }, 2000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleDismiss}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            <button
              onClick={handleDismiss}
              className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
              aria-label="Close popup"
            >
              <X className="w-6 h-6" />
            </button>

            {!submitted ? (
              <div className="p-12">
                <div className="text-center mb-8">
                  <div className="inline-flex p-6 bg-racket-red/10 rounded-full mb-6">
                    <Gift className="w-16 h-16 text-racket-red" />
                  </div>
                  <h2 className="text-4xl font-bold text-racket-black mb-4">
                    Wait! Try Free for 30 Days
                  </h2>
                  <p className="text-xl text-racket-gray mb-4">
                    Get your first stringing FREE with a 30-day membership trial
                  </p>
                  <div className="bg-racket-lightgray rounded-xl p-4 text-left space-y-2">
                    <div className="flex items-center gap-2 text-racket-black">
                      <span className="text-racket-green">✓</span>
                      <span>FREE first stringing (up to $75 value)</span>
                    </div>
                    <div className="flex items-center gap-2 text-racket-black">
                      <span className="text-racket-green">✓</span>
                      <span>FREE pickup & delivery for 30 days</span>
                    </div>
                    <div className="flex items-center gap-2 text-racket-black">
                      <span className="text-racket-green">✓</span>
                      <span>No commitment - cancel anytime</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-6 py-4 border-3 border-gray-200 rounded-xl text-lg focus:border-racket-red focus:outline-none transition-colors"
                  />

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-racket-red text-white py-5 rounded-full text-xl font-bold hover:bg-red-600 transition-colors flex items-center justify-center gap-3"
                  >
                    Start My Free Trial
                    <ArrowRight className="w-6 h-6" />
                  </motion.button>

                  <p className="text-sm text-racket-gray text-center">
                    No credit card required. Cancel anytime in the first 30 days.
                  </p>
                </form>
              </div>
            ) : (
              <div className="p-12 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="inline-flex p-6 bg-racket-green/10 rounded-full mb-6"
                >
                  <Gift className="w-16 h-16 text-racket-green" />
                </motion.div>
                <h2 className="text-4xl font-bold text-racket-black mb-4">
                  You're In!
                </h2>
                <p className="text-xl text-racket-gray">
                  Check your email to activate your 30-day free trial. Welcome to Racket Rescue!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
