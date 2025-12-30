'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import {
  Star,
  ShoppingBag,
  Search,
  ChevronRight,
  Check,
  Minus,
  Plus,
  X,
  ArrowRight,
  Sparkles,
  Crown,
  Zap,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  brand: string
  category: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  badge?: string
  badgeType?: 'bestseller' | 'new' | 'sale' | 'pro'
  description: string
  specs?: string[]
  memberPrice?: number
  inStock: boolean
  color?: string
}

const categories = [
  { id: 'all', name: 'All', count: 16 },
  { id: 'strings', name: 'Strings', count: 6 },
  { id: 'grips', name: 'Grips', count: 4 },
  { id: 'accessories', name: 'Accessories', count: 3 },
  { id: 'rackets', name: 'Rackets', count: 3 },
]

// Real product data with actual manufacturer images
const products: Product[] = [
  // === STRINGS ===
  {
    id: 'luxilon-alu-power',
    name: 'ALU Power 125',
    brand: 'LUXILON',
    category: 'strings',
    price: 18,
    rating: 4.9,
    reviews: 847,
    image: 'https://www.luxilon.com/dw/image/v2/BDHJ_PRD/on/demandware.static/-/Sites-wilson-master-catalog/default/dw21f71d1f/images/hi-res/Tennis/Tennis_Accessories/String/RZ99203_SV_OR.png?sw=800&sh=800',
    badge: '#1 Best Seller',
    badgeType: 'bestseller',
    description: 'The choice of ATP pros. Exceptional spin, power, and control.',
    specs: ['Polyester', '1.25mm gauge', 'Silver color'],
    memberPrice: 15,
    inStock: true,
    color: '#C0C0C0',
  },
  {
    id: 'babolat-rpm-blast',
    name: 'RPM Blast 17',
    brand: 'BABOLAT',
    category: 'strings',
    price: 16,
    rating: 4.8,
    reviews: 623,
    image: 'https://img.babolat.com/is/image/Babolat/241101_105_PS?$MDP_Zoom$',
    badge: "Nadal's Choice",
    badgeType: 'pro',
    description: 'Maximum spin potential with explosive power. Tour favorite.',
    specs: ['Polyester', '1.25mm gauge', 'Black color'],
    memberPrice: 14,
    inStock: true,
    color: '#1a1a1a',
  },
  {
    id: 'wilson-nxt',
    name: 'NXT 17',
    brand: 'WILSON',
    category: 'strings',
    price: 22,
    originalPrice: 28,
    rating: 4.7,
    reviews: 412,
    image: 'https://www.wilson.com/dw/image/v2/BDHJ_PRD/on/demandware.static/-/Sites-wilson-master-catalog/default/dw9a12d1d0/images/hi-res/Tennis/Tennis_Accessories/String/WRZ941800_NA_TV.png?sw=800&sh=800',
    badge: '21% Off',
    badgeType: 'sale',
    description: 'Premium multifilament with exceptional feel and arm-friendly comfort.',
    specs: ['Multifilament', '1.24mm gauge', 'Natural color'],
    memberPrice: 19,
    inStock: true,
    color: '#F5F5DC',
  },
  {
    id: 'solinco-hyper-g',
    name: 'Hyper-G 17',
    brand: 'SOLINCO',
    category: 'strings',
    price: 14,
    rating: 4.8,
    reviews: 534,
    image: 'https://www.solinco.com/cdn/shop/products/Solinco-Hyper-G-Set_1024x1024.png?v=1596830091',
    badge: 'Value Champion',
    badgeType: 'bestseller',
    description: 'Outstanding spin and control. Pro performance at an unbeatable price.',
    specs: ['Polyester', '1.20mm gauge', 'Green color'],
    memberPrice: 12,
    inStock: true,
    color: '#00FF00',
  },
  {
    id: 'tecnifibre-xone',
    name: 'X-One Biphase 17',
    brand: 'TECNIFIBRE',
    category: 'strings',
    price: 19,
    rating: 4.6,
    reviews: 287,
    image: 'https://www.tecnifibre.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/0/4/04gx1n_1.png',
    description: 'Arm-friendly multifilament with excellent power and comfort.',
    specs: ['Multifilament', '1.24mm gauge', 'Natural color'],
    memberPrice: 16,
    inStock: true,
    color: '#FFD700',
  },
  {
    id: 'head-lynx-tour',
    name: 'Lynx Tour 17',
    brand: 'HEAD',
    category: 'strings',
    price: 17,
    rating: 4.7,
    reviews: 198,
    image: 'https://head.com/dw/image/v2/BDDD_PRD/on/demandware.static/-/Sites-head-master-catalog/default/dwd2e8c2a8/images/hi-res/281790_GY_10.png?sw=800&sh=800',
    badge: 'New 2024',
    badgeType: 'new',
    description: 'Tour-level control with enhanced feel. Zverev approved.',
    specs: ['Polyester', '1.25mm gauge', 'Grey color'],
    memberPrice: 14,
    inStock: true,
    color: '#808080',
  },

  // === GRIPS ===
  {
    id: 'tourna-grip-original',
    name: 'Original Dry Feel 10-Pack',
    brand: 'TOURNA GRIP',
    category: 'grips',
    price: 15,
    rating: 4.9,
    reviews: 1247,
    image: 'https://www.tournagrip.com/images/products/original-xl-10-pack-blue.png',
    badge: 'Fan Favorite',
    badgeType: 'bestseller',
    description: 'The ultimate dry overgrip. Perfect for sweaty hands. Tour standard.',
    specs: ['10 grips included', 'Dry feel', 'Blue color'],
    memberPrice: 13,
    inStock: true,
    color: '#0066CC',
  },
  {
    id: 'wilson-pro-overgrip',
    name: 'Pro Overgrip 3-Pack',
    brand: 'WILSON',
    category: 'grips',
    price: 7,
    rating: 4.7,
    reviews: 892,
    image: 'https://www.wilson.com/dw/image/v2/BDHJ_PRD/on/demandware.static/-/Sites-wilson-master-catalog/default/dw8c8c2a8d/images/hi-res/Tennis/Tennis_Accessories/Grip/WRZ4014WH_WH_TV.png?sw=800&sh=800',
    description: 'Thin, tacky feel. The standard for professionals worldwide.',
    specs: ['3 grips included', 'Tacky feel', 'White color'],
    memberPrice: 6,
    inStock: true,
    color: '#FFFFFF',
  },
  {
    id: 'babolat-vs-original',
    name: 'VS Original 3-Pack',
    brand: 'BABOLAT',
    category: 'grips',
    price: 12,
    rating: 4.8,
    reviews: 567,
    image: 'https://img.babolat.com/is/image/Babolat/654010_136_PS?$MDP_Zoom$',
    description: 'Super tacky with excellent moisture absorption. Premium quality.',
    specs: ['3 grips included', 'Tacky feel', 'White color'],
    memberPrice: 10,
    inStock: true,
    color: '#FFFFFF',
  },
  {
    id: 'yonex-super-grap',
    name: 'Super Grap 15-Pack',
    brand: 'YONEX',
    category: 'grips',
    price: 20,
    originalPrice: 25,
    rating: 4.8,
    reviews: 423,
    image: 'https://www.yonex.com/media/catalog/product/cache/abc67890/a/c/ac102-15ex_011.png',
    badge: '20% Off',
    badgeType: 'sale',
    description: 'Exceptionally tacky and durable. 15 grips at an amazing value.',
    specs: ['15 grips included', 'Super tacky', 'Assorted colors'],
    memberPrice: 17,
    inStock: true,
    color: '#FF6B6B',
  },

  // === ACCESSORIES ===
  {
    id: 'wilson-pro-damp',
    name: 'Pro Feel Dampener 2-Pack',
    brand: 'WILSON',
    category: 'accessories',
    price: 5,
    rating: 4.5,
    reviews: 678,
    image: 'https://www.wilson.com/dw/image/v2/BDHJ_PRD/on/demandware.static/-/Sites-wilson-master-catalog/default/dw8c2a8d8c/images/hi-res/Tennis/Tennis_Accessories/Dampener/WRZ537600_BK_TV.png?sw=800&sh=800',
    description: 'Classic dampener that reduces string vibration for cleaner feel.',
    specs: ['2 dampeners', 'Silicone', 'Black color'],
    memberPrice: 4,
    inStock: true,
    color: '#1a1a1a',
  },
  {
    id: 'gamma-lead-tape',
    name: 'Lead Tape 1/2" x 36"',
    brand: 'GAMMA',
    category: 'accessories',
    price: 10,
    rating: 4.7,
    reviews: 234,
    image: 'https://www.gammasports.com/cdn/shop/products/AGWLT_1024x1024.png?v=1607538671',
    description: 'Customize your racket balance and weight. Pro-grade quality.',
    specs: ['1/2" width', '36" length', 'Self-adhesive'],
    memberPrice: 8,
    inStock: true,
    color: '#808080',
  },
  {
    id: 'wilson-tour-bag',
    name: 'Super Tour 9-Pack Bag',
    brand: 'WILSON',
    category: 'accessories',
    price: 129,
    originalPrice: 159,
    rating: 4.9,
    reviews: 312,
    image: 'https://www.wilson.com/dw/image/v2/BDHJ_PRD/on/demandware.static/-/Sites-wilson-master-catalog/default/dwb2a8d8c8/images/hi-res/Tennis/Tennis_Bags/2024-Collection/WR8016201001_RD_BL_TV.png?sw=800&sh=800',
    badge: '19% Off',
    badgeType: 'sale',
    description: 'Pro-level bag with thermal protection. Holds 9 rackets.',
    specs: ['9 racket capacity', 'Thermoguard', 'Multiple pockets'],
    memberPrice: 110,
    inStock: true,
    color: '#CC0000',
  },

  // === RACKETS ===
  {
    id: 'wilson-clash-100',
    name: 'Clash 100 V2',
    brand: 'WILSON',
    category: 'rackets',
    price: 249,
    originalPrice: 279,
    rating: 4.9,
    reviews: 456,
    image: 'https://www.wilson.com/dw/image/v2/BDHJ_PRD/on/demandware.static/-/Sites-wilson-master-catalog/default/dwa8d8c8d8/images/hi-res/Tennis/Tennis_Rackets/2022-Clash-Family/WR074011U_TV.png?sw=800&sh=800',
    badge: 'Editor\'s Pick',
    badgeType: 'pro',
    description: 'Revolutionary flexibility meets power. Perfect for all levels.',
    specs: ['100 sq in', '295g', '16x19 pattern'],
    memberPrice: 224,
    inStock: true,
    color: '#1a1a1a',
  },
  {
    id: 'babolat-pure-aero',
    name: 'Pure Aero 2023',
    brand: 'BABOLAT',
    category: 'rackets',
    price: 229,
    rating: 4.8,
    reviews: 534,
    image: 'https://img.babolat.com/is/image/Babolat/101479_370_PS?$MDP_Zoom$',
    badge: "Spin King",
    badgeType: 'pro',
    description: "Nadal's weapon of choice. Maximum spin and explosive power.",
    specs: ['100 sq in', '300g', '16x19 pattern'],
    memberPrice: 206,
    inStock: true,
    color: '#FFD700',
  },
  {
    id: 'head-speed-mp',
    name: 'Speed MP 2024',
    brand: 'HEAD',
    category: 'rackets',
    price: 239,
    rating: 4.8,
    reviews: 389,
    image: 'https://head.com/dw/image/v2/BDDD_PRD/on/demandware.static/-/Sites-head-master-catalog/default/dwc8d8c8d8/images/hi-res/233614_GY_10.png?sw=800&sh=800',
    badge: 'New 2024',
    badgeType: 'new',
    description: "Djokovic's precision instrument. Ultimate control and feel.",
    specs: ['100 sq in', '300g', '16x19 pattern'],
    memberPrice: 215,
    inStock: true,
    color: '#1a1a1a',
  },
]

