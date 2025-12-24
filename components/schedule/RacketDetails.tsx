'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Info } from 'lucide-react'

interface Props {
  orderData: any
  setOrderData: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

const popularBrands = ['Wilson', 'Babolat', 'Head', 'Yonex', 'Prince', 'Dunlop', 'Volkl']

export default function RacketDetails({ orderData, setOrderData, onNext, onPrev }: Props) {
  const isValid = orderData.racket_brand && orderData.main_tension && orderData.cross_tension

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-racket-black mb-3">Racket Details</h2>
        <p className="text-racket-gray text-lg mb-10">Tell us about your racket</p>

        <div className="space-y-8">
          {/* Racket Brand */}
          <div>
            <label className="block text-sm font-bold text-racket-black mb-3 uppercase tracking-wide">
              Racket Brand *
            </label>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-3 mb-4">
              {popularBrands.map((brand) => (
                <motion.button
                  key={brand}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setOrderData({ ...orderData, racket_brand: brand })}
                  className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                    orderData.racket_brand === brand
                      ? 'bg-racket-red text-white shadow-lg'
                      : 'bg-gray-100 text-racket-gray hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </motion.button>
              ))}
            </div>
            <input
              type="text"
              placeholder="Or type another brand..."
              value={!popularBrands.includes(orderData.racket_brand) ? orderData.racket_brand : ''}
              onChange={(e) => setOrderData({ ...orderData, racket_brand: e.target.value })}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none text-lg transition-colors"
            />
          </div>

          {/* Racket Model */}
          <div>
            <label className="block text-sm font-bold text-racket-black mb-3 uppercase tracking-wide">
              Model (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g., Pro Staff 97, Pure Aero..."
              value={orderData.racket_model}
              onChange={(e) => setOrderData({ ...orderData, racket_model: e.target.value })}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none text-lg transition-colors"
            />
          </div>

          {/* Tension */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-bold text-racket-black mb-3 uppercase tracking-wide">
                Main Tension (lbs) *
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="40"
                  max="70"
                  value={orderData.main_tension}
                  onChange={(e) => setOrderData({ ...orderData, main_tension: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-racket-red"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-racket-gray">40 lbs</span>
                  <div className="text-4xl font-bold text-racket-red">
                    {orderData.main_tension}
                  </div>
                  <span className="text-sm text-racket-gray">70 lbs</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-racket-black mb-3 uppercase tracking-wide">
                Cross Tension (lbs) *
              </label>
              <div className="space-y-4">
                <input
                  type="range"
                  min="40"
                  max="70"
                  value={orderData.cross_tension}
                  onChange={(e) => setOrderData({ ...orderData, cross_tension: parseInt(e.target.value) })}
                  className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-racket-red"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-racket-gray">40 lbs</span>
                  <div className="text-4xl font-bold text-racket-red">
                    {orderData.cross_tension}
                  </div>
                  <span className="text-sm text-racket-gray">70 lbs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm font-bold text-racket-black mb-3 uppercase tracking-wide">
              Special Instructions (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="Any special requests or notes for the stringer..."
              value={orderData.special_instructions}
              onChange={(e) => setOrderData({ ...orderData, special_instructions: e.target.value })}
              className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none text-lg transition-colors resize-none"
            />
          </div>

          {/* Add-ons */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl font-bold text-racket-black">Add-Ons</h3>
            
            {/* Re-grip */}
            <label className="flex items-center gap-4 p-5 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors group">
              <input
                type="checkbox"
                checked={orderData.add_regrip}
                onChange={(e) => setOrderData({ ...orderData, add_regrip: e.target.checked })}
                className="w-6 h-6 accent-racket-red"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-racket-black">Add Re-grip</span>
                  <span className="text-xl font-bold text-racket-red">+$10</span>
                </div>
                <p className="text-racket-gray text-sm">Premium replacement grip</p>
              </div>
            </label>

            {/* Dampener Bundle */}
            <label className="flex items-center gap-4 p-5 bg-racket-orange/10 border-2 border-racket-orange/30 rounded-xl cursor-pointer hover:bg-racket-orange/20 transition-colors group">
              <input
                type="checkbox"
                checked={orderData.dampener_bundle}
                onChange={(e) => setOrderData({ ...orderData, dampener_bundle: e.target.checked })}
                className="w-6 h-6 accent-racket-orange"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-lg font-semibold text-racket-black">Dampener Bundle</span>
                  <span className="text-xl font-bold text-racket-orange">$7</span>
                  <span className="text-xs bg-racket-green text-white px-2 py-0.5 rounded-full font-bold">SAVE $1</span>
                </div>
                <p className="text-racket-gray text-sm">Overgrip + Dampener combo</p>
              </div>
            </label>

            {/* Individual add-ons if not bundle */}
            {!orderData.dampener_bundle && (
              <div className="grid md:grid-cols-2 gap-4 pl-10">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={orderData.add_overgrip}
                    onChange={(e) => setOrderData({ ...orderData, add_overgrip: e.target.checked })}
                    className="w-5 h-5 accent-racket-red"
                  />
                  <div>
                    <span className="font-semibold text-racket-black">Overgrip</span>
                    <span className="ml-2 text-racket-red font-bold">+$3</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={orderData.add_dampener}
                    onChange={(e) => setOrderData({ ...orderData, add_dampener: e.target.checked })}
                    className="w-5 h-5 accent-racket-red"
                  />
                  <div>
                    <span className="font-semibold text-racket-black">Dampener</span>
                    <span className="ml-2 text-racket-red font-bold">+$5</span>
                  </div>
                </label>
              </div>
            )}

            {/* Second Racket */}
            <label className="flex items-center gap-4 p-5 bg-racket-blue/10 border-2 border-racket-blue/30 rounded-xl cursor-pointer hover:bg-racket-blue/20 transition-colors">
              <input
                type="checkbox"
                checked={orderData.add_second_racket}
                onChange={(e) => setOrderData({ ...orderData, add_second_racket: e.target.checked })}
                className="w-6 h-6 accent-racket-blue"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-racket-black">Add Second Racket</span>
                  <span className="text-xl font-bold text-racket-blue">
                    +${orderData.service_package === 'match_ready' ? 35 : 50}
                  </span>
                </div>
                <p className="text-racket-gray text-sm">Same service for an additional racket</p>
              </div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPrev}
          className="inline-flex items-center gap-3 bg-gray-200 text-racket-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!isValid}
          className="inline-flex items-center gap-3 bg-racket-red text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Continue
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  )
}

