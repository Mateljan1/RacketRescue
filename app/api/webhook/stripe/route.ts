import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

// Disable body parsing - Stripe webhooks need raw body
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error(`Webhook signature verification failed: ${message}`)
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    )
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleCheckoutComplete(session)
        break
      }

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        console.log(`Payment succeeded: ${paymentIntent.id}`)
        break
      }

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCreated(subscription)
        break
      }

      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionUpdated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCanceled(subscription)
        break
      }

      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`Invoice paid: ${invoice.id}`)
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        console.log(`Invoice payment failed: ${invoice.id}`)
        // TODO: Send email notification about failed payment
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('Webhook handler error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {}

  console.log('='.repeat(50))
  console.log('NEW ORDER RECEIVED!')
  console.log('='.repeat(50))
  console.log('Order Type:', metadata.type)
  console.log('Customer Email:', session.customer_details?.email)
  console.log('Customer Name:', session.customer_details?.name)
  console.log('Amount:', `$${(session.amount_total || 0) / 100}`)
  console.log('Payment Status:', session.payment_status)

  if (metadata.type === 'stringing') {
    console.log('\nOrder Details:')
    console.log('- Racket:', `${metadata.racket_brand} ${metadata.racket_model}`)
    console.log('- Service:', metadata.service_package)
    console.log('- String:', metadata.string_name)
    console.log('- Tension:', `${metadata.main_tension}/${metadata.cross_tension} lbs`)
    console.log('- Express:', metadata.is_express === 'true' ? 'Yes' : 'No')
    console.log('- Pickup Address:', metadata.pickup_address)
    console.log('- Pickup Time:', metadata.pickup_time)
    if (metadata.special_instructions) {
      console.log('- Notes:', metadata.special_instructions)
    }

    // TODO: Create order in database
    // TODO: Send confirmation email
    // TODO: Create task in calendar/scheduling system
    // TODO: Send SMS notification

  } else if (metadata.type === 'membership') {
    console.log('\nMembership Details:')
    console.log('- Tier:', metadata.tier)

    // TODO: Update customer membership status in database
    // TODO: Send welcome email
  }

  console.log('='.repeat(50))
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const metadata = subscription.metadata || {}

  console.log('NEW SUBSCRIPTION CREATED!')
  console.log('- Subscription ID:', subscription.id)
  console.log('- Customer:', subscription.customer)
  console.log('- Status:', subscription.status)
  console.log('- Tier:', metadata.tier)

  // TODO: Create/update customer record in database
  // TODO: Send welcome email
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('SUBSCRIPTION UPDATED!')
  console.log('- Subscription ID:', subscription.id)
  console.log('- Status:', subscription.status)

  // TODO: Update customer membership status in database
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  console.log('SUBSCRIPTION CANCELED!')
  console.log('- Subscription ID:', subscription.id)
  console.log('- Customer:', subscription.customer)

  // TODO: Update customer membership status in database
  // TODO: Send cancellation confirmation email
}
