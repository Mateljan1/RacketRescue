import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-racket-navy text-white">
      <div className="container-racket py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-racket-orange rounded-full flex items-center justify-center">
                <span className="text-white font-headline font-bold text-xl">RR</span>
              </div>
              <div>
                <div className="font-headline font-bold text-xl">Racket Rescue</div>
                <div className="text-sm text-racket-gray">Professional Stringing Services</div>
              </div>
            </div>
            <p className="text-racket-gray leading-relaxed max-w-md">
              Expert racquet stringing and customization services in Laguna Beach. 
              Trusted by competitive players and recreational enthusiasts alike.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-racket-gray hover:text-racket-orange transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-racket-gray hover:text-racket-orange transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-racket-gray hover:text-racket-orange transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-racket-gray hover:text-racket-orange transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-headline font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+19494646645"
                  className="flex items-center gap-2 text-racket-gray hover:text-racket-orange transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  (949) 464-6645
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@lagunabeachtennisacademy.com"
                  className="flex items-center gap-2 text-racket-gray hover:text-racket-orange transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </li>
              <li className="flex items-start gap-2 text-racket-gray">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>
                  1098 Balboa Ave<br />
                  Laguna Beach, CA 92651
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-racket-gray">
            © {new Date().getFullYear()} Racket Rescue. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy" className="text-racket-gray hover:text-racket-orange transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-racket-gray hover:text-racket-orange transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-6 text-center text-xs text-racket-gray/60">
          Part of <Link href="https://lagunabeachtennisacademy.com" className="hover:text-racket-orange transition-colors">Laguna Beach Tennis Academy</Link>
        </div>
      </div>
    </footer>
  )
}

