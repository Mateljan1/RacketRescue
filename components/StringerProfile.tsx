'use client'

import { motion } from 'framer-motion'
import { Award, CheckCircle, Star } from 'lucide-react'
import Image from 'next/image'

export default function StringerProfile() {
  return (
    <section className="py-24 bg-white">
      <div className="container-racket">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-racket-black mb-4">
            Meet Your Master Stringer
          </h2>
          <p className="text-xl text-racket-gray">
            Your racquet is in expert hands
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-racket-lightgray to-white rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Photo */}
              <div className="relative flex-shrink-0">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-racket-red to-red-600 p-1">
                  <div className="w-full h-full rounded-full bg-racket-lightgray flex items-center justify-center overflow-hidden">
                    <div className="text-7xl">🎾</div>
                  </div>
                </div>
                {/* Certification Badge */}
                <div className="absolute -bottom-2 -right-2 bg-racket-red text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  USRSA Certified
                </div>
              </div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-racket-black mb-2">
                  Jeff Martinez
                </h3>
                <p className="text-racket-red font-semibold text-lg mb-4">
                  Head Stringer & Founder
                </p>

                <p className="text-lg text-racket-gray mb-6 leading-relaxed">
                  With over 25 years of stringing experience, Jeff has worked with USTA tournaments,
                  college teams, and thousands of recreational players. Every racquet receives the same
                  meticulous attention to detail.
                </p>

                {/* Credentials */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-racket-black">
                    <CheckCircle className="w-5 h-5 text-racket-green" />
                    <span className="font-medium">USRSA Master Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-racket-black">
                    <CheckCircle className="w-5 h-5 text-racket-green" />
                    <span className="font-medium">10,000+ racquets strung</span>
                  </div>
                  <div className="flex items-center gap-2 text-racket-black">
                    <CheckCircle className="w-5 h-5 text-racket-green" />
                    <span className="font-medium">Tournament stringer</span>
                  </div>
                  <div className="flex items-center gap-2 text-racket-black">
                    <CheckCircle className="w-5 h-5 text-racket-green" />
                    <span className="font-medium">Babolat certified</span>
                  </div>
                </div>

                {/* Quote */}
                <div className="bg-white rounded-2xl p-6 border-l-4 border-racket-red">
                  <p className="text-racket-gray italic text-lg">
                    "I treat every racquet like it's going to be used in a tournament final.
                    Your game deserves nothing less."
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-4xl font-black text-racket-red">25+</div>
                <div className="text-sm text-racket-gray font-medium mt-1">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-racket-red">10K+</div>
                <div className="text-sm text-racket-gray font-medium mt-1">Racquets Strung</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center gap-1">
                  <Star className="w-6 h-6 text-yellow-400 fill-current" />
                  <span className="text-4xl font-black text-racket-red">4.9</span>
                </div>
                <div className="text-sm text-racket-gray font-medium mt-1">Customer Rating</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
