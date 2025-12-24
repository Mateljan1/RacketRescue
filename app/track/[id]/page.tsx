'use client'

import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, MapPin, Phone } from 'lucide-react'
import { use } from 'react'

const statusSteps = [
  { id: 'pending', label: 'Order Placed', icon: Clock },
  { id: 'picked_up', label: 'Picked Up', icon: Truck },
  { id: 'in_progress', label: 'Being Strung', icon: Package },
  { id: 'quality_check', label: 'Quality Check', icon: CheckCircle },
  { id: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: CheckCircle },
]

export default function TrackOrderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  
  // Mock data - would come from Base44 API
  const order = {
    id,
    status: 'in_progress',
    racket: 'Wilson Pro Staff 97',
    service: 'Pro-Performance',
    pickup_address: '123 Ocean Ave, Laguna Beach',
    delivery_address: '123 Ocean Ave, Laguna Beach',
    pickup_time: '2025-12-24T10:00:00',
    estimated_delivery: '2025-12-26T14:00:00',
    current_location: 'LBTA Facility - 1098 Balboa Ave',
    stringer: 'Andrew Mateljan',
    progress: 45,
  }

  const currentStepIndex = statusSteps.findIndex(s => s.id === order.status)

  return (
    <main className="min-h-screen bg-racket-lightgray pt-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-racket-black to-racket-charcoal text-white py-16">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-4">Track Your Order</h1>
            <p className="text-2xl text-white/80">Order #{id}</p>
          </motion.div>
        </div>
      </section>

      <div className="container-racket py-16 max-w-5xl">
        {/* Progress Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-10 mb-8"
        >
          <h2 className="text-3xl font-bold text-racket-black mb-10">Order Status</h2>

          <div className="relative">
            {statusSteps.map((step, i) => {
              const StepIcon = step.icon
              const isComplete = i <= currentStepIndex
              const isCurrent = i === currentStepIndex

              return (
                <div key={step.id} className="relative">
                  <div className="flex items-center gap-6 mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.15, type: "spring", stiffness: 200 }}
                      className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center ${
                        isComplete
                          ? 'bg-racket-green text-white shadow-xl'
                          : 'bg-gray-200 text-racket-gray'
                      } ${isCurrent ? 'ring-4 ring-racket-red/30 scale-110' : ''}`}
                    >
                      <StepIcon className="w-8 h-8" />
                    </motion.div>

                    <div className="flex-1">
                      <div className={`text-xl font-bold ${isComplete ? 'text-racket-black' : 'text-racket-gray'}`}>
                        {step.label}
                      </div>
                      {isCurrent && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="text-racket-red font-semibold flex items-center gap-2 mt-1"
                        >
                          <div className="w-2 h-2 bg-racket-red rounded-full animate-pulse" />
                          In Progress
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Connecting line */}
                  {i < statusSteps.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-12 bg-gray-200 -z-0">
                      <motion.div
                        initial={{ scaleY: 0 }}
                        animate={{ scaleY: isComplete ? 1 : 0 }}
                        transition={{ delay: i * 0.15 + 0.3, duration: 0.4 }}
                        style={{ transformOrigin: 'top' }}
                        className="w-full h-full bg-racket-green"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Progress Bar */}
          <div className="mt-10 p-6 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-racket-gray">Overall Progress</span>
              <span className="text-2xl font-bold text-racket-red">{order.progress}%</span>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${order.progress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-racket-red to-red-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Live Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-10 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <MapPin className="w-8 h-8 text-racket-blue" />
            <h2 className="text-3xl font-bold text-racket-black">Live Location</h2>
          </div>

          {/* Map Placeholder */}
          <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6Ii8+PHBhdGggZD0iTTAgMGg0MHY0MEgweiIgZmlsbD0iI2YzZjRmNiIgZmlsbC1vcGFjaXR5PSIuNCIvPjwvZz48L3N2Zz4=')] opacity-50" />
            
            <div className="relative z-10 text-center">
              <div className="inline-flex p-6 bg-racket-red/20 rounded-full mb-4">
                <Truck className="w-16 h-16 text-racket-red" />
              </div>
              <div className="text-2xl font-bold text-racket-black mb-2">
                Currently at LBTA Facility
              </div>
              <div className="text-racket-gray">
                {order.current_location}
              </div>
            </div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-racket-blue/10 rounded-xl">
              <div className="text-sm text-racket-gray mb-1">Estimated Delivery</div>
              <div className="text-xl font-bold text-racket-black">
                {new Date(order.estimated_delivery).toLocaleString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: '2-digit',
                })}
              </div>
            </div>
            <div className="p-4 bg-racket-green/10 rounded-xl">
              <div className="text-sm text-racket-gray mb-1">Your Stringer</div>
              <div className="text-xl font-bold text-racket-black">{order.stringer}</div>
            </div>
          </div>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-10"
        >
          <h2 className="text-2xl font-bold text-racket-black mb-6">Order Details</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-racket-gray mb-1">Racket</div>
                <div className="text-xl font-bold text-racket-black">{order.racket}</div>
              </div>
              <div>
                <div className="text-sm text-racket-gray mb-1">Service</div>
                <div className="text-xl font-bold text-racket-black">{order.service}</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-sm text-racket-gray mb-1">Pickup</div>
                <div className="text-racket-black">{order.pickup_address}</div>
              </div>
              <div>
                <div className="text-sm text-racket-gray mb-1">Delivery</div>
                <div className="text-racket-black">{order.delivery_address}</div>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <a
              href="tel:+19494646645"
              className="flex items-center justify-center gap-3 bg-racket-red text-white py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors"
            >
              <Phone className="w-5 h-5" />
              Questions? Call (949) 464-6645
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

