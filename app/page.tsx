'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Star, MapPin, Check } from 'lucide-react'
import { TimeSavingsIllustration, PrecisionIllustration, SpeedIllustration } from '@/components/CustomIllustrations'
import { useState } from 'react'
import SocialProof from '@/components/SocialProof'
import Testimonials from '@/components/Testimonials'
import TrustBadges from '@/components/TrustBadges'
import FAQ from '@/components/FAQ'
import FloatingCTA from '@/components/FloatingCTA'
import ZipChecker from '@/components/ZipChecker'
import MembershipCalculator from '@/components/MembershipCalculator'
import StringerProfile from '@/components/StringerProfile'

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b77f9f4a7eae9e097474c2/e406f4500_RacketRescueLogoFinal_Horizontal.png"

const packages = [
  {
    id: 'starter',
    name: 'Starter Package',
    price: 52,
    service: 'Match-Ready',
    string: 'Wilson Velocity MLT',
    description: 'Perfect for casual players',
    features: ['Professional stringing', 'Quality multifilament string', 'Pickup & delivery', '2-3 day turnaround'],
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro Package',
    price: 75,
    service: 'Pro-Performance',
    string: 'Luxilon ALU or RPM Blast',
    description: 'Tournament-ready',
    features: ['Premium stringing service', 'Tour-level string', 'Priority pickup', '2-day turnaround'],
    popular: true,
  },
  {
    id: 'custom',
    name: 'Custom Package',
    price: 50,
    priceNote: 'Starting at',
    service: 'Your choice',
    string: 'Any string ($8-60)',
    description: 'For players with preferences',
    features: ['Choose your service level', 'Pick any string', 'Add-ons available', 'Flexible options'],
    popular: false,
  },
]

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])

  return (
    <main className="min-h-screen bg-white">
      <SocialProof />
      <FloatingCTA />

      {/* UPGRADED Hero - Benefit-Focused */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-racket-black via-racket-charcoal to-racket-black">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,31,39,0.4),transparent_50%)]" />
        </div>

        <motion.div
          style={{ opacity }}
          className="relative z-10 container-racket text-center text-white pt-24 px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <Image
              src={LOGO_URL}
              alt="Racket Rescue"
              width={350}
              height={90}
              className="h-20 md:h-24 w-auto mx-auto drop-shadow-2xl mb-8"
              priority
            />

            {/* UPGRADED Headline - Clear Value Prop */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-5xl mx-auto">
              Professional Racquet Stringing.<br />
              We Pick Up, String, Deliver.
            </h1>

            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Never drive to a pro shop again. Tournament-ready strings in 2-3 days.  
              <span className="block mt-3 text-racket-red font-bold">Free pickup for members. Starting at $52.</span>
            </p>

            {/* UPGRADED Social Proof Bar - Enhanced with clickable reviews and guarantees */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap justify-center items-center gap-4 md:gap-6 pt-8 pb-6"
            >
              <a
                href="https://g.page/r/racketrescue/review"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full hover:bg-white/20 transition-colors group"
              >
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="font-bold text-white">4.9/5</span>
                <span className="text-white/80 text-sm group-hover:text-white transition-colors">312 Google reviews</span>
              </a>
              <div className="hidden md:block w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">✓</span>
                <span className="font-bold text-white">99.7% satisfaction</span>
              </div>
              <div className="hidden md:block w-px h-6 bg-white/30" />
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="text-2xl">🛡️</span>
                <span className="font-bold text-white">Money-back guarantee</span>
              </div>
            </motion.div>

            {/* Next Pickup Urgency Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center pb-6"
            >
              <div className="inline-flex items-center gap-2 bg-racket-red/80 backdrop-blur-sm px-5 py-2 rounded-full text-white text-sm font-medium">
                <span className="animate-pulse w-2 h-2 bg-green-400 rounded-full"></span>
                Next available pickup: Tomorrow morning
              </div>
            </motion.div>

            {/* UPGRADED ZIP Checker */}
            <ZipChecker />

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-center gap-3 bg-racket-red text-white px-10 py-5 rounded-full text-xl font-bold shadow-2xl hover:bg-red-600 transition-colors"
                >
                  Get Started - $52
                  <ArrowRight className="w-7 h-7" />
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="#packages"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-lg text-white border-2 border-white/30 px-10 py-5 rounded-full text-xl font-bold hover:bg-white/20 transition-all"
                >
                  See Packages
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Badges */}
      <TrustBadges />

      {/* UPGRADED: Bundle Packages (Not À La Carte) */}
      <section id="packages" className="py-32 bg-racket-lightgray">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-racket-black mb-6">
              Simple, All-In Pricing
            </h2>
            <p className="text-2xl text-racket-gray">
              No hidden fees. No surprises. Everything included.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -12, boxShadow: "0 30px 70px rgba(0,0,0,0.2)" }}
                className={`relative bg-white rounded-3xl p-10 shadow-2xl transition-all ${
                  pkg.popular ? 'ring-4 ring-racket-red scale-105' : ''
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-racket-red text-white px-8 py-3 rounded-full font-bold text-sm shadow-xl">
                    ⭐ MOST POPULAR
                  </div>
                )}

                <div className="text-center space-y-6">
                  <h3 className="text-3xl font-bold text-racket-black">{pkg.name}</h3>
                  
                  <div>
                    {pkg.priceNote && (
                      <div className="text-lg text-racket-gray mb-2">{pkg.priceNote}</div>
                    )}
                    <div className="text-7xl font-black text-racket-red">
                      ${pkg.price}
                    </div>
                    <div className="text-lg text-racket-gray mt-2">All-in price</div>
                  </div>

                  <p className="text-xl text-racket-gray font-semibold">
                    {pkg.description}
                  </p>

                  <div className="space-y-4 pt-6">
                    <div className="text-left space-y-3">
                      <div className="flex items-start gap-3">
                        <Check className="w-6 h-6 text-racket-green flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-bold text-racket-black">{pkg.service} Service</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Check className="w-6 h-6 text-racket-green flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-bold text-racket-black">{pkg.string}</div>
                        </div>
                      </div>
                      {pkg.features.slice(2).map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <Check className="w-6 h-6 text-racket-green flex-shrink-0 mt-1" />
                          <div className="text-racket-gray">{feature}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-8"
                  >
                    <Link
                      href={`/schedule?package=${pkg.id}`}
                      className={`block w-full py-5 rounded-full text-xl font-bold text-center transition-all ${
                        pkg.popular
                          ? 'bg-racket-red text-white shadow-xl hover:bg-red-600'
                          : 'bg-racket-black text-white hover:bg-racket-charcoal'
                      }`}
                    >
                      Select {pkg.name}
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-racket-gray text-lg mb-6">
              Not sure which package? Our string wizard will recommend the perfect setup for your game.
            </p>
            <Link
              href="/schedule"
              className="inline-flex items-center gap-2 text-racket-red font-bold text-xl hover:gap-4 transition-all"
            >
              Start Custom Order
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section - "How It Actually Works" */}
      <section id="how-it-works" className="py-32 bg-white">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-racket-black mb-6">
              Engineered for Convenience
            </h2>
            <p className="text-2xl text-racket-gray">
              Save 2+ hours. Get better strings. Never leave home.
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="max-w-4xl mx-auto">
            {[
              {
                day: 'Today',
                title: 'Schedule Online',
                time: '2 minutes',
                desc: 'Choose your package, pick a time. Done.',
              },
              {
                day: 'Tomorrow',
                title: 'We Pick Up',
                time: '2-hour window',
                desc: 'We come to your door. Free for members.',
              },
              {
                day: 'Day 3',
                title: 'We Deliver',
                time: 'Tournament-ready',
                desc: 'Strung to perfection. Back at your door.',
              },
            ].map((step, i) => (
              <motion.div
                key={step.day}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative flex gap-8 mb-12 last:mb-0"
              >
                {/* Timeline Line */}
                {i < 2 && (
                  <div className="absolute left-10 top-24 w-1 h-full bg-racket-red/20" />
                )}

                {/* Day Badge */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-racket-red rounded-2xl flex items-center justify-center text-white font-black text-lg shadow-xl">
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm font-bold text-racket-gray uppercase tracking-wider mb-2">
                        {step.day}
                      </div>
                      <h3 className="text-3xl font-bold text-racket-black">{step.title}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-racket-red">{step.time}</div>
                    </div>
                  </div>
                  <p className="text-xl text-racket-gray">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-racket-lightgray">
        <div className="container-racket">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 shadow-xl text-center"
            >
              <TimeSavingsIllustration />
              <h3 className="text-2xl font-bold text-racket-black mb-4 mt-6">Save 2+ Hours</h3>
              <p className="text-lg text-racket-gray leading-relaxed">
                No more driving to pro shops. We handle pickup and delivery.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-3xl p-10 shadow-xl text-center"
            >
              <PrecisionIllustration />
              <h3 className="text-2xl font-bold text-racket-black mb-4 mt-6">Strung to 0.5 lb Accuracy</h3>
              <p className="text-lg text-racket-gray leading-relaxed">
                Professional equipment. Every racquet inspected twice.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl p-10 shadow-xl text-center"
            >
              <SpeedIllustration />
              <h3 className="text-2xl font-bold text-racket-black mb-4 mt-6">Back in 2-3 Days</h3>
              <p className="text-lg text-racket-gray leading-relaxed">
                Or next-day with Express. Tournament-ready when you need it.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Meet Your Stringer - Build Trust */}
      <StringerProfile />

      {/* Membership ROI - PROMINENT */}
      <MembershipCalculator />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-racket-red to-red-600 text-white">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-7xl font-bold">
              Ready to Save Time?
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto">
              Join hundreds of players who never drive to a pro shop again
            </p>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/schedule"
                className="inline-flex items-center gap-3 bg-white text-racket-red px-12 py-6 rounded-full text-2xl font-bold shadow-2xl hover:bg-gray-100 transition-all"
              >
                Schedule Pickup Now
                <ArrowRight className="w-8 h-8" />
              </Link>
            </motion.div>

            <p className="text-white/70 text-lg">Free pickup for members • No commitment required</p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
