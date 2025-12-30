import Stripe from 'stripe'

// Server-side Stripe instance - lazy initialization
// This prevents build-time errors when STRIPE_SECRET_KEY is not available
let stripeInstance: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not configured')
    }
    stripeInstance = new Stripe(stripeSecretKey, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  }
  return stripeInstance
}

// For backwards compatibility - will throw if used at build time
export const stripe = {
  get checkout() {
    return getStripe().checkout
  },
  get customers() {
    return getStripe().customers
  },
  get paymentIntents() {
    return getStripe().paymentIntents
  },
  get prices() {
    return getStripe().prices
  },
  get products() {
    return getStripe().products
  },
} as unknown as Stripe

// Product IDs - These will be created by the setup script
export const STRIPE_PRODUCTS = {
  // Service Packages
  MATCH_READY_SERVICE: 'prod_match_ready',
  PRO_PERFORMANCE_SERVICE: 'prod_pro_performance',

  // Add-ons
  EXPRESS_SERVICE: 'prod_express',
  REGRIP_SERVICE: 'prod_regrip',
  OVERGRIP: 'prod_overgrip',
  DAMPENER: 'prod_dampener',
  DAMPENER_BUNDLE: 'prod_dampener_bundle',
  PICKUP_FEE: 'prod_pickup_fee',

  // Memberships
  STANDARD_MEMBERSHIP: 'prod_standard_membership',
  ELITE_MEMBERSHIP: 'prod_elite_membership',
  FAMILY_MEMBERSHIP: 'prod_family_membership',
}

// Price configuration (in cents)
export const PRICES = {
  // Service Labor
  MATCH_READY: 3500,      // $35
  PRO_PERFORMANCE: 5000,  // $50

  // Add-ons
  EXPRESS: 1500,          // $15
  REGRIP: 1000,           // $10
  OVERGRIP: 300,          // $3
  DAMPENER: 500,          // $5
  DAMPENER_BUNDLE: 700,   // $7 (overgrip + dampener bundle)
  PICKUP_FEE: 1500,       // $15 (waived for members)

  // Memberships (monthly)
  STANDARD_MEMBERSHIP: 2500,  // $25/month
  ELITE_MEMBERSHIP: 6000,     // $60/month
  FAMILY_MEMBERSHIP: 8000,    // $80/month
}

// String prices from catalog (in cents)
export const STRING_PRICES: Record<string, number> = {
  'wilson-velocity-mlt': 800,
  'babolat-rpm-blast': 2195,
  'luxilon-alu-power': 2495,
  'wilson-nxt': 1995,
  'solinco-confidential': 2395,
  'tecnifibre-xone': 2295,
  'yonex-polytour-strike': 1995,
  'head-velocity-mlt': 1895,
  'prince-synthetic-gut': 695,
  'gamma-tnt2': 1295,
  'volkl-cyclone': 1495,
  'kirschbaum-pro-line': 1895,
}
