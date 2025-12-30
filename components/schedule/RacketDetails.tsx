'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { RACKET_PRESETS, GRIP_OPTIONS, SERVICE_ADDONS } from '@/lib/strings-catalog'
import { getServicePrice } from '@/lib/pricing'

interface Props {
  orderData: any
  setOrderData: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

const popularBrands = ['Wilson', 'Babolat', 'Head', 'Yonex', 'Prince', 'Dunlop', 'Volkl']

export default function RacketDetails({ orderData, setOrderData, onNext, onPrev }: Props) {
  const [showModels, setShowModels] = useState(false)
  const [suggestedModels, setSuggestedModels] = useState<string[]>([])

  // Auto-populate models and tension when brand is selected
  useEffect(() => {
    if (orderData.racket_brand && RACKET_PRESETS[orderData.racket_brand]) {
      const preset = RACKET_PRESETS[orderData.racket_brand]
      setSuggestedModels(preset.models)
      setShowModels(true)
      
      // Auto-set typical tension if not already set by user
      if (orderData.main_tension === 55 && orderData.cross_tension === 55) {
        setOrderData({
          ...orderData,
          main_tension: preset.typical_tension,
          cross_tension: preset.typical_tension,
        })
      }
    } else {
      setShowModels(false)
      setSuggestedModels([])
    }
  }, [orderData.racket_brand])

  const isValid = orderData.racket_brand && orderData.main_tension && orderData.cross_tension

  return (
    <div className="space-y-10">
      {/* Racket Brand - CLEAN SELECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-5xl font-bold text-racket-black mb-3">Your Racket</h2>
        <p className="text-xl text-racket-gray mb-10">Tell us what you're playing with</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-black text-racket-black mb-4 uppercase tracking-wider">
              Select Brand
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {popularBrands.map((brand) => (
                <motion.button
                  key={brand}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOrderData({ ...orderData, racket_brand: brand, racket_model: '' })}
                  className={`relative py-5 px-6 rounded-2xl font-bold text-lg transition-all duration-300 ${
                    orderData.racket_brand === brand
                      ? 'bg-racket-black text-white shadow-2xl'
                      : 'bg-white border-3 border-gray-200 text-racket-gray hover:border-racket-black/30'
                  }`}
                >
                  {brand}
                  {orderData.racket_brand === brand && (
                    <motion.div
                      layoutId="brand-indicator"
                      className="absolute inset-0 bg-racket-black rounded-2xl -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Popular Models - AUTO-POPULATED */}
          <AnimatePresence>
            {showModels && suggestedModels.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <label className="block text-sm font-black text-racket-black mb-4 uppercase tracking-wider">
                  Popular {orderData.racket_brand} Models
                </label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {suggestedModels.map((model) => (
                    <motion.button
                      key={model}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setOrderData({ ...orderData, racket_model: model })}
                      className={`py-4 px-6 rounded-xl text-base font-semibold transition-all ${
                        orderData.racket_model === model
                          ? 'bg-racket-red text-white shadow-lg'
                          : 'bg-gray-100 text-racket-gray hover:bg-gray-200'
                      }`}
                    >
                      {model}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Or type custom */}
          <input
            type="text"
            placeholder="Or type your model..."
            value={!suggestedModels.includes(orderData.racket_model) ? orderData.racket_model : ''}
            onChange={(e) => setOrderData({ ...orderData, racket_model: e.target.value })}
            className="w-full px-6 py-5 border-4 border-gray-200 rounded-2xl focus:border-racket-black focus:outline-none text-lg transition-all"
          />
        </div>
      </motion.div>

      {/* Tension - VISUAL SLIDERS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border-4 border-gray-200"
      >
        <h3 className="text-3xl font-bold text-racket-black mb-8">String Tension</h3>

        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <label htmlFor="main-tension" className="block text-sm font-black text-racket-gray mb-6 uppercase tracking-wider">
              Main Strings
            </label>
            <div className="relative">
              <input
                id="main-tension"
                type="range"
                min="40"
                max="70"
                value={orderData.main_tension}
                onChange={(e) => setOrderData({ ...orderData, main_tension: parseInt(e.target.value) })}
                className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-racket-red"
                style={{
                  background: `linear-gradient(to right, #ec1f27 0%, #ec1f27 ${((orderData.main_tension - 40) / 30) * 100}%, #e5e7eb ${((orderData.main_tension - 40) / 30) * 100}%, #e5e7eb 100%)`,
                }}
                aria-valuemin={40}
                aria-valuemax={70}
                aria-valuenow={orderData.main_tension}
              />
              <div className="flex justify-between text-sm text-racket-gray mt-3 mb-6">
                <span>40 lbs</span>
                <span>70 lbs</span>
              </div>
              <motion.div
                key={orderData.main_tension}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <div className="text-7xl font-black text-racket-red">
                  {orderData.main_tension}
                </div>
                <div className="text-lg text-racket-gray font-semibold">pounds</div>
              </motion.div>
            </div>
          </div>

          <div>
            <label htmlFor="cross-tension" className="block text-sm font-black text-racket-gray mb-6 uppercase tracking-wider">
              Cross Strings
            </label>
            <div className="relative">
              <input
                id="cross-tension"
                type="range"
                min="40"
                max="70"
                value={orderData.cross_tension}
                onChange={(e) => setOrderData({ ...orderData, cross_tension: parseInt(e.target.value) })}
                className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-racket-red"
                style={{
                  background: `linear-gradient(to right, #ec1f27 0%, #ec1f27 ${((orderData.cross_tension - 40) / 30) * 100}%, #e5e7eb ${((orderData.cross_tension - 40) / 30) * 100}%, #e5e7eb 100%)`,
                }}
                aria-valuemin={40}
                aria-valuemax={70}
                aria-valuenow={orderData.cross_tension}
              />
              <div className="flex justify-between text-sm text-racket-gray mt-3 mb-6">
                <span>40 lbs</span>
                <span>70 lbs</span>
              </div>
              <motion.div
                key={orderData.cross_tension}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="text-center"
              >
                <div className="text-7xl font-black text-racket-red">
                  {orderData.cross_tension}
                </div>
                <div className="text-lg text-racket-gray font-semibold">pounds</div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Tension Helper */}
        <div className="mt-8 p-6 bg-white rounded-2xl border-2 border-gray-200">
          <div className="text-sm font-bold text-racket-gray mb-3">💡 TENSION GUIDE:</div>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-racket-gray">
            <div>
              <strong className="text-racket-black">Lower (40-52):</strong> More power, comfort
            </div>
            <div>
              <strong className="text-racket-black">Higher (56-70):</strong> More control, spin
            </div>
          </div>
        </div>
      </motion.div>

      {/* Special Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <label className="block text-sm font-black text-racket-black mb-4 uppercase tracking-wider">
          Special Instructions (Optional)
        </label>
        <textarea
          rows={4}
          placeholder="Any special requests for the stringer..."
          value={orderData.special_instructions}
          onChange={(e) => setOrderData({ ...orderData, special_instructions: e.target.value })}
          className="w-full px-6 py-5 border-4 border-gray-200 rounded-2xl focus:border-racket-black focus:outline-none text-lg transition-all resize-none"
        />
      </motion.div>

      {/* Grip Selection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-3xl font-bold text-racket-black mb-6">Overgrip Choice</h3>
        <p className="text-racket-gray mb-6">Select your preferred overgrip (included with Dampener Bundle or +$3)</p>
        
        <div className="grid md:grid-cols-3 gap-4">
          {GRIP_OPTIONS.map((grip) => (
            <motion.button
              key={grip.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setOrderData({ ...orderData, overgrip_choice: grip.name })}
              className={`p-5 rounded-2xl font-bold transition-all ${
                orderData.overgrip_choice === grip.name
                  ? 'bg-racket-red text-white shadow-xl'
                  : 'bg-white border-3 border-gray-200 text-racket-black hover:border-racket-red/30'
              }`}
            >
              <div className="text-lg mb-1">{grip.name}</div>
              <div className={`text-sm ${orderData.overgrip_choice === grip.name ? 'text-white/80' : 'text-racket-gray'}`}>
                ${grip.price} retail
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Add-ons - SERVICE-BASED */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h3 className="text-3xl font-bold text-racket-black mb-6">Service Add-Ons</h3>
        
        {/* Main Add-ons */}
        <label className="relative block cursor-pointer">
          <input
            type="checkbox"
            checked={orderData.add_regrip}
            onChange={(e) => setOrderData({ ...orderData, add_regrip: e.target.checked })}
            className="sr-only peer"
          />
          <div className="p-6 bg-white border-4 border-gray-200 rounded-2xl peer-checked:border-racket-red peer-checked:bg-racket-red peer-checked:text-white transition-all duration-300 peer-checked:shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold block mb-1">Replacement Grip</span>
                <span className="text-base opacity-80">Premium base grip replacement</span>
              </div>
              <span className="text-4xl font-black">+$10</span>
            </div>
          </div>
        </label>

        {/* Dampener Bundle */}
        <label className="relative block cursor-pointer">
          <input
            type="checkbox"
            checked={orderData.dampener_bundle}
            onChange={(e) => setOrderData({ ...orderData, dampener_bundle: e.target.checked })}
            className="sr-only peer"
          />
          <div className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-4 border-orange-200 rounded-2xl peer-checked:border-racket-orange peer-checked:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl font-bold text-racket-black">Dampener Bundle</span>
                  <span className="bg-racket-green text-white text-xs px-3 py-1 rounded-full font-bold">
                    SAVE $1
                  </span>
                </div>
                <span className="text-base text-racket-gray">Overgrip + Dampener combo</span>
              </div>
              <span className="text-4xl font-black text-racket-orange">$7</span>
            </div>
          </div>
        </label>

        {/* Extra Service Add-ons */}
        <div className="grid md:grid-cols-2 gap-4">
          {SERVICE_ADDONS.slice(0, 4).map((addon) => (
            <label key={addon.id} className="relative block cursor-pointer">
              <input
                type="checkbox"
                checked={orderData[addon.id] || false}
                onChange={(e) => setOrderData({ ...orderData, [addon.id]: e.target.checked })}
                className="sr-only peer"
              />
              <div className="p-5 bg-gray-50 border-3 border-gray-200 rounded-xl peer-checked:border-racket-black peer-checked:bg-racket-black/5 transition-all hover:border-gray-300">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-bold text-racket-black">{addon.name}</span>
                  <span className="text-2xl font-black text-racket-red">
                    {addon.price === 0 ? 'FREE' : `+$${addon.price}`}
                  </span>
                </div>
                <p className="text-sm text-racket-gray">{addon.description}</p>
              </div>
            </label>
          ))}
        </div>

        {/* Second Racket */}
        <label className="relative block cursor-pointer">
          <input
            type="checkbox"
            checked={orderData.add_second_racket}
            onChange={(e) => setOrderData({ ...orderData, add_second_racket: e.target.checked })}
            className="sr-only peer"
          />
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-4 border-blue-200 rounded-2xl peer-checked:border-racket-blue peer-checked:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-2xl font-bold text-racket-black block mb-1">Add Second Racket</span>
                <span className="text-base text-racket-gray">Same service + string for additional racket</span>
              </div>
              <span className="text-4xl font-black text-racket-blue">
                +${getServicePrice(orderData.service_package)}
              </span>
            </div>
          </div>
        </label>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrev}
          className="inline-flex items-center gap-3 bg-gray-200 text-racket-black px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(3,7,7,0.3)" }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!isValid}
          className="inline-flex items-center gap-4 bg-racket-black text-white px-12 py-6 rounded-full text-2xl font-black shadow-2xl disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          Continue to Pickup
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
