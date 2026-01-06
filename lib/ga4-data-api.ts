// GA4 Data API client for custom dashboards
// Uses service account authentication for server-side data fetching
// Note: Requires @google-analytics/data package - install with: npm install @google-analytics/data

import { BetaAnalyticsDataClient } from '@google-analytics/data'

const propertyId = process.env.GA4_PROPERTY_ID!
const credentials = process.env.GA4_SERVICE_ACCOUNT_KEY 
  ? JSON.parse(process.env.GA4_SERVICE_ACCOUNT_KEY)
  : undefined

const analyticsDataClient = credentials 
  ? new BetaAnalyticsDataClient({ credentials })
  : null

export interface DashboardMetrics {
  sessions: number
  users: number
  conversions: number
  revenue: number
  conversionRate: number
  averageOrderValue: number
}

export interface FunnelStep {
  name: string
  users: number
  dropOffRate: number
}

export async function getDailyMetrics(
  startDate: string = '7daysAgo',
  endDate: string = 'today'
): Promise<DashboardMetrics> {
  if (!analyticsDataClient) {
    throw new Error('GA4 Data API not configured')
  }
  
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate, endDate }],
    dimensions: [],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'conversions' },
      { name: 'totalRevenue' },
    ],
  })
  
  const row = response.rows?.[0]
  const sessions = parseInt(row?.metricValues?.[0]?.value || '0')
  const users = parseInt(row?.metricValues?.[1]?.value || '0')
  const conversions = parseInt(row?.metricValues?.[2]?.value || '0')
  const revenue = parseFloat(row?.metricValues?.[3]?.value || '0')
  
  return {
    sessions,
    users,
    conversions,
    revenue,
    conversionRate: sessions > 0 ? (conversions / sessions) * 100 : 0,
    averageOrderValue: conversions > 0 ? revenue / conversions : 0,
  }
}

export async function getFunnelData(): Promise<FunnelStep[]> {
  if (!analyticsDataClient) {
    throw new Error('GA4 Data API not configured')
  }
  
  // Query funnel events
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'eventName' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        inListFilter: {
          values: [
            'booking_drawer_open',
            'package_selected',
            'schedule_step_1_complete',
            'schedule_step_2_complete',
            'schedule_step_3_complete',
            'checkout_initiated',
            'purchase',
          ],
        },
      },
    },
  })
  
  // Process into funnel steps
  const eventCounts = new Map<string, number>()
  response.rows?.forEach(row => {
    const eventName = row.dimensionValues?.[0]?.value || ''
    const count = parseInt(row.metricValues?.[0]?.value || '0')
    eventCounts.set(eventName, count)
  })
  
  const steps: FunnelStep[] = [
    { name: 'Drawer Opened', users: eventCounts.get('booking_drawer_open') || 0, dropOffRate: 0 },
    { name: 'Package Selected', users: eventCounts.get('package_selected') || 0, dropOffRate: 0 },
    { name: 'Step 1 Complete', users: eventCounts.get('schedule_step_1_complete') || 0, dropOffRate: 0 },
    { name: 'Step 2 Complete', users: eventCounts.get('schedule_step_2_complete') || 0, dropOffRate: 0 },
    { name: 'Step 3 Complete', users: eventCounts.get('schedule_step_3_complete') || 0, dropOffRate: 0 },
    { name: 'Checkout Initiated', users: eventCounts.get('checkout_initiated') || 0, dropOffRate: 0 },
    { name: 'Purchase Complete', users: eventCounts.get('purchase') || 0, dropOffRate: 0 },
  ]
  
  // Calculate drop-off rates
  for (let i = 1; i < steps.length; i++) {
    const prevUsers = steps[i - 1].users
    const currUsers = steps[i].users
    steps[i].dropOffRate = prevUsers > 0 
      ? ((prevUsers - currUsers) / prevUsers) * 100 
      : 0
  }
  
  return steps
}

