'use client'

import { motion } from 'framer-motion'
import { Gift, Users, Share2, Copy, Check, TrendingUp, DollarSign } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

export default function ReferralsPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = 'RACKET-SARAH-M'
  const referralUrl = `https://racketrescue.com/join/${referralCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const mockReferrals = [
    { name: 'Michael R.', status: 'completed', reward: 10, date: '2025-12-20' },
    { name: 'Jennifer L.', status: 'completed', reward: 10, date: '2025-12-15' },
    { name: 'David K.', status: 'pending', reward: 10, date: '2025-12-22' },
  ]

  const totalEarned = mockReferrals.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.reward, 0)

  return (
    <main className="min-h-screen bg-racket-lightgray pt-24">
      {/* Hero */}
      <section className="bg-gradient-to-br from-racket-red to-red-600 text-white py-20">
        <div className="container-racket text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex p-6 bg-white/20 rounded-full mb-8">
              <Gift className="w-16 h-16" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Give $10, Get $10
            </h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Share Racket Rescue with your tennis friends and you both save!
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container-racket py-16">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Referral Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-2xl p-10"
          >
            <h2 className="text-3xl font-bold text-racket-black mb-8">Your Referral Link</h2>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <div className="text-sm text-racket-gray mb-2">Your personal link:</div>
              <div className="flex items-center gap-3">
                <code className="flex-1 text-lg font-mono text-racket-black break-all">
                  {referralUrl}
                </code>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCopy}
                  className="p-3 bg-racket-red text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                </motion.button>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#25D366] text-white py-4 rounded-full font-bold text-lg hover:bg-[#20BA5A] transition-colors flex items-center justify-center gap-3"
              >
                <Share2 className="w-6 h-6" />
                Share via WhatsApp
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-3"
              >
                <Share2 className="w-6 h-6" />
                Share via Instagram Story
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gray-200 text-racket-black py-4 rounded-full font-bold text-lg hover:bg-gray-300 transition-colors flex items-center justify-center gap-3"
              >
                <Share2 className="w-6 h-6" />
                More Options
              </motion.button>
            </div>
          </motion.div>

          {/* Stats & Tracking */}
          <div className="space-y-8">
            {/* Earnings Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-racket-green to-green-600 text-white rounded-3xl shadow-2xl p-10"
            >
              <div className="flex items-center gap-4 mb-6">
                <DollarSign className="w-12 h-12" />
                <div>
                  <h3 className="text-2xl font-bold">Total Earned</h3>
                  <p className="text-white/80">From referrals</p>
                </div>
              </div>
              <div className="text-6xl font-bold mb-2">${totalEarned}</div>
              <div className="text-white/80 text-lg">Available as credit</div>
            </motion.div>

            {/* Referral List */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-racket-black mb-6">Your Referrals</h3>
              
              <div className="space-y-4">
                {mockReferrals.map((referral, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <div className="font-bold text-racket-black">{referral.name}</div>
                      <div className="text-sm text-racket-gray">
                        {new Date(referral.date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl text-racket-green">
                        ${referral.reward}
                      </div>
                      <div className={`text-xs ${
                        referral.status === 'completed' ? 'text-racket-green' : 'text-racket-orange'
                      }`}>
                        {referral.status === 'completed' ? 'Earned' : 'Pending'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Leaderboard Teaser */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-racket-black text-white rounded-3xl shadow-xl p-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-6 h-6 text-racket-red" />
                <h3 className="text-xl font-bold">This Month's Leaders</h3>
              </div>
              <div className="space-y-3">
                {[
                  { rank: 1, name: 'Sarah M.', referrals: 12 },
                  { rank: 2, name: 'You', referrals: 3, highlight: true },
                  { rank: 3, name: 'Jennifer L.', referrals: 2 },
                ].map((leader) => (
                  <div
                    key={leader.rank}
                    className={`flex items-center justify-between p-4 rounded-xl ${
                      leader.highlight ? 'bg-racket-red/20 ring-2 ring-racket-red' : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                        leader.rank === 1 ? 'bg-yellow-500 text-black' :
                        leader.highlight ? 'bg-racket-red text-white' :
                        'bg-white/10 text-white'
                      }`}>
                        {leader.rank}
                      </div>
                      <span className="font-semibold">{leader.name}</span>
                    </div>
                    <span className="font-bold">{leader.referrals} referrals</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-12"
        >
          <h2 className="text-4xl font-bold text-racket-black mb-12 text-center">
            How It Works
          </h2>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex p-6 bg-racket-red/10 rounded-full mb-6">
                <Share2 className="w-10 h-10 text-racket-red" />
              </div>
              <h3 className="text-xl font-bold text-racket-black mb-3">1. Share Your Link</h3>
              <p className="text-racket-gray">
                Send your personal link to friends via text, email, or social media
              </p>
            </div>

            <div>
              <div className="inline-flex p-6 bg-racket-blue/10 rounded-full mb-6">
                <Users className="w-10 h-10 text-racket-blue" />
              </div>
              <h3 className="text-xl font-bold text-racket-black mb-3">2. They Save $10</h3>
              <p className="text-racket-gray">
                Your friend gets $10 off their first order. No minimum purchase!
              </p>
            </div>

            <div>
              <div className="inline-flex p-6 bg-racket-green/10 rounded-full mb-6">
                <Gift className="w-10 h-10 text-racket-green" />
              </div>
              <h3 className="text-xl font-bold text-racket-black mb-3">3. You Earn $10</h3>
              <p className="text-racket-gray">
                Once they complete their order, you get $10 credit. Unlimited!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}

