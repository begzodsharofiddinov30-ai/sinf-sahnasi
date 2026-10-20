// Fonda sinxronlash: o'zgarish bo'lsa 2,5 soniyadan keyin bulutga yuboradi; internet qaytsa — qayta urinadi
import { useEffect } from 'react';
import { changedSinceSnapshot, cloudEnabled, loadMeta, markDirty, pushNow, SYNC_KEYS, takeSnapshot } from '../lib/cloud';
import { onStorageWrite } from '../lib/storage';
import { useTeacher } from './TeacherProvider';

const DEBOUNCE_MS = 2500;

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
    takeSnapshot();
    const off = onStorageWrite((key) => {
      if (!(SYNC_KEYS as readonly string[]).includes(key) || !changedSinceSnapshot(key)) return;
      markDirty();
      schedule();
    });
    const onOnline = () => loadMeta().pending && flush();
    const onHide = () => document.visibilityState === 'hidden' && loadMeta().pending && flush();
    window.addEventListener('online', onOnline);
    document.addEventListener('visibilitychange', onHide);
    if (loadMeta().pending) schedule();
    return () => {
      off();
      clearTimeout(timer);
      window.removeEventListener('online', onOnline);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, [phone, first, last]);

  return null;
}
