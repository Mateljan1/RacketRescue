import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.racketrescue.app",
  appName: "Racket Rescue",
  webDir: "out",

  // Production server - loads from https://www.racketrescue.com
  server: {
    url: "https://www.racketrescue.com",
    cleartext: false,
    androidScheme: "https",
  },

  // iOS specific configuration
  ios: {
    scheme: "RacketRescue",
    contentInset: "automatic",
    preferredContentMode: "mobile",
    backgroundColor: "#ffffff",
    allowsLinkPreview: true,
  },

  // Android specific configuration
  android: {
    allowMixedContent: false,
    backgroundColor: "#ffffff",
    buildOptions: {
      keystorePath: "android-build/racketrescue-keystore.jks",
      keystoreAlias: "racketrescue",
    },
  },

  // Plugin configurations
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#ffffff",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    Keyboard: {
      resize: "body",
      resizeOnFullScreen: true,
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#ffffff",
    },
  },
}

export default config
