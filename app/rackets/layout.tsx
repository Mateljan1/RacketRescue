import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Rackets | Racket Rescue',
  description: 'Manage your racket collection and stringing preferences with Racket Rescue.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function RacketsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
