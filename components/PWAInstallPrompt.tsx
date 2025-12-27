'use client'

import { useState, useEffect } from 'react'
import { X, Download, Share } from 'lucide-react'

export default function PWAInstallPrompt() {
  const [dismissed, setDismissed] = useState(false)
  const [showSteps, setShowSteps] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Debug log
    console.log('[PWA Banner] Component mounted')

    // Check if iOS
    const isIOSDevice = /iPhone|iPad|iPod/.test(navigator.userAgent)
    setIsIOS(isIOSDevice)
    console.log('[PWA Banner] iOS device:', isIOSDevice)

    // Check if already installed as PWA
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
    console.log('[PWA Banner] Standalone mode:', isStandalone)

    if (isStandalone) {
      setDismissed(true)
    }
  }, [])

  if (dismissed) return null

  return (
    <>
      {/* ALWAYS VISIBLE BANNER - No conditions */}
      {!showSteps && (
        <div
          id="pwa-banner"
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 999999,
            padding: '16px',
            background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
            boxShadow: '0 -4px 20px rgba(0,0,0,0.3)',
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
                }}
              >
                <Download size={18} />
                Install
              </button>
              <button
                onClick={() => setDismissed(true)}
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Installation Steps Modal */}
      {showSteps && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
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
            }}
          >
            {/* Header */}
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
                  padding: '8px',
                  cursor: 'pointer',
                  color: 'white',
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Steps */}
            <div style={{ padding: '24px' }}>
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
                    Scroll down and tap
                  </p>
                  <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                    "<span style={{ color: '#dc2626', fontWeight: 'bold' }}>Add to Home Screen</span>"
                  </p>
                </div>
              </div>

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
                    Tap "Add" and you're done!
                  </p>
                  <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>
                    The app will appear on your home screen
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
