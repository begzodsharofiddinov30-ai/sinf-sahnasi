// Dars tarkibi sxemasi: darslar — bu ma'lumot, kod emas
import type { Grade, SubjectId } from './subjects';

/** Ichki SVG rasmlar kutubxonasi (src/components/Picture.tsx) */
export const PICTURE_NAMES = [
  'olma',
  'nok',
  'anor',
  'uzum',
  'yulduz',
  'koptok',
  'baliq',
  'gul',
  'qush',
  'mashina',
  'qalam',
  'barg',
  'quyosh',
  'bulut',
  'tomchi',
  'kitob',
  'daraxt',
  'qor',
  'suv',
  'muz',
  'choynak',
  'doira',
  'kvadrat',
  'uchburchak',
  'tortburchak',
  'mushuk',
  'it',
  'sigir',
  'quyon',
  'tulki',
  'svetofor',
  'sayyora',
  'sovun',
  'shisha',
  'qogoz',
  'tanga',
  'oy',
] as const;
export type PictureName = (typeof PICTURE_NAMES)[number];

export type MascotMood = 'neutral' | 'happy' | 'think' | 'cheer';
export const MASCOT_MOODS: readonly MascotMood[] = ['neutral', 'happy', 'think', 'cheer'];

/** Sahnadagi tasvir bo'laklari */
export type Visual =
  | { kind: 'items'; item: PictureName; count: number }
  | { kind: 'number'; value: number | string }
  | { kind: 'tiles'; items: string[]; highlight?: number[] }
  | { kind: 'word'; text: string; highlight?: number[] }
  | { kind: 'picture'; item: PictureName; label?: string }
  | { kind: 'mascot'; mood: MascotMood }
  | { kind: 'clock'; h: number; m: number }
  | { kind: 'tenframe'; count: number; frames?: 1 | 2 }
  /** O'nlik bloklar: tens ta o'nlik ustun + ones ta birlik kub */
  | { kind: 'blocks'; tens: number; ones: number }
  /** Teng guruhlar: groups ta guruh, har birida each ta rasm (ko'paytirish/bo'lish) */
  | { kind: 'groups'; item: PictureName; groups: number; each: number };

/** Barcha sahnalar uchun umumiy maydonlar */
export interface SceneBase {
  /** Dars ichida yagona */
  id: string;
  /** O'qituvchi uchun yashirin maslahat (H tugmasi) */
  hint?: string;
  /** public/ ichidagi fayl, masalan "audio/1-sinf/salom.mp3" */
  audio?: string;
  /** Ixtiyoriy taymer (soniya) */
  timerSec?: number;
}

export interface ExplainStep {
  /** **so'z** — ajratib ko'rsatiladi */
  text: string;
  visual?: Visual;
  /** true bo'lsa, oldingi tasvirlar tozalanadi */
  replace?: boolean;
}

export interface ExplainScene extends SceneBase {
  type: 'explain';
  title: string;
  steps: ExplainStep[];
}

export interface CountAndTapScene extends SceneBase {
  type: 'count-and-tap';
  prompt: string;
  item: PictureName;
  count: number;
  layout?: 'row' | 'scatter';
}

export interface ChoiceOption {
  label: string;
  visual?: Visual;
}

export interface ChooseAnswerScene extends SceneBase {
  type: 'choose-answer';
  question: string;
  visual?: Visual;
  options: ChoiceOption[];
  /** To'g'ri variant tartib raqami (0 dan) */
  correct: number;
  /** Xato javobdan keyin bolalarga ko'rinadigan yumshoq ishora */
  retryHint?: string;
  /** To'g'ri javobdan keyingi izoh */
  explanation?: string;
}

/** Rasm yoki yozuv (kamida bittasi bo'lishi shart) */
export interface Card {
  label?: string;
  visual?: Visual;
}

