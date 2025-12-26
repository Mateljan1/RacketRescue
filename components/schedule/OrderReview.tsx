'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Check, Crown, Sparkles, MapPin, Calendar, CreditCard, Lock, Loader2 } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

interface Props {
  orderData: any
  pricing: any
  onPrev: () => void
}

export default function OrderReview({ orderData, pricing, onPrev }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const serviceLabels = {
    match_ready: 'Match-Ready Service',
    pro_performance: 'Pro-Performance Service',
  }

  const handleCheckout = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderData: {
            ...orderData,
            customer_email: email,
            customer_name: name,
          },
          mode: 'stringing',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('No checkout URL received')
      }

    } catch (err) {
      console.error('Checkout error:', err)
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsSubmitting(false)
    }
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

          {/* Contact Info for Checkout */}
          <div className="p-8 bg-white border-2 border-gray-200 rounded-2xl space-y-4">
            <h3 className="text-xl font-bold text-racket-black mb-6">Contact Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-racket-gray mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-racket-gray mb-2">
                  Email Address <span className="text-racket-red">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none transition-colors"
                />
              </div>
            </div>
            <p className="text-sm text-racket-gray">
              We&apos;ll send your order confirmation and tracking updates to this email.
            </p>
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

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center font-medium"
        >
          {error}
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
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

        <div className="flex-1 max-w-md ml-6">
          <motion.button
            whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
            whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            onClick={handleCheckout}
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center gap-3 bg-gradient-to-r from-racket-red to-red-600 text-white px-12 py-5 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl disabled:opacity-70 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-6 h-6 animate-spin" />
                Redirecting to Checkout...
              </>
            ) : (
              <>
                <CreditCard className="w-7 h-7" />
                Pay ${pricing.total.toFixed(2)}
              </>
            )}
          </motion.button>

          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-racket-gray">
            <Lock className="w-4 h-4" />
            <span>Secured by Stripe</span>
          </div>
        </div>
      </div>
    </div>
  )
}
