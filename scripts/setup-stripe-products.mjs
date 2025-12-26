/**
 * Stripe Products Setup Script
 * Run with: node scripts/setup-stripe-products.mjs
 *
 * This creates all necessary products and prices in your Stripe account
 */

import Stripe from 'stripe'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
})

const products = {
  // ================== SERVICE PACKAGES ==================
  'match-ready-service': {
    name: 'Match-Ready Stringing Service',
    description: 'Professional racquet stringing for casual players. Includes labor only.',
    price: 3500,
    type: 'one_time',
    metadata: { category: 'service', tier: 'standard' }
  },
  'pro-performance-service': {
    name: 'Pro-Performance Stringing Service',
    description: 'Tournament-grade stringing with precision tension. For competitive players.',
    price: 5000,
    type: 'one_time',
    metadata: { category: 'service', tier: 'premium' }
  },

  // ================== STRINGS ==================
  'string-wilson-velocity-mlt': {
    name: 'Wilson Velocity MLT String',
    description: 'Comfortable multifilament string. Great for beginners.',
    price: 800,
    type: 'one_time',
    metadata: { category: 'string', brand: 'wilson' }
  },
  'string-babolat-rpm-blast': {
    name: 'Babolat RPM Blast String',
    description: 'Premium polyester string for maximum spin. Used by Rafael Nadal.',
    price: 2195,
    type: 'one_time',
    metadata: { category: 'string', brand: 'babolat' }
  },
  'string-luxilon-alu-power': {
    name: 'Luxilon ALU Power String',
    description: 'Tour-level co-polyester string. Excellent control and durability.',
    price: 2495,
    type: 'one_time',
    metadata: { category: 'string', brand: 'luxilon' }
  },
  'string-wilson-nxt': {
    name: 'Wilson NXT String',
    description: 'Premium multifilament. Exceptional feel and arm-friendliness.',
    price: 1995,
    type: 'one_time',
    metadata: { category: 'string', brand: 'wilson' }
  },
  'string-solinco-confidential': {
    name: 'Solinco Confidential String',
    description: 'Tour-level polyester with soft feel.',
    price: 2395,
    type: 'one_time',
    metadata: { category: 'string', brand: 'solinco' }
  },
  'string-tecnifibre-xone': {
    name: 'Tecnifibre X-One Biphase String',
    description: 'Premium multifilament with excellent power and comfort.',
    price: 2295,
    type: 'one_time',
    metadata: { category: 'string', brand: 'tecnifibre' }
  },
  'string-prince-synthetic-gut': {
    name: 'Prince Synthetic Gut String',
    description: 'Affordable all-around string. Good for beginners.',
    price: 695,
    type: 'one_time',
    metadata: { category: 'string', brand: 'prince' }
  },
  'string-volkl-cyclone': {
    name: 'Volkl Cyclone String',
    description: 'Spin-friendly polyester at a great price point.',
    price: 1495,
    type: 'one_time',
    metadata: { category: 'string', brand: 'volkl' }
  },

  // ================== ADD-ONS ==================
  'addon-express': {
    name: 'Express Service (Next-Day)',
    description: 'Priority stringing with next-day turnaround.',
    price: 1500,
    type: 'one_time',
    metadata: { category: 'addon', type: 'express' }
  },
  'addon-regrip': {
    name: 'Re-Grip Service',
    description: 'Professional replacement grip installation.',
    price: 1000,
    type: 'one_time',
    metadata: { category: 'addon', type: 'grip' }
  },
  'addon-overgrip': {
    name: 'Overgrip',
    description: 'Premium overgrip application.',
    price: 300,
    type: 'one_time',
    metadata: { category: 'addon', type: 'grip' }
  },
  'addon-dampener': {
    name: 'Vibration Dampener',
    description: 'Quality vibration dampener installation.',
    price: 500,
    type: 'one_time',
    metadata: { category: 'addon', type: 'accessory' }
  },
  'addon-dampener-bundle': {
    name: 'Overgrip + Dampener Bundle',
    description: 'Overgrip and dampener combo at a discount.',
    price: 700,
    type: 'one_time',
    metadata: { category: 'addon', type: 'bundle' }
  },
  'pickup-delivery-fee': {
    name: 'Pickup & Delivery Fee',
    description: 'Door-to-door pickup and delivery service. Free for members!',
    price: 1500,
    type: 'one_time',
    metadata: { category: 'fee', type: 'delivery' }
  },

  // ================== MEMBERSHIPS ==================
  'membership-standard': {
    name: 'Standard Membership',
    description: 'Free pickup & delivery + 10% off labor. Perfect for regular players.',
    price: 2500,
    type: 'recurring',
    interval: 'month',
    metadata: { category: 'membership', tier: 'standard' }
  },
  'membership-elite': {
    name: 'Elite Membership',
    description: 'Everything in Standard + Free Express + 15% off labor.',
    price: 6000,
    type: 'recurring',
    interval: 'month',
    metadata: { category: 'membership', tier: 'elite' }
  },
  'membership-family': {
    name: 'Family Membership',
    description: 'Elite benefits for up to 4 family members.',
    price: 8000,
    type: 'recurring',
    interval: 'month',
    metadata: { category: 'membership', tier: 'family' }
  },

  // ================== BUNDLE PACKAGES ==================
  'package-starter': {
    name: 'Starter Package (Complete)',
    description: 'Match-Ready service + Wilson Velocity MLT + Pickup & Delivery. $52 all-in.',
    price: 5200,
    type: 'one_time',
    metadata: { category: 'package', tier: 'starter' }
  },
  'package-pro': {
    name: 'Pro Package (Complete)',
    description: 'Pro-Performance + Premium string + Priority Pickup. Tournament-ready.',
    price: 7500,
    type: 'one_time',
    metadata: { category: 'package', tier: 'pro' }
  },
}

