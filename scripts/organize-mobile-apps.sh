#!/bin/bash

# RacketRescue Mobile Apps - Organization Script
# This script cleans up and organizes mobile app files

set -e  # Exit on error

echo "🎾 RacketRescue Mobile App Organization"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Base directories
PROJECT_DIR="/Users/andrew-mac-studio/RacketRescue"
DOWNLOADS_DIR="/Users/andrew-mac-studio/Downloads"

# Check if we're in the right directory
if [ ! -f "$PROJECT_DIR/package.json" ]; then
  echo -e "${RED}❌ Error: Not in RacketRescue project directory${NC}"
  exit 1
fi

cd "$PROJECT_DIR"

echo "Step 1: Checking current structure..."
echo "--------------------------------------"

# Check what exists
if [ -d "app-builds" ]; then
  echo -e "${YELLOW}📁 Found: app-builds/ (old structure)${NC}"
  OLD_STRUCTURE=true
else
  OLD_STRUCTURE=false
fi

if [ -d "mobile-apps" ]; then
  echo -e "${GREEN}✅ Found: mobile-apps/ (new structure)${NC}"
  NEW_STRUCTURE=true
else
  NEW_STRUCTURE=false
fi

# Check Downloads folder
echo ""
echo "Step 2: Checking Downloads folder..."
echo "--------------------------------------"

ANDROID_DOWNLOADS="$DOWNLOADS_DIR/RacketRescue-Android"
APPSTORES_DOWNLOADS="$DOWNLOADS_DIR/RacketRescue-AppStores"

if [ -d "$ANDROID_DOWNLOADS" ]; then
  echo -e "${YELLOW}📁 Found: $ANDROID_DOWNLOADS${NC}"
  ls -lh "$ANDROID_DOWNLOADS" | head -10
  FOUND_ANDROID=true
else
  echo "No RacketRescue-Android folder in Downloads"
  FOUND_ANDROID=false
fi

if [ -d "$APPSTORES_DOWNLOADS" ]; then
  echo -e "${YELLOW}📁 Found: $APPSTORES_DOWNLOADS${NC}"
  ls -lh "$APPSTORES_DOWNLOADS" | head -10
  FOUND_APPSTORES=true
else
  echo "No RacketRescue-AppStores folder in Downloads"
  FOUND_APPSTORES=false
fi

echo ""
echo "Step 3: Creating new structure..."
echo "--------------------------------------"

# Create new mobile-apps structure
mkdir -p mobile-apps/{android,ios,docs,assets}

echo -e "${GREEN}✅ Created mobile-apps structure${NC}"

# Move files from app-builds if it exists
if [ "$OLD_STRUCTURE" = true ]; then
  echo ""
  echo "Step 4: Migrating from app-builds..."
  echo "--------------------------------------"
  
  if [ -d "app-builds/android" ]; then
    echo "Moving Android files..."
    cp -r app-builds/android/* mobile-apps/android/ 2>/dev/null || true
    echo -e "${GREEN}✅ Moved Android files${NC}"
  fi
  
  if [ -f "app-builds/README-VIKRAM.md" ]; then
    echo "Moving documentation..."
    cp app-builds/README-VIKRAM.md mobile-apps/docs/MANUAL_DEPLOYMENT.md
    echo -e "${GREEN}✅ Moved documentation${NC}"
  fi
  
  if [ -d "app-builds/assets" ]; then
    echo "Moving assets..."
    cp -r app-builds/assets/* mobile-apps/assets/ 2>/dev/null || true
    echo -e "${GREEN}✅ Moved assets${NC}"
  fi
fi

echo ""
echo "Step 5: Verifying critical files..."
echo "--------------------------------------"

# Check for critical files
CRITICAL_FILES=(
  "mobile-apps/android/app-release-bundle.aab"
  "mobile-apps/android/app-release-signed.apk"
  "mobile-apps/android/android.keystore"
  "mobile-apps/android/twa-manifest.json"
  "public/.well-known/assetlinks.json"
  "public/manifest.json"
)

ALL_GOOD=true
for file in "${CRITICAL_FILES[@]}"; do
  if [ -f "$file" ]; then
    echo -e "${GREEN}✅ $file${NC}"
  else
    echo -e "${RED}❌ Missing: $file${NC}"
    ALL_GOOD=false
  fi
done

echo ""
echo "Step 6: Creating backup of keystore..."
echo "--------------------------------------"

if [ -f "mobile-apps/android/android.keystore" ]; then
  BACKUP_DIR="$HOME/RacketRescue-Keystore-Backup"
  mkdir -p "$BACKUP_DIR"
  
  TIMESTAMP=$(date +%Y%m%d_%H%M%S)
  cp mobile-apps/android/android.keystore "$BACKUP_DIR/android.keystore.$TIMESTAMP"
  cp mobile-apps/android/KEYSTORE-INFO.txt "$BACKUP_DIR/KEYSTORE-INFO.txt.$TIMESTAMP" 2>/dev/null || true
  
  echo -e "${GREEN}✅ Keystore backed up to: $BACKUP_DIR${NC}"
  echo -e "${YELLOW}⚠️  IMPORTANT: Also backup to cloud storage (Dropbox, Google Drive, etc.)${NC}"
else
  echo -e "${RED}❌ Keystore not found - cannot create backup${NC}"
fi

echo ""
echo "Step 7: Summary"
echo "--------------------------------------"

# Count files
ANDROID_FILES=$(find mobile-apps/android -type f 2>/dev/null | wc -l)
IOS_FILES=$(find mobile-apps/ios -type f 2>/dev/null | wc -l)

echo "Mobile Apps Structure:"
echo "  📁 mobile-apps/android/ - $ANDROID_FILES files"
echo "  📁 mobile-apps/ios/ - $IOS_FILES files"
echo "  📁 mobile-apps/docs/"
echo "  📁 mobile-apps/assets/"

echo ""
if [ "$ALL_GOOD" = true ]; then
  echo -e "${GREEN}✅ All critical files present!${NC}"
  echo ""
  echo "Next steps:"
  echo "1. Review MOBILE_APP_DEPLOYMENT_PLAN.md"
  echo "2. Verify assetlinks.json is deployed"
  echo "3. Test Android APK on device"
  echo "4. Deploy to Google Play Store"
else
  echo -e "${RED}❌ Some critical files are missing${NC}"
  echo "Please check the errors above and resolve them."
fi

echo ""
echo "Optional cleanup (run manually if desired):"
if [ "$OLD_STRUCTURE" = true ]; then
  echo "  rm -rf app-builds/  # Remove old structure"
fi
if [ "$FOUND_ANDROID" = true ]; then
  echo "  rm -rf $ANDROID_DOWNLOADS  # Remove Downloads duplicate"
fi
if [ "$FOUND_APPSTORES" = true ]; then
  echo "  rm -rf $APPSTORES_DOWNLOADS  # Remove Downloads duplicate"
fi

echo ""
echo "🎾 Organization complete!"

