// Bulut: o'qituvchi ma'lumotlarini boshqa kompyuterlar bilan sinxronlash.
// Har bir bo'lim (sinf ro'yxati, hisob, sozlamalar...) o'z vaqti bilan alohida birlashtiriladi.
// Internet bo'lmasa — hamma narsa mahalliy ishlaydi, keyin yuklanadi.
import { emitExternal, readJSON, readRaw, removeKey, withoutNotify, writeJSON } from './storage';

export const SYNC_KEYS = ['settings', 'favourites', 'lastLesson', 'classList', 'scores'] as const;
export type SyncKey = (typeof SYNC_KEYS)[number];
type Stamps = Record<string, number>;

export interface CloudIdentity {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CloudMeta {
  /** Har bir bo'lim shu kompyuterda oxirgi o'zgargan (yoki bulutdan olingan) vaqt, ms */
  stamps: Stamps;
  /** Oxirgi muvaffaqiyatli sinxronlash (ms) */
  syncedAt: number;
  /** Yuborilmagan o'zgarish bor */
  pending: boolean;
}

export type ApiOk = {
  ok: true;
  teacher: CloudIdentity;
  data: Record<string, unknown>;
  stamps?: Stamps;
  updatedAt: number;
  created?: boolean;
  deleted?: boolean;
};
export type ApiErr = { ok: false; error: string; message?: string };

const META = 'cloudMeta';

export function cloudEnabled(): boolean {
  try {
    return !__PORTABLE__ && /^https?:$/.test(location.protocol);
  } catch {
    return false;
  }
}

export function loadMeta(): CloudMeta {
  const m = readJSON<(Partial<CloudMeta> & { updatedAt?: number }) | null>(META, null);
  let stamps: Stamps = {};
  if (m?.stamps && typeof m.stamps === 'object') {
    for (const [k, v] of Object.entries(m.stamps)) if (typeof v === 'number') stamps[k] = v;
  } else if (typeof m?.updatedAt === 'number' && m.updatedAt > 0) {
    // eski ko'rinish: bitta umumiy vaqt
    stamps = Object.fromEntries(SYNC_KEYS.filter((k) => readRaw(k) != null).map((k) => [k, m.updatedAt as number]));
  }
  return { stamps, syncedAt: typeof m?.syncedAt === 'number' ? m.syncedAt : 0, pending: Boolean(m?.pending) };
}

function saveMeta(patch: Partial<CloudMeta>): CloudMeta {
  const next = { ...loadMeta(), ...patch };
  withoutNotify(() => writeJSON(META, next));
  emit();
  return next;
}

// --- Holat kuzatuvchilari (Sozlamalar sahifasi uchun) ---
export type CloudStatus = 'local' | 'synced' | 'pending' | 'syncing' | 'error';
let status: CloudStatus = 'local';
const subs = new Set<() => void>();
function emit() {
  subs.forEach((f) => f());
}
export function setCloudStatus(s: CloudStatus) {
  status = s;
  emit();
}
export function getCloudStatus(): CloudStatus {
  return status;
}
export function subscribeCloud(f: () => void): () => void {
  subs.add(f);
  return () => subs.delete(f);
}

// --- Mahalliy ma'lumot ---
const snapshot = new Map<string, string | null>();

/** Bulutga yuboriladigan narsalar */
export function collectLocal(): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const k of SYNC_KEYS) {
    const raw = readRaw(k);
    if (raw == null) continue;
    try {
      out[k] = JSON.parse(raw);
    } catch {
      // buzilgan yozuv — o'tkazib yuboriladi
    }
  }
  return out;
}

export function hasLocalData(): boolean {
  return Object.keys(collectLocal()).length > 0;
}

export function takeSnapshot(): void {
  for (const k of SYNC_KEYS) snapshot.set(k, readRaw(k));
}

/** Haqiqatan o'zgardimi (provayderlar bir xil qiymatni qayta yozishi o'zgarish emas) */
export function changedSinceSnapshot(key: string): boolean {
  const now = readRaw(key);
  if (!snapshot.has(key)) {
    snapshot.set(key, now);
    return true;
  }
  if (snapshot.get(key) === now) return false;
  snapshot.set(key, now);
  return true;
}

/** Bo'lim shu kompyuterda o'zgardi */
export function markDirty(key: string): void {
  const meta = loadMeta();
  saveMeta({ stamps: { ...meta.stamps, [key]: Math.max(Date.now(), (meta.stamps[key] ?? 0) + 1) }, pending: true });
  setCloudStatus('pending');
}

