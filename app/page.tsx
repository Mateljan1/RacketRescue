'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Truck, Zap, Shield, Crown } from 'lucide-react'
import SocialProof from '@/components/SocialProof'
import Testimonials from '@/components/Testimonials'

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b77f9f4a7eae9e097474c2/e406f4500_RacketRescueLogoFinal_Horizontal.png"

const services = [
  {
    id: 'match_ready',
    name: 'Match-Ready',
    price: 35,
    turnaround: '2-3 Days',
    description: 'Professional stringing for casual and club players',
    features: ['Professional stringing', 'Quality guaranteed', 'Perfect for regular play'],
  },
  {
    id: 'pro_performance',
    name: 'Pro-Performance',
    price: 50,
    turnaround: '2 Days',
    description: 'Premium stringing for competitors',
    popular: true,
    features: ['Tournament-ready', 'Maximum performance', 'Advanced techniques'],
  },
]

const membershipTiers = [
  {
    name: 'Standard',
    price: 25,
    savings: 'Save $21+/month',
    features: ['FREE pickup & delivery', '10% off labor', 'Free overgrip monthly'],
    trial: '30 days free',
  },
  {
    name: 'Elite',
    price: 60,
    savings: 'Save $90+/month',
    features: ['All Standard benefits', 'UNLIMITED Express', 'Dedicated manager'],
    trial: '$1 first month',
    premium: true,
  },
]

