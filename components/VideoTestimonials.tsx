'use client'

import { motion } from 'framer-motion'
import { Play, Star } from 'lucide-react'
import { useState } from 'react'

const videoTestimonials = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    role: 'USTA 4.5 Player',
    thumbnail: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop',
    videoUrl: '', // TODO: Add real video URL
    quote: 'The pickup service is incredible. My strings have never felt better!',
    rating: 5,
  },
  {
    id: 2,
    name: 'Mike Rodriguez',
    role: 'High School Coach',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
    videoUrl: '', // TODO: Add real video URL
    quote: 'I use them for my entire team. Consistent quality every time.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Jennifer Park',
    role: 'Tournament Player',
    thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop',
    videoUrl: '', // TODO: Add real video URL
    quote: 'Express service saved me before a tournament. They really understand urgency!',
    rating: 5,
  },
]

export default function VideoTestimonials() {
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)

  return (
    <section className="py-32 bg-racket-black text-white">
      <div className="container-racket">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            Hear From Our Players
          </h2>
          <p className="text-2xl text-white/80">
            Real customers, real results
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {videoTestimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group cursor-pointer"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-800">
                <img
                  src={testimonial.thumbnail}
                  alt={testimonial.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 bg-racket-red rounded-full flex items-center justify-center shadow-2xl"
                  >
                    <Play className="w-10 h-10 text-white fill-current ml-1" />
                  </motion.div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                  0:15
                </div>
              </div>

              {/* Info */}
              <div>
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-1">{testimonial.name}</h3>
                <p className="text-white/60 text-sm mb-3">{testimonial.role}</p>
                <p className="text-white/80 italic">"{testimonial.quote}"</p>
              </div>

              {/* TODO: Video Modal */}
              <div className="mt-4 text-center">
                <span className="text-sm text-racket-red font-bold">
                  → Video coming soon - using placeholder
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

