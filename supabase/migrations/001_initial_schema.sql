-- Supabase Migration: Initial Schema
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  stripe_customer_id TEXT UNIQUE,
  membership_tier TEXT CHECK (membership_tier IN ('none', 'standard', 'elite', 'family')) DEFAULT 'none',
  membership_status TEXT CHECK (membership_status IN ('active', 'canceled', 'past_due', 'trialing', 'none')) DEFAULT 'none',
  activecampaign_contact_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MEMBERSHIPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  tier TEXT NOT NULL CHECK (tier IN ('standard', 'elite', 'family')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT,
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  canceled_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- External references
  stripe_checkout_session_id TEXT UNIQUE,
  stripe_payment_intent_id TEXT,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,

  -- Order type and status
  order_type TEXT NOT NULL CHECK (order_type IN ('stringing', 'membership')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN (
    'pending', 'picked_up', 'in_progress', 'quality_check',
    'ready', 'out_for_delivery', 'delivered', 'canceled'
  )),

  -- Service details
  service_package TEXT CHECK (service_package IN ('match_ready', 'pro_performance')),
  is_express BOOLEAN DEFAULT FALSE,

  -- Racket details
  racket_brand TEXT,
  racket_model TEXT,

  -- String details
  string_type TEXT,
  string_name TEXT,
  string_price_cents INTEGER DEFAULT 0,
  customer_provides_string BOOLEAN DEFAULT FALSE,
  main_tension INTEGER,
  cross_tension INTEGER,

  -- Add-ons
  add_regrip BOOLEAN DEFAULT FALSE,
  add_overgrip BOOLEAN DEFAULT FALSE,
  add_dampener BOOLEAN DEFAULT FALSE,
  dampener_bundle BOOLEAN DEFAULT FALSE,
  add_second_racket BOOLEAN DEFAULT FALSE,

  -- Customer info (denormalized for quick access)
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,

  -- Addresses
  pickup_address TEXT,
  delivery_address TEXT,

  -- Scheduling
  pickup_time TEXT,
  pickup_date DATE,
  estimated_ready TIMESTAMPTZ,
  actual_ready TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  -- Special instructions
  special_instructions TEXT,
  internal_notes TEXT,

  -- Pricing (in cents)
  subtotal_cents INTEGER NOT NULL DEFAULT 0,
  pickup_fee_cents INTEGER DEFAULT 0,
  discount_cents INTEGER DEFAULT 0,
  total_cents INTEGER NOT NULL DEFAULT 0,

  -- Membership context
  is_member BOOLEAN DEFAULT FALSE,
  membership_tier_at_order TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDER STATUS HISTORY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status TEXT NOT NULL,
  note TEXT,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_system_update BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- RATE LIMITING TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS rate_limits (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  identifier TEXT NOT NULL,
  identifier_type TEXT NOT NULL CHECK (identifier_type IN ('ip', 'user')),
  endpoint TEXT NOT NULL,
  request_count INTEGER DEFAULT 1,
  window_start TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ADMIN USERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'stringer')),
  permissions JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================

-- Users indexes
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_stripe_customer ON users(stripe_customer_id);

-- Orders indexes
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_checkout_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_is_express ON orders(is_express) WHERE is_express = TRUE;

-- Status history indexes
CREATE INDEX IF NOT EXISTS idx_status_history_order ON order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_status_history_created ON order_status_history(created_at DESC);

-- Rate limits indexes
CREATE INDEX IF NOT EXISTS idx_rate_limits_lookup ON rate_limits(identifier, endpoint, window_start);

-- Memberships indexes
CREATE INDEX IF NOT EXISTS idx_memberships_user ON memberships(user_id);
CREATE INDEX IF NOT EXISTS idx_memberships_stripe ON memberships(stripe_subscription_id);

-- Admin users indexes
CREATE INDEX IF NOT EXISTS idx_admin_users_user ON admin_users(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
