'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft, Mail, Phone, TrendingUp, Package, AlertTriangle, Crown, Calendar, Plus, Edit, MessageSquare, Tag, Download } from 'lucide-react'
import Link from 'next/link'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import type { PlayerProfile, PlayerAnalytics, PlayerRacket } from '@/lib/types/operations'
import { getPlayerAnalytics } from '@/lib/analytics/player-analytics'

interface Order {
  id: string
  created_at: string
  status: string
  racket_brand?: string
  racket_model?: string
  string_name: string
  main_tension?: number
  amount_total: number
  is_express: boolean
}

export default function PlayerDetailPage() {
  const params = useParams()
  const playerId = params.id as string

  const [player, setPlayer] = useState<PlayerProfile | null>(null)
  const [analytics, setAnalytics] = useState<PlayerAnalytics | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [rackets, setRackets] = useState<PlayerRacket[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'rackets' | 'notes'>('overview')
  const [notes, setNotes] = useState('')
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    fetchPlayerData()
  }, [playerId])

  const fetchPlayerData = async () => {
    try {
      // Fetch player profile
      const profileResponse = await fetch(`/api/players/${playerId}`)
      const profileData = await profileResponse.json()
      setPlayer(profileData.player)
      setNotes(profileData.player?.notes || '')
      setTags(profileData.player?.tags || [])

      // Fetch analytics
      const analyticsData = await getPlayerAnalytics(playerId)
      setAnalytics(analyticsData)

      // Fetch orders
      const ordersResponse = await fetch(`/api/players/${playerId}/orders`)
      const ordersData = await ordersResponse.json()
      setOrders(ordersData.orders || [])

      // Fetch rackets
      const racketsResponse = await fetch(`/api/players/${playerId}/rackets`)
      const racketsData = await racketsResponse.json()
      setRackets(racketsData.rackets || [])

    } catch (error) {
      console.error('Error fetching player data:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveNotes = async () => {
    try {
      await fetch(`/api/players/${playerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      })
    } catch (error) {
      console.error('Error saving notes:', error)
    }
  }

  const addTag = async () => {
    if (!newTag.trim()) return
    const updatedTags = [...tags, newTag.trim()]
    setTags(updatedTags)
    setNewTag('')
    
    try {
      await fetch(`/api/players/${playerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: updatedTags }),
      })
    } catch (error) {
      console.error('Error adding tag:', error)
    }
  }

  const removeTag = async (tagToRemove: string) => {
    const updatedTags = tags.filter(t => t !== tagToRemove)
    setTags(updatedTags)
    
    try {
      await fetch(`/api/players/${playerId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags: updatedTags }),
      })
    } catch (error) {
      console.error('Error removing tag:', error)
    }
  }

  const exportPlayerData = () => {
    const csv = [
      ['Order Date', 'Status', 'Racket', 'String', 'Tension', 'Amount', 'Express'].join(','),
      ...orders.map(o => [
        new Date(o.created_at).toLocaleDateString(),
        o.status,
        `${o.racket_brand || ''} ${o.racket_model || ''}`,
        o.string_name,
        o.main_tension || '',
        `$${(o.amount_total / 100).toFixed(2)}`,
        o.is_express ? 'Yes' : 'No'
      ].join(','))
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${player?.name.replace(/\s+/g, '_')}_orders.csv`
    a.click()
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin w-12 h-12 border-4 border-racket-red border-t-transparent rounded-full" />
      </main>
    )
  }

  if (!player) {
    return (
      <main className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Player Not Found</h2>
          <Link href="/admin/players" className="text-racket-red hover:underline">
            ← Back to Players
          </Link>
        </div>
      </main>
    )
  }

  const tier = player.lifetime_value >= 1000 ? 'Platinum' : 
              player.lifetime_value >= 500 ? 'Gold' :
              player.lifetime_value >= 200 ? 'Silver' : 'Bronze'

  const tierColor = {
    Platinum: 'bg-purple-100 text-purple-800',
    Gold: 'bg-yellow-100 text-yellow-800',
    Silver: 'bg-gray-100 text-gray-800',
    Bronze: 'bg-orange-100 text-orange-800',
  }[tier]

  const COLORS = ['#EC1F27', '#FF6B35', '#FFA500', '#FFD700', '#52B788']

  return (
    <main className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/players"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Players
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{player.name}</h1>
              <div className="flex items-center gap-4 mt-2">
                <a href={`mailto:${player.email}`} className="flex items-center gap-2 text-gray-600 hover:text-racket-red">
                  <Mail className="w-4 h-4" />
                  {player.email}
                </a>
                {player.phone && (
                  <a href={`tel:${player.phone}`} className="flex items-center gap-2 text-gray-600 hover:text-racket-red">
                    <Phone className="w-4 h-4" />
                    {player.phone}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-bold ${tierColor}`}>
                {tier} Tier
              </span>
              <button
                onClick={exportPlayerData}
                className="flex items-center gap-2 px-4 py-2 bg-racket-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Churn Risk Alert */}
        {player.churn_risk_score > 0.6 && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <div>
                <h3 className="font-bold text-orange-900">High Churn Risk ({(player.churn_risk_score * 100).toFixed(0)}%)</h3>
                <p className="text-sm text-orange-800">
                  This customer hasn't ordered recently. Consider sending a win-back campaign.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Lifetime Value</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-600">${player.lifetime_value.toFixed(0)}</div>
            <div className="text-sm text-gray-500 mt-1">Total spent: ${player.total_spent.toFixed(0)}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Total Orders</span>
              <Package className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{player.total_orders}</div>
            <div className="text-sm text-gray-500 mt-1">Avg: ${player.average_order_value.toFixed(0)}</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Restring Frequency</span>
              <Calendar className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {player.average_days_between_restrings || 'N/A'}
            </div>
            {player.average_days_between_restrings && (
              <div className="text-sm text-gray-500 mt-1">days between</div>
            )}
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Last Order</span>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {player.last_order_date 
                ? Math.floor((Date.now() - new Date(player.last_order_date).getTime()) / (1000 * 60 * 60 * 24))
                : 'Never'}
            </div>
            {player.last_order_date && (
              <div className="text-sm text-gray-500 mt-1">days ago</div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex gap-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'orders', label: `Orders (${orders.length})` },
                { id: 'rackets', label: `Rackets (${rackets.length})` },
                { id: 'notes', label: 'Notes & Tags' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-racket-red text-racket-red'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && analytics && (
              <div className="space-y-8">
                {/* Recommendations */}
                {analytics.recommended_actions.length > 0 && (
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                    <h3 className="font-bold text-blue-900 mb-3">Recommended Actions</h3>
                    <ul className="space-y-2">
                      {analytics.recommended_actions.map((action, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                          <span className="text-blue-600">•</span>
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Order Frequency Chart */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Order Frequency (Last 12 Months)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.order_frequency_chart}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#EC1F27" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Spending Trend Chart */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Spending Trend</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={analytics.spending_trend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="spent" stroke="#52B788" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* String Preferences */}
                {analytics.string_preferences.length > 0 && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">String Preferences</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={analytics.string_preferences}
                            dataKey="count"
                            nameKey="string"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                          >
                            {analytics.string_preferences.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Tension Preferences */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Tension Preferences</h3>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={analytics.tension_preferences}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="tension" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#FF6B35" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Order History</h3>
                  <button
                    onClick={exportPlayerData}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Date</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Racket</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">String</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Tension</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Amount</th>
                        <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {order.racket_brand} {order.racket_model}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">{order.string_name}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {order.main_tension || 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">
                            ${(order.amount_total / 100).toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {order.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {orders.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                      No orders yet
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Rackets Tab */}
            {activeTab === 'rackets' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Rackets</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-racket-red text-white rounded-lg hover:bg-red-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    Add Racket
                  </button>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {rackets.map((racket) => (
                    <div key={racket.id} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">
                            {racket.brand} {racket.model}
                          </h4>
                          {racket.grip_size && (
                            <p className="text-sm text-gray-600">Grip: {racket.grip_size}</p>
                          )}
                        </div>
                        <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                      {racket.last_strung_date && (
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Strung:</span>
                            <span className="font-medium text-gray-900">
                              {new Date(racket.last_strung_date).toLocaleDateString()}
                            </span>
                          </div>
                          {racket.last_string_used && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">String:</span>
                              <span className="font-medium text-gray-900">{racket.last_string_used}</span>
                            </div>
                          )}
                          {racket.last_tension && (
                            <div className="flex justify-between">
                              <span className="text-gray-600">Tension:</span>
                              <span className="font-medium text-gray-900">{racket.last_tension} lbs</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  {rackets.length === 0 && (
                    <div className="col-span-2 text-center py-12 text-gray-500">
                      No rackets added yet
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Notes & Tags Tab */}
            {activeTab === 'notes' && (
              <div className="space-y-8">
                {/* Tags */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-racket-red/10 text-racket-red rounded-full text-sm font-medium"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="hover:text-red-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTag()}
                      placeholder="Add tag..."
                      className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-racket-red/20"
                    />
                    <button
                      onClick={addTag}
                      className="px-4 py-2 bg-racket-black text-white rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Internal Notes */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Internal Notes
                  </h3>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    onBlur={saveNotes}
                    placeholder="Add internal notes about this customer..."
                    className="w-full h-40 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-racket-red/20 resize-none"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Notes are saved automatically and only visible to staff
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
