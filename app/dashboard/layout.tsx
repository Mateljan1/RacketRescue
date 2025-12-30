import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Racket Rescue',
  description: 'Manage your Racket Rescue account, view orders, and track your stringing history.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
