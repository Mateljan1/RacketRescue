// Automated Restring Reminder System
// Sends reminders to customers when they're due for a restring

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const supabaseAdmin = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null

const AC_API_URL = process.env.ACTIVECAMPAIGN_API_URL || 'https://tennisbeast.api-us1.com'
const AC_API_KEY = process.env.ACTIVECAMPAIGN_API_KEY || ''

export async function sendRestringReminders(): Promise<{ sent: number; errors: number }> {
  if (!supabaseAdmin || !AC_API_KEY) {
    console.error('[Restring Reminders] Not configured')
    return { sent: 0, errors: 0 }
  }

  let sentCount = 0
  let errorCount = 0

  try {
    // Get all players who are due for restring
    const { data: players, error } = await supabaseAdmin
      .from('player_profiles')
      .select('*')
      .not('last_order_date', 'is', null)
      .not('average_days_between_restrings', 'is', null)

    if (error || !players) {
      console.error('[Restring Reminders] Error fetching players:', error)
      return { sent: 0, errors: 1 }
    }

    const today = new Date()

    for (const player of players) {
      const lastOrderDate = new Date(player.last_order_date!)
      const daysSinceLastOrder = Math.floor((today.getTime() - lastOrderDate.getTime()) / (1000 * 60 * 60 * 24))
      const avgFrequency = player.average_days_between_restrings!

      // Send reminder if due (3 days before average frequency)
      if (daysSinceLastOrder >= avgFrequency - 3) {
        // Check if reminder already sent recently
        const { data: recentReminder } = await supabaseAdmin
          .from('restring_reminders')
          .select('id')
          .eq('player_id', player.id)
          .gte('sent_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          .single()

        if (recentReminder) {
          continue // Already sent in last 7 days
        }

        // Send reminder via ActiveCampaign
        const success = await sendReminderToCustomer(
          player.email,
          player.name,
          daysSinceLastOrder,
          avgFrequency
        )

        if (success) {
          // Log reminder sent
          await supabaseAdmin
            .from('restring_reminders')
            .insert({
              player_id: player.id,
              reminder_date: today.toISOString().split('T')[0],
              sent_at: new Date().toISOString(),
              reminder_type: daysSinceLastOrder > avgFrequency ? 'overdue' : 'due',
            })

          sentCount++
        } else {
          errorCount++
        }
      }
    }

    console.log(`[Restring Reminders] Sent ${sentCount} reminders, ${errorCount} errors`)
    return { sent: sentCount, errors: errorCount }

  } catch (error) {
    console.error('[Restring Reminders] Error:', error)
    return { sent: sentCount, errors: errorCount + 1 }
  }
}

async function sendReminderToCustomer(
  email: string,
  name: string,
  daysSinceLastOrder: number,
  avgFrequency: number
): Promise<boolean> {
  try {
    // Find contact
    const searchResponse = await fetch(
      `${AC_API_URL}/api/3/contacts?email=${encodeURIComponent(email)}`,
      {
        headers: { 'Api-Token': AC_API_KEY },
      }
    )

    const searchData = await searchResponse.json()
    const contact = searchData.contacts?.[0]

    if (!contact) return false

    // Add "Restring Reminder" tag (triggers automation)
    await fetch(`${AC_API_URL}/api/3/contactTags`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contactTag: {
          contact: contact.id,
          tag: '101', // RR - Restring Reminder
        },
      }),
    })

    // Create note
    const noteContent = `
🎾 RESTRING REMINDER SENT
━━━━━━━━━━━━━━━━━━━━
Customer: ${name}
Days Since Last Restring: ${daysSinceLastOrder}
Average Frequency: ${avgFrequency} days
Status: ${daysSinceLastOrder > avgFrequency ? 'OVERDUE' : 'DUE SOON'}

Message: "Hi ${name.split(' ')[0]}, it's been ${daysSinceLastOrder} days since your last restring. Time to rescue your racket! Book now for fresh strings."

Sent: ${new Date().toLocaleString()}
    `.trim()

    await fetch(`${AC_API_URL}/api/3/notes`, {
      method: 'POST',
      headers: {
        'Api-Token': AC_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note: {
          contact: contact.id,
          note: noteContent,
        },
      }),
    })

    return true

  } catch (error) {
    console.error('[Restring Reminders] Error sending to', email, error)
    return false
  }
}

