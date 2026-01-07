'use client'

import { useEffect, useState } from 'react'
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react'

interface DashboardData {
  metrics: {
    sessions: number
    users: number
    conversions: number
    revenue: number
    conversionRate: number
    averageOrderValue: number
  }
  funnel: Array<{
    name: string
    users: number
    dropOffRate: number
  }>
  lastUpdated: string
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('7daysAgo')
  
  useEffect(() => {
    fetchDashboardData()
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchDashboardData, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [dateRange])
  
  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`/api/analytics/dashboard?startDate=${dateRange}&endDate=today`)
      const json = await response.json()
      setData(json)
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) {
    return <div className="p-8">Loading dashboard...</div>
  }
  
  if (!data) {
    return <div className="p-8">Failed to load dashboard data</div>
  }
  
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <select 
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="today">Today</option>
          <option value="7daysAgo">Last 7 Days</option>
          <option value="30daysAgo">Last 30 Days</option>
          <option value="90daysAgo">Last 90 Days</option>
        </select>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${data.metrics.revenue.toFixed(2)}`}
          icon={DollarSign}
          color="green"
        />
        <MetricCard
          title="Conversions"
          value={data.metrics.conversions.toString()}
          icon={ShoppingCart}
          color="blue"
        />
        <MetricCard
          title="Conversion Rate"
          value={`${data.metrics.conversionRate.toFixed(2)}%`}
          icon={TrendingUp}
          color="purple"
        />
        <MetricCard
          title="Avg Order Value"
          value={`$${data.metrics.averageOrderValue.toFixed(2)}`}
          icon={DollarSign}
          color="orange"
        />
      </div>
      
      {/* Funnel Visualization */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Conversion Funnel</h2>
        <div className="space-y-4">
          {data.funnel.map((step, index) => (
            <FunnelStep
              key={step.name}
              name={step.name}
              users={step.users}
              dropOffRate={step.dropOffRate}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
      
      {/* Last Updated */}
      <div className="text-sm text-gray-500 text-center">
        Last updated: {new Date(data.lastUpdated).toLocaleString()}
      </div>
    </div>
  )
}

function MetricCard({ title, value, icon: Icon, color }: any) {
  const colorClasses = {
    green: 'bg-green-100 text-green-600',
    blue: 'bg-blue-100 text-blue-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`p-2 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="text-3xl font-bold">{value}</div>
    </div>
  )
}

function FunnelStep({ name, users, dropOffRate, isFirst }: any) {
  const widthPercent = isFirst ? 100 : Math.max(10, 100 - dropOffRate)
  
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-gray-600">{users.toLocaleString()} users</span>
      </div>
      <div className="relative h-12 bg-gray-100 rounded-lg overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-racket-red to-red-600 flex items-center justify-center text-white font-bold transition-all duration-500"
          style={{ width: `${widthPercent}%` }}
        >
          {!isFirst && dropOffRate > 0 && (
            <span className="text-sm">-{dropOffRate.toFixed(1)}% drop-off</span>
          )}
        </div>
      </div>
    </div>
  )
}
