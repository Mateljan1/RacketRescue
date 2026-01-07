'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, TrendingUp, DollarSign, AlertTriangle, Crown, Download } from 'lucide-react'
import Link from 'next/link'
import type { PlayerProfile } from '@/lib/types/operations'
import { exportPlayers } from '@/lib/utils/export'

export default function PlayersPage() {
  const [players, setPlayers] = useState<PlayerProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'ltv' | 'orders' | 'last_order'>('ltv')

  useEffect(() => {
    fetchPlayers()
  }, [])

  const fetchPlayers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/players')
      const data = await response.json()
      setPlayers(data.players || [])
    } catch (error) {
      console.error('Error fetching players:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPlayers = players
    .filter(p => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        p.name.toLowerCase().includes(query) ||
        p.email.toLowerCase().includes(query) ||
        p.phone?.toLowerCase().includes(query)
      )
    })
    .sort((a, b) => {
      if (sortBy === 'ltv') return b.lifetime_value - a.lifetime_value
      if (sortBy === 'orders') return b.total_orders - a.total_orders
      if (sortBy === 'last_order') {
        const aDate = a.last_order_date ? new Date(a.last_order_date).getTime() : 0
        const bDate = b.last_order_date ? new Date(b.last_order_date).getTime() : 0
        return bDate - aDate
      }
      return 0
    })

  const totalLTV = players.reduce((sum, p) => sum + p.lifetime_value, 0)
  const avgLTV = players.length > 0 ? totalLTV / players.length : 0
  const atRiskCount = players.filter(p => p.churn_risk_score > 0.6).length

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-racket-red border-t-transparent rounded-full" />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Player Profiles</h1>
            <p className="text-gray-600 mt-1">{players.length} total players</p>
          </div>
          <button
            onClick={() => exportPlayers(filteredPlayers)}
            className="flex items-center gap-2 px-4 py-2 bg-racket-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total LTV</span>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">${totalLTV.toFixed(0)}</div>
            <div className="text-sm text-gray-500 mt-1">Avg: ${avgLTV.toFixed(0)}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Players</span>
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{players.length}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">At Risk</span>
              <AlertTriangle className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-orange-600">{atRiskCount}</div>
          </div>
        </div>

        {/* Search & Sort */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-racket-red/20"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-racket-red/20"
            >
              <option value="ltv">Sort by LTV</option>
              <option value="orders">Sort by Orders</option>
              <option value="last_order">Sort by Last Order</option>
            </select>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlayers.map((player) => {
            const tier = player.lifetime_value >= 1000 ? 'Platinum' : 
                        player.lifetime_value >= 500 ? 'Gold' :
                        player.lifetime_value >= 200 ? 'Silver' : 'Bronze'
            const tierColor = {
              Platinum: 'bg-purple-100 text-purple-800',
              Gold: 'bg-yellow-100 text-yellow-800',
              Silver: 'bg-gray-100 text-gray-800',
              Bronze: 'bg-orange-100 text-orange-800',
            }[tier]

            const daysSinceOrder = player.last_order_date
              ? Math.floor((Date.now() - new Date(player.last_order_date).getTime()) / (1000 * 60 * 60 * 24))
              : 999

            return (
              <Link
                key={player.id}
                href={`/admin/players/${player.id}`}
                className="block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-lg">{player.name}</h3>
                      <p className="text-sm text-gray-500">{player.email}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${tierColor}`}>
                      {tier}
                    </span>
                  </div>

                  {player.churn_risk_score > 0.6 && (
                    <div className="mb-4 p-2 bg-orange-50 border border-orange-200 rounded-lg flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-orange-600" />
                      <span className="text-xs text-orange-800 font-medium">At Risk of Churn</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-gray-500 mb-1">LTV</div>
                      <div className="text-lg font-bold text-green-600">${player.lifetime_value.toFixed(0)}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Orders</div>
                      <div className="text-lg font-bold text-gray-900">{player.total_orders}</div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">Last Order</div>
                    <div className="text-sm font-medium text-gray-900">
                      {player.last_order_date 
                        ? `${daysSinceOrder} days ago`
                        : 'Never'}
                    </div>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}
