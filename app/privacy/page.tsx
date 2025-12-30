import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | Racket Rescue',
  description: 'Privacy Policy for Racket Rescue racquet stringing service.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="container-racket py-16 max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-racket-gray hover:text-racket-red mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-racket-black mb-8">
          Privacy Policy
        </h1>

        <p className="text-racket-gray mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none text-racket-gray">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">1. Introduction</h2>
            <p>
              Racket Rescue (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), a service of Laguna Beach Tennis Academy,
              is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and
              safeguard your information when you use our racquet stringing and pickup/delivery services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-bold text-racket-black mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Name and contact information (email, phone number)</li>
              <li>Billing and delivery address</li>
              <li>Payment information (processed securely via Stripe)</li>
              <li>Order history and preferences</li>
            </ul>

            <h3 className="text-xl font-bold text-racket-black mb-2">Service Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Racquet details (brand, model, string preferences)</li>
              <li>Tension specifications</li>
              <li>Special instructions</li>
              <li>Pickup/delivery scheduling preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Process and fulfill your stringing orders</li>
              <li>Communicate about your order status</li>
              <li>Schedule pickup and delivery services</li>
              <li>Send service updates and promotional offers (with consent)</li>
              <li>Improve our services and customer experience</li>
              <li>Process payments securely</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">4. Information Sharing</h2>
            <p className="mb-4">We do not sell your personal information. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Stripe:</strong> For secure payment processing</li>
              <li><strong>ActiveCampaign:</strong> For order notifications and email communications</li>
              <li><strong>Delivery partners:</strong> To fulfill pickup/delivery services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">5. Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information. Payment data
              is encrypted and processed by Stripe, a PCI-compliant payment processor. We never store
              your full credit card details on our servers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">6. Your Rights</h2>
            <p className="mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of marketing communications</li>
              <li>Request a copy of your data</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">7. Cookies</h2>
            <p>
              We use essential cookies for site functionality and analytics cookies to understand
              how visitors use our site. You can control cookie settings in your browser.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">8. Contact Us</h2>
            <p className="mb-4">For privacy-related questions or to exercise your rights, contact us at:</p>
            <p>
              <strong>Email:</strong>{' '}
              <a href="mailto:support@lagunabeachtennisacademy.com" className="text-racket-red hover:underline">
                support@lagunabeachtennisacademy.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{' '}
              <a href="tel:+19494646645" className="text-racket-red hover:underline">
                (949) 464-6645
              </a>
            </p>
            <p className="mt-4">
              <strong>Address:</strong><br />
              Racket Rescue / Laguna Beach Tennis Academy<br />
              1098 Balboa Ave<br />
              Laguna Beach, CA 92651
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-racket-black mb-4">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Changes will be posted on this page
              with an updated revision date. Continued use of our services after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
