// Restring Reminders Cron Job
// Runs daily at 9am to send automated restring reminders

import { NextRequest, NextResponse } from 'next/server'
import { sendRestringReminders } from '@/lib/automation/restring-reminders'

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
    const result = await sendRestringReminders()

    return NextResponse.json({
      success: true,
      sent: result.sent,
      errors: result.errors,
      timestamp: new Date().toISOString(),
    })

  } catch (error) {
    console.error('[Cron] Restring reminders error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

