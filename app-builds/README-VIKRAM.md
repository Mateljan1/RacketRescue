# Racket Rescue - App Store Submission Guide for Vikram

Hi Vikram! This folder contains everything you need to get Racket Rescue into both Google Play Store and Apple App Store.

---

## FOLDER CONTENTS

```
RacketRescue-AppStores/
├── README-VIKRAM.md              # You're reading this!
├── android/
│   ├── app-release-bundle.aab    # Upload to Google Play
│   ├── app-release-signed.apk    # Test on Android devices
│   ├── android.keystore          # Signing key (CRITICAL - BACKUP!)
│   └── KEYSTORE-INFO.txt         # Keystore credentials
├── ios/
│   └── (generated via PWABuilder - see instructions)
├── website-update/
│   └── .well-known/
│       └── assetlinks.json       # Copy to website's public folder
└── assets/
    └── (store listing images go here)
```

---

## STEP 1: UPDATE THE WEBSITE FIRST (Required for Android)

Before submitting to stores, add the Digital Asset Links file to the website.

### 1.1 Copy the file
```bash
# From the Racket Rescue Next.js project
cp -r /Users/andrew-mac-studio/RacketRescue-AppStores/website-update/.well-known /Users/andrew-mac-studio/RacketRescue/public/
```

### 1.2 Deploy
```bash
cd /Users/andrew-mac-studio/RacketRescue
git add public/.well-known/assetlinks.json
git commit -m "Add Android app digital asset links"
git push
```

### 1.3 Verify (after Vercel deploys)
Open: https://racket-rescue.vercel.app/.well-known/assetlinks.json

You should see JSON with the SHA256 fingerprint.

---

## STEP 2: GOOGLE PLAY STORE (Android)

### 2.1 Test the APK First
Transfer `android/app-release-signed.apk` to an Android phone and install it.
- May need to enable "Install from unknown sources"
- Verify app opens and works correctly

### 2.2 Login to Google Play Console
URL: https://play.google.com/console

### 2.3 Create New App
1. Click **"Create app"**
2. Fill in:
   - **App name:** Racket Rescue
   - **Default language:** English (United States)
   - **App or game:** App
   - **Free or paid:** Free
3. Check the declarations and click **"Create app"**

### 2.4 Set Up Your App (Left Sidebar)

Complete these sections (checkmarks will appear):

#### Dashboard → Set up your app:

**1. App access**
- Select: "All functionality is available without special access"

**2. Ads**
- Select: "No, my app does not contain ads"

**3. Content ratings**
- Click "Start questionnaire"
- Category: Utility / Productivity
- Answer: No to violence, sexual content, etc.
- Submit and get rating (should be "Everyone")

**4. Target audience**
- Select: 18 and over (or "All ages" if appropriate)

**5. News apps**
- Select: "My app is not a news app"

**6. COVID-19 apps**
- Select: "My app is not a COVID-19 contact tracing or status app"

**7. Data safety**
- Does your app collect or share user data?
  - If the app collects customer info: Yes, describe what (name, email, phone for orders)
  - If just browsing: No

**8. Government apps**
- Select: "My app is not a government app"

### 2.5 Store Listing (Main store listing)

**App details:**
- **App name:** Racket Rescue
- **Short description (max 80 chars):**
  ```
  Professional tennis racket restringing - schedule pickup & track orders
  ```
- **Full description:**
  ```
  Racket Rescue is Orange County's premier mobile tennis racket restringing service.

  FEATURES:
  • Schedule convenient pickup & delivery for your rackets
  • Track your order status in real-time
  • Choose from premium string options
  • Fast turnaround times
  • Professional stringing by certified technicians
  • Serving Laguna Beach and surrounding areas

  Whether you're a casual weekend player or competitive athlete, Racket Rescue ensures your rackets perform at their best.

  Download now and never play with dead strings again!
  ```

**Graphics:**
- **App icon:** 512x512 PNG (use from website or create)
- **Feature graphic:** 1024x500 PNG (banner image)
- **Phone screenshots:** At least 2 screenshots, recommended 1080x1920
  - Take screenshots of the app running on a phone
  - Show: Home screen, Schedule page, Order tracking

**Contact details:**
- Email: (your support email)
- Phone: (optional)
- Website: https://racket-rescue.vercel.app

### 2.6 Create Release

1. Go to **Release → Production**
2. Click **"Create new release"**
3. **App signing:** Let Google manage (recommended)
4. **Upload:** `android/app-release-bundle.aab`
5. **Release name:** 1.0.0
6. **Release notes:**
   ```
   Initial release of Racket Rescue!
   - Schedule racket pickup and delivery
   - Track your orders in real-time
   - Browse string options
   ```
7. Click **"Save"** then **"Review release"**
8. Click **"Start rollout to Production"**

### 2.7 Wait for Review
- Typically 1-3 days for new apps
- You'll get email notification when approved

---

## STEP 3: APPLE APP STORE (iOS)

### 3.1 Generate iOS Package from PWABuilder

1. Open browser: **https://www.pwabuilder.com**

2. Enter URL: `https://racket-rescue.vercel.app`

3. Click **"Start"** button

4. Wait for PWA analysis to complete (shows score)

