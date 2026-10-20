// Postgres (Neon) bazasi
import { neon } from '@neondatabase/serverless';
import type { Store, TeacherRow } from './core.js';

export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS teachers (
    phone text PRIMARY KEY,
    first_name text NOT NULL,
    last_name text NOT NULL,
    data jsonb NOT NULL DEFAULT '{}'::jsonb,
    data_updated_at bigint NOT NULL DEFAULT 0,
    created_at timestamptz NOT NULL DEFAULT now(),
    last_seen timestamptz NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS rate_limits (
    key text PRIMARY KEY,
    n integer NOT NULL,
    window_start timestamptz NOT NULL
  )`,
];

type Row = {
  phone: string;
  first_name: string;
  last_name: string;
  data: Record<string, unknown>;
  data_updated_at: string | number;
  created_at: string | Date;
  last_seen: string | Date;
};

const toRow = (r: Row): TeacherRow => ({
  phone: r.phone,
  firstName: r.first_name,
  lastName: r.last_name,
  data: r.data ?? {},
  dataUpdatedAt: Number(r.data_updated_at),
  createdAt: new Date(r.created_at).toISOString(),
  lastSeen: new Date(r.last_seen).toISOString(),
});

export function pgStore(url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL): Store {
  if (!url) throw new Error('DATABASE_URL yo‘q');
  const sql = neon(url);
  return {
    async get(phone) {
      const rows = (await sql`SELECT * FROM teachers WHERE phone = ${phone}`) as Row[];
      return rows[0] ? toRow(rows[0]) : null;
    },
    async create(r) {
      await sql`INSERT INTO teachers (phone, first_name, last_name, data, data_updated_at)
        VALUES (${r.phone}, ${r.firstName}, ${r.lastName}, ${JSON.stringify(r.data)}::jsonb, ${r.dataUpdatedAt})
        ON CONFLICT (phone) DO NOTHING`;
    },
    async saveData(phone, data, at) {
      await sql`UPDATE teachers SET data = ${JSON.stringify(data)}::jsonb, data_updated_at = ${at}, last_seen = now()
        WHERE phone = ${phone} AND data_updated_at < ${at}`;
    },
    async touch(phone) {
      await sql`UPDATE teachers SET last_seen = now() WHERE phone = ${phone}`;
    },
    async list() {
      return ((await sql`SELECT * FROM teachers ORDER BY created_at DESC LIMIT 5000`) as Row[]).map(toRow);
    },
    async hit(key, limit) {
      // Bir daqiqalik oyna
      const rows = (await sql`INSERT INTO rate_limits (key, n, window_start) VALUES (${key}, 1, now())
        ON CONFLICT (key) DO UPDATE SET
          n = CASE WHEN rate_limits.window_start < now() - interval '1 minute' THEN 1 ELSE rate_limits.n + 1 END,
          window_start = CASE WHEN rate_limits.window_start < now() - interval '1 minute' THEN now() ELSE rate_limits.window_start END
        RETURNING n`) as { n: number }[];
      return (rows[0]?.n ?? 1) <= limit;
    },
  };
}
