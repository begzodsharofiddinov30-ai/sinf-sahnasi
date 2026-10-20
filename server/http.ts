// So'rov/javob yordamchilari (Vercel Web handler'lari uchun)
import type { Store } from './core.js';
import { pgStore } from './pg.js';

let store: Store | null = null;
export function getStore(): Store {
  store ??= pgStore();
  return store;
}

export function clientIp(req: Request): string {
  return (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown';
}

export function json(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });
}

/** JSON tana (16 KB dan katta yoki noto'g'ri bo'lsa — null) */
export async function readBody(req: Request): Promise<Record<string, unknown> | null> {
  const text = await req.text();
  if (text.length > 80 * 1024) return null;
  try {
    const v = JSON.parse(text);
    return typeof v === 'object' && v !== null && !Array.isArray(v) ? v : null;
  } catch {
    return null;
  }
}

export async function guarded(fn: () => Promise<Response>): Promise<Response> {
  try {
    return await fn();
  } catch (e) {
    console.error(e);
    return json(503, { ok: false, error: 'server', message: 'Server vaqtincha ishlamayapti.' });
  }
}
