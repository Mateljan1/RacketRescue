// Real Tennis Warehouse String Catalog - Most Popular Strings
// Based on reviews, sales, and pro usage

export interface StringData {
  id: string
  name: string
  brand: string
  price: number
  material: 'polyester' | 'multifilament' | 'natural_gut' | 'synthetic_gut' | 'hybrid'
  gauge: string
  description: string
  bestFor: string[]
  characteristics: {
    power: 1 | 2 | 3 | 4 | 5
    control: 1 | 2 | 3 | 4 | 5
    spin: 1 | 2 | 3 | 4 | 5
    comfort: 1 | 2 | 3 | 4 | 5
    durability: 1 | 2 | 3 | 4 | 5
  }
  tension_range: string
  reviews: number
  rating: number
  tw_url: string
  recommended_for: string[]
}

export const STRINGS_CATALOG: StringData[] = [
  {
    id: 'rpm_blast',
    name: 'RPM Blast',
    brand: 'Babolat',
    price: 21.95,
    material: 'polyester',
    gauge: '17 / 1.25mm',
    description: 'Maximum spin and control. The choice of Rafael Nadal.',
    bestFor: ['Heavy topspin', 'Control', 'Competitive play'],
    characteristics: { power: 2, control: 5, spin: 5, comfort: 2, durability: 4 },
    tension_range: '48-62 lbs',
    reviews: 1247,
    rating: 4.7,
    tw_url: 'https://www.tennis-warehouse.com/Babolat_RPM_Blast_17_String/descpageRCBAB-RPMB17.html',
    recommended_for: ['intermediate', 'advanced', 'pro'],
  },
  {
    id: 'luxilon_alu',
    name: 'ALU Power',
    brand: 'Luxilon',
    price: 24.95,
    material: 'polyester',
    gauge: '16L / 1.25mm',
    description: 'Tour pro favorite. Ultimate control and precision.',
    bestFor: ['Control', 'Precision', 'Tour-level play'],
    characteristics: { power: 2, control: 5, spin: 4, comfort: 2, durability: 5 },
    tension_range: '50-65 lbs',
    reviews: 2156,
    rating: 4.8,
    tw_url: 'https://www.tennis-warehouse.com/Luxilon_ALU_Power_125_String/descpageRCLUX-LAP125.html',
    recommended_for: ['advanced', 'pro'],
  },
  {
    id: 'wilson_nxt',
    name: 'NXT',
    brand: 'Wilson',
    price: 19.95,
    material: 'multifilament',
    gauge: '16 / 1.30mm',
    description: 'Most arm-friendly string. Soft feel with great comfort.',
    bestFor: ['Comfort', 'Arm issues', 'Touch players'],
    characteristics: { power: 4, control: 3, spin: 3, comfort: 5, durability: 3 },
    tension_range: '50-60 lbs',
    reviews: 1834,
    rating: 4.6,
    tw_url: 'https://www.tennis-warehouse.com/Wilson_NXT_16_String/descpageRCWIL-WNXT16.html',
    recommended_for: ['beginner', 'intermediate'],
  },
  {
    id: 'velocity',
    name: 'Velocity MLT',
    brand: 'Wilson',
    price: 17.95,
    material: 'multifilament',
    gauge: '16 / 1.30mm',
    description: 'Great all-around string. Power and comfort at a value price.',
    bestFor: ['All-around play', 'Power', 'Value'],
    characteristics: { power: 4, control: 3, spin: 3, comfort: 4, durability: 3 },
    tension_range: '50-62 lbs',
    reviews: 1623,
    rating: 4.5,
    tw_url: 'https://www.tennis-warehouse.com/Wilson_Velocity_MLT_16_String/descpageRCWIL-WVMLT16.html',
    recommended_for: ['beginner', 'intermediate'],
  },
  {
    id: 'hyper_g',
    name: 'Hyper-G',
    brand: 'Solinco',
    price: 17.95,
    material: 'polyester',
    gauge: '17 / 1.20mm',
    description: 'Best value poly. Great spin and durability.',
    bestFor: ['Spin', 'Durability', 'Value'],
    characteristics: { power: 2, control: 4, spin: 5, comfort: 2, durability: 4 },
    tension_range: '45-60 lbs',
    reviews: 1456,
    rating: 4.6,
    tw_url: 'https://www.tennis-warehouse.com/Solinco_Hyper-G_17_String/descpageRCSOL-SHYG17.html',
    recommended_for: ['intermediate', 'advanced'],
  },
  {
    id: 'touch_vs',
    name: 'Touch VS',
    brand: 'Babolat',
    price: 59.95,
    material: 'natural_gut',
    gauge: '16 / 1.30mm',
    description: 'Premium natural gut. Best feel and power available.',
    bestFor: ['Feel', 'Power', 'Premium performance'],
    characteristics: { power: 5, control: 4, spin: 3, comfort: 5, durability: 2 },
    tension_range: '48-62 lbs',
    reviews: 892,
    rating: 4.9,
    tw_url: 'https://www.tennis-warehouse.com/Babolat_Touch_VS_Natural_Gut_16_String/descpageRCBAB-BTVS16.html',
    recommended_for: ['advanced', 'pro'],
  },
  {
    id: 'nrg2',
    name: 'NRG2',
    brand: 'Tecnifibre',
    price: 21.95,
    material: 'multifilament',
    gauge: '16 / 1.32mm',
    description: 'Premium multifilament. Great power and comfort.',
    bestFor: ['Power', 'Comfort', 'Premium feel'],
    characteristics: { power: 5, control: 3, spin: 3, comfort: 5, durability: 3 },
    tension_range: '48-60 lbs',
    reviews: 734,
    rating: 4.7,
    tw_url: 'https://www.tennis-warehouse.com/Tecnifibre_NRG2_16_String/descpageRCTEC-TNRG216.html',
    recommended_for: ['intermediate', 'advanced'],
  },
  {
    id: 'rpm_hybrid',
    name: 'RPM Blast + Touch VS Hybrid',
    brand: 'Babolat',
    price: 44.95,
    material: 'hybrid',
    gauge: '17 / 1.25mm',
    description: 'Best of both worlds. Poly spin with gut comfort.',
    bestFor: ['Spin + Comfort', 'Advanced players', 'Hybrid enthusiasts'],
    characteristics: { power: 4, control: 4, spin: 5, comfort: 4, durability: 3 },
    tension_range: '50-60 lbs',
    reviews: 456,
    rating: 4.8,
    tw_url: 'https://www.tennis-warehouse.com/Babolat_RPM_Blast_Touch_VS_Hybrid_String/descpageRCBAB-RPMTVSH.html',
    recommended_for: ['advanced', 'pro'],
  },
  {
    id: 'prince_syn_gut',
    name: 'SynGut Duraflex',
    brand: 'Prince',
    price: 7.95,
    material: 'synthetic_gut',
    gauge: '16 / 1.30mm',
    description: 'Best value string. Great all-around playability.',
    bestFor: ['Beginners', 'Value', 'Durability'],
    characteristics: { power: 3, control: 3, spin: 3, comfort: 4, durability: 5 },
    tension_range: '50-65 lbs',
    reviews: 892,
    rating: 4.4,
    tw_url: 'https://www.tennis-warehouse.com/Prince_SynGut_Duraflex_16_String/descpageRCPRI-PSGDF16.html',
    recommended_for: ['beginner'],
  },
  {
    id: 'poly_tour_pro',
    name: 'Poly Tour Pro',
    brand: 'Yonex',
    price: 19.95,
    material: 'polyester',
    gauge: '16 / 1.25mm',
    description: 'Soft poly with great spin and comfort.',
    bestFor: ['Spin', 'Soft poly', 'Control'],
    characteristics: { power: 3, control: 4, spin: 5, comfort: 4, durability: 4 },
    tension_range: '45-60 lbs',
    reviews: 678,
    rating: 4.6,
    tw_url: 'https://www.tennis-warehouse.com/Yonex_Poly_Tour_Pro_125_String/descpageRCYON-YPTP125.html',
    recommended_for: ['intermediate', 'advanced'],
  },
  {
    id: 'head_lynx',
    name: 'Lynx Tour',
    brand: 'Head',
    price: 18.95,
    material: 'polyester',
    gauge: '17 / 1.25mm',
    description: 'Snapback poly for maximum spin generation.',
    bestFor: ['Spin', 'Snapback', 'Modern game'],
    characteristics: { power: 3, control: 4, spin: 5, comfort: 3, durability: 4 },
    tension_range: '48-62 lbs',
    reviews: 534,
    rating: 4.5,
    tw_url: 'https://www.tennis-warehouse.com/Head_Lynx_Tour_17_String/descpageRCHEA-HLYT17.html',
    recommended_for: ['intermediate', 'advanced'],
  },
  {
    id: 'gamma_zo',
    name: 'ZO Tour',
    brand: 'Gamma',
    price: 10.95,
    material: 'polyester',
    gauge: '16 / 1.23mm',
    description: 'Budget-friendly poly with good spin and control.',
    bestFor: ['Value', 'Spin', 'Budget-conscious'],
    characteristics: { power: 2, control: 4, spin: 4, comfort: 2, durability: 4 },
    tension_range: '48-60 lbs',
    reviews: 423,
    rating: 4.3,
    tw_url: 'https://www.tennis-warehouse.com/Gamma_ZO_Tour_16_String/descpageRCGAM-GZOT16.html',
    recommended_for: ['beginner', 'intermediate'],
  },
]

