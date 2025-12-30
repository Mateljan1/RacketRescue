import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Schedule Racquet Stringing | Free Pickup & Delivery | Racket Rescue',
  description: 'Schedule your tennis racquet stringing in Orange County. Free pickup & delivery for members. 2-3 day turnaround. USRSA Certified stringers. Easy online booking.',
  keywords: 'schedule racquet stringing, book tennis stringing, racket pickup Orange County, stringing appointment, tennis racquet service booking',
  openGraph: {
    title: 'Schedule Racquet Stringing | Racket Rescue',
    description: 'Book your tennis racquet stringing with free pickup & delivery. Easy online scheduling for Orange County.',
    url: 'https://racketrescue.com/schedule',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Schedule Racquet Stringing | Racket Rescue',
    description: 'Book your tennis racquet stringing with free pickup & delivery in Orange County.',
  },
}

export default function ScheduleLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
