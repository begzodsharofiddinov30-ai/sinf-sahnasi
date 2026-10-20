// Mashqlar mantiqi (UI'siz, test qilish oson)
import type { ChooseAnswerScene, ExplainStep, Visual } from '../content/schema';

/** Satrdan barqaror son (urug') hosil qiladi */
export function hashSeed(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Kichik, takrorlanuvchi tasodifiy sonlar generatori */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface ItemPos {
  /** foizda, markaz */
  x: number;
  y: number;
  rot: number;
}

export interface Layout {
  positions: ItemPos[];
  cols: number;
  rows: number;
}

/** Narsalarni to'r ichida tarqoq joylashtiradi: ikkitasi bir katakka tushmaydi */
export function scatterLayout(count: number, seed: number): Layout {
  const rand = mulberry32(seed);
  const cols = Math.max(1, Math.ceil(Math.sqrt(count * 1.8)));
  const rows = Math.max(1, Math.ceil((count * 1.25) / cols));
  const cells = Array.from({ length: cols * rows }, (_, i) => i);
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [cells[i], cells[j]] = [cells[j], cells[i]];
  }
  const cw = 84 / cols;
  const ch = 80 / rows;
  const positions = cells
    .slice(0, count)
    .sort((a, b) => a - b)
    .map((cell) => {
      const c = cell % cols;
      const r = Math.floor(cell / cols);
      return {
        x: 8 + cw * (c + 0.5 + (rand() - 0.5) * 0.4),
        y: 10 + ch * (r + 0.5 + (rand() - 0.5) * 0.4),
        rot: Math.round((rand() - 0.5) * 24),
      };
    });
  return { positions, cols, rows };
}

/** Bir yoki ikki qatorda, beshtalik guruhlar orasida bo'shliq bilan */
export function rowLayout(count: number): Layout {
  const rows = count > 10 ? 2 : 1;
  const perRow = Math.ceil(count / rows);
  const positions: ItemPos[] = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / perRow);
    const c = i % perRow;
    const inRow = r === rows - 1 ? count - perRow * (rows - 1) : perRow;
    const gaps = Math.floor((inRow - 1) / 5);
    const slots = inRow + gaps * 0.6;
    const pos = c + Math.floor(c / 5) * 0.6;
    positions.push({ x: 50 + ((pos + 0.5) / slots - 0.5) * Math.min(92, slots * 14), y: rows === 1 ? 50 : 30 + r * 40, rot: 0 });
  }
  return { positions, cols: perRow, rows };
}

/** Bosilgan narsalar tartibiga yangisini qo'shadi (takror bosish hisobga olinmaydi) */
export function tapItem(order: number[], index: number, count: number): number[] {
  if (index < 0 || index >= count || order.includes(index) || order.length >= count) return order;
  return [...order, index];
}

/** "Javobni ko'rsatish": qolganlarini tartib bilan to'ldiradi */
export function completeOrder(order: number[], count: number): number[] {
  const rest = Array.from({ length: count }, (_, i) => i).filter((i) => !order.includes(i));
  return [...order, ...rest];
}

export type ChoiceResult = 'correct' | 'wrong';

export function evaluateChoice(scene: Pick<ChooseAnswerScene, 'correct' | 'options'>, index: number): ChoiceResult {
  return index === scene.correct ? 'correct' : 'wrong';
}

/** Tushuntirish sahnasida hozir ko'rinadigan tasvirlar (oxirgi "replace"dan boshlab) */
export function visibleVisuals(steps: ExplainStep[], upTo: number): { key: number; visual: Visual }[] {
  const end = Math.min(upTo, steps.length - 1);
  let start = 0;
  for (let i = end; i >= 0; i--) {
    if (steps[i].replace) {
      start = i;
      break;
    }
  }
  const out: { key: number; visual: Visual }[] = [];
  for (let i = start; i <= end; i++) {
    const v = steps[i].visual;
    if (v) out.push({ key: i, visual: v });
  }
  return out;
}

