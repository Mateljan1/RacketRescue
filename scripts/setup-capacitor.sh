#!/bin/bash

# RacketRescue Capacitor Setup Script
# Run this script after cloning the project locally

set -e

echo "========================================="
echo "  RacketRescue Capacitor Setup"
echo "========================================="
echo ""

# Check for required tools
echo "Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "ERROR: npm is not installed. Please install npm first."
    exit 1
fi

echo "Node.js version: $(node -v)"
echo "npm version: $(npm -v)"
echo ""

# Install dependencies
echo "Step 1: Installing dependencies..."
npm install

# Install Capacitor packages explicitly
echo "Step 2: Installing Capacitor packages..."
npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android
npm install @capacitor/push-notifications @capacitor/geolocation @capacitor/camera @capacitor/haptics @capacitor/share @capacitor/splash-screen @capacitor/status-bar

# Initialize Capacitor if not already done
if [ ! -d "ios" ]; then
    echo "Step 3: Adding iOS platform..."
    npx cap add ios
else
    echo "Step 3: iOS platform already exists, skipping..."
fi

if [ ! -d "android" ]; then
    echo "Step 4: Adding Android platform..."
    npx cap add android
else
    echo "Step 4: Android platform already exists, skipping..."
fi

# Build the Next.js app
echo "Step 5: Building Next.js app..."
npm run build

# Sync with native platforms
echo "Step 6: Syncing with native platforms..."
npx cap sync

echo ""
echo "========================================="
echo "  Setup Complete!"
echo "========================================="
echo ""
echo "Next steps:"
echo "  - For iOS:     npx cap open ios"
echo "  - For Android: npx cap open android"
echo ""
echo "For development with live reload:"
echo "  - iOS:     npx cap run ios -l --external"
echo "  - Android: npx cap run android -l --external"
echo ""
