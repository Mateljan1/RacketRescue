// Database types for Supabase
// These can be auto-generated with: npx supabase gen types typescript

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type OrderStatus =
  | 'pending'
  | 'picked_up'
  | 'in_progress'
  | 'quality_check'
  | 'ready'
  | 'out_for_delivery'
  | 'delivered'
  | 'canceled'

export type MembershipTier = 'none' | 'standard' | 'elite' | 'family'
export type MembershipStatus = 'active' | 'canceled' | 'past_due' | 'trialing' | 'none'
export type AdminRole = 'super_admin' | 'admin' | 'stringer'
export type ServicePackage = 'match_ready' | 'pro_performance'

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          stripe_customer_id: string | null
          membership_tier: MembershipTier
          membership_status: MembershipStatus
          activecampaign_contact_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          membership_tier?: MembershipTier
          membership_status?: MembershipStatus
          activecampaign_contact_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          stripe_customer_id?: string | null
          membership_tier?: MembershipTier
          membership_status?: MembershipStatus
          activecampaign_contact_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      memberships: {
        Row: {
          id: string
          user_id: string
          tier: MembershipTier
          status: MembershipStatus
          stripe_subscription_id: string
          stripe_price_id: string | null
          current_period_start: string | null
          current_period_end: string | null
          cancel_at_period_end: boolean
          canceled_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          tier: MembershipTier
          status: MembershipStatus
          stripe_subscription_id: string
          stripe_price_id?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          tier?: MembershipTier
          status?: MembershipStatus
          stripe_subscription_id?: string
          stripe_price_id?: string | null
          current_period_start?: string | null
          current_period_end?: string | null
          cancel_at_period_end?: boolean
          canceled_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          stripe_checkout_session_id: string | null
          stripe_payment_intent_id: string | null
          user_id: string | null
          order_type: 'stringing' | 'membership'
          status: OrderStatus
          service_package: ServicePackage | null
          is_express: boolean
          racket_brand: string | null
          racket_model: string | null
          string_type: string | null
          string_name: string | null
          string_price_cents: number
          customer_provides_string: boolean
          main_tension: number | null
          cross_tension: number | null
          add_regrip: boolean
          add_overgrip: boolean
          add_dampener: boolean
          dampener_bundle: boolean
          add_second_racket: boolean
          customer_email: string
          customer_name: string | null
          customer_phone: string | null
          pickup_address: string | null
          delivery_address: string | null
          pickup_time: string | null
          pickup_date: string | null
          estimated_ready: string | null
          actual_ready: string | null
          delivered_at: string | null
          special_instructions: string | null
          internal_notes: string | null
          subtotal_cents: number
          pickup_fee_cents: number
          discount_cents: number
          total_cents: number
          is_member: boolean
          membership_tier_at_order: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string | null
          order_type: 'stringing' | 'membership'
          status?: OrderStatus
          service_package?: ServicePackage | null
          is_express?: boolean
          racket_brand?: string | null
          racket_model?: string | null
          string_type?: string | null
          string_name?: string | null
          string_price_cents?: number
          customer_provides_string?: boolean
          main_tension?: number | null
          cross_tension?: number | null
          add_regrip?: boolean
          add_overgrip?: boolean
          add_dampener?: boolean
          dampener_bundle?: boolean
          add_second_racket?: boolean
          customer_email: string
          customer_name?: string | null
          customer_phone?: string | null
          pickup_address?: string | null
          delivery_address?: string | null
          pickup_time?: string | null
          pickup_date?: string | null
          estimated_ready?: string | null
          actual_ready?: string | null
          delivered_at?: string | null
          special_instructions?: string | null
          internal_notes?: string | null
          subtotal_cents?: number
          pickup_fee_cents?: number
          discount_cents?: number
          total_cents?: number
          is_member?: boolean
          membership_tier_at_order?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          stripe_checkout_session_id?: string | null
          stripe_payment_intent_id?: string | null
          user_id?: string | null
          order_type?: 'stringing' | 'membership'
          status?: OrderStatus
          service_package?: ServicePackage | null
          is_express?: boolean
          racket_brand?: string | null
          racket_model?: string | null
          string_type?: string | null
          string_name?: string | null
          string_price_cents?: number
          customer_provides_string?: boolean
          main_tension?: number | null
          cross_tension?: number | null
          add_regrip?: boolean
          add_overgrip?: boolean
          add_dampener?: boolean
          dampener_bundle?: boolean
          add_second_racket?: boolean
          customer_email?: string
          customer_name?: string | null
          customer_phone?: string | null
          pickup_address?: string | null
          delivery_address?: string | null
          pickup_time?: string | null
          pickup_date?: string | null
          estimated_ready?: string | null
          actual_ready?: string | null
          delivered_at?: string | null
          special_instructions?: string | null
          internal_notes?: string | null
          subtotal_cents?: number
          pickup_fee_cents?: number
          discount_cents?: number
          total_cents?: number
          is_member?: boolean
          membership_tier_at_order?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      order_status_history: {
        Row: {
          id: string
          order_id: string
          status: OrderStatus
          note: string | null
          updated_by: string | null
          is_system_update: boolean
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          status: OrderStatus
          note?: string | null
          updated_by?: string | null
          is_system_update?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          status?: OrderStatus
          note?: string | null
          updated_by?: string | null
          is_system_update?: boolean
          created_at?: string
        }
      }
      rate_limits: {
        Row: {
          id: string
          identifier: string
          identifier_type: 'ip' | 'user'
          endpoint: string
          request_count: number
          window_start: string
          created_at: string
        }
        Insert: {
          id?: string
          identifier: string
          identifier_type: 'ip' | 'user'
          endpoint: string
          request_count?: number
          window_start?: string
          created_at?: string
        }
        Update: {
          id?: string
          identifier?: string
          identifier_type?: 'ip' | 'user'
          endpoint?: string
          request_count?: number
          window_start?: string
          created_at?: string
        }
      }
      admin_users: {
        Row: {
          id: string
          user_id: string
          email: string
          role: AdminRole
          permissions: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          email: string
          role: AdminRole
          permissions?: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          email?: string
          role?: AdminRole
          permissions?: Json
          created_at?: string
          updated_at?: string
        }
      }
    }
    Functions: {
      check_rate_limit: {
        Args: {
          p_identifier: string
          p_identifier_type: string
          p_endpoint: string
          p_max_requests: number
          p_window_minutes: number
        }
        Returns: boolean
      }
    }
  }
}

// Helper types
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Membership = Database['public']['Tables']['memberships']['Row']
export type MembershipInsert = Database['public']['Tables']['memberships']['Insert']

export type Order = Database['public']['Tables']['orders']['Row']
export type OrderInsert = Database['public']['Tables']['orders']['Insert']
export type OrderUpdate = Database['public']['Tables']['orders']['Update']

export type OrderStatusHistory = Database['public']['Tables']['order_status_history']['Row']

export type AdminUser = Database['public']['Tables']['admin_users']['Row']