5. Click **"Package for stores"** button

6. Click on **"iOS"** card

7. Configure these settings:
   - **Name:** Racket Rescue
   - **Bundle ID:** com.racketrescue.app
   - **URL:** https://racket-rescue.vercel.app
   - **Status bar color:** #ec1f27

8. Click **"Download"**

9. Unzip the downloaded file to: `/Users/andrew-mac-studio/RacketRescue-AppStores/ios/`

### 3.2 Open in Xcode

1. Open Xcode on your Mac

2. Open the `.xcodeproj` or `.xcworkspace` file from the ios folder

3. In the left sidebar, click on the project name

4. Select the target under "TARGETS"

5. Go to **"Signing & Capabilities"** tab

6. Check **"Automatically manage signing"**

7. **Team:** Select the Apple Developer account

8. **Bundle Identifier:** Verify it's `com.racketrescue.app`

### 3.3 Configure App Icons

1. In Xcode, find `Assets.xcassets` in the file navigator

2. Click on `AppIcon`

3. Drag the Racket Rescue icon (512x512 or 1024x1024 PNG) into the slots
   - Xcode will tell you what sizes are needed
   - Or use an icon generator: https://appicon.co

### 3.4 Build and Archive

1. In Xcode, select target device: **"Any iOS Device (arm64)"**

2. Menu: **Product → Archive**

3. Wait for build to complete (may take a few minutes)

4. When done, the Organizer window opens

5. Select the archive and click **"Distribute App"**

6. Choose **"App Store Connect"**

7. Click through the options (defaults are usually fine)

8. Click **"Upload"**

### 3.5 App Store Connect Setup

1. Open browser: **https://appstoreconnect.apple.com**

2. Login with Apple Developer account

3. Click **"My Apps"** → **"+"** → **"New App"**

4. Fill in:
   - **Platforms:** iOS
   - **Name:** Racket Rescue
   - **Primary Language:** English (U.S.)
   - **Bundle ID:** com.racketrescue.app (should appear in dropdown after upload)
   - **SKU:** racketrescue001
   - **User Access:** Full Access

5. Click **"Create"**

### 3.6 App Information

**App Information tab:**
- **Category:** Lifestyle or Utilities
- **Content Rights:** Does not contain third-party content (unless it does)

**Pricing and Availability:**
- **Price:** Free
- **Availability:** All territories (or select specific countries)

### 3.7 Prepare for Submission

**App Store tab → iOS App:**

1. **Version Information:**
   - **Screenshots:** Upload iPhone screenshots (6.5" and 5.5" displays)
   - **Promotional Text:** (optional)
   - **Description:** Same as Google Play
   - **Keywords:** tennis, racket, restringing, tennis strings, racquet service
   - **Support URL:** https://racket-rescue.vercel.app
   - **Marketing URL:** (optional)

2. **Build:**
   - Click **"+"** and select the build you uploaded from Xcode

3. **App Review Information:**
   - **Contact Info:** Name, phone, email
   - **Notes:** (optional) "This is a PWA wrapper for our tennis racket restringing service"

4. **Version Release:**
   - Select: "Automatically release this version"

### 3.8 Submit for Review

1. Click **"Add for Review"** (top right)

2. Click **"Submit to App Review"**

3. Wait for review (typically 24-48 hours)

---

## KEYSTORE INFO (CRITICAL - KEEP SAFE!)

The Android keystore is required for ALL future app updates. If lost, you cannot update the app and must create a new listing.

```
File: android/android.keystore
Password: racketrescue123
Key Alias: android
Key Password: racketrescue123
```

**BACKUP THIS FILE** to secure cloud storage (Google Drive, iCloud, etc.)

---

## FUTURE APP UPDATES

### Android Update:
```bash
cd /Users/andrew-mac-studio/RacketRescue-Android

# Edit twa-manifest.json - change these values:
# "appVersionCode": 2,        <- increment by 1
# "appVersionName": "1.0.1",  <- update version

# Rebuild
./build.exp

# Upload new .aab to Play Console
```

### iOS Update:
1. Regenerate from PWABuilder (or just increment version in Xcode)
2. Archive and upload again
3. Submit new version in App Store Connect

### Website Updates:
No app update needed! The apps load content from the website, so any website changes appear automatically.

---

## TROUBLESHOOTING

### Android: "App not installed"
- Enable "Install from unknown sources" in phone settings
- Uninstall any previous version first

### iOS: Xcode signing errors
- Ensure Apple Developer account is logged in: Xcode → Settings → Accounts
- Bundle ID must match what's in App Store Connect

### iOS: "No suitable application records found"
- Wait 15-30 minutes after creating the app in App Store Connect
- The Bundle ID needs time to propagate

### Android: App shows in browser instead of fullscreen
- Verify assetlinks.json is deployed and accessible
- Clear app data and reopen
- May take 24 hours to take effect

---

## QUESTIONS?

App Configuration:
- Package ID: com.racketrescue.app
- Website: https://racket-rescue.vercel.app
- Theme Color: #ec1f27

Both apps are PWA wrappers - they load the website content inside a native app shell. Any updates to the website automatically appear in the apps!

---

Good luck Vikram! 🎾
