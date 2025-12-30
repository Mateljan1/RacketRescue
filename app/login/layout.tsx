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
