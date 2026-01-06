'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface CohortData {
  month: string
  new_customers: number
  returning_customers: number
  retention_rate: number
}

interface CustomerCohortChartProps {
  data: CohortData[]
  title?: string
}

export default function CustomerCohortChart({ data, title = 'Customer Cohort Analysis' }: CustomerCohortChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="new_customers" 
            stroke="#4A90E2" 
            strokeWidth={2}
            name="New Customers"
          />
          <Line 
            type="monotone" 
            dataKey="returning_customers" 
            stroke="#52B788" 
            strokeWidth={2}
            name="Returning Customers"
          />
          <Line 
            type="monotone" 
            dataKey="retention_rate" 
            stroke="#EC1F27" 
            strokeWidth={2}
            name="Retention Rate (%)"
            yAxisId="right"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

