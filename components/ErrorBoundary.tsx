'use client'

import { Component, ReactNode } from 'react'
import Link from 'next/link'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="text-6xl mb-6">🎾</div>
            <h2 className="text-2xl font-bold text-racket-black mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-racket-gray mb-6">
              We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => this.setState({ hasError: false, error: undefined })}
                className="bg-racket-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition-colors"
              >
                Try Again
              </button>
              <Link
                href="/"
                className="bg-gray-200 text-racket-black px-6 py-3 rounded-full font-bold hover:bg-gray-300 transition-colors"
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook for function components to get error boundary behavior
export function useErrorHandler() {
  return (error: Error) => {
    console.error('Error handled:', error)
    // Could trigger error reporting service here
  }
}

export default ErrorBoundary
