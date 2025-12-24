'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ShoppingBag, Award, Grip, Droplets } from 'lucide-react'
import Image from 'next/image'

const stringProducts = [
  {
    id: '1',
    name: 'Luxilon ALU Power 125',
    brand: 'Luxilon',
    price: 24.95,
    category: 'Polyester',
    tags: ['Control', 'Spin', 'Durability'],
    description: 'The tour pro favorite. Ultimate control and spin potential.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    affiliate_url: 'https://www.tennis-warehouse.com/Luxilon_ALU_Power_125_String/descpageRCLUX-LAP125.html',
    why_choose: 'Best for advanced players seeking maximum control and spin. Used by top ATP/WTA pros.',
  },
  {
    id: '2',
    name: 'Wilson Velocity MLT 16',
    brand: 'Wilson',
    price: 17.95,
    category: 'Multifilament',
    tags: ['Power', 'Comfort', 'Value'],
    description: 'Perfect all-around string with great feel and power.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    affiliate_url: 'https://www.tennis-warehouse.com/Wilson_Velocity_MLT_16_String/descpageRCWIL-WVMLT16.html',
    why_choose: 'Ideal for intermediate players. Great balance of power, comfort, and durability.',
  },
  {
    id: '3',
    name: 'Babolat RPM Blast 17',
    brand: 'Babolat',
    price: 21.95,
    category: 'Polyester',
    tags: ['Spin', 'Control', 'Tour'],
    description: 'Maximum spin and bite for aggressive baseliners.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    affiliate_url: 'https://www.tennis-warehouse.com/Babolat_RPM_Blast_17_String/descpageRCBAB-RPMB17.html',
    why_choose: 'Best for heavy topspin players. Rafael Nadal\'s choice. Incredible bite on the ball.',
  },
  {
    id: '4',
    name: 'Wilson NXT 16',
    brand: 'Wilson',
    price: 19.95,
    category: 'Multifilament',
    tags: ['Comfort', 'Feel', 'Arm-Friendly'],
    description: 'The most arm-friendly multifilament available.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    affiliate_url: 'https://www.tennis-warehouse.com/Wilson_NXT_16_String/descpageRCWIL-WNXT16.html',
    why_choose: 'Perfect for players with arm issues. Soft feel without sacrificing too much performance.',
  },
  {
    id: '5',
    name: 'Solinco Hyper-G 17',
    brand: 'Solinco',
    price: 17.95,
    category: 'Polyester',
    tags: ['Spin', 'Durability', 'Value'],
    description: 'Best value polyester. Great spin and durability.',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    affiliate_url: 'https://www.tennis-warehouse.com/Solinco_Hyper-G_17_String/descpageRCSOL-SHYG17.html',
    why_choose: 'Excellent choice for spin-oriented players on a budget. Tour-level performance at a value price.',
  },
]

const accessories = [
  {
    id: 'g1',
    name: 'Wilson Pro Overgrip 12-Pack',
    price: 16.95,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    affiliate_url: 'https://www.tennis-warehouse.com/Wilson_Pro_Overgrip_12_Pack/descpageWIL-WPO12.html',
    category: 'Overgrips',
  },
  {
    id: 'g2',
    name: 'Tourna Grip Original XL 10-Pack',
    price: 19.95,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    affiliate_url: 'https://www.tennis-warehouse.com/Tourna_Grip_Original_XL_10_Pack/descpageTOU-TGOXL10.html',
    category: 'Overgrips',
  },
  {
    id: 'd1',
    name: 'Wilson Vibration Dampener',
    price: 4.95,
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400',
    affiliate_url: 'https://www.tennis-warehouse.com/Wilson_Vibration_Dampener/descpageWIL-WVDAMP.html',
    category: 'Dampeners',
  },
]

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white pt-24">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-racket-black to-racket-charcoal text-white">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex p-4 bg-white/10 rounded-full mb-6">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Racket Rescue Pro Shop
            </h1>
            <p className="text-2xl text-white/80 max-w-3xl mx-auto">
              Expert-picked strings and gear from Tennis Warehouse
            </p>
          </motion.div>
        </div>
      </section>

      {/* Strings Section */}
      <section className="py-24 bg-racket-lightgray">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-racket-black mb-4">Premium Strings</h2>
            <p className="text-xl text-racket-gray">
              Hand-selected by our expert stringers. Order with your service or buy to bring in.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stringProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 25px 60px rgba(0,0,0,0.15)" }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="text-sm text-racket-gray mb-2">{product.brand}</div>
                  <h3 className="text-xl font-bold text-racket-black mb-2">
                    {product.name}
                  </h3>
                  <p className="text-racket-gray text-sm mb-4 min-h-[40px]">
                    {product.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center bg-racket-red/10 text-racket-red px-3 py-1 rounded-full text-xs font-bold"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Why Choose */}
                  <div className="p-4 bg-racket-blue/10 rounded-xl mb-4">
                    <div className="text-xs font-bold text-racket-gray mb-1">WHY CHOOSE THIS:</div>
                    <p className="text-sm text-racket-black">{product.why_choose}</p>
                  </div>

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-racket-red">
                      ${product.price}
                    </div>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      href={product.affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-racket-red text-white px-6 py-3 rounded-full font-bold hover:bg-red-600 transition-colors"
                    >
                      Buy Now
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessories Section */}
      <section className="py-24 bg-white">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-racket-black mb-4">Accessories & Gear</h2>
            <p className="text-xl text-racket-gray">
              Essential accessories for your racket maintenance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {accessories.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-racket-red/30 transition-all"
              >
                <div className="relative h-40 bg-gray-50">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <div className="p-6">
                  <div className="text-xs text-racket-gray mb-2 uppercase tracking-wide">
                    {product.category}
                  </div>
                  <h3 className="font-bold text-lg text-racket-black mb-4">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-racket-red">
                      ${product.price}
                    </span>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      href={product.affiliate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-racket-black text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-racket-charcoal transition-colors"
                    >
                      Buy
                      <ExternalLink className="w-4 h-4" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Disclaimer */}
      <section className="py-16 bg-racket-lightgray">
        <div className="container-racket max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-10 shadow-lg"
          >
            <Award className="w-12 h-12 text-racket-red mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-racket-black mb-4">
              Expert-Curated Selection
            </h3>
            <p className="text-lg text-racket-gray leading-relaxed">
              Every product in our shop has been personally tested and recommended by our team. 
              We only feature gear we trust and use ourselves. Your purchase helps support Laguna Beach tennis programs.
            </p>
            <p className="text-sm text-racket-gray mt-6 italic">
              As an authorized Tennis Warehouse affiliate, we earn a small commission on purchases at no extra cost to you.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
}

