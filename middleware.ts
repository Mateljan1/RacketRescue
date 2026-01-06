// Edge middleware for A/B test variant assignment
// Runs on Vercel Edge Network for zero-latency assignment

import { NextRequest, NextResponse } from 'next/server'
import { getExperiment, assignVariant } from './lib/ab-testing'

export const config = {
  matcher: [
    '/',
    '/membership',
    '/schedule',
  ],
}

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Example: Hero CTA experiment
  const heroCTAExperiment = await getExperiment('hero_cta_copy')
  
  if (heroCTAExperiment && heroCTAExperiment.enabled) {
    const existingVariant = request.cookies.get(`exp_${heroCTAExperiment.id}`)
    
    if (!existingVariant) {
      // Assign new variant
      const variantId = assignVariant(heroCTAExperiment)
      
      // Set cookie for 30 days
      response.cookies.set(`exp_${heroCTAExperiment.id}`, variantId, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
        sameSite: 'lax',
      })
      
      // Pass variant to page via header
      response.headers.set('x-experiment-hero-cta', variantId)
    } else {
      // Use existing variant
      response.headers.set('x-experiment-hero-cta', existingVariant.value)
    }
  }
  
  return response
}