async function createProductsAndPrices() {
  console.log('🚀 Starting Stripe Products Setup...\n')

  const results = []
  const priceIds = {}

  for (const [key, config] of Object.entries(products)) {
    try {
      // Check if product already exists by searching metadata
      const existingProducts = await stripe.products.search({
        query: `metadata['key']:'${key}'`,
      })

      let product

      if (existingProducts.data.length > 0) {
        product = existingProducts.data[0]
        console.log(`✓ Product exists: ${config.name} (${product.id})`)

        // Update product
        await stripe.products.update(product.id, {
          name: config.name,
          description: config.description,
          metadata: { ...config.metadata, key },
        })
      } else {
        // Create new product
        product = await stripe.products.create({
          name: config.name,
          description: config.description,
          metadata: { ...config.metadata, key },
        })
        console.log(`✨ Created product: ${config.name} (${product.id})`)
      }

      // Check for existing price
      const existingPrices = await stripe.prices.list({
        product: product.id,
        active: true,
      })

      let price
      const matchingPrice = existingPrices.data.find(p =>
        p.unit_amount === config.price &&
        (config.type === 'recurring' ? p.recurring?.interval === config.interval : !p.recurring)
      )

      if (matchingPrice) {
        price = matchingPrice
        console.log(`  ✓ Price exists: $${(config.price / 100).toFixed(2)} (${price.id})`)
      } else {
        // Create new price
        const priceData = {
          product: product.id,
          unit_amount: config.price,
          currency: 'usd',
        }

        if (config.type === 'recurring' && config.interval) {
          priceData.recurring = { interval: config.interval }
        }

        price = await stripe.prices.create(priceData)
        console.log(`  ✨ Created price: $${(config.price / 100).toFixed(2)} (${price.id})`)
      }

      const keyName = key.toUpperCase().replace(/-/g, '_')
      priceIds[keyName] = price.id

      results.push({
        key,
        productId: product.id,
        name: config.name,
        priceId: price.id,
        amount: config.price,
      })

    } catch (error) {
      console.error(`❌ Error creating ${config.name}:`, error.message)
    }
  }

  // Output summary
  console.log('\n' + '='.repeat(60))
  console.log('📋 STRIPE PRODUCTS SETUP COMPLETE')
  console.log('='.repeat(60) + '\n')

  console.log('// Add this to lib/stripe-prices.ts:\n')
  console.log('export const STRIPE_PRICE_IDS = {')
  for (const [key, priceId] of Object.entries(priceIds)) {
    console.log(`  ${key}: '${priceId}',`)
  }
  console.log('} as const\n')

  // Also output as JSON for easy copying
  console.log('// JSON format:')
  console.log(JSON.stringify(priceIds, null, 2))

  return { results, priceIds }
}

// Run the setup
createProductsAndPrices()
  .then(({ priceIds }) => {
    console.log('\n✅ Setup complete! Products created in Stripe.')
    console.log('\n🔗 View in Stripe Dashboard: https://dashboard.stripe.com/products')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n❌ Setup failed:', error)
    process.exit(1)
  })