/**
 * Bulut javobini qo'llaydi: faqat bulutdagi vaqti yangiroq bo'limlar yoziladi.
 * O'zgargan bo'limlar ro'yxatini qaytaradi (ochiq sahifa ularni qayta o'qiydi).
 */
export function applyServer(data: Record<string, unknown>, serverStamps: Stamps | undefined, updatedAt: number): string[] {
  const meta = loadMeta();
  const remote: Stamps = serverStamps ?? Object.fromEntries(Object.keys(data).map((k) => [k, updatedAt]));
  const stamps = { ...meta.stamps };
  const changed: string[] = [];
  withoutNotify(() => {
    for (const k of SYNC_KEYS) {
      const rs = remote[k] ?? 0;
      if (rs <= (stamps[k] ?? 0)) continue;
      const before = readRaw(k);
      if (k in data) writeJSON(k, data[k]);
      else removeKey(k);
      if (readRaw(k) !== before) changed.push(k);
      stamps[k] = rs;
    }
  });
  takeSnapshot();
  saveMeta({ stamps, syncedAt: Date.now() });
  if (changed.length) emitExternal(changed);
  return changed;
}

/** Chiqishda: shu kompyuterdan o'qituvchi ma'lumotini olib tashlash */
export function clearLocalData(): void {
  withoutNotify(() => {
    for (const k of SYNC_KEYS) removeKey(k);
    removeKey(META);
  });
  snapshot.clear();
  setCloudStatus('local');
}

// --- Tarmoq ---
/** null — bulut mavjud emas (internet yo'q, server yo'q, mahalliy versiya) */
async function post(path: string, body: unknown, timeoutMs = 8000): Promise<ApiOk | ApiErr | null> {
  if (!cloudEnabled()) return null;
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeoutMs);
  try {
    const res = await fetch(path, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: ctl.signal,
      cache: 'no-store',
    });
    if (!(res.headers.get('content-type') ?? '').includes('application/json')) return null;
    const json = (await res.json()) as ApiOk | ApiErr;
    if (!json.ok && (json.error === 'server' || json.error === 'rate')) return null;
    return json;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

const payload = () => {
  const meta = loadMeta();
  return { data: collectLocal(), stamps: meta.stamps };
};

/** Kirish: mahalliy va bulutdagi ma'lumot bo'limma-bo'lim birlashtiriladi */
export async function cloudLogin(id: CloudIdentity): Promise<ApiOk | ApiErr | null> {
  const res = await post('/api/login', { ...id, ...payload() });
  if (!res || !res.ok) return res;
  applyServer(res.data, res.stamps, res.updatedAt);
  saveMeta({ pending: false, syncedAt: Date.now() });
  setCloudStatus('synced');
  return res;
}

let inflight: Promise<boolean> | null = null;

/** O'zgarishlarni yuborish va bulutdagi yangiliklarni olish. true — shu kompyuterdagi ma'lumot yangilandi */
export function pushNow(id: CloudIdentity): Promise<boolean> {
  // Bir vaqtda faqat bitta so'rov
  inflight ??= (async () => {
    setCloudStatus('syncing');
    const res = await post('/api/sync', { ...id, ...payload() });
    if (!res || !res.ok) {
      setCloudStatus(res ? 'error' : loadMeta().pending ? 'pending' : 'local');
      return false;
    }
    const changed = applyServer(res.data, res.stamps, res.updatedAt);
    saveMeta({ pending: false, syncedAt: Date.now() });
    setCloudStatus('synced');
    return changed.length > 0;
  })().finally(() => {
    inflight = null;
  });
  return inflight;
}

/** Bulutdagi yangiroq ma'lumotni olish (yuborilmagan o'zgarish bo'lsa — avval yuboradi) */
export async function pullNow(id: CloudIdentity): Promise<boolean> {
  if (loadMeta().pending) return pushNow(id);
  setCloudStatus('syncing');
  const res = await post('/api/sync', id);
  if (!res || !res.ok) {
    setCloudStatus(res ? 'error' : loadMeta().syncedAt ? 'pending' : 'local');
    return false;
  }
  const changed = applyServer(res.data, res.stamps, res.updatedAt);
  setCloudStatus('synced');
  return changed.length > 0;
}

/** Hisobni bulutdan butunlay o'chirish */
export async function deleteAccount(id: CloudIdentity): Promise<{ ok: true } | { ok: false; message: string }> {
  const res = await post('/api/delete', id);
  if (!res) return { ok: false, message: 'Internet yo‘q yoki server javob bermadi. Keyinroq urinib ko‘ring.' };
  if (!res.ok && res.error !== 'not-found') return { ok: false, message: res.message ?? 'O‘chirib bo‘lmadi.' };
  return { ok: true };
}
