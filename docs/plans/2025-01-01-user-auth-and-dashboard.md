# User Authentication & Dashboard Integration Plan

> **For Claude:** Use /execute-plan to implement this plan task-by-task.

**Goal:** Add user authentication and connect the dashboard to real order data from Stripe/Supabase.

**Architecture:** NextAuth.js for authentication with magic link (email) + Google OAuth. Supabase for user profiles and order storage. Stripe remains source of truth for payments, synced to Supabase via webhooks.

**Tech Stack:** NextAuth.js v5, Supabase, Stripe webhooks, TypeScript

---

## Phase 1: Authentication System

### Task 1: Install NextAuth.js Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Install packages**
\`\`\`bash
pnpm add next-auth@beta @auth/supabase-adapter
\`\`\`

**Step 2: Verify installation**
\`\`\`bash
pnpm list next-auth
\`\`\`
Expected: `next-auth@5.x.x`

**Step 3: Commit**
\`\`\`bash
git add package.json pnpm-lock.yaml && git commit -m "chore: add next-auth dependencies"
\`\`\`

---

### Task 2: Create Auth Configuration

**Files:**
- Create: `auth.ts`
- Create: `app/api/auth/[...nextauth]/route.ts`

**Step 1: Create auth.ts in project root**
\`\`\`typescript
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { SupabaseAdapter } from '@auth/supabase-adapter'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: 'Racket Rescue <noreply@racketrescue.com>',
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
    verifyRequest: '/login/verify',
  },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
  },
})
\`\`\`

**Step 2: Create API route**
Create `app/api/auth/[...nextauth]/route.ts`:
\`\`\`typescript
import { handlers } from '@/auth'

export const { GET, POST } = handlers
\`\`\`

**Step 3: Add environment variables to .env.local**
\`\`\`
# NextAuth
AUTH_SECRET=generate-with-openssl-rand-base64-32
AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Resend (for magic links)
RESEND_API_KEY=

# Supabase Service Role (for adapter)
SUPABASE_SERVICE_ROLE_KEY=
\`\`\`

**Step 4: Commit**
\`\`\`bash
git add auth.ts app/api/auth && git commit -m "feat: add NextAuth configuration with Google and magic link"
\`\`\`

---

### Task 3: Create Login Page

**Files:**
- Create: `app/login/page.tsx`
- Create: `app/login/verify/page.tsx`

**Step 1: Create login page**
Create `app/login/page.tsx`:
\`\`\`typescript
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { Mail, Loader2 } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await signIn('resend', { email, callbackUrl: '/dashboard' })
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  return (
    <main className="min-h-screen bg-racket-lightgray flex items-center justify-center px-4 pt-24">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Racket Rescue"
                width={180}
                height={60}
                className="mx-auto"
              />
            </Link>
            <h1 className="text-2xl font-bold text-racket-black mt-6">
              Welcome Back
            </h1>
            <p className="text-racket-gray mt-2">
              Sign in to manage your orders and membership
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Google Sign In */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl py-3 px-4 font-medium text-gray-700 hover:bg-gray-50 transition-colors mb-4"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or</span>
            </div>
          </div>

          {/* Email Sign In */}
          <form onSubmit={handleEmailSignIn}>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-racket-red text-white py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending link...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Send Magic Link
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link href="/schedule" className="text-racket-red font-medium hover:underline">
              Book your first stringing
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
\`\`\`

**Step 2: Create verify page**
Create `app/login/verify/page.tsx`:
\`\`\`typescript
import { Mail, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-racket-lightgray flex items-center justify-center px-4 pt-24">
      <div className="w-full max-w-md text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-racket-black mb-4">
            Check your email
          </h1>
          <p className="text-racket-gray mb-6">
            We sent you a magic link to sign in. Click the link in your email to continue.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-racket-red font-medium hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </div>
      </div>
    </main>
  )
}
\`\`\`

**Step 3: Create login layout with noindex**
Create `app/login/layout.tsx`:
\`\`\`typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In | Racket Rescue',
  description: 'Sign in to your Racket Rescue account to manage orders and membership.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
\`\`\`

**Step 4: Commit**
\`\`\`bash
git add app/login && git commit -m "feat: add login and verify pages"
\`\`\`

---

### Task 4: Add Session Provider

**Files:**
- Create: `components/Providers.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create providers component**
Create `components/Providers.tsx`:
\`\`\`typescript
'use client'

import { SessionProvider } from 'next-auth/react'

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
\`\`\`

**Step 2: Wrap app with providers**
In `app/layout.tsx`, add import and wrap body content:
\`\`\`typescript
import Providers from '@/components/Providers'

// In the body, wrap children:
<body className="font-body antialiased">
  <Providers>
    {/* existing content */}
  </Providers>
</body>
\`\`\`

**Step 3: Commit**
\`\`\`bash
git add components/Providers.tsx app/layout.tsx && git commit -m "feat: add session provider to app"
\`\`\`

---

### Task 5: Add Auth to Header

**Files:**
- Modify: `components/Header.tsx`

**Step 1: Update Header with auth state**
Add to `components/Header.tsx`:
\`\`\`typescript
import { useSession, signOut } from 'next-auth/react'
import { User, LogOut } from 'lucide-react'

// Inside component:
const { data: session } = useSession()

// Replace existing account/login link with:
{session ? (
  <div className="relative group">
    <button className="flex items-center gap-2 text-racket-gray hover:text-racket-red">
      <User className="w-5 h-5" />
      <span className="hidden md:inline">{session.user?.name || 'Account'}</span>
    </button>
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
      <Link href="/dashboard" className="block px-4 py-3 hover:bg-gray-50 rounded-t-xl">
        Dashboard
      </Link>
      <Link href="/my-orders" className="block px-4 py-3 hover:bg-gray-50">
        My Orders
      </Link>
      <button
        onClick={() => signOut()}
        className="w-full text-left px-4 py-3 hover:bg-gray-50 rounded-b-xl text-red-600 flex items-center gap-2"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  </div>
) : (
  <Link href="/login" className="flex items-center gap-2 text-racket-gray hover:text-racket-red">
    <User className="w-5 h-5" />
    <span className="hidden md:inline">Sign In</span>
  </Link>
)}
\`\`\`

**Step 2: Commit**
\`\`\`bash
git add components/Header.tsx && git commit -m "feat: add auth state to header"
\`\`\`

---

## Phase 2: Database Integration

### Task 6: Create Supabase Tables

**Files:**
- Create: `supabase/migrations/001_auth_tables.sql`

**Step 1: Create migration file**
\`\`\`sql
-- NextAuth required tables
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique not null,
  email_verified timestamptz,
  image text,
  stripe_customer_id text,
  membership_tier text check (membership_tier in ('standard', 'elite', 'family')),
  membership_status text check (membership_status in ('active', 'cancelled', 'past_due')),
  activecampaign_contact_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  provider text not null,
  provider_account_id text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  unique(provider, provider_account_id)
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  session_token text unique not null,
  user_id uuid not null references users(id) on delete cascade,
  expires timestamptz not null
);

create table if not exists verification_tokens (
  identifier text not null,
  token text unique not null,
  expires timestamptz not null,
  primary key (identifier, token)
);

-- Orders table
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  status text not null default 'pending',
  service_package text,
  is_express boolean default false,
  racket_brand text,
  racket_model text,
  string_name text,
  main_tension integer,
  cross_tension integer,
  add_regrip boolean default false,
  add_overgrip boolean default false,
  add_dampener boolean default false,
  dampener_bundle boolean default false,
  add_second_racket boolean default false,
  customer_email text not null,
  customer_name text,
  customer_phone text,
  pickup_address text,
  delivery_address text,
  pickup_time text,
  pickup_date date,
  special_instructions text,
  subtotal_cents integer,
  pickup_fee_cents integer default 0,
  discount_cents integer default 0,
  total_cents integer,
  is_member boolean default false,
  membership_tier_at_order text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order status history
create table if not exists order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  status text not null,
  note text,
  updated_by text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table users enable row level security;
alter table orders enable row level security;
alter table order_status_history enable row level security;

-- RLS policies
create policy "Users can view own profile" on users
  for select using (auth.uid()::text = id::text);

create policy "Users can view own orders" on orders
  for select using (user_id::text = auth.uid()::text or customer_email = auth.email());

create policy "Users can view own order history" on order_status_history
  for select using (
    order_id in (select id from orders where user_id::text = auth.uid()::text)
  );
\`\`\`

**Step 2: Run migration**
\`\`\`bash
npx supabase db push
\`\`\`

**Step 3: Commit**
\`\`\`bash
git add supabase && git commit -m "feat: add auth and orders tables to Supabase"
\`\`\`

---

### Task 7: Sync Orders from Stripe Webhook

**Files:**
- Modify: `app/api/webhook/stripe/route.ts`

**Step 1: Add order sync to webhook**
After successful checkout, add to the webhook handler:
\`\`\`typescript
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// In checkout.session.completed handler, after AC sync:
// Sync order to Supabase
const { error: orderError } = await supabaseAdmin.from('orders').upsert({
  stripe_checkout_session_id: session.id,
  stripe_payment_intent_id: session.payment_intent as string,
  status: 'pending',
  service_package: metadata?.service_package,
  is_express: metadata?.is_express === 'true',
  racket_brand: metadata?.racket_brand,
  racket_model: metadata?.racket_model,
  string_name: metadata?.string_name,
  main_tension: parseInt(metadata?.main_tension || '0'),
  cross_tension: parseInt(metadata?.cross_tension || '0'),
  add_regrip: metadata?.add_regrip === 'true',
  add_overgrip: metadata?.add_overgrip === 'true',
  add_dampener: metadata?.add_dampener === 'true',
  dampener_bundle: metadata?.dampener_bundle === 'true',
  add_second_racket: metadata?.add_second_racket === 'true',
  customer_email: session.customer_details?.email || '',
  customer_name: session.customer_details?.name,
  customer_phone: session.customer_details?.phone,
  pickup_address: metadata?.pickup_address,
  delivery_address: metadata?.delivery_address,
  pickup_time: metadata?.pickup_time,
  special_instructions: metadata?.special_instructions,
  total_cents: session.amount_total,
  is_member: metadata?.is_member === 'true',
  membership_tier_at_order: metadata?.membership_tier,
}, { onConflict: 'stripe_checkout_session_id' })

if (orderError) {
  console.error('Error syncing order to Supabase:', orderError)
}

// Link order to user if they have an account
if (session.customer_details?.email) {
  const { data: user } = await supabaseAdmin
    .from('users')
    .select('id')
    .eq('email', session.customer_details.email)
    .single()

  if (user) {
    await supabaseAdmin
      .from('orders')
      .update({ user_id: user.id })
      .eq('stripe_checkout_session_id', session.id)
  }
}
\`\`\`

**Step 2: Commit**
\`\`\`bash
git add app/api/webhook/stripe/route.ts && git commit -m "feat: sync orders to Supabase from webhook"
\`\`\`

---

### Task 8: Connect Dashboard to Real Data

**Files:**
- Modify: `app/dashboard/page.tsx`
- Create: `app/api/user/orders/route.ts`

**Step 1: Create user orders API**
Create `app/api/user/orders/route.ts`:
\`\`\`typescript
import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const session = await auth()

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get orders for this user
  const { data: orders, error } = await supabase
    .from('orders')
    .select('*')
    .or(`user_id.eq.${session.user.id},customer_email.eq.${session.user.email}`)
    .order('created_at', { ascending: false })
    .limit(20)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Get user membership info
  const { data: user } = await supabase
    .from('users')
    .select('membership_tier, membership_status')
    .eq('email', session.user.email)
    .single()

  return NextResponse.json({
    orders,
    membership: user ? {
      tier: user.membership_tier,
      status: user.membership_status,
    } : null,
    user: {
      name: session.user.name,
      email: session.user.email,
    }
  })
}
\`\`\`

**Step 2: Update dashboard to fetch real data**
Update `app/dashboard/page.tsx` to use real API:
\`\`\`typescript
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
// ... existing imports

interface Order {
  id: string
  status: string
  racket_brand: string
  racket_model: string
  string_name: string
  is_express: boolean
  total_cents: number
  created_at: string
}

interface DashboardData {
  orders: Order[]
  membership: { tier: string; status: string } | null
  user: { name: string; email: string }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login')
    }

    if (status === 'authenticated') {
      fetch('/api/user/orders')
        .then(res => res.json())
        .then(setData)
        .finally(() => setLoading(false))
    }
  }, [status])

  if (loading || status === 'loading') {
    return <LoadingSpinner />
  }

  // ... rest of component using data.orders, data.membership, data.user
}
\`\`\`

**Step 3: Commit**
\`\`\`bash
git add app/dashboard/page.tsx app/api/user/orders/route.ts && git commit -m "feat: connect dashboard to real order data"
\`\`\`

---

## Phase 3: Environment Variables for Vercel

### Task 9: Add Required Environment Variables

**Vercel Environment Variables to Add:**

| Key | Description |
|-----|-------------|
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | `https://www.racketrescue.com` |
| `GOOGLE_CLIENT_ID` | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | From Google Cloud Console |
| `RESEND_API_KEY` | From Resend dashboard |
| `SUPABASE_SERVICE_ROLE_KEY` | From Supabase settings |

**Step 1: Generate AUTH_SECRET**
\`\`\`bash
openssl rand -base64 32
\`\`\`

**Step 2: Add to Vercel via CLI or dashboard**

---

## Summary

This plan covers:
1. ✅ NextAuth.js setup with Google + Magic Link
2. ✅ Login/verify pages
3. ✅ Session provider
4. ✅ Auth-aware header
5. ✅ Supabase schema for auth + orders
6. ✅ Webhook sync to Supabase
7. ✅ Dashboard connected to real data
8. ✅ Protected routes

**Estimated Implementation Time:** 2-3 hours

**Ready to execute with /execute-plan?**
