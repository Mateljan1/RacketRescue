import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

/**
 * Legacy Payment Intent API
 * For direct payment flows (not Stripe Checkout)
 *
 * Prefer using /api/checkout for most use cases
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, currency = 'usd', orderData, description } = body

    // Validate amount
    if (!amount || amount < 50) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum is $0.50' },
        { status: 400 }
      )
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // Already in cents
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      description: description || 'Racket Rescue Stringing Service',
      metadata: {
        service_package: orderData?.service_package || '',
        racket_brand: orderData?.racket_brand || '',
        racket_model: orderData?.racket_model || '',
        customer_email: orderData?.email || '',
        string_name: orderData?.string_name || '',
        tension: orderData?.main_tension ? `${orderData.main_tension}/${orderData.cross_tension}` : '',
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })

  } catch (error) {
    console.error('Payment intent creation error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}

// Confirm payment status
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const paymentIntentId = searchParams.get('payment_intent')

    if (!paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent ID is required' },
        { status: 400 }
      )
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    return NextResponse.json({
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      metadata: paymentIntent.metadata,
    })

  } catch (error) {
    console.error('Payment intent retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve payment status' },
      { status: 500 }
    )
  }
}
