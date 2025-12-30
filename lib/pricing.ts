// Centralized pricing configuration
// Update prices here - they will propagate throughout the app

export const PRICING = {
  // Service labor
  services: {
    match_ready: 35,
    pro_performance: 50,
  },

  // Add-ons
  addOns: {
    express: 15,
    regrip: 10,
    overgrip: 3,
    dampener: 5,
    dampenerBundle: 7, // Overgrip + dampener combo
  },

  // Pickup & delivery
  delivery: {
    pickupFee: 15, // Waived for members
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

  // Homepage packages (bundles with string included)
  packages: {
    starter: {
      price: 52,
      service: 'match_ready',
      stringPrice: 17, // Wilson Velocity MLT
    },
    pro: {
      price: 75,
      service: 'pro_performance',
      stringPrice: 25, // Luxilon/RPM Blast
    },
  },
} as const

// Helper to calculate total order price
export function calculateOrderTotal(
  servicePackage: 'match_ready' | 'pro_performance',
  options: {
    stringPrice?: number
    customerProvidesString?: boolean
    isExpress?: boolean
    addRegrip?: boolean
    addOvergrip?: boolean
    addDampener?: boolean
    dampenerBundle?: boolean
    secondRacket?: boolean
    isMember?: boolean
    membershipTier?: 'standard' | 'pro'
  } = {}
) {
  const serviceLabor = PRICING.services[servicePackage]
  const stringPrice = options.customerProvidesString ? 0 : (options.stringPrice || 0)
  const expressFee = options.isExpress ? PRICING.addOns.express : 0
  const regripFee = options.addRegrip ? PRICING.addOns.regrip : 0

  let overGripFee = 0
  let dampenerFee = 0
  if (options.dampenerBundle) {
    dampenerFee = PRICING.addOns.dampenerBundle
  } else {
    overGripFee = options.addOvergrip ? PRICING.addOns.overgrip : 0
    dampenerFee = options.addDampener ? PRICING.addOns.dampener : 0
  }

  const secondRacketFee = options.secondRacket ? serviceLabor : 0

  // Apply membership discount
  let laborDiscount = 0
  if (options.isMember && options.membershipTier) {
    laborDiscount = serviceLabor * PRICING.membership[options.membershipTier].laborDiscount
  }

  // Pickup fee (waived for members)
  const pickupFee = options.isMember ? 0 : PRICING.delivery.pickupFee

  const subtotal = serviceLabor + stringPrice + expressFee + regripFee + overGripFee + dampenerFee + secondRacketFee - laborDiscount
  const total = subtotal + pickupFee

  return {
    serviceLabor,
    stringPrice,
    expressFee,
    regripFee,
    overGripFee,
    dampenerFee,
    secondRacketFee,
    laborDiscount,
    pickupFee,
    subtotal,
    total,
  }
}
