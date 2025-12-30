'use client'

import { motion } from 'framer-motion'
import { ShieldCheck, Truck, Timer, BadgeCheck, CreditCard, LockKeyhole } from 'lucide-react'

const badges = [
  { icon: ShieldCheck, text: 'Satisfaction Guaranteed', subtext: '100% money back' },
  { icon: Truck, text: 'Free Pickup', subtext: 'For members' },
  { icon: Timer, text: 'Fast Turnaround', subtext: '2-3 days standard' },
  { icon: BadgeCheck, text: '25+ Years Experience', subtext: 'Certified stringers' },
  { icon: CreditCard, text: 'Secure Payment', subtext: 'Stripe protected' },
  { icon: LockKeyhole, text: 'Privacy Protected', subtext: 'Your data is safe' },
]

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="container-racket">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-8">
          {badges.map((badge, i) => {
            const Icon = badge.icon
            return (
              <motion.div
                key={badge.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-racket-red to-red-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" strokeWidth={2} />
                </div>
                <div className="font-bold text-racket-black text-sm leading-tight">{badge.text}</div>
                <div className="text-xs text-racket-gray mt-1">{badge.subtext}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
