// Centralized pricing configuration
// Update prices here - they will propagate throughout the app

export const PRICING = {
  // All-inclusive service packages (includes labor + standard string + pickup)
  services: {
    standard: 55,      // 24-hour turnaround
    rush: 65,          // Same-day turnaround
  },

  // Legacy names for backward compatibility
  serviceLegacy: {
    match_ready: 55,
    pro_performance: 65,
  },

  // Add-ons
  addOns: {
    express: 10,       // Rush upgrade from standard
    regrip: 10,
    overgrip: 3,
    dampener: 5,
    dampenerBundle: 7, // Overgrip + dampener combo
    premiumString: 10, // Upgrade to premium string
  },

  // Pickup & delivery (included in base price, extra for non-service-area)
  delivery: {
    pickupFee: 0, // Now included in base price
    outOfAreaFee: 15, // For addresses outside service area
  },

  // Membership
  membership: {
    standard: {
      monthly: 25,
      laborDiscount: 0.10, // 10% off labor
      freePickup: true,
    },
    pro: {
      monthly: 45,
      laborDiscount: 0.15, // 15% off labor
      freePickup: true,
      priorityService: true,
    },
  },

  // Homepage packages (now all-inclusive)
  packages: {
    standard: {
      price: 55,
      turnaround: '24 hours',
      includes: ['Professional stringing', 'Standard string', 'Free pickup & delivery'],
    },
    rush: {
      price: 65,
      turnaround: 'Same day',
      includes: ['Priority stringing', 'Standard string', 'Free pickup & delivery'],
    },
  },
} as const

// Helper to get service price by package name (handles legacy names)
export function getServicePrice(servicePackage: string): number {
  const packageMap: Record<string, 'standard' | 'rush'> = {
    match_ready: 'standard',
    pro_performance: 'rush',
    standard: 'standard',
    rush: 'rush',
  }
  const normalizedPackage = packageMap[servicePackage] || 'standard'
  return PRICING.services[normalizedPackage]
}

// Helper to calculate total order price (simplified all-inclusive model)
export function calculateOrderTotal(
  servicePackage: 'standard' | 'rush' | 'match_ready' | 'pro_performance',
  options: {
    premiumString?: boolean      // Upgrade to premium string (+$10)
    customerProvidesString?: boolean
    addRegrip?: boolean
    addOvergrip?: boolean
    addDampener?: boolean
    dampenerBundle?: boolean
    secondRacket?: boolean
    isMember?: boolean
    membershipTier?: 'standard' | 'pro'
    outOfServiceArea?: boolean
  } = {}
) {
  // Map legacy names to new names
  const packageMap: Record<string, 'standard' | 'rush'> = {
    match_ready: 'standard',
    pro_performance: 'rush',
    standard: 'standard',
    rush: 'rush',
  }
  const normalizedPackage = packageMap[servicePackage] || 'standard'

  // Base price is all-inclusive ($55 or $65)
  const basePrice = PRICING.services[normalizedPackage]

  // Premium string upgrade
  const premiumStringFee = options.premiumString && !options.customerProvidesString
    ? PRICING.addOns.premiumString
    : 0

  // Customer provides string = $10 discount (they save the string cost)
  const ownStringDiscount = options.customerProvidesString ? 10 : 0

  // Add-ons
  const regripFee = options.addRegrip ? PRICING.addOns.regrip : 0
  let overGripFee = 0
  let dampenerFee = 0
  if (options.dampenerBundle) {
    dampenerFee = PRICING.addOns.dampenerBundle
  } else {
    overGripFee = options.addOvergrip ? PRICING.addOns.overgrip : 0
    dampenerFee = options.addDampener ? PRICING.addOns.dampener : 0
  }

  // Second racket = same base price
  const secondRacketFee = options.secondRacket ? basePrice : 0

  // Apply membership discount (on base price only)
  let memberDiscount = 0
  if (options.isMember && options.membershipTier) {
    memberDiscount = basePrice * PRICING.membership[options.membershipTier].laborDiscount
  }

  // Out of service area fee
  const outOfAreaFee = options.outOfServiceArea ? PRICING.delivery.outOfAreaFee : 0

  const subtotal = basePrice + premiumStringFee - ownStringDiscount + regripFee + overGripFee + dampenerFee + secondRacketFee - memberDiscount
  const total = subtotal + outOfAreaFee

  return {
    basePrice,
    premiumStringFee,
    ownStringDiscount,
    regripFee,
    overGripFee,
    dampenerFee,
    secondRacketFee,
    memberDiscount,
    outOfAreaFee,
    subtotal,
    total,
  }
}
