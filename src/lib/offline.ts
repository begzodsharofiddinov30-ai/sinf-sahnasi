// Oflayn tayyorlik holati (service worker va kesh)
export type OfflineState = 'ready' | 'pending' | 'none' | 'unsupported' | 'file';

export interface OfflineStatus {
  state: OfflineState;
  /** Keshdagi fayllar soni (bilinsa) */
  files?: number;
}

export async function getOfflineStatus(): Promise<OfflineStatus> {
  try {
    if (location.protocol === 'file:') return { state: 'file' };
    if (!('serviceWorker' in navigator) || typeof caches === 'undefined') return { state: 'unsupported' };
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return { state: 'none' };
    if (!reg.active) return { state: 'pending' };
    const keys = await caches.keys();
    let files = 0;
    for (const k of keys.filter((k) => k.includes('precache'))) files += (await (await caches.open(k)).keys()).length;
    return files > 0 ? { state: 'ready', files } : { state: 'pending' };
  } catch {
    return { state: 'unsupported' };
  }
}

export const OFFLINE_TEXT: Record<OfflineState, string> = {
  ready: 'Oflayn tayyor: internet bo‘lmasa ham ishlaydi',
  pending: 'Yuklanmoqda… internetni o‘chirmang',
  none: 'Hali oflayn rejim sozlanmagan',
  unsupported: 'Bu brauzer oflayn rejimni qo‘llamaydi',
  file: 'Portativ versiya: fayldan ochilgan, internet kerak emas',
};
