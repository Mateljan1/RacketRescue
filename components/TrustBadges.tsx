'use client'

import { motion } from 'framer-motion'
import { Shield, Truck, Clock, Award, CreditCard, Lock } from 'lucide-react'

const badges = [
  { icon: Shield, text: 'Satisfaction Guaranteed', subtext: '100% money back' },
  { icon: Truck, text: 'Free Pickup', subtext: 'For members' },
  { icon: Clock, text: 'Fast Turnaround', subtext: '2-3 days standard' },
  { icon: Award, text: '25+ Years Experience', subtext: 'Certified stringers' },
  { icon: CreditCard, text: 'Secure Payment', subtext: 'Stripe protected' },
  { icon: Lock, text: 'Privacy Protected', subtext: 'Your data is safe' },
]

export default function TrustBadges() {
  return (
    <section className="py-16 bg-white border-y border-gray-200">
      <div className="container-racket">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {badges.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 group"
              >
                <div className="p-3 bg-racket-red/10 rounded-xl group-hover:bg-racket-red/20 transition-colors">
                  <Icon className="w-6 h-6 text-racket-red" />
                </div>
                <div>
                  <div className="font-bold text-racket-black text-sm">{badge.text}</div>
                  <div className="text-xs text-racket-gray">{badge.subtext}</div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

