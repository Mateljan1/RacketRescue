'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { Bell, BellOff } from 'lucide-react'
import { 
  registerPushNotifications, 
  setupPushNotificationListeners, 
  saveDeviceToken,
  isPushNotificationsAvailable 
} from '@/lib/notifications/push-notifications'

export default function PushNotificationSetup() {
  const { data: session } = useSession()
  const [enabled, setEnabled] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!session?.user) return

    // Set up listeners for incoming notifications
    setupPushNotificationListeners(
      (notification) => {
        // Show in-app notification
        console.log('Notification received:', notification)
        // Could show a toast notification here
      },
      (notification) => {
        // Handle notification tap
        console.log('Notification tapped:', notification)
        // Could navigate to relevant page
        if (notification.data?.orderId) {
          window.location.href = `/track/${notification.data.orderId}`
        }
      }
    )
  }, [session])

  const enableNotifications = async () => {
    if (!session?.user?.id) return

    setLoading(true)
    try {
      const token = await registerPushNotifications()
      
      if (token) {
        // Save token to database
        const saved = await saveDeviceToken(session.user.id, token)
        if (saved) {
          setEnabled(true)
        }
      }
    } catch (error) {
      console.error('Enable notifications error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Only show on mobile app
  if (!isPushNotificationsAvailable()) {
    return null
  }

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {!enabled && (
        <button
          onClick={enableNotifications}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-3 bg-racket-red text-white rounded-full shadow-lg hover:bg-red-600 transition-colors disabled:opacity-50"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Bell className="w-5 h-5" />
          )}
          <span className="font-medium">Enable Notifications</span>
        </button>
      )}
    </div>
  )
}
