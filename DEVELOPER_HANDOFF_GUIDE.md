# 🎾 RacketRescue - Developer Handoff Guide

**Date:** January 3, 2026  
**Status:** ✅ Ready for App Store Submission  
**For:** External Developer / Contractor

---

## 📋 OVERVIEW

This guide will help a developer submit RacketRescue to both Google Play Store and Apple App Store. Everything is ready - they just need to follow these steps.

---

## 🔑 WHAT THE DEVELOPER NEEDS FROM YOU

### 1. GitHub Access
```
Repository: https://github.com/Mateljan1/RacketRescue
Access Level: Write access (to push changes)
```

**How to grant access:**
1. Go to: https://github.com/Mateljan1/RacketRescue/settings/access
2. Click "Add people"
3. Enter their GitHub username
4. Select "Write" role
5. Send invitation

### 2. Google Play Console Access
```
URL: https://play.google.com/console
Account: Your Google account email
```

**How to grant access:**
1. Go to: https://play.google.com/console
2. Click "Users and permissions"
3. Click "Invite new users"
4. Enter developer's email
5. Grant permissions:
   - ✅ View app information
   - ✅ Edit store listing
   - ✅ Manage production releases
   - ✅ Manage app signing keys
6. Send invitation

### 3. Apple Developer Account Access
```
URL: https://developer.apple.com
Account: Your Apple ID
```

**How to grant access:**
1. Go to: https://appstoreconnect.apple.com
2. Click "Users and Access"
3. Click "+" to add user
4. Enter developer's email
5. Select role: "App Manager" or "Developer"
6. Select apps: RacketRescue
7. Send invitation

### 4. Credentials to Share

**Share these securely (via 1Password, LastPass, or encrypted email):**

```
=== Android Keystore ===
Password: gpfUdI4cVD1L
Alias: my-key-alias
Location: app-builds/android/android.keystore (in GitHub)

=== Package Information ===
Android Package ID: com.racketrescue.www.twa
iOS Bundle ID: com.racketrescue.app (when creating iOS build)
Website: https://www.racketrescue.com

=== Contact Information ===
Support Email: [YOUR EMAIL]
Support Phone: [YOUR PHONE] (optional)
Company Name: Racket Rescue
```

---

## 📱 INSTRUCTIONS FOR THE DEVELOPER

### STEP 1: Clone Repository (5 minutes)

```bash
# Clone the repo
git clone git@github.com:Mateljan1/RacketRescue.git
cd RacketRescue

# Check everything is there
ls -la app-builds/android/
# Should see: app-release-bundle.aab, app-release-signed.apk, android.keystore

# Read the documentation
cat DEPLOYMENT_CHECKLIST.md
```

---

### STEP 2: Verify Deployment (5 minutes)

```bash
# Check website is live with correct assetlinks.json
curl https://www.racketrescue.com/.well-known/assetlinks.json

# Should show:
# - Package: com.racketrescue.www.twa
# - SHA256: E4:E4:C7:6C:C4:E5:44:DF:3C:2C:F7:09:F8:DC:14:C1:FE:1F:49:AD:B8:EA:35:F5:00:D2:38:57:7C:EA:EF:45

# Check manifest
curl https://www.racketrescue.com/manifest.json
```

**✅ If both URLs return valid JSON, proceed to Step 3**

---

### STEP 3: Test Android APK (Optional but Recommended - 10 minutes)

```bash
# Install APK on Android device
adb install app-builds/android/app-release-signed.apk

# Test checklist:
# - [ ] App installs successfully
# - [ ] App opens to racketrescue.com
# - [ ] Navigation works
# - [ ] Booking flow functional
# - [ ] No browser UI visible (fullscreen)
# - [ ] App icon displays correctly
```

---

### STEP 4: Submit to Google Play Store (45 minutes)

#### 4.1 Login to Google Play Console
```
URL: https://play.google.com/console
Use credentials provided by client
```

#### 4.2 Create New App
1. Click **"Create app"**
2. Fill in:
   - **App name:** Racket Rescue
   - **Default language:** English (United States)
   - **App or game:** App
   - **Free or paid:** Free
3. Accept declarations
4. Click **"Create app"**

#### 4.3 Complete Required Sections

Navigate to **"Dashboard → Set up your app"** and complete:

**✅ App Access:**
- Select: "All functionality is available without special access"

