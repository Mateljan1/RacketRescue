'use client'

import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Users, Check, ArrowRight, Calculator, Award, Zap, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function ForShopsPage() {
  const [stringsPerWeek, setStringsPerWeek] = useState(10)
  const monthlyEarnings = stringsPerWeek * 4 * 7 // $7 commission per racquet

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-racket-black to-racket-charcoal text-white">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-racket-red px-6 py-3 rounded-full font-bold mb-8">
              <Award className="w-5 h-5" />
              FOR TENNIS SHOPS
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Add $3-5k/Month Revenue.<br />
              Zero Equipment Required.
            </h1>
            <p className="text-2xl text-white/80 leading-relaxed mb-10">
              Your customers want stringing. You want revenue without complexity. Partner with Racket Rescue and earn $3-5k/month with zero overhead.
            </p>

            <div className="flex gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-racket-red text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-red-600 transition-colors shadow-2xl"
              >
                Schedule Partnership Call
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/10 border-2 border-white/30 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/20 transition-all"
              >
                Download Partnership PDF
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-32 bg-white">
        <div className="container-racket max-w-6xl">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Problems */}
            <div>
              <h2 className="text-4xl font-bold text-racket-black mb-10">
                Stop Losing Money on Stringing
              </h2>
              <div className="space-y-6">
                {[
                  { problem: 'Buying a $3k machine', cost: '$3,000' },
                  { problem: 'Training staff (100+ hours)', cost: '$2,500' },
                  { problem: 'String inventory tied up', cost: '$2-3k' },
                  { problem: 'Pickup/delivery logistics', cost: 'Headache' },
                  { problem: 'Customer complaints', cost: 'Reputation risk' },
                ].map((item, i) => (
                  <motion.div
                    key={item.problem}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-5 bg-red-50 border-2 border-red-200 rounded-xl"
                  >
                    <X className="w-6 h-6 text-racket-red flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-racket-black text-lg">{item.problem}</div>
                      <div className="text-racket-red font-semibold">{item.cost}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div>
              <h2 className="text-4xl font-bold text-racket-black mb-10">
                Start Earning Instead
              </h2>
              <div className="space-y-6">
                {[
                  { solution: 'Partner with us - zero investment', benefit: '$0 upfront' },
                  { solution: 'We handle all stringing', benefit: 'Expert quality' },
                  { solution: 'We stock everything', benefit: 'Zero inventory' },
                  { solution: 'We pickup & deliver', benefit: 'Seamless' },
                  { solution: 'We guarantee satisfaction', benefit: '99.7% rating' },
                ].map((item, i) => (
                  <motion.div
                    key={item.solution}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-4 p-5 bg-racket-green/10 border-2 border-racket-green/30 rounded-xl"
                  >
                    <Check className="w-6 h-6 text-racket-green flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-bold text-racket-black text-lg">{item.solution}</div>
                      <div className="text-racket-green font-semibold">{item.benefit}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Revenue Calculator */}
      <section className="py-32 bg-racket-lightgray">
        <div className="container-racket max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl p-12"
          >
            <div className="flex items-center gap-4 mb-10">
              <Calculator className="w-12 h-12 text-racket-green" />
              <div>
                <h2 className="text-4xl font-bold text-racket-black">Calculate Your Earnings</h2>
                <p className="text-xl text-racket-gray">See how much you'd make</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-lg font-bold text-racket-black mb-4">
                  How many racquets do you sell/string per week?
                </label>
                <input
                  type="range"
                  min="5"
                  max="50"
                  value={stringsPerWeek}
                  onChange={(e) => setStringsPerWeek(parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer accent-racket-green"
                />
                <div className="flex justify-between mt-4">
                  <span className="text-racket-gray">5/week</span>
                  <div className="text-6xl font-black text-racket-red">{stringsPerWeek}</div>
                  <span className="text-racket-gray">50/week</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-racket-green/20 to-green-500/20 border-4 border-racket-green rounded-3xl p-10 text-center">
                <div className="text-sm font-bold text-racket-gray mb-2">YOU'D EARN PER MONTH:</div>
                <motion.div
                  key={monthlyEarnings}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  className="text-7xl font-black text-racket-green mb-4"
                >
                  ${monthlyEarnings}
                </motion.div>
                <div className="text-xl text-racket-gray">
                  Based on $7 commission per racquet
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-racket-red mb-2">${monthlyEarnings * 12}</div>
                  <div className="text-racket-gray">Annual Revenue</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-racket-green mb-2">$0</div>
                  <div className="text-racket-gray">Investment Required</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-racket-blue mb-2">100%</div>
                  <div className="text-racket-gray">Profit Margin</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partnership Options */}
      <section className="py-32 bg-white">
        <div className="container-racket">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-racket-black mb-6">
              Three Partnership Models
            </h2>
            <p className="text-2xl text-racket-gray">
              Choose what works best for your shop
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: 'Revenue Share',
                commission: '20%',
                price: 'per racquet',
                features: [
                  'Earn $7-10 per racquet',
                  'We handle everything',
                  'Co-branded service',
                  'Monthly payouts',
                  'No minimums',
                ],
                popular: true,
              },
              {
                name: 'Wholesale',
                commission: '$20-25',
                price: 'margin per racquet',
                features: [
                  'Buy at $35/$45',
                  'Sell at $55/$65',
                  'You set final price',
                  'Full control',
                  'White-label option',
                ],
              },
              {
                name: 'Subscription',
                commission: '$199',
                price: 'per month',
                features: [
                  'Unlimited referrals',
                  'Dedicated support',
                  'Marketing materials',
                  'Training included',
                  'Priority service',
                ],
              },
            ].map((model, i) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className={`bg-white rounded-3xl p-8 shadow-xl ${
                  model.popular ? 'ring-4 ring-racket-red' : 'border-2 border-gray-200'
                }`}
              >
                {model.popular && (
                  <div className="text-center mb-6">
                    <span className="bg-racket-red text-white px-4 py-2 rounded-full text-sm font-bold">
                      ⭐ MOST POPULAR
                    </span>
                  </div>
                )}

                <h3 className="text-3xl font-bold text-racket-black text-center mb-4">
                  {model.name}
                </h3>
                <div className="text-center mb-8">
                  <div className="text-5xl font-black text-racket-red mb-2">
                    {model.commission}
                  </div>
                  <div className="text-racket-gray">{model.price}</div>
                </div>

                <ul className="space-y-3">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-racket-green flex-shrink-0 mt-0.5" />
                      <span className="text-racket-gray">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 bg-gradient-to-br from-racket-red to-red-600 text-white">
        <div className="container-racket text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Ready to Partner?
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            Schedule a call to discuss how Racket Rescue can add recurring revenue to your shop
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white text-racket-red px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:bg-gray-100 transition-all"
          >
            Schedule Partnership Call
          </motion.button>

          <p className="text-white/70 mt-8">Or call us: (949) 464-6645</p>
        </div>
      </section>
    </main>
  )
}

