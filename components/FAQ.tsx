'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    q: 'How does pickup and delivery work?',
    a: 'After you place your order, we&apos;ll come to your address to pick up your racket at your preferred time. Once strung, we&apos;ll deliver it right back to your door. Free for Standard, Elite, and Family members!',
  },
  {
    q: 'What if I need my racket back quickly?',
    a: 'Choose our Express service for just $15 extra to get next-day turnaround. Elite members get unlimited Express service included in their membership!',
  },
  {
    q: 'Can I provide my own strings?',
    a: 'Absolutely! Just select "I&apos;ll provide my own string" during ordering and include the string in your racket cover when we pick it up.',
  },
  {
    q: 'What tension should I use?',
    a: 'Our AI String Wizard will help you find the perfect tension based on your playing style. Generally, lower tension = more power, higher tension = more control. Most players string between 50-58 lbs.',
  },
  {
    q: 'How do I know when to restring?',
    a: 'Use our String Durability Tracker! As a rule of thumb: restring as many times per year as you play per week. So if you play 3x per week, restring 3x per year minimum.',
  },
  {
    q: 'What makes Pro-Performance different from Match-Ready?',
    a: 'Pro-Performance includes premium pre-stretch techniques, more attention to detail, and guaranteed 2-day turnaround. Perfect for competitive players and tournaments.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-32 bg-racket-lightgray">
      <div className="container-racket max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-racket-black mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-2xl text-racket-gray">
            Everything you need to know
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="text-xl font-bold text-racket-black pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-6 h-6 text-racket-red flex-shrink-0" />
                  </motion.div>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? 'auto' : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-8 pb-8 text-lg text-racket-gray leading-relaxed">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center p-8 bg-white rounded-2xl shadow-lg"
        >
          <p className="text-xl text-racket-gray mb-4">
            Still have questions?
          </p>
          <a
            href="tel:+19494646645"
            className="inline-flex items-center gap-2 text-racket-red font-bold text-lg hover:underline"
          >
            Call us at (949) 464-6645
          </a>
        </motion.div>
      </div>
    </section>
  )
}

