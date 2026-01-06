import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'
import { sendGoogleAdsConversion } from '@/lib/google-ads-conversion'

// Supabase Admin Client (for server-side operations)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

// ActiveCampaign Configuration
const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL || 'https://tennisbeast.api-us1.com'
const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY || ''

// RacketRescue ActiveCampaign IDs
const RACKETRESCUE_LIST_ID = '7'
const TAGS = {
  CUSTOMER: '88',
  MEMBER: '89',
  LEAD: '90',
  // Order Status Tags (for triggering automations)
  ORDER_RECEIVED: '91',
  RACKET_PICKED_UP: '92',
  STRINGING_STARTED: '93',
  QUALITY_CHECK: '94',
  READY_FOR_PICKUP: '95',
  OUT_FOR_DELIVERY: '96',
  DELIVERED: '97',
}

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

      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCreated(subscription)
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        await handleSubscriptionCanceled(subscription)
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

// ============================================
// ActiveCampaign Integration Functions
// ============================================

async function createOrUpdateContact(
  email: string,
  firstName: string,
  lastName: string,
  phone?: string,
  customFields?: Record<string, string>
) {
  if (!AC_API_KEY) {
    console.log('ActiveCampaign API key not configured, skipping...')
    return null
  }

  try {
    // Sync contact (creates or updates)
    const response = await fetch(`${AC_API_URL}/api/3/contact/sync`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contact: {
          email,
          firstName,
          lastName,
          phone: phone || '',
        },
      }),
    })

    const data = await response.json()
    console.log('ActiveCampaign contact synced:', data.contact?.id)
    return data.contact
  } catch (error) {
    console.error('ActiveCampaign sync error:', error)
    return null
  }
}

async function subscribeToList(contactId: string, listId: string) {
  if (!AC_API_KEY) return

  try {
    await fetch(`${AC_API_URL}/api/3/contactLists`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactList: {
          list: listId,
          contact: contactId,
          status: 1, // Active
        },
      }),
    })
    console.log(`Contact ${contactId} subscribed to list ${listId}`)
  } catch (error) {
    console.error('List subscription error:', error)
  }
}

async function addTagToContact(contactId: string, tagId: string) {
  if (!AC_API_KEY) return

  try {
    await fetch(`${AC_API_URL}/api/3/contactTags`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactTag: {
          contact: contactId,
          tag: tagId,
        },
      }),
    })
    console.log(`Tag ${tagId} added to contact ${contactId}`)
  } catch (error) {
    console.error('Tag add error:', error)
  }
}

async function createNote(contactId: string, note: string) {
  if (!AC_API_KEY) return

  try {
    await fetch(`${AC_API_URL}/api/3/notes`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note: {
          note,
          relid: contactId,
          reltype: 'Subscriber',
        },
      }),
    })
    console.log(`Note added to contact ${contactId}`)
  } catch (error) {
    console.error('Note creation error:', error)
  }
}

async function updateContactField(contactId: string, fieldId: string, value: string) {
  if (!AC_API_KEY) return

  try {
    await fetch(`${AC_API_URL}/api/3/fieldValues`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fieldValue: {
          contact: contactId,
          field: fieldId,
          value: value,
        },
      }),
    })
    console.log(`Field ${fieldId} updated for contact ${contactId}`)
  } catch (error) {
    console.error('Field update error:', error)
  }
}

// Custom field IDs
const CUSTOM_FIELDS = {
  LAST_ORDER_ID: '13',
  LAST_ORDER_TRACKING_URL: '14',
}

async function sendTransactionalEmail(
  contactEmail: string,
  templateType: 'order_confirmation' | 'ready_pickup' | 'delivered',
  data: Record<string, string>
) {
  if (!AC_API_KEY) return

  // ActiveCampaign transactional emails would go here
  // For now, we trigger automations via tags which send emails
  console.log(`Would send ${templateType} email to ${contactEmail}`)
}

// ============================================
// Event Handlers
// ============================================

