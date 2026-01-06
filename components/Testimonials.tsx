'use client'

import { motion } from 'framer-motion'
import { Star, Quote, CheckCircle } from 'lucide-react'
import Image from 'next/image'

const testimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'USTA 4.5 Player',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    quote: 'The pickup and delivery service is a game-changer. My strings have never felt better, and I never have to leave home!',
    rating: 5,
    service: 'Pro-Performance Member',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'High School Coach',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    quote: 'I use Racket Rescue for my entire team. The consistency and quality are unmatched. Plus the team pricing saves our program thousands.',
    rating: 5,
    service: 'Family Plan',
  },
  {
    id: 3,
    name: 'Jennifer Rodriguez',
    role: 'Tournament Player',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    quote: 'Express service has saved me before tournaments multiple times. They understand the urgency and always deliver. Literally!',
    rating: 5,
    service: 'Elite Member',
  },
  {
    id: 4,
    name: 'David Park',
    role: 'Weekend Warrior',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    quote: 'Best investment I made was the Standard membership. Free pickup every time plus I save on every order. Pays for itself!',
    rating: 5,
    service: 'Standard Member',
  },
]

export default function Testimonials() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-racket-lightgray via-white to-racket-lightgray opacity-50" />
      
      <div className="container-racket relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-racket-black mb-6">
            What Players Are Saying
          </h2>
          <p className="text-2xl text-racket-gray">
            Join hundreds of satisfied players throughout Orange County
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100 hover:border-racket-red/30 transition-all"
            >
              <div className="flex items-start gap-6 mb-6">
                <div className="relative flex-shrink-0">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover ring-4 ring-racket-lightgray"
                  />
                  <div className="absolute -bottom-2 -right-2 p-2 bg-racket-red rounded-full shadow-lg">
                    <Star className="w-4 h-4 text-white fill-current" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-racket-black mb-1">
                    {testimonial.name}
                  </h3>
                  <p className="text-racket-gray mb-2">{testimonial.role}</p>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-racket-red fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-10 h-10 text-racket-red/10" />
                <p className="text-lg text-racket-gray leading-relaxed pl-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <span className="inline-flex items-center gap-2 bg-racket-green/10 text-racket-green px-4 py-2 rounded-full text-sm font-bold">
                  <CheckCircle className="w-4 h-4" />
                  {testimonial.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-wrap justify-center gap-12 text-center"
        >
          <div>
            <div className="text-5xl font-bold text-racket-red mb-2">4.9</div>
            <div className="flex gap-1 justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-racket-red fill-current" />
              ))}
            </div>
            <div className="text-racket-gray">Average Rating</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-racket-red mb-2">312</div>
            <div className="text-racket-gray">5-Star Reviews</div>
          </div>
          <div>
            <div className="text-5xl font-bold text-racket-red mb-2">99.7%</div>
            <div className="text-racket-gray">Satisfaction Rate</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
