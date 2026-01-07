// Player Rackets API
// Fetch and manage rackets for a specific player

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 500 }
    )
  }

  try {
    const { data: rackets, error } = await supabaseAdmin
      .from('player_rackets')
      .select('*')
      .eq('player_id', params.id)
      .eq('is_active', true)
      .order('last_strung_date', { ascending: false, nullsFirst: false })

    if (error) {
      console.error('Error fetching rackets:', error)
      return NextResponse.json(
        { error: 'Failed to fetch rackets' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      rackets: rackets || [],
    })

  } catch (error) {
    console.error('Player rackets API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()

    const { data: racket, error } = await supabaseAdmin
      .from('player_rackets')
      .insert({
        player_id: params.id,
        ...body,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating racket:', error)
      return NextResponse.json(
        { error: 'Failed to create racket' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      racket,
    })

  } catch (error) {
    console.error('Create racket error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
