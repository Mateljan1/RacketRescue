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
