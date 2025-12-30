'use client'

import { motion } from 'framer-motion'
import { Star, Shield, Award } from 'lucide-react'

export default function TrustBar() {
  return (
    <div className="bg-racket-black text-white py-2.5 relative z-[60]">
      <div className="container-racket">
        <div className="flex items-center justify-center gap-4 md:gap-8 text-sm">
          {/* Reviews - Clickable */}
          <a
            href="https://g.page/r/racketrescue/review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-racket-red transition-colors group"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="font-bold">4.9</span>
            <span className="text-white/70 group-hover:text-white hidden sm:inline">
              from 312 reviews
            </span>
          </a>

          <div className="w-px h-4 bg-white/30 hidden sm:block" />

          {/* USRSA Badge */}
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-racket-red" />
            <span className="font-semibold hidden sm:inline">USRSA Certified</span>
            <span className="font-semibold sm:hidden">Certified</span>
          </div>

          <div className="w-px h-4 bg-white/30 hidden sm:block" />

          {/* Guarantee */}
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span className="font-semibold hidden sm:inline">Satisfaction Guaranteed</span>
            <span className="font-semibold sm:hidden">Guaranteed</span>
          </div>

          {/* Urgency - Desktop Only */}
          <div className="hidden lg:flex items-center gap-2 ml-4">
            <div className="w-px h-4 bg-white/30" />
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-2 h-2 bg-green-400 rounded-full"
            />
            <span className="text-green-400 font-medium">
              3 pickup slots left today
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
