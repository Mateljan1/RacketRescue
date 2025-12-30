'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Check, Calendar, MapPin, ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface BookingDrawerProps {
  isOpen: boolean
  onClose: () => void
  initialPackage?: 'standard' | 'rush' | 'saver'
}

const packages = [
  {
    id: 'standard',
    name: 'Standard 24-Hour',
    price: 55,
    description: 'Back tomorrow',
    popular: false,
  },
  {
    id: 'rush',
    name: 'Same-Day Rush',
    price: 65,
    description: 'Back today',
    popular: true,
  },
  {
    id: 'saver',
    name: '3-Racket Pack',
    price: 150,
    description: 'Best value',
    popular: false,
  },
]

export default function BookingDrawer({ isOpen, onClose, initialPackage = 'standard' }: BookingDrawerProps) {
  const [step, setStep] = useState(1)
  const [racketCount, setRacketCount] = useState<number | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<string>(initialPackage)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      // Reset state when closed
      setStep(1)
      setRacketCount(null)
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleRacketSelect = (count: number) => {
    setRacketCount(count)
    if (count >= 3) {
      setSelectedPackage('saver')
    }
    setStep(2)
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-racket-black mb-2">
          How many racquets need stringing?
        </h3>
        <p className="text-racket-gray">We'll recommend the best option for you</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((count) => (
          <motion.button
            key={count}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleRacketSelect(count)}
            className={`p-6 rounded-2xl border-2 transition-all text-center ${
              count === 3
                ? 'border-racket-red bg-racket-red/5'
                : 'border-gray-200 hover:border-racket-red/50'
            }`}
          >
            <div className="text-4xl font-black text-racket-black">{count}{count === 3 && '+'}</div>
            <div className="text-sm text-racket-gray mt-1">
              {count === 1 ? 'racquet' : 'racquets'}
            </div>
            {count === 3 && (
              <div className="text-xs text-racket-red font-bold mt-2">Best Value</div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-racket-black mb-2">
          Choose your service
        </h3>
        <p className="text-racket-gray">
          {racketCount === 1 && 'For 1 racquet'}
          {racketCount === 2 && 'For 2 racquets'}
          {racketCount && racketCount >= 3 && 'Bundle discount applied!'}
        </p>
      </div>

      <div className="space-y-3">
        {packages.map((pkg) => {
          const isSelected = selectedPackage === pkg.id
          const isRecommended = (racketCount && racketCount >= 3 && pkg.id === 'saver') ||
                               (racketCount && racketCount < 3 && pkg.id === 'rush')

          return (
            <motion.button
              key={pkg.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`w-full p-5 rounded-2xl border-2 transition-all text-left relative ${
                isSelected
                  ? 'border-racket-red bg-racket-red/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-2 right-4 bg-racket-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Popular
                </div>
              )}
              {isRecommended && !pkg.popular && (
                <div className="absolute -top-2 right-4 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  Recommended
                </div>
              )}

              <div className="flex items-center gap-4">
                {/* Selection indicator */}
                <div className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-racket-red border-racket-red'
                    : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="w-4 h-4 text-white" />}
                </div>

                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-lg text-racket-black">{pkg.name}</div>
                    <div className="text-sm text-racket-gray">{pkg.description}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-racket-red">${pkg.price}</div>
                    {pkg.id === 'saver' && (
                      <div className="text-xs text-green-600 font-medium">Save $15</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          )
        })}
      </div>

      <Link
        href={`/schedule?package=${selectedPackage}&count=${racketCount}`}
        onClick={onClose}
        className="flex items-center justify-center gap-2 w-full bg-racket-red text-white py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors"
      >
        Continue to Schedule
        <ArrowRight className="w-5 h-5" />
      </Link>

      <button
        onClick={() => setStep(1)}
        className="w-full text-center text-racket-gray hover:text-racket-black transition-colors py-2"
      >
        ← Change racquet count
      </button>
    </div>
  )

  const content = (
    <div className={`bg-white ${isMobile ? 'rounded-t-3xl' : 'rounded-2xl'} p-6 md:p-8`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-racket-red/10 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-racket-red" />
          </div>
          <div>
            <div className="font-bold text-racket-black">Book Your Rescue</div>
            <div className="text-sm text-racket-gray flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Free pickup tomorrow
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close"
        >
          <X className="w-6 h-6 text-racket-gray" />
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 mb-8">
        <div className={`h-1 flex-1 rounded-full ${step >= 1 ? 'bg-racket-red' : 'bg-gray-200'}`} />
        <div className={`h-1 flex-1 rounded-full ${step >= 2 ? 'bg-racket-red' : 'bg-gray-200'}`} />
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
        </motion.div>
      </AnimatePresence>

      {/* Trust Footer */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-center gap-4 text-xs text-racket-gray">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" />
            Free pickup
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" />
            Satisfaction guaranteed
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" />
            USRSA certified
          </span>
        </div>
      </div>
    </div>
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal/Drawer */}
          {isMobile ? (
            // Mobile: Bottom Drawer
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[101] max-h-[90vh] overflow-y-auto"
            >
              {/* Drag handle */}
              <div className="flex justify-center pt-3 pb-2 bg-white rounded-t-3xl">
                <div className="w-10 h-1 bg-gray-300 rounded-full" />
              </div>
              {content}
              {/* Safe area padding for iOS */}
              <div className="h-8 bg-white" />
            </motion.div>
          ) : (
            // Desktop: Centered Dialog
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            >
              <div className="w-full max-w-lg shadow-2xl">
                {content}
              </div>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

// Hook to use the booking drawer
export function useBookingDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const [initialPackage, setInitialPackage] = useState<'standard' | 'rush' | 'saver'>('standard')

  const open = (pkg?: 'standard' | 'rush' | 'saver') => {
    if (pkg) setInitialPackage(pkg)
    setIsOpen(true)
  }

  const close = () => setIsOpen(false)

  return { isOpen, open, close, initialPackage }
}
