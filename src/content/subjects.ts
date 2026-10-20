// Sinflar va fanlar ro'yxati — yangi fan qo'shish uchun shu faylni tahrirlang
export const GRADES = [1, 2, 3, 4] as const;
export type Grade = (typeof GRADES)[number];

export type SubjectIcon = 'math' | 'letters' | 'book' | 'globe';

export interface SubjectConfig {
  id: string;
  title: string;
  icon: SubjectIcon;
  /** Kartochka rangi (Tailwind klasslari to'liq yozilishi shart) */
  tone: string;
}

export const SUBJECTS = [
  { id: 'matematika', title: 'Matematika', icon: 'math', tone: 'bg-[#DCE9F7] text-[#1B4A80]' },
  { id: 'ona-tili', title: 'Ona tili', icon: 'letters', tone: 'bg-[#FDE3CC] text-[#8A3B0B]' },
  { id: 'oqish', title: 'O‘qish', icon: 'book', tone: 'bg-[#DDF0D5] text-[#2F5D1F]' },
  { id: 'olam', title: 'Atrofimizdagi olam', icon: 'globe', tone: 'bg-[#D4EFEC] text-[#155E58]' },
] as const satisfies readonly SubjectConfig[];

export type SubjectId = (typeof SUBJECTS)[number]['id'];

export const SUBJECT_IDS: readonly string[] = SUBJECTS.map((s) => s.id);

export function findSubject(id: string | undefined): SubjectConfig | undefined {
  return SUBJECTS.find((s) => s.id === id);
}

export function parseGrade(value: string | undefined): Grade | null {
  const n = Number(value);
  return (GRADES as readonly number[]).includes(n) ? (n as Grade) : null;
}
