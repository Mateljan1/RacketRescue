'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Target, AlertCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const mockData = [
  { racket: 'Match Racket', string: 'Luxilon ALU', avgDays: 28, lastStrung: '2025-12-10', breaks: 2 },
  { racket: 'Practice Racket', string: 'Wilson Velocity', avgDays: 21, lastStrung: '2025-11-28', breaks: 4 },
]

const durabilityHistory = [
  { month: 'Aug', days: 18 },
  { month: 'Sep', days: 22 },
  { month: 'Oct', days: 26 },
  { month: 'Nov', days: 24 },
  { month: 'Dec', days: 28 },
]

export default function DurabilityPage() {
  return (
    <main className="min-h-screen bg-racket-lightgray pt-24">
      {/* Header */}
      <section className="bg-gradient-to-br from-racket-black to-racket-charcoal text-white py-16">
        <div className="container-racket">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl font-bold mb-4">String Durability Tracker</h1>
            <p className="text-2xl text-white/80">Know when to restring for optimal performance</p>
          </motion.div>
        </div>
      </section>

      <div className="container-racket py-16">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <div className="inline-flex p-4 bg-racket-green/10 rounded-2xl mb-4">
              <TrendingUp className="w-8 h-8 text-racket-green" />
            </div>
            <div className="text-5xl font-bold text-racket-green mb-2">24</div>
            <div className="text-racket-gray">Avg Days Per String</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <div className="inline-flex p-4 bg-racket-blue/10 rounded-2xl mb-4">
              <Calendar className="w-8 h-8 text-racket-blue" />
            </div>
            <div className="text-5xl font-bold text-racket-blue mb-2">Dec 26</div>
            <div className="text-racket-gray">Next Restring Date</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <div className="inline-flex p-4 bg-racket-red/10 rounded-2xl mb-4">
              <Target className="w-8 h-8 text-racket-red" />
            </div>
            <div className="text-5xl font-bold text-racket-red mb-2">6</div>
            <div className="text-racket-gray">String Breaks This Year</div>
          </motion.div>
        </div>

        {/* Durability Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl shadow-2xl p-10 mb-12"
        >
          <h2 className="text-3xl font-bold text-racket-black mb-8">String Lifespan Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={durabilityHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" label={{ value: 'Days', angle: -90, position: 'insideLeft' }} />
                <Tooltip
                  contentStyle={{
                    background: '#fff',
                    border: '2px solid #ec1f27',
                    borderRadius: '12px',
                    padding: '12px',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="days"
                  stroke="#ec1f27"
                  strokeWidth={4}
                  dot={{ fill: '#ec1f27', strokeWidth: 2, r: 6 }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-center text-racket-gray mt-6">
            Your strings are lasting longer! Keep up the consistent restringing schedule.
          </p>
        </motion.div>

        {/* Racket-specific tracking */}
        <div className="grid md:grid-cols-2 gap-8">
          {mockData.map((racket, i) => {
            const daysSince = Math.floor((new Date().getTime() - new Date(racket.lastStrung).getTime()) / (1000 * 60 * 60 * 24))
            const needsRestring = daysSince > 30

            return (
              <motion.div
                key={racket.racket}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                className={`bg-white rounded-3xl shadow-xl p-8 border-4 ${
                  needsRestring ? 'border-racket-orange' : 'border-transparent'
                }`}
              >
                {needsRestring && (
                  <div className="flex items-center gap-2 bg-racket-orange/10 text-racket-orange px-4 py-2 rounded-full text-sm font-bold mb-6 animate-pulse">
                    <AlertCircle className="w-4 h-4" />
                    Time to Restring!
                  </div>
                )}

                <h3 className="text-2xl font-bold text-racket-black mb-6">{racket.racket}</h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-racket-gray mb-1">Current String</div>
                    <div className="font-bold text-racket-black">{racket.string}</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-racket-gray mb-1">Days Since Strung</div>
                    <div className={`text-3xl font-bold ${needsRestring ? 'text-racket-orange' : 'text-racket-green'}`}>
                      {daysSince}
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-racket-gray mb-1">Avg Lifespan</div>
                    <div className="text-2xl font-bold text-racket-black">{racket.avgDays} days</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-xl">
                    <div className="text-sm text-racket-gray mb-1">String Breaks</div>
                    <div className="text-2xl font-bold text-racket-red">{racket.breaks}</div>
                  </div>
                </div>

                {needsRestring && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-6 bg-racket-orange text-white py-4 rounded-full font-bold hover:bg-orange-600 transition-colors"
                  >
                    Reorder Now
                  </motion.button>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-racket-blue/10 border-2 border-racket-blue/30 rounded-3xl p-10 max-w-4xl mx-auto"
        >
          <h2 className="text-2xl font-bold text-racket-black mb-6">Smart Insights</h2>
          <ul className="space-y-4">
            <li className="flex items-start gap-4">
              <div className="p-2 bg-racket-green/20 rounded-lg flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-racket-green" />
              </div>
              <div>
                <p className="font-semibold text-racket-black mb-1">Your strings are lasting 20% longer!</p>
                <p className="text-racket-gray">
                  Consistent restringing is improving durability. Keep it up!
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="p-2 bg-racket-blue/20 rounded-lg flex-shrink-0">
                <Target className="w-5 h-5 text-racket-blue" />
              </div>
              <div>
                <p className="font-semibold text-racket-black mb-1">Poly strings perform best at 3-4 weeks</p>
                <p className="text-racket-gray">
                  Based on your playing frequency, we recommend restringing every 4 weeks.
                </p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </main>
  )
}

