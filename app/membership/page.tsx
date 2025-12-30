'use client'

import { motion } from 'framer-motion'
import { Crown, Star, Users, Sparkles, Check, Zap, Calculator, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const plans = [
  {
    id: 'basic',
    name: 'Pay-As-You-Go',
    price: 0,
    period: 'No commitment',
    icon: Star,
    color: 'gray',
    description: 'Perfect for occasional players. Pay only when you need us.',
    benefits: [
      '$55 standard stringing',
      '$65 same-day rush',
      'Text notifications',
      '$10 pickup fee per visit',
    ],
    alaCarteOptions: [
      { name: 'Same-Day Rush', price: 10 },
      { name: 'Pickup & Delivery', price: 10 },
    ],
  },
  {
    id: 'rescue-club',
    name: 'Rescue Club',
    price: 19,
    annualPrice: 190,
    period: 'per month',
    icon: Crown,
    color: 'red',
    description: 'For regular players who want convenience and savings.',
    benefits: [
      '2 FREE pickups per month ($20 value)',
      '10% off all stringing services',
      'Priority text notifications',
      'Member-only scheduling slots',
      'Free grip replacement (1/month)',
    ],
    popular: true,
    trial: 'Try FREE for 14 days',
    savings: 'Save $25+/month',
  },
  {
    id: 'elite-performance',
    name: 'Elite Performance',
    price: 79,
    annualPrice: 790,
    period: 'per month',
    icon: Sparkles,
    color: 'black',
    description: 'For serious competitors who string frequently.',
    benefits: [
      'UNLIMITED free pickups',
      '4 restrings per month included',
      'Same-day rush at no extra cost',
      'Premium string options',
      'Dedicated stringer assigned',
      'VIP scheduling priority',
    ],
    trial: 'Try for $1 first month',
    savings: 'Save $150+/month',
    premium: true,
  },
  {
    id: 'family',
    name: 'Family Plan',
    price: 35,
    annualPrice: 350,
    period: 'per month',
    icon: Users,
    color: 'purple',
    description: 'Rescue Club benefits for your whole household (up to 4 players).',
    benefits: [
      'All Rescue Club benefits',
      'Covers up to 4 family members',
      '4 FREE pickups per month',
      'Shared family dashboard',
      'Coordinated pickup scheduling',
    ],
    new: true,
    savings: 'Best for families',
  },
]

export default function MembershipPage() {
  const [ordersPerMonth, setOrdersPerMonth] = useState(3)
  const [selectedPlan, setSelectedPlan] = useState('rescue-club')

  // Calculate savings based on new pricing
  const calculateSavings = (planId: string) => {
    if (planId === 'basic') return 0

    const plan = plans.find(p => p.id === planId)
    if (!plan) return 0

    if (planId === 'rescue-club') {
      // 2 free pickups ($10 each = $20) + 10% off stringing (~$5.50 per order)
      const pickupSavings = Math.min(ordersPerMonth, 2) * 10
      const discountSavings = ordersPerMonth * 5.5
      return Math.round(pickupSavings + discountSavings - plan.price)
    }

    if (planId === 'elite-performance') {
      // Unlimited pickups ($10 each) + 4 included restrings ($55 each = $220 value)
      const pickupSavings = ordersPerMonth * 10
      const restringSavings = Math.min(ordersPerMonth, 4) * 55
      return Math.round(pickupSavings + restringSavings - plan.price)
    }

    if (planId === 'family') {
      // 4 free pickups + 10% off for whole family
      const pickupSavings = Math.min(ordersPerMonth, 4) * 10
      const discountSavings = ordersPerMonth * 5.5
      return Math.round(pickupSavings + discountSavings - plan.price)
    }

    return 0
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-racket-black to-racket-charcoal text-white">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6">
              Join the Rescue Club
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Stop paying pickup fees. Start saving on every restring.
              <span className="block mt-2 text-racket-red font-bold">Try free for 14 days.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ROI Calculator */}
      <section className="py-16 bg-racket-lightgray">
        <div className="container-racket max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-10"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-racket-green/10 rounded-2xl">
                <Calculator className="w-8 h-8 text-racket-green" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-racket-black">Calculate Your Savings</h2>
                <p className="text-racket-gray text-lg">See how much you&apos;ll save with membership</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-racket-black mb-4">
                  How many times do you string per month?
                </label>
                <input
                  type="range"
                  min="1"
                  max="8"
                  value={ordersPerMonth}
                  onChange={(e) => setOrdersPerMonth(parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-racket-red"
                />
                <div className="flex justify-between mt-4">
                  <span className="text-racket-gray">1/month</span>
                  <div className="text-5xl font-bold text-racket-red">{ordersPerMonth}</div>
                  <span className="text-racket-gray">8/month</span>
                </div>
              </div>

              {/* Savings Comparison */}
              <div className="grid md:grid-cols-2 gap-6">
                {plans.filter(p => p.id === 'rescue-club' || p.id === 'elite-performance').map((plan) => {
                  const savings = calculateSavings(plan.id)
                  return (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.03 }}
                      className={`p-8 rounded-2xl text-center ${
                        plan.premium
                          ? 'bg-gradient-to-br from-racket-black to-racket-charcoal text-white'
                          : 'bg-gradient-to-br from-racket-green/10 to-racket-green/5 border-2 border-racket-green/30'
                      }`}
                    >
                      <h3 className={`font-headline font-bold text-2xl mb-2 ${plan.premium ? 'text-white' : 'text-racket-black'}`}>
                        {plan.name}
                      </h3>
                      <div className="text-lg mb-4 opacity-80">${plan.price}/month</div>
                      <div className={`text-5xl font-bold mb-2 ${plan.premium ? 'text-racket-green' : 'text-racket-green'}`}>
                        ${savings > 0 ? savings : 0}
                      </div>
                      <div className={`text-sm ${plan.premium ? 'text-white/70' : 'text-racket-gray'}`}>saved per month</div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Membership Plans */}
      <section className="py-24 bg-white">
        <div className="container-racket">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, i) => {
              const Icon = plan.icon
              const isSelected = selectedPlan === plan.id

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`relative cursor-pointer bg-white rounded-3xl p-8 border-4 transition-all ${
                    plan.premium
                      ? 'bg-gradient-to-br from-racket-black to-racket-charcoal text-white border-racket-black'
                      : isSelected
                      ? 'border-racket-red shadow-xl'
                      : 'border-gray-200 hover:border-gray-300 shadow-lg'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-2 bg-racket-red text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        <Crown className="w-4 h-4" />
                        MOST POPULAR
                      </span>
                    </div>
                  )}

                  {plan.new && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                        <Sparkles className="w-4 h-4" />
                        NEW
                      </span>
                    </div>
                  )}

                  <div className="text-center space-y-6">
                    <div className={`inline-flex p-4 rounded-2xl ${
                      plan.premium ? 'bg-white/10' : 'bg-gray-50'
                    }`}>
                      <Icon className={`w-8 h-8 ${plan.premium ? 'text-white' : 'text-racket-red'}`} />
                    </div>

                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${plan.premium ? 'text-white' : 'text-racket-black'}`}>
                        {plan.name}
                      </h3>
                      <p className={`text-sm ${plan.premium ? 'text-white/70' : 'text-racket-gray'} h-16`}>
                        {plan.description}
                      </p>
                    </div>

                    <div>
                      <div className={`text-5xl font-bold mb-2 ${plan.premium ? 'text-white' : 'text-racket-red'}`}>
                        ${plan.price}
                      </div>
                      <div className={plan.premium ? 'text-white/70' : 'text-racket-gray'}>
                        {plan.period}
                      </div>
                      {plan.annualPrice && (
                        <div className="mt-3 text-sm">
                          <span className={`font-bold ${plan.premium ? 'text-racket-green' : 'text-racket-green'}`}>
                            ${plan.annualPrice}/year
                          </span>
                          <span className={`ml-2 ${plan.premium ? 'text-white/60' : 'text-racket-gray'}`}>
                            Save 2 months!
                          </span>
                        </div>
                      )}
                    </div>

                    {plan.trial && (
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                        plan.premium ? 'bg-white/20 text-white' : 'bg-racket-green/20 text-racket-green'
                      }`}>
                        <Zap className="w-4 h-4" />
                        {plan.trial}
                      </div>
                    )}

                    <ul className="space-y-3 text-left">
                      {plan.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3">
                          <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                            plan.premium ? 'text-racket-green' : 'text-racket-green'
                          }`} />
                          <span className={plan.premium ? 'text-white/90' : 'text-racket-gray'}>
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {plan.alaCarteOptions && (
                      <div className="pt-4 border-t border-gray-200 text-left">
                        <h4 className="text-sm font-bold text-racket-gray mb-3">À La Carte Add-ons:</h4>
                        <ul className="space-y-2 text-sm text-racket-gray">
                          {plan.alaCarteOptions.map((option) => (
                            <li key={option.name} className="flex justify-between">
                              <span>{option.name}</span>
                              <span className="font-bold">+${option.price}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-4 rounded-full font-bold text-lg transition-all ${
                        plan.premium
                          ? 'bg-white text-racket-red hover:bg-gray-100'
                          : plan.id === 'basic'
                          ? 'bg-gray-200 text-racket-gray cursor-not-allowed'
                          : 'bg-racket-red text-white hover:bg-red-600 shadow-lg'
                      }`}
                      disabled={plan.id === 'basic'}
                    >
                      {plan.id === 'basic' ? 'Current Plan' : 'Upgrade Now'}
                    </motion.button>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Value Prop */}
      <section className="py-24 bg-racket-lightgray">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-5xl mx-auto"
          >
            <h3 className="font-headline text-4xl font-bold text-racket-black mb-6">
              Why Members Love Racket Rescue
            </h3>
            <p className="text-xl text-racket-gray mb-12">
              More than 500 Orange County players save time and money every month.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 rounded-2xl bg-racket-lightgray">
                <div className="text-5xl mb-4">🚗</div>
                <div className="text-2xl font-bold text-racket-black mb-2">Zero Driving</div>
                <div className="text-racket-gray">We come to you. Save 2+ hours every time.</div>
              </div>
              <div className="p-6 rounded-2xl bg-racket-lightgray">
                <div className="text-5xl mb-4">💰</div>
                <div className="text-2xl font-bold text-racket-black mb-2">Real Savings</div>
                <div className="text-racket-gray">Members save $25-$150+ per month.</div>
              </div>
              <div className="p-6 rounded-2xl bg-racket-lightgray">
                <div className="text-5xl mb-4">⚡</div>
                <div className="text-2xl font-bold text-racket-black mb-2">Priority Service</div>
                <div className="text-racket-gray">Same-day available. VIP scheduling.</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-racket-red to-red-600 text-white">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-headline text-5xl md:text-6xl font-bold">
              Start Your Free Trial
            </h2>
            <p className="text-2xl text-white/90">
              Try Rescue Club FREE for 14 days. Cancel anytime.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/schedule?plan=rescue-club"
                  className="inline-flex items-center gap-3 bg-white text-racket-red px-12 py-6 rounded-full text-xl font-bold font-label shadow-2xl hover:shadow-3xl transition-all"
                >
                  <span className="text-2xl">🎾</span>
                  Start Free Trial
                  <ArrowRight className="w-7 h-7" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/schedule?plan=elite-performance"
                  className="inline-flex items-center gap-3 bg-white/20 backdrop-blur border-2 border-white/40 text-white px-12 py-6 rounded-full text-xl font-bold font-label hover:bg-white/30 transition-all"
                >
                  Try Elite for $1
                </Link>
              </motion.div>
            </div>

            <p className="text-white/70">No credit card required • Cancel anytime</p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

