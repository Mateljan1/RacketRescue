'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, CreditCard, Lock } from 'lucide-react'

interface OrderData {
  service_package: string
  racket_brand: string
  racket_model: string
  string_type: string
  string_name: string
  string_price: number
  customer_provides_string: boolean
  main_tension: number
  cross_tension: number
  is_express: boolean
  add_regrip: boolean
  add_overgrip: boolean
  add_dampener: boolean
  dampener_bundle: boolean
  add_second_racket: boolean
  pickup_address: string
  delivery_address: string
  pickup_time: string
  special_instructions: string
  is_member?: boolean
}

interface CheckoutButtonProps {
  orderData: OrderData
  totalAmount: number
  customerEmail?: string
  customerName?: string
  className?: string
}

export default function CheckoutButton({
  orderData,
  totalAmount,
  customerEmail,
  customerName,
  className = '',
}: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleCheckout = async () => {
    setIsLoading(true)
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
            customer_email: customerEmail,
            customer_name: customerName,
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
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: isLoading ? 1 : 1.02 }}
        whileTap={{ scale: isLoading ? 1 : 0.98 }}
        onClick={handleCheckout}
        disabled={isLoading}
        className={`
          w-full flex items-center justify-center gap-3
          bg-racket-red text-white py-5 rounded-full
          text-xl font-bold shadow-xl
          hover:bg-red-600 transition-all
          disabled:opacity-70 disabled:cursor-not-allowed
          ${className}
        `}
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-6 h-6" />
            Pay ${totalAmount.toFixed(2)}
          </>
        )}
      </motion.button>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-center"
        >
          {error}
        </motion.div>
      )}

      <div className="flex items-center justify-center gap-2 text-sm text-racket-gray">
        <Lock className="w-4 h-4" />
        <span>Secured by Stripe. Your payment info is never stored.</span>
      </div>
    </div>
  )
}
