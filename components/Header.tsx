'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { motion } from 'framer-motion'

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68b77f9f4a7eae9e097474c2/e406f4500_RacketRescueLogoFinal_Horizontal.png"

const navigation = [
  { name: 'Packages', href: '/#packages' },
  { name: 'Shop', href: '/shop' },
  { name: 'Membership', href: '/membership' },
  { name: 'My Orders', href: '/my-orders' },
  { name: 'For Shops', href: '/for-shops' },
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
        className={`fixed left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'top-0 bg-white/98 backdrop-blur-xl shadow-xl py-4'
            : 'top-[42px] bg-white/90 backdrop-blur-lg py-6'
        }`}
      >
        <nav className="container-racket">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="group">
              <Image
                src={LOGO_URL}
                alt="Racket Rescue - We Save Your Game"
                width={180}
                height={50}
                className="h-10 md:h-12 w-auto group-hover:opacity-80 transition-opacity"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-racket-gray hover:text-racket-red transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/schedule"
                  className="inline-flex items-center gap-2 bg-racket-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition-all shadow-lg hover:shadow-xl"
                >
                  Schedule Service
                </Link>
              </motion.div>
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden p-3 text-racket-black bg-white rounded-xl shadow-lg"
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 md:hidden"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl overflow-y-auto"
          >
            <div className="p-8 pt-24">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-xl font-medium text-racket-gray hover:text-racket-red py-5 border-b border-gray-100 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/schedule"
                className="block w-full mt-8 text-center bg-racket-red text-white px-8 py-5 rounded-full font-bold hover:bg-red-600 shadow-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                Schedule Service
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

