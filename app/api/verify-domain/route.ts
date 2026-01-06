import { NextResponse } from 'next/server'

// Quick endpoint to verify domain is working
export async function GET() {
  return NextResponse.json({
    status: 'success',
    domain: 'racketrescue.com',
    message: 'Racket Rescue API is working!',
    timestamp: new Date().toISOString(),
    version: '2.0-elite',
    features: [
      'AI String Wizard',
      'Smart Racket Profiles',
      '3D Visualizer',
      'Live Tracking',
      'Referral System',
      'SMS Notifications',
      'Durability Tracker',
    ],
  })
}
