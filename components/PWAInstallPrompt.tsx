'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Smartphone, Bell, Share } from 'lucide-react'
import Image from 'next/image'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b77f9f4a7eae9e097474c2/e406f4500_RacketRescueLogoFinal_Horizontal.png"

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Check if already installed as PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)

    if (standalone) return // Don't show prompt if already installed

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)

    // Check if we've already dismissed the prompt
    const dismissed = localStorage.getItem('pwa-prompt-dismissed')
    const dismissedDate = dismissed ? new Date(dismissed) : null
    const daysSinceDismissed = dismissedDate
      ? (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
      : null

    // Show again after 7 days
    if (dismissedDate && daysSinceDismissed && daysSinceDismissed < 7) {
      return
    }

    // Listen for beforeinstallprompt event (Chrome, Edge, etc.)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Show prompt after a delay for better UX
      setTimeout(() => setShowPrompt(true), 3000)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    // For iOS, show instructions after a delay
    if (iOS && !standalone) {
      setTimeout(() => setShowPrompt(true), 5000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('PWA installed')
        setShowPrompt(false)
      }
      setDeferredPrompt(null)
    } else if (isIOS) {
      setShowIOSInstructions(true)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setShowIOSInstructions(false)
    localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString())
  }

  // Don't render if already installed or no prompt available
  if (isStandalone || (!showPrompt && !showIOSInstructions)) return null

  return (
    <AnimatePresence>
      {showPrompt && !showIOSInstructions && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-racket-red to-red-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <Image
                      src="/icons/icon-96.png"
                      alt="Racket Rescue"
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Get the App</h3>
                    <p className="text-sm text-white/80">Install Racket Rescue</p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Benefits */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Smartphone className="w-6 h-6 mx-auto mb-1 text-racket-red" />
                  <p className="text-xs font-medium text-gray-700">Works Offline</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Bell className="w-6 h-6 mx-auto mb-1 text-racket-red" />
                  <p className="text-xs font-medium text-gray-700">Notifications</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl">
                  <Download className="w-6 h-6 mx-auto mb-1 text-racket-red" />
                  <p className="text-xs font-medium text-gray-700">Fast Access</p>
                </div>
              </div>

              {/* Install Button */}
              <button
                onClick={handleInstall}
                className="w-full bg-racket-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
              >
                <Download className="w-5 h-5" />
                {isIOS ? 'How to Install' : 'Install App'}
              </button>

              <p className="text-center text-xs text-gray-500 mt-3">
                No app store needed • Installs in seconds
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* iOS Instructions Modal */}
      {showIOSInstructions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 flex items-end justify-center p-4"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-t-3xl w-full max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-xl font-bold">Install on iPhone</h3>
              <button
                onClick={handleDismiss}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Steps */}
            <div className="p-6 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-racket-red text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  1
                </div>
                <div>
                  <p className="font-semibold">Tap the Share button</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Look for the <Share className="w-4 h-4 inline" /> icon at the bottom of Safari
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-racket-red text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  2
                </div>
                <div>
                  <p className="font-semibold">Scroll down and tap</p>
                  <p className="text-sm text-gray-600 mt-1">
                    "Add to Home Screen"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-racket-red text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  3
                </div>
                <div>
                  <p className="font-semibold">Tap "Add"</p>
                  <p className="text-sm text-gray-600 mt-1">
                    The app will appear on your home screen!
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="p-4 border-t">
              <button
                onClick={handleDismiss}
                className="w-full bg-racket-black text-white py-4 rounded-xl font-bold"
              >
                Got it!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
