'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, Smartphone, Bell, Share, Zap } from 'lucide-react'
import Image from 'next/image'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export default function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false)
  const [showIOSInstructions, setShowIOSInstructions] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    console.log('[PWA] Install prompt initializing...')

    // Check if already installed as PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)
    console.log('[PWA] Standalone mode:', standalone)

    if (standalone) {
      console.log('[PWA] Already installed, not showing prompt')
      return
    }

    // Check device type
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setIsIOS(iOS)
    setIsMobile(mobile)
    console.log('[PWA] Device - iOS:', iOS, 'Mobile:', mobile)

    // Listen for beforeinstallprompt event (Chrome, Edge, Samsung, etc.)
    const handleBeforeInstall = (e: Event) => {
      console.log('[PWA] beforeinstallprompt event fired!')
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true) // Show immediately
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstall)

    // ALWAYS show after 1 second for mobile (ignore localStorage for now)
    if (mobile) {
      console.log('[PWA] Mobile detected, will show prompt in 1 second')
      setTimeout(() => {
        console.log('[PWA] Showing prompt now!')
        setShowPrompt(true)
      }, 1000)
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
    }
  }, [])

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Native install prompt (Android Chrome)
      deferredPrompt.prompt()
      const { outcome } = await deferredPrompt.userChoice

      if (outcome === 'accepted') {
        console.log('PWA installed')
        setShowPrompt(false)
      }
      setDeferredPrompt(null)
    } else if (isIOS) {
      // Show iOS instructions
      setShowIOSInstructions(true)
    } else {
      // For other browsers, show generic instructions
      setShowIOSInstructions(true)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    setShowIOSInstructions(false)
    localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString())
  }

  // Don't render if already installed
  if (isStandalone) return null

  // Don't render if prompt not triggered yet
  if (!showPrompt && !showIOSInstructions) return null

  return (
    <AnimatePresence>
      {showPrompt && !showIOSInstructions && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-racket-red to-red-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
                    <Image
                      src="/icons/icon-96.png"
                      alt="Racket Rescue"
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">Get the App!</h3>
                    <p className="text-sm text-white/90">Add to your home screen</p>
                  </div>
                </div>
                <button
                  onClick={handleDismiss}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              {/* Benefits */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                  <Zap className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <p className="text-xs font-semibold text-green-700">Instant Access</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <Bell className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs font-semibold text-blue-700">Order Alerts</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                  <Smartphone className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                  <p className="text-xs font-semibold text-purple-700">Works Offline</p>
                </div>
              </div>

              {/* Install Button */}
              <button
                onClick={handleInstall}
                className="w-full bg-racket-red text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-red-600 transition-colors shadow-lg"
              >
                <Download className="w-6 h-6" />
                {deferredPrompt ? 'Install Now' : 'Add to Home Screen'}
              </button>

              <p className="text-center text-sm text-gray-500 mt-3">
                Free • No app store • Takes 5 seconds
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* iOS/Generic Instructions Modal */}
      {showIOSInstructions && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-black/70 flex items-end sm:items-center justify-center p-4"
          onClick={handleDismiss}
        >
          <motion.div
            initial={{ y: 100, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 100, scale: 0.95 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-racket-red to-red-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">
                  {isIOS ? 'Install on iPhone' : 'Add to Home Screen'}
                </h3>
                <button
                  onClick={handleDismiss}
                  className="p-2 hover:bg-white/20 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="p-6 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-racket-red text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  1
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {isIOS ? 'Tap the Share button' : 'Open browser menu'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {isIOS ? (
                      <>Look for the <Share className="w-4 h-4 inline text-blue-500" /> icon at the bottom of Safari</>
                    ) : (
                      'Tap the ⋮ menu in your browser'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-racket-red text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  2
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {isIOS ? 'Scroll down and tap' : 'Select'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    "<span className="font-semibold text-racket-red">Add to Home Screen</span>"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  ✓
                </div>
                <div>
                  <p className="font-bold text-gray-900">Tap "Add"</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Done! The app icon will appear on your home screen
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="p-4 bg-gray-50 border-t">
              <button
                onClick={handleDismiss}
                className="w-full bg-racket-black text-white py-4 rounded-xl font-bold text-lg"
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
