# Environment Variables Setup Guide

## Required Environment Variables for Analytics & Experimentation

Add these to your `.env.local` file:

\`\`\`bash
# ============================================
# GOOGLE ANALYTICS 4 (Basic Tracking)
# ============================================
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# ============================================
# GA4 DATA API (For Custom Dashboards)
# ============================================
GA4_PROPERTY_ID=123456789
GA4_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}'

# ============================================
# GOOGLE ADS CONVERSION TRACKING
# ============================================
GOOGLE_ADS_CONVERSION_ID=AW-XXXXXXXXXX
GOOGLE_ADS_CONVERSION_LABEL=XXXXXXXXXXX

# ============================================
# VERCEL EDGE CONFIG (A/B Testing)
# ============================================
EDGE_CONFIG=https://edge-config.vercel.com/ecfg_xxxxx?token=xxxxx

# ============================================
# ADMIN DASHBOARD ACCESS
# ============================================
ADMIN_EMAIL=your-email@example.com
\`\`\`

## Setup Instructions

### 1. Google Analytics 4 Setup
1. Go to https://analytics.google.com/
2. Create GA4 property if you don't have one
3. Copy Measurement ID (starts with `G-`) to `NEXT_PUBLIC_GA_ID`
4. Copy Property ID (numeric) to `GA4_PROPERTY_ID`

### 2. GA4 Service Account Setup (For Dashboard)
1. Go to https://console.cloud.google.com/
2. Enable "Google Analytics Data API"
3. Create Service Account with Viewer role
4. Download JSON key
5. Add service account email to GA4 property (Admin > Property Access Settings)
6. Copy entire JSON content to `GA4_SERVICE_ACCOUNT_KEY` (single line, escape quotes)

### 3. Google Ads Conversion Tracking Setup
1. Go to https://ads.google.com/aw/conversions
2. Create new conversion action (Purchase/Lead)
3. Copy Conversion ID (`AW-XXXXXXXXXX`)
4. Copy Conversion Label

### 4. Vercel Edge Config Setup (For A/B Testing)
1. Upgrade to Vercel Pro plan ($20/mo)
2. Go to https://vercel.com/dashboard/stores
3. Create new Edge Config
4. Copy connection string to `EDGE_CONFIG`
5. Add experiment configuration (see below)

### 5. Admin Email Setup
Set `ADMIN_EMAIL` to your email address. Only this email can access `/admin/dashboard`.

## Edge Config Experiment Structure

Add this JSON to your Edge Config store:

\`\`\`json
{
  "experiments": {
    "hero_cta_copy": {
      "id": "hero_cta_copy",
      "name": "Hero CTA Copy Test",
      "enabled": true,
      "variants": [
        {
          "id": "control",
          "name": "Control (Book Now)",
          "weight": 50
        },
        {
          "id": "variant_urgency",
          "name": "Urgency (Get Fresh Strings Today)",
          "weight": 25
        },
        {
          "id": "variant_benefit",
          "name": "Benefit (Rescue Your Power)",
          "weight": 25
        }
      ]
    }
  }
}
\`\`\`

## Required NPM Package

Install the GA4 Data API package:

\`\`\`bash
npm install @google-analytics/data
\`\`\`

Or with pnpm:

\`\`\`bash
pnpm add @google-analytics/data
\`\`\`

## Testing

After setup, test with:

\`\`\`bash
npm run dev
\`\`\`

Then visit:
- Homepage: http://localhost:3000 (test event tracking)
- Dashboard: http://localhost:3000/admin/dashboard (test dashboard)
- GA4 DebugView: Add `?debug_mode=true` to URL and check GA4 DebugView in Google Analytics

## Troubleshooting

### GA4 Events Not Showing
- Check `NEXT_PUBLIC_GA_ID` is correct
- Open browser console for analytics logs (development mode)
- Visit GA4 DebugView with `?debug_mode=true`

### Dashboard Not Loading
- Verify `GA4_SERVICE_ACCOUNT_KEY` is valid JSON
- Check service account has Viewer access to GA4 property
- Ensure `GA4_PROPERTY_ID` matches your property

### A/B Test Not Working
- Verify Vercel Pro plan is active
- Check `EDGE_CONFIG` connection string is correct
- Confirm experiment JSON is added to Edge Config store

### Google Ads Conversions Not Tracking
- Verify `GOOGLE_ADS_CONVERSION_ID` and `GOOGLE_ADS_CONVERSION_LABEL` are correct
- Check Stripe webhook is receiving events
- Look for `[Google Ads]` logs in Vercel logs