export interface DragMatchScene extends SceneBase {
  type: 'drag-match';
  prompt: string;
  /** item -> target juftlari (2..6). Narsalar aralashtirib ko'rsatiladi */
  pairs: { item: Card; target: Card }[];
  retryHint?: string;
}

export interface BuildWordScene extends SceneBase {
  type: 'build-word';
  prompt: string;
  /** Tayyor so'z, masalan "kitob" */
  word: string;
  /** Bo'laklar tartibda: ['ki','tob'] yoki ['sh','a','m','o','l'] — birlashganda word bo'lishi kerak */
  tiles: string[];
  /** Chalg'ituvchi ortiqcha bo'laklar */
  extra?: string[];
  picture?: PictureName;
  retryHint?: string;
}

export interface SortGroupsScene extends SceneBase {
  type: 'sort-groups';
  prompt: string;
  groups: Card[];
  /** group — groups ichidagi tartib raqami (0 dan) */
  items: (Card & { group: number })[];
  retryHint?: string;
}

export interface NumberLineScene extends SceneBase {
  type: 'number-line';
  prompt: string;
  min: number;
  max: number;
  /** Belgining boshlang'ich joyi */
  start?: number;
  /** "Sakrash" tugmasi qadami: 1, -1, 2, ... */
  step?: number;
  /** Bolalar o'qdan topishi kerak bo'lgan son */
  answer?: number;
  retryHint?: string;
}

export interface TenFrameScene extends SceneBase {
  type: 'ten-frame';
  prompt: string;
  frames?: 1 | 2;
  /** Oldindan to'ldirilgan kataklar */
  prefilled?: number;
  /** Shuncha katak to'ldirilsa — to'g'ri */
  target?: number;
}

export interface ClockTime {
  /** 1..12 */
  h: number;
  /** 0..55, 5 ga karrali */
  m: number;
}

export interface ClockScene extends SceneBase {
  type: 'clock';
  prompt: string;
  start?: ClockTime;
  /** Bolalar soatni shu vaqtga qo'yishi kerak */
  target?: ClockTime;
  /** Raqamli vaqtni boshidanoq ko'rsatish */
  showDigital?: boolean;
}

export interface StoryPage {
  text: string;
  visual?: Visual;
  audio?: string;
}

export interface StoryScene extends SceneBase {
  type: 'story';
  title?: string;
  pages: StoryPage[];
}

export interface RecapScene extends SceneBase {
  type: 'recap';
  title: string;
  points: string[];
  praise?: string;
}

export type Scene =
  | ExplainScene
  | CountAndTapScene
  | ChooseAnswerScene
  | DragMatchScene
  | BuildWordScene
  | SortGroupsScene
  | NumberLineScene
  | TenFrameScene
  | ClockScene
  | StoryScene
  | RecapScene;
export type SceneType = Scene['type'];
export const SCENE_TYPES: readonly SceneType[] = [
  'explain',
  'count-and-tap',
  'choose-answer',
  'drag-match',
  'build-word',
  'sort-groups',
  'number-line',
  'ten-frame',
  'clock',
  'story',
  'recap',
];

export interface TeacherNotes {
  goal: string;
  questions: [string, string, string];
  /** Taxminiy vaqt, daqiqa */
  minutes: number;
}

/** src/content/<sinf>/<fan>/<mavzu>.ts fayli shu turdagi obyektni eksport qiladi */
export interface Lesson {
  notes: TeacherNotes;
  scenes: Scene[];
}

/** Katalogdagi mavzu yozuvi (sarlavha va qisqa tavsif) */
export interface TopicEntry {
  grade: Grade;
  subject: SubjectId;
  slug: string;
  title: string;
  summary: string;
}

export function topicId(t: Pick<TopicEntry, 'grade' | 'subject' | 'slug'>): string {
  return `${t.grade}/${t.subject}/${t.slug}`;
}

/** Tur tekshiruvi uchun yordamchi */
export function defineLesson(lesson: Lesson): Lesson {
  return lesson;
}
