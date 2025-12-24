import Link from 'next/link'
import Image from 'next/image'
import { Mail, Phone, MapPin } from 'lucide-react'

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b77f9f4a7eae9e097474c2/e406f4500_RacketRescueLogoFinal_Horizontal.png"

export default function Footer() {
  return (
    <footer className="bg-racket-black text-white">
      <div className="container-racket py-20">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src={LOGO_URL}
              alt="Racket Rescue"
              width={200}
              height={60}
              className="h-12 w-auto mb-6 brightness-0 invert"
            />
            <p className="text-white/70 leading-relaxed max-w-md text-lg mb-6">
              Professional racket stringing with pickup & delivery in Laguna Beach.
            </p>
            <div className="inline-flex items-center gap-2 bg-racket-red/20 text-racket-red px-4 py-2 rounded-full font-bold">
              We Save Your Game!
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/schedule" className="text-white/70 hover:text-racket-red transition-colors text-lg">
                  Schedule Service
                </Link>
              </li>
              <li>
                <Link href="/membership" className="text-white/70 hover:text-racket-red transition-colors text-lg">
                  Membership
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-white/70 hover:text-racket-red transition-colors text-lg">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-white/70 hover:text-racket-red transition-colors text-lg">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+19494646645"
                  className="flex items-center gap-3 text-white/70 hover:text-racket-red transition-colors text-lg group"
                >
                  <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  (949) 464-6645
                </a>
              </li>
              <li>
                <a
                  href="mailto:support@lagunabeachtennisacademy.com"
                  className="flex items-center gap-3 text-white/70 hover:text-racket-red transition-colors text-lg group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  Email Us
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <span className="text-lg">
                  1098 Balboa Ave<br />
                  Laguna Beach, CA 92651
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/50">
            © {new Date().getFullYear()} Racket Rescue. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <Link href="/privacy" className="text-white/50 hover:text-racket-red transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-white/50 hover:text-racket-red transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Attribution */}
        <div className="mt-8 text-center text-sm text-white/30">
          Part of{' '}
          <Link
            href="https://lagunabeachtennisacademy.com"
            className="hover:text-racket-red transition-colors font-semibold"
          >
            Laguna Beach Tennis Academy
          </Link>
        </div>
      </div>
    </footer>
  )
}

