'use client'

import { motion } from 'framer-motion'
import { Plus, Edit2, Trash2, RefreshCw, Camera, Calendar } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Racket {
  id: string
  name: string
  brand: string
  model: string
  main_tension: number
  cross_tension: number
  last_string: string
  last_strung_date: string
  times_strung: number
  image?: string
  notes?: string
}

const mockRackets: Racket[] = [
  {
    id: '1',
    name: 'Match Racket',
    brand: 'Wilson',
    model: 'Pro Staff 97',
    main_tension: 55,
    cross_tension: 53,
    last_string: 'Luxilon ALU Power',
    last_strung_date: '2025-12-10',
    times_strung: 8,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800',
  },
  {
    id: '2',
    name: 'Practice Racket',
    brand: 'Babolat',
    model: 'Pure Aero',
    main_tension: 52,
    cross_tension: 52,
    last_string: 'Wilson Velocity MLT',
    last_strung_date: '2025-11-28',
    times_strung: 12,
  },
]

export default function RacketsPage() {
  const [rackets, setRackets] = useState(mockRackets)

  const daysSinceStrung = (date: string) => {
    const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24))
    return days
  }

  const needsRestring = (date: string) => {
    return daysSinceStrung(date) > 30
  }

  return (
    <main className="min-h-screen bg-racket-lightgray pt-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-racket-black to-racket-charcoal text-white py-16">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-4">My Rackets</h1>
            <p className="text-2xl text-white/80">Manage your racket profiles for lightning-fast reordering</p>
          </motion.div>
        </div>
      </section>

      <div className="container-racket py-12">
        {/* Add New Racket */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8 cursor-pointer border-4 border-dashed border-gray-300 hover:border-racket-red transition-all"
        >
          <div className="flex items-center justify-center gap-4 text-racket-gray group-hover:text-racket-red">
            <Plus className="w-10 h-10" />
            <div>
              <div className="text-2xl font-bold text-racket-black">Add New Racket</div>
              <div className="text-racket-gray">Create a profile for faster reordering</div>
            </div>
          </div>
        </motion.div>

        {/* Racket Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {rackets.map((racket, i) => (
            <motion.div
              key={racket.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Racket Image */}
              <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200">
                {racket.image ? (
                  <Image
                    src={racket.image}
                    alt={racket.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="w-20 h-20 text-gray-400" />
                  </div>
                )}
                
                {needsRestring(racket.last_strung_date) && (
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-2 bg-racket-orange text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                      <Calendar className="w-4 h-4" />
                      Time to Restring!
                    </span>
                  </div>
                )}
              </div>

              {/* Racket Details */}
              <div className="p-8">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-racket-black mb-1">
                      {racket.name}
                    </h3>
                    <p className="text-lg text-racket-gray">
                      {racket.brand} {racket.model}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 className="w-5 h-5 text-racket-gray" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5 text-racket-gray hover:text-racket-red" />
                    </button>
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="text-sm text-racket-gray mb-1">Main Tension</div>
                    <div className="text-xl font-bold text-racket-black">{racket.main_tension} lbs</div>
                  </div>
                  <div>
                    <div className="text-sm text-racket-gray mb-1">Cross Tension</div>
                    <div className="text-xl font-bold text-racket-black">{racket.cross_tension} lbs</div>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-racket-gray mb-1">Last String</div>
                    <div className="font-semibold text-racket-black">{racket.last_string}</div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-racket-blue/10 rounded-xl">
                    <div className="text-2xl font-bold text-racket-blue">{daysSinceStrung(racket.last_strung_date)}</div>
                    <div className="text-xs text-racket-gray">Days since strung</div>
                  </div>
                  <div className="text-center p-3 bg-racket-green/10 rounded-xl">
                    <div className="text-2xl font-bold text-racket-green">{racket.times_strung}</div>
                    <div className="text-xs text-racket-gray">Times strung</div>
                  </div>
                </div>

                {/* Quick Reorder */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-racket-red text-white py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
                >
                  <RefreshCw className="w-5 h-5" />
                  Reorder with Same Specs
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 bg-racket-blue/10 border-2 border-racket-blue/30 rounded-3xl p-10 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-racket-black mb-4">
            Save Time with Racket Profiles
          </h3>
          <p className="text-lg text-racket-gray leading-relaxed mb-6">
            Create a profile for each of your rackets and reorder in just 2 clicks. We&apos;ll remember all your preferences: brand, model, string type, tension, and any special instructions.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-racket-red mb-2">2 Clicks</div>
              <div className="text-racket-gray">To reorder</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-racket-red mb-2">0 min</div>
              <div className="text-racket-gray">Fill out forms</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-racket-red mb-2">100%</div>
              <div className="text-racket-gray">Same specs</div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
