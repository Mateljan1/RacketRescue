import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Membership Plans | Free Pickup & Delivery | Racket Rescue',
  description: 'Join Racket Rescue membership for FREE pickup & delivery on all stringing services. Save money with member pricing. Cancel anytime. Perfect for competitive players.',
  keywords: 'tennis stringing membership, racquet stringing subscription, free pickup delivery tennis, Orange County stringing membership, tennis player membership',
  openGraph: {
    title: 'Membership Plans | Racket Rescue',
    description: 'Unlock FREE pickup & delivery and member pricing on all stringing services. Perfect for competitive tennis players.',
    url: 'https://racketrescue.com/membership',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Membership Plans | Racket Rescue',
    description: 'Join for FREE pickup & delivery and member pricing on stringing services.',
  },
}

export default function MembershipLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
