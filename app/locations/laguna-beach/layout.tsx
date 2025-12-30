import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Tennis Racquet Stringing Laguna Beach | Free Pickup & Delivery | Racket Rescue',
  description: 'Professional tennis racquet stringing in Laguna Beach with FREE pickup & delivery. 4.9★ rated, USRSA certified. 2-3 day turnaround. Serving all Laguna Beach neighborhoods.',
  keywords: 'tennis stringing Laguna Beach, racquet stringing Laguna Beach, racket restring Laguna Beach, mobile stringing service Laguna Beach',
  openGraph: {
    title: 'Tennis Racquet Stringing Laguna Beach | Racket Rescue',
    description: 'Professional stringing with FREE pickup & delivery in Laguna Beach. 4.9★ rated. 2-3 day turnaround.',
    url: 'https://racketrescue.com/locations/laguna-beach',
  },
}

export default function LagunaBeachLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script id="laguna-beach-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Tennis Racquet Stringing - Laguna Beach',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Racket Rescue',
            telephone: '+1-949-464-6645',
          },
          areaServed: {
            '@type': 'City',
            name: 'Laguna Beach',
            containedInPlace: {
              '@type': 'State',
              name: 'California',
            },
          },
          description: 'Professional tennis racquet stringing with free pickup and delivery in Laguna Beach, CA.',
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
