# RacketRescue Authentication Setup

## Environment Variables Status

### Already Configured in Vercel:
- [x] `AUTH_SECRET` - Auto-generated secure key
- [x] `AUTH_URL` - https://www.racketrescue.com
- [x] `STRIPE_SECRET_KEY` - Already configured
- [x] `STRIPE_WEBHOOK_SECRET` - Already configured
- [x] `ACTIVECAMPAIGN_API_KEY` - Already configured
- [x] `ACTIVECAMPAIGN_API_URL` - Already configured

### Need Manual Configuration:

#### 1. Google OAuth (Optional - for "Sign in with Google")
Get credentials from [Google Cloud Console](https://console.cloud.google.com/apis/credentials):

1. Create a new OAuth 2.0 Client ID
2. Set authorized redirect URI to: `https://www.racketrescue.com/api/auth/callback/google`
3. Add to Vercel:
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`

#### 2. Resend (Required for Magic Link emails)
Get API key from [Resend Dashboard](https://resend.com/api-keys):

1. Create an API key
2. Verify your domain (racketrescue.com) in Resend
3. Add to Vercel:
   - `RESEND_API_KEY`

#### 3. Supabase (Required for user data persistence)
Get from [Supabase Dashboard](https://supabase.com/dashboard) → Project Settings → API:

1. Copy the Project URL and Service Role Key
2. Add to Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL` (the Project URL)
   - `SUPABASE_SERVICE_ROLE_KEY` (the service_role key, NOT anon key)

## Database Setup

After configuring Supabase, run the migration to create auth tables:

\`\`\`sql
-- Run this in Supabase SQL Editor (supabase/migrations/001_auth_tables.sql)
\`\`\`

## Testing Locally

Add to `.env.local`:
\`\`\`bash
AUTH_SECRET=your-local-secret
AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
RESEND_API_KEY=your-resend-api-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-key
\`\`\`

## Auth Flow

1. **Magic Link (Email)**: User enters email → Resend sends magic link → User clicks → Authenticated
2. **Google OAuth**: User clicks "Sign in with Google" → Google auth flow → Authenticated

Both methods create/update users in Supabase and sync session data.
