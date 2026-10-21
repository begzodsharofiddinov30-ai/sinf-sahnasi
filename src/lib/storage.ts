// Xavfsiz localStorage: xato bo'lsa jim turadi, ilova ishlashda davom etadi
const PREFIX = 'sinf-sahnasi:';

// O'zgarishlarni kuzatish (bulut sinxronlash uchun)
type Listener = (key: string) => void;
const listeners = new Set<Listener>();
let muted = 0;

export function onStorageWrite(cb: Listener): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

/** Ichidagi yozuvlar kuzatuvchilarga xabar bermaydi (bulutdan kelgan ma'lumotni yozish uchun) */
export function withoutNotify(fn: () => void): void {
  muted++;
  try {
    fn();
  } finally {
    muted--;
  }
}

function notify(key: string) {
  if (muted > 0) return;
  listeners.forEach((cb) => {
    try {
      cb(key);
    } catch {
      // e'tiborsiz
    }
  });
}

// Tashqi (bulutdan kelgan) o'zgarishlar: provayderlar holatini qayta o'qiydi
type ExternalListener = (keys: string[]) => void;
const external = new Set<ExternalListener>();

export function onExternalChange(cb: ExternalListener): () => void {
  external.add(cb);
  return () => external.delete(cb);
}

export function emitExternal(keys: string[]): void {
  external.forEach((cb) => {
    try {
      cb(keys);
    } catch {
      // e'tiborsiz
    }
  });
}

/** Saqlangan qiymatning xom matni (o'zgarishni solishtirish uchun) */
export function readRaw(key: string): string | null {
  try {
    return getStore()?.getItem(PREFIX + key) ?? null;
  } catch {
    return null;
  }
}

function getStore(): Storage | null {
  try {
    return typeof window !== 'undefined' ? window.localStorage : null;
  } catch {
    return null;
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = getStore()?.getItem(PREFIX + key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): boolean {
  try {
    const store = getStore();
    if (!store) return false;
    store.setItem(PREFIX + key, JSON.stringify(value));
    notify(key);
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key: string): void {
  try {
    getStore()?.removeItem(PREFIX + key);
    notify(key);
  } catch {
    // e'tiborsiz
  }
}

export function storageAvailable(): boolean {
  try {
    const store = getStore();
    if (!store) return false;
    const probe = PREFIX + '__probe';
    store.setItem(probe, '1');
    store.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}
