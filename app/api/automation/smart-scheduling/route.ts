// Smart Scheduling Cron Job
// Runs nightly to analyze bookings and send proactive messages

import { NextRequest, NextResponse } from 'next/server'
import { generateSchedulingSuggestions } from '@/lib/automation/smart-scheduling'

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const suggestions = await generateSchedulingSuggestions()

    // Find days that need promotion
    const promoteDays = suggestions.filter(s => s.suggested_action === 'promote')

    // TODO: Send push notifications to app users
    // For now, just log the suggestions
    console.log('[Smart Scheduling] Generated suggestions:', suggestions)
    console.log('[Smart Scheduling] Days to promote:', promoteDays.length)

    return NextResponse.json({
      success: true,
      suggestions,
      promote_days: promoteDays.length,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('[Cron] Smart scheduling error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

