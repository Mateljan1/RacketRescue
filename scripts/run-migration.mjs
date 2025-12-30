import pg from 'pg'
const { Client } = pg

const client = new Client({
  connectionString: 'postgresql://postgres.cjdglgrkzfjznuhorkoy:RacketRescue.1@aws-0-us-west-1.pooler.supabase.com:5432/postgres',
  ssl: { rejectUnauthorized: false }
})

const migration = `
-- NextAuth required tables
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text unique not null,
  email_verified timestamptz,
  image text,
  stripe_customer_id text,
  membership_tier text check (membership_tier in ('standard', 'elite', 'family')),
  membership_status text check (membership_status in ('active', 'cancelled', 'past_due')),
  activecampaign_contact_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  type text not null,
  provider text not null,
  provider_account_id text not null,
  refresh_token text,
  access_token text,
  expires_at bigint,
  token_type text,
  scope text,
  id_token text,
  session_state text,
  unique(provider, provider_account_id)
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  session_token text unique not null,
  user_id uuid not null references users(id) on delete cascade,
  expires timestamptz not null
);

create table if not exists verification_tokens (
  identifier text not null,
  token text unique not null,
  expires timestamptz not null,
  primary key (identifier, token)
);

-- Orders table
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id),
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text,
  status text not null default 'pending',
  service_package text,
  is_express boolean default false,
  racket_brand text,
  racket_model text,
  string_name text,
  main_tension integer,
  cross_tension integer,
  add_regrip boolean default false,
  add_overgrip boolean default false,
  add_dampener boolean default false,
  dampener_bundle boolean default false,
  add_second_racket boolean default false,
  customer_email text not null,
  customer_name text,
  customer_phone text,
  pickup_address text,
  delivery_address text,
  pickup_time text,
  pickup_date date,
  special_instructions text,
  subtotal_cents integer,
  pickup_fee_cents integer default 0,
  discount_cents integer default 0,
  total_cents integer,
  is_member boolean default false,
  membership_tier_at_order text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Order status history
create table if not exists order_status_history (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references orders(id) on delete cascade,
  status text not null,
  note text,
  updated_by text,
  created_at timestamptz default now()
);
`

async function run() {
  try {
    await client.connect()
    console.log('Connected to Supabase PostgreSQL')

    await client.query(migration)
    console.log('Migration completed successfully!')

    // Verify tables were created
    const result = await client.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_name IN ('users', 'accounts', 'sessions', 'verification_tokens', 'orders', 'order_status_history')
    `)
    console.log('Tables created:', result.rows.map(r => r.table_name).join(', '))

  } catch (err) {
    console.error('Error:', err.message)
  } finally {
    await client.end()
  }
}

run()
