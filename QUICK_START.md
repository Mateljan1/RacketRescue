# 🎾 RacketRescue Mobile Apps - Quick Start Guide

**Last Updated:** January 3, 2026

---

## 🚨 DO THIS FIRST (Critical - 5 minutes)

### 1. Backup the Keystore NOW
```bash
mkdir -p ~/RacketRescue-Keystore-Backup
cp /Users/andrew-mac-studio/RacketRescue/app-builds/android/android.keystore ~/RacketRescue-Keystore-Backup/
cp /Users/andrew-mac-studio/RacketRescue/app-builds/android/KEYSTORE-INFO.txt ~/RacketRescue-Keystore-Backup/
```

**Then manually copy to:**
- ☐ Dropbox
- ☐ Google Drive  
- ☐ External hard drive
- ☐ Password manager

⚠️ **Without this file, you cannot update the Android app!**

### 2. Deploy Android Verification File
```bash
cd /Users/andrew-mac-studio/RacketRescue
git add public/.well-known/assetlinks.json
git commit -m "Add Android Digital Asset Links"
git push
```

Wait 3 minutes, then verify:
```bash
curl https://racketrescue.com/.well-known/assetlinks.json
```

### 3. Organize Files
```bash
cd /Users/andrew-mac-studio/RacketRescue
./scripts/organize-mobile-apps.sh
```

---

## ✅ Current Status

### What's Ready:
- ✅ Android build files (1.2MB .aab ready for Play Store)
- ✅ Website PWA configured
- ✅ Icons generated (all sizes)
- ✅ Documentation complete

### What's Needed:
- ⚠️ Keystore backup (DO NOW)
- ⚠️ Deploy assetlinks.json
- ⚠️ Organize folder structure
- ⚠️ Generate iOS build
- ⚠️ Clean up Downloads duplicates

---

## 📱 Deployment Paths

### Path 1: Android First (Recommended)
**Time:** 1-2 hours  
**Difficulty:** Easy  

1. Complete "DO THIS FIRST" section above
2. Test APK: `adb install app-builds/android/app-release-signed.apk`
3. Go to https://play.google.com/console
4. Create new app
5. Upload `app-builds/android/app-release-bundle.aab`
6. Fill store listing (see `app-builds/README-VIKRAM.md`)
7. Submit for review

### Path 2: iOS Second
**Time:** 2-3 hours  
**Difficulty:** Medium  

1. Go to https://www.pwabuilder.com
2. Enter: https://racketrescue.com
3. Download iOS package
4. Open in Xcode
5. Configure signing
6. Archive & upload to App Store Connect
7. Submit for review

### Path 3: Automated (Using MCP Tools)
**Time:** 30-45 minutes  
**Difficulty:** Easy  

Use browser automation and file tools to streamline the process.

---

## 📚 Documentation

- **Full Guide:** `MOBILE_APP_DEPLOYMENT_PLAN.md` (13KB)
- **Current Status:** `MOBILE_APP_STATUS.md` (8KB)
- **Manual Steps:** `app-builds/README-VIKRAM.md` (10KB)
- **This File:** Quick reference

---

## 🛠️ Useful Commands

```bash
# Check status
./scripts/check-mobile-status.sh

# Organize files
./scripts/organize-mobile-apps.sh

# Test Android app
adb install app-builds/android/app-release-signed.apk

# Verify website deployment
curl https://racketrescue.com/.well-known/assetlinks.json
curl https://racketrescue.com/manifest.json

# Check Downloads for duplicates
ls -la ~/Downloads/ | grep -i racket
```

---

## 🔐 Critical Info

- **Package ID:** com.racketrescue.app
- **App Name:** Racket Rescue
- **Version:** 1.0.0 (Build 1)
- **Website:** https://racketrescue.com
- **Theme:** #ec1f27
- **Keystore:** `app-builds/android/android.keystore`

---

## ❓ Quick FAQ

**Q: Can I deploy now?**  
A: After completing "DO THIS FIRST" section, yes!

**Q: What if I lose the keystore?**  
A: Cannot update app. Must create new listing. BACKUP NOW!

**Q: How long for approval?**  
A: Google Play: 1-3 days, Apple: 1-2 days

**Q: Do I need to rebuild for website changes?**  
A: No! PWA wrapper loads website content automatically.

---

## 🎯 Next Steps

1. ☐ Backup keystore (3 locations minimum)
2. ☐ Deploy assetlinks.json
3. ☐ Run organize script
4. ☐ Test Android APK
5. ☐ Submit to Google Play
6. ☐ Generate iOS build
7. ☐ Submit to App Store

---

**Need help?** Check the full guides or ask! 🚀