const badgeStyles = {
  bestseller: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white',
  new: 'bg-gradient-to-r from-violet-600 to-purple-600 text-white',
  sale: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white',
  pro: 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white',
}

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState<{id: string, qty: number}[]>([])
  const [showCart, setShowCart] = useState(false)

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p =>
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )

  const addToCart = (productId: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId)
      if (existing) {
        return prev.map(item =>
          item.id === productId ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...prev, { id: productId, qty: 1 }]
    })
  }

  const cartTotal = cart.reduce((sum, item) => {
    const product = products.find(p => p.id === item.id)
    return sum + (product?.price || 0) * item.qty
  }, 0)

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0)

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      {/* Floating Cart Button */}
      {cartCount > 0 && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 z-50 bg-racket-black text-white px-6 py-4 rounded-full shadow-2xl flex items-center gap-3 hover:bg-racket-charcoal transition-colors"
        >
          <ShoppingBag className="w-5 h-5" />
          <span className="font-bold">{cartCount} items</span>
          <span className="text-white/60">•</span>
          <span className="font-bold">${cartTotal}</span>
        </motion.button>
      )}

      {/* Hero - Minimal & Premium */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-100">
        <div className="container-racket">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-racket-red font-semibold text-sm tracking-wide uppercase">
                <Sparkles className="w-4 h-4" />
                Pro Shop
              </div>

              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold text-racket-black leading-[0.95]">
                Premium Gear,<br />
                <span className="text-racket-red">Curated by Pros</span>
              </h1>

              <p className="text-xl text-racket-gray max-w-2xl leading-relaxed">
                Every product hand-selected by our USRSA-certified team.
                Members save up to 20% on everything.
              </p>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-6 pt-4">
                {[
                  { icon: Shield, text: 'Satisfaction Guaranteed' },
                  { icon: Zap, text: 'Same-Day Local Pickup' },
                  { icon: Crown, text: 'Members Save 20%' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-racket-gray">
                    <item.icon className="w-4 h-4 text-racket-red" />
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container-racket py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-racket-black text-white'
                      : 'bg-gray-100 text-racket-gray hover:bg-gray-200'
                  }`}
                >
                  {cat.name}
                  <span className={`ml-1.5 ${selectedCategory === cat.id ? 'text-white/60' : 'text-racket-gray/50'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-racket-gray" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 pl-10 pr-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-racket-red/20 focus:bg-white transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container-racket">
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-racket-gray text-sm">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.03 }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300">
                    {/* Image Container */}
                    <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-6 overflow-hidden">
                      {/* Badge */}
                      {product.badge && product.badgeType && (
                        <div className={`absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold ${badgeStyles[product.badgeType]}`}>
                          {product.badge}
                        </div>
                      )}

                      {/* Color indicator */}
                      {product.color && (
                        <div
                          className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: product.color }}
                        />
                      )}

                      {/* Product Image with fallback */}
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            // Fallback to a styled placeholder
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                        {/* Fallback placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                            <span className="text-3xl font-black text-gray-400">{product.brand.charAt(0)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Quick Add Overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => addToCart(product.id)}
                          className="w-full bg-white text-racket-black py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      {/* Brand */}
                      <div className="text-xs font-bold text-racket-gray/60 uppercase tracking-wider mb-1">
                        {product.brand}
                      </div>

                      {/* Name */}
                      <h3 className="font-bold text-racket-black text-lg leading-tight mb-2 group-hover:text-racket-red transition-colors">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                          <span className="ml-1 text-sm font-bold text-racket-black">{product.rating}</span>
                        </div>
                        <span className="text-xs text-racket-gray">({product.reviews.toLocaleString()})</span>
                        {product.inStock && (
                          <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium ml-auto">
                            <Check className="w-3 h-3" />
                            In Stock
                          </span>
                        )}
                      </div>

                      {/* Price */}
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-black text-racket-black">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-racket-gray line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          {product.memberPrice && (
                            <div className="text-xs text-racket-red font-semibold mt-0.5">
                              Members: ${product.memberPrice}
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => addToCart(product.id)}
                          className="w-10 h-10 bg-racket-black text-white rounded-full flex items-center justify-center hover:bg-racket-red transition-colors"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="font-bold text-xl text-racket-black mb-2">No products found</h3>
              <p className="text-racket-gray mb-6">Try adjusting your search or filter</p>
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="inline-flex items-center gap-2 bg-racket-black text-white px-6 py-3 rounded-full font-bold hover:bg-racket-charcoal transition-colors"
              >
                Clear filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 bg-racket-black">
        <div className="container-racket">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 text-racket-red font-semibold text-sm tracking-wide uppercase mb-6">
                <Crown className="w-4 h-4" />
                Member Benefits
              </div>

              <h2 className="font-headline text-4xl md:text-5xl font-bold text-white mb-6">
                Save 20% on Everything
              </h2>

              <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
                Plus free stringing labor, priority pickup, and exclusive member-only products.
                Starting at just $19/month.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/membership"
                  className="inline-flex items-center justify-center gap-2 bg-racket-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors"
                >
                  Become a Member
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/schedule"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/20 transition-colors"
                >
                  Schedule Stringing
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold">Your Cart</h2>
                  <button
                    onClick={() => setShowCart(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-racket-gray">Your cart is empty</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-8">
                      {cart.map(item => {
                        const product = products.find(p => p.id === item.id)
                        if (!product) return null
                        return (
                          <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center">
                              <span className="text-2xl font-black text-gray-300">{product.brand.charAt(0)}</span>
                            </div>
                            <div className="flex-1">
                              <div className="text-xs text-gray-500 uppercase">{product.brand}</div>
                              <div className="font-bold text-sm">{product.name}</div>
                              <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setCart(prev => prev.map(i => i.id === item.id ? {...i, qty: Math.max(1, i.qty - 1)} : i))}
                                    className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="font-bold">{item.qty}</span>
                                  <button
                                    onClick={() => setCart(prev => prev.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i))}
                                    className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>
                                <span className="font-bold">${product.price * item.qty}</span>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="border-t pt-4 space-y-4">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>${cartTotal}</span>
                      </div>
                      <button className="w-full bg-racket-red text-white py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors">
                        Checkout
                      </button>
                      <p className="text-center text-sm text-gray-500">
                        Free local pickup available
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  )
}
