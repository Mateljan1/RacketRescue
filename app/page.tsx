'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, Award, Zap, ArrowRight, Check } from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const services = [
  {
    title: 'Standard Stringing',
    price: '$25',
    turnaround: '2-3 Days',
    features: [
      'Professional stringing to your specs',
      'Tension range: 40-70 lbs',
      'String recommendations included',
      'Quality guaranteed',
    ],
    icon: Check,
  },
  {
    title: 'Same-Day Service',
    price: '$35',
    turnaround: 'Same Day',
    popular: true,
    features: [
      'Drop off before noon, pick up same day',
      'Priority service for tournaments',
      'Perfect for match preparation',
      'All standard benefits included',
    ],
    icon: Zap,
  },
  {
    title: 'Customization',
    price: '$50+',
    turnaround: 'Varies',
    features: [
      'Weight and balance adjustments',
      'Lead tape installation',
      'Grip customization',
      'Professional consultation',
    ],
    icon: Award,
  },
]

const stringBrands = [
  { name: 'Luxilon', price: '$20-35', description: 'Pro tour favorite' },
  { name: 'Babolat', price: '$18-30', description: 'Versatile performance' },
  { name: 'Wilson', price: '$15-28', description: 'Classic quality' },
  { name: 'Solinco', price: '$15-25', description: 'Tour level poly' },
]

