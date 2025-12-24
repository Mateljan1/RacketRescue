'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, MapPin, Home, Clock } from 'lucide-react'
import { useState } from 'react'

interface Props {
  orderData: any
  setOrderData: (data: any) => void
  onNext: () => void
  onPrev: () => void
}

export default function PickupSchedule({ orderData, setOrderData, onNext, onPrev }: Props) {
  const [sameAddress, setSameAddress] = useState(true)

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDateTime = tomorrow.toISOString().slice(0, 16)

  const handleSameAddressChange = (checked: boolean) => {
    setSameAddress(checked)
    if (checked) {
      setOrderData({ ...orderData, delivery_address: orderData.pickup_address })
    }
  }

  const isValid = orderData.pickup_address && orderData.delivery_address && orderData.pickup_time

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-10"
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-racket-red/10 rounded-2xl">
            <MapPin className="w-8 h-8 text-racket-red" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-racket-black">Pickup & Delivery</h2>
            <p className="text-racket-gray text-lg">Schedule your convenient service</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Pickup Address */}
          <div>
            <label className="block text-sm font-bold text-racket-black mb-3 uppercase tracking-wide">
              Pickup Address *
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your pickup address in Laguna Beach..."
                value={orderData.pickup_address}
                onChange={(e) => {
                  setOrderData({ ...orderData, pickup_address: e.target.value })
                  if (sameAddress) {
                    setOrderData({ ...orderData, pickup_address: e.target.value, delivery_address: e.target.value })
                  }
                }}
                className="w-full pl-6 pr-14 py-5 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none text-lg transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-racket-red/10 rounded-lg">
                <Home className="w-6 h-6 text-racket-red" />
              </div>
            </div>
          </div>

          {/* Same Address Toggle */}
          <label className="flex items-center gap-4 p-5 bg-racket-green/10 border-2 border-racket-green/30 rounded-xl cursor-pointer hover:bg-racket-green/20 transition-colors">
            <input
              type="checkbox"
              checked={sameAddress}
              onChange={(e) => handleSameAddressChange(e.target.checked)}
              className="w-6 h-6 accent-racket-green"
            />
            <span className="text-lg font-semibold text-racket-black">
              Deliver to same address
            </span>
          </label>

          {/* Delivery Address */}
          {!sameAddress && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="block text-sm font-bold text-racket-black mb-3 uppercase tracking-wide">
                Delivery Address *
              </label>
              <input
                type="text"
                placeholder="Enter your delivery address..."
                value={orderData.delivery_address}
                onChange={(e) => setOrderData({ ...orderData, delivery_address: e.target.value })}
                className="w-full px-6 py-5 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none text-lg transition-colors"
              />
            </motion.div>
          )}

          {/* Pickup Time */}
          <div>
            <label className="block text-sm font-bold text-racket-black mb-3 uppercase tracking-wide">
              Preferred Pickup Time *
            </label>
            <div className="relative">
              <input
                type="datetime-local"
                min={minDateTime}
                value={orderData.pickup_time}
                onChange={(e) => setOrderData({ ...orderData, pickup_time: e.target.value })}
                className="w-full pl-6 pr-14 py-5 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none text-lg transition-colors"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-racket-blue/10 rounded-lg">
                <Clock className="w-6 h-6 text-racket-blue" />
              </div>
            </div>
            <p className="mt-3 text-sm text-racket-gray flex items-center gap-2">
              <Home className="w-4 h-4" />
              We&apos;ll contact you to confirm the exact pickup time
            </p>
          </div>

          {/* Pickup Fee Notice */}
          <div className="p-6 bg-racket-blue/10 border-2 border-racket-blue/30 rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-racket-blue/20 rounded-lg">
                <MapPin className="w-6 h-6 text-racket-blue" />
              </div>
              <div>
                <h4 className="font-bold text-racket-black mb-2">Pickup & Delivery Fee: $15</h4>
                <p className="text-racket-gray">
                  <strong className="text-racket-green">FREE for Standard, Elite & Family members!</strong>
                  {' '}Join a membership to save $15 on every order.
                </p>
              </div>
            </div>
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