/** Barqaror aralashtirish; iloji bo'lsa asl tartibdan farq qiladi */
export function shuffleSeeded<T>(items: readonly T[], seed: number): T[] {
  const rand = mulberry32(seed);
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  if (out.length > 1 && out.every((x, i) => x === items[i])) out.push(out.shift() as T);
  return out;
}

/** Tartib raqamlarini aralashtiradi: [2, 0, 1] kabi */
export function shuffledIndices(n: number, seed: number): number[] {
  return shuffleSeeded(
    Array.from({ length: n }, (_, i) => i),
    seed,
  );
}

// ---- So'z yasash ----

export interface PlaceResult {
  ok: boolean;
  slots: (string | null)[];
  index: number;
}

/** Bo'lakni slotga qo'yadi. slotIndex berilmasa — birinchi bo'sh slot */
export function placeTile(slots: (string | null)[], answer: readonly string[], tile: string, slotIndex?: number): PlaceResult {
  const index = slotIndex ?? slots.findIndex((x) => x === null);
  if (index < 0 || index >= slots.length || slots[index] !== null) return { ok: false, slots, index };
  if (answer[index] !== tile) return { ok: false, slots, index };
  const next = [...slots];
  next[index] = tile;
  return { ok: true, slots: next, index };
}

// ---- Son o'qi ----

export function clampTo(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

export function jump(pos: number, step: number, min: number, max: number): number {
  return clampTo(pos + step, min, max);
}

/** Belgining o'qdagi joyi, foizda */
export function tickPercent(n: number, min: number, max: number): number {
  const count = max - min + 1;
  return ((n - min + 0.5) / count) * 100;
}

// ---- O'nlik ramka ----

export function toggleCell(cells: readonly boolean[], i: number): boolean[] {
  if (i < 0 || i >= cells.length) return [...cells];
  const next = [...cells];
  next[i] = !next[i];
  return next;
}

/** Ramkani chapdan o'ngga n tagacha to'ldiradi */
export function fillTo(size: number, n: number): boolean[] {
  return Array.from({ length: size }, (_, i) => i < n);
}

export const countFilled = (cells: readonly boolean[]) => cells.filter(Boolean).length;

// ---- Soat ----

export interface Time12 {
  h: number;
  m: number;
}

/** Millar burchagi (gradus, 12 dan soat yo'nalishida) */
export function handAngles(t: Time12): { hour: number; minute: number } {
  return { hour: ((t.h % 12) * 30 + t.m * 0.5) % 360, minute: (t.m * 6) % 360 };
}

/** Daqiqani o'zgartiradi (soat ham kerak bo'lsa almashadi), 1..12 doirasida */
export function addMinutes(t: Time12, delta: number): Time12 {
  const total = (((t.h % 12) * 60 + t.m + delta) % 720 + 720) % 720;
  const h = Math.floor(total / 60);
  return { h: h === 0 ? 12 : h, m: total % 60 };
}

/** Burchakdan daqiqa (5 daqiqalik qadam) */
export function angleToMinute(angle: number, step = 5): number {
  const a = ((angle % 360) + 360) % 360;
  return (Math.round(a / (6 * step)) * step) % 60;
}

/** Burchakdan soat (1..12) */
export function angleToHour(angle: number): number {
  const a = ((angle % 360) + 360) % 360;
  const h = Math.floor(a / 30);
  return h === 0 ? 12 : h;
}

/** Markazdan nuqtagacha burchak (12 = 0°, soat yo'nalishida) */
export function pointAngle(cx: number, cy: number, x: number, y: number): number {
  const deg = (Math.atan2(x - cx, cy - y) * 180) / Math.PI;
  return (deg + 360) % 360;
}

export const sameTime = (a: Time12, b: Time12) => a.h % 12 === b.h % 12 && a.m === b.m;

export function formatClock(t: Time12): string {
  return `${t.h}:${String(t.m).padStart(2, '0')}`;
}
