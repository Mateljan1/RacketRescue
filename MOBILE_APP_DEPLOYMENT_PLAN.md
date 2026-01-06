# 🎾 RacketRescue Mobile App - Deployment Status & Action Plan

**Last Updated:** January 3, 2026  
**Status:** Ready for deployment with cleanup needed

---

## 📊 CURRENT SITUATION ANALYSIS

### What We Have:
1. ✅ **Main Next.js Website** - `/Users/andrew-mac-studio/RacketRescue/`
   - Fully functional PWA-ready website
   - Manifest.json configured
   - Icons generated (72px to 512px)
   - Service worker ready

2. ✅ **Android Build Assets** - `/Users/andrew-mac-studio/RacketRescue/app-builds/android/`
   - `app-release-bundle.aab` (for Google Play Store)
   - `app-release-signed.apk` (for testing)
   - `android.keystore` (CRITICAL - signing key)
   - `twa-manifest.json` (configuration)

3. ✅ **Documentation** - `/Users/andrew-mac-studio/RacketRescue/app-builds/README-VIKRAM.md`
   - Complete step-by-step guide for manual deployment

4. ❓ **Duplicate Folders in Downloads** (Need to verify/clean up)
   - `RacketRescue-Android` (in Downloads)
   - `RacketRescue-AppStores` (in Downloads)

### What's Missing:
- ❌ `.well-known/assetlinks.json` (Required for Android TWA)
- ❌ iOS build (needs to be generated from PWABuilder)
- ❌ Automated deployment scripts
- ❌ Clear folder organization

---

## 🎯 RECOMMENDED ACTION PLAN

### Phase 1: Cleanup & Organization (15 minutes)

