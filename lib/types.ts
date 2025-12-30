// Order-related types

export type ServicePackage = 'match_ready' | 'pro_performance'

export interface OrderData {
  service_package: ServicePackage
  racket_brand: string
  racket_model: string
  string_type: string
  string_name: string
  string_price: number
  customer_provides_string: boolean
  main_tension: number
  cross_tension: number
  is_express: boolean
  add_regrip: boolean
  add_overgrip: boolean
  add_dampener: boolean
  dampener_bundle: boolean
  add_second_racket: boolean
  pickup_address: string
  delivery_address: string
  pickup_time: string
  special_instructions: string
}

export interface OrderPricing {
  serviceLabor: number
  stringPrice: number
  expressFee: number
  regripFee: number
  overGripFee: number
  dampenerFee: number
  secondRacketFee: number
  subtotal: number
  pickupFee: number
  total: number
}

// Order status types (matching API)
export type OrderStatus =
  | 'pending'
  | 'picked_up'
  | 'in_progress'
  | 'quality_check'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'

export interface Order {
  id: string
  status: OrderStatus
  progress: number
  customer_email: string
  customer_name: string
  customer_phone: string
  type: string
  racket_brand: string
  racket_model: string
  string_name: string
  main_tension: string
  cross_tension: string
  service_type: string
  is_express: boolean
  pickup_address: string
  pickup_time: string
  special_instructions: string
  created_at: string
  estimated_ready: string
  status_updated_at: string
  amount_total: number
  status_history: StatusHistoryEntry[]
}

export interface StatusHistoryEntry {
  status: OrderStatus
  timestamp: string
  note: string
}

// Customer-facing order display type (for listings)
export interface OrderSummary {
  id: string
  status: OrderStatus
  type: string
  customer_email: string
  customer_name: string
  racket: string
  string_name: string
  amount: number
  created_at: string
  is_express: boolean
}
