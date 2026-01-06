// Type-safe GA4 event tracking with SSR safety and error handling
// Implements all 12 required conversion events + Enhanced Ecommerce

// Extend Window interface to include gtag
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void
    dataLayer: any[]
  }
}

type EventParams = {
  [key: string]: string | number | boolean | undefined | any
}

interface EcommerceItem {
  item_id: string
  item_name: string
  item_category: string
  price: number
  quantity: number
}

class Analytics {
  private isEnabled(): boolean {
    return typeof window !== 'undefined' && 
           typeof window.gtag === 'function' &&
           process.env.NEXT_PUBLIC_GA_ID !== undefined
  }

  private track(eventName: string, params?: EventParams): void {
    if (!this.isEnabled()) {
      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', eventName, params)
      }
      return
    }

    try {
      window.gtag('event', eventName, params)
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('[Analytics Error]', eventName, error)
      }
    }
  }

  // Booking Drawer Events
  bookingDrawerOpen(source: string, packageId?: string): void {
    this.track('booking_drawer_open', {
      source, // 'hero_cta', 'sticky_mobile', 'header', 'footer'
      package_id: packageId,
    })
  }

  packageSelected(packageId: string, price: number, racketCount: number): void {
    this.track('package_selected', {
      package_id: packageId,
      price,
      racket_count: racketCount,
      currency: 'USD',
    })
  }

  // Schedule Flow Events
  scheduleStepComplete(step: number, data: Record<string, any>): void {
    this.track(`schedule_step_${step}_complete`, {
      step_name: ['service', 'racket', 'pickup', 'review'][step - 1],
      ...data,
    })
  }

  // Checkout Events
  checkoutInitiated(value: number, items: EcommerceItem[]): void {
    this.track('checkout_initiated', {
      value,
      currency: 'USD',
      items,
    })

    // Also fire GA4 Enhanced Ecommerce event
    this.track('begin_checkout', {
      value,
      currency: 'USD',
      items,
    })
  }

  // Purchase Event (called from confirmation page)
  purchase(transactionId: string, value: number, items: EcommerceItem[]): void {
    this.track('purchase', {
      transaction_id: transactionId,
      value,
      currency: 'USD',
      items,
    })
  }

  // Membership Events
  membershipViewed(source: string): void {
    this.track('membership_viewed', {
      source, // 'nav', 'hero_cta', 'homepage_section', 'exit_intent'
    })
  }

  membershipCalculatorUsed(ordersPerMonth: number, selectedPlan: string, savings: number): void {
    this.track('membership_calculator_used', {
      orders_per_month: ordersPerMonth,
      selected_plan: selectedPlan,
      monthly_savings: savings,
    })
  }

  // Exit Intent Events
  exitIntentShown(): void {
    this.track('exit_intent_shown', {
      page_path: window.location.pathname,
    })
  }

  exitIntentEmailCaptured(email: string): void {
    this.track('exit_intent_email_captured', {
      page_path: window.location.pathname,
      // Don't send actual email to GA4 for privacy
      email_domain: email.split('@')[1] || 'unknown',
    })
  }

  // Shop Events
  shopAddToCart(item: EcommerceItem): void {
    this.track('add_to_cart', {
      currency: 'USD',
      value: item.price * item.quantity,
      items: [item],
    })
  }

  // A/B Test Exposure Tracking
  experimentViewed(experimentId: string, variantId: string): void {
    this.track('experiment_viewed', {
      experiment_id: experimentId,
      variant_id: variantId,
    })
  }
}

export const analytics = new Analytics()

