import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed | Racket Rescue',
  description: 'Your racquet stringing order has been confirmed. Thank you for choosing Racket Rescue.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
