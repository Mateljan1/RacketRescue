import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { STRIPE_PRICE_IDS, STRING_PRICE_MAP } from '@/lib/stripe-prices'
import Stripe from 'stripe'

interface OrderData {
  service_package: 'match_ready' | 'pro_performance'
  racket_brand: string
  racket_model: string
  string_type: string
  string_name: string
  string_price: number
  customer_provides_string: boolean
  main_tension: number
  cross_tension: number
  is_express: boolean
  add_regrip: boolean
  add_overgrip: boolean
  add_dampener: boolean
  dampener_bundle: boolean
  add_second_racket: boolean
  pickup_address: string
  delivery_address: string
  pickup_time: string
  special_instructions: string
  customer_email?: string
  customer_name?: string
  customer_phone?: string
  is_member?: boolean
  membership_tier?: 'standard' | 'elite' | 'family'
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderData, mode = 'stringing' }: { orderData: OrderData; mode: string } = body

    // Validate required fields
    if (!orderData) {
      return NextResponse.json(
        { error: 'Order data is required' },
        { status: 400 }
      )
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.racketrescue.com'

    // Build line items based on order
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = []

    if (mode === 'membership') {
      // Membership subscription checkout
      const membershipPriceId =
        orderData.membership_tier === 'elite' ? STRIPE_PRICE_IDS.MEMBERSHIP_ELITE :
        orderData.membership_tier === 'family' ? STRIPE_PRICE_IDS.MEMBERSHIP_FAMILY :
        STRIPE_PRICE_IDS.MEMBERSHIP_STANDARD

      lineItems.push({
        price: membershipPriceId,
        quantity: 1,
      })

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: lineItems,
        success_url: `${siteUrl}/dashboard?session_id={CHECKOUT_SESSION_ID}&membership=success`,
        cancel_url: `${siteUrl}/membership?canceled=true`,
        customer_email: orderData.customer_email,
        subscription_data: {
          metadata: {
            tier: orderData.membership_tier || 'standard',
            customer_name: orderData.customer_name || '',
            customer_phone: orderData.customer_phone || '',
          },
        },
        metadata: {
          type: 'membership',
          tier: orderData.membership_tier || 'standard',
        },
      })

      return NextResponse.json({
        sessionId: session.id,
        url: session.url,
      })
    }

    // Regular stringing service checkout
    // 1. Service package
    const servicePriceId = orderData.service_package === 'pro_performance'
      ? STRIPE_PRICE_IDS.PRO_PERFORMANCE_SERVICE
      : STRIPE_PRICE_IDS.MATCH_READY_SERVICE

    lineItems.push({
      price: servicePriceId,
      quantity: orderData.add_second_racket ? 2 : 1,
    })

    // 2. String (if not customer-provided)
    if (!orderData.customer_provides_string && orderData.string_name) {
      const stringKey = orderData.string_name.toLowerCase().replace(/\s+/g, '-')
      const stringPriceId = STRING_PRICE_MAP[stringKey]

      if (stringPriceId) {
        lineItems.push({
          price: stringPriceId,
          quantity: orderData.add_second_racket ? 2 : 1,
        })
      } else {
        // Custom string price - create ad-hoc price
        lineItems.push({
          price_data: {
            currency: 'usd',
            unit_amount: Math.round(orderData.string_price * 100),
            product_data: {
              name: `String: ${orderData.string_name}`,
              description: 'Custom string selection',
            },
          },
          quantity: orderData.add_second_racket ? 2 : 1,
        })
      }
    }

    // 3. Add-ons
    if (orderData.is_express) {
      lineItems.push({
        price: STRIPE_PRICE_IDS.ADDON_EXPRESS,
        quantity: 1,
      })
    }

    if (orderData.add_regrip) {
      lineItems.push({
        price: STRIPE_PRICE_IDS.ADDON_REGRIP,
        quantity: orderData.add_second_racket ? 2 : 1,
      })
    }

    if (orderData.dampener_bundle) {
      lineItems.push({
        price: STRIPE_PRICE_IDS.ADDON_DAMPENER_BUNDLE,
        quantity: orderData.add_second_racket ? 2 : 1,
      })
    } else {
      if (orderData.add_overgrip) {
        lineItems.push({
          price: STRIPE_PRICE_IDS.ADDON_OVERGRIP,
          quantity: orderData.add_second_racket ? 2 : 1,
        })
      }
      if (orderData.add_dampener) {
        lineItems.push({
          price: STRIPE_PRICE_IDS.ADDON_DAMPENER,
          quantity: orderData.add_second_racket ? 2 : 1,
        })
      }
    }

    // 4. Pickup fee (waived for members)
    if (!orderData.is_member) {
      lineItems.push({
        price: STRIPE_PRICE_IDS.PICKUP_DELIVERY_FEE,
        quantity: 1,
      })
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${siteUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/schedule?canceled=true`,
      customer_email: orderData.customer_email,
      metadata: {
        type: 'stringing',
        service_package: orderData.service_package,
        racket_brand: orderData.racket_brand,
        racket_model: orderData.racket_model,
        string_name: orderData.string_name || 'customer_provided',
        main_tension: String(orderData.main_tension),
        cross_tension: String(orderData.cross_tension),
        is_express: String(orderData.is_express),
        pickup_address: orderData.pickup_address,
        delivery_address: orderData.delivery_address || orderData.pickup_address,
        pickup_time: orderData.pickup_time,
        special_instructions: orderData.special_instructions || '',
        is_member: String(orderData.is_member || false),
        second_racket: String(orderData.add_second_racket),
      },
      shipping_address_collection: {
        allowed_countries: ['US'],
      },
      phone_number_collection: {
        enabled: true,
      },
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    })

  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

// Get session details (for success page)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      )
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'customer', 'payment_intent'],
    })

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
      customer_name: session.customer_details?.name,
      amount_total: session.amount_total,
      metadata: session.metadata,
      payment_status: session.payment_status,
    })

  } catch (error) {
    console.error('Session retrieval error:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve session' },
      { status: 500 }
    )
  }
}
