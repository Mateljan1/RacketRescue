'use client'

import { useState, useEffect } from 'react'
import { X, Download, Smartphone, Bell, Share, Zap } from 'lucide-react'
import Image from 'next/image'

export default function PWAInstallPrompt() {
  // Start with true to guarantee visibility, then check conditions
  const [isVisible, setIsVisible] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Check if already installed as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as Navigator & { standalone?: boolean }).standalone === true

    if (isStandalone) {
      return // Don't show if already installed
    }

    // Check if iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent))

    // Show immediately!
    setIsVisible(true)
  }, [])

  const handleInstall = () => {
    setShowInstructions(true)
  }

  const handleDismiss = () => {
    setIsVisible(false)
    setShowInstructions(false)
    try {
      localStorage.setItem('pwa-prompt-dismissed', new Date().toISOString())
    } catch (e) {
      // Ignore localStorage errors
    }
  }

  // Don't render on server
  if (!mounted) return null

  return (
    <>
      {/* Main Install Banner */}
      {isVisible && !showInstructions && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[99999] p-4 animate-slide-up"
          style={{
            animation: 'slideUp 0.3s ease-out',
          }}
        >
          <style jsx>{`
            @keyframes slideUp {
              from { transform: translateY(100%); opacity: 0; }
              to { transform: translateY(0); opacity: 1; }
            }
          `}</style>

          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-200 overflow-hidden">
            {/* Red Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg p-1">
                    <Image
                      src="/icons/icon-96.png"
                      alt="Racket Rescue"
                      width={48}
                      height={48}
                      className="rounded-lg"
                      unoptimized
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

            {/* Benefits */}
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
                  <Zap className="w-6 h-6 mx-auto mb-1 text-green-600" />
                  <p className="text-xs font-bold text-green-700">Instant</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <Bell className="w-6 h-6 mx-auto mb-1 text-blue-600" />
                  <p className="text-xs font-bold text-blue-700">Alerts</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl border border-purple-200">
                  <Smartphone className="w-6 h-6 mx-auto mb-1 text-purple-600" />
                  <p className="text-xs font-bold text-purple-700">Offline</p>
                </div>
              </div>

              {/* Install Button */}
              <button
                onClick={handleInstall}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 active:bg-gray-800"
              >
                <Download className="w-6 h-6" />
                Add to Home Screen
              </button>

              <p className="text-center text-sm text-gray-500 mt-3">
                Free • No app store • 5 seconds
              </p>
            </div>
          </div>
        </div>
      )}

      {/* iOS/Generic Instructions Modal */}
      {showInstructions && (
        <div
          className="fixed inset-0 z-[99999] bg-black/80 flex items-end justify-center p-4"
          onClick={handleDismiss}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-slide-up"
            style={{ animation: 'slideUp 0.3s ease-out' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
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
                <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  1
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {isIOS ? 'Tap the Share button' : 'Open browser menu'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {isIOS ? (
                      <span className="flex items-center gap-1">
                        Look for <Share className="w-5 h-5 text-blue-500" /> at the bottom
                      </span>
                    ) : (
                      'Tap the ⋮ menu in your browser'
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg">
                  2
                </div>
                <div>
                  <p className="font-bold text-gray-900">
                    {isIOS ? 'Scroll down and tap' : 'Select'}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    "<span className="font-bold text-red-500">Add to Home Screen</span>"
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
                    The app icon will appear on your home screen!
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div className="p-4 bg-gray-100 border-t">
              <button
                onClick={handleDismiss}
                className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
