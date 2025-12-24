'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import StringWizard from '@/components/StringWizard'

interface Props {
  orderData: any
  setOrderData: (data: any) => void
  onNext: () => void
}

import { STRINGS_CATALOG } from '@/lib/strings-catalog'

const stringOptions = STRINGS_CATALOG

export default function ServiceSelection({ orderData, setOrderData, onNext }: Props) {
  const [showStringWizard, setShowStringWizard] = useState(false)
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const handleStringSelect = (stringId: string, stringName: string, stringPrice: number) => {
    setOrderData({
      ...orderData,
      string_name: stringName,
      string_price: stringPrice,
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
          {/* Match-Ready */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            onHoverStart={() => setHoveredService('match_ready')}
            onHoverEnd={() => setHoveredService(null)}
            onClick={() => setOrderData({ ...orderData, service_package: 'match_ready' })}
            className={`relative cursor-pointer rounded-3xl p-10 transition-all duration-500 ${
              orderData.service_package === 'match_ready'
                ? 'bg-gradient-to-br from-racket-red via-red-500 to-red-600 text-white shadow-2xl'
                : 'bg-white border-4 border-gray-200 hover:border-gray-300 text-racket-black'
            }`}
          >
            {/* Custom SVG Illustration - Not an icon! */}
            <div className="mb-8">
              <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <defs>
                  <linearGradient id="matchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={orderData.service_package === 'match_ready' ? "#ffffff" : "#ec1f27"} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={orderData.service_package === 'match_ready' ? "#ffffff" : "#ec1f27"} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <circle cx="60" cy="60" r="55" fill="url(#matchGrad)" />
                <circle cx="60" cy="60" r="40" fill="none" stroke={orderData.service_package === 'match_ready' ? "#ffffff" : "#ec1f27"} strokeWidth="3" strokeDasharray="4 4" />
                <text x="60" y="70" textAnchor="middle" fontSize="32" fontWeight="bold" fill={orderData.service_package === 'match_ready' ? "#ffffff" : "#ec1f27"}>35</text>
              </svg>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold">Match-Ready</h3>
              <div className="text-6xl font-black tracking-tight">
                $35
              </div>
              <div className={`text-lg font-medium ${orderData.service_package === 'match_ready' ? 'text-white/90' : 'text-racket-gray'}`}>
                Turnaround: 2-3 Days
              </div>
              <p className={`text-lg leading-relaxed ${orderData.service_package === 'match_ready' ? 'text-white/80' : 'text-racket-gray'}`}>
                Professional stringing for casual and club players
              </p>

              {orderData.service_package === 'match_ready' && (
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
                opacity: hoveredService === 'match_ready' && orderData.service_package !== 'match_ready' ? 0.05 : 0
              }}
              className="absolute inset-0 bg-racket-red rounded-3xl pointer-events-none"
            />
          </motion.div>

          {/* Pro-Performance */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.99 }}
            onHoverStart={() => setHoveredService('pro_performance')}
            onHoverEnd={() => setHoveredService(null)}
            onClick={() => setOrderData({ ...orderData, service_package: 'pro_performance' })}
            className={`relative cursor-pointer rounded-3xl p-10 transition-all duration-500 ${
              orderData.service_package === 'pro_performance'
                ? 'bg-gradient-to-br from-racket-black via-racket-charcoal to-black text-white shadow-2xl'
                : 'bg-white border-4 border-gray-200 hover:border-gray-300 text-racket-black'
            }`}
          >
            {/* Most Popular Badge */}
            {orderData.service_package !== 'pro_performance' && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                <div className="bg-racket-red text-white px-6 py-2 rounded-full font-bold text-sm tracking-wider shadow-xl">
                  ★ MOST POPULAR
                </div>
              </div>
            )}

            {/* Custom SVG Illustration - Not an icon! */}
            <div className="mb-8">
              <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
                <defs>
                  <linearGradient id="proGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={orderData.service_package === 'pro_performance' ? "#ffffff" : "#030707"} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={orderData.service_package === 'pro_performance' ? "#ffffff" : "#030707"} stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                <path d="M 60 10 L 80 50 L 60 90 L 40 50 Z" fill="url(#proGrad)" stroke={orderData.service_package === 'pro_performance' ? "#ffffff" : "#ec1f27"} strokeWidth="3" />
                <circle cx="60" cy="60" r="25" fill="none" stroke={orderData.service_package === 'pro_performance' ? "#ffffff" : "#ec1f27"} strokeWidth="2" />
                <text x="60" y="70" textAnchor="middle" fontSize="28" fontWeight="bold" fill={orderData.service_package === 'pro_performance' ? "#ffffff" : "#ec1f27"}>50</text>
              </svg>
            </div>

            <div className="text-center space-y-4">
              <h3 className="text-3xl font-bold">Pro-Performance</h3>
              <div className="text-6xl font-black tracking-tight">
                $50
              </div>
              <div className={`text-lg font-medium ${orderData.service_package === 'pro_performance' ? 'text-white/90' : 'text-racket-gray'}`}>
                Turnaround: 2 Days
              </div>
              <p className={`text-lg leading-relaxed ${orderData.service_package === 'pro_performance' ? 'text-white/80' : 'text-racket-gray'}`}>
                Premium stringing for competitors
              </p>

              {orderData.service_package === 'pro_performance' && (
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
                opacity: hoveredService === 'pro_performance' && orderData.service_package !== 'pro_performance' ? 0.05 : 0
              }}
              className="absolute inset-0 bg-racket-black rounded-3xl pointer-events-none"
            />
          </motion.div>
        </div>

        {/* Express Add-on - PREMIUM DESIGN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <label className="relative block cursor-pointer group">
            <input
              type="checkbox"
              checked={orderData.is_express}
              onChange={(e) => setOrderData({ ...orderData, is_express: e.target.checked })}
              className="sr-only peer"
            />
            <div className="p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-4 border-orange-200 rounded-3xl peer-checked:border-racket-orange peer-checked:shadow-2xl transition-all duration-300">
              <div className="flex items-start gap-6">
                {/* Custom lightning bolt SVG */}
                <svg width="60" height="60" viewBox="0 0 60 60" className="flex-shrink-0">
                  <path d="M35 5 L20 30 L30 30 L25 55 L45 25 L35 25 Z" fill="#f97316" className="drop-shadow-lg" />
                </svg>

                <div className="flex-1">
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="text-3xl font-black text-racket-black">Express Service</span>
                    <span className="text-4xl font-black text-racket-orange">+$15</span>
                  </div>
                  <p className="text-lg text-racket-gray leading-relaxed">
                    Next-day turnaround for urgent needs. Get your racket back even faster for tournaments and matches.
                  </p>
                  
                  {orderData.is_express && (
                    <motion.div
                      initial={{ scale: 0, x: -20 }}
                      animate={{ scale: 1, x: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                      className="inline-flex items-center gap-2 bg-racket-orange text-white px-5 py-2 rounded-full font-bold mt-4"
                    >
                      ✓ Added to Order
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </label>
        </motion.div>
      </motion.div>

      {/* String Selection - ULTRA PREMIUM */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="mb-10">
          <h2 className="text-5xl font-bold text-racket-black mb-3">Choose Your String</h2>
          <p className="text-xl text-racket-gray">Select from expert recommendations or bring your own</p>
        </div>

        {/* Provide Own String - CLEAN DESIGN */}
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
                <span className="text-2xl font-black text-racket-black block mb-2">
                  I&apos;ll Bring My Own String
                </span>
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
                    ✓ Will Provide String
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </motion.label>

        {/* String Wizard CTA - PROMINENT */}
        {!orderData.customer_provides_string && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <button
              onClick={() => setShowStringWizard(true)}
              className="relative w-full p-10 mb-8 rounded-3xl overflow-hidden group"
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
              }}
            >
              <div className="relative z-10 flex items-center justify-between text-white">
                <div className="text-left">
                  <div className="text-3xl font-black mb-2">✨ Not Sure Which String?</div>
                  <div className="text-xl opacity-90">Take our 60-second quiz for personalized recommendations</div>
                </div>
                <motion.div
                  animate={{ x: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight className="w-12 h-12" />
                </motion.div>
              </div>

              {/* Animated background effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 bg-gradient-radial from-white/30 to-transparent"
                style={{ transformOrigin: 'center' }}
              />
            </button>

            {/* String Grid - ULTRA CLEAN TENNIS WAREHOUSE */}
            <div className="space-y-3">
              {stringOptions.map((string, i) => {
                const isSelected = orderData.string_name === string.name

                return (
                  <motion.div
                    key={string.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.05 }}
                    whileHover={{ x: 8 }}
                    onClick={() => setOrderData({
                      ...orderData,
                      string_type: string.material,
                      string_name: `${string.brand} ${string.name}`,
                      string_price: string.price,
                    })}
                    className={`relative cursor-pointer rounded-2xl transition-all duration-300 overflow-hidden ${
                      isSelected
                        ? 'bg-racket-black text-white shadow-2xl'
                        : 'bg-white border-3 border-gray-200 hover:border-racket-black/30 hover:shadow-xl'
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 min-w-0">
                          {/* Brand + Name */}
                          <div className="flex items-center gap-3 mb-3">
                            <span className={`text-xs font-black uppercase tracking-wider ${isSelected ? 'text-white/60' : 'text-racket-gray'}`}>
                              {string.brand}
                            </span>
                            {string.rating >= 4.7 && !isSelected && (
                              <span className="bg-racket-green text-white text-xs px-2 py-1 rounded-full font-bold">
                                ★ {string.rating} ({string.reviews}+ reviews)
                              </span>
                            )}
                          </div>
                          <h3 className="text-2xl font-black mb-2">{string.name}</h3>
                          <p className={`text-base mb-3 ${isSelected ? 'text-white/80' : 'text-racket-gray'}`}>
                            {string.description}
                          </p>
                          
                          {/* Best For Tags */}
                          <div className="flex flex-wrap gap-2">
                            {string.bestFor.map((feature) => (
                              <span
                                key={feature}
                                className={`text-xs px-3 py-1 rounded-full font-bold ${
                                  isSelected
                                    ? 'bg-white/20 text-white'
                                    : 'bg-gray-100 text-racket-gray'
                                }`}
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Price + Select */}
                        <div className="flex flex-col items-end justify-between flex-shrink-0">
                          <div className={`text-5xl font-black ${isSelected ? 'text-white' : 'text-racket-red'}`}>
                            ${string.price}
                          </div>
                          
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 200 }}
                              className="mt-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-bold"
                            >
                              ✓ SELECTED
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
            
            {/* Link to Shop for More */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center pt-6"
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-racket-blue font-bold text-lg hover:gap-4 transition-all"
              >
                View Full String Catalog & Buy Direct
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Navigation - BOLD */}
      <div className="flex justify-end pt-8">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(236,31,39,0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!orderData.customer_provides_string && !orderData.string_name}
          className="inline-flex items-center gap-4 bg-racket-black text-white px-12 py-6 rounded-full text-2xl font-black shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
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
