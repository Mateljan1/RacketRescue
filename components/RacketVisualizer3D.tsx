'use client'

import { motion } from 'framer-motion'
import { RotateCw, ZoomIn, ZoomOut, Info, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function RacketVisualizer3D() {
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [showStringBed, setShowStringBed] = useState(false)

  return (
    <section className="py-32 bg-gradient-to-br from-racket-black to-racket-charcoal text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,31,39,0.3),transparent_70%)]" />
      </div>

      <div className="container-racket relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-racket-orange/20 text-racket-orange px-6 py-3 rounded-full font-bold mb-8">
            <RotateCw className="w-5 h-5" />
            INTERACTIVE 3D PREVIEW
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            See Your Racket Like Never Before
          </h2>
          <p className="text-2xl text-white/80">
            Rotate, zoom, and explore how your strings will look
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* 3D Visualizer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-3xl p-12 border-2 border-white/10"
          >
            {/* Placeholder for 3D view - would integrate Three.js or Spline */}
            <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl flex items-center justify-center relative overflow-hidden group">
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ scale: zoom }}
                className="relative w-3/4 h-3/4"
              >
                {/* Simplified racket visual */}
                <svg
                  viewBox="0 0 200 400"
                  className="w-full h-full drop-shadow-2xl"
                >
                  {/* Racket handle */}
                  <rect x="85" y="240" width="30" height="160" rx="15" fill="#1a1a1a" />
                  <rect x="90" y="245" width="20" height="150" rx="10" fill="#4b5563" />
                  
                  {/* Racket head */}
                  <ellipse cx="100" cy="120" rx="80" ry="115" fill="none" stroke="#1a1a1a" strokeWidth="8" />
                  <ellipse cx="100" cy="120" rx="72" ry="107" fill="none" stroke="#ec1f27" strokeWidth="2" />
                  
                  {/* String bed */}
                  {showStringBed && (
                    <g className="animate-fade-in">
                      {/* Vertical strings */}
                      {[...Array(16)].map((_, i) => (
                        <line
                          key={`v${i}`}
                          x1={25 + i * 10}
                          y1="20"
                          x2={25 + i * 10}
                          y2="220"
                          stroke="#ec1f27"
                          strokeWidth="0.5"
                          opacity="0.7"
                        />
                      ))}
                      {/* Horizontal strings */}
                      {[...Array(18)].map((_, i) => (
                        <line
                          key={`h${i}`}
                          x1="25"
                          y1={20 + i * 11}
                          x2="175"
                          y2={20 + i * 11}
                          stroke="#ec1f27"
                          strokeWidth="0.5"
                          opacity="0.7"
                        />
                      ))}
                    </g>
                  )}
                </svg>
              </motion.div>

              {/* Controls Overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRotation(r => r - 45)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <RotateCw className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setZoom(z => Math.min(z + 0.2, 2))}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <ZoomIn className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setZoom(z => Math.max(z - 0.2, 0.5))}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
                >
                  <ZoomOut className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowStringBed(!showStringBed)}
              className="mt-6 w-full bg-racket-red text-white py-4 rounded-full font-bold hover:bg-red-600 transition-colors"
            >
              {showStringBed ? 'Hide' : 'Show'} String Bed
            </motion.button>
          </motion.div>

          {/* Features */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-3xl font-bold mb-8">Interactive Features</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <RotateCw className="w-8 h-8 text-racket-red flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">360° Rotation</h4>
                    <p className="text-white/80">
                      See your racket from every angle. Inspect the frame, strings, and grip.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <ZoomIn className="w-8 h-8 text-racket-red flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">Zoom & Inspect</h4>
                    <p className="text-white/80">
                      Get close to see string pattern, tension, and quality details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/10 rounded-2xl backdrop-blur-sm">
                  <Info className="w-8 h-8 text-racket-red flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-bold mb-2">String Visualization</h4>
                    <p className="text-white/80">
                      See how different strings and tensions look before ordering.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8"
            >
              <Link
                href="/schedule"
                className="block w-full bg-white text-racket-red py-5 rounded-full text-xl font-bold text-center shadow-xl hover:shadow-2xl transition-all"
              >
                Try It With Your Order →
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-racket-orange/20 text-racket-orange px-6 py-3 rounded-full font-bold">
            <Sparkles className="w-5 h-5" />
            Full 3D visualizer coming soon with AR preview!
          </div>
        </motion.div>
      </div>
    </section>
  )
}

