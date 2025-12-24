'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, Phone } from 'lucide-react'

const navigation = [
  { name: 'Services', href: '/services' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-4'
            : 'bg-white/90 backdrop-blur-md py-6'
        }`}
      >
        <nav className="container-racket">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 bg-racket-orange rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="text-white font-headline font-bold text-xl">RR</span>
              </div>
              <div className="hidden sm:block">
                <div className="font-headline font-bold text-xl text-racket-navy">Racket Rescue</div>
                <div className="text-xs text-racket-gray -mt-1">Professional Stringing</div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-racket-slate hover:text-racket-orange transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:+19494646645"
                className="flex items-center gap-2 bg-racket-orange text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-racket-red transition-all hover:scale-105"
              >
                <Phone className="w-4 h-4" />
                (949) 464-6645
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-2 text-racket-navy"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-2xl overflow-y-auto">
            <div className="p-8 pt-24">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-lg font-medium text-racket-slate hover:text-racket-orange py-4 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <a
                href="tel:+19494646645"
                className="block w-full mt-8 text-center bg-racket-orange text-white px-6 py-4 rounded-full font-semibold hover:bg-racket-red"
                onClick={() => setMobileMenuOpen(false)}
              >
                Call (949) 464-6645
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

