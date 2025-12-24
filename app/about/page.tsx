import { Metadata } from 'next'
import Link from 'next/link'
import { Award, Users, Target, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us | Racket Rescue',
  description: 'Learn about Racket Rescue - professional racquet stringing services backed by 25+ years of experience and a passion for the game.',
}

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'Every racquet is strung with precision and care, meeting the highest professional standards.',
  },
  {
    icon: Users,
    title: 'Service',
    description: 'We treat every customer like a champion, from beginners to touring professionals.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Your specifications matter. We string to exact tension and pattern requirements.',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-racket-orange to-racket-red text-white">
        <div className="container-racket text-center">
          <h1 className="font-headline font-bold text-headline-lg mb-6">
            About Racket Rescue
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Professional racquet services backed by 25+ years of experience and a passion for the game.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 bg-white">
        <div className="container-racket max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <h2 className="font-headline font-bold text-headline text-racket-navy mb-6">
              Our Story
            </h2>
            <div className="text-body text-racket-gray space-y-6 leading-relaxed">
              <p>
                Racket Rescue was founded with a simple mission: provide professional-quality racquet stringing 
                and customization services to players of all levels in Orange County.
              </p>
              <p>
                As part of <strong className="text-racket-navy">Laguna Beach Tennis Academy</strong>, we understand 
                the importance of properly maintained equipment. Founded by <strong className="text-racket-navy">Andrew Mateljan</strong>, 
                a coach with over 25 years of experience working with ATP and WTA professionals, we bring tour-level 
                expertise to every racquet we string.
              </p>
              <p>
                Whether you&apos;re a competitive junior preparing for a tournament, a weekend warrior looking to improve 
                your game, or a teaching professional who needs reliable service for your clients, we&apos;ve got you covered.
              </p>
              <p className="text-racket-orange font-semibold">
                Your racquet is your most important piece of equipment. Let us help you get the most out of it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-racket-cream">
        <div className="container-racket">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-headline font-bold text-headline mb-6 text-racket-navy">
              Our Values
            </h2>
            <p className="text-body-lg text-racket-gray">
              These principles guide every racquet we string and every customer we serve.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {values.map((value) => (
              <div key={value.title} className="bg-white p-8 rounded-2xl shadow-lg text-center">
                <div className="inline-flex p-4 bg-racket-orange/10 rounded-xl mb-6">
                  <value.icon className="w-8 h-8 text-racket-orange" />
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4 text-racket-navy">
                  {value.title}
                </h3>
                <p className="text-racket-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="py-24 bg-white">
        <div className="container-racket">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-racket-navy to-racket-slate text-white p-12 md:p-16 rounded-3xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-bold text-racket-orange mb-2">25+</div>
                <div className="text-white/80 uppercase tracking-wide">Years Experience</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-racket-orange mb-2">1000+</div>
                <div className="text-white/80 uppercase tracking-wide">Racquets Strung</div>
              </div>
              <div>
                <div className="text-5xl font-bold text-racket-orange mb-2">100%</div>
                <div className="text-white/80 uppercase tracking-wide">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-racket-cream">
        <div className="container-racket text-center">
          <h2 className="font-headline font-bold text-headline-lg mb-6 text-racket-navy">
            Experience the Difference
          </h2>
          <p className="text-xl text-racket-gray mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied players who trust Racket Rescue with their equipment.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 bg-racket-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-racket-red transition-all hover:scale-105"
          >
            Book Your Service
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </main>
  )
}

