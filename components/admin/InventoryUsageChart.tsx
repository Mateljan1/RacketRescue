'use client'

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

interface UsageData {
  date: string
  strings_used: number
  cost: number
  revenue: number
}

interface InventoryUsageChartProps {
  data: UsageData[]
  title?: string
}

export default function InventoryUsageChart({ data, title = 'Inventory Usage Over Time' }: InventoryUsageChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
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
            dataKey="strings_used" 
            stroke="#EC1F27" 
            strokeWidth={2}
            name="Strings Used"
          />
          <Line 
            type="monotone" 
            dataKey="cost" 
            stroke="#FF6B35" 
            strokeWidth={2}
            name="Cost ($)"
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="#52B788" 
            strokeWidth={2}
            name="Revenue ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

