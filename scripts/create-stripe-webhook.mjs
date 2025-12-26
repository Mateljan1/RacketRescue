/**
 * Create Stripe Webhook
 * Run with: node scripts/create-stripe-webhook.mjs
 */

import Stripe from 'stripe'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '../.env.local') })

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-12-15.clover',
})

async function createWebhook() {
  console.log('Creating Stripe webhook...\n')

  try {
    // Check for existing webhooks
    const existingWebhooks = await stripe.webhookEndpoints.list({ limit: 10 })

    const existingRacketRescue = existingWebhooks.data.find(
      w => w.url === 'https://www.racketrescue.com/api/webhook/stripe'
    )

    if (existingRacketRescue) {
      console.log('Webhook already exists!')
      console.log('ID:', existingRacketRescue.id)
      console.log('URL:', existingRacketRescue.url)
      console.log('Events:', existingRacketRescue.enabled_events.join(', '))
      console.log('\nTo get the webhook secret, go to:')
      console.log('https://dashboard.stripe.com/webhooks/' + existingRacketRescue.id)
      return existingRacketRescue
    }

    // Create new webhook
    const webhook = await stripe.webhookEndpoints.create({
      url: 'https://www.racketrescue.com/api/webhook/stripe',
      enabled_events: [
        'checkout.session.completed',
        'customer.subscription.created',
        'customer.subscription.updated',
        'customer.subscription.deleted',
        'invoice.paid',
        'invoice.payment_failed',
        'payment_intent.succeeded',
        'payment_intent.payment_failed',
      ],
      description: 'RacketRescue Order & Subscription Notifications',
    })

    console.log('✅ Webhook created successfully!\n')
    console.log('Webhook ID:', webhook.id)
    console.log('URL:', webhook.url)
    console.log('Secret:', webhook.secret)
    console.log('\n⚠️  IMPORTANT: Save this secret! It will only be shown once.')
    console.log('\nAdd to .env.local:')
    console.log(`STRIPE_WEBHOOK_SECRET=${webhook.secret}`)
    console.log('\nAdd to Vercel:')
    console.log(`echo "${webhook.secret}" | vercel env add STRIPE_WEBHOOK_SECRET production`)

    return webhook

  } catch (error) {
    console.error('Error creating webhook:', error.message)
    process.exit(1)
  }
}

createWebhook()
