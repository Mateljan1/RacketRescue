'use client'

import { motion } from 'framer-motion'
import { Shield, Sparkles, Zap, Info, Crown, Check, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import StringWizard from '@/components/StringWizard'

const services = [
  {
    id: 'match_ready',
    name: 'Match-Ready',
    price: 35,
    turnaround: '2-3 Days',
    description: 'Professional stringing within 2-3 days',
    subtitle: 'Perfect for casual and club players',
    icon: Shield,
  },
  {
    id: 'pro_performance',
    name: 'Pro-Performance',
    price: 50,
    turnaround: '2 Days',
    description: 'Premium stringing within 2 days',
    subtitle: 'For competitors seeking maximum performance',
    icon: Sparkles,
    popular: true,
  },
]

const stringOptions = [
  { id: 'velocity', name: 'Wilson Velocity MLT', price: 18, type: 'Multifilament', desc: 'Great all-around string' },
  { id: 'rpm_blast', name: 'Babolat RPM Blast', price: 22, type: 'Polyester', desc: 'Maximum spin & control' },
  { id: 'luxilon_alu', name: 'Luxilon ALU Power', price: 25, type: 'Polyester', desc: 'Tour pro favorite' },
  { id: 'nxt', name: 'Wilson NXT', price: 20, type: 'Multifilament', desc: 'Arm-friendly comfort' },
  { id: 'hyper_g', name: 'Solinco Hyper-G', price: 18, type: 'Polyester', desc: 'Spin and durability' },
]

interface Props {
  orderData: any
  setOrderData: (data: any) => void
  onNext: () => void
}

export default function ServiceSelection({ orderData, setOrderData, onNext }: Props) {
  const [showStringWizard, setShowStringWizard] = useState(false)

  const handleStringSelect = (stringId: string, stringName: string, stringPrice: number) => {
    setOrderData({
      ...orderData,
      string_name: stringName,
      string_price: stringPrice,
    })
    setShowStringWizard(false)
  }

  return (
    <div className="space-y-8">
      <StringWizard
        isOpen={showStringWizard}
        onClose={() => setShowStringWizard(false)}
        onSelectString={handleStringSelect}
      />
      {/* Service Package Selection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-racket-black mb-3">Select Service Package</h2>
        <p className="text-racket-gray text-lg mb-10">Choose your stringing service level</p>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            const isSelected = orderData.service_package === service.id

            return (
              <motion.div
                key={service.id}
                whileHover={{ y: -6, boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOrderData({ ...orderData, service_package: service.id })}
                className={`relative cursor-pointer bg-white rounded-2xl p-8 border-4 transition-all ${
                  isSelected
                    ? 'border-racket-red shadow-xl shadow-racket-red/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-2 bg-racket-red text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg">
                      <Crown className="w-4 h-4" />
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center space-y-4">
                  <div className={`inline-flex p-5 rounded-2xl ${isSelected ? 'bg-racket-red/10' : 'bg-gray-50'}`}>
                    <Icon className={`w-10 h-10 ${isSelected ? 'text-racket-red' : 'text-gray-600'}`} />
                  </div>

                  <h3 className="text-2xl font-bold text-racket-black">{service.name}</h3>
                  
                  <div>
                    <div className="text-5xl font-bold text-racket-red mb-1">${service.price}</div>
                    <div className="text-racket-gray">Turnaround: {service.turnaround}</div>
                  </div>

                  <p className="text-lg text-racket-gray">{service.subtitle}</p>

                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="pt-4"
                    >
                      <div className="inline-flex items-center gap-2 bg-racket-green/20 text-racket-green px-4 py-2 rounded-full font-semibold">
                        <Check className="w-5 h-5" />
                        Selected
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Express Add-on */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 bg-racket-orange/10 border-2 border-racket-orange/30 rounded-2xl"
        >
          <label className="flex items-start gap-4 cursor-pointer group">
            <input
              type="checkbox"
              checked={orderData.is_express}
              onChange={(e) => setOrderData({ ...orderData, is_express: e.target.checked })}
              className="mt-1 w-6 h-6 accent-racket-orange"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-6 h-6 text-racket-orange" />
                <span className="text-xl font-bold text-racket-black">Add Express Service</span>
                <span className="text-2xl font-bold text-racket-orange">+$15</span>
              </div>
              <p className="text-racket-gray">
                Next-day turnaround for urgent needs. Get your racket back even faster!
              </p>
            </div>
          </label>
        </motion.div>
      </motion.div>

      {/* String Selection */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl shadow-2xl p-10"
      >
        <h2 className="text-3xl font-bold text-racket-black mb-3">Select String</h2>
        <p className="text-racket-gray text-lg mb-8">Choose from our curated selection or provide your own</p>

        {/* Customer Provides String */}
        <div className="mb-8 p-6 bg-racket-blue/10 border-2 border-racket-blue/30 rounded-2xl">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={orderData.customer_provides_string}
              onChange={(e) => setOrderData({ ...orderData, customer_provides_string: e.target.checked })}
              className="mt-1 w-6 h-6 accent-racket-blue"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <Info className="w-5 h-5 text-racket-blue" />
                <span className="text-lg font-bold text-racket-black">I&apos;ll provide my own string</span>
              </div>
              <p className="text-racket-gray">
                Don&apos;t forget to include your string in the racket cover.
              </p>
            </div>
          </label>
        </div>

        {/* String Selection Grid */}
        {!orderData.customer_provides_string && (
          <div className="space-y-6">
            <button
              onClick={() => setShowStringWizard(true)}
              className="w-full p-6 bg-gradient-to-r from-racket-orange to-orange-500 text-white rounded-2xl font-semibold text-lg hover:shadow-xl transition-all flex items-center justify-center gap-3"
            >
              <Sparkles className="w-6 h-6" />
              Help Me Choose - String Recommendation Wizard
            </button>

            <div className="grid md:grid-cols-2 gap-4">
              {stringOptions.map((string) => {
                const isSelected = orderData.string_name === string.name

                return (
                  <motion.div
                    key={string.id}
                    whileHover={{ y: -4, boxShadow: "0 15px 40px rgba(0,0,0,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setOrderData({
                      ...orderData,
                      string_type: string.type,
                      string_name: string.name,
                      string_price: string.price,
                    })}
                    className={`cursor-pointer p-6 rounded-2xl border-2 transition-all ${
                      isSelected
                        ? 'bg-racket-red/5 border-racket-red shadow-lg'
                        : 'bg-white border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-racket-black">{string.name}</h3>
                        <p className="text-sm text-racket-gray">{string.type}</p>
                      </div>
                      <div className="text-2xl font-bold text-racket-red">
                        ${string.price}
                      </div>
                    </div>
                    <p className="text-racket-gray text-sm">{string.desc}</p>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="mt-4 inline-flex items-center gap-2 bg-racket-green/20 text-racket-green px-3 py-1.5 rounded-full text-sm font-semibold"
                      >
                        <Check className="w-4 h-4" />
                        Selected
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        )}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-end pt-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onNext}
          disabled={!orderData.customer_provides_string && !orderData.string_name}
          className="inline-flex items-center gap-3 bg-racket-red text-white px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          Continue
          <ArrowRight className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  )
}

