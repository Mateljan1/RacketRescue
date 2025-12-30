'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { X, Check, Clock, Truck, Star, ArrowRight, MapPin, Phone, Mail, Calendar, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface Service {
  id: string
  name: string
  price: number
  description: string
  turnaround: string
  features: string[]
  popular?: boolean
  badge?: string
}

interface AddOn {
  id: string
  name: string
  price: number
  description: string
}

const services: Service[] = [
  {
    id: 'standard',
    name: 'Standard 24-Hour',
    price: 55,
    description: 'Professional restring with quality multifilament string. Perfect for regular players.',
    turnaround: '24 hours',
    features: ['Professional stringing', 'Quality multifilament string', 'Free pickup & delivery', 'Text updates'],
  },
  {
    id: 'rush',
    name: 'Same-Day Rush',
    price: 65,
    description: 'Need it today? We got you. Priority pickup and same-day return.',
    turnaround: 'Same day',
    features: ['Same-day turnaround', 'Priority pickup slot', 'Choose any string', 'Express delivery'],
    popular: true,
    badge: '⚡ FASTEST',
  },
  {
    id: 'saver',
    name: '3-Racket Saver Pack',
    price: 150,
    description: 'String 3 rackets and save. Perfect for serious players or teams.',
    turnaround: '48 hours',
    features: ['String 3 rackets', 'Mix & match strings', 'Free grip replacement', 'Priority scheduling'],
    badge: '💰 BEST VALUE',
  },
]

const addOns: AddOn[] = [
  {
    id: 'grip',
    name: 'Grip Replacement',
    price: 5,
    description: 'Fresh overgrip installed',
  },
  {
    id: 'clean',
    name: 'Frame Clean & Inspection',
    price: 10,
    description: 'Deep clean + crack check',
  },
]

const stringOptions = [
  { id: 'multi', name: 'Quality Multifilament', description: 'All-around comfort & power', included: true },
  { id: 'poly', name: 'Premium Polyester', description: 'Control & spin', price: 8 },
  { id: 'hybrid', name: 'Hybrid Setup', description: 'Best of both worlds', price: 12 },
  { id: 'tour', name: 'Tour-Level String', description: 'Luxilon, RPM Blast, etc.', price: 18 },
]