async function handleCheckoutComplete(session: Stripe.Checkout.Session) {
  const metadata = session.metadata || {}
  const customerEmail = session.customer_details?.email
  const customerName = session.customer_details?.name || ''
  const customerPhone = session.customer_details?.phone || ''

  console.log('='.repeat(50))
  console.log('NEW ORDER RECEIVED!')
  console.log('='.repeat(50))
  console.log('Order Type:', metadata.type)
  console.log('Customer Email:', customerEmail)
  console.log('Customer Name:', customerName)
  console.log('Amount:', `$${(session.amount_total || 0) / 100}`)

  // Send Google Ads conversion
  await sendGoogleAdsConversion({
    conversionAction: `${process.env.GOOGLE_ADS_CONVERSION_ID}/${process.env.GOOGLE_ADS_CONVERSION_LABEL}`,
    conversionDateTime: new Date().toISOString(),
    conversionValue: (session.amount_total || 0) / 100,
    currencyCode: 'USD',
    orderId: session.id,
    gclid: metadata.gclid, // Captured from URL parameter
  })

  if (!customerEmail) {
    console.log('No customer email, skipping ActiveCampaign sync')
    return
  }

  // Parse name
  const nameParts = customerName.split(' ')
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''

  // Create/update contact in ActiveCampaign
  const contact = await createOrUpdateContact(
    customerEmail,
    firstName,
    lastName,
    customerPhone
  )

  if (!contact?.id) {
    console.log('Failed to create ActiveCampaign contact')
    return
  }

  // Subscribe to RacketRescue list
  await subscribeToList(contact.id, RACKETRESCUE_LIST_ID)

  if (metadata.type === 'stringing') {
    // Add Customer tag
    await addTagToContact(contact.id, TAGS.CUSTOMER)

    // Add Order Received tag (triggers automation)
    await addTagToContact(contact.id, TAGS.ORDER_RECEIVED)

    // Create order note with tracking link
    const trackingUrl = `https://www.racketrescue.com/track/${session.id}`
    const orderNote = `
🎾 STRINGING ORDER
━━━━━━━━━━━━━━━━━━━━
Amount: $${(session.amount_total || 0) / 100}
Racket: ${metadata.racket_brand} ${metadata.racket_model}
String: ${metadata.string_name}
Tension: ${metadata.main_tension}/${metadata.cross_tension} lbs
Express: ${metadata.is_express === 'true' ? 'Yes' : 'No'}
Pickup: ${metadata.pickup_address}
Time: ${metadata.pickup_time}
${metadata.special_instructions ? `Notes: ${metadata.special_instructions}` : ''}
━━━━━━━━━━━━━━━━━━━━
Track Order: ${trackingUrl}
Order ID: ${session.id}
    `.trim()

    await createNote(contact.id, orderNote)

    // Store order ID in custom field for tracking
    await updateContactField(contact.id, CUSTOM_FIELDS.LAST_ORDER_ID, session.id)
    await updateContactField(contact.id, CUSTOM_FIELDS.LAST_ORDER_TRACKING_URL, trackingUrl)

    console.log('Stringing order processed for:', customerEmail)

    // Sync order to Supabase
    if (supabaseAdmin) {
      const { error: orderError } = await supabaseAdmin.from('orders').upsert({
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: session.payment_intent as string,
        status: 'pending',
        service_package: metadata?.service_package,
        is_express: metadata?.is_express === 'true',
        racket_brand: metadata?.racket_brand,
        racket_model: metadata?.racket_model,
        string_name: metadata?.string_name,
        main_tension: parseInt(metadata?.main_tension || '0'),
        cross_tension: parseInt(metadata?.cross_tension || '0'),
        add_regrip: metadata?.add_regrip === 'true',
        add_overgrip: metadata?.add_overgrip === 'true',
        add_dampener: metadata?.add_dampener === 'true',
        dampener_bundle: metadata?.dampener_bundle === 'true',
        add_second_racket: metadata?.add_second_racket === 'true',
        customer_email: session.customer_details?.email || '',
        customer_name: session.customer_details?.name,
        customer_phone: session.customer_details?.phone,
        pickup_address: metadata?.pickup_address,
        delivery_address: metadata?.delivery_address,
        pickup_time: metadata?.pickup_time,
        special_instructions: metadata?.special_instructions,
        total_cents: session.amount_total,
        is_member: metadata?.is_member === 'true',
        membership_tier_at_order: metadata?.membership_tier,
      }, { onConflict: 'stripe_checkout_session_id' })

      if (orderError) {
        console.error('Error syncing order to Supabase:', orderError)
      } else {
        console.log('Order synced to Supabase:', session.id)

        // Link order to user if they have an account
        if (session.customer_details?.email) {
          const { data: user } = await supabaseAdmin
            .from('users')
            .select('id')
            .eq('email', session.customer_details.email)
            .single()

          if (user) {
            await supabaseAdmin
              .from('orders')
              .update({ user_id: user.id })
              .eq('stripe_checkout_session_id', session.id)
            console.log('Order linked to user:', user.id)
          }
        }
      }
    }

  } else if (metadata.type === 'membership') {
    // Add Member tag
    await addTagToContact(contact.id, TAGS.MEMBER)

    // Create membership note
    const memberNote = `
👑 NEW MEMBERSHIP
━━━━━━━━━━━━━━━━━━━━
Tier: ${metadata.tier}
Amount: $${(session.amount_total || 0) / 100}/month
━━━━━━━━━━━━━━━━━━━━
Subscription ID: ${session.subscription}
    `.trim()

    await createNote(contact.id, memberNote)

    console.log('Membership processed for:', customerEmail)
  }

  console.log('='.repeat(50))
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('NEW SUBSCRIPTION CREATED!')
  console.log('- Subscription ID:', subscription.id)
  console.log('- Status:', subscription.status)

  // Get customer email from Stripe
  if (subscription.customer && typeof subscription.customer === 'string') {
    try {
      const customer = await stripe.customers.retrieve(subscription.customer)
      if ('email' in customer && customer.email) {
        const contact = await createOrUpdateContact(
          customer.email,
          customer.name?.split(' ')[0] || '',
          customer.name?.split(' ').slice(1).join(' ') || ''
        )

        if (contact?.id) {
          await addTagToContact(contact.id, TAGS.MEMBER)
          await subscribeToList(contact.id, RACKETRESCUE_LIST_ID)
        }
      }
    } catch (error) {
      console.error('Error fetching customer:', error)
    }
  }
}

async function handleSubscriptionCanceled(subscription: Stripe.Subscription) {
  console.log('SUBSCRIPTION CANCELED!')
  console.log('- Subscription ID:', subscription.id)

  // Note: You might want to remove the Member tag here
  // For now, we'll just log it - the tag remains for historical purposes
}
