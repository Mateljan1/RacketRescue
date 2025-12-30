// Run database migration via Supabase API
// Usage: node scripts/setup-db.mjs

const SUPABASE_URL = 'https://cjdglgrkzfjznuhorkoy.supabase.co'
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNqZGdsZ3JremZqem51aG9ya295Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzEwNjgwOCwiZXhwIjoyMDgyNjgyODA4fQ.r8tGUrG74qGMFbzICTL0pE3pGKvr7XVgiclX1A-mwFw'

// Check if tables exist by querying them
async function checkTables() {
  const tables = ['users', 'accounts', 'sessions', 'verification_tokens', 'orders', 'order_status_history']

  for (const table of tables) {
    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?limit=0`, {
        headers: {
          'apikey': SERVICE_ROLE_KEY,
          'Authorization': `Bearer ${SERVICE_ROLE_KEY}`
        }
      })

      if (res.ok) {
        console.log(`✅ Table '${table}' exists`)
      } else {
        const error = await res.json()
        console.log(`❌ Table '${table}' - ${error.message || 'not found'}`)
      }
    } catch (err) {
      console.log(`❌ Table '${table}' - ${err.message}`)
    }
  }
}

async function main() {
  console.log('Checking Supabase database tables...\n')
  await checkTables()

  console.log('\n' + '='.repeat(60))
  console.log('IMPORTANT: To create the tables, please:')
  console.log('='.repeat(60))
  console.log('\n1. Go to: https://supabase.com/dashboard/project/cjdglgrkzfjznuhorkoy/sql')
  console.log('2. Copy the SQL from: supabase/migrations/20241230000001_auth_tables.sql')
  console.log('3. Paste and run it in the SQL Editor')
  console.log('\nOr run this command to copy the SQL:')
  console.log('  cat supabase/migrations/20241230000001_auth_tables.sql | pbcopy')
  console.log('')
}

main()