**✅ Ads:**
- Select: "No, my app does not contain ads"

**✅ Content Ratings:**
- Click "Start questionnaire"
- Category: **Utility / Productivity**
- Answer: **No** to violence, sexual content, etc.
- Submit → Should get **"Everyone"** rating

**✅ Target Audience:**
- Select: **18 and over**

**✅ News Apps:**
- Select: "My app is not a news app"

**✅ COVID-19 Apps:**
- Select: "My app is not a COVID-19 app"

**✅ Data Safety:**
- Does your app collect user data? **Yes**
- Data collected: Name, email, phone (for orders)
- Data shared: **No**
- Data encrypted: **Yes**
- Users can request deletion: **Yes**

**✅ Government Apps:**
- Select: "My app is not a government app"

#### 4.4 Store Listing

Navigate to **"Store presence → Main store listing"**

**App Details:**
```
App name: Racket Rescue

Short description (80 chars max):
Professional tennis racket restringing - schedule pickup & track orders

Full description:
Racket Rescue is Orange County's premier mobile tennis racket restringing service.

FEATURES:
• Schedule convenient pickup & delivery for your rackets
• Track your order status in real-time
• Choose from premium string options
• Fast turnaround times (24-hour standard, same-day rush)
• Professional stringing by USRSA certified technicians
• Serving Laguna Beach, Newport Beach, Irvine, and surrounding areas

Whether you're a casual weekend player or competitive athlete, Racket Rescue ensures your rackets perform at their best.

Download now and never play with dead strings again!
```

**Graphics Required:**

You'll need to create/provide:
- [ ] **App icon:** 512x512 PNG (use `public/icons/icon-512.png` from repo)
- [ ] **Feature graphic:** 1024x500 PNG (create banner image)
- [ ] **Phone screenshots:** At least 2 (1080x1920)
  - Screenshot 1: Homepage
  - Screenshot 2: Booking flow
  - Screenshot 3: Order tracking (optional)

**To get screenshots:**
```bash
# Option 1: Install APK on Android device and take screenshots
adb install app-builds/android/app-release-signed.apk
# Then take screenshots of key screens

# Option 2: Use Android emulator
# Open Android Studio → Device Manager → Create Virtual Device
# Install APK and take screenshots
```

**Contact Details:**
```
Email: [CLIENT'S SUPPORT EMAIL]
Website: https://www.racketrescue.com
Phone: [OPTIONAL]
```

#### 4.5 Upload Build

1. Navigate to **"Release → Production"**
2. Click **"Create new release"**
3. **App signing:** Select "Let Google manage" (recommended)
4. Click **"Upload"** button
5. Select file: `app-builds/android/app-release-bundle.aab`
6. **Release name:** `1.0.0`
7. **Release notes:**
```
Initial release of Racket Rescue!
- Schedule racket pickup and delivery
- Track your orders in real-time
- Browse premium string options
- Fast turnaround times
```
8. Click **"Save"**
9. Click **"Review release"**
10. Review all information
11. Click **"Start rollout to Production"**

#### 4.6 Wait for Review
- Typical: 1-3 days
- Sometimes: Same day!
- You'll get email notification when approved

---

### STEP 5: Generate iOS Build (30 minutes)

#### 5.1 Use PWABuilder
```
URL: https://www.pwabuilder.com
```

1. Enter: `https://www.racketrescue.com`
2. Click **"Start"**
3. Wait for PWA analysis (shows score)
4. Click **"Package for stores"**
5. Click **"iOS"** card
6. Configure:
   - **Name:** Racket Rescue
   - **Bundle ID:** `com.racketrescue.app`
   - **URL:** `https://www.racketrescue.com`
   - **Status bar color:** `#ec1f27`
7. Click **"Download"**
8. Extract the downloaded zip file

#### 5.2 Open in Xcode (Mac Required)

**Requirements:**
- Mac computer
- Xcode installed (from App Store)
- Apple Developer account (provided by client)

