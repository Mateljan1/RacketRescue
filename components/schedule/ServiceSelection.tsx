'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import StringWizard from '@/components/StringWizard'
import { PRICING } from '@/lib/pricing'

interface Props {
  orderData: any
  setOrderData: (data: any) => void
  onNext: () => void
}

export default function ServiceSelection({ orderData, setOrderData, onNext }: Props) {
  const [showStringWizard, setShowStringWizard] = useState(false)
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  // Set default string as included standard string (no extra cost)
  useEffect(() => {
    if (!orderData.string_name && !orderData.customer_provides_string) {
      setOrderData({
        ...orderData,
        string_name: 'Wilson Velocity MLT',
        string_type: 'multifilament',
        string_price: 0, // Included in base price
      })
    }
  }, [])

  // Handle premium string selection from wizard
  const handleStringSelect = (stringId: string, stringName: string) => {
    setOrderData({
      ...orderData,
      string_name: stringName,
      string_price: PRICING.addOns.premiumString, // +$10 premium upgrade
    })
    setShowStringWizard(false)
  }

  return (
    <div className="space-y-12">
      <StringWizard
        isOpen={showStringWizard}
        onClose={() => setShowStringWizard(false)}
        onSelectString={handleStringSelect}
      />
      
      {/* Service Package - PREMIUM DESIGN */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="mb-10">
          <h2 className="text-5xl font-bold text-racket-black mb-3">Select Service</h2>
          <p className="text-xl text-racket-gray">Choose your stringing level</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Standard 24-Hour */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            onHoverStart={() => setHoveredService('standard')}
            onHoverEnd={() => setHoveredService(null)}
            onClick={() => setOrderData({ ...orderData, service_package: 'standard' })}
            className={`relative cursor-pointer rounded-3xl p-10 transition-all duration-500 ${
              orderData.service_package === 'standard' || orderData.service_package === 'match_ready'
                ? 'bg-gradient-to-br from-racket-red via-red-500 to-red-600 text-white shadow-2xl'
                : 'bg-white border-4 border-gray-200 hover:border-gray-300 text-racket-black'
            }`}
          >
            {/* Most Popular Badge */}
            {orderData.service_package !== 'standard' && orderData.service_package !== 'match_ready' && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-racket-green text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider shadow-xl">
                  ★ MOST POPULAR
                </div>
              </div>
            )}

            {/* Custom SVG Illustration */}
            <div className="mb-8">
              <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <defs>
                  <linearGradient id="standardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={orderData.service_package === 'standard' || orderData.service_package === 'match_ready' ? "#ffffff" : "#ec1f27"} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={orderData.service_package === 'standard' || orderData.service_package === 'match_ready' ? "#ffffff" : "#ec1f27"} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="55" fill="url(#standardGrad)" />
                <circle cx="60" cy="60" r="40" fill="none" stroke={orderData.service_package === 'standard' || orderData.service_package === 'match_ready' ? "#ffffff" : "#ec1f27"} strokeWidth="3" strokeDasharray="4 4" />
                <text x="60" y="70" textAnchor="middle" fontSize="28" fontWeight="bold" fill={orderData.service_package === 'standard' || orderData.service_package === 'match_ready' ? "#ffffff" : "#ec1f27"}>$55</text>
              </svg>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold">Standard 24-Hour</h3>
              <div className="text-6xl font-black tracking-tight">
                $55
              </div>
              <div className={`text-lg font-medium ${orderData.service_package === 'standard' || orderData.service_package === 'match_ready' ? 'text-white/90' : 'text-racket-gray'}`}>
                Ready next day
              </div>
              <p className={`text-lg leading-relaxed ${orderData.service_package === 'standard' || orderData.service_package === 'match_ready' ? 'text-white/80' : 'text-racket-gray'}`}>
                All-inclusive: stringing + string + free pickup
              </p>

              {(orderData.service_package === 'standard' || orderData.service_package === 'match_ready') && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-lg mt-6"
                >
                  ✓ Selected
                </motion.div>
              )}
            </div>

            {/* Subtle hover effect overlay */}
            <motion.div
              initial={false}
              animate={{
                opacity: hoveredService === 'standard' && orderData.service_package !== 'standard' && orderData.service_package !== 'match_ready' ? 0.05 : 0
              }}
              className="absolute inset-0 bg-racket-red rounded-3xl pointer-events-none"
            />
          </motion.div>

          {/* Same-Day Rush */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            onHoverStart={() => setHoveredService('rush')}
            onHoverEnd={() => setHoveredService(null)}
            onClick={() => setOrderData({ ...orderData, service_package: 'rush' })}
            className={`relative cursor-pointer rounded-3xl p-10 transition-all duration-500 ${
              orderData.service_package === 'rush' || orderData.service_package === 'pro_performance'
                ? 'bg-gradient-to-br from-racket-black via-racket-charcoal to-black text-white shadow-2xl'
                : 'bg-white border-4 border-gray-200 hover:border-gray-300 text-racket-black'
            }`}
          >
            {/* Rush Badge */}
            {orderData.service_package !== 'rush' && orderData.service_package !== 'pro_performance' && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-orange-500 text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider shadow-xl">
                  ⚡ SAME DAY
                </div>
              </div>
            )}

            {/* Custom SVG Illustration */}
            <div className="mb-8">
              <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <defs>
                  <linearGradient id="rushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={orderData.service_package === 'rush' || orderData.service_package === 'pro_performance' ? "#ffffff" : "#f97316"} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={orderData.service_package === 'rush' || orderData.service_package === 'pro_performance' ? "#ffffff" : "#f97316"} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path d="M 65 15 L 45 55 L 58 55 L 50 105 L 80 50 L 65 50 Z" fill="url(#rushGrad)" stroke={orderData.service_package === 'rush' || orderData.service_package === 'pro_performance' ? "#ffffff" : "#f97316"} strokeWidth="3" />
                <text x="60" y="75" textAnchor="middle" fontSize="24" fontWeight="bold" fill={orderData.service_package === 'rush' || orderData.service_package === 'pro_performance' ? "#ffffff" : "#f97316"}>$65</text>
              </svg>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold">Same-Day Rush</h3>
              <div className="text-6xl font-black tracking-tight">
                $65
              </div>
              <div className={`text-lg font-medium ${orderData.service_package === 'rush' || orderData.service_package === 'pro_performance' ? 'text-white/90' : 'text-racket-gray'}`}>
                Ready today (drop off by noon)
              </div>
              <p className={`text-lg leading-relaxed ${orderData.service_package === 'rush' || orderData.service_package === 'pro_performance' ? 'text-white/80' : 'text-racket-gray'}`}>
                All-inclusive: stringing + string + free pickup
              </p>

              {(orderData.service_package === 'rush' || orderData.service_package === 'pro_performance') && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full font-bold text-lg mt-6"
                >
                  ✓ Selected
                </motion.div>
              )}
            </div>

            <motion.div
              initial={false}
              animate={{
                opacity: hoveredService === 'rush' && orderData.service_package !== 'rush' && orderData.service_package !== 'pro_performance' ? 0.05 : 0
              }}
              className="absolute inset-0 bg-racket-black rounded-3xl pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Pricing Includes Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6"
        >
          <div className="flex items-center gap-4 text-racket-green">
            <svg width="32" height="32" viewBox="0 0 32 32" className="flex-shrink-0">
              <circle cx="16" cy="16" r="14" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M10 16 L14 20 L22 12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <span className="font-bold text-lg">All-Inclusive Pricing</span>
              <p className="text-sm text-racket-gray">Includes professional stringing, standard string, and free pickup & delivery</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* String Selection - SIMPLIFIED */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-10">
          <h2 className="text-5xl font-bold text-racket-black mb-3">String Options</h2>
          <p className="text-xl text-racket-gray">Standard string included • Upgrade or bring your own</p>
        </div>

        {/* Provide Own String - With Discount */}
        <motion.label
          whileHover={{ scale: 1.01 }}
          className="relative block cursor-pointer mb-8 group"
        >
          <input
            type="checkbox"
            checked={orderData.customer_provides_string}
            onChange={(e) => setOrderData({ ...orderData, customer_provides_string: e.target.checked })}
            className="sr-only peer"
          />
          <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border-4 border-blue-200 rounded-3xl peer-checked:border-racket-blue peer-checked:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-6">
              {/* Custom package SVG */}
              <svg width="60" height="60" viewBox="0 0 60 60" className="flex-shrink-0">
                <rect x="15" y="20" width="30" height="25" rx="3" fill="#3b82f6" opacity="0.2" />
                <rect x="17" y="22" width="26" height="4" fill="#3b82f6" />
                <path d="M 30 15 L 30 25" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                <path d="M 25 20 L 30 15 L 35 20" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" fill="none" />
              </svg>

              <div className="flex-1">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-2xl font-black text-racket-black">
                    I&apos;ll Bring My Own String
                  </span>
                  <span className="text-xl font-bold text-racket-green">Save $10</span>
                </div>
                <p className="text-racket-gray text-lg">
                  Already have your favorite string? Include it in your racket cover at pickup.
                </p>

                {orderData.customer_provides_string && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="inline-flex items-center gap-2 bg-racket-blue text-white px-5 py-2 rounded-full font-bold mt-4"
                  >
                    ✓ Will Provide String – $10 Off
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.label>

        {/* Premium String Upgrade Option */}
        {!orderData.customer_provides_string && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            {/* Default String Info */}
            <div className="bg-gray-50 border-2 border-gray-200 rounded-2xl p-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-racket-black text-lg">Standard String Included</span>
                  <p className="text-racket-gray">Wilson Velocity MLT – Great all-around performance</p>
                </div>
                <span className="text-racket-green font-bold">Included</span>
              </div>
            </div>

            {/* Premium Upgrade Button */}
            <button
              onClick={() => setShowStringWizard(true)}
              className="relative w-full p-8 rounded-3xl overflow-hidden group bg-gradient-to-r from-racket-black to-racket-charcoal shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="relative z-10 flex items-center justify-between text-white">
                <div className="text-left">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-2xl font-black">Upgrade to Premium String</span>
                    <span className="text-xl font-bold text-racket-orange">+$10</span>
                  </div>
                  <div className="text-lg opacity-90">Choose from Luxilon, RPM Blast, and more pro-level strings</div>
                </div>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-10 h-10" />
                </motion.div>
              </div>
            </button>

            {/* Selected Premium String Display */}
            {orderData.string_name && orderData.string_name !== 'Wilson Velocity MLT' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-6 bg-racket-black text-white rounded-2xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-white/60">Premium String Selected</span>
                    <h4 className="text-xl font-black">{orderData.string_name}</h4>
                  </div>
                  <div className="text-right">
                    <span className="text-racket-orange font-bold text-lg">+$10</span>
                    <button
                      onClick={() => setOrderData({
                        ...orderData,
                        string_name: 'Wilson Velocity MLT',
                        string_type: 'multifilament',
                        string_price: 0,
                      })}
                      className="block text-sm text-white/60 hover:text-white mt-1"
                    >
                      Remove upgrade
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Navigation - BOLD */}
      <div className="flex justify-end pt-8">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(236,31,39,0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          className="inline-flex items-center gap-4 bg-racket-black text-white px-12 py-6 rounded-full text-2xl font-black shadow-2xl transition-all"
        >
          Continue to Racket Details
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <ArrowRight className="w-8 h-8" />
          </motion.div>
        </motion.button>
      </div>
    </div>
  )
}
