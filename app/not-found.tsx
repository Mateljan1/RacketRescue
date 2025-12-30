import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-racket-lightgray p-8">
      <div className="text-center max-w-lg">
        <div className="text-8xl mb-6">🎾</div>
        <h1 className="text-6xl font-bold text-racket-red mb-4">404</h1>
        <h2 className="text-3xl font-bold text-racket-black mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-racket-gray mb-8">
          Looks like this shot went out of bounds! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="bg-racket-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/schedule"
            className="bg-racket-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-racket-charcoal transition-colors"
          >
            Schedule Service
          </Link>
        </div>
      </div>
    </div>
  )
}
