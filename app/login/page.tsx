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
            Don&apos;t have an account?{' '}
            <Link href="/schedule" className="text-racket-red font-medium hover:underline">
              Book your first stringing
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
