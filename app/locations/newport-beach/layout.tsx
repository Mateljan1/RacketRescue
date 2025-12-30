import type { Metadata } from 'next'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'Tennis Racquet Stringing Newport Beach | Free Pickup & Delivery | Racket Rescue',
  description: 'Professional tennis racquet stringing in Newport Beach with FREE pickup & delivery. 4.9★ rated, USRSA certified. 2-3 day turnaround. Balboa Island to Corona del Mar.',
  keywords: 'tennis stringing Newport Beach, racquet stringing Newport Beach, racket restring Corona del Mar, mobile stringing service Newport Beach',
  openGraph: {
    title: 'Tennis Racquet Stringing Newport Beach | Racket Rescue',
    description: 'Professional stringing with FREE pickup & delivery in Newport Beach. 4.9★ rated. 2-3 day turnaround.',
    url: 'https://racketrescue.com/locations/newport-beach',
  },
}

export default function NewportBeachLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <Script id="newport-beach-schema" type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Tennis Racquet Stringing - Newport Beach',
          provider: {
            '@type': 'LocalBusiness',
            name: 'Racket Rescue',
            telephone: '+1-949-464-6645',
          },
          areaServed: {
            '@type': 'City',
            name: 'Newport Beach',
            containedInPlace: {
              '@type': 'State',
              name: 'California',
            },
          },
          description: 'Professional tennis racquet stringing with free pickup and delivery in Newport Beach, CA.',
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
