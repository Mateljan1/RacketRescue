#!/bin/bash

# RacketRescue Mobile Apps - Quick Status Check
# Run this anytime to see the current state of mobile app deployment

set -e

echo "🎾 RacketRescue Mobile App Status Check"
echo "========================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

PROJECT_DIR="/Users/andrew-mac-studio/RacketRescue"
cd "$PROJECT_DIR"

# Function to check if file exists
check_file() {
  if [ -f "$1" ]; then
    SIZE=$(ls -lh "$1" | awk '{print $5}')
    echo -e "${GREEN}✅${NC} $1 ${BLUE}($SIZE)${NC}"
    return 0
  else
    echo -e "${RED}❌${NC} $1 ${YELLOW}(missing)${NC}"
    return 1
  fi
}

# Function to check if URL is accessible
check_url() {
  if curl -s -f -o /dev/null "$1"; then
    echo -e "${GREEN}✅${NC} $1 ${BLUE}(accessible)${NC}"
    return 0
  else
    echo -e "${RED}❌${NC} $1 ${YELLOW}(not accessible)${NC}"
    return 1
  fi
}

echo "📱 Android Build Files"
echo "----------------------"
check_file "mobile-apps/android/app-release-bundle.aab" || check_file "app-builds/android/app-release-bundle.aab"
check_file "mobile-apps/android/app-release-signed.apk" || check_file "app-builds/android/app-release-signed.apk"
check_file "mobile-apps/android/android.keystore" || check_file "app-builds/android/android.keystore"
check_file "mobile-apps/android/twa-manifest.json" || check_file "app-builds/android/twa-manifest.json"

echo ""
echo "🍎 iOS Build Files"
echo "------------------"
if [ -d "mobile-apps/ios" ] && [ "$(ls -A mobile-apps/ios)" ]; then
  echo -e "${GREEN}✅${NC} iOS build directory exists with files"
  ls -1 mobile-apps/ios/ | head -5
elif [ -d "app-builds/ios" ] && [ "$(ls -A app-builds/ios)" ]; then
  echo -e "${GREEN}✅${NC} iOS build directory exists with files (old location)"
  ls -1 app-builds/ios/ | head -5
else
  echo -e "${YELLOW}⚠️${NC}  iOS build not generated yet"
  echo "   Generate from: https://www.pwabuilder.com"
fi

echo ""
echo "🌐 Website PWA Files"
echo "--------------------"
check_file "public/manifest.json"
check_file "public/.well-known/assetlinks.json"
check_file "public/icons/icon-512.png"
check_file "public/sw.js"

echo ""
echo "📄 Documentation"
echo "----------------"
check_file "MOBILE_APP_DEPLOYMENT_PLAN.md"
check_file "mobile-apps/docs/MANUAL_DEPLOYMENT.md" || check_file "app-builds/README-VIKRAM.md"

echo ""
echo "🔐 Security & Backups"
echo "---------------------"
if [ -f "mobile-apps/android/android.keystore" ] || [ -f "app-builds/android/android.keystore" ]; then
  echo -e "${GREEN}✅${NC} Keystore exists in project"
  
  # Check for backups
  BACKUP_LOCATIONS=(
    "$HOME/RacketRescue-Keystore-Backup/android.keystore.*"
    "$HOME/Dropbox/RacketRescue-Backup/android.keystore"
    "$HOME/Google Drive/RacketRescue-Backup/android.keystore"
  )
  
  BACKUP_FOUND=false
  for backup in "${BACKUP_LOCATIONS[@]}"; do
    if ls $backup 1> /dev/null 2>&1; then
      echo -e "${GREEN}✅${NC} Backup found: $backup"
      BACKUP_FOUND=true
    fi
  done
  
  if [ "$BACKUP_FOUND" = false ]; then
    echo -e "${YELLOW}⚠️${NC}  No keystore backups found - ${RED}CREATE BACKUPS NOW!${NC}"
  fi
