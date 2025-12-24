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
    period: 'Free',
    icon: Star,
    color: 'gray',
    description: 'No monthly fee – just pay per order',
    benefits: [
      'Standard pricing',
      'Email notifications',
      'Basic customer support',
    ],
    alaCarteOptions: [
      { name: 'Express (next-day)', price: 15 },
      { name: 'Pickup & Delivery', price: 15 },
    ],
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 25,
    annualPrice: 240,
    period: 'per month',
    icon: Crown,
    color: 'red',
    description: '$25/month – Includes free pickup ($15 value) and 10% off labor',
    benefits: [
      'FREE pickup & delivery (save $15 each time)',
      '10% discount on stringing labor',
      'Priority turnaround',
      'Free overgrip each month',
    ],
    popular: true,
    trial: 'Standard benefits free for 30 days',
    savings: 'Save $21+ per month',
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 60,
    annualPrice: 600,
    period: 'per month',
    icon: Sparkles,
    color: 'black',
    description: '$60/month – Unlimited express and free overgrip on every order',
    benefits: [
      'All Standard benefits',
      'UNLIMITED Express service (normally $15 each)',
      'Free overgrip with every order',
      'Dedicated account manager',
    ],
    trial: 'Try Elite for $1 first month',
    savings: 'Save $90+ per month',
    premium: true,
  },
  {
    id: 'family',
    name: 'Family Plan',
    price: 80,
    annualPrice: 800,
    period: 'per month',
    icon: Users,
    color: 'purple',
    description: '$80/month – Standard benefits for two players in your household',
    benefits: [
      'All Standard benefits for 2 players',
      'Shared pickup & delivery',
      'Family account management',
      'Priority scheduling',
    ],
    new: true,
    savings: 'Perfect for families',
  },
]

export default function MembershipPage() {
  const [ordersPerMonth, setOrdersPerMonth] = useState(3)
  const [selectedPlan, setSelectedPlan] = useState('standard')

  // Calculate savings
  const calculateSavings = (planId: string) => {
    if (planId === 'basic') return 0

    const plan = plans.find(p => p.id === planId)
    if (!plan) return 0

    const pickupSavings = ordersPerMonth * 15 // $15 saved per order
    const laborSavings = ordersPerMonth * 4 // Approx 10% of $40 avg service
    const monthlyCost = plan.price

    return pickupSavings + laborSavings - monthlyCost
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Choose Your Membership
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Save money and get priority service. Annual plans save you even more!
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
              <div className="grid md:grid-cols-3 gap-4">
                {plans.filter(p => p.id !== 'basic' && p.id !== 'family').map((plan) => {
                  const savings = calculateSavings(plan.id)
                  return (
                    <motion.div
                      key={plan.id}
                      whileHover={{ scale: 1.05 }}
                      className="p-6 bg-gradient-to-br from-racket-green/10 to-racket-green/5 border-2 border-racket-green/30 rounded-2xl text-center"
                    >
                      <h3 className="font-bold text-xl text-racket-black mb-2">{plan.name}</h3>
                      <div className="text-4xl font-bold text-racket-green mb-1">
                        ${savings > 0 ? savings : 0}
                      </div>
                      <div className="text-sm text-racket-gray">saved per month</div>
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
            <h3 className="text-4xl font-bold text-racket-black mb-6">
              Unlock Your Best Game
            </h3>
            <p className="text-xl text-racket-gray mb-12">
              With just 2-3 orders per month, a membership pays for itself!
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-racket-red mb-2">Standard</div>
                <div className="text-racket-gray mb-4">2 orders/month</div>
                <div className="text-3xl font-bold text-racket-green">Save $21/mo</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-racket-black mb-2">Elite</div>
                <div className="text-racket-gray mb-4">3 orders/month</div>
                <div className="text-3xl font-bold text-racket-green">Save $90+/mo</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-racket-red mb-2">FREE Pickup</div>
                <div className="text-racket-gray mb-4">on every order</div>
                <div className="text-3xl font-bold text-racket-green">$15 value</div>
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
            <h2 className="text-5xl md:text-6xl font-bold">
              Start Saving Today
            </h2>
            <p className="text-2xl text-white/90">
              Try Standard free for 30 days or Elite for just $1
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/schedule"
                className="inline-flex items-center gap-3 bg-white text-racket-red px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all"
              >
                Get Started Now
                <ArrowRight className="w-7 h-7" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

