import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Referral Program | Racket Rescue',
  description: 'Earn rewards by referring friends to Racket Rescue. Get $10 credit for every successful referral.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function ReferralsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
