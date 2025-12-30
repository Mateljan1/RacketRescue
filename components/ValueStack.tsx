'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles } from 'lucide-react'

interface ValueStackProps {
  variant?: 'hero' | 'card' | 'compact'
  showSavings?: boolean
}

const valueItems = [
  { label: 'Professional USRSA stringing', value: 75 },
  { label: 'Free pickup & delivery', value: 25 },
  { label: '24-hour turnaround guarantee', value: 20 },
  { label: 'String tension consultation', value: 15 },
]

const totalValue = valueItems.reduce((sum, item) => sum + item.value, 0)
const actualPrice = 55
const savingsPercent = Math.round(((totalValue - actualPrice) / totalValue) * 100)

export default function ValueStack({ variant = 'hero', showSavings = true }: ValueStackProps) {
  if (variant === 'compact') {
    return (
      <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
        <span className="text-white/60 line-through text-sm">${totalValue} value</span>
        <span className="text-white font-bold text-lg">${actualPrice}</span>
        <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          SAVE {savingsPercent}%
        </span>
      </div>
    )
  }

  if (variant === 'card') {
    return (
      <div className="bg-gradient-to-br from-racket-black to-racket-charcoal rounded-2xl p-6 text-white">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <span className="font-bold text-sm uppercase tracking-wide">What You Get</span>
        </div>

        <div className="space-y-3 mb-6">
          {valueItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white/90">{item.label}</span>
              </div>
              <span className="text-white/50 text-sm">${item.value}</span>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/20 pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/60">Total Value</span>
            <span className="text-white/60 line-through">${totalValue}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg">Your Price</span>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-black text-racket-red">${actualPrice}</span>
              {showSavings && (
                <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {savingsPercent}% OFF
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Hero variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 max-w-md mx-auto border border-white/20"
    >
      <div className="flex items-center justify-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-yellow-400" />
        <span className="font-bold text-white text-sm uppercase tracking-wide">
          Complete Service Package
        </span>
      </div>

      <div className="space-y-2 mb-4">
        {valueItems.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-white/90">{item.label}</span>
            </div>
            <span className="text-white/50">${item.value}</span>
          </motion.div>
        ))}
      </div>

      <div className="border-t border-white/20 pt-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white/60 text-sm">Total Value</span>
          <span className="text-white/60 line-through text-sm">${totalValue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-white">Your Price</span>
          <div className="flex items-center gap-3">
            <span className="text-4xl font-black text-white">${actualPrice}</span>
            {showSavings && (
              <span className="bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                SAVE {savingsPercent}%
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
