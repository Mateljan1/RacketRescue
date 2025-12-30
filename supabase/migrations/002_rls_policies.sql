-- Supabase Migration: Row Level Security Policies
-- Run this in the Supabase SQL Editor AFTER 001_initial_schema.sql

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE rate_limits ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USERS POLICIES
-- ============================================

-- Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role can manage all users (for webhooks)
CREATE POLICY "Service role full access to users"
  ON users FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Allow insert for new user registration
CREATE POLICY "Allow user registration"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================
-- ORDERS POLICIES
-- ============================================

-- Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (
    user_id = auth.uid() OR
    customer_email = (SELECT email FROM users WHERE id = auth.uid())
  );

-- Anyone can view order by stripe session ID (for public tracking page)
CREATE POLICY "Public order tracking by session"
  ON orders FOR SELECT
  USING (stripe_checkout_session_id IS NOT NULL);

-- Service role can manage all orders (for webhooks)
CREATE POLICY "Service role full access to orders"
  ON orders FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Admins can view all orders
CREATE POLICY "Admins can view all orders"
  ON orders FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- Admins can update orders
CREATE POLICY "Admins can update orders"
  ON orders FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- ORDER STATUS HISTORY POLICIES
-- ============================================

-- Users can view status history for their orders
CREATE POLICY "Users can view own order history"
  ON order_status_history FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_status_history.order_id
      AND (orders.user_id = auth.uid() OR orders.stripe_checkout_session_id IS NOT NULL)
    )
  );

-- Service role can insert status updates
CREATE POLICY "Service role can update status history"
  ON order_status_history FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- Admins can insert status updates
CREATE POLICY "Admins can insert status history"
  ON order_status_history FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid()
    )
  );

-- ============================================
-- MEMBERSHIPS POLICIES
-- ============================================

-- Users can view their own memberships
CREATE POLICY "Users can view own memberships"
  ON memberships FOR SELECT
  USING (user_id = auth.uid());

-- Service role manages memberships
CREATE POLICY "Service role manages memberships"
  ON memberships FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================
-- ADMIN USERS POLICIES
-- ============================================

-- Admins can view their own record
CREATE POLICY "Admins can view own record"
  ON admin_users FOR SELECT
  USING (user_id = auth.uid());

-- Super admins can manage all admin users
CREATE POLICY "Super admins manage admin users"
  ON admin_users FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE user_id = auth.uid() AND role = 'super_admin'
    )
  );

-- Service role can manage admin users
CREATE POLICY "Service role manages admin users"
  ON admin_users FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================
-- RATE LIMITS POLICIES
-- ============================================

-- Only service role can access rate limits
CREATE POLICY "Service role manages rate limits"
  ON rate_limits FOR ALL
  USING (auth.jwt() ->> 'role' = 'service_role');
