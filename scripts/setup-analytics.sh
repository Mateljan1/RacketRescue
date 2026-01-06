#!/bin/bash

# Analytics System Setup Script
# Run: chmod +x scripts/setup-analytics.sh && ./scripts/setup-analytics.sh

echo "🎾 RacketRescue Analytics System Setup"
echo "======================================"
echo ""

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Installing..."
    npm install -g pnpm
fi

# Install required packages
echo "📦 Installing required packages..."
pnpm add @google-analytics/data @vercel/edge-config

if [ $? -eq 0 ]; then
    echo "✅ Packages installed successfully"
else
    echo "❌ Package installation failed"
    exit 1
fi

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo ""
    echo "⚠️  .env.local not found"
    echo "📝 Please create .env.local with required variables"
    echo "    See ENV_SETUP.md for details"
    echo ""
    exit 1
fi

# Check for required environment variables
echo ""
echo "🔍 Checking environment variables..."

required_vars=(
    "NEXT_PUBLIC_GA_ID"
    "GA4_PROPERTY_ID"
    "GA4_SERVICE_ACCOUNT_KEY"
    "GOOGLE_ADS_CONVERSION_ID"
    "GOOGLE_ADS_CONVERSION_LABEL"
    "EDGE_CONFIG"
    "ADMIN_EMAIL"
)

missing_vars=()

for var in "${required_vars[@]}"; do
    if ! grep -q "^${var}=" .env.local; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -eq 0 ]; then
    echo "✅ All required environment variables found"
else
    echo "⚠️  Missing environment variables:"
    for var in "${missing_vars[@]}"; do
        echo "   - $var"
    done
    echo ""
    echo "📝 Add these to .env.local (see ENV_SETUP.md)"
    echo ""
fi

# Build check
echo ""
echo "🔨 Running build check..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed - check errors above"
    exit 1
fi

echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start dev server:"
echo "   npm run dev"
echo ""
echo "2. Test with debug mode:"
echo "   http://localhost:3000?debug_mode=true"
echo ""
echo "3. Open GA4 DebugView in Google Analytics"
echo ""
echo "4. Test all flows:"
echo "   - Booking drawer → Schedule → Checkout"
echo "   - Membership page → Calculator"
echo "   - Shop → Add to cart"
echo "   - Exit intent popup"
echo ""
echo "5. Verify events in GA4 DebugView"
echo ""
echo "6. Deploy to production:"
echo "   git add ."
echo "   git commit -m 'Add analytics system'"
echo "   git push"
echo ""
echo "📚 Documentation:"
echo "   - ANALYTICS_SYSTEM_README.md - Overview"
echo "   - ENV_SETUP.md - Configuration"
echo "   - PRODUCTION_READINESS_CHECKLIST.md - Deployment"
echo ""
echo "🚀 Ready to go live!"

