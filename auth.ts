import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Resend from 'next-auth/providers/resend'
import { SupabaseAdapter } from '@auth/supabase-adapter'

// Only configure adapter if Supabase is configured
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

const adapter = supabaseUrl && supabaseServiceKey
  ? SupabaseAdapter({
      url: supabaseUrl,
      secret: supabaseServiceKey,
    })
  : undefined

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
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
      if (session.user && user) {
        session.user.id = user.id
      }
      return session
    },
  },
  // Use JWT session strategy when no adapter is configured
  session: {
    strategy: adapter ? 'database' : 'jwt',
  },
})
