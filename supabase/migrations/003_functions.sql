-- Supabase Migration: Functions and Triggers
-- Run this in the Supabase SQL Editor AFTER 002_rls_policies.sql

-- ============================================
-- AUTO-UPDATE TIMESTAMP FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
DROP TRIGGER IF EXISTS users_updated_at ON users;
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS orders_updated_at ON orders;
CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS memberships_updated_at ON memberships;
CREATE TRIGGER memberships_updated_at
  BEFORE UPDATE ON memberships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS admin_users_updated_at ON admin_users;
CREATE TRIGGER admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- AUTO-CREATE STATUS HISTORY ON ORDER STATUS CHANGE
-- ============================================
CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO order_status_history (order_id, status, is_system_update)
    VALUES (NEW.id, NEW.status, TRUE);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS order_status_change_trigger ON orders;
CREATE TRIGGER order_status_change_trigger
  AFTER UPDATE OF status ON orders
  FOR EACH ROW EXECUTE FUNCTION log_order_status_change();

-- ============================================
-- RATE LIMIT CHECK FUNCTION
-- ============================================
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_identifier TEXT,
  p_identifier_type TEXT,
  p_endpoint TEXT,
  p_max_requests INTEGER,
  p_window_minutes INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
  v_count INTEGER;
  v_window_start TIMESTAMPTZ;
BEGIN
  v_window_start := NOW() - (p_window_minutes || ' minutes')::INTERVAL;

  -- Count requests in the current window
  SELECT COALESCE(SUM(request_count), 0) INTO v_count
  FROM rate_limits
  WHERE identifier = p_identifier
    AND identifier_type = p_identifier_type
    AND endpoint = p_endpoint
    AND window_start > v_window_start;

  -- Check if rate limited
  IF v_count >= p_max_requests THEN
    RETURN FALSE; -- Rate limited
  END IF;

  -- Insert or update counter
  INSERT INTO rate_limits (identifier, identifier_type, endpoint, request_count, window_start)
  VALUES (p_identifier, p_identifier_type, p_endpoint, 1, NOW())
  ON CONFLICT DO NOTHING;

  -- If insert failed (concurrent request), just increment any existing row
  UPDATE rate_limits
  SET request_count = request_count + 1
  WHERE identifier = p_identifier
    AND identifier_type = p_identifier_type
    AND endpoint = p_endpoint
    AND window_start > v_window_start;

  RETURN TRUE; -- Allowed
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- CLEANUP OLD RATE LIMIT ENTRIES (run periodically)
-- ============================================
CREATE OR REPLACE FUNCTION cleanup_rate_limits()
RETURNS void AS $$
BEGIN
  DELETE FROM rate_limits
  WHERE window_start < NOW() - INTERVAL '1 hour';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- CALCULATE ESTIMATED READY TIME
-- ============================================
CREATE OR REPLACE FUNCTION calculate_estimated_ready(
  p_is_express BOOLEAN DEFAULT FALSE
)
RETURNS TIMESTAMPTZ AS $$
BEGIN
  IF p_is_express THEN
    RETURN NOW() + INTERVAL '4 hours';
  ELSE
    RETURN NOW() + INTERVAL '24 hours';
  END IF;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- GET ORDER WITH STATUS HISTORY
-- ============================================
CREATE OR REPLACE FUNCTION get_order_with_history(p_order_id UUID)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
BEGIN
  SELECT json_build_object(
    'order', row_to_json(o),
    'status_history', (
      SELECT json_agg(row_to_json(h) ORDER BY h.created_at DESC)
      FROM order_status_history h
      WHERE h.order_id = o.id
    )
  ) INTO v_result
  FROM orders o
  WHERE o.id = p_order_id;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- GET ORDER BY STRIPE SESSION ID
-- ============================================
CREATE OR REPLACE FUNCTION get_order_by_session(p_session_id TEXT)
RETURNS JSON AS $$
DECLARE
  v_result JSON;
BEGIN
  SELECT json_build_object(
    'order', row_to_json(o),
    'status_history', (
      SELECT json_agg(row_to_json(h) ORDER BY h.created_at DESC)
      FROM order_status_history h
      WHERE h.order_id = o.id
    )
  ) INTO v_result
  FROM orders o
  WHERE o.stripe_checkout_session_id = p_session_id;

  RETURN v_result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- GRANT EXECUTE PERMISSIONS
-- ============================================
GRANT EXECUTE ON FUNCTION check_rate_limit TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION cleanup_rate_limits TO service_role;
GRANT EXECUTE ON FUNCTION calculate_estimated_ready TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION get_order_with_history TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION get_order_by_session TO anon, authenticated, service_role;
