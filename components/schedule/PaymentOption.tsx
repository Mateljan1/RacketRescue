'use client'

import { motion } from 'framer-motion'
import { CreditCard, Truck, Check, Lock } from 'lucide-react'

interface Props {
  total: number
  onPaymentChoice: (method: 'now' | 'delivery') => void
  selectedMethod?: string
}

export default function PaymentOption({ total, onPaymentChoice, selectedMethod }: Props) {
  const prepayDiscount = total * 0.05
  const prepayTotal = total - prepayDiscount

  return (
    <div className="space-y-6">
      <h3 className="text-3xl font-bold text-racket-black mb-8">Choose Payment</h3>

      {/* Pay Now (5% discount) */}
      <motion.label
        whileHover={{ scale: 1.02 }}
        className="relative block cursor-pointer"
      >
        <input
          type="radio"
          name="payment"
          value="now"
          onChange={() => onPaymentChoice('now')}
          checked={selectedMethod === 'now'}
          className="sr-only peer"
        />
        <div className="p-8 bg-gradient-to-r from-racket-green/10 to-green-500/10 border-4 border-racket-green/30 rounded-3xl peer-checked:border-racket-green peer-checked:shadow-2xl transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-racket-green/20 rounded-2xl">
                <CreditCard className="w-8 h-8 text-racket-green" />
              </div>
              <div>
                <div className="text-2xl font-bold text-racket-black mb-1">Pay Now</div>
                <div className="flex items-center gap-2">
                  <span className="bg-racket-green text-white px-3 py-1 rounded-full text-sm font-bold">
                    SAVE 5%
                  </span>
                  <span className="text-racket-gray">Secure payment via Stripe</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-racket-gray line-through">${total}</div>
              <div className="text-5xl font-black text-racket-green">${prepayTotal.toFixed(0)}</div>
            </div>
          </div>
          
          <ul className="space-y-2 pl-16">
            <li className="flex items-center gap-2 text-racket-gray">
              <Check className="w-4 h-4 text-racket-green" />
              5% discount (save ${prepayDiscount.toFixed(2)})
            </li>
            <li className="flex items-center gap-2 text-racket-gray">
              <Check className="w-4 h-4 text-racket-green" />
              Guaranteed spot in queue
            </li>
            <li className="flex items-center gap-2 text-racket-gray">
              <Lock className="w-4 h-4 text-racket-gray" />
              Secure & encrypted
            </li>
          </ul>

          {selectedMethod === 'now' && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-6 pt-6 border-t-2 border-racket-green/20"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
                <p className="text-sm text-racket-gray text-center mb-4">
                  Stripe integration ready - Add your Stripe keys to enable
                </p>
                <button className="w-full bg-racket-green text-white py-4 rounded-full font-bold hover:bg-green-600 transition-colors">
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </motion.label>

      {/* Pay at Delivery */}
      <motion.label
        whileHover={{ scale: 1.02 }}
        className="relative block cursor-pointer"
      >
        <input
          type="radio"
          name="payment"
          value="delivery"
          onChange={() => onPaymentChoice('delivery')}
          checked={selectedMethod === 'delivery'}
          className="sr-only peer"
        />
        <div className="p-8 bg-white border-4 border-gray-200 rounded-3xl peer-checked:border-racket-blue peer-checked:shadow-2xl transition-all">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gray-100 rounded-2xl">
                <Truck className="w-8 h-8 text-racket-gray" />
              </div>
              <div>
                <div className="text-2xl font-bold text-racket-black mb-1">Pay at Delivery</div>
                <div className="text-racket-gray">Cash, card, or Venmo when we deliver</div>
              </div>
            </div>
            <div className="text-5xl font-black text-racket-black">${total}</div>
          </div>
        </div>
      </motion.label>

      <div className="text-center text-sm text-racket-gray pt-4">
        <Lock className="w-4 h-4 inline mr-2" />
        All payments secured by Stripe. We never store card details.
      </div>
    </div>
  )
}
