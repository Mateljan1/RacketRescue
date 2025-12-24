'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Check, Crown, Sparkles, MapPin, Calendar } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface Props {
  orderData: any
  pricing: any
  onPrev: () => void
}

export default function OrderReview({ orderData, pricing, onPrev }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const serviceLabels = {
    match_ready: 'Match-Ready Service',
    pro_performance: 'Pro-Performance Service',
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    // TODO: Integrate with Base44 API
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderPlaced(true)
    }, 2000)
  }

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl p-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex p-8 bg-racket-green/20 rounded-full mb-8"
        >
          <Check className="w-20 h-20 text-racket-green" />
        </motion.div>

        <h2 className="text-5xl font-bold text-racket-black mb-6">
          Order Confirmed!
        </h2>
        <p className="text-2xl text-racket-gray mb-4">
          We&apos;ll pick up your racket soon
        </p>
        <p className="text-racket-gray mb-12">
          You&apos;ll receive a confirmation email with pickup details
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 bg-racket-red text-white px-8 py-4 rounded-full font-bold hover:bg-red-600 transition-colors"
          >
            View Order Status
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gray-200 text-racket-black px-8 py-4 rounded-full font-bold hover:bg-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-10"
      >
        <div className="flex items-center gap-4 mb-10">
          <div className="p-4 bg-racket-green/10 rounded-2xl">
            <Check className="w-8 h-8 text-racket-green" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-racket-black">Review Your Order</h2>
            <p className="text-racket-gray text-lg">Confirm everything looks good</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Service Details */}
          <div className="p-8 bg-gray-50 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-racket-black mb-6">Service Details</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-racket-gray">Service Package:</span>
                  <span className="font-bold text-racket-black">{serviceLabels[orderData.service_package as keyof typeof serviceLabels]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-racket-gray">String:</span>
                  <span className="font-bold text-racket-black">
                    {orderData.customer_provides_string ? 'Customer Provided' : orderData.string_name}
                  </span>
                </div>
                {orderData.is_express && (
                  <div className="flex justify-between items-center">
                    <span className="text-racket-gray">Express Service:</span>
                    <span className="inline-flex items-center gap-1 bg-racket-orange/20 text-racket-orange px-3 py-1 rounded-full font-bold text-sm">
                      <Sparkles className="w-4 h-4" />
                      Next-Day
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-racket-gray">Racket Brand:</span>
                  <span className="font-bold text-racket-black">{orderData.racket_brand}</span>
                </div>
                {orderData.racket_model && (
                  <div className="flex justify-between">
                    <span className="text-racket-gray">Model:</span>
                    <span className="font-bold text-racket-black">{orderData.racket_model}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-racket-gray">Main Tension:</span>
                  <span className="font-bold text-racket-black">{orderData.main_tension} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-racket-gray">Cross Tension:</span>
                  <span className="font-bold text-racket-black">{orderData.cross_tension} lbs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pickup & Delivery */}
          <div className="p-8 bg-racket-blue/10 rounded-2xl space-y-6">
            <h3 className="text-xl font-bold text-racket-black flex items-center gap-3">
              <MapPin className="w-6 h-6 text-racket-blue" />
              Pickup & Delivery
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-sm font-bold text-racket-gray mb-2">PICKUP</div>
                <p className="text-lg text-racket-black">{orderData.pickup_address}</p>
                <p className="text-sm text-racket-gray mt-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(orderData.pickup_time).toLocaleString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <div>
                <div className="text-sm font-bold text-racket-gray mb-2">DELIVERY</div>
                <p className="text-lg text-racket-black">{orderData.delivery_address}</p>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-8 bg-white border-4 border-racket-red/20 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-racket-black mb-6">Pricing Breakdown</h3>
            
            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span className="text-racket-gray">Labor ({serviceLabels[orderData.service_package as keyof typeof serviceLabels]})</span>
                <span className="font-bold text-racket-black">${pricing.serviceLabor.toFixed(2)}</span>
              </div>
              
              {!orderData.customer_provides_string && (
                <div className="flex justify-between">
                  <span className="text-racket-gray">String ({orderData.string_name})</span>
                  <span className="font-bold text-racket-black">${pricing.stringPrice.toFixed(2)}</span>
                </div>
              )}

              {pricing.expressFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-racket-gray flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-racket-orange" />
                    Express Service
                  </span>
                  <span className="font-bold text-racket-orange">+${pricing.expressFee.toFixed(2)}</span>
                </div>
              )}

              {pricing.regripFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-racket-gray">Re-grip</span>
                  <span className="font-bold text-racket-black">+${pricing.regripFee.toFixed(2)}</span>
                </div>
              )}

              {pricing.dampenerFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-racket-gray">
                    {orderData.dampener_bundle ? 'Dampener Bundle' : 'Add-ons'}
                  </span>
                  <span className="font-bold text-racket-black">+${pricing.dampenerFee.toFixed(2)}</span>
                </div>
              )}

              {pricing.secondRacketFee > 0 && (
                <div className="flex justify-between">
                  <span className="text-racket-gray">Second Racket</span>
                  <span className="font-bold text-racket-black">+${pricing.secondRacketFee.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between border-t-2 border-gray-200 pt-3">
                <span className="text-racket-gray">Subtotal</span>
                <span className="font-bold text-racket-black">${pricing.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-racket-gray">Pickup & Delivery</span>
                <span className="font-bold text-racket-black">${pricing.pickupFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between items-center border-t-4 border-racket-red/20 pt-4 mt-4">
                <span className="text-2xl font-bold text-racket-black">Total</span>
                <span className="text-4xl font-bold text-racket-red">${pricing.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Member Savings Callout */}
            <div className="mt-6 p-6 bg-racket-green/10 border-2 border-racket-green/30 rounded-xl">
              <div className="flex items-center gap-3 mb-2">
                <Crown className="w-6 h-6 text-racket-green" />
                <span className="font-bold text-racket-black text-lg">Save with Membership</span>
              </div>
              <p className="text-racket-gray">
                <strong className="text-racket-green">Standard members save $15</strong> on pickup & delivery 
                plus 10% off labor on every order!
              </p>
              <Link
                href="/membership"
                className="inline-block mt-4 text-racket-green font-semibold hover:underline"
              >
                Learn more about memberships →
              </Link>
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
          disabled={isSubmitting}
          className="inline-flex items-center gap-3 bg-gray-200 text-racket-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-300 transition-colors disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-racket-red to-red-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isSubmitting ? (
            <>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-6 h-6 border-4 border-white border-t-transparent rounded-full"
              />
              Placing Order...
            </>
          ) : (
            <>
              <Check className="w-7 h-7" />
              Confirm Order
            </>
          )}
        </motion.button>
      </div>
    </div>
  )
}

