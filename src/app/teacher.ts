// O'qituvchi profili: faqat ism va familiya, parol yo'q, faqat shu kompyuterda saqlanadi
import { readJSON, removeKey, writeJSON } from '../lib/storage';

export interface Teacher {
  firstName: string;
  lastName: string;
  /** ISO sana */
  since: string;
}

const KEY = 'teacher';
const NAME_RE = /^[\p{L}‘’ʻʼ'`\- ]{2,30}$/u;

/** Bo'sh joylarni tozalaydi va har bir so'zni bosh harf bilan boshlaydi */
export function normalizeName(raw: string): string {
  return raw
    .replace(/\s+/g, ' ')
    .trim()
    .split(' ')
    .map((w) => (w ? w[0].toLocaleUpperCase('uz') + w.slice(1) : w))
    .join(' ');
}

/** Xato bo'lsa — o'zbekcha xabar, to'g'ri bo'lsa — null */
export function nameError(raw: string, what: 'Ism' | 'Familiya'): string | null {
  const v = normalizeName(raw);
  if (v.length < 2) return `${what} kamida 2 ta harf bo‘lsin`;
  if (v.length > 30) return `${what} 30 ta harfdan oshmasin`;
  if (!NAME_RE.test(v)) return `${what}da faqat harflar bo‘lsin`;
  return null;
}

export function loadTeacher(): Teacher | null {
  const t = readJSON<Partial<Teacher> | null>(KEY, null);
  if (!t || typeof t.firstName !== 'string' || typeof t.lastName !== 'string') return null;
  if (nameError(t.firstName, 'Ism') || nameError(t.lastName, 'Familiya')) return null;
  return { firstName: t.firstName, lastName: t.lastName, since: typeof t.since === 'string' ? t.since : '' };
}

export function saveTeacher(firstName: string, lastName: string): Teacher {
  const t: Teacher = { firstName: normalizeName(firstName), lastName: normalizeName(lastName), since: new Date().toISOString() };
  writeJSON(KEY, t);
  return t;
}

export function clearTeacher(): void {
  removeKey(KEY);
}

export const fullName = (t: Teacher) => `${t.firstName} ${t.lastName}`;