// Grip Options
export const GRIP_OPTIONS = [
  { id: 'wilson_pro', name: 'Wilson Pro Overgrip', price: 1.50, tw_url: 'https://www.tennis-warehouse.com/Wilson_Pro_Overgrip/descpageWIL-WPO.html' },
  { id: 'tourna_grip', name: 'Tourna Grip Original', price: 2.25, tw_url: 'https://www.tennis-warehouse.com/Tourna_Grip_Original/descpageTOU-TGO.html' },
  { id: 'yonex_super', name: 'Yonex Super Grap', price: 1.75, tw_url: 'https://www.tennis-warehouse.com/Yonex_Super_Grap_Overgrip/descpageYON-YSGO.html' },
]

// Service Add-ons (no inventory needed!)
export const SERVICE_ADDONS = [
  { id: 'frame_check', name: 'Frame Inspection', price: 5, description: 'Professional inspection for cracks or damage' },
  { id: 'tension_test', name: 'Current Tension Test', price: 3, description: 'Measure your current string tension' },
  { id: 'string_removal', name: 'String Removal Only', price: 8, description: 'Cut out old strings (keep frame unstrung)' },
  { id: 'lead_tape', name: 'Lead Tape Application', price: 12, description: 'Add weight for customization (3/16" tape)' },
  { id: 'leather_grip', name: 'Leather Grip Installation', price: 15, description: 'Premium leather replacement grip' },
  { id: 'grommet_check', name: 'Grommet Inspection', price: 0, description: 'Free inspection for worn grommets' },
]

