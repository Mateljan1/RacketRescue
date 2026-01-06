'use client'

import { useEffect, useState, Suspense, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Package, Clock, MapPin, Phone, Mail, QrCode, Copy, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import QRCode from 'react-qr-code'
import { analytics } from '@/lib/analytics'

interface OrderDetails {
  id: string
  customer_name: string
  customer_email: string
  racket_brand: string
  racket_model: string
  string_name: string
  main_tension: string
  cross_tension: string
  service_type: string
  is_express: boolean
  pickup_address: string
  pickup_time: string
  amount_total: number
  estimated_ready: string
}

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [order, setOrder] = useState<OrderDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const hasTrackedPurchase = useRef(false)

  useEffect(() => {
    if (sessionId) {
      fetchOrderDetails()
    }
  }, [sessionId])

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/orders/${sessionId}`)
      const data = await response.json()
      if (data.order) {
        setOrder(data.order)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  // Track purchase event once order details are loaded
  useEffect(() => {
    if (order && sessionId && !hasTrackedPurchase.current) {
      const items = [{
        item_id: order.service_type || 'unknown',
        item_name: `${order.service_type} Stringing`,
        item_category: 'stringing',
        price: order.amount_total / 100, // Convert cents to dollars
        quantity: 1,
      }]
      
      analytics.purchase(
        sessionId,
        order.amount_total / 100,
        items
      )
      
      hasTrackedPurchase.current = true
    }
  }, [order, sessionId])

  const trackingUrl = `https://www.racketrescue.com/track/${sessionId}`

  const copyTrackingLink = () => {
    navigator.clipboard.writeText(trackingUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-racket-lightgray pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-racket-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-racket-gray">Loading your order...</p>
        </div>
      </main>
    )
  }

  if (!sessionId || !order) {
    return (
      <main className="min-h-screen bg-racket-lightgray pt-24 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-racket-black mb-4">Order Not Found</h1>
          <Link href="/schedule" className="text-racket-red hover:underline">
            Schedule a new service →
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-racket-green/10 to-racket-lightgray pt-24 pb-16">
      {/* Success Header */}
      <section className="py-12">
        <div className="container-racket text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-24 h-24 bg-racket-green rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl"
          >
            <CheckCircle className="w-14 h-14 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-racket-black mb-4">
              Order Confirmed! 🎾
            </h1>
            <p className="text-xl text-racket-gray max-w-2xl mx-auto">
              Thank you, {order.customer_name?.split(' ')[0] || 'Champion'}!
              We&apos;ve received your order and will have your racket ready soon.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-racket max-w-4xl">
        {/* QR Code & Tracking */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-8"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <QrCode className="w-8 h-8 text-racket-red" />
                <h2 className="text-2xl font-bold text-racket-black">Track Your Order</h2>
              </div>
              <p className="text-racket-gray mb-6">
                Scan this QR code or use the link below to track your racket in real-time.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                  <input
                    type="text"
                    value={trackingUrl}
                    readOnly
                    className="flex-1 bg-transparent text-sm text-racket-gray truncate"
                  />
                  <button
                    onClick={copyTrackingLink}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {copied ? (
                      <CheckCircle className="w-5 h-5 text-racket-green" />
                    ) : (
                      <Copy className="w-5 h-5 text-racket-gray" />
                    )}
                  </button>
                </div>

                <Link
                  href={`/track/${sessionId}`}
                  className="flex items-center justify-center gap-2 w-full bg-racket-red text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Track Order Now
                </Link>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="p-6 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
                <QRCode
                  value={trackingUrl}
                  size={180}
                  bgColor="#FFFFFF"
                  fgColor="#1a1a1a"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-racket-black mb-6 flex items-center gap-3">
            <Package className="w-7 h-7 text-racket-blue" />
            Order Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Racket</div>
                <div className="text-lg font-bold text-racket-black">
                  {order.racket_brand} {order.racket_model}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">String</div>
                <div className="text-lg font-bold text-racket-black">
                  {order.string_name || 'Customer Provided'}
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Tension</div>
                <div className="text-lg font-bold text-racket-black">
                  {order.main_tension}/{order.cross_tension} lbs
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Service</div>
                <div className="text-lg font-bold text-racket-black flex items-center gap-2">
                  {order.service_type}
                  {order.is_express && (
                    <span className="px-2 py-1 bg-racket-red text-white text-xs rounded-full">
                      EXPRESS
                    </span>
                  )}
                </div>
              </div>

              <div className="p-4 bg-racket-green/10 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Estimated Ready</div>
                <div className="text-lg font-bold text-racket-green flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  {order.estimated_ready ? new Date(order.estimated_ready).toLocaleString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit',
                  }) : 'Within 24 hours'}
                </div>
              </div>

              <div className="p-4 bg-racket-red/10 rounded-xl">
                <div className="text-sm text-racket-gray mb-1">Total Paid</div>
                <div className="text-2xl font-bold text-racket-red">
                  ${order.amount_total?.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Pickup Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-racket-black mb-6 flex items-center gap-3">
            <MapPin className="w-7 h-7 text-racket-red" />
            Pickup Details
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-racket-gray mb-1">Location</div>
              <div className="text-lg font-semibold text-racket-black">
                {order.pickup_address || 'LBTA - 1098 Balboa Ave, Laguna Beach'}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <div className="text-sm text-racket-gray mb-1">Scheduled Time</div>
              <div className="text-lg font-semibold text-racket-black">
                {order.pickup_time || 'We\'ll contact you to arrange'}
              </div>
            </div>
          </div>
        </motion.div>

        {/* What's Next */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-racket-black to-racket-charcoal rounded-3xl shadow-xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6">What Happens Next?</h2>

          <div className="space-y-4">
            {[
              { step: 1, title: 'Confirmation Email', desc: 'Check your inbox for order details and tracking link' },
              { step: 2, title: 'We Pick Up Your Racket', desc: 'Our team will collect your racket at the scheduled time' },
              { step: 3, title: 'Expert Stringing', desc: 'Your racket is strung by our USRSA certified stringers' },
              { step: 4, title: 'Quality Check', desc: 'We inspect tension, weave pattern, and finish' },
              { step: 5, title: 'Ready Notification', desc: 'You\'ll get a text when your racket is ready' },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 bg-racket-red rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  {item.step}
                </div>
                <div>
                  <div className="font-bold">{item.title}</div>
                  <div className="text-white/70 text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-racket-gray mb-4">Questions about your order?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="tel:+19494646645"
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow font-semibold text-racket-black"
            >
              <Phone className="w-5 h-5 text-racket-red" />
              (949) 464-6645
            </a>
            <a
              href="mailto:info@racketrescue.com"
              className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow font-semibold text-racket-black"
            >
              <Mail className="w-5 h-5 text-racket-blue" />
              info@racketrescue.com
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-racket-lightgray pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-racket-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-racket-gray">Loading your order...</p>
        </div>
      </main>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
