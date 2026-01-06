// Push Notifications via Capacitor
// Handles push notification registration and delivery for mobile apps

import { PushNotifications } from '@capacitor/push-notifications'
import { Capacitor } from '@capacitor/core'

export interface PushNotificationPayload {
  title: string
  body: string
  data?: Record<string, any>
}

// Check if push notifications are available
export function isPushNotificationsAvailable(): boolean {
  return Capacitor.isNativePlatform()
}

// Request permission and register for push notifications
export async function registerPushNotifications(): Promise<string | null> {
  if (!isPushNotificationsAvailable()) {
    console.log('[Push] Not available on web platform')
    return null
  }

  try {
    // Request permission
    const permResult = await PushNotifications.requestPermissions()

    if (permResult.receive === 'granted') {
      // Register with FCM/APNS
      await PushNotifications.register()

      // Get device token
      return new Promise((resolve) => {
        PushNotifications.addListener('registration', (token) => {
          console.log('[Push] Registration success:', token.value)
          resolve(token.value)
        })

        PushNotifications.addListener('registrationError', (error) => {
          console.error('[Push] Registration error:', error)
          resolve(null)
        })
      })
    } else {
      console.log('[Push] Permission denied')
      return null
    }

  } catch (error) {
    console.error('[Push] Registration error:', error)
    return null
  }
}

// Set up push notification listeners
export function setupPushNotificationListeners(
  onNotificationReceived: (notification: any) => void,
  onNotificationTapped: (notification: any) => void
) {
  if (!isPushNotificationsAvailable()) return

  // Notification received while app is in foreground
  PushNotifications.addListener('pushNotificationReceived', (notification) => {
    console.log('[Push] Notification received:', notification)
    onNotificationReceived(notification)
  })

  // Notification tapped (app was in background)
  PushNotifications.addListener('pushNotificationActionPerformed', (notification) => {
    console.log('[Push] Notification tapped:', notification)
    onNotificationTapped(notification)
  })
}

// Send push notification via backend
export async function sendPushNotification(
  deviceToken: string,
  payload: PushNotificationPayload
): Promise<boolean> {
  try {
    const response = await fetch('/api/notifications/push', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        deviceToken,
        ...payload,
      }),
    })

    return response.ok

  } catch (error) {
    console.error('[Push] Send error:', error)
    return false
  }
}

// Save device token to database for user
export async function saveDeviceToken(userId: string, token: string): Promise<boolean> {
  try {
    const response = await fetch('/api/user/device-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, token }),
    })

    return response.ok

  } catch (error) {
    console.error('[Push] Save token error:', error)
    return false
  }
}

// Remove all listeners (cleanup)
export async function removePushNotificationListeners() {
  if (!isPushNotificationsAvailable()) return

  await PushNotifications.removeAllListeners()
}

