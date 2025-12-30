'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, MapPin, Check, Phone } from 'lucide-react'

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b77f9f4a7eae9e097474c2/e406f4500_RacketRescueLogoFinal_Horizontal.png"

export default function IrvinePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-racket-black via-racket-charcoal to-racket-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,31,39,0.4),transparent_50%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 container-racket text-center text-white pt-24 px-6"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
            <MapPin className="w-5 h-5 text-racket-red" />
            <span className="font-semibold">Serving Irvine</span>
          </div>

          <Image
            src={LOGO_URL}
            alt="Racket Rescue Irvine"
            width={350}
            height={90}
            className="h-16 md:h-20 w-auto mx-auto drop-shadow-2xl mb-8"
            priority
          />

          <h1 className="text-4xl md:text-6xl font-bold leading-tight max-w-5xl mx-auto mb-6">
            Tennis Racquet Stringing in Irvine
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Professional racquet stringing with FREE pickup & delivery in Irvine.
            Serving all villages from Woodbridge to Turtle Rock.
          </p>

          {/* Local Social Proof */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="font-bold">4.9/5</span>
              <span className="text-white/80 text-sm">from Irvine players</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center gap-3 bg-racket-red text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-red-600 transition-colors"
              >
                Schedule Irvine Pickup
                <ArrowRight className="w-7 h-7" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Service Area */}
      <section className="py-20 bg-white">
        <div className="container-racket">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-racket-black text-center mb-12">
              We Cover All of Irvine
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-racket-lightgray rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-racket-black mb-6">Villages We Serve</h3>
                <ul className="space-y-3">
                  {[
                    'Woodbridge',
                    'Turtle Rock',
                    'University Park',
                    'Northwood',
                    'Quail Hill',
                    'Portola Springs',
                    'Stonegate',
                    'Great Park neighborhoods',
                  ].map((area) => (
                    <li key={area} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-racket-green" />
                      <span className="text-racket-gray">{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-racket-lightgray rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-racket-black mb-6">Popular Pickup Locations</h3>
                <ul className="space-y-3">
                  {[
                    'Great Park Tennis Center',
                    'Heritage Park',
                    'Turtle Rock Community Park',
                    'UCI Tennis Courts',
                    'Irvine Spectrum area',
                    'Home & Office',
                  ].map((location) => (
                    <li key={location} className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-racket-red" />
                      <span className="text-racket-gray">{location}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Local CTA */}
      <section className="py-20 bg-gradient-to-br from-racket-red to-red-600 text-white">
        <div className="container-racket text-center">
          <h2 className="text-4xl font-bold mb-6">Ready for Tournament-Ready Strings?</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Irvine's trusted stringing service. 2-3 day turnaround with free pickup for members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/schedule"
              className="inline-flex items-center justify-center gap-3 bg-white text-racket-red px-8 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-colors"
            >
              Schedule Now
              <ArrowRight className="w-6 h-6" />
            </Link>
            <a
              href="tel:+19494646645"
              className="inline-flex items-center justify-center gap-3 bg-white/10 text-white px-8 py-4 rounded-full text-xl font-bold hover:bg-white/20 transition-colors"
            >
              <Phone className="w-6 h-6" />
              (949) 464-6645
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
