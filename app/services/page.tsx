import { Metadata } from 'next'
import Link from 'next/link'
import { Check, Clock, Zap, Award, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services & Pricing | Racket Rescue',
  description: 'Professional racquet stringing services from $55. 24-hour turnaround standard. Same-day rush service available. Expert customization.',
}

const services = [
  {
    id: 'standard',
    title: 'Standard 24-Hour',
    price: '$55',
    turnaround: '24 Hours',
    icon: Check,
    description: 'Professional stringing with next-day turnaround.',
    features: [
      'Quality multifilament string included',
      '24-hour turnaround guaranteed',
      'Free pickup & delivery in Laguna Beach',
      'Text status updates throughout',
      'Professional tension calibration',
      'Racquet inspection included',
    ],
    ideal: 'Perfect for regular players who want quality and convenience',
  },
  {
    id: 'same-day',
    title: 'Same-Day Rush',
    price: '$65',
    turnaround: 'Same Day',
    icon: Zap,
    popular: true,
    description: 'Priority service for players who need their racquet fast.',
    features: [
      'Drop off morning, pick up same day',
      'Priority queue - your racquet goes first',
      'Perfect for tournament preparation',
      'All standard service benefits included',
      'Text notification when ready',
      'Premium string options available',
    ],
    ideal: 'Ideal for tournament players and urgent match preparation',
  },
  {
    id: 'customization',
    title: 'Racquet Customization',
    price: '$50+',
    turnaround: 'Varies',
    icon: Award,
    description: 'Professional racquet customization and modifications.',
    features: [
      'Weight and balance adjustments',
      'Lead tape installation and positioning',
      'Grip size modification',
      'Swingweight optimization',
      'Professional consultation included',
      'Testing and fine-tuning available',
    ],
    ideal: 'For competitive players seeking performance optimization',
  },
  {
    id: 'grip',
    title: 'Grip Replacement',
    price: '$10',
    turnaround: 'Same Day',
    icon: Check,
    description: 'Quick and professional grip replacement service.',
    features: [
      'Premium replacement grips available',
      'Overgrip installation',
      'Multiple grip options (tacky, cushioned, dry)',
      'Proper tension and wrapping',
      'Quick turnaround time',
      'Bulk discounts available',
    ],
    ideal: 'Essential for maintaining comfort and control',
  },
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

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-racket-navy to-racket-slate text-white">
        <div className="container-racket text-center">
          <h1 className="font-headline font-bold text-headline-lg mb-6">
            Our Services
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Professional racquet services designed for players who demand excellence.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 bg-white">
        <div className="container-racket space-y-16">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`flex flex-col md:flex-row gap-8 items-start ${
                index % 2 === 1 ? 'md:flex-row-reverse' : ''
              }`}
            >
              <div className="flex-1 space-y-6">
                <div className="inline-flex p-4 bg-racket-orange/10 rounded-xl">
                  <service.icon className="w-8 h-8 text-racket-orange" />
                </div>
                
                {service.popular && (
                  <div className="inline-block bg-racket-orange text-white px-4 py-1 rounded-full text-sm font-semibold uppercase tracking-wide">
                    Most Popular
                  </div>
                )}

                <div>
                  <h2 className="font-headline font-bold text-headline-sm text-racket-navy mb-2">
                    {service.title}
                  </h2>
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-5xl font-bold text-racket-orange">{service.price}</span>
                    <span className="text-racket-gray">Turnaround: {service.turnaround}</span>
                  </div>
                  <p className="text-body text-racket-gray leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-racket-green flex-shrink-0 mt-1" />
                      <span className="text-racket-gray">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-racket-cream p-4 rounded-xl">
                  <p className="text-sm text-racket-gray">
                    <span className="font-semibold text-racket-navy">Ideal for:</span> {service.ideal}
                  </p>
                </div>
              </div>

              <div className="flex-1 bg-racket-cream rounded-2xl p-12 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <service.icon className="w-32 h-32 text-racket-orange/30 mx-auto mb-4" />
                  <p className="text-racket-gray font-medium">Service Image</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* String Brands */}
      <section className="py-24 bg-racket-cream">
        <div className="container-racket">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline font-bold text-headline mb-6 text-racket-navy">
              String Selection
            </h2>
            <p className="text-body-lg text-racket-gray">
              We stock premium strings from the world&apos;s leading manufacturers. Not sure what to choose? We&apos;ll help you find the perfect string for your game.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {stringTypes.map((type) => (
              <div key={type.category} className="bg-white p-8 rounded-xl shadow-lg">
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

          <div className="text-center mt-12">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-racket-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-racket-red transition-all hover:scale-105"
              >
                Book Service
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="tel:+19494646645"
                className="inline-flex items-center justify-center gap-2 bg-white text-racket-navy border-2 border-racket-navy px-8 py-4 rounded-full text-lg font-semibold hover:bg-racket-navy hover:text-white transition-all"
              >
                Call for Consultation
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
