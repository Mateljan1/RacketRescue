'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { PRICING } from '@/lib/pricing'

// Extract from centralized pricing
const MEMBERSHIP_FEE = PRICING.membership.standard.monthly
const PICKUP_FEE = PRICING.delivery.pickupFee
const LABOR_DISCOUNT = PRICING.membership.standard.laborDiscount
const AVG_LABOR_COST = PRICING.services.match_ready

export default function MembershipCalculator() {
  const [stringsPerMonth, setStringsPerMonth] = useState(2)

  // Calculate savings
  const pickupSavings = stringsPerMonth * PICKUP_FEE
  const laborSavings = Math.round(stringsPerMonth * AVG_LABOR_COST * LABOR_DISCOUNT * 10) / 10
  const totalBenefits = pickupSavings + laborSavings
  const netSavings = totalBenefits - MEMBERSHIP_FEE

  return (
    <section className="py-32 bg-gradient-to-br from-racket-green/10 to-green-50">
      <div className="container-racket max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl shadow-2xl p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-racket-black mb-4">
              Save More With Membership
            </h2>
            <p className="text-2xl text-racket-gray">
              {stringsPerMonth >= 2 ? 'Membership pays for itself!' : 'String more to maximize savings'}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <label
              htmlFor="membership-calc"
              className="block text-lg font-bold text-racket-black mb-4 text-center"
            >
              How many times do you string per month?
            </label>
            <div className="text-center mb-6">
              <span className="text-5xl font-black text-racket-red">{stringsPerMonth}</span>
              <span className="text-2xl text-racket-gray ml-2">
                {stringsPerMonth === 1 ? 'time' : 'times'}
              </span>
            </div>
            <div className="flex items-center gap-4 mb-12 px-4">
              <span className="text-racket-gray font-medium">1</span>
              <input
                type="range"
                min="1"
                max="8"
                value={stringsPerMonth}
                onChange={(e) => setStringsPerMonth(parseInt(e.target.value))}
                className="flex-1 h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-racket-green"
                id="membership-calc"
              />
              <span className="text-racket-gray font-medium">8</span>
            </div>

            <div
              className={`rounded-3xl p-10 text-center mb-10 transition-all ${
                netSavings > 0
                  ? 'bg-gradient-to-r from-racket-green to-green-600 text-white'
                  : 'bg-gray-100 text-racket-black'
              }`}
            >
              <div className={`text-sm font-bold mb-3 ${netSavings > 0 ? '' : 'text-racket-gray'}`}>
                WITH STANDARD MEMBERSHIP (${MEMBERSHIP_FEE}/mo):
              </div>
              <div className="text-6xl font-black mb-3">
                {netSavings > 0 ? `Save $${Math.round(netSavings)}` : `$${Math.abs(Math.round(netSavings))} extra`}
              </div>
              <div className={`text-xl ${netSavings > 0 ? 'opacity-90' : 'text-racket-gray'}`}>
                per month ({stringsPerMonth} {stringsPerMonth === 1 ? 'order' : 'orders'})
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-3xl font-bold text-racket-red mb-2">${pickupSavings}</div>
                <div className="text-racket-gray">Saved on pickup</div>
                <div className="text-sm text-racket-gray">({stringsPerMonth} {stringsPerMonth === 1 ? 'order' : 'orders'} × ${PICKUP_FEE})</div>
              </div>
              <div className="text-center p-6 bg-gray-50 rounded-2xl">
                <div className="text-3xl font-bold text-racket-red mb-2">${laborSavings.toFixed(0)}</div>
                <div className="text-racket-gray">Saved on labor</div>
                <div className="text-sm text-racket-gray">(10% off × {stringsPerMonth})</div>
              </div>
            </div>

            {netSavings <= 0 && (
              <p className="text-center text-racket-gray mt-6">
                String at least 2× per month to start saving!
              </p>
            )}

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-10"
            >
              <Link
                href="/membership"
                className="block w-full bg-racket-red text-white py-5 rounded-full text-xl font-bold text-center hover:bg-red-600 transition-colors"
              >
                Try Standard Free for 30 Days →
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