export default function HomePage() {
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <main className="min-h-screen bg-white">
      <SocialProof />
      {/* Cinematic Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-racket-black via-racket-charcoal to-racket-black">
        {/* Animated gradient mesh background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,31,39,0.3),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(249,115,22,0.2),transparent_50%)]" />
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-racket-red/20 rounded-full"
              animate={{
                x: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
                y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              }}
              transition={{
                duration: Math.random() * 15 + 25,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div
          style={{ opacity, scale }}
          className="relative z-10 container-racket text-center text-white pt-24 px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="space-y-12"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
              className="flex justify-center"
            >
              <Image
                src={LOGO_URL}
                alt="Racket Rescue"
                width={400}
                height={100}
                className="h-20 md:h-24 w-auto drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight"
            >
              We Save Your Game!
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            >
              Professional racket stringing with{' '}
              <span className="text-racket-red font-semibold">pickup & delivery</span> in Laguna Beach.
              <span className="block mt-3">Get back to playing while we handle your equipment.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center pt-8"
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(236, 31, 39, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-center gap-3 bg-racket-red text-white px-10 py-5 rounded-full text-lg font-semibold shadow-xl hover:bg-red-600 transition-colors"
                >
                  Schedule Service
                  <ArrowRight className="w-6 h-6" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href="/membership"
                  className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-lg text-white border-2 border-white/30 px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
                >
                  View Memberships
                </Link>
              </motion.div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-12 pt-16 text-white/80"
            >
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-racket-red mb-2">25+</div>
                <div className="text-sm uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-racket-red mb-2">FREE</div>
                <div className="text-sm uppercase tracking-wider">Pickup & Delivery*</div>
              </div>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-racket-red mb-2">2-3</div>
                <div className="text-sm uppercase tracking-wider">Days Turnaround</div>
              </div>
            </motion.div>

            <p className="text-xs text-white/50 pt-8">*Free for Standard, Elite & Family members</p>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-racket-red rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Pickup & Delivery Hero Feature */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex p-6 bg-racket-red/10 rounded-full mb-8"
            >
              <Truck className="w-16 h-16 text-racket-red" />
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-racket-black mb-6">
              We Come To You
            </h2>
            <p className="text-2xl text-racket-gray leading-relaxed">
              No need to drop off your racket. We pick it up, string it professionally, and deliver it back to your door.
              <span className="block mt-4 text-racket-red font-semibold">It&apos;s that simple.</span>
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {[
              { step: 1, title: 'Schedule Online', desc: '4-step wizard in under 2 minutes' },
              { step: 2, title: 'We Pick Up', desc: 'Free for members, $15 for non-members' },
              { step: 3, title: 'We Deliver', desc: 'Tournament-ready racket at your door' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-racket-red text-white text-3xl font-bold rounded-2xl mb-6 shadow-xl group-hover:shadow-2xl transition-shadow"
                >
                  {item.step}
                </motion.div>
                <h3 className="text-2xl font-bold text-racket-black mb-3">{item.title}</h3>
                <p className="text-racket-gray leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 bg-racket-lightgray">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-racket-black mb-6">
              Professional Service Packages
            </h2>
            <p className="text-2xl text-racket-gray">
              Choose the perfect service for your playing style
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
                className={`relative bg-white rounded-3xl p-10 shadow-xl transition-all ${
                  service.popular ? 'ring-4 ring-racket-red' : ''
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-2 bg-racket-red text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg">
                      <Crown className="w-4 h-4" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center space-y-6">
                  <h3 className="text-3xl font-bold text-racket-black">{service.name}</h3>
                  
                  <div>
                    <div className="text-6xl font-bold text-racket-red mb-2">
                      ${service.price}
                    </div>
                    <div className="text-racket-gray text-lg">Turnaround: {service.turnaround}</div>
                  </div>

                  <p className="text-xl text-racket-gray leading-relaxed">
                    {service.description}
                  </p>

                  <ul className="space-y-4 pt-4">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-lg text-racket-gray">
                        <div className="flex-shrink-0 w-6 h-6 bg-racket-green/20 rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 bg-racket-green rounded-full" />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-5 rounded-full text-lg font-semibold transition-all mt-8 ${
                      service.popular
                        ? 'bg-racket-red text-white shadow-lg hover:shadow-xl'
                        : 'bg-racket-black text-white hover:bg-racket-charcoal'
                    }`}
                  >
                    Select {service.name}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership Teaser */}
      <section className="py-32 bg-white">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-racket-black mb-6">
              Save More With Membership
            </h2>
            <p className="text-2xl text-racket-gray">
              Get free pickup & delivery plus exclusive member benefits
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {membershipTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(236,31,39,0.2)" }}
                className={`relative bg-gradient-to-br ${
                  tier.premium
                    ? 'from-racket-red to-red-600 text-white'
                    : 'from-white to-racket-lightgray text-racket-black'
                } rounded-3xl p-10 shadow-xl transition-all`}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-3xl font-bold mb-2">{tier.name}</h3>
                    <div className="text-5xl font-bold mb-2">
                      ${tier.price}<span className="text-2xl font-normal">/mo</span>
                    </div>
                    <div className={`text-lg font-semibold ${tier.premium ? 'text-white/90' : 'text-racket-green'}`}>
                      {tier.savings}
                    </div>
                  </div>

                  <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                    tier.premium ? 'bg-white/20' : 'bg-racket-green/20 text-racket-green'
                  }`}>
                    <Zap className="w-4 h-4" />
                    {tier.trial}
                  </div>

                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-3 text-lg">
                        <div className={`flex-shrink-0 w-6 h-6 ${
                          tier.premium ? 'bg-white/20' : 'bg-racket-red/20'
                        } rounded-full flex items-center justify-center`}>
                          <div className={`w-3 h-3 ${
                            tier.premium ? 'bg-white' : 'bg-racket-red'
                          } rounded-full`} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              href="/membership"
              className="inline-flex items-center gap-2 text-racket-red text-lg font-semibold hover:gap-4 transition-all"
            >
              See All Plans & Calculate Your Savings
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-32 bg-racket-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(236,31,39,0.4),transparent_70%)]" />
        </div>

        <div className="container-racket relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              Why Racket Rescue?
            </h2>
            <p className="text-2xl text-white/80">
              Expert service, convenience, and trust—all in one place
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Truck,
                title: 'Pickup & Delivery',
                desc: 'We come to you! Free pickup and delivery throughout Laguna Beach for members.',
              },
              {
                icon: Shield,
                title: 'Expert Craftsmanship',
                desc: 'Professional stringing by certified technicians with decades of experience.',
              },
              {
                icon: Zap,
                title: 'Fast Turnaround',
                desc: 'Get your racket back in 2-3 days, or next day with Express service.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-flex p-6 bg-racket-red/20 rounded-2xl mb-6 group-hover:bg-racket-red/30 transition-colors"
                >
                  <item.icon className="w-12 h-12 text-racket-red" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-lg text-white/80 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Final CTA */}
      <section className="py-32 bg-gradient-to-br from-racket-red to-red-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        
        <div className="container-racket text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-7xl font-bold">
              Ready to Get Started?
            </h2>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of satisfied players in Laguna Beach
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center gap-3 bg-white text-racket-red px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-3xl transition-all"
              >
                Schedule Service Now
                <ArrowRight className="w-7 h-7" />
              </Link>
            </motion.div>

            <p className="text-white/70">No commitment required • Free for members</p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
