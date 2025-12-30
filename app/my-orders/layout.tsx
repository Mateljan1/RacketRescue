import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Orders | Racket Rescue',
  description: 'View and track your racquet stringing orders with Racket Rescue.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function MyOrdersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
