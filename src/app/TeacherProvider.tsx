// O'qituvchi profili konteksti va kirish darvozasi
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { RegisterPage } from '../pages/Register';
import { clearTeacher, loadTeacher, saveTeacher, type Teacher } from './teacher';

interface TeacherCtx {
  teacher: Teacher | null;
  register: (firstName: string, lastName: string) => void;
  signOut: () => void;
}

const Ctx = createContext<TeacherCtx>({ teacher: null, register: () => {}, signOut: () => {} });

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [teacher, setTeacher] = useState<Teacher | null>(loadTeacher);
  const register = useCallback((f: string, l: string) => setTeacher(saveTeacher(f, l)), []);
  const signOut = useCallback(() => {
    clearTeacher();
    setTeacher(null);
  }, []);
  const value = useMemo(() => ({ teacher, register, signOut }), [teacher, register, signOut]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useTeacher(): TeacherCtx {
  return useContext(Ctx);
}

/** Ro'yxatdan o'tmagan bo'lsa — avval "Xush kelibsiz" oynasi */
export function TeacherGate({ children }: { children: ReactNode }) {
  const { teacher } = useTeacher();
  return teacher ? <>{children}</> : <RegisterPage />;
}
