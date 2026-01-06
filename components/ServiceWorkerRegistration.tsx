"use client"

import { useEffect } from "react"

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") return
    if (!("serviceWorker" in navigator)) return

    // Service workers don't work properly in v0 preview due to MIME type issues
    const isProduction =
      window.location.hostname !== "localhost" &&
      !window.location.hostname.includes("vusercontent.net") &&
      !window.location.hostname.includes("vercel.app")

    if (!isProduction) {
      console.log("[PWA] Service worker registration skipped in development/preview")
      return
    }

    // Register service worker
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("[PWA] Service worker registered:", registration.scope)

        // Check for updates periodically
        setInterval(
          () => {
            registration.update()
          },
          60 * 60 * 1000,
        ) // Check every hour
      })
      .catch((error) => {
        console.error("[PWA] Service worker registration failed:", error)
      })

    // Handle updates
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      console.log("[PWA] New service worker activated")
    })
  }, [])

  return null
}