const benefits = [
  {
    icon: Zap,
    title: 'Fast Turnaround',
    description: 'Same-day service available. Drop off before noon and pick up the same day.',
  },
  {
    icon: Award,
    title: 'Expert Precision',
    description: '25+ years of stringing experience. Every racquet strung to exact specifications.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Open 6 days a week with extended hours for your convenience.',
  },
]

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-racket-navy via-racket-slate to-racket-navy">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }} />
        </div>

        {/* Content */}
        <div className="relative z-10 container-racket text-center text-white pt-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
            className="space-y-8"
          >
            {/* Logo */}
            <div className="flex justify-center">
              <div className="relative w-24 h-24 bg-racket-orange rounded-full flex items-center justify-center shadow-2xl animate-float">
                <span className="text-white font-headline font-bold text-4xl">RR</span>
              </div>
            </div>

            <h1 className="font-headline font-extrabold text-display">
              Racket Rescue
            </h1>
            
            <p className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Professional racquet stringing and customization services.
              <span className="block mt-2 text-racket-orange font-semibold">Same-day service available.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-racket-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-racket-red transition-all hover:scale-105 hover:shadow-2xl"
              >
                Book Service
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
              >
                View Services
              </Link>
            </div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-8 md:gap-12 pt-12 text-white/80"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-racket-orange">25+</div>
                <div className="text-sm uppercase tracking-wider">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-racket-orange">1000+</div>
                <div className="text-sm uppercase tracking-wider">Racquets Strung</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-racket-orange">Same Day</div>
                <div className="text-sm uppercase tracking-wider">Service Available</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-1.5 h-1.5 bg-racket-orange rounded-full mt-2"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 md:py-32 bg-white">
        <div className="container-racket">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-16"
          >
            {/* Section Header */}
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline font-bold text-headline mb-6 text-racket-navy">
                Our Services
              </h2>
              <p className="text-body-lg text-racket-gray">
                Professional stringing services designed for players who demand excellence.
              </p>
            </motion.div>

            {/* Service Cards */}
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  variants={fadeInUp}
                  className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    service.popular
                      ? 'bg-racket-orange text-white border-racket-orange'
                      : 'bg-white border-racket-gray/20 hover:border-racket-orange'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-racket-red text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                      Most Popular
                    </div>
                  )}

                  <div className={`inline-flex p-3 rounded-xl mb-6 ${
                    service.popular ? 'bg-white/20' : 'bg-racket-orange/10'
                  }`}>
                    <service.icon className={`w-6 h-6 ${service.popular ? 'text-white' : 'text-racket-orange'}`} />
                  </div>

                  <h3 className={`font-headline font-bold text-2xl mb-2 ${service.popular ? 'text-white' : 'text-racket-navy'}`}>
                    {service.title}
                  </h3>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className={`text-4xl font-bold ${service.popular ? 'text-white' : 'text-racket-orange'}`}>
                      {service.price}
                    </span>
                    <span className={`text-sm ${service.popular ? 'text-white/80' : 'text-racket-gray'}`}>
                      {service.turnaround}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${service.popular ? 'text-white' : 'text-racket-green'}`} />
                        <span className={service.popular ? 'text-white/90' : 'text-racket-gray'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 md:py-32 bg-racket-cream">
        <div className="container-racket">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline font-bold text-headline mb-6 text-racket-navy">
                Why Choose Racket Rescue
              </h2>
              <p className="text-body-lg text-racket-gray">
                Trusted by competitive players and recreational enthusiasts throughout Orange County.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit) => (
                <motion.div
                  key={benefit.title}
                  variants={fadeInUp}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="inline-flex p-4 bg-racket-orange/10 rounded-xl mb-6">
                    <benefit.icon className="w-8 h-8 text-racket-orange" />
                  </div>
                  <h3 className="font-headline font-bold text-2xl mb-4 text-racket-navy">
                    {benefit.title}
                  </h3>
                  <p className="text-racket-gray leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* String Brands Section */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-racket">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-16"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-3xl mx-auto">
              <h2 className="font-headline font-bold text-headline mb-6 text-racket-navy">
                Premium String Selection
              </h2>
              <p className="text-body-lg text-racket-gray">
                We stock professional-grade strings from the world&apos;s leading brands.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-4 gap-6">
              {stringBrands.map((brand) => (
                <motion.div
                  key={brand.name}
                  variants={fadeInUp}
                  className="bg-racket-cream p-6 rounded-xl text-center hover:bg-racket-orange/10 transition-colors duration-300"
                >
                  <h3 className="font-headline font-bold text-xl mb-2 text-racket-navy">
                    {brand.name}
                  </h3>
                  <div className="text-2xl font-bold text-racket-orange mb-2">
                    {brand.price}
                  </div>
                  <p className="text-sm text-racket-gray">
                    {brand.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="text-center">
              <p className="text-racket-gray mb-8">
                String prices vary by model. We&apos;ll help you choose the perfect string for your game.
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-racket-orange font-semibold hover:text-racket-red transition-colors"
              >
                View Full String Selection
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-racket-orange to-racket-red text-white">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto space-y-8"
          >
            <h2 className="font-headline font-bold text-headline-lg">
              Ready to Rescue Your Racquet?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Professional stringing services for players who demand excellence. 
              Book your service today and experience the difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white text-racket-orange px-8 py-4 rounded-full text-lg font-semibold hover:bg-racket-cream transition-all hover:scale-105"
              >
                Book Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+19494646645"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
              >
                Call (949) 464-6645
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-24 md:py-32 bg-racket-cream">
        <div className="container-racket">
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Location */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-headline font-bold text-3xl mb-6 text-racket-navy">
                Location
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold text-lg text-racket-navy">Laguna Beach Tennis Academy</p>
                  <p className="text-racket-gray">1098 Balboa Ave</p>
                  <p className="text-racket-gray">Laguna Beach, CA 92651</p>
                </div>
                <p className="text-racket-gray">
                  Located at the beautiful Laguna Beach High School tennis facility.
                </p>
                <a
                  href="https://maps.google.com/?q=1098+Balboa+Ave+Laguna+Beach+CA+92651"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-racket-orange font-semibold hover:text-racket-red transition-colors"
                >
                  Get Directions
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="font-headline font-bold text-3xl mb-6 text-racket-navy">
                Service Hours
              </h3>
              <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-racket-gray">Monday - Friday</span>
                  <span className="font-semibold text-racket-navy">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="text-racket-gray">Saturday</span>
                  <span className="font-semibold text-racket-navy">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-racket-gray">Sunday</span>
                  <span className="font-semibold text-racket-gray">Closed</span>
                </div>
                <div className="pt-4 mt-4 border-t border-racket-orange/20">
                  <p className="text-sm text-racket-gray">
                    <span className="font-semibold text-racket-orange">Same-day service:</span> Drop off before noon for same-day pickup
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

