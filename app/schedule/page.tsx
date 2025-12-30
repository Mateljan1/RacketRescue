'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'
import ServiceSelection from '@/components/schedule/ServiceSelection'
import RacketDetails from '@/components/schedule/RacketDetails'
import PickupSchedule from '@/components/schedule/PickupSchedule'
import OrderReview from '@/components/schedule/OrderReview'
import PriceCalculator from '@/components/PriceCalculator'
import type { OrderData, OrderPricing, ServicePackage } from '@/lib/types'
import { PRICING, getServicePrice } from '@/lib/pricing'

const steps = [
  { number: 1, title: 'Service', desc: 'Choose your package' },
  { number: 2, title: 'Racket', desc: 'Tell us about your racket' },
  { number: 3, title: 'Pickup', desc: 'Schedule pickup & delivery' },
  { number: 4, title: 'Review', desc: 'Confirm your order' },
]

// Map package IDs from homepage to service_package values
const packageToService: Record<string, ServicePackage> = {
  starter: 'standard',
  pro: 'rush',
  custom: 'standard',
}

function ScheduleContent() {
  const searchParams = useSearchParams()
  const packageParam = searchParams.get('package')
  const initialService: ServicePackage = packageParam && packageToService[packageParam]
    ? packageToService[packageParam]
    : 'match_ready'

  const [currentStep, setCurrentStep] = useState(1)
  const [orderData, setOrderData] = useState<OrderData>({
    service_package: initialService,
    racket_brand: '',
    racket_model: '',
    string_type: '',
    string_name: '',
    string_price: 0,
    customer_provides_string: false,
    main_tension: 55,
    cross_tension: 55,
    is_express: false,
    add_regrip: false,
    add_overgrip: false,
    add_dampener: false,
    dampener_bundle: false,
    add_second_racket: false,
    pickup_address: '',
    delivery_address: '',
    pickup_time: '',
    special_instructions: '',
  })

  // Update service package when URL param changes
  useEffect(() => {
    if (packageParam && packageToService[packageParam]) {
      setOrderData(prev => ({
        ...prev,
        service_package: packageToService[packageParam]
      }))
    }
  }, [packageParam])

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const calculatePricing = (): OrderPricing => {
    // Use helper to get price (handles legacy package names)
    const serviceLabor = getServicePrice(orderData.service_package)
    // String price is now included in base - only charge for premium upgrade or give discount for own string
    const stringPrice = orderData.customer_provides_string ? -10 : orderData.string_price // -$10 if bringing own, +$10 if premium
    const expressFee = 0 // Rush is now a direct option ($65), not an add-on
    const regripFee = orderData.add_regrip ? PRICING.addOns.regrip : 0

    let overGripFee = 0
    let dampenerFee = 0
    if (orderData.dampener_bundle) {
      dampenerFee = PRICING.addOns.dampenerBundle
    } else {
      overGripFee = orderData.add_overgrip ? PRICING.addOns.overgrip : 0
      dampenerFee = orderData.add_dampener ? PRICING.addOns.dampener : 0
    }

    const secondRacketFee = orderData.add_second_racket ? serviceLabor : 0
    const pickupFee = PRICING.delivery.pickupFee // Now $0 - included in base price

    const subtotal = serviceLabor + stringPrice + regripFee + overGripFee + dampenerFee + secondRacketFee
    const total = subtotal + pickupFee

    return {
      serviceLabor,
      stringPrice,
      expressFee,
      regripFee,
      overGripFee,
      dampenerFee,
      secondRacketFee,
      subtotal,
      pickupFee,
      total,
    }
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <PriceCalculator orderData={orderData} />
      {/* Header */}
      <div className="bg-gradient-to-br from-racket-black to-racket-charcoal text-white py-16">
        <div className="container-racket">
          <div className="flex items-center gap-4 mb-8">
            <Link
              href="/"
              className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Schedule Service</h1>
              <p className="text-white/80 text-lg mt-2">Professional racket stringing with pickup & delivery</p>
            </div>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mt-12">
            <div className="flex items-center gap-3">
              {steps.map((step, i) => (
                <div key={step.number} className="flex items-center">
                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                        step.number < currentStep
                          ? 'bg-racket-green text-white shadow-lg'
                          : step.number === currentStep
                          ? 'bg-racket-red text-white shadow-2xl ring-4 ring-racket-red/30'
                          : 'bg-white/10 text-white/50'
                      }`}
                    >
                      {step.number < currentStep ? <Check className="w-6 h-6" /> : step.number}
                    </div>
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden md:block">
                      <div className={`text-sm font-medium ${step.number === currentStep ? 'text-white' : 'text-white/50'}`}>
                        {step.title}
                      </div>
                    </div>
                  </motion.div>
                  {i < steps.length - 1 && (
                    <div className="relative w-16 h-1 mx-2">
                      <div className="absolute inset-0 bg-white/10 rounded-full" />
                      <motion.div
                        className="absolute inset-0 bg-racket-red rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{
                          scaleX: step.number < currentStep ? 1 : 0,
                        }}
                        transition={{ duration: 0.4 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="container-racket py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            {currentStep === 1 && (
              <ServiceSelection
                orderData={orderData}
                setOrderData={setOrderData}
                onNext={nextStep}
              />
            )}
            {currentStep === 2 && (
              <RacketDetails
                orderData={orderData}
                setOrderData={setOrderData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 3 && (
              <PickupSchedule
                orderData={orderData}
                setOrderData={setOrderData}
                onNext={nextStep}
                onPrev={prevStep}
              />
            )}
            {currentStep === 4 && (
              <OrderReview
                orderData={orderData}
                pricing={calculatePricing()}
                onPrev={prevStep}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Loading fallback for Suspense
function ScheduleLoading() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="bg-gradient-to-br from-racket-black to-racket-charcoal text-white py-16">
        <div className="container-racket">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-11 h-11 bg-white/10 rounded-full animate-pulse" />
            <div>
              <div className="h-10 w-64 bg-white/10 rounded animate-pulse" />
              <div className="h-6 w-96 bg-white/10 rounded animate-pulse mt-2" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-racket py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-10 animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mb-6" />
            <div className="space-y-4">
              <div className="h-20 bg-gray-200 rounded" />
              <div className="h-20 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export wrapped in Suspense boundary
export default function SchedulePage() {
  return (
    <Suspense fallback={<ScheduleLoading />}>
      <ScheduleContent />
    </Suspense>
  )
}
