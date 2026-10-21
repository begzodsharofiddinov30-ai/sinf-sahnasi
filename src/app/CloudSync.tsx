// Fonda sinxronlash: o'zgarish bo'lsa 2,5 soniyadan keyin bulutga yuboradi; internet qaytsa — qayta urinadi
import { useEffect } from 'react';
import { changedSinceSnapshot, cloudEnabled, loadMeta, markDirty, pullNow, pushNow, SYNC_KEYS, takeSnapshot } from '../lib/cloud';
import { onStorageWrite } from '../lib/storage';
import { useTeacher } from './TeacherProvider';

const DEBOUNCE_MS = 2500;
/** Sayt ochiq turganda bulutni tekshirish oralig'i */
export const PULL_MS = 60_000;
/** Oynaga qaytganda tez-tez tekshirmaslik uchun */
const MIN_PULL_GAP_MS = 15_000;

export function CloudSync() {
  const { teacher } = useTeacher();
  const phone = teacher?.phone;
  const first = teacher?.firstName;
  const last = teacher?.lastName;

  useEffect(() => {
    if (!phone || !first || !last || !cloudEnabled()) return;
    const id = { firstName: first, lastName: last, phone };
    let timer: ReturnType<typeof setTimeout> | undefined;
    const flush = () => {
      clearTimeout(timer);
      if (navigator.onLine === false) return;
      void pushNow(id);
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(flush, DEBOUNCE_MS);
    };
    let lastPull = Date.now();
    const pull = (force = false) => {
      if (navigator.onLine === false || document.visibilityState === 'hidden') return;
      if (!force && Date.now() - lastPull < MIN_PULL_GAP_MS) return;
      lastPull = Date.now();
      void pullNow(id);
    };
    takeSnapshot();
    const off = onStorageWrite((key) => {
      if (!(SYNC_KEYS as readonly string[]).includes(key) || !changedSinceSnapshot(key)) return;
      markDirty(key);
      schedule();
    });
    const onOnline = () => (loadMeta().pending ? flush() : pull(true));
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') {
        if (loadMeta().pending) flush();
      } else pull();
    };
    const onFocus = () => pull();
    window.addEventListener('online', onOnline);
    window.addEventListener('focus', onFocus);
    document.addEventListener('visibilitychange', onVisibility);
    const every = setInterval(() => pull(true), PULL_MS);
    if (loadMeta().pending) schedule();
    return () => {
      off();
      clearTimeout(timer);
      clearInterval(every);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('focus', onFocus);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [phone, first, last]);

  return null;
}
