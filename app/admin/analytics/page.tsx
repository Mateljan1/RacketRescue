'use client'

import { useState, useEffect } from 'react'
import { DollarSign, TrendingUp, Users, Package, AlertTriangle, Crown } from 'lucide-react'
import { forecastRevenue, predictInventoryNeeds, predictChurn, identifyUpsellOpportunities } from '@/lib/automation/predictive-analytics'
import type { ChurnPrediction, UpsellOpportunity } from '@/lib/types/operations'

interface BusinessMetrics {
  today_revenue: number
  week_revenue: number
  month_revenue: number
  year_revenue: number
  total_orders: number
  average_order_value: number
  new_customers: number
  returning_customers: number
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<BusinessMetrics | null>(null)
  const [churnPredictions, setChurnPredictions] = useState<ChurnPrediction[]>([])
  const [upsellOpportunities, setUpsellOpportunities] = useState<UpsellOpportunity[]>([])
  const [revenueForecast, setRevenueForecast] = useState<number>(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    setLoading(true)
    try {
      // Fetch business metrics
      const metricsResponse = await fetch('/api/analytics/business-metrics')
      const metricsData = await metricsResponse.json()
      setMetrics(metricsData.metrics)

      // Fetch predictions
      const churn = await predictChurn()
      setChurnPredictions(churn)

      const upsell = await identifyUpsellOpportunities()
      setUpsellOpportunities(upsell)

      const forecast = await forecastRevenue(30)
      setRevenueForecast(forecast)

    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Business Analytics</h1>

        {/* Revenue Metrics */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Today</span>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${metrics?.today_revenue.toFixed(0) || '0'}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">This Week</span>
              <TrendingUp className="w-5 h-5 text-blue-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${metrics?.week_revenue.toFixed(0) || '0'}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">This Month</span>
              <Package className="w-5 h-5 text-purple-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              ${metrics?.month_revenue.toFixed(0) || '0'}
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Forecast (30d)</span>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-3xl font-bold text-green-600">
              ${revenueForecast.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Churn Predictions */}
        {churnPredictions.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Churn Risk Alert</h2>
                <p className="text-sm text-gray-600">{churnPredictions.length} customers at risk</p>
              </div>
            </div>
            <div className="space-y-3">
              {churnPredictions.slice(0, 5).map((prediction) => (
                <div key={prediction.player_id} className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                  <div>
                    <div className="font-medium text-gray-900">{prediction.player_name}</div>
                    <div className="text-sm text-gray-600">
                      {prediction.days_since_last_order} days since last order (avg: {prediction.average_frequency} days)
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-orange-600">
                      {(prediction.churn_probability * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-gray-500">risk</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upsell Opportunities */}
        {upsellOpportunities.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Crown className="w-6 h-6 text-yellow-500" />
              <div>
                <h2 className="text-xl font-bold text-gray-900">Upsell Opportunities</h2>
                <p className="text-sm text-gray-600">{upsellOpportunities.length} potential upsells</p>
              </div>
            </div>
            <div className="space-y-3">
              {upsellOpportunities.slice(0, 5).map((opp) => (
                <div key={`${opp.player_id}-${opp.opportunity_type}`} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{opp.player_name}</div>
                    <div className="text-sm text-gray-600">{opp.reason}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      ${opp.estimated_value}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">{opp.opportunity_type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

