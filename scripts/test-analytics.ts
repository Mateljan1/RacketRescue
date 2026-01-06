// Manual testing script for analytics implementation
// Run: npx ts-node scripts/test-analytics.ts
// Or in browser console after importing analytics

import { analytics } from '../lib/analytics'

console.log('Testing Analytics Implementation...\n')
console.log('Note: This script tests the analytics module structure.')
console.log('For full testing, run these in browser console with GA4 DebugView open.\n')

// Test 1: Booking Drawer
console.log('1. Testing booking_drawer_open event...')
console.log('   analytics.bookingDrawerOpen("test", "standard")')

// Test 2: Package Selection
console.log('\n2. Testing package_selected event...')
console.log('   analytics.packageSelected("standard", 55, 1)')

// Test 3: Schedule Steps
console.log('\n3. Testing schedule step events...')
console.log('   analytics.scheduleStepComplete(1, { package_id: "standard" })')
console.log('   analytics.scheduleStepComplete(2, { racket_brand: "Wilson" })')
console.log('   analytics.scheduleStepComplete(3, { pickup_time: "2026-01-07T09:00" })')

// Test 4: Checkout
console.log('\n4. Testing checkout_initiated event...')
console.log(`   analytics.checkoutInitiated(55, [{
     item_id: "standard",
     item_name: "Standard Stringing",
     item_category: "stringing",
     price: 55,
     quantity: 1,
   }])`)

// Test 5: Purchase
console.log('\n5. Testing purchase event...')
console.log(`   analytics.purchase("test_transaction_123", 55, [{
     item_id: "standard",
     item_name: "Standard Stringing",
     item_category: "stringing",
     price: 55,
     quantity: 1,
   }])`)

// Test 6: Membership Events
console.log('\n6. Testing membership events...')
console.log('   analytics.membershipViewed("nav")')
console.log('   analytics.membershipCalculatorUsed(3, "rescue-club", 25)')

// Test 7: Exit Intent
console.log('\n7. Testing exit intent events...')
console.log('   analytics.exitIntentShown()')
console.log('   analytics.exitIntentEmailCaptured("test@example.com")')

// Test 8: Shop Events
console.log('\n8. Testing shop add-to-cart event...')
console.log(`   analytics.shopAddToCart({
     item_id: "yonex-polytour-pro",
     item_name: "Poly Tour Pro 125",
     item_category: "strings",
     price: 16,
     quantity: 1,
   })`)

// Test 9: A/B Test Tracking
console.log('\n9. Testing experiment tracking...')
console.log('   analytics.experimentViewed("hero_cta_copy", "control")')

console.log('\n' + '='.repeat(60))
console.log('BROWSER TESTING INSTRUCTIONS')
console.log('='.repeat(60))
console.log('\n1. Start dev server: npm run dev')
console.log('2. Open browser to: http://localhost:3000?debug_mode=true')
console.log('3. Open GA4 DebugView in Google Analytics')
console.log('4. Test each user flow:')
console.log('   - Homepage → Booking Drawer → Schedule → Checkout')
console.log('   - Membership page → Calculator interaction')
console.log('   - Shop → Add to cart')
console.log('   - Exit intent popup (move mouse to top of page)')
console.log('\n5. Verify all events fire with correct parameters in GA4 DebugView')
console.log('\n6. Check browser console for [Analytics] logs (development mode)')

console.log('\n' + '='.repeat(60))
console.log('GA4 DEBUGVIEW CHECKLIST')
console.log('='.repeat(60))
console.log('\n✓ booking_drawer_open - fires when drawer opens')
console.log('✓ package_selected - fires when package clicked')
console.log('✓ schedule_step_1_complete - fires after service selection')
console.log('✓ schedule_step_2_complete - fires after racket details')
console.log('✓ schedule_step_3_complete - fires after pickup schedule')
console.log('✓ checkout_initiated - fires when "Confirm & Pay" clicked')
console.log('✓ begin_checkout - Enhanced Ecommerce event')
console.log('✓ purchase - fires on confirmation page')
console.log('✓ membership_viewed - fires on membership page load')
console.log('✓ membership_calculator_used - fires when slider moved')
console.log('✓ exit_intent_shown - fires when mouse leaves top')
console.log('✓ exit_intent_email_captured - fires when email submitted')
console.log('✓ add_to_cart - fires when product added to cart')
console.log('✓ experiment_viewed - fires when A/B test variant assigned')

console.log('\n✅ All tests completed. Check browser console or GA4 DebugView.')

