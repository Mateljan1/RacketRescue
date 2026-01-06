# RacketRescue Local Development Setup

This guide walks you through setting up the Capacitor mobile app on your local machine.

## Prerequisites

Before starting, ensure you have:

### Required for All Platforms
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed
- [ ] Git installed

### Required for iOS Development
- [ ] macOS (required for iOS development)
- [ ] Xcode 15+ installed from Mac App Store
- [ ] Xcode Command Line Tools: `xcode-select --install`
- [ ] CocoaPods: `sudo gem install cocoapods`
- [ ] Apple Developer Account (free for testing, $99/year for App Store)

### Required for Android Development
- [ ] Android Studio installed
- [ ] Android SDK (installed via Android Studio)
- [ ] Java JDK 17+ (comes with Android Studio)
- [ ] Set `ANDROID_HOME` environment variable

---

## Quick Start

### Option 1: Automated Setup (Recommended)

\`\`\`bash
# Clone the project (or download from v0)
git clone <your-repo-url>
cd racketrescue

# Make the setup script executable and run it
chmod +x scripts/setup-capacitor.sh
./scripts/setup-capacitor.sh
\`\`\`

### Option 2: Manual Setup

\`\`\`bash
# 1. Install dependencies
npm install

# 2. Install Capacitor packages
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npm install @capacitor/push-notifications @capacitor/geolocation @capacitor/camera @capacitor/haptics @capacitor/share @capacitor/splash-screen @capacitor/status-bar

# 3. Add platforms
npx cap add ios
npx cap add android

# 4. Build Next.js
npm run build

# 5. Sync native projects
npx cap sync
\`\`\`

---

## Environment Variables

Create a `.env.local` file in the project root:

\`\`\`env
# Authentication
AUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://www.racketrescue.com

# Supabase (if using)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Stripe (if using)
STRIPE_SECRET_KEY=your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable
\`\`\`

Generate an AUTH_SECRET:
\`\`\`bash
openssl rand -base64 32
\`\`\`

---

## Running the Apps

### iOS Simulator

\`\`\`bash
# Open in Xcode
npx cap open ios

# Or run directly with live reload
npx cap run ios -l --external
\`\`\`

In Xcode:
1. Select a simulator (e.g., iPhone 15 Pro)
2. Click the Play button or press `Cmd + R`

### Android Emulator

\`\`\`bash
# Open in Android Studio
npx cap open android

# Or run directly with live reload
npx cap run android -l --external
\`\`\`

In Android Studio:
1. Select a device/emulator from the dropdown
2. Click the Run button or press `Shift + F10`

### Physical Devices

**iOS:**
1. Connect iPhone via USB
2. In Xcode, select your device from the dropdown
3. Trust the developer certificate on your iPhone (Settings > General > Device Management)
4. Click Run

**Android:**
1. Enable Developer Options on your phone
2. Enable USB Debugging
3. Connect via USB
4. Accept the debugging prompt on your phone
5. Run `npx cap run android`

---

## Development Workflow

### Making Changes

\`\`\`bash
# 1. Make changes to your Next.js code

# 2. Rebuild and sync
npm run build:capacitor

# Or for quick sync without full rebuild
npx cap sync
\`\`\`

### Live Reload (Development)

For faster development, use live reload:

\`\`\`bash
# Terminal 1: Start Next.js dev server
npm run dev

# Terminal 2: Run on device with live reload
npx cap run ios -l --external
# or
npx cap run android -l --external
\`\`\`

---

## Building for Production

### iOS App Store Build

\`\`\`bash
# 1. Build Next.js
npm run build

# 2. Sync
npx cap sync

# 3. Open Xcode
npx cap open ios
\`\`\`

In Xcode:
1. Select "Any iOS Device" as the target
2. Product > Archive
3. Distribute App > App Store Connect
4. Upload

### Android Play Store Build

\`\`\`bash
# 1. Build Next.js
npm run build

# 2. Sync
npx cap sync

# 3. Open Android Studio
npx cap open android
\`\`\`

In Android Studio:
1. Build > Generate Signed Bundle/APK
2. Select "Android App Bundle"
3. Create or select your keystore
4. Build

---

## Troubleshooting

### iOS Issues

**"No signing certificate" error:**
- Open Xcode > Preferences > Accounts
- Add your Apple ID
- Download certificates

**Pod install fails:**
\`\`\`bash
cd ios/App
pod deintegrate
pod install
\`\`\`

**Simulator not showing:**
\`\`\`bash
# Reset simulators
xcrun simctl shutdown all
xcrun simctl erase all
\`\`\`

### Android Issues

**"SDK location not found" error:**
- Open Android Studio > Preferences > SDK Manager
- Note the SDK path
- Add to `~/.zshrc` or `~/.bashrc`:
\`\`\`bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
\`\`\`

**Gradle build fails:**
\`\`\`bash
cd android
./gradlew clean
./gradlew build
\`\`\`

### General Issues

**Changes not appearing:**
\`\`\`bash
# Full clean rebuild
rm -rf .next out
npm run build
npx cap sync --force
\`\`\`

**Capacitor not recognizing plugins:**
\`\`\`bash
npx cap sync
\`\`\`

---

## Useful Commands Reference

| Command | Description |
|---------|-------------|
| `npm run build` | Build Next.js for production |
| `npm run build:capacitor` | Build and sync to native |
| `npx cap sync` | Sync web assets to native |
| `npx cap open ios` | Open Xcode |
| `npx cap open android` | Open Android Studio |
| `npx cap run ios -l` | Run iOS with live reload |
| `npx cap run android -l` | Run Android with live reload |
| `npx cap doctor` | Check Capacitor setup |

---

## Next Steps

After setup is complete:

1. [ ] Test on iOS Simulator
2. [ ] Test on Android Emulator
3. [ ] Test on physical devices
4. [ ] Configure push notifications (requires additional setup)
5. [ ] Submit to app stores

See `docs/CAPACITOR_SETUP_CHECKLIST.md` for the full deployment checklist.
