import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact Us | Get Your Racquet Strung | Racket Rescue',
  description: 'Contact Racket Rescue for tennis racquet stringing in Orange County. Call (949) 464-6645 or submit a request online. Free pickup & delivery for members.',
  keywords: 'contact racket rescue, tennis stringing Orange County, racquet stringing phone number, stringing service contact',
  openGraph: {
    title: 'Contact Us | Racket Rescue',
    description: 'Get in touch for professional racquet stringing in Orange County. Call or submit online.',
    url: 'https://racketrescue.com/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us | Racket Rescue',
    description: 'Get in touch for professional racquet stringing in Orange County.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
