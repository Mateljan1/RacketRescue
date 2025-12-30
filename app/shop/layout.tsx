import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pro Shop | Tennis Strings & Accessories | Racket Rescue',
  description: 'Shop premium tennis strings, grips, and accessories. Luxilon, Babolat, Wilson & more. Expert string recommendations. Free shipping on orders over $50.',
  keywords: 'tennis strings shop, Luxilon strings, Babolat RPM, tennis grips, overgrips, tennis accessories, buy tennis strings Orange County',
  openGraph: {
    title: 'Pro Shop | Tennis Strings & Accessories | Racket Rescue',
    description: 'Premium tennis strings and accessories from top brands. Expert recommendations for your playing style.',
    url: 'https://racketrescue.com/shop',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Pro Shop | Racket Rescue',
    description: 'Premium tennis strings and accessories from Luxilon, Babolat, Wilson & more.',
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
