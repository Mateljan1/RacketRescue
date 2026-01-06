'use client'

import { motion } from 'framer-motion'
import { Book, Zap, Target, Heart, Shield, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const stringTypes = [
  {
    id: 'polyester',
    name: 'Polyester',
    icon: Target,
    color: 'blue',
    price: '$15-35',
    description: 'Maximum spin and control for aggressive players',
    bestFor: ['Advanced players', 'Heavy topspin hitters', 'Tournament competitors'],
    pros: ['Exceptional spin potential', 'Great control and precision', 'Durable (20-30 hours)'],
    cons: ['Loses tension quickly', 'Can be stiff on arm', 'Less power than multis'],
    examples: ['Luxilon ALU Power', 'Babolat RPM Blast', 'Solinco Hyper-G'],
    whenToUse: 'If you hit with heavy spin and want maximum control',
  },
  {
    id: 'multifilament',
    name: 'Multifilament',
    icon: Heart,
    color: 'green',
    price: '$18-30',
    description: 'Comfortable and powerful, mimics natural gut',
    bestFor: ['Intermediate players', 'Players with arm issues', 'All-court players'],
    pros: ['Excellent comfort', 'Good power and feel', 'Arm-friendly'],
    cons: ['Less spin than poly', 'Lower durability (15-25 hours)', 'Can fray'],
    examples: ['Wilson NXT', 'Tecnifibre X-One', 'Babolat Touch'],
    whenToUse: 'If you want comfort and power without breaking the bank',
  },
  {
    id: 'natural_gut',
    name: 'Natural Gut',
    icon: TrendingUp,
    color: 'orange',
    price: '$35-45',
    description: 'The ultimate in feel, power, and comfort',
    bestFor: ['Advanced players', 'Players with arm problems', 'Those wanting best feel'],
    pros: ['Best feel and touch', 'Maximum power', 'Holds tension longest'],
    cons: ['Expensive', 'Less durable (15-20 hours)', 'Affected by moisture'],
    examples: ['Babolat VS Touch', 'Wilson Natural Gut', 'Luxilon Natural Gut'],
    whenToUse: 'When you want the absolute best feel and don\'t mind the cost',
  },
  {
    id: 'hybrid',
    name: 'Hybrid',
    icon: Zap,
    color: 'red',
    price: '$25-40',
    description: 'Combination of two string types for best of both worlds',
    bestFor: ['Advanced players', 'Players seeking balance', 'Customization enthusiasts'],
    pros: ['Customizable performance', 'Balanced feel', 'Spin + comfort'],
    cons: ['More expensive', 'Requires experimentation', 'Complex to dial in'],
    examples: ['Poly mains + Multi crosses', 'Poly mains + Gut crosses'],
    whenToUse: 'When you want spin from poly with comfort from multi or gut',
  },
]

const tensionGuide = [
  {
    range: '40-48 lbs',
    power: 'Maximum',
    control: 'Low',
    comfort: 'High',
    bestFor: 'Beginners, players with arm issues, maximum power',
  },
  {
    range: '49-55 lbs',
    power: 'Good',
    control: 'Moderate',
    comfort: 'Good',
    bestFor: 'Intermediate players, all-around game',
  },
  {
    range: '56-62 lbs',
    power: 'Moderate',
    control: 'Good',
    comfort: 'Moderate',
    bestFor: 'Advanced players, control-oriented game',
  },
  {
    range: '63-70 lbs',
    power: 'Low',
    control: 'Maximum',
    comfort: 'Low',
    bestFor: 'Pro/advanced players, flat hitters, ultimate control',
  },
]

export default function StringsPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-racket-red to-red-600 text-white">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Book className="w-16 h-16 mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              String Education
            </h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              Learn everything about tennis strings to make the perfect choice for your game
            </p>
          </motion.div>
        </div>
      </section>

      {/* String Types */}
      <section className="py-24 bg-white">
        <div className="container-racket">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-racket-black mb-4">String Types Explained</h2>
            <p className="text-xl text-racket-gray">
              Understanding the differences helps you choose the right string
            </p>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {stringTypes.map((type, i) => {
              const Icon = type.icon
              return (
                <motion.div
                  key={type.id}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl shadow-xl p-10 border-2 border-gray-100"
                >
                  <div className="grid md:grid-cols-3 gap-8">
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`p-4 bg-racket-${type.color}/10 rounded-2xl`}>
                          <Icon className={`w-8 h-8 text-racket-${type.color === 'blue' ? 'blue' : type.color === 'green' ? 'green' : type.color === 'orange' ? 'orange' : 'red'}`} />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-racket-black">{type.name}</h3>
                          <div className="text-lg font-bold text-racket-red">{type.price}</div>
                        </div>
                      </div>
                      <p className="text-racket-gray mb-6">{type.description}</p>
                      
                      <div className="p-4 bg-racket-green/10 rounded-xl">
                        <div className="text-xs font-bold text-racket-gray mb-2">WHEN TO USE:</div>
                        <p className="text-sm text-racket-black font-semibold">{type.whenToUse}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-bold text-racket-black mb-3">✅ Pros</h4>
                      <ul className="space-y-2 mb-6">
                        {type.pros.map((pro) => (
                          <li key={pro} className="flex items-start gap-2 text-sm text-racket-gray">
                            <span className="text-racket-green">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-bold text-racket-black mb-3">⚠️ Cons</h4>
                      <ul className="space-y-2">
                        {type.cons.map((con) => (
                          <li key={con} className="flex items-start gap-2 text-sm text-racket-gray">
                            <span className="text-racket-orange">•</span>
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-bold text-racket-black mb-3">Best For:</h4>
                      <ul className="space-y-2 mb-6">
                        {type.bestFor.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-racket-red rounded-full" />
                            <span className="text-racket-gray">{item}</span>
                          </li>
                        ))}
                      </ul>

                      <h4 className="font-bold text-racket-black mb-3">Popular Examples:</h4>
                      <ul className="space-y-2">
                        {type.examples.map((example) => (
                          <li key={example} className="text-sm text-racket-gray font-semibold">
                            {example}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tension Guide */}
      <section className="py-24 bg-racket-lightgray">
        <div className="container-racket max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-racket-black mb-4">Tension Guide</h2>
            <p className="text-xl text-racket-gray">
              Finding the right tension is just as important as choosing the right string
            </p>
          </motion.div>

          <div className="space-y-4">
            {tensionGuide.map((guide, i) => (
              <motion.div
                key={guide.range}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="grid md:grid-cols-5 gap-6 items-center">
                  <div>
                    <div className="text-3xl font-bold text-racket-red">{guide.range}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-racket-gray mb-1">Power</div>
                    <div className="font-bold text-racket-black">{guide.power}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-racket-gray mb-1">Control</div>
                    <div className="font-bold text-racket-black">{guide.control}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-racket-gray mb-1">Comfort</div>
                    <div className="font-bold text-racket-black">{guide.comfort}</div>
                  </div>
                  <div className="md:col-span-5 md:col-start-1 mt-4 pt-4 border-t border-gray-200">
                    <div className="text-sm text-racket-gray mb-1">Best For:</div>
                    <div className="text-racket-black">{guide.bestFor}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Principle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-8 bg-racket-red/10 border-2 border-racket-red/30 rounded-2xl"
          >
            <h3 className="text-xl font-bold text-racket-black mb-3">📐 Key Principle:</h3>
            <p className="text-lg text-racket-gray">
              <strong className="text-racket-red">Lower tension = More Power & Comfort</strong><br />
              <strong className="text-racket-red">Higher tension = More Control & Spin</strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-racket-black to-racket-charcoal text-white">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6">
              Ready to Choose Your Perfect String?
            </h2>
            <p className="text-2xl text-white/80 mb-10">
              Use our AI wizard or shop directly from Tennis Warehouse
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/schedule"
                className="inline-flex items-center gap-3 bg-racket-red text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-red-600 transition-colors shadow-2xl"
              >
                Start String Wizard
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 bg-white text-racket-black px-10 py-5 rounded-full text-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Browse Shop
                <ArrowRight className="w-6 h-6" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
