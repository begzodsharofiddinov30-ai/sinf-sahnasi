// O'qituvchi profili, bulut bilan kirish va kirish darvozasi
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { Mascot } from '../components/Mascot';
import { RegisterPage } from '../pages/Register';
import { clearLocalData, cloudEnabled, cloudLogin, loadMeta, pullOnStart, pushNow, setCloudStatus } from '../lib/cloud';
import { clearTeacher, loadTeacher, normalizePhone, saveTeacher, type Teacher } from './teacher';

export type RegisterResult = { ok: true; offline: boolean } | { ok: false; message: string };

interface TeacherCtx {
  teacher: Teacher | null;
  register: (firstName: string, lastName: string, phone?: string) => Promise<RegisterResult>;
  signOut: () => Promise<void>;
}

const Ctx = createContext<TeacherCtx>({
  teacher: null,
  register: async () => ({ ok: true, offline: true }),
  signOut: async () => {},
});

const withTimeout = <T,>(p: Promise<T>, ms: number, fallback: T) =>
  Promise.race([p, new Promise<T>((r) => setTimeout(() => r(fallback), ms))]);

const identity = (t: Teacher) => (t.phone ? { firstName: t.firstName, lastName: t.lastName, phone: t.phone } : null);

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teacher, setTeacher] = useState<Teacher | null>(loadTeacher);
  // Ochilishda bulutdagi yangiroq ma'lumotni kutish (ko'pi bilan 4 soniya)
  const [ready, setReady] = useState(() => !(teacher?.phone && cloudEnabled() && navigator.onLine !== false));

  useEffect(() => {
    if (ready || !teacher) return;
    const id = identity(teacher);
    if (!id) return setReady(true);
    void withTimeout(pullOnStart(id), 4000, false).finally(() => setReady(true));
    // faqat birinchi ochilishda
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = useCallback(async (f: string, l: string, phone?: string): Promise<RegisterResult> => {
    const p = phone ? normalizePhone(phone) : null;
    if (p && cloudEnabled()) {
      const res = await cloudLogin({ firstName: f.trim(), lastName: l.trim(), phone: p });
      if (res && !res.ok) return { ok: false, message: res.message ?? 'Kirib bo‘lmadi.' };
      // Bulutdagi yozuv asosiy: ismlar o'shandagidek saqlanadi
      const t = res ? saveTeacher(res.teacher.firstName, res.teacher.lastName, p) : saveTeacher(f, l, p);
      if (!res) setCloudStatus(loadMeta().pending ? 'pending' : 'local');
      setTeacher(t);
      setReady(true);
      return { ok: true, offline: !res };
    }
    setTeacher(saveTeacher(f, l, p ?? undefined));
    setReady(true);
    return { ok: true, offline: true };
  }, []);

  const signOut = useCallback(async () => {
    const id = teacher ? identity(teacher) : null;
    // Yuborilmagan o'zgarishlarni avval bulutga yuklashga urinamiz
    if (id && cloudEnabled() && loadMeta().pending) await withTimeout(pushNow(id), 4000, false);
    if (id) clearLocalData();
    clearTeacher();
    setTeacher(null);
  }, [teacher]);

  const value = useMemo(() => ({ teacher, register, signOut }), [teacher, register, signOut]);

  return (
    <Ctx.Provider value={value}>
      {ready ? (
        children
      ) : (
        <div className="grid min-h-[100dvh] place-items-center bg-bg" role="status">
          <div className="flex flex-col items-center gap-[1rem]">
            <span className="block h-[10rem]">
              <Mascot mood="think" className="h-full w-auto" />
            </span>
            <p className="text-lead font-extrabold text-ink-soft">Ma’lumotlar yuklanmoqda…</p>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}

export function useTeacher(): TeacherCtx {
  return useContext(Ctx);
}

/** Ro'yxatdan o'tmagan (yoki telefon raqami yo'q) bo'lsa — avval kirish oynasi. Admin sahifasi bundan mustasno. */
export function TeacherGate({ children }: { children: ReactNode }) {
  const { teacher } = useTeacher();
  const [hash, setHash] = useState(() => (typeof location !== 'undefined' ? location.hash : ''));
  useEffect(() => {
    const on = () => setHash(location.hash);
    window.addEventListener('hashchange', on);
    return () => window.removeEventListener('hashchange', on);
  }, []);
  if (hash.startsWith('#/admin')) return <>{children}</>;
  const needsPhone = teacher && !teacher.phone && cloudEnabled();
  return teacher && !needsPhone ? <>{children}</> : <RegisterPage existing={teacher ?? undefined} />;
}
