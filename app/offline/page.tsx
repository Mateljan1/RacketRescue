'use client'

import { WifiOff, RefreshCw } from 'lucide-react'
import Link from 'next/link'

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        {/* Offline Icon */}
        <div className="w-24 h-24 bg-racket-red/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-12 h-12 text-racket-red" />
        </div>

        {/* Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          You're Offline
        </h1>
        <p className="text-gray-600 mb-8">
          It looks like you've lost your internet connection. Don't worry - your racket is still safe with us!
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 w-full bg-racket-red text-white py-4 rounded-xl font-semibold hover:bg-red-600 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>

          <p className="text-sm text-gray-500">
            Some pages you've visited before may still be available offline.
          </p>
        </div>

        {/* Cached Pages */}
        <div className="mt-8 p-4 bg-white rounded-xl shadow-sm">
          <p className="text-sm font-medium text-gray-700 mb-3">
            Try these cached pages:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/my-orders"
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              My Orders
            </Link>
            <Link
              href="/membership"
              className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Membership
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
