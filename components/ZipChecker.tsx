'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Check, X } from 'lucide-react'
import { useState } from 'react'

const SERVED_ZIPS = ['92651', '92653', '92656', '92657', '92660', '92661', '92662', '92663', '92672', '92677']

export default function ZipChecker() {
  const [zip, setZip] = useState('')
  const [checked, setChecked] = useState(false)
  const [served, setServed] = useState(false)

  const handleCheck = () => {
    if (zip.length === 5) {
      setChecked(true)
      setServed(SERVED_ZIPS.includes(zip))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck()
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border-2 border-white/20">
        <div className="flex items-center gap-3 mb-4">
          <MapPin className="w-6 h-6 text-racket-red" />
          <h3 className="text-xl font-bold text-white">Check Your Service Area</h3>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            maxLength={5}
            placeholder="Enter ZIP code"
            value={zip}
            onChange={(e) => {
              setZip(e.target.value.replace(/\D/g, ''))
              setChecked(false)
            }}
            onKeyPress={handleKeyPress}
            className="flex-1 px-6 py-4 rounded-xl text-lg font-bold text-racket-black focus:outline-none focus:ring-4 focus:ring-racket-red/50"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCheck}
            disabled={zip.length !== 5}
            className="px-8 py-4 bg-racket-red text-white rounded-xl font-bold hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Check
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          {checked && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`mt-6 p-5 rounded-xl flex items-center gap-3 ${
                served
                  ? 'bg-racket-green/20 border-2 border-racket-green'
                  : 'bg-yellow-500/20 border-2 border-yellow-500'
              }`}
            >
              {served ? (
                <>
                  <Check className="w-8 h-8 text-racket-green flex-shrink-0" />
                  <div>
                    <div className="font-bold text-white text-lg">✓ We serve {zip}!</div>
                    <div className="text-white/90 text-sm">Free pickup available for members</div>
                  </div>
                </>
              ) : (
                <>
                  <X className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                  <div>
                    <div className="font-bold text-white text-lg">Not in your area yet</div>
                    <div className="text-white/90 text-sm">Join waitlist - we're expanding soon!</div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!checked && (
          <p className="text-white/60 text-sm mt-4 text-center">
            Currently serving Orange County
          </p>
        )}
      </div>
    </div>
  )
}
