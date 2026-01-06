/**
 * Native Services for Capacitor
 * Provides unified API for native device features
 */

import { Capacitor } from "@capacitor/core"

// Check if running in native app
export const isNative = () => Capacitor.isNativePlatform()
export const getPlatform = () => Capacitor.getPlatform() // 'ios' | 'android' | 'web'

/**
 * Push Notifications Service
 */
export const PushNotificationService = {
  async initialize() {
    if (!isNative()) return null

    const { PushNotifications } = await import("@capacitor/push-notifications")

    // Request permission
    const permResult = await PushNotifications.requestPermissions()
    if (permResult.receive !== "granted") {
      console.warn("Push notification permission denied")
      return null
    }

    // Register with APNs/FCM
    await PushNotifications.register()

    // Listen for registration token
    PushNotifications.addListener("registration", (token) => {
      console.log("Push registration token:", token.value)
      // TODO: Send token to your backend
      // saveTokenToBackend(token.value)
    })

    // Listen for push notifications
    PushNotifications.addListener("pushNotificationReceived", (notification) => {
      console.log("Push received:", notification)
    })

    // Listen for notification tap
    PushNotifications.addListener("pushNotificationActionPerformed", (action) => {
      console.log("Push action:", action)
      // Handle deep linking based on notification data
    })

    return PushNotifications
  },
}

/**
 * Geolocation Service
 */
export const GeolocationService = {
  async getCurrentPosition() {
    if (!isNative()) {
      // Fallback to web geolocation
      return new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })
    }

    const { Geolocation } = await import("@capacitor/geolocation")

    const permResult = await Geolocation.requestPermissions()
    if (permResult.location !== "granted") {
      throw new Error("Location permission denied")
    }

    return Geolocation.getCurrentPosition()
  },

  async watchPosition(callback: (position: any) => void) {
    if (!isNative()) {
      return navigator.geolocation.watchPosition(callback)
    }

    const { Geolocation } = await import("@capacitor/geolocation")
    return Geolocation.watchPosition({}, callback)
  },
}

/**
 * Camera Service
 */
export const CameraService = {
  async takePhoto() {
    if (!isNative()) {
      // Fallback to file input for web
      return null
    }

    const { Camera, CameraResultType, CameraSource } = await import("@capacitor/camera")

    const permResult = await Camera.requestPermissions()
    if (permResult.camera !== "granted") {
      throw new Error("Camera permission denied")
    }

    return Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    })
  },

  async pickFromGallery() {
    if (!isNative()) return null

    const { Camera, CameraResultType, CameraSource } = await import("@capacitor/camera")

    return Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Photos,
    })
  },
}

/**
 * Haptics Service
 */
export const HapticsService = {
  async impact(style: "light" | "medium" | "heavy" = "medium") {
    if (!isNative()) return

    const { Haptics, ImpactStyle } = await import("@capacitor/haptics")
    const styleMap = {
      light: ImpactStyle.Light,
      medium: ImpactStyle.Medium,
      heavy: ImpactStyle.Heavy,
    }
    await Haptics.impact({ style: styleMap[style] })
  },

  async vibrate() {
    if (!isNative()) return
    const { Haptics } = await import("@capacitor/haptics")
    await Haptics.vibrate()
  },

  async notification(type: "success" | "warning" | "error" = "success") {
    if (!isNative()) return
    const { Haptics, NotificationType } = await import("@capacitor/haptics")
    const typeMap = {
      success: NotificationType.Success,
      warning: NotificationType.Warning,
      error: NotificationType.Error,
    }
    await Haptics.notification({ type: typeMap[type] })
  },
}

/**
 * Share Service
 */
export const ShareService = {
  async share(options: { title?: string; text?: string; url?: string }) {
    if (!isNative()) {
      // Fallback to Web Share API
      if (navigator.share) {
        return navigator.share(options)
      }
      return null
    }

    const { Share } = await import("@capacitor/share")
    return Share.share(options)
  },
}

/**
 * Status Bar Service (iOS/Android only)
 */
export const StatusBarService = {
  async setStyle(style: "light" | "dark") {
    if (!isNative()) return

    const { StatusBar, Style } = await import("@capacitor/status-bar")
    await StatusBar.setStyle({
      style: style === "light" ? Style.Light : Style.Dark,
    })
  },

  async setBackgroundColor(color: string) {
    if (!isNative() || getPlatform() !== "android") return

    const { StatusBar } = await import("@capacitor/status-bar")
    await StatusBar.setBackgroundColor({ color })
  },
}
