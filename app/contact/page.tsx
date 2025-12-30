'use client'

import { useState } from 'react'
import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, Send, Check, ArrowRight } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    racquets: '1',
    notes: '',
  })

  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    // TODO: Integrate with ActiveCampaign
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-racket-navy to-racket-slate text-white">
        <div className="container-racket text-center">
          <h1 className="font-headline font-bold text-headline-lg mb-6">
            Book Your Service
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Fill out the form below or give us a call. We&apos;ll confirm your appointment within 24 hours.
          </p>
        </div>
      </section>

      <section className="py-24 bg-racket-cream">
        <div className="container-racket">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl">
              <h2 className="font-headline font-bold text-3xl mb-8 text-racket-navy">
                Request Service
              </h2>

              {submitted ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-racket-green/10 rounded-full mb-6">
                    <Check className="w-8 h-8 text-racket-green" />
                  </div>
                  <h3 className="font-headline font-bold text-2xl mb-4 text-racket-navy">
                    Request Received!
                  </h3>
                  <p className="text-racket-gray mb-8">
                    We&apos;ll confirm your appointment within 24 hours. Check your email for details.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-racket-orange font-semibold hover:text-racket-red transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-racket-navy mb-2">
                        FIRST NAME *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-racket-orange focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-racket-navy mb-2">
                        LAST NAME *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-racket-orange focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-racket-navy mb-2">
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-racket-orange focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-racket-navy mb-2">
                      PHONE *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-racket-orange focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-racket-navy mb-2">
                      SERVICE TYPE *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-racket-orange focus:outline-none transition-colors"
                    >
                      <option value="">Select a service</option>
                      <option value="standard">Standard 24-Hour ($55)</option>
                      <option value="same-day">Same-Day Rush ($65)</option>
                      <option value="customization">Racquet Customization ($50+)</option>
                      <option value="grip">Grip Replacement ($10)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="racquets" className="block text-sm font-semibold text-racket-navy mb-2">
                      NUMBER OF RACQUETS
                    </label>
                    <input
                      type="number"
                      id="racquets"
                      name="racquets"
                      min="1"
                      max="10"
                      value={formData.racquets}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-racket-orange focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-racket-navy mb-2">
                      ADDITIONAL NOTES
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="String preferences, tension, special requests..."
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-racket-orange focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 bg-racket-orange text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-racket-red transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit Request'}
                    <Send className="w-5 h-5" />
                  </button>

                  <p className="text-center text-sm text-racket-gray">
                    We&apos;ll confirm your appointment within 24 hours
                  </p>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Location Card */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="inline-flex p-3 bg-racket-orange/10 rounded-xl mb-4">
                  <MapPin className="w-6 h-6 text-racket-orange" />
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4 text-racket-navy">
                  Location
                </h3>
                <div className="space-y-2 text-racket-gray">
                  <p className="font-semibold text-racket-navy">Laguna Beach Tennis Academy</p>
                  <p>1098 Balboa Ave</p>
                  <p>Laguna Beach, CA 92651</p>
                </div>
                <a
                  href="https://maps.google.com/?q=1098+Balboa+Ave+Laguna+Beach+CA+92651"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-racket-orange font-semibold hover:text-racket-red transition-colors mt-4"
                >
                  Get Directions
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Hours Card */}
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <div className="inline-flex p-3 bg-racket-orange/10 rounded-xl mb-4">
                  <Clock className="w-6 h-6 text-racket-orange" />
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4 text-racket-navy">
                  Service Hours
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-racket-gray">Monday - Friday</span>
                    <span className="font-semibold text-racket-navy">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="text-racket-gray">Saturday</span>
                    <span className="font-semibold text-racket-navy">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-racket-gray">Sunday</span>
                    <span className="font-semibold text-racket-gray">Closed</span>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-racket-orange/10 rounded-lg">
                  <p className="text-sm text-racket-gray">
                    <span className="font-semibold text-racket-orange">Same-day service:</span> Drop off before noon for same-day pickup
                  </p>
                </div>
              </div>

              {/* Phone Card */}
              <div className="bg-racket-orange p-8 rounded-2xl shadow-xl text-white">
                <div className="inline-flex p-3 bg-white/20 rounded-xl mb-4">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-headline font-bold text-2xl mb-4">
                  Call Us
                </h3>
                <a
                  href="tel:+19494646645"
                  className="block text-3xl font-bold mb-2 hover:text-white/90 transition-colors"
                >
                  (949) 464-6645
                </a>
                <p className="text-white/80">
                  Prefer to call? We&apos;re happy to answer your questions and book your service over the phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

