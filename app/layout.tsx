import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ExitIntentPopup from '@/components/ExitIntentPopup'
import PWAInstallPrompt from '@/components/PWAInstallPrompt'
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration'
import StickyMobileCTA from '@/components/StickyMobileCTA'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ec1f27',
}

export const metadata: Metadata = {
  title: 'Racket Rescue | #1 Tennis Racquet Stringing in Orange County | Free Pickup & Delivery',
  description: 'Orange County\'s premier mobile tennis racquet stringing. 4.9★ rating from 312+ reviews. Free pickup & delivery for members. 24-hour turnaround. USRSA Certified. Starting at $55.',
  keywords: 'racquet stringing Orange County, tennis stringing Laguna Beach, racket restring Newport Beach, Irvine racket stringing, mobile stringing service, pickup delivery tennis, professional stringing, USRSA certified stringer',
  authors: [{ name: 'Racket Rescue' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Racket Rescue',
  },
  formatDetection: {
    telephone: true,
  },
  openGraph: {
    title: 'Racket Rescue - #1 Mobile Racquet Stringing in Orange County',
    description: '4.9★ rated tennis stringing with FREE pickup & delivery. USRSA Certified. 2-3 day turnaround. Serving Laguna Beach, Newport Beach, Irvine & more.',
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
  // verification: {
  //   google: 'ADD_YOUR_GOOGLE_VERIFICATION_CODE_HERE',
  // },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* PWA Icons for iOS */}
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png" />

        {/* iOS Splash Screens */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Racket Rescue" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://qtrypzzcjebvfcihiynt.supabase.co" />
        <link rel="dns-prefetch" href="https://qtrypzzcjebvfcihiynt.supabase.co" />
      </head>
      <body className="font-body antialiased">
        <Header />
        {children}
        <Footer />
        <ExitIntentPopup />
        <PWAInstallPrompt />
        <ServiceWorkerRegistration />
        <StickyMobileCTA />
        
        {/* Analytics - Google Analytics 4 */}
        {/* TODO: Add real Google Analytics ID
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_REAL_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YOUR_REAL_ID');
          `}
        </Script>
        */}

        {/* PWA Install Banner - Vanilla JS for guaranteed rendering */}
        <Script id="pwa-install-banner" strategy="afterInteractive">
          {`
            (function() {
              // Check if already dismissed or running as PWA
              if (localStorage.getItem('pwa-dismissed') === 'true') return;
              if (window.matchMedia('(display-mode: standalone)').matches) return;
              if (window.navigator.standalone === true) return;

              // Create banner after DOM is ready
              function createBanner() {
                if (document.getElementById('pwa-install-banner-js')) return;

                var banner = document.createElement('div');
                banner.id = 'pwa-install-banner-js';
                banner.innerHTML = '<div style="max-width:500px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;"><div style="display:flex;align-items:center;gap:12px;"><div style="width:50px;height:50px;background:white;border-radius:12px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.15);"><span style="font-size:24px;">🎾</span></div><div style="color:white;"><div style="font-weight:bold;font-size:16px;">Get the App!</div><div style="font-size:13px;opacity:0.9;">Add to Home Screen</div></div></div><div style="display:flex;gap:8px;"><button id="pwa-install-btn" style="background:white;color:#dc2626;border:none;padding:12px 20px;border-radius:10px;font-weight:bold;font-size:14px;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,0.15);">📲 Install</button><button id="pwa-dismiss-btn" style="background:rgba(255,255,255,0.2);color:white;border:none;padding:12px;border-radius:10px;cursor:pointer;">✕</button></div></div>';

                banner.style.cssText = 'position:fixed;bottom:0;left:0;right:0;z-index:2147483647;padding:16px;background:linear-gradient(135deg,#dc2626 0%,#b91c1c 100%);box-shadow:0 -4px 20px rgba(0,0,0,0.3);font-family:system-ui,-apple-system,sans-serif;';

                document.body.appendChild(banner);

                // Install button click
                document.getElementById('pwa-install-btn').onclick = function() {
                  var isIOS = /iPhone|iPad|iPod/.test(navigator.userAgent);
                  if (isIOS) {
                    alert('To install:\\n\\n1. Tap the Share button (box with arrow)\\n2. Scroll down and tap "Add to Home Screen"\\n3. Tap "Add"\\n\\nThe app will appear on your home screen!');
                  } else {
                    alert('To install:\\n\\n1. Tap the menu (3 dots)\\n2. Tap "Add to Home Screen" or "Install App"');
                  }
                };

                // Dismiss button click
                document.getElementById('pwa-dismiss-btn').onclick = function() {
                  banner.remove();
                  localStorage.setItem('pwa-dismissed', 'true');
                };
              }

              if (document.readyState === 'complete') {
                createBanner();
              } else {
                window.addEventListener('load', createBanner);
              }
            })();
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
            priceRange: '$55-$150',
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
