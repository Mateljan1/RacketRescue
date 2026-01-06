// Operations System Types
// Database types for inventory, player profiles, and business analytics

// ============================================
// INVENTORY TYPES
// ============================================

export interface InventoryItem {
  id: string
  type: 'string' | 'grip' | 'accessory'
  brand: string
  name: string
  sku: string
  quantity_in_stock: number
  reorder_point: number
  cost_per_unit: number
  price_per_unit: number
  supplier: string
  last_ordered_date: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export interface InventoryTransaction {
  id: string
  item_id: string
  order_id: string
  quantity_used: number
  transaction_date: string
  transaction_type: 'usage' | 'restock' | 'adjustment'
  notes: string | null
  created_by: string
  created_at: string
}

export interface InventoryUsageSummary {
  id: string
  brand: string
  name: string
  type: 'string' | 'grip' | 'accessory'
  quantity_in_stock: number
  reorder_point: number
  usage_count_30d: number
  total_used_30d: number
  cost_30d: number
}

// ============================================
// PLAYER PROFILE TYPES
// ============================================

export type PlayFrequency = 'recreational' | 'regular' | 'competitive' | 'professional'
export type SpendingTier = 'Bronze' | 'Silver' | 'Gold' | 'Platinum'

export interface PlayerProfile {
  id: string
  user_id: string | null
  email: string
  name: string
  phone: string | null
  total_orders: number
  total_spent: number
  lifetime_value: number
  average_order_value: number
  last_order_date: string | null
  average_days_between_restrings: number | null
  preferred_string_type: string | null
  preferred_tension: number | null
  play_frequency: PlayFrequency | null
  notes: string | null
  tags: string[]
  churn_risk_score: number
  next_restring_prediction_date: string | null
  created_at: string
  updated_at: string
}

export interface PlayerRacket {
  id: string
  player_id: string
  brand: string
  model: string
  grip_size: string | null
  string_pattern: string | null
  last_strung_date: string | null
  last_string_used: string | null
  last_tension: number | null
  restring_frequency_days: number | null
  photo_url: string | null
  is_active: boolean
  notes: string | null
  created_at: string
  updated_at: string
}

export interface PlayerLTVRanking {
  id: string
  name: string
  email: string
  total_orders: number
  total_spent: number
  lifetime_value: number
  average_order_value: number
  last_order_date: string | null
  spending_tier: SpendingTier
  churn_risk: number
}

// ============================================
// REMINDER TYPES
// ============================================

export type ReminderType = 'due' | 'overdue' | 'follow_up'
export type ReminderResponse = 'booked' | 'dismissed' | 'no_response' | null

export interface RestringReminder {
  id: string
  player_id: string
  racket_id: string | null
  reminder_date: string
  sent_at: string | null
  reminder_type: ReminderType
  response_action: ReminderResponse
  response_at: string | null
  created_at: string
}

// ============================================
// BUSINESS METRICS TYPES
// ============================================

export interface BusinessMetrics {
  date: string
  total_revenue: number
  total_orders: number
  average_order_value: number
  new_customers: number
  returning_customers: number
  membership_revenue: number
  stringing_revenue: number
  shop_revenue: number
  strings_used: number
  most_popular_string: string | null
  most_popular_tension: number | null
  created_at: string
  updated_at: string
}

export interface DailyRevenueSummary {
  date: string
  order_count: number
  total_revenue: number
  average_order_value: number
}

// ============================================
// ADMIN ROLE TYPES
// ============================================

export type AdminRole = 'owner' | 'stringer'

export interface AdminUser {
  email: string
  role: AdminRole
  name: string
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface PlayerAnalytics {
  player_id: string
  order_frequency_chart: Array<{ month: string; orders: number }>
  spending_trend: Array<{ month: string; spent: number }>
  string_preferences: Array<{ string: string; count: number }>
  tension_preferences: Array<{ tension: number; count: number }>
  average_days_between_restrings: number
  predicted_next_restring_date: string | null
  churn_risk_score: number
  recommended_actions: string[]
}

export interface StringUsageAnalytics {
  string_id: string
  string_name: string
  brand: string
  usage_count: number
  usage_percentage: number
  cost_per_use: number
  revenue_per_use: number
  profit_margin: number
}

export interface InventoryAlert {
  id: string
  item_id: string
  item_name: string
  alert_type: 'low_stock' | 'critical_stock' | 'out_of_stock' | 'high_usage' | 'slow_moving'
  current_stock: number
  reorder_point: number
  days_until_stockout: number | null
  message: string
  created_at: string
}

// ============================================
// AUTOMATION TYPES
// ============================================

export interface AutomationWorkflow {
  id: string
  name: string
  trigger: string
  actions: Array<{
    type: string
    delay_minutes?: number
    params: Record<string, any>
  }>
  enabled: boolean
}

export interface SmartSchedulingSuggestion {
  date: string
  time_slot: string
  available_capacity: number
  predicted_demand: number
  suggested_action: 'promote' | 'normal' | 'limit'
  message: string
}

export interface ChurnPrediction {
  player_id: string
  player_name: string
  player_email: string
  last_order_date: string
  days_since_last_order: number
  average_frequency: number
  churn_probability: number
  recommended_action: string
}

export interface UpsellOpportunity {
  player_id: string
  player_name: string
  player_email: string
  opportunity_type: 'membership' | 'premium_string' | 'multi_racket' | 'add_ons'
  confidence_score: number
  estimated_value: number
  reason: string
}

