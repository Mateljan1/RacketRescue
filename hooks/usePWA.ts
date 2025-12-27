'use client'

import { useState, useEffect, useCallback } from 'react'

interface PushSubscriptionJSON {
  endpoint: string
  keys: {
    p256dh: string
    auth: string
  }
}

export function usePWA() {
  const [isInstalled, setIsInstalled] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null)
  const [pushSubscription, setPushSubscription] = useState<PushSubscription | null>(null)
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default')

  // Register service worker
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator)) return

    // Check if running as PWA
    const standalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as Navigator & { standalone?: boolean }).standalone === true
    setIsInstalled(standalone)

    // Track online status
    setIsOnline(navigator.onLine)
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // Register service worker
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('[PWA] Service worker registered:', registration.scope)
        setSwRegistration(registration)

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content available, show update prompt
                console.log('[PWA] New content available')
              }
            })
          }
        })
      })
      .catch((error) => {
        console.error('[PWA] Service worker registration failed:', error)
      })

    // Check notification permission
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission)
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  // Request notification permission
  const requestNotificationPermission = useCallback(async (): Promise<boolean> => {
    if (!('Notification' in window)) {
      console.warn('[PWA] Notifications not supported')
      return false
    }

    try {
      const permission = await Notification.requestPermission()
      setNotificationPermission(permission)
      return permission === 'granted'
    } catch (error) {
      console.error('[PWA] Error requesting notification permission:', error)
      return false
    }
  }, [])

  // Subscribe to push notifications
  const subscribeToPush = useCallback(async (): Promise<PushSubscriptionJSON | null> => {
    if (!swRegistration) {
      console.warn('[PWA] No service worker registration')
      return null
    }

    try {
      // Check if already subscribed
      let subscription = await swRegistration.pushManager.getSubscription()

      if (!subscription) {
        // Get VAPID public key from server
        const response = await fetch('/api/push/vapid-public-key')
        if (!response.ok) {
          console.warn('[PWA] VAPID key not configured')
          return null
        }

        const { publicKey } = await response.json()

        // Convert VAPID key
        const applicationServerKey = urlBase64ToUint8Array(publicKey)

        // Subscribe
        subscription = await swRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey as BufferSource,
        })
      }

      setPushSubscription(subscription)

      // Send subscription to server
      const subscriptionJSON = subscription.toJSON() as PushSubscriptionJSON
      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscriptionJSON),
      })

      console.log('[PWA] Push subscription created')
      return subscriptionJSON
    } catch (error) {
      console.error('[PWA] Push subscription failed:', error)
      return null
    }
  }, [swRegistration])

  // Send a test notification
  const sendTestNotification = useCallback(async () => {
    if (notificationPermission !== 'granted') {
      const granted = await requestNotificationPermission()
      if (!granted) return false
    }

    if (swRegistration) {
      await swRegistration.showNotification('Racket Rescue', {
        body: 'Push notifications are working!',
        icon: '/icons/icon-192.png',
        badge: '/icons/icon-96.png',
      } as NotificationOptions)
      return true
    }

    return false
  }, [swRegistration, notificationPermission, requestNotificationPermission])

  // Trigger service worker update
  const checkForUpdates = useCallback(async () => {
    if (swRegistration) {
      try {
        await swRegistration.update()
        console.log('[PWA] Checked for updates')
      } catch (error) {
        console.error('[PWA] Update check failed:', error)
      }
    }
  }, [swRegistration])

  // Skip waiting and reload with new service worker
  const updateServiceWorker = useCallback(() => {
    if (swRegistration?.waiting) {
      swRegistration.waiting.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    }
  }, [swRegistration])

  return {
    isInstalled,
    isOnline,
    swRegistration,
    pushSubscription,
    notificationPermission,
    requestNotificationPermission,
    subscribeToPush,
    sendTestNotification,
    checkForUpdates,
    updateServiceWorker,
  }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}