else
  echo -e "${RED}❌${NC} Keystore not found!"
fi

echo ""
echo "🚀 Deployment Status"
echo "--------------------"

# Check if website is deployed
echo "Checking website deployment..."
check_url "https://racketrescue.com/manifest.json"
check_url "https://racketrescue.com/.well-known/assetlinks.json"

# Check app version
if [ -f "mobile-apps/android/twa-manifest.json" ]; then
  VERSION=$(grep -o '"appVersionName": "[^"]*"' mobile-apps/android/twa-manifest.json | cut -d'"' -f4)
  VERSION_CODE=$(grep -o '"appVersionCode": [0-9]*' mobile-apps/android/twa-manifest.json | grep -o '[0-9]*')
  echo -e "${BLUE}📦 Current Version:${NC} $VERSION (Build $VERSION_CODE)"
elif [ -f "app-builds/android/twa-manifest.json" ]; then
  VERSION=$(grep -o '"appVersionName": "[^"]*"' app-builds/android/twa-manifest.json | cut -d'"' -f4)
  VERSION_CODE=$(grep -o '"appVersionCode": [0-9]*' app-builds/android/twa-manifest.json | grep -o '[0-9]*')
  echo -e "${BLUE}📦 Current Version:${NC} $VERSION (Build $VERSION_CODE)"
fi

echo ""
echo "📊 Summary"
echo "----------"

# Count what we have
ANDROID_READY=false
IOS_READY=false
WEBSITE_READY=false

if [ -f "mobile-apps/android/app-release-bundle.aab" ] || [ -f "app-builds/android/app-release-bundle.aab" ]; then
  ANDROID_READY=true
fi

if [ -d "mobile-apps/ios" ] && [ "$(ls -A mobile-apps/ios)" ]; then
  IOS_READY=true
fi

if [ -f "public/.well-known/assetlinks.json" ] && [ -f "public/manifest.json" ]; then
  WEBSITE_READY=true
fi

if [ "$ANDROID_READY" = true ]; then
  echo -e "${GREEN}✅ Android:${NC} Ready for deployment"
else
  echo -e "${RED}❌ Android:${NC} Not ready"
fi

if [ "$IOS_READY" = true ]; then
  echo -e "${GREEN}✅ iOS:${NC} Ready for deployment"
else
  echo -e "${YELLOW}⚠️  iOS:${NC} Needs to be generated"
fi

if [ "$WEBSITE_READY" = true ]; then
  echo -e "${GREEN}✅ Website:${NC} PWA files present"
else
  echo -e "${RED}❌ Website:${NC} Missing PWA files"
fi

echo ""
echo "🎯 Next Steps"
echo "-------------"

if [ "$WEBSITE_READY" = false ]; then
  echo "1. ❗ Fix website PWA files first"
elif [ "$ANDROID_READY" = true ] && [ "$IOS_READY" = false ]; then
  echo "1. Deploy Android to Google Play Store"
  echo "2. Generate iOS build from PWABuilder"
  echo "3. Deploy iOS to App Store"
elif [ "$ANDROID_READY" = true ] && [ "$IOS_READY" = true ]; then
  echo "1. Deploy Android to Google Play Store"
  echo "2. Deploy iOS to App Store"
  echo "3. Update website with app store links"
else
  echo "1. Run: ./scripts/organize-mobile-apps.sh"
  echo "2. Review: MOBILE_APP_DEPLOYMENT_PLAN.md"
fi

echo ""
echo "💡 Quick Commands"
echo "-----------------"
echo "  Organize files:  ./scripts/organize-mobile-apps.sh"
echo "  View plan:       cat MOBILE_APP_DEPLOYMENT_PLAN.md"
echo "  Test Android:    adb install mobile-apps/android/app-release-signed.apk"
echo "  Generate iOS:    open https://www.pwabuilder.com"

echo ""