// Recommend strings based on player profile
export function recommendStrings(profile: {
  level?: string
  style?: string
  priority?: string
  arm_issues?: boolean
  budget?: string
}): StringData[] {
  let filtered = [...STRINGS_CATALOG]

  // Filter by level
  if (profile.level === 'beginner') {
    filtered = filtered.filter(s => s.recommended_for.includes('beginner'))
  } else if (profile.level === 'advanced' || profile.level === 'pro') {
    filtered = filtered.filter(s => s.recommended_for.includes('advanced') || s.recommended_for.includes('pro'))
  }

  // Filter by priority
  if (profile.priority === 'spin') {
    filtered.sort((a, b) => b.characteristics.spin - a.characteristics.spin)
  } else if (profile.priority === 'power') {
    filtered.sort((a, b) => b.characteristics.power - a.characteristics.power)
  } else if (profile.priority === 'control') {
    filtered.sort((a, b) => b.characteristics.control - a.characteristics.control)
  } else if (profile.priority === 'comfort') {
    filtered.sort((a, b) => b.characteristics.comfort - a.characteristics.comfort)
  }

  // Arm issues = prioritize comfort
  if (profile.arm_issues) {
    filtered = filtered.filter(s => s.characteristics.comfort >= 4)
  }

  // Budget
  if (profile.budget === 'value') {
    filtered = filtered.filter(s => s.price < 22)
  } else if (profile.budget === 'premium') {
    filtered = filtered.filter(s => s.price > 22)
  }

  return filtered.slice(0, 3)
}

// Auto-populate racket details based on brand
export const RACKET_PRESETS: Record<string, { models: string[], typical_tension: number }> = {
  Wilson: {
    models: ['Pro Staff 97', 'Blade 98', 'Ultra 100', 'Clash 100'],
    typical_tension: 55,
  },
  Babolat: {
    models: ['Pure Aero', 'Pure Drive', 'Pure Strike'],
    typical_tension: 55,
  },
  Head: {
    models: ['Speed Pro', 'Radical Pro', 'Prestige Pro'],
    typical_tension: 54,
  },
  Yonex: {
    models: ['EZONE 98', 'VCORE 98', 'Percept 97'],
    typical_tension: 52,
  },
  Prince: {
    models: ['Phantom Pro', 'Textreme Tour'],
    typical_tension: 55,
  },
}

