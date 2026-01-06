# Capacitor Setup Checklist for RacketRescue

Production Domain: **https://www.racketrescue.com**

## Pre-Setup Requirements

### Environment Variables (Set in Vercel Dashboard)
- [ ] `AUTH_SECRET` - Generate with `openssl rand -base64 32`
- [ ] `NEXTAUTH_URL` = `https://www.racketrescue.com`
- [ ] `NEXT_PUBLIC_SITE_URL` = `https://www.racketrescue.com`

### Development Machine Requirements
- [ ] Node.js 18+ installed
- [ ] **For iOS:** macOS with Xcode 15+ installed
- [ ] **For iOS:** CocoaPods installed (`sudo gem install cocoapods`)
- [ ] **For Android:** Android Studio with SDK installed
- [ ] **For Android:** Java JDK 17+ installed

---

## Step-by-Step Setup

### Step 1: Install Dependencies (Local Machine)

\`\`\`bash
# Clone your repo and install
git clone <your-repo-url>
cd racket-rescue
npm install
\`\`\`

### Step 2: Initialize Capacitor Platforms

\`\`\`bash
# Add iOS platform
npx cap add ios

# Add Android platform  
npx cap add android
\`\`\`

### Step 3: Build and Sync

\`\`\`bash
# Build Next.js and sync to native projects
npm run build:capacitor
\`\`\`

### Step 4: Configure iOS (Xcode)

\`\`\`bash
npx cap open ios
\`\`\`

In Xcode:
1. Select your **Team** (Apple Developer Account)
2. Set **Bundle Identifier**: `com.racketrescue.app`
3. Enable **Push Notifications** capability
4. Enable **Associated Domains** capability
5. Add domain: `applinks:www.racketrescue.com`

### Step 5: Configure Android (Android Studio)

\`\`\`bash
npx cap open android
\`\`\`

In Android Studio:
1. Sync Gradle files
2. Update `android/app/src/main/AndroidManifest.xml` with permissions
3. Configure signing with existing keystore from `android-build/`

---

## File Locations Reference

| File | Purpose |
|------|---------|
| `capacitor.config.ts` | Main Capacitor configuration |
| `ios/` | iOS native project (created after `cap add ios`) |
| `android/` | Android native project (created after `cap add android`) |
| `public/.well-known/assetlinks.json` | Android app links verification |
| `public/.well-known/apple-app-site-association` | iOS universal links |
| `android-build/racketrescue-keystore.jks` | Existing Android signing key |

---

## Build Commands

| Command | Description |
|---------|-------------|
| `npm run build:capacitor` | Build Next.js + sync to native |
| `npm run cap:open:ios` | Open iOS project in Xcode |
| `npm run cap:open:android` | Open Android project in Android Studio |
| `npm run cap:run:ios` | Run on iOS simulator |
| `npm run cap:run:android` | Run on Android emulator |

---

## Deployment Checklist

### Google Play Store
- [ ] Backup keystore to 3+ locations
- [ ] Build release AAB in Android Studio
- [ ] Upload to Google Play Console
- [ ] Verify `assetlinks.json` is accessible at `https://www.racketrescue.com/.well-known/assetlinks.json`

### Apple App Store
- [ ] Archive app in Xcode
- [ ] Upload to App Store Connect
- [ ] Verify `apple-app-site-association` is accessible at `https://www.racketrescue.com/.well-known/apple-app-site-association`
- [ ] Complete App Store listing

---

## Verification URLs

After deploying to production, verify these URLs return valid JSON:

- Android: https://www.racketrescue.com/.well-known/assetlinks.json
- iOS: https://www.racketrescue.com/.well-known/apple-app-site-association
