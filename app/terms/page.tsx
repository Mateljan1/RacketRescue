import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | Racket Rescue',
  description: 'Terms of Service for Racket Rescue racquet stringing service.',
}

export default function TermsPage() {
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
          Terms of Service
        </h1>

        <p className="text-racket-gray mb-8">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>

        <div className="prose prose-lg max-w-none text-racket-gray">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">1. Acceptance of Terms</h2>
            <p>
              By using Racket Rescue services, you agree to these Terms of Service. If you do not agree,
              please do not use our services. Racket Rescue is a service provided by Laguna Beach Tennis Academy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">2. Services Provided</h2>
            <p className="mb-4">Racket Rescue provides:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Professional racquet stringing services</li>
              <li>Pickup and delivery of racquets</li>
              <li>Various add-on services (re-gripping, dampeners, etc.)</li>
              <li>Membership programs with additional benefits</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">3. Service Area</h2>
            <p>
              Our pickup and delivery services are available within specific ZIP codes in Orange County, California.
              Service availability is determined at the time of booking and may be subject to change.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">4. Pricing and Payment</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>All prices are in US dollars and include applicable taxes</li>
              <li>Payment is required at the time of booking</li>
              <li>We accept major credit cards processed securely via Stripe</li>
              <li>Membership fees are billed monthly or annually as selected</li>
              <li>Prices are subject to change without notice</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">5. Turnaround Time</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Standard Service:</strong> 24 hours from pickup</li>
              <li><strong>Same-Day Rush:</strong> Same business day (additional fee applies)</li>
              <li>Turnaround times are estimates and may vary based on demand</li>
              <li>We will notify you of any delays as soon as possible</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">6. Racquet Condition</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>We will handle your equipment with professional care</li>
              <li>Pre-existing damage will be documented before stringing</li>
              <li>We are not liable for damage resulting from racquet defects or normal wear</li>
              <li>Frames that crack during stringing due to age or prior damage are the owner&apos;s responsibility</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">7. Satisfaction Guarantee</h2>
            <p>
              We stand behind our work. If you&apos;re not satisfied with your stringing job, contact us within
              7 days of delivery and we will work to resolve the issue, which may include a re-string at
              no additional cost.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">8. Cancellation Policy</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Orders can be cancelled before pickup for a full refund</li>
              <li>Once work has begun, cancellations may incur a service fee</li>
              <li>Memberships can be cancelled anytime; current period remains active</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">9. Limitation of Liability</h2>
            <p>
              Racket Rescue&apos;s liability is limited to the value of the services provided. We are not
              liable for indirect, incidental, or consequential damages. Our maximum liability shall
              not exceed the amount paid for the specific service in question.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">10. Intellectual Property</h2>
            <p>
              All content on the Racket Rescue website, including logos, text, and images, is owned by
              Laguna Beach Tennis Academy and protected by copyright laws. You may not use our content
              without written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">11. Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be posted on this
              page and are effective immediately upon posting. Your continued use of our services
              constitutes acceptance of modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-racket-black mb-4">12. Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of California. Any disputes shall be
              resolved in the courts of Orange County, California.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-racket-black mb-4">13. Contact</h2>
            <p className="mb-4">For questions about these Terms, contact us at:</p>
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
        </div>
      </div>
    </div>
  )
}
