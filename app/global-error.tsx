'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f5f5f5',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '500px' }}>
            <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎾</div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: '1rem',
              }}
            >
              Critical Error
            </h1>
            <p
              style={{
                fontSize: '1.125rem',
                color: '#666',
                marginBottom: '2rem',
              }}
            >
              We encountered a critical error. Please try refreshing the page.
            </p>
            <button
              onClick={reset}
              style={{
                backgroundColor: '#ec1f27',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '9999px',
                fontWeight: 'bold',
                fontSize: '1.125rem',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
