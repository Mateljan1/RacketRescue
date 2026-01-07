# Analytics Quick Reference Guide

## Adding New Events

### 1. Import the analytics utility

\`\`\`typescript
import { analytics } from '@/lib/analytics'
\`\`\`

### 2. Call the appropriate method

\`\`\`typescript
// Example: Track button click
<button onClick={() => analytics.bookingDrawerOpen('header', 'standard')}>
  Book Now
</button>
\`\`\`

### 3. Available Methods

\`\`\`typescript
// Booking & Conversion
analytics.bookingDrawerOpen(source, packageId?)
analytics.packageSelected(packageId, price, racketCount)
analytics.scheduleStepComplete(step, data)
analytics.checkoutInitiated(value, items)
analytics.purchase(transactionId, value, items)

// Membership
analytics.membershipViewed(source)
analytics.membershipCalculatorUsed(ordersPerMonth, selectedPlan, savings)

// Shop
analytics.shopAddToCart(item)

// Exit Intent
analytics.exitIntentShown()
analytics.exitIntentEmailCaptured(email)

// A/B Testing
analytics.experimentViewed(experimentId, variantId)
\`\`\`

---

## Adding New A/B Tests

### 1. Add experiment to Edge Config (Vercel Dashboard)

\`\`\`json
{
  "experiments": {
    "your_experiment_id": {
      "id": "your_experiment_id",
      "name": "Your Experiment Name",
      "enabled": true,
      "variants": [
        {"id": "control", "name": "Control", "weight": 50},
        {"id": "variant_a", "name": "Variant A", "weight": 50}
      ]
    }
  }
}
\`\`\`

### 2. Update middleware.ts

\`\`\`typescript
// Add new experiment check
const yourExperiment = await getExperiment('your_experiment_id')

if (yourExperiment && yourExperiment.enabled) {
  const existingVariant = request.cookies.get(`exp_${yourExperiment.id}`)
  
  if (!existingVariant) {
    const variantId = assignVariant(yourExperiment)
    response.cookies.set(`exp_${yourExperiment.id}`, variantId, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
      sameSite: 'lax',
    })
    response.headers.set('x-experiment-your-test', variantId)
  } else {
    response.headers.set('x-experiment-your-test', existingVariant.value)
  }
}
\`\`\`

### 3. Use variant in component

\`\`\`typescript
import { getVariant, trackExperimentView } from '@/lib/ab-testing'

export default function YourComponent() {
  const [variant, setVariant] = useState('control')
  
  useEffect(() => {
    const v = getVariant('your_experiment_id') || 'control'
    setVariant(v)
    trackExperimentView('your_experiment_id', v)
  }, [])
  
  return (
    <div>
      {variant === 'control' ? (
        <button>Control Text</button>
      ) : (
        <button>Variant Text</button>
      )}
    </div>
  )
}
\`\`\`

---

## Viewing Analytics Data

### GA4 Real-Time Report

1. Go to Google Analytics
2. Navigate to Reports → Realtime
3. See events as they happen
4. Filter by event name

### GA4 DebugView (Testing)

1. Add `?debug_mode=true` to URL
2. Go to Google Analytics → Admin → DebugView
3. See detailed event parameters
4. Verify events are firing correctly

### Custom Dashboard

1. Visit `/admin/dashboard` (admin only)
2. Select date range
3. View metrics and funnel
4. Auto-refreshes every 5 minutes

### GA4 Explorations (Advanced)

1. Go to Google Analytics → Explore
2. Create funnel exploration
3. Add events in order:
   - booking_drawer_open
   - package_selected
   - schedule_step_1_complete
   - schedule_step_2_complete
   - schedule_step_3_complete
   - checkout_initiated
   - purchase

---

## Common Tracking Patterns

### Track Form Submission

\`\`\`typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Track before submission
  analytics.scheduleStepComplete(1, {
    package_id: selectedPackage,
    // ... other data
  })
  
  // Submit form
  await submitForm()
}
\`\`\`

### Track Link Click

\`\`\`typescript
<Link
  href="/membership"
  onClick={() => analytics.membershipViewed('nav')}
>
  Membership
</Link>
\`\`\`

### Track Button Click with Data

\`\`\`typescript
<button
  onClick={() => {
    analytics.packageSelected(pkg.id, pkg.price, racketCount)
    setSelectedPackage(pkg.id)
  }}
>
  Select Package
</button>
\`\`\`

### Track Page View (useEffect)

\`\`\`typescript
useEffect(() => {
  analytics.membershipViewed('direct_navigation')
}, [])
\`\`\`

### Track with Debounce (Sliders, Inputs)

\`\`\`typescript
const handleSliderChange = (value: number) => {
  setValue(value)
  
  clearTimeout(timeout.current)
  timeout.current = setTimeout(() => {
    analytics.membershipCalculatorUsed(value, plan, savings)
  }, 1000)
}
\`\`\`

---

## Debugging

### Check if Analytics is Working

\`\`\`typescript
// In browser console
window.gtag
// Should return: function gtag() { ... }

window.dataLayer
// Should return: Array with events
\`\`\`

### View All Events Fired

\`\`\`typescript
// In browser console
window.dataLayer
// Returns array of all events sent to GA4
\`\`\`

### Test Event Manually

\`\`\`typescript
// In browser console
import { analytics } from '@/lib/analytics'
analytics.bookingDrawerOpen('test', 'standard')
// Check GA4 DebugView for event
\`\`\`

### Check Environment Variables

\`\`\`typescript
// In browser console
process.env.NEXT_PUBLIC_GA_ID
// Should return: "G-XXXXXXXXXX"
\`\`\`

---

## Best Practices

### 1. Always Track User Intent

Track when user **intends** to do something, not just when it succeeds:

\`\`\`typescript
// ✅ Good: Track before API call
analytics.checkoutInitiated(total, items)
const response = await fetch('/api/checkout', ...)

// ❌ Bad: Track after API call (might not fire if error)
const response = await fetch('/api/checkout', ...)
analytics.checkoutInitiated(total, items)
\`\`\`

### 2. Include Relevant Context

\`\`\`typescript
// ✅ Good: Include package and price
analytics.packageSelected('standard', 55, 1)

// ❌ Bad: No context
analytics.packageSelected('standard')
\`\`\`

### 3. Use Consistent Naming

\`\`\`typescript
// ✅ Good: Consistent IDs
package_id: 'standard'
package_id: 'rush'

// ❌ Bad: Inconsistent
package_id: 'standard'
package_id: 'same-day-rush'
\`\`\`

### 4. Debounce High-Frequency Events

\`\`\`typescript
// ✅ Good: Debounce slider events
const handleSliderChange = (value) => {
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    analytics.membershipCalculatorUsed(value, plan, savings)
  }, 1000)
}

// ❌ Bad: Fire on every change (spam)
const handleSliderChange = (value) => {
  analytics.membershipCalculatorUsed(value, plan, savings)
}
\`\`\`

### 5. Don't Block User Experience

\`\`\`typescript
// ✅ Good: Fire and forget
analytics.purchase(id, value, items)
redirect('/confirmation')

// ❌ Bad: Wait for analytics
await analytics.purchase(id, value, items)
redirect('/confirmation')
\`\`\`

---

## GA4 Custom Reports

### Create Funnel Report

1. Go to GA4 → Explore → Funnel exploration
2. Add steps:
   - Step 1: booking_drawer_open
   - Step 2: package_selected
   - Step 3: schedule_step_1_complete
   - Step 4: schedule_step_2_complete
   - Step 5: schedule_step_3_complete
   - Step 6: checkout_initiated
   - Step 7: purchase
3. Save as "Booking Funnel"

### Create Conversion Report

1. Go to GA4 → Explore → Free form
2. Add dimensions: event_name, package_id
3. Add metrics: event_count, total_revenue
4. Filter: event_name = purchase
5. Save as "Conversion by Package"

### Create A/B Test Report

1. Go to GA4 → Explore → Free form
2. Add dimensions: experiment_id, variant_id
3. Add metrics: event_count (for experiment_viewed), conversions
4. Calculate conversion rate by variant
5. Save as "A/B Test Results"

---

## Quick Commands

\`\`\`bash
# Install dependencies
pnpm add @google-analytics/data @vercel/edge-config

# Start dev server with debug mode
npm run dev
# Then visit: http://localhost:3000?debug_mode=true

# Test analytics (browser console)
# Open console and run:
# analytics.bookingDrawerOpen('test', 'standard')

# Build for production
npm run build

# Deploy to Vercel
git push
\`\`\`

---

## Cheat Sheet

| Event | When to Use | Example |
|-------|-------------|---------|
| `bookingDrawerOpen` | Drawer opens | `analytics.bookingDrawerOpen('hero_cta', 'standard')` |
| `packageSelected` | Package clicked | `analytics.packageSelected('standard', 55, 1)` |
| `scheduleStepComplete` | Step finished | `analytics.scheduleStepComplete(1, {package_id: 'standard'})` |
| `checkoutInitiated` | Checkout button | `analytics.checkoutInitiated(55, items)` |
| `purchase` | Order confirmed | `analytics.purchase('txn_123', 55, items)` |
| `membershipViewed` | Page load | `analytics.membershipViewed('nav')` |
| `membershipCalculatorUsed` | Slider moved | `analytics.membershipCalculatorUsed(3, 'rescue-club', 25)` |
| `exitIntentShown` | Popup appears | `analytics.exitIntentShown()` |
| `exitIntentEmailCaptured` | Email submitted | `analytics.exitIntentEmailCaptured(email)` |
| `shopAddToCart` | Product added | `analytics.shopAddToCart(item)` |
| `experimentViewed` | Variant assigned | `analytics.experimentViewed('hero_cta', 'control')` |

---

**For full documentation, see:**
- `ANALYTICS_IMPLEMENTATION_SUMMARY.md` - Complete overview
- `ENV_SETUP.md` - Environment configuration
- `PRODUCTION_READINESS_CHECKLIST.md` - Deployment checklist
- `scripts/test-analytics.ts` - Testing guide
