// Bulut: o'qituvchi ma'lumotlarini boshqa kompyuterlar bilan sinxronlash.
// Internet bo'lmasa — hamma narsa mahalliy ishlaydi, keyin yuklanadi.
import { readJSON, readRaw, removeKey, withoutNotify, writeJSON } from './storage';

export const SYNC_KEYS = ['settings', 'favourites', 'lastLesson', 'classList', 'scores'] as const;
export type SyncKey = (typeof SYNC_KEYS)[number];

export interface CloudIdentity {
  firstName: string;
  lastName: string;
  phone: string;
}

export interface CloudMeta {
  /** Mahalliy ma'lumot oxirgi o'zgargan vaqt (ms) */
  updatedAt: number;
  /** Oxirgi muvaffaqiyatli sinxronlash (ms) */
  syncedAt: number;
  /** Yuborilmagan o'zgarish bor */
  pending: boolean;
}

export type ApiOk = { ok: true; teacher: CloudIdentity; data: Record<string, unknown>; updatedAt: number; created?: boolean };
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
  const m = readJSON<Partial<CloudMeta> | null>(META, null);
  return {
    updatedAt: typeof m?.updatedAt === 'number' ? m.updatedAt : 0,
    syncedAt: typeof m?.syncedAt === 'number' ? m.syncedAt : 0,
    pending: Boolean(m?.pending),
  };
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

export function markDirty(): void {
  saveMeta({ updatedAt: Date.now(), pending: true });
  setCloudStatus('pending');
}

/** Bulutdan kelgan ma'lumotni yozadi (kuzatuvchilarga "o'zgarish" deb bildirmaydi) */
export function applyRemote(data: Record<string, unknown>, updatedAt: number): void {
  withoutNotify(() => {
    for (const k of SYNC_KEYS) {
      if (k in data) writeJSON(k, data[k]);
      else removeKey(k);
    }
  });
  takeSnapshot();
  saveMeta({ updatedAt, syncedAt: Date.now(), pending: false });
}

/** Chiqishda: shu kompyuterdan o'qituvchi ma'lumotini olib tashlash (bulutda qoladi) */
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

/**
 * Kirish: bulutda ma'lumot bo'lsa va u yangiroq bo'lsa — shu kompyuterga yoziladi,
 * aks holda mahalliy ma'lumot bulutga yuboriladi.
 */
export async function cloudLogin(id: CloudIdentity): Promise<ApiOk | ApiErr | null> {
  const meta = loadMeta();
  const local = collectLocal();
  const res = await post('/api/login', { ...id, data: local, updatedAt: meta.updatedAt || Date.now() });
  if (!res || !res.ok) return res;
  if (res.updatedAt > 0 && Object.keys(res.data).length > 0 && (res.updatedAt >= meta.updatedAt || !hasLocalData())) {
    applyRemote(res.data, res.updatedAt);
  } else {
    takeSnapshot();
    if (!res.created && hasLocalData()) {
      saveMeta({ updatedAt: meta.updatedAt || Date.now(), pending: true });
      await pushNow(id);
    } else saveMeta({ syncedAt: Date.now(), pending: false });
  }
  setCloudStatus(loadMeta().pending ? 'pending' : 'synced');
  return res;
}

/** O'zgarishlarni yuborish; serverdagi yangiroq bo'lsa — uni oladi. true — bulut ma'lumoti yozildi */
export async function pushNow(id: CloudIdentity): Promise<boolean> {
  const meta = loadMeta();
  setCloudStatus('syncing');
  const res = await post('/api/sync', { ...id, data: collectLocal(), updatedAt: meta.updatedAt });
  if (!res || !res.ok) {
    setCloudStatus(res ? 'error' : 'pending');
    return false;
  }
  if (res.updatedAt > meta.updatedAt) {
    applyRemote(res.data, res.updatedAt);
    setCloudStatus('synced');
    return true;
  }
  saveMeta({ pending: false, syncedAt: Date.now() });
  setCloudStatus('synced');
  return false;
}

/** Ochilishda: bulutdagi yangiroq ma'lumotni olish. true — ma'lumot yangilandi */
export async function pullOnStart(id: CloudIdentity): Promise<boolean> {
  const meta = loadMeta();
  if (meta.pending) {
    const changed = await pushNow(id);
    takeSnapshot();
    return changed;
  }
  const res = await post('/api/sync', id);
  takeSnapshot();
  if (!res || !res.ok) {
    setCloudStatus(res ? 'error' : meta.syncedAt ? 'pending' : 'local');
    return false;
  }
  if (res.updatedAt > meta.updatedAt) {
    applyRemote(res.data, res.updatedAt);
    setCloudStatus('synced');
    return true;
  }
  saveMeta({ syncedAt: Date.now() });
  setCloudStatus('synced');
  return false;
}
