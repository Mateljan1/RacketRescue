import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Tennis Racquet Stringing Irvine | Free Pickup & Delivery | Racket Rescue',
  description: 'Professional tennis racquet stringing in Irvine with FREE pickup & delivery. 4.9★ rated, USRSA certified. 24-hour turnaround. Serving all Irvine villages.',
  keywords: 'tennis stringing Irvine, racquet stringing Irvine, racket restring Irvine, mobile stringing service Irvine, Great Park tennis',
  openGraph: {
    title: 'Tennis Racquet Stringing Irvine | Racket Rescue',
    description: 'Professional stringing with FREE pickup & delivery in Irvine. 4.9★ rated. 24-hour turnaround.',
    url: 'https://racketrescue.com/locations/irvine',
  },
}

export default function IrvineLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script id="irvine-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Tennis Racquet Stringing - Irvine',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Racket Rescue',
            telephone: '+1-949-464-6645',
          },
          areaServed: {
            '@type': 'City',
            name: 'Irvine',
            containedInPlace: {
              '@type': 'State',
              name: 'California',
            },
          },
          description: 'Professional tennis racquet stringing with free pickup and delivery in Irvine, CA.',
          offers: {
            '@type': 'Offer',
            price: '55.00',
            priceCurrency: 'USD',
          },
        })}
      </Script>
    </>
  )
}
