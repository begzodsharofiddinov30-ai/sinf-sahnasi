// Bazada jadvallarni yaratish (bir marta): node --env-file=.env.local --import tsx scripts/db-migrate.ts
import { neon } from '@neondatabase/serverless';
import { SCHEMA } from '../server/pg.js';

const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
if (!url) {
  console.error('DATABASE_URL topilmadi (.env.local)');
  process.exit(1);
}
const sql = neon(url);
for (const q of SCHEMA) await sql(q);
console.log('Jadvallar tayyor:', ((await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY 1`) as { table_name: string }[]).map((r) => r.table_name).join(', '));
