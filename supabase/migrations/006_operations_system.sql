-- Operations System Database Schema
-- Created: January 6, 2026
-- Purpose: Admin operations, inventory tracking, player profiles, and automation

-- ============================================
-- INVENTORY MANAGEMENT
-- ============================================

-- Inventory Items Table
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('string', 'grip', 'accessory')),
  brand TEXT NOT NULL,
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  quantity_in_stock INTEGER NOT NULL DEFAULT 0,
  reorder_point INTEGER NOT NULL DEFAULT 5,
  cost_per_unit DECIMAL(10, 2) NOT NULL DEFAULT 0,
  price_per_unit DECIMAL(10, 2) NOT NULL DEFAULT 0,
  supplier TEXT,
  last_ordered_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inventory Transactions Table
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_id UUID NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
  order_id TEXT, -- Stripe session ID
  quantity_used INTEGER NOT NULL,
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  transaction_type TEXT NOT NULL CHECK (transaction_type IN ('usage', 'restock', 'adjustment')),
  notes TEXT,
  created_by TEXT, -- Email of user who made transaction
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for fast queries
CREATE INDEX idx_inventory_items_type ON inventory_items(type);
CREATE INDEX idx_inventory_items_low_stock ON inventory_items(quantity_in_stock) WHERE quantity_in_stock <= reorder_point;
CREATE INDEX idx_inventory_transactions_item ON inventory_transactions(item_id);
CREATE INDEX idx_inventory_transactions_order ON inventory_transactions(order_id);
CREATE INDEX idx_inventory_transactions_date ON inventory_transactions(transaction_date DESC);

-- ============================================
-- PLAYER PROFILES
-- ============================================

-- Player Profiles Table (Extended customer data)
CREATE TABLE IF NOT EXISTS player_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE, -- Reference to auth.users if they have account
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  total_orders INTEGER DEFAULT 0,
  total_spent DECIMAL(10, 2) DEFAULT 0,
  lifetime_value DECIMAL(10, 2) DEFAULT 0,
  average_order_value DECIMAL(10, 2) DEFAULT 0,
  last_order_date TIMESTAMP WITH TIME ZONE,
  average_days_between_restrings INTEGER,
  preferred_string_type TEXT,
  preferred_tension INTEGER,
  play_frequency TEXT CHECK (play_frequency IN ('recreational', 'regular', 'competitive', 'professional')),
  notes TEXT,
  tags TEXT[] DEFAULT '{}',
  churn_risk_score DECIMAL(3, 2) DEFAULT 0, -- 0-1 score
  next_restring_prediction_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player Rackets Table
CREATE TABLE IF NOT EXISTS player_rackets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES player_profiles(id) ON DELETE CASCADE,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  grip_size TEXT,
  string_pattern TEXT,
  last_strung_date TIMESTAMP WITH TIME ZONE,
  last_string_used TEXT,
  last_tension INTEGER,
  restring_frequency_days INTEGER,
  photo_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_player_profiles_email ON player_profiles(email);
CREATE INDEX idx_player_profiles_ltv ON player_profiles(lifetime_value DESC);
CREATE INDEX idx_player_profiles_last_order ON player_profiles(last_order_date DESC);
CREATE INDEX idx_player_profiles_churn_risk ON player_profiles(churn_risk_score DESC);
CREATE INDEX idx_player_rackets_player ON player_rackets(player_id);

-- ============================================
-- RESTRING REMINDERS
-- ============================================

-- Restring Reminders Table
CREATE TABLE IF NOT EXISTS restring_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID NOT NULL REFERENCES player_profiles(id) ON DELETE CASCADE,
  racket_id UUID REFERENCES player_rackets(id) ON DELETE SET NULL,
  reminder_date DATE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  reminder_type TEXT CHECK (reminder_type IN ('due', 'overdue', 'follow_up')),
  response_action TEXT, -- 'booked', 'dismissed', 'no_response'
  response_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_restring_reminders_date ON restring_reminders(reminder_date);
CREATE INDEX idx_restring_reminders_player ON restring_reminders(player_id);
CREATE INDEX idx_restring_reminders_sent ON restring_reminders(sent_at) WHERE sent_at IS NULL;

-- ============================================
-- BUSINESS METRICS (Cached for fast dashboard)
-- ============================================