#### Step 1.1: Verify Downloads Folders
\`\`\`bash
# Check what's in the Downloads folders
ls -la ~/Downloads/RacketRescue-Android/
ls -la ~/Downloads/RacketRescue-AppStores/
\`\`\`

**Decision Tree:**
- If they contain the same files as `app-builds/` → Delete duplicates
- If they contain newer/different files → Merge into `app-builds/`
- If empty or outdated → Delete

#### Step 1.2: Consolidate Everything
\`\`\`bash
# Move to main project
cd /Users/andrew-mac-studio/RacketRescue/

# Create clean structure
mkdir -p mobile-apps/{android,ios,docs}

# Move existing builds
mv app-builds/android/* mobile-apps/android/
mv app-builds/README-VIKRAM.md mobile-apps/docs/

# Clean up old folder
rm -rf app-builds/
\`\`\`

### Phase 2: Website Preparation (10 minutes)

#### Step 2.1: Add Android Asset Links
Create the required Digital Asset Links file for Android TWA:

\`\`\`bash
# Create directory
mkdir -p /Users/andrew-mac-studio/RacketRescue/public/.well-known/

# Create assetlinks.json
cat > /Users/andrew-mac-studio/RacketRescue/public/.well-known/assetlinks.json << 'EOF'
[{
  "relation": ["delegate_permission/common.handle_all_urls"],
  "target": {
    "namespace": "android_app",
    "package_name": "com.racketrescue.app",
    "sha256_cert_fingerprints": [
      "DC:1C:AB:15:8B:29:38:75:D1:74:85:E5:5F:F8:F3:7F:7D:DF:EF:94:A7:20:9B:E1:65:F1:C7:A7:55:37:DF:5F"
    ]
  }
}]
EOF
\`\`\`

#### Step 2.2: Deploy Website Update
\`\`\`bash
cd /Users/andrew-mac-studio/RacketRescue/

# Add the new file
git add public/.well-known/assetlinks.json

# Commit
git commit -m "Add Android Digital Asset Links for TWA app"

# Push to deploy
git push origin main
\`\`\`

#### Step 2.3: Verify Deployment
Wait 2-3 minutes for Vercel to deploy, then check:
\`\`\`bash
# Should return JSON (not 404)
curl https://racketrescue.com/.well-known/assetlinks.json
\`\`\`

### Phase 3: Android Deployment (30 minutes)

#### Option A: Manual Deployment (Following existing guide)
Follow the detailed steps in `mobile-apps/docs/README-VIKRAM.md`

#### Option B: Automated with MCP Tools (Recommended)
We can use available MCP tools to streamline this:

**Available Tools:**
- Browser automation (for navigating Play Console)
- File operations (for uploading .aab)
- Screenshot tools (for store listings)

**Automated Steps:**
1. Use browser automation to navigate to Google Play Console
2. Create new app listing
3. Upload `app-release-bundle.aab`
4. Fill in store listing details
5. Submit for review

### Phase 4: iOS Deployment (45 minutes)

#### Step 4.1: Generate iOS Package
\`\`\`bash
# Option 1: Use PWABuilder website
# 1. Go to https://www.pwabuilder.com
# 2. Enter: https://racketrescue.com
# 3. Click "Package for stores" → "iOS"
# 4. Download and extract to mobile-apps/ios/

# Option 2: Use PWABuilder CLI (if available)
npx @pwabuilder/cli package \
  --platform ios \
  --url https://racketrescue.com \
  --output mobile-apps/ios/
\`\`\`

#### Step 4.2: Configure in Xcode
\`\`\`bash
# Open the generated project
open mobile-apps/ios/*.xcodeproj
\`\`\`

Then in Xcode:
1. Set Bundle ID: `com.racketrescue.app`
2. Configure signing with Apple Developer account
3. Add app icons
4. Archive and upload to App Store Connect

---

## 🗂️ FINAL FOLDER STRUCTURE

\`\`\`
/Users/andrew-mac-studio/RacketRescue/
├── mobile-apps/
│   ├── android/
│   │   ├── app-release-bundle.aab       # Upload to Play Store
│   │   ├── app-release-signed.apk       # For testing
│   │   ├── android.keystore             # CRITICAL - backup!
│   │   ├── KEYSTORE-INFO.txt            # Credentials
│   │   └── twa-manifest.json            # Build config
│   ├── ios/
│   │   ├── RacketRescue.xcodeproj       # Xcode project (after generation)
│   │   └── (iOS build files)
│   └── docs/
│       ├── DEPLOYMENT_GUIDE.md          # This file
│       └── MANUAL_STEPS.md              # Vikram's original guide
├── public/
│   ├── .well-known/
│   │   └── assetlinks.json              # Android TWA verification
│   ├── manifest.json                    # PWA manifest
│   └── icons/                           # App icons
└── (rest of Next.js project)
\`\`\`

---

## 🔐 CRITICAL SECURITY ITEMS

### Android Keystore
**Location:** `mobile-apps/android/android.keystore`  
**Password:** (stored in KEYSTORE-INFO.txt)  
**SHA256:** `DC:1C:AB:15:8B:29:38:75:D1:74:85:E5:5F:F8:F3:7F:7D:DF:EF:94:A7:20:9B:E1:65:F1:C7:A7:55:37:DF:5F`

⚠️ **BACKUP THIS FILE IMMEDIATELY:**
\`\`\`bash
# Backup to multiple locations
cp mobile-apps/android/android.keystore ~/Dropbox/RacketRescue-Backup/
cp mobile-apps/android/android.keystore ~/Google\ Drive/RacketRescue-Backup/

# Create encrypted backup
zip -e racket-rescue-keystore-backup.zip mobile-apps/android/android.keystore
# (Use strong password and store separately)
\`\`\`

**Why this matters:**
- Without this keystore, you CANNOT update the Android app
- If lost, you must create a NEW app listing (losing all users/reviews)
- Valid for 27 years (until ~2051)

---

## 📱 APP CONFIGURATION

### Package Details
- **Package ID:** `com.racketrescue.app`
- **App Name:** Racket Rescue
- **Version:** 1.0.0 (Code: 1)
- **Website:** https://racketrescue.com
- **Theme Color:** #ec1f27

### Store Listings

#### Short Description (80 chars max)
\`\`\`
Professional tennis racket restringing - schedule pickup & track orders
\`\`\`

#### Full Description
\`\`\`
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
\`\`\`

#### Keywords (for iOS)
\`\`\`
tennis, racket, restringing, tennis strings, racquet service, sports, laguna beach, orange county
\`\`\`

---

## 🚀 DEPLOYMENT CHECKLIST

### Pre-Deployment
- [ ] Website deployed with assetlinks.json
- [ ] Verify manifest.json is accessible
- [ ] Test PWA functionality in browser
- [ ] Backup android.keystore to 3 locations
- [ ] Prepare store listing assets (screenshots, icons)

### Android Deployment
- [ ] Test APK on physical Android device
- [ ] Create Google Play Console account
- [ ] Upload app-release-bundle.aab
- [ ] Complete store listing
- [ ] Submit for review
- [ ] Monitor review status

### iOS Deployment
- [ ] Generate iOS package from PWABuilder
- [ ] Configure in Xcode
- [ ] Add app icons
- [ ] Archive and upload to App Store Connect
- [ ] Complete store listing
- [ ] Submit for review
- [ ] Monitor review status

### Post-Deployment
- [ ] Update website with app store links
- [ ] Test deep linking (website → app)
- [ ] Monitor crash reports
- [ ] Set up app analytics
- [ ] Create update schedule

---

## 🛠️ USING MCP TOOLS FOR DEPLOYMENT

### Available Tools We Can Use:

1. **Browser Automation** (`mcp_browser-automation-mcp_*`)
   - Navigate to Play Console
   - Fill in forms automatically
   - Take screenshots for documentation

2. **Supabase** (if needed for app data)
   - Store app analytics
   - Track installations
   - Manage user data

3. **File Operations**
   - Organize folders
   - Create backups
   - Generate documentation

### Automated Deployment Script (Conceptual)
\`\`\`bash
#!/bin/bash
# deploy-android.sh

echo "🎾 RacketRescue Android Deployment"
echo "=================================="

# Step 1: Verify files
if [ ! -f "mobile-apps/android/app-release-bundle.aab" ]; then
  echo "❌ Error: .aab file not found"
  exit 1
fi

# Step 2: Backup keystore
echo "📦 Backing up keystore..."
cp mobile-apps/android/android.keystore ~/Dropbox/RacketRescue-Backup/

# Step 3: Verify website deployment
echo "🌐 Checking assetlinks.json..."
curl -f https://racketrescue.com/.well-known/assetlinks.json > /dev/null
if [ $? -eq 0 ]; then
  echo "✅ Asset links verified"
else
  echo "❌ Asset links not found - deploy website first"
  exit 1
fi

# Step 4: Open Play Console
echo "🚀 Opening Google Play Console..."
open "https://play.google.com/console"

echo ""
echo "Next steps:"
echo "1. Create new app in Play Console"
echo "2. Upload: mobile-apps/android/app-release-bundle.aab"
echo "3. Complete store listing"
echo "4. Submit for review"
\`\`\`

---

## 🔄 FUTURE UPDATES

### Updating the Android App
\`\`\`bash
# 1. Edit version in twa-manifest.json
cd mobile-apps/android/
# Change: "appVersionCode": 2
# Change: "appVersionName": "1.0.1"

# 2. Rebuild (if you have build tools)
# Or regenerate from PWABuilder with new version

# 3. Upload new .aab to Play Console
\`\`\`

### Updating the iOS App
\`\`\`bash
# 1. Regenerate from PWABuilder with new version
# 2. Open in Xcode and increment version
# 3. Archive and upload to App Store Connect
\`\`\`

### Website Updates (No App Update Needed!)
Since these are PWA wrappers, any website changes automatically appear in the apps after users refresh. No app store update required for:
- Content changes
- Pricing updates
- New features
- Bug fixes
- Design updates

---

## ❓ TROUBLESHOOTING

### "I can't find the Downloads folders"
\`\`\`bash
# Search for them
find ~ -name "RacketRescue-Android" -type d
find ~ -name "RacketRescue-AppStores" -type d
\`\`\`

### "Asset links not working"
\`\`\`bash
# Verify file exists
curl -I https://racketrescue.com/.well-known/assetlinks.json

# Check content
curl https://racketrescue.com/.well-known/assetlinks.json | jq .

# May take 24 hours to propagate
\`\`\`

### "Keystore password not working"
\`\`\`bash
# Verify keystore
keytool -list -v -keystore mobile-apps/android/android.keystore

# Check KEYSTORE-INFO.txt for correct password
cat mobile-apps/android/KEYSTORE-INFO.txt
\`\`\`

### "App shows in browser instead of fullscreen"
- Verify assetlinks.json is deployed and accessible
- Clear app data: Settings → Apps → Racket Rescue → Clear Data
- Reinstall app
- May take 24 hours for Android to verify the link

---

## 📞 NEXT STEPS - WHAT TO DO RIGHT NOW

### Immediate Actions (Do This First):
\`\`\`bash
# 1. Clean up Downloads folder
cd ~/Downloads
ls -la | grep -i racket

# 2. Add assetlinks.json to website
cd /Users/andrew-mac-studio/RacketRescue
mkdir -p public/.well-known
# (Create the file as shown in Phase 2.1 above)

# 3. Deploy website
git add public/.well-known/assetlinks.json
git commit -m "Add Android Digital Asset Links"
git push

# 4. Wait 3 minutes, then verify
curl https://racketrescue.com/.well-known/assetlinks.json
\`\`\`

### Then Choose Your Path:

**Path A: Manual Deployment (Safer, More Control)**
- Follow the detailed guide in `README-VIKRAM.md`
- Takes 1-2 hours
- Good for learning the process

**Path B: Automated with MCP Tools (Faster, More Efficient)**
- Use browser automation for Play Console
- Use file tools for organization
- Takes 30-45 minutes
- Requires MCP tools setup

---

## 🎯 RECOMMENDATION

**I recommend we:**

1. **Clean up immediately** - Remove duplicate folders in Downloads
2. **Deploy assetlinks.json** - Critical for Android TWA
3. **Test the Android APK** - Verify it works on a device
4. **Use automated deployment** - Leverage MCP tools for efficiency
5. **Document everything** - Keep this guide updated

**Want me to start with any of these steps?** I can:
- ✅ Create the assetlinks.json file
- ✅ Organize the folder structure
- ✅ Generate deployment scripts
- ✅ Use browser automation for Play Console
- ✅ Create backup procedures

Just let me know which path you want to take! 🚀
