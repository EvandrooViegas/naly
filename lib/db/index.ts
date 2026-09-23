import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");

export const sql = neon(process.env.DATABASE_URL!);

/** Idempotent schema init — called on first API request */
export async function initDb() {
  await sql`
    CREATE TABLE IF NOT EXISTS connected_accounts (
      id              TEXT        PRIMARY KEY,
      user_id         TEXT        NOT NULL,
      platform        TEXT        NOT NULL,
      username        TEXT        NOT NULL,
      display_name    TEXT        NOT NULL,
      profile_picture TEXT,
      access_token    TEXT,
      refresh_token   TEXT,
      token_expires_at TIMESTAMPTZ,
      platform_user_id TEXT,
      is_connected    BOOLEAN     NOT NULL DEFAULT TRUE,
      connected_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql`
    CREATE TABLE IF NOT EXISTS metrics_cache (
      id          SERIAL      PRIMARY KEY,
      account_id  TEXT        NOT NULL REFERENCES connected_accounts(id) ON DELETE CASCADE,
      metric_date DATE        NOT NULL,
      views       BIGINT      NOT NULL DEFAULT 0,
      likes       BIGINT      NOT NULL DEFAULT 0,
      followers   BIGINT      NOT NULL DEFAULT 0,
      engagement  NUMERIC(6,2) NOT NULL DEFAULT 0,
      fetched_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (account_id, metric_date)
    )
  `;
  await sql`
    CREATE INDEX IF NOT EXISTS idx_metrics_account_date
      ON metrics_cache (account_id, metric_date DESC)
  `;

  // Idempotently add OAuth columns to existing tables
  await sql`ALTER TABLE connected_accounts ADD COLUMN IF NOT EXISTS access_token TEXT`;
  await sql`ALTER TABLE connected_accounts ADD COLUMN IF NOT EXISTS refresh_token TEXT`;
  await sql`ALTER TABLE connected_accounts ADD COLUMN IF NOT EXISTS token_expires_at TIMESTAMPTZ`;
  await sql`ALTER TABLE connected_accounts ADD COLUMN IF NOT EXISTS platform_user_id TEXT`;
}