export default function ExpressShopPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [selectedString, setSelectedString] = useState('multi')
  const [showModal, setShowModal] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    notes: '',
    preferredTime: 'morning',
  })

  const calculateTotal = () => {
    let total = selectedService?.price || 0
    selectedAddOns.forEach(id => {
      const addon = addOns.find(a => a.id === id)
      if (addon) total += addon.price
    })
    const stringOption = stringOptions.find(s => s.id === selectedString)
    if (stringOption && stringOption.price) total += stringOption.price
    return total
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setShowModal(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(false)
    setShowConfirmation(true)
    // In production, this would send to your backend/API
  }

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    )
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-racket-black to-racket-charcoal text-white">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 bg-racket-red/20 text-racket-red px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              FREE PICKUP & DELIVERY FOR MEMBERS
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6">
              Express Shop
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Choose your service. We'll pick up, string, and deliver — usually within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-racket-lightgray">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-4xl font-bold text-racket-black mb-4">
              Choose Your Service
            </h2>
            <p className="text-xl text-racket-gray">
              All prices include professional stringing + pickup & delivery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
                className={`relative bg-white rounded-3xl p-8 shadow-xl cursor-pointer transition-all ${
                  service.popular ? 'ring-4 ring-racket-red scale-105' : ''
                }`}
                onClick={() => handleServiceSelect(service)}
              >
                {service.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-racket-red text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    {service.badge}
                  </div>
                )}

                <div className="text-center space-y-6">
                  <h3 className="font-headline text-2xl font-bold text-racket-black">
                    {service.name}
                  </h3>

                  <div className="text-6xl font-black text-racket-red">
                    ${service.price}
                  </div>

                  <div className="flex items-center justify-center gap-2 text-racket-gray">
                    <Clock className="w-5 h-5" />
                    <span className="font-semibold">{service.turnaround} turnaround</span>
                  </div>

                  <p className="text-racket-gray">
                    {service.description}
                  </p>

                  <ul className="space-y-3 text-left">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-racket-green flex-shrink-0 mt-0.5" />
                        <span className="text-racket-gray">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full py-4 rounded-full font-bold text-lg font-label transition-all ${
                      service.popular
                        ? 'bg-racket-red text-white shadow-xl hover:bg-red-600'
                        : 'bg-racket-black text-white hover:bg-racket-charcoal'
                    }`}
                  >
                    Request Pickup
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-headline text-4xl font-bold text-racket-black mb-4">
              How Express Delivery Works
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { emoji: '🎾', title: 'Select Service', desc: 'Choose your stringing package above' },
              { emoji: '📍', title: 'Enter Address', desc: 'Tell us where to pick up' },
              { emoji: '🛻', title: 'We Collect', desc: 'We come to your door' },
              { emoji: '✨', title: 'Delivered Ready', desc: 'Tournament-ready, back to you' },
            ].map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl mb-4">{step.emoji}</div>
                <h3 className="font-headline text-lg font-bold text-racket-black mb-2">{step.title}</h3>
                <p className="text-racket-gray text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-racket-lightgray">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-headline text-2xl font-bold text-racket-black mb-6">
              Free Delivery in Orange County
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Laguna Beach', 'Newport Beach', 'Irvine', 'Costa Mesa', 'Dana Point', 'San Clemente', 'Aliso Viejo', 'Laguna Niguel'].map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-racket-gray shadow-sm"
                >
                  <MapPin className="w-4 h-4 text-racket-red" />
                  {city}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Delivery Request Modal */}
      <AnimatePresence>
        {showModal && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between rounded-t-3xl">
                <div>
                  <h2 className="font-headline text-2xl font-bold text-racket-black">
                    Request Pickup
                  </h2>
                  <p className="text-racket-gray">{selectedService.name} - ${selectedService.price}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Content */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* String Selection */}
                <div>
                  <label className="block text-sm font-bold text-racket-black mb-3">
                    Choose Your String
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {stringOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => setSelectedString(option.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedString === option.id
                            ? 'border-racket-red bg-racket-red/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-bold text-racket-black">{option.name}</div>
                        <div className="text-sm text-racket-gray">{option.description}</div>
                        <div className="text-sm font-bold mt-1 text-racket-red">
                          {option.included ? 'Included' : `+$${option.price}`}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div>
                  <label className="block text-sm font-bold text-racket-black mb-3">
                    Add-Ons (Optional)
                  </label>
                  <div className="space-y-3">
                    {addOns.map((addon) => (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => toggleAddOn(addon.id)}
                        className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                          selectedAddOns.includes(addon.id)
                            ? 'border-racket-green bg-racket-green/5'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-left">
                          <div className="font-bold text-racket-black">{addon.name}</div>
                          <div className="text-sm text-racket-gray">{addon.description}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-racket-red">+${addon.price}</span>
                          {selectedAddOns.includes(addon.id) && (
                            <Check className="w-5 h-5 text-racket-green" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-racket-black mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-racket-black mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none"
                      placeholder="(949) 555-1234"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-racket-black mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none"
                    placeholder="john@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-racket-black mb-2">
                    Pickup Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-racket-black mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none"
                      placeholder="Laguna Beach"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-racket-black mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none"
                      placeholder="92651"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-racket-black mb-2">
                    Preferred Pickup Time
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'morning', label: 'Morning', time: '9am - 12pm' },
                      { id: 'afternoon', label: 'Afternoon', time: '12pm - 5pm' },
                      { id: 'evening', label: 'Evening', time: '5pm - 8pm' },
                    ].map((slot) => (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredTime: slot.id })}
                        className={`p-3 rounded-xl border-2 text-center transition-all ${
                          formData.preferredTime === slot.id
                            ? 'border-racket-red bg-racket-red/5'
                            : 'border-gray-200'
                        }`}
                      >
                        <div className="font-bold text-sm">{slot.label}</div>
                        <div className="text-xs text-racket-gray">{slot.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-racket-black mb-2">
                    Special Instructions (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none"
                    rows={3}
                    placeholder="Gate code, tension preference, etc."
                  />
                </div>

                {/* Total & Submit */}
                <div className="sticky bottom-0 bg-white border-t border-gray-100 -mx-6 -mb-6 p-6 rounded-b-3xl">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-racket-black">Total:</span>
                    <span className="text-3xl font-black text-racket-red">${calculateTotal()}</span>
                  </div>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-racket-red text-white py-4 rounded-full font-bold text-lg font-label shadow-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-3"
                  >
                    <Truck className="w-6 h-6" />
                    Request Pickup
                  </motion.button>
                  <p className="text-center text-sm text-racket-gray mt-3">
                    We'll text you to confirm pickup time. Payment collected on delivery.
                  </p>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showConfirmation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center"
            >
              <div className="w-20 h-20 bg-racket-green/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-racket-green" />
              </div>
              <h2 className="font-headline text-3xl font-bold text-racket-black mb-4">
                Request Received!
              </h2>
              <p className="text-lg text-racket-gray mb-6">
                We'll text you within 30 minutes to confirm your pickup time.
              </p>
              <div className="bg-racket-lightgray rounded-2xl p-4 mb-6">
                <div className="text-sm text-racket-gray mb-2">Order Summary</div>
                <div className="font-bold text-racket-black">{selectedService?.name}</div>
                <div className="text-2xl font-black text-racket-red">${calculateTotal()}</div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowConfirmation(false)
                  setSelectedService(null)
                  setSelectedAddOns([])
                  setSelectedString('multi')
                }}
                className="w-full bg-racket-black text-white py-4 rounded-full font-bold text-lg font-label"
              >
                Done
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-racket-red to-red-600 text-white">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-headline text-4xl md:text-5xl font-bold">
              Questions? We're Here to Help
            </h2>
            <p className="text-xl text-white/90">
              Call or text us anytime. We usually respond within minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="tel:+19494646645"
                className="inline-flex items-center gap-3 bg-white text-racket-red px-8 py-4 rounded-full text-lg font-bold font-label shadow-xl"
              >
                <Phone className="w-5 h-5" />
                (949) 464-6645
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                href="sms:+19494646645"
                className="inline-flex items-center gap-3 bg-white/20 backdrop-blur border-2 border-white/40 text-white px-8 py-4 rounded-full text-lg font-bold font-label"
              >
                <Mail className="w-5 h-5" />
                Text Us
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
