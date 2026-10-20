// O'qituvchi asboblari mantiqi (UI'siz)

export const MAX_NAMES = 60;
export const MAX_NAME_LEN = 30;

/** Har qatorda (yoki vergul bilan) bitta ism; takrorlar va bo'sh qatorlar olib tashlanadi */
export function parseNames(text: string): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of text.split(/[\n,;]+/)) {
    const name = raw.replace(/\s+/g, ' ').trim().slice(0, MAX_NAME_LEN);
    const key = name.toLowerCase();
    if (!name || seen.has(key)) continue;
    seen.add(key);
    out.push(name);
    if (out.length >= MAX_NAMES) break;
  }
  return out;
}

/**
 * Takrorlamasdan tanlash: hamma bir martadan tanlanmaguncha hech kim qayta chiqmaydi.
 * Yangi aylanishda oxirgi tanlangan bola darhol yana chiqmaydi.
 */
export function pickNext(
  all: readonly string[],
  pool: readonly string[],
  last: string | null,
  rand: () => number = Math.random,
): { name: string | null; pool: string[] } {
  if (all.length === 0) return { name: null, pool: [] };
  let p = pool.filter((n) => all.includes(n));
  if (p.length === 0) p = [...all];
  const candidates = p.length > 1 ? p.filter((n) => n !== last) : p;
  const list = candidates.length > 0 ? candidates : p;
  const name = list[Math.min(list.length - 1, Math.floor(rand() * list.length))];
  return { name, pool: p.filter((n) => n !== name) };
}

export const MILESTONE = 5;
export const MAX_SCORE = 999;

export function changeScore(score: number, delta: number): number {
  return Math.min(MAX_SCORE, Math.max(0, score + delta));
}

/** Har 5 ochkoda bayram */
export function crossedMilestone(prev: number, next: number): boolean {
  return next > prev && Math.floor(next / MILESTONE) > Math.floor(prev / MILESTONE);
}

export const DEFAULT_TEAMS = ['Lolalar', 'Chinorlar', 'Bulbullar'];

export function formatMs(ms: number): string {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

/** Spinner uchun kechikishlar: avval tez, keyin sekinlashadi (jami ~ms) */
export function spinDelays(total: number, frames: number): number[] {
  const weights = Array.from({ length: frames }, (_, i) => 1 + (i / frames) ** 2 * 6);
  const sum = weights.reduce((a, b) => a + b, 0);
  return weights.map((w) => Math.round((w / sum) * total));
}