**Steps:**
1. Open Xcode
2. Open the `.xcodeproj` or `.xcworkspace` file from extracted folder
3. In left sidebar, click project name
4. Select target under "TARGETS"
5. Go to **"Signing & Capabilities"** tab
6. Check **"Automatically manage signing"**
7. Select **Team:** (client's Apple Developer account)
8. Verify **Bundle Identifier:** `com.racketrescue.app`

#### 5.3 Add App Icons

1. In Xcode, find `Assets.xcassets` in file navigator
2. Click `AppIcon`
3. Drag icon images into slots (use icons from `public/icons/` in repo)
4. Or use icon generator: https://appicon.co

#### 5.4 Archive and Upload

1. In Xcode, select device: **"Any iOS Device (arm64)"**
2. Menu: **Product → Archive**
3. Wait for build (few minutes)
4. When done, Organizer window opens
5. Select the archive
6. Click **"Distribute App"**
7. Choose **"App Store Connect"**
8. Click through options (defaults are fine)
9. Click **"Upload"**

---

### STEP 6: Submit to App Store (30 minutes)

#### 6.1 Login to App Store Connect
```
URL: https://appstoreconnect.apple.com
Use credentials provided by client
```

#### 6.2 Create New App

1. Click **"My Apps"** → **"+"** → **"New App"**
2. Fill in:
   - **Platforms:** iOS
   - **Name:** Racket Rescue
   - **Primary Language:** English (U.S.)
   - **Bundle ID:** `com.racketrescue.app` (should appear in dropdown after upload)
   - **SKU:** `racketrescue001`
   - **User Access:** Full Access
3. Click **"Create"**

#### 6.3 App Information

**Category:**
- Primary: **Lifestyle** or **Utilities**
- Secondary: (optional)

**Content Rights:**
- Does not contain third-party content

**Age Rating:**
- Complete questionnaire (similar to Google Play)
- Should get **4+** rating

#### 6.4 Pricing and Availability

- **Price:** Free
- **Availability:** All territories (or select specific countries)

#### 6.5 Prepare for Submission

Navigate to **"App Store → iOS App"**

**Version Information:**

```
Version: 1.0.0

Screenshots:
- Upload iPhone screenshots (6.5" and 5.5" displays required)
- Use same screenshots as Google Play

Promotional Text: (optional)
Leave blank or add seasonal promotion

Description:
[Use same description as Google Play]

Keywords:
tennis, racket, restringing, tennis strings, racquet service, sports, laguna beach, orange county

Support URL: https://www.racketrescue.com
Marketing URL: (optional)
```

**Build:**
1. Click **"+"** next to Build
2. Select the build you uploaded from Xcode
3. If build doesn't appear, wait 10-15 minutes for processing

**App Review Information:**
```
Contact Name: [CLIENT'S NAME]
Contact Phone: [CLIENT'S PHONE]
Contact Email: [CLIENT'S EMAIL]

Notes: (optional)
"This is a PWA (Progressive Web App) wrapper for our tennis racket restringing service. The app loads our website content and provides a native app experience for our customers."
```

**Version Release:**
- Select: **"Automatically release this version"**

#### 6.6 Submit for Review

1. Click **"Add for Review"** (top right)
2. Review all information
3. Click **"Submit to App Review"**
4. Wait for review (typically 24-48 hours)

---

### STEP 7: Post-Submission Updates (15 minutes)

Once both apps are submitted, update the repository:

```bash
cd RacketRescue

# Create a submission record
cat > SUBMISSION_RECORD.md << 'EOF'
# App Store Submission Record

## Submission Date
[DATE]

## Google Play Store
- Status: Submitted
- Submission Date: [DATE]
- Package ID: com.racketrescue.www.twa
- Version: 1.0.0
- Review Status: Pending

## Apple App Store
- Status: Submitted
- Submission Date: [DATE]
- Bundle ID: com.racketrescue.app
- Version: 1.0.0
- Review Status: Pending

## Notes
[Any notes about the submission process]
EOF

# Commit and push
git add SUBMISSION_RECORD.md
git commit -m "Add app store submission record"
git push origin main
```

---

## 📊 TIMELINE EXPECTATIONS

### Google Play Store:
- **Submission:** 45 minutes
- **Review:** 1-3 days (sometimes same day)
- **Total:** 1-3 days from submission

### Apple App Store:
- **iOS Build Generation:** 30 minutes
- **Xcode Setup:** 15 minutes
- **Submission:** 30 minutes
- **Review:** 1-2 days (sometimes 24 hours)
- **Total:** 2-3 days from starting iOS build

### Overall Timeline:
- **Day 1:** Submit Android
- **Day 1-2:** Generate and submit iOS
- **Day 2-4:** Both apps approved
- **Day 5:** Both apps live! 🎉

---

## 🔧 TROUBLESHOOTING

### Issue: "assetlinks.json not found"
**Solution:** Wait 5-10 minutes for Vercel deployment, then check again

### Issue: "APK won't install on device"
**Solution:** 
- Enable "Install from unknown sources" in device settings
- Uninstall any previous version first

### Issue: "Build not appearing in App Store Connect"
**Solution:** Wait 10-15 minutes for Apple to process the upload

### Issue: "Keystore password not working"
**Solution:** Check `app-builds/android/KEYSTORE-INFO.txt` for correct password

### Issue: "App shows in browser instead of fullscreen"
**Solution:**
- Verify assetlinks.json is accessible
- Wait 24 hours for Android to verify the link
- Clear app data and reopen

---

## 📞 SUPPORT & QUESTIONS

### Documentation Available:
- `DEPLOYMENT_CHECKLIST.md` - Complete submission guide
- `DEPLOYMENT_READY.md` - Deployment information
- `QUICK_START.md` - Quick reference
- `SUCCESS_SUMMARY.md` - What's been completed

### Key Files Locations:
```
Android Build: app-builds/android/app-release-bundle.aab
Android APK: app-builds/android/app-release-signed.apk
Keystore: app-builds/android/android.keystore
Icons: public/icons/
Logo: public/logo.png
```

### Useful Commands:
```bash
# Check status
./scripts/check-mobile-status.sh

# Verify deployment
curl https://www.racketrescue.com/.well-known/assetlinks.json

# Test APK
adb install app-builds/android/app-release-signed.apk
```

---

## ✅ DEVELOPER CHECKLIST

Before starting:
- [ ] GitHub access granted and tested
- [ ] Google Play Console access granted
- [ ] Apple Developer access granted
- [ ] All credentials received securely
- [ ] Repository cloned successfully
- [ ] Documentation reviewed

Android Submission:
- [ ] Website deployment verified
- [ ] APK tested (optional)
- [ ] Google Play Console app created
- [ ] All required sections completed
- [ ] Store listing filled out
- [ ] Screenshots prepared and uploaded
- [ ] .aab file uploaded
- [ ] Release submitted for review

iOS Submission:
- [ ] iOS build generated from PWABuilder
- [ ] Xcode project configured
- [ ] App icons added
- [ ] Build archived and uploaded
- [ ] App Store Connect app created
- [ ] Store listing completed
- [ ] Screenshots uploaded
- [ ] Build selected
- [ ] Submitted for review

Post-Submission:
- [ ] Submission record created
- [ ] Changes committed to GitHub
- [ ] Client notified of submission
- [ ] Monitoring review status

---

## 💰 ESTIMATED TIME & COST

### Time Breakdown:
- **Setup & Verification:** 20 minutes
- **Android Submission:** 45 minutes
- **iOS Build & Submission:** 1.5 hours
- **Documentation:** 15 minutes
- **Total:** ~2.5 hours

### Developer Rate Estimate:
- **Junior Developer:** $30-50/hour = $75-125
- **Mid-Level Developer:** $50-100/hour = $125-250
- **Senior Developer:** $100-200/hour = $250-500

**Recommended:** Mid-level developer with app store submission experience

---

## 🎯 SUCCESS CRITERIA

The job is complete when:
- ✅ Android app submitted to Google Play Store
- ✅ iOS app submitted to Apple App Store
- ✅ Both apps show "Pending Review" status
- ✅ Submission record committed to GitHub
- ✅ Client notified with submission details
- ✅ Review status monitoring instructions provided

---

## 📧 FINAL DELIVERABLES

The developer should provide:
1. **Submission confirmation emails** (from Google & Apple)
2. **Screenshots** of submission status pages
3. **Updated GitHub repository** with submission record
4. **Summary report** including:
   - Submission dates
   - Review status links
   - Any issues encountered
   - Expected approval timeline

---

## 🚀 READY TO START?

Everything is prepared and ready. The developer just needs to:
1. Get access credentials from you
2. Follow this guide step-by-step
3. Submit to both app stores
4. Monitor review status

**Estimated completion: 2-3 hours of work**  
**Apps live in stores: 3-5 days after submission**

---

**Good luck!** 🎾📱