CREATE TABLE IF NOT EXISTS business_metrics (
  date DATE PRIMARY KEY,
  total_revenue DECIMAL(10, 2) DEFAULT 0,
  total_orders INTEGER DEFAULT 0,
  average_order_value DECIMAL(10, 2) DEFAULT 0,
  new_customers INTEGER DEFAULT 0,
  returning_customers INTEGER DEFAULT 0,
  membership_revenue DECIMAL(10, 2) DEFAULT 0,
  stringing_revenue DECIMAL(10, 2) DEFAULT 0,
  shop_revenue DECIMAL(10, 2) DEFAULT 0,
  strings_used INTEGER DEFAULT 0,
  most_popular_string TEXT,
  most_popular_tension INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_business_metrics_date ON business_metrics(date DESC);

-- ============================================
-- VIEWS FOR ANALYTICS
-- ============================================

-- Inventory Usage Summary
CREATE OR REPLACE VIEW inventory_usage_summary AS
SELECT 
  ii.id,
  ii.brand,
  ii.name,
  ii.type,
  ii.quantity_in_stock,
  ii.reorder_point,
  COUNT(it.id) as usage_count_30d,
  SUM(it.quantity_used) as total_used_30d,
  ii.cost_per_unit * SUM(it.quantity_used) as cost_30d
FROM inventory_items ii
LEFT JOIN inventory_transactions it ON ii.id = it.item_id 
  AND it.transaction_date >= NOW() - INTERVAL '30 days'
  AND it.transaction_type = 'usage'
GROUP BY ii.id, ii.brand, ii.name, ii.type, ii.quantity_in_stock, ii.reorder_point, ii.cost_per_unit;

-- Player LTV Rankings
CREATE OR REPLACE VIEW player_ltv_rankings AS
SELECT 
  id,
  name,
  email,
  total_orders,
  total_spent,
  lifetime_value,
  average_order_value,
  last_order_date,
  CASE 
    WHEN lifetime_value >= 1000 THEN 'Platinum'
    WHEN lifetime_value >= 500 THEN 'Gold'
    WHEN lifetime_value >= 200 THEN 'Silver'
    ELSE 'Bronze'
  END as spending_tier,
  CASE
    WHEN last_order_date IS NULL THEN 0
    WHEN last_order_date < NOW() - INTERVAL '90 days' THEN 1
    WHEN last_order_date < NOW() - INTERVAL '60 days' THEN 0.7
    WHEN last_order_date < NOW() - INTERVAL '45 days' THEN 0.5
    ELSE 0.2
  END as churn_risk
FROM player_profiles
ORDER BY lifetime_value DESC;

-- Daily Revenue Summary
CREATE OR REPLACE VIEW daily_revenue_summary AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as order_count,
  SUM(amount_total / 100.0) as total_revenue,
  AVG(amount_total / 100.0) as average_order_value
FROM orders
WHERE status != 'cancelled'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- ============================================
-- TRIGGERS
-- ============================================

-- Update inventory_items.updated_at on change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_inventory_items_updated_at
  BEFORE UPDATE ON inventory_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_player_profiles_updated_at
  BEFORE UPDATE ON player_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_player_rackets_updated_at
  BEFORE UPDATE ON player_rackets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

-- Enable RLS
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_rackets ENABLE ROW LEVEL SECURITY;
ALTER TABLE restring_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_metrics ENABLE ROW LEVEL SECURITY;

-- Policies: Admin users (owner and stringers) can access all data
-- Note: In production, you'd check against a roles table
-- For now, we'll allow service role access (backend only)

CREATE POLICY "Service role can access inventory_items"
  ON inventory_items FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can access inventory_transactions"
  ON inventory_transactions FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can access player_profiles"
  ON player_profiles FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can access player_rackets"
  ON player_rackets FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can access restring_reminders"
  ON restring_reminders FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role can access business_metrics"
  ON business_metrics FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================
-- SEED DATA (Sample inventory items)
-- ============================================

INSERT INTO inventory_items (type, brand, name, sku, quantity_in_stock, reorder_point, cost_per_unit, price_per_unit, supplier) VALUES
  ('string', 'YONEX', 'Poly Tour Pro 125', 'YNX-PTP-125', 20, 5, 12.00, 16.00, 'Tennis Warehouse'),
  ('string', 'BABOLAT', 'RPM Blast 17', 'BAB-RPM-17', 15, 5, 12.00, 16.00, 'Tennis Warehouse'),
  ('string', 'WILSON', 'NRG2 16', 'WIL-NRG2-16', 10, 5, 14.00, 18.00, 'Tennis Warehouse'),
  ('string', 'SOLINCO', 'Revolution 17', 'SOL-REV-17', 12, 5, 10.00, 14.00, 'Tennis Warehouse'),
  ('string', 'BABOLAT', 'SG SpiralTek 17', 'BAB-SGS-17', 25, 10, 5.00, 8.00, 'Tennis Warehouse'),
  ('grip', 'TOURNA GRIP', 'Original XL 10-Pack', 'TRN-OXL-10', 8, 3, 11.00, 15.00, 'Tennis Warehouse'),
  ('grip', 'WILSON', 'Pro Perforated 3-Pack', 'WIL-PPP-3', 15, 5, 5.00, 7.00, 'Tennis Warehouse'),
  ('accessory', 'YONEX', 'Vibration Stopper 2-Pack', 'YNX-VS-2', 20, 5, 3.00, 5.00, 'Tennis Warehouse')
ON CONFLICT (sku) DO NOTHING;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to calculate player LTV
CREATE OR REPLACE FUNCTION calculate_player_ltv(player_email TEXT)
RETURNS DECIMAL AS $$
DECLARE
  total_spent DECIMAL;
  membership_value DECIMAL;
  predicted_value DECIMAL;
BEGIN
  -- Get total spent from orders
  SELECT COALESCE(SUM(amount_total / 100.0), 0)
  INTO total_spent
  FROM orders
  WHERE customer_email = player_email;
  
  -- Estimate membership value (if applicable)
  -- TODO: Calculate from membership subscriptions
  membership_value := 0;
  
  -- Predict future value (simple: 3x current spend)
  predicted_value := total_spent * 0.5;
  
  RETURN total_spent + membership_value + predicted_value;
END;
$$ LANGUAGE plpgsql;

-- Function to update player profile stats
CREATE OR REPLACE FUNCTION update_player_profile_stats(player_email TEXT)
RETURNS VOID AS $$
DECLARE
  order_count INTEGER;
  total_revenue DECIMAL;
  avg_order_val DECIMAL;
  last_order TIMESTAMP;
  avg_days INTEGER;
BEGIN
  -- Calculate stats from orders
  SELECT 
    COUNT(*),
    COALESCE(SUM(amount_total / 100.0), 0),
    COALESCE(AVG(amount_total / 100.0), 0),
    MAX(created_at)
  INTO order_count, total_revenue, avg_order_val, last_order
  FROM orders
  WHERE customer_email = player_email AND status != 'cancelled';
  
  -- Calculate average days between orders
  SELECT COALESCE(
    EXTRACT(DAY FROM AVG(created_at - LAG(created_at) OVER (ORDER BY created_at)))::INTEGER,
    30
  )
  INTO avg_days
  FROM orders
  WHERE customer_email = player_email AND status != 'cancelled';
  
  -- Update or insert player profile
  INSERT INTO player_profiles (
    email,
    name,
    phone,
    total_orders,
    total_spent,
    lifetime_value,
    average_order_value,
    last_order_date,
    average_days_between_restrings
  )
  SELECT 
    player_email,
    COALESCE(customer_name, 'Unknown'),
    customer_phone,
    order_count,
    total_revenue,
    calculate_player_ltv(player_email),
    avg_order_val,
    last_order,
    avg_days
  FROM orders
  WHERE customer_email = player_email
  ORDER BY created_at DESC
  LIMIT 1
  ON CONFLICT (email) DO UPDATE SET
    total_orders = order_count,
    total_spent = total_revenue,
    lifetime_value = calculate_player_ltv(player_email),
    average_order_value = avg_order_val,
    last_order_date = last_order,
    average_days_between_restrings = avg_days,
    updated_at = NOW();
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON TABLE inventory_items IS 'Tracks all inventory items (strings, grips, accessories) with stock levels';
COMMENT ON TABLE inventory_transactions IS 'Logs all inventory movements (usage, restocking, adjustments)';
COMMENT ON TABLE player_profiles IS 'Extended customer profiles with analytics and LTV calculations';
COMMENT ON TABLE player_rackets IS 'Customer racket specifications and stringing history';
COMMENT ON TABLE restring_reminders IS 'Automated restring reminder schedule and tracking';
COMMENT ON TABLE business_metrics IS 'Daily business metrics cache for fast dashboard loading';
