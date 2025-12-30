import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partner With Us | Tennis Shop Stringing Services | Racket Rescue',
  description: 'Partner with Racket Rescue for professional stringing services. Offer your customers premium stringing without the overhead. USRSA Certified. Reliable turnaround.',
  keywords: 'tennis shop partnership, stringing service provider, outsource racquet stringing, tennis retail partner, pro shop stringing partner',
  openGraph: {
    title: 'Partner With Us | Racket Rescue',
    description: 'Offer professional stringing services to your customers. Partner with Orange County\'s trusted stringing experts.',
    url: 'https://racketrescue.com/for-shops',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Partner With Us | Racket Rescue',
    description: 'Tennis shop partnership program for professional stringing services.',
  },
}

export default function ForShopsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
