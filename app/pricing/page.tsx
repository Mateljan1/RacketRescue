import { Metadata } from 'next'
import Link from 'next/link'
import { Check, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Pricing | Racket Rescue',
  description: 'Transparent pricing for professional racquet stringing services. Standard 24-hour service $55, same-day rush $65. Free pickup & delivery.',
}

const pricingTiers = [
  {
    name: 'Standard',
    price: '$55',
    turnaround: '24 Hours',
    description: 'Quality stringing with next-day turnaround',
    features: [
      'Quality multifilament string',
      '24-hour turnaround',
      'Free pickup & delivery',
      'Text status updates',
      'Racquet inspection',
    ],
  },
  {
    name: 'Same-Day',
    price: '$65',
    turnaround: 'Same Day',
    description: 'Priority service for urgent needs',
    popular: true,
    features: [
      'Drop off morning',
      'Pick up same day',
      'Priority queue',
      'Text notifications',
      'All standard benefits',
      'Tournament ready',
    ],
  },
  {
    name: '3-Pack',
    price: '$150',
    turnaround: '24 Hours',
    description: 'Best value for multiple racquets',
    features: [
      'String 3 racquets',
      'Save $15 total',
      '24-hour turnaround',
      'Free pickup & delivery',
      'Mix string types',
      'Perfect for serious players',
    ],
  },
]

const addOns = [
  { service: 'Grip Replacement', price: '$10', description: 'Premium replacement grip' },
  { service: 'Overgrip Installation', price: '$5', description: 'Professional overgrip application' },
  { service: 'Dampener', price: '$3', description: 'Vibration dampener installation' },
  { service: 'Rush Service (2-4 hours)', price: '+$20', description: 'Emergency same-day priority' },
]

const stringTypes = [
  {
    category: 'Polyester',
    description: 'Maximum spin and control for aggressive players',
    brands: ['Luxilon', 'Solinco', 'Babolat RPM'],
    priceRange: '$15-35',
  },
  {
    category: 'Multifilament',
    description: 'Comfortable, arm-friendly with excellent feel',
    brands: ['Babolat Touch', 'Wilson NXT', 'Tecnifibre X-One'],
    priceRange: '$18-30',
  },
  {
    category: 'Natural Gut',
    description: 'Ultimate feel and power, premium choice',
    brands: ['Babolat VS', 'Wilson Natural Gut', 'Luxilon Natural Gut'],
    priceRange: '$35-45',
  },
  {
    category: 'Hybrid',
    description: 'Best of both worlds - spin + comfort',
    brands: ['Custom combinations available'],
    priceRange: '$25-40',
  },
]

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-racket-orange to-racket-red text-white">
        <div className="container-racket text-center">
          <h1 className="font-headline font-bold text-headline-lg mb-6">
            Transparent Pricing
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            No hidden fees. No surprises. Just professional service at fair prices.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 bg-white">
        <div className="container-racket">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 hover:-translate-y-2 ${
                  tier.popular
                    ? 'bg-racket-orange text-white border-racket-orange shadow-2xl scale-105'
                    : 'bg-white border-gray-200 hover:border-racket-orange hover:shadow-xl'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-racket-red text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}

                <h3 className={`font-headline font-bold text-3xl mb-2 ${tier.popular ? 'text-white' : 'text-racket-navy'}`}>
                  {tier.name}
                </h3>
                
                <div className="mb-6">
                  <div className={`text-5xl font-bold mb-2 ${tier.popular ? 'text-white' : 'text-racket-orange'}`}>
                    {tier.price}
                  </div>
                  <div className={`text-sm ${tier.popular ? 'text-white/80' : 'text-racket-gray'}`}>
                    Turnaround: {tier.turnaround}
                  </div>
                </div>

                <p className={`mb-8 ${tier.popular ? 'text-white/90' : 'text-racket-gray'}`}>
                  {tier.description}
                </p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${tier.popular ? 'text-white' : 'text-racket-green'}`} />
                      <span className={tier.popular ? 'text-white/90' : 'text-racket-gray'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/contact"
                  className={`block w-full text-center py-4 rounded-full font-semibold transition-all hover:scale-105 ${
                    tier.popular
                      ? 'bg-white text-racket-orange hover:bg-racket-cream'
                      : 'bg-racket-orange text-white hover:bg-racket-red'
                  }`}
                >
                  Book This Service
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons */}
      <section className="py-24 bg-racket-cream">
        <div className="container-racket">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline font-bold text-headline mb-6 text-racket-navy">
              Add-On Services
            </h2>
            <p className="text-body-lg text-racket-gray">
              Enhance your racquet service with these popular add-ons.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {addOns.map((addon) => (
              <div
                key={addon.service}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow flex items-center justify-between"
              >
                <div>
                  <h3 className="font-headline font-semibold text-xl text-racket-navy mb-1">
                    {addon.service}
                  </h3>
                  <p className="text-sm text-racket-gray">{addon.description}</p>
                </div>
                <div className="text-2xl font-bold text-racket-orange">
                  {addon.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* String Pricing */}
      <section className="py-24 bg-white">
        <div className="container-racket">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline font-bold text-headline mb-6 text-racket-navy">
              String Pricing
            </h2>
            <p className="text-body-lg text-racket-gray">
              String cost is separate from stringing service. We stock a wide variety of premium strings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {stringTypes.map((type) => (
              <div key={type.category} className="bg-racket-cream p-8 rounded-xl">
                <h3 className="font-headline font-bold text-2xl mb-3 text-racket-navy">
                  {type.category}
                </h3>
                <div className="text-3xl font-bold text-racket-orange mb-4">
                  {type.priceRange}
                </div>
                <p className="text-racket-gray mb-6">
                  {type.description}
                </p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-racket-slate">Available brands:</p>
                  {type.brands.map((brand) => (
                    <div key={brand} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-racket-orange rounded-full" />
                      <span className="text-racket-gray">{brand}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-racket-navy text-white">
        <div className="container-racket text-center">
          <h2 className="font-headline font-bold text-headline-lg mb-6">
            Questions About Pricing?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            We&apos;re happy to discuss your specific needs and recommend the best service for your playing style.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-racket-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-racket-red transition-all hover:scale-105"
            >
              Book Service
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a
              href="tel:+19494646645"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white border border-white/30 px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all"
            >
              Call (949) 464-6645
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

