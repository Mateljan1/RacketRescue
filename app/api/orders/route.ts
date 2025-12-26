import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export const dynamic = 'force-dynamic'

// GET - List orders (for admin dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const limit = parseInt(searchParams.get('limit') || '20')

    let sessions

    if (email) {
      // Get orders for specific customer
      const customers = await stripe.customers.list({
        email,
        limit: 1,
      })

      if (customers.data.length === 0) {
        return NextResponse.json({ orders: [] })
      }

      sessions = await stripe.checkout.sessions.list({
        customer: customers.data[0].id,
        limit,
        expand: ['data.line_items'],
      })
    } else {
      // Get all recent orders
      sessions = await stripe.checkout.sessions.list({
        limit,
        expand: ['data.line_items'],
      })
    }

    const orders = sessions.data
      .filter(s => s.payment_status === 'paid')
      .map(session => {
        const metadata = session.metadata || {}
        return {
          id: session.id,
          status: metadata.order_status || 'pending',
          type: metadata.type || 'stringing',
          customer_email: session.customer_details?.email || '',
          customer_name: session.customer_details?.name || '',
          racket: `${metadata.racket_brand || ''} ${metadata.racket_model || ''}`.trim(),
          string_name: metadata.string_name || '',
          amount: session.amount_total ? session.amount_total / 100 : 0,
          created_at: new Date(session.created * 1000).toISOString(),
          is_express: metadata.is_express === 'true',
        }
      })

    return NextResponse.json({ orders })

  } catch (error) {
    console.error('Error listing orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
