"use client"

import { useEffect, createContext, useContext, useState, type ReactNode } from "react"

interface CapacitorContextType {
  isNative: boolean
  platform: "ios" | "android" | "web"
  isReady: boolean
}

const CapacitorContext = createContext<CapacitorContextType>({
  isNative: false,
  platform: "web",
  isReady: false,
})

export const useCapacitor = () => useContext(CapacitorContext)

export function CapacitorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CapacitorContextType>({
    isNative: false,
    platform: "web",
    isReady: false,
  })

  useEffect(() => {
    const initCapacitor = async () => {
      try {
        const { Capacitor } = await import("@capacitor/core")

        const isNative = Capacitor.isNativePlatform()
        const platform = Capacitor.getPlatform() as "ios" | "android" | "web"

        setState({
          isNative,
          platform,
          isReady: true,
        })

        // Initialize native services if running in app
        if (isNative) {
          // Initialize push notifications
          const { PushNotificationService } = await import("@/lib/capacitor/native-services")
          await PushNotificationService.initialize()

          // Set up app lifecycle listeners
          const { App } = await import("@capacitor/app")

          App.addListener("appStateChange", ({ isActive }) => {
            console.log("App state changed. Is active?", isActive)
          })

          App.addListener("backButton", ({ canGoBack }) => {
            if (canGoBack) {
              window.history.back()
            } else {
              App.exitApp()
            }
          })
        }
      } catch (error) {
        // Capacitor not available (running in browser without native)
        setState({
          isNative: false,
          platform: "web",
          isReady: true,
        })
      }
    }

    initCapacitor()
  }, [])

  return <CapacitorContext.Provider value={state}>{children}</CapacitorContext.Provider>
}
