// API route for dashboard data
// Fetches real-time metrics from GA4 Data API

import { NextRequest, NextResponse } from 'next/server'
import { getDailyMetrics, getFunnelData } from '@/lib/ga4-data-api'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('startDate') || '7daysAgo'
    const endDate = searchParams.get('endDate') || 'today'
    
    const [metrics, funnel] = await Promise.all([
      getDailyMetrics(startDate, endDate),
      getFunnelData(),
    ])
    
    return NextResponse.json({
      metrics,
      funnel,
      lastUpdated: new Date().toISOString(),
    })
    
  } catch (error) {
    console.error('[Dashboard API Error]', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    )
  }
}
