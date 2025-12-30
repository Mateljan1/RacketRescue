'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-racket-lightgray p-8">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-8">🎾</div>
        <h1 className="text-4xl font-bold text-racket-black mb-4">
          Something went wrong!
        </h1>
        <p className="text-xl text-racket-gray mb-8">
          We hit an unexpected fault. Don&apos;t worry, even the pros make mistakes sometimes.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <button
            onClick={reset}
            className="bg-racket-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="bg-racket-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-racket-charcoal transition-colors"
          >
            Go Home
          </Link>
        </div>
        <p className="mt-8 text-racket-gray text-sm">
          If this keeps happening, please{' '}
          <a
            href="mailto:support@lagunabeachtennisacademy.com"
            className="text-racket-red hover:underline"
          >
            contact support
          </a>
        </p>
      </div>
    </div>
  )
}
