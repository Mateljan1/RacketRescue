import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Racket Rescue | Professional Tennis Racquet Stringing with Pickup & Delivery',
  description: 'Professional racquet stringing service with FREE pickup & delivery in Laguna Beach. Match-Ready $35, Pro-Performance $50. Same-day available. We save your game!',
  keywords: 'racquet stringing, tennis stringing Laguna Beach, racket restring, pickup delivery, professional stringing, same day stringing, tennis racket service',
  authors: [{ name: 'Racket Rescue' }],
  openGraph: {
    title: 'Racket Rescue - We Save Your Game!',
    description: 'Professional racquet stringing with pickup & delivery in Laguna Beach. Free for members!',
    type: 'website',
    locale: 'en_US',
    url: 'https://racketrescue.com',
    siteName: 'Racket Rescue',
    images: [
      {
        url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b77f9f4a7eae9e097474c2/e406f4500_RacketRescueLogoFinal_Horizontal.png',
        width: 1200,
        height: 630,
        alt: 'Racket Rescue - Professional Stringing Service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Racket Rescue - We Save Your Game!',
    description: 'Professional racquet stringing with pickup & delivery. Free for members!',
    images: ['https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b77f9f4a7eae9e097474c2/e406f4500_RacketRescueLogoFinal_Horizontal.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // TODO: Add real verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* PWA Meta Tags */}
        <meta name="theme-color" content="#ec1f27" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Racket Rescue" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://qtrypzzcjebvfcihiynt.supabase.co" />
        <link rel="dns-prefetch" href="https://qtrypzzcjebvfcihiynt.supabase.co" />
      </head>
      <body className="font-body antialiased">
        <Header />
        {children}
        <Footer />
        <ExitIntentPopup />
        
        {/* Analytics - Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* Structured Data for SEO */}
        <Script id="structured-data" type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'Racket Rescue',
            image: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b77f9f4a7eae9e097474c2/e406f4500_RacketRescueLogoFinal_Horizontal.png',
            '@id': 'https://racketrescue.com',
            url: 'https://racketrescue.com',
            telephone: '+1-949-464-6645',
            priceRange: '$35-$50',
            address: {
              '@type': 'PostalAddress',
              streetAddress: '1098 Balboa Ave',
              addressLocality: 'Laguna Beach',
              addressRegion: 'CA',
              postalCode: '92651',
              addressCountry: 'US',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 33.5427,
              longitude: -117.7854,
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '10:00',
                closes: '16:00',
              },
            ],
            sameAs: [
              'https://lagunabeachtennisacademy.com',
            ],
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '312',
            },
          })}
        </Script>
      </body>
    </html>
  )
}
