import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'String Durability Tracker | Racket Rescue',
  description: 'Track your tennis string durability and get restring reminders from Racket Rescue.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function DurabilityLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
