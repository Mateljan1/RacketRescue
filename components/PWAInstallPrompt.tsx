'use client'

import { useState, useEffect } from 'react'
import { X, Download, Share } from 'lucide-react'

export default function PWAInstallPrompt() {
  const [mounted, setMounted] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Mark as mounted for client-side rendering
    setMounted(true)
    console.log('[PWA] Component mounted')

    // Check if iOS
    const iOS = /iPhone|iPad|iPod/.test(navigator.userAgent)
    setIsIOS(iOS)
    console.log('[PWA] iOS:', iOS)

    // Check if already installed
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    setIsStandalone(standalone)
    console.log('[PWA] Standalone:', standalone)

    if (standalone) {
      setDismissed(true)
    }
  }, [])

  // Don't render anything on server or if already running as PWA
  if (!mounted) {
    // Return a placeholder to prevent hydration mismatch
    return null
  }

  if (dismissed || isStandalone) {
    return null
  }

  return (
    <>
      {/* Install Banner - Fixed at bottom */}
      {!showSteps && (
        <div
          id="pwa-install-banner"
          data-testid="pwa-banner"
          style={{
            position: 'fixed',
            bottom: '0px',
            left: '0px',
            right: '0px',
            zIndex: 2147483647, // Maximum z-index
            padding: '16px',
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
            borderTop: '3px solid #fef2f2',
          }}
        >
          <div style={{
            maxWidth: '500px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'white',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}>
                <span style={{ fontSize: '24px' }}>🎾</span>
              </div>
              <div style={{ color: 'white' }}>
                <div style={{ fontWeight: 'bold', fontSize: '16px' }}>Get the App!</div>
                <div style={{ fontSize: '13px', opacity: 0.9 }}>Add to Home Screen</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowSteps(true)}
                style={{
                  background: 'white',
                  color: '#dc2626',
                  border: 'none',
                  padding: '12px 20px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                }}
              >
                <Download size={18} />
                Install
              </button>
              <button
                onClick={() => setDismissed(true)}
                aria-label="Dismiss"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Installation Instructions Modal */}
      {showSteps && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 2147483647,
            background: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'center',
            padding: '16px',
          }}
          onClick={() => setShowSteps(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '400px',
              overflow: 'hidden',
              marginBottom: '20px',
            }}
          >
            {/* Modal Header */}
            <div style={{
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              padding: '20px',
              color: 'white',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
                {isIOS ? 'Install on iPhone' : 'Add to Home Screen'}
              </h2>
              <button
                onClick={() => setShowSteps(false)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  cursor: 'pointer',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Installation Steps */}
            <div style={{ padding: '24px' }}>
              {/* Step 1 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: '#dc2626',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}>1</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#111' }}>
                    Tap the Share button
                  </p>
                  <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Look for <Share size={16} color="#3b82f6" /> at the bottom of Safari
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: '#dc2626',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}>2</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#111' }}>
                    Scroll and tap &quot;Add to Home Screen&quot;
                  </p>
                  <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                    It&apos;s in the share menu options
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  background: '#22c55e',
                  color: 'white',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  flexShrink: 0,
                }}>✓</div>
                <div>
                  <p style={{ margin: 0, fontWeight: 'bold', color: '#111' }}>
                    Tap &quot;Add&quot; - Done!
                  </p>
                  <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                    The app icon will appear on your home screen
                  </p>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <div style={{ padding: '16px', borderTop: '1px solid #eee' }}>
              <button
                onClick={() => {
                  setShowSteps(false)
                  setDismissed(true)
                }}
                style={{
                  width: '100%',
                  background: '#111',
                  color: 'white',
                  border: 'none',
                  padding: '16px',
                  borderRadius: '12px',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
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
