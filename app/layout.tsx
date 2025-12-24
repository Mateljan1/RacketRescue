import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Racket Rescue | Professional Tennis Racquet Stringing Services',
  description: 'Expert racquet stringing in Laguna Beach. Same-day service, premium strings, and professional customization. Trusted by players of all levels.',
  keywords: 'racquet stringing, tennis stringing Laguna Beach, professional stringing, same-day racquet service, tennis racquet customization',
  openGraph: {
    title: 'Racket Rescue | Professional Stringing Services',
    description: 'Expert racquet stringing in Laguna Beach. Same-day service available.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-body antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}

