import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tennis String Guide | Find Your Perfect String | Racket Rescue',
  description: 'Complete guide to tennis strings: polyester, multifilament, natural gut & hybrid setups. Expert recommendations for your playing style. Find the perfect string.',
  keywords: 'tennis strings guide, polyester strings, multifilament strings, natural gut, hybrid strings, Luxilon, Babolat RPM, tennis string comparison',
  openGraph: {
    title: 'Tennis String Guide | Racket Rescue',
    description: 'Complete guide to tennis strings with expert recommendations for every playing style.',
    url: 'https://racketrescue.com/strings',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tennis String Guide | Racket Rescue',
    description: 'Find the perfect tennis string for your game with our comprehensive guide.',
  },
}

export default function StringsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
