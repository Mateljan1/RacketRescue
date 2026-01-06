// Racket Lookup API
// Looks up racket details by barcode

import { NextRequest, NextResponse } from 'next/server'

// Racket database (in production, this would be a comprehensive database)
const RACKET_DATABASE: Record<string, any> = {
  // Wilson
  'WRT73391U2': { brand: 'Wilson', model: 'Pro Staff 97', gripSize: '4 3/8', stringPattern: '16x19' },
  'WR038711U2': { brand: 'Wilson', model: 'Blade 98', gripSize: '4 3/8', stringPattern: '16x19' },
  
  // Babolat
  '101449': { brand: 'Babolat', model: 'Pure Drive', gripSize: '4 1/4', stringPattern: '16x19' },
  '101435': { brand: 'Babolat', model: 'Pure Aero', gripSize: '4 1/4', stringPattern: '16x19' },
  
  // Yonex
  'EZONE98': { brand: 'Yonex', model: 'EZONE 98', gripSize: '4 3/8', stringPattern: '16x19' },
  
  // Head
  'HEAD360': { brand: 'Head', model: 'Speed 360', gripSize: '4 3/8', stringPattern: '16x19' },
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const barcode = searchParams.get('barcode')

    if (!barcode) {
      return NextResponse.json(
        { error: 'Missing barcode parameter' },
        { status: 400 }
      )
    }

    // Lookup racket in database
    const racket = RACKET_DATABASE[barcode]

    if (!racket) {
      return NextResponse.json(
        { error: 'Racket not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      racket: {
        ...racket,
        serialNumber: barcode,
      },
    })

  } catch (error) {
    console.error('Racket lookup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

