'use client'

import { motion } from 'framer-motion'
import { DollarSign } from 'lucide-react'

interface Props {
  orderData: any
}

export default function PriceCalculator({ orderData }: Props) {
  const calculateTotal = () => {
    const serviceLabor = orderData.service_package === 'match_ready' ? 35 : 50
    const stringPrice = orderData.customer_provides_string ? 0 : (orderData.string_price || 18)
    const expressFee = orderData.is_express ? 15 : 0
    const pickupFee = 15 // Would check membership status in real app

    const total = serviceLabor + stringPrice + expressFee + pickupFee

    return {
      service: serviceLabor,
      string: stringPrice,
      express: expressFee,
      pickup: pickupFee,
      total,
    }
  }

  const pricing = calculateTotal()

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-24 right-8 z-40 hidden lg:block"
    >
      <div className="bg-white rounded-2xl shadow-2xl p-6 border-4 border-racket-red/20 min-w-[280px]">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b-2 border-gray-200">
          <div className="p-2 bg-racket-green/10 rounded-lg">
            <DollarSign className="w-6 h-6 text-racket-green" />
          </div>
          <h3 className="font-bold text-racket-black text-lg">Your Total</h3>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-racket-gray">Service:</span>
            <span className="font-bold text-racket-black">${pricing.service}</span>
          </div>
          {pricing.string > 0 && (
            <div className="flex justify-between">
              <span className="text-racket-gray">String:</span>
              <span className="font-bold text-racket-black">${pricing.string}</span>
            </div>
          )}
          {pricing.express > 0 && (
            <div className="flex justify-between">
              <span className="text-racket-gray">Express:</span>
              <span className="font-bold text-racket-orange">+${pricing.express}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-racket-gray">Pickup:</span>
            <span className="font-bold text-racket-black">${pricing.pickup}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t-4 border-racket-red/20 flex justify-between items-center">
          <span className="text-xl font-bold text-racket-black">Total:</span>
          <motion.span
            key={pricing.total}
            initial={{ scale: 1.2, color: '#10b981' }}
            animate={{ scale: 1, color: '#ec1f27' }}
            className="text-4xl font-black"
          >
            ${pricing.total}
          </motion.span>
        </div>

        <div className="mt-4 text-xs text-racket-gray text-center">
          <div className="mb-2">💡 Members save $15 on pickup</div>
          <div className="font-semibold text-racket-green">Your total would be: ${pricing.total - 15}</div>
        </div>
      </div>
    </motion.div>
  )
}

