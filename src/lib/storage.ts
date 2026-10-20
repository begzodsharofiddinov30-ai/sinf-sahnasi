// Xavfsiz localStorage: xato bo'lsa jim turadi, ilova ishlashda davom etadi
const PREFIX = 'sinf-sahnasi:';

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
    return true;
  } catch {
    return false;
  }
}

export function removeKey(key: string): void {
  try {
    getStore()?.removeItem(PREFIX + key);
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
