'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Star,
  ShoppingCart,
  Filter,
  Search,
  ChevronDown,
  Package,
  Truck,
  Shield,
  Tag,
  Check,
  Heart,
  CircleDot,
  Grip,
  Layers
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
  badgeColor?: string
  description: string
  memberDiscount?: number
  inStock: boolean
  featured?: boolean
}

const categories = [
  { id: 'all', name: 'All Products', icon: Package },
  { id: 'strings', name: 'Strings', icon: CircleDot },
  { id: 'grips', name: 'Grips & Overgrips', icon: Grip },
  { id: 'accessories', name: 'Accessories', icon: Layers },
  { id: 'rackets', name: 'Rackets', icon: Package },
]

const products: Product[] = [
  // Strings
  {
    id: 'luxilon-alu-power',
    name: 'ALU Power 125',
    brand: 'Luxilon',
    category: 'strings',
    price: 18,
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1617083934551-ac1f1c732bc5?w=400&h=400&fit=crop',
    badge: 'Best Seller',
    badgeColor: 'bg-racket-red',
    description: 'The choice of ATP pros. Exceptional spin and control.',
    memberDiscount: 15,
    inStock: true,
    featured: true,
  },
  {
    id: 'babolat-rpm-blast',
    name: 'RPM Blast 17',
    brand: 'Babolat',
    category: 'strings',
    price: 16,
    rating: 4.8,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1617083934551-ac1f1c732bc5?w=400&h=400&fit=crop',
    badge: 'Pro Choice',
    badgeColor: 'bg-blue-600',
    description: 'Nadal\'s string. Maximum spin potential and durability.',
    memberDiscount: 15,
    inStock: true,
  },
  {
    id: 'wilson-nxt',
    name: 'NXT 17',
    brand: 'Wilson',
    category: 'strings',
    price: 22,
    originalPrice: 26,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1617083934551-ac1f1c732bc5?w=400&h=400&fit=crop',
    badge: 'Sale',
    badgeColor: 'bg-green-600',
    description: 'Premium multifilament. Exceptional feel and comfort.',
    memberDiscount: 15,
    inStock: true,
  },
  {
    id: 'technifibre-x-one',
    name: 'X-One Biphase 17',
    brand: 'Tecnifibre',
    category: 'strings',
    price: 19,
    rating: 4.6,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1617083934551-ac1f1c732bc5?w=400&h=400&fit=crop',
    description: 'Arm-friendly multifilament with excellent power.',
    memberDiscount: 15,
    inStock: true,
  },
  {
    id: 'solinco-hyper-g',
    name: 'Hyper-G 17',
    brand: 'Solinco',
    category: 'strings',
    price: 14,
    rating: 4.8,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1617083934551-ac1f1c732bc5?w=400&h=400&fit=crop',
    badge: 'Value Pick',
    badgeColor: 'bg-purple-600',
    description: 'Outstanding spin and control at an unbeatable price.',
    memberDiscount: 15,
    inStock: true,
  },
  // Grips
  {
    id: 'tourna-grip',
    name: 'Original Dry Feel',
    brand: 'Tourna Grip',
    category: 'grips',
    price: 12,
    rating: 4.9,
    reviews: 312,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
    badge: 'Fan Favorite',
    badgeColor: 'bg-racket-red',
    description: '10-pack. The ultimate dry overgrip for sweaty hands.',
    memberDiscount: 10,
    inStock: true,
    featured: true,
  },
  {
    id: 'wilson-pro-overgrip',
    name: 'Pro Overgrip',
    brand: 'Wilson',
    category: 'grips',
    price: 8,
    rating: 4.7,
    reviews: 245,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
    description: '3-pack. Thin, tacky feel. The standard for pros.',
    memberDiscount: 10,
    inStock: true,
  },
  {
    id: 'babolat-vs-grip',
    name: 'VS Original Grip',
    brand: 'Babolat',
    category: 'grips',
    price: 15,
    rating: 4.8,
    reviews: 134,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
    description: '3-pack. Super tacky. Excellent absorption.',
    memberDiscount: 10,
    inStock: true,
  },
  {
    id: 'head-xtreme-soft',
    name: 'Xtreme Soft Overgrip',
    brand: 'HEAD',
    category: 'grips',
    price: 10,
    rating: 4.6,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
    description: '12-pack. Soft cushioning with excellent tackiness.',
    memberDiscount: 10,
    inStock: true,
  },
  // Accessories
  {
    id: 'vibration-dampener',
    name: 'Pro Damp (2-pack)',
    brand: 'Wilson',
    category: 'accessories',
    price: 5,
    rating: 4.5,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1622279457486-62dbd1f4d48d?w=400&h=400&fit=crop',
    description: 'Classic round dampener. Reduces string vibration.',
    memberDiscount: 10,
    inStock: true,
  },
  {
    id: 'lead-tape',
    name: 'Lead Tape 1/4"',
    brand: 'Gamma',
    category: 'accessories',
    price: 8,
    rating: 4.7,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1622279457486-62dbd1f4d48d?w=400&h=400&fit=crop',
    description: 'Add weight to customize your racket balance.',
    memberDiscount: 10,
    inStock: true,
  },
  {
    id: 'stencil-ink',
    name: 'String Stencil Ink',
    brand: 'Racket Rescue',
    category: 'accessories',
    price: 6,
    rating: 4.8,
    reviews: 45,
    image: 'https://images.unsplash.com/photo-1622279457486-62dbd1f4d48d?w=400&h=400&fit=crop',
    badge: 'Our Brand',
    badgeColor: 'bg-racket-red',
    description: 'Make your strings pop with brand logo stenciling.',
    memberDiscount: 20,
    inStock: true,
  },
  {
    id: 'racket-bag',
    name: 'Pro Tour 6-Pack Bag',
    brand: 'Wilson',
    category: 'accessories',
    price: 89,
    originalPrice: 120,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=400&fit=crop',
    badge: '26% Off',
    badgeColor: 'bg-green-600',
    description: 'Holds 6 rackets. Thermal protection. Multiple pockets.',
    memberDiscount: 15,
    inStock: true,
    featured: true,
  },
  // Rackets
  {
    id: 'wilson-clash-100',
    name: 'Clash 100 v2',
    brand: 'Wilson',
    category: 'rackets',
    price: 249,
    originalPrice: 279,
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1617083934551-ac1f1c732bc5?w=400&h=400&fit=crop',
    badge: 'Top Rated',
    badgeColor: 'bg-racket-red',
    description: 'The most flexible racket ever. Perfect for all levels.',
    memberDiscount: 10,
    inStock: true,
    featured: true,
  },
  {
    id: 'babolat-pure-aero',
    name: 'Pure Aero 2023',
    brand: 'Babolat',
    category: 'rackets',
    price: 229,
    rating: 4.8,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1617083934551-ac1f1c732bc5?w=400&h=400&fit=crop',
    badge: 'Spin King',
    badgeColor: 'bg-blue-600',
    description: 'Nadal\'s weapon. Maximum spin and power.',
    memberDiscount: 10,
    inStock: true,
  },
  {
    id: 'head-speed-mp',
    name: 'Speed MP',
    brand: 'HEAD',
    category: 'rackets',
    price: 219,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1617083934551-ac1f1c732bc5?w=400&h=400&fit=crop',
    description: 'Djokovic\'s choice. Precision and control.',
    memberDiscount: 10,
    inStock: true,
  },
]

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest' },
]

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [searchQuery, setSearchQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = products
    .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
    .filter(p =>
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return a.price - b.price
        case 'price-high': return b.price - a.price
        case 'rating': return b.rating - a.rating
        default: return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
      }
    })

  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-racket-black to-racket-charcoal text-white">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-racket-red/20 text-racket-red px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Tag className="w-4 h-4" />
              MEMBERS SAVE UP TO 20%
            </div>
            <h1 className="font-headline text-5xl md:text-7xl font-bold mb-6">
              Pro Shop
            </h1>
            <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto">
              Premium strings, grips, accessories & rackets. All curated by our USRSA certified team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-6 bg-racket-lightgray border-b border-gray-200">
        <div className="container-racket">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { icon: Truck, text: 'Free Shipping $50+' },
              { icon: Shield, text: 'Satisfaction Guaranteed' },
              { icon: Package, text: 'Same-Day Local Pickup' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3 text-racket-gray">
                <div className="w-10 h-10 bg-gradient-to-br from-racket-red to-red-600 rounded-xl flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-white" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Shop Area */}
      <section className="py-12">
        <div className="container-racket">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <div className="sticky top-32 space-y-8">
                {/* Categories */}
                <div>
                  <h3 className="font-bold text-racket-black mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => {
                      const Icon = cat.icon
                      const count = cat.id === 'all'
                        ? products.length
                        : products.filter(p => p.category === cat.id).length
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                            selectedCategory === cat.id
                              ? 'bg-racket-red text-white'
                              : 'bg-racket-lightgray hover:bg-gray-200 text-racket-gray'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{cat.name}</span>
                          </div>
                          <span className={`text-sm ${selectedCategory === cat.id ? 'text-white/80' : 'text-racket-gray/60'}`}>
                            {count}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Member Promo */}
                <div className="bg-gradient-to-br from-racket-red to-red-600 rounded-2xl p-6 text-white">
                  <h4 className="font-bold text-lg mb-2">Members Save More!</h4>
                  <p className="text-sm text-white/80 mb-4">
                    Up to 20% off all products plus free stringing labor.
                  </p>
                  <Link
                    href="/membership"
                    className="inline-flex items-center gap-2 bg-white text-racket-red px-4 py-2 rounded-full font-bold text-sm hover:bg-gray-100 transition-colors"
                  >
                    Join Now
                  </Link>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Search & Sort Bar */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-racket-gray" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none"
                  />
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-gray-300"
                >
                  <Filter className="w-5 h-5" />
                  <span>Filters</span>
                </button>

                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none w-full sm:w-48 pl-4 pr-10 py-3 border-2 border-gray-200 rounded-xl focus:border-racket-red focus:outline-none cursor-pointer"
                  >
                    {sortOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-racket-gray pointer-events-none" />
                </div>
              </div>

              {/* Mobile Categories */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden mb-8 overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 p-4 bg-racket-lightgray rounded-xl">
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`px-4 py-2 rounded-full font-medium transition-all ${
                          selectedCategory === cat.id
                            ? 'bg-racket-red text-white'
                            : 'bg-white text-racket-gray hover:bg-gray-100'
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Results Count */}
              <div className="mb-6">
                <p className="text-racket-gray">
                  Showing <span className="font-bold text-racket-black">{filteredProducts.length}</span> products
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="group bg-white border-2 border-gray-100 rounded-2xl overflow-hidden hover:border-racket-red/30 hover:shadow-xl transition-all"
                  >
                    {/* Image */}
                    <div className="relative aspect-square bg-racket-lightgray overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-6xl">
                        🎾
                      </div>

                      {/* Badges */}
                      {product.badge && (
                        <div className={`absolute top-3 left-3 ${product.badgeColor} text-white px-3 py-1 rounded-full text-xs font-bold`}>
                          {product.badge}
                        </div>
                      )}

                      {/* Wishlist */}
                      <button className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                        <Heart className="w-5 h-5 text-racket-gray hover:text-racket-red transition-colors" />
                      </button>

                      {/* Quick Add */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-full bg-racket-red text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-red-600 transition-colors">
                          <ShoppingCart className="w-5 h-5" />
                          Add to Cart
                        </button>
                      </div>
                    </div>

                    {/* Details */}
                    <div className="p-5">
                      <div className="text-sm text-racket-gray font-medium mb-1">{product.brand}</div>
                      <h3 className="font-bold text-racket-black mb-2 group-hover:text-racket-red transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-racket-gray mb-3 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="font-bold text-sm">{product.rating}</span>
                        </div>
                        <span className="text-sm text-racket-gray">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-black text-racket-red">${product.price}</span>
                            {product.originalPrice && (
                              <span className="text-sm text-racket-gray line-through">${product.originalPrice}</span>
                            )}
                          </div>
                          {product.memberDiscount && (
                            <div className="text-xs text-green-600 font-medium">
                              Members: ${(product.price * (1 - product.memberDiscount / 100)).toFixed(0)} (-{product.memberDiscount}%)
                            </div>
                          )}
                        </div>
                        {product.inStock ? (
                          <div className="flex items-center gap-1 text-green-600 text-sm">
                            <Check className="w-4 h-4" />
                            <span>In Stock</span>
                          </div>
                        ) : (
                          <span className="text-red-500 text-sm">Out of Stock</span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Empty State */}
              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="font-bold text-xl text-racket-black mb-2">No products found</h3>
                  <p className="text-racket-gray mb-6">Try adjusting your search or filters</p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setSelectedCategory('all')
                    }}
                    className="inline-flex items-center gap-2 bg-racket-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition-colors"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stringing Service CTA */}
      <section className="py-16 bg-gradient-to-br from-racket-black to-racket-charcoal text-white">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-headline text-3xl md:text-4xl font-bold mb-4">
              Need Your Strings Installed?
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Buy strings from us and add professional stringing for just $25 (members: FREE).
              We'll pick up, string, and deliver — usually within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/schedule"
                className="inline-flex items-center justify-center gap-2 bg-racket-red text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-colors shadow-xl"
              >
                Schedule Stringing
              </Link>
              <Link
                href="/membership"
                className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur border-2 border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/30 transition-colors"
              >
                Become a Member
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
