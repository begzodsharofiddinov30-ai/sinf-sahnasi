// Dars tarkibini tekshiruvchi: xato bo'lsa aniq xabar qaytaradi
import {
  MASCOT_MOODS,
  PICTURE_NAMES,
  SCENE_TYPES,
  topicId,
  type TopicEntry,
} from './schema';
import { GRADES, SUBJECT_IDS } from './subjects';

export interface ValidationResult {
  errors: string[];
  warnings: string[];
}

type Obj = Record<string, unknown>;

const isObj = (v: unknown): v is Obj => typeof v === 'object' && v !== null && !Array.isArray(v);
const isText = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;
const isInt = (v: unknown): v is number => typeof v === 'number' && Number.isInteger(v);

function checkVisual(v: unknown, where: string, errors: string[]): void {
  if (!isObj(v)) {
    errors.push(`${where}: tasvir obyekt bo‘lishi kerak`);
    return;
  }
  switch (v.kind) {
    case 'items':
      if (!PICTURE_NAMES.includes(v.item as never)) errors.push(`${where}: noma’lum rasm "${String(v.item)}"`);
      if (!isInt(v.count) || v.count < 1 || v.count > 20) errors.push(`${where}: count 1..20 butun son bo‘lsin`);
      break;
    case 'number':
      if (!(isInt(v.value) || isText(v.value))) errors.push(`${where}: value son yoki matn bo‘lsin`);
      break;
    case 'tiles':
      if (!Array.isArray(v.items) || v.items.length === 0 || !v.items.every(isText))
        errors.push(`${where}: items bo‘sh bo‘lmagan matnlar ro‘yxati bo‘lsin`);
      checkHighlight(v.highlight, Array.isArray(v.items) ? v.items.length : 0, where, errors);
      break;
    case 'word':
      if (!isText(v.text)) errors.push(`${where}: text bo‘sh bo‘lmasin`);
      checkHighlight(v.highlight, isText(v.text) ? [...v.text].length : 0, where, errors);
      break;
    case 'picture':
      if (!PICTURE_NAMES.includes(v.item as never)) errors.push(`${where}: noma’lum rasm "${String(v.item)}"`);
      if (v.label !== undefined && !isText(v.label)) errors.push(`${where}: label matn bo‘lsin`);
      break;
    case 'mascot':
      if (!MASCOT_MOODS.includes(v.mood as never)) errors.push(`${where}: noma’lum kayfiyat "${String(v.mood)}"`);
      break;
    case 'clock':
      checkTime(v, where, errors);
      break;
    case 'tenframe': {
      const frames = v.frames ?? 1;
      if (frames !== 1 && frames !== 2) errors.push(`${where}: frames 1 yoki 2 bo‘lsin`);
      if (!isInt(v.count) || v.count < 0 || v.count > (frames === 2 ? 20 : 10)) errors.push(`${where}: count 0..${frames === 2 ? 20 : 10} bo‘lsin`);
      break;
    }
    case 'blocks':
      if (!isInt(v.tens) || v.tens < 0 || v.tens > 9 || !isInt(v.ones) || v.ones < 0 || v.ones > 19 || v.tens + v.ones === 0)
        errors.push(`${where}: blocks — tens 0..9, ones 0..19 (ikkalasi 0 emas)`);
      break;
    case 'groups':
      if (!PICTURE_NAMES.includes(v.item as never)) errors.push(`${where}: noma’lum rasm "${String(v.item)}"`);
      if (!isInt(v.groups) || v.groups < 1 || v.groups > 6 || !isInt(v.each) || v.each < 1 || v.each > 10)
        errors.push(`${where}: groups 1..6, each 1..10 bo‘lsin`);
      break;
    default:
      errors.push(`${where}: noma’lum tasvir turi "${String(v.kind)}"`);
  }
}

function checkTime(t: unknown, where: string, errors: string[]): void {
  if (!isObj(t) || !isInt(t.h) || t.h < 1 || t.h > 12 || !isInt(t.m) || t.m < 0 || t.m > 55 || t.m % 5 !== 0)
    errors.push(`${where}: vaqt {h: 1..12, m: 0..55 (5 ga karrali)} bo‘lsin`);
}

function checkAudio(a: unknown, where: string, errors: string[]): void {
  if (a === undefined) return;
  if (!isText(a) || /^[a-z]+:/i.test(a) || a.startsWith('/'))
    errors.push(`${where}: audio public/ ichidagi nisbiy yo‘l bo‘lsin (internet manzili emas)`);
  else if (!/\.(mp3|ogg|m4a|wav)$/i.test(a)) errors.push(`${where}: audio .mp3/.ogg/.m4a/.wav bo‘lsin`);
}

/** Kartochka: label yoki visual (kamida bittasi) */
function checkCard(c: unknown, where: string, errors: string[]): void {
  if (!isObj(c)) {
    errors.push(`${where}: kartochka obyekt bo‘lsin`);
    return;
  }
  if (c.label === undefined && c.visual === undefined) errors.push(`${where}: label yoki visual kerak`);
  if (c.label !== undefined && !isText(c.label)) errors.push(`${where}: label matn bo‘lsin`);
  if (c.visual !== undefined) checkVisual(c.visual, where, errors);
}

function checkHighlight(h: unknown, length: number, where: string, errors: string[]): void {
  if (h === undefined) return;
  if (!Array.isArray(h) || !h.every((i) => isInt(i) && i >= 0 && i < length))
    errors.push(`${where}: highlight 0..${length - 1} oralig‘idagi indekslar bo‘lsin`);
}

function checkScene(s: unknown, where: string, errors: string[]): void {
  if (!isObj(s)) {
    errors.push(`${where}: sahna obyekt bo‘lishi kerak`);
    return;
  }
  if (!isText(s.id)) errors.push(`${where}: id kerak`);
  if (!SCENE_TYPES.includes(s.type as never)) {
    errors.push(`${where}: noma’lum sahna turi "${String(s.type)}"`);
    return;
  }
  if (s.hint !== undefined && !isText(s.hint)) errors.push(`${where}: hint matn bo‘lsin`);
  checkAudio(s.audio, where, errors);
  if (s.timerSec !== undefined && (!isInt(s.timerSec) || s.timerSec < 5 || s.timerSec > 600))
    errors.push(`${where}: timerSec 5..600 soniya bo‘lsin`);

  switch (s.type) {
    case 'explain':
      if (!isText(s.title)) errors.push(`${where}: title kerak`);
      if (!Array.isArray(s.steps) || s.steps.length < 1 || s.steps.length > 10) {
        errors.push(`${where}: steps 1..10 ta bo‘lsin`);
        break;
      }
      s.steps.forEach((st, i) => {
        const w = `${where} › qadam ${i + 1}`;
        if (!isObj(st) || !isText(st.text)) errors.push(`${w}: text kerak`);
        else if (st.visual !== undefined) checkVisual(st.visual, w, errors);
      });
      break;
    case 'count-and-tap':
      if (!isText(s.prompt)) errors.push(`${where}: prompt kerak`);
      if (!PICTURE_NAMES.includes(s.item as never)) errors.push(`${where}: noma’lum rasm "${String(s.item)}"`);
      if (!isInt(s.count) || s.count < 1 || s.count > 20) errors.push(`${where}: count 1..20 bo‘lsin`);
      if (s.layout !== undefined && s.layout !== 'row' && s.layout !== 'scatter')
        errors.push(`${where}: layout "row" yoki "scatter" bo‘lsin`);
      break;
    case 'choose-answer': {
      if (!isText(s.question)) errors.push(`${where}: question kerak`);
      if (s.visual !== undefined) checkVisual(s.visual, where, errors);
      if (!Array.isArray(s.options) || s.options.length < 2 || s.options.length > 4) {
        errors.push(`${where}: options 2..4 ta bo‘lsin`);
        break;
      }
      const labels = new Set<string>();
      s.options.forEach((o, i) => {
        const w = `${where} › variant ${i + 1}`;
        if (!isObj(o) || !isText(o.label)) {
          errors.push(`${w}: label kerak`);
          return;
        }
        if (labels.has(o.label)) errors.push(`${w}: "${o.label}" takrorlangan`);
        labels.add(o.label);
        if (o.visual !== undefined) checkVisual(o.visual, w, errors);
      });
      if (!isInt(s.correct) || s.correct < 0 || s.correct >= s.options.length)
        errors.push(`${where}: correct 0..${s.options.length - 1} bo‘lsin`);
      if (s.retryHint !== undefined && !isText(s.retryHint)) errors.push(`${where}: retryHint matn bo‘lsin`);
      if (s.explanation !== undefined && !isText(s.explanation)) errors.push(`${where}: explanation matn bo‘lsin`);
      break;
    }
    case 'drag-match':
      if (!isText(s.prompt)) errors.push(`${where}: prompt kerak`);
      if (!Array.isArray(s.pairs) || s.pairs.length < 2 || s.pairs.length > 6) {
        errors.push(`${where}: pairs 2..6 ta bo‘lsin`);
        break;
      }
      s.pairs.forEach((p, i) => {
        const w = `${where} › juft ${i + 1}`;
        if (!isObj(p)) return errors.push(`${w}: {item, target} kerak`);
        checkCard(p.item, `${w} › item`, errors);
        checkCard(p.target, `${w} › target`, errors);
      });
      break;
    case 'build-word': {
      if (!isText(s.prompt)) errors.push(`${where}: prompt kerak`);
      if (!isText(s.word)) errors.push(`${where}: word kerak`);
      if (!Array.isArray(s.tiles) || s.tiles.length < 2 || s.tiles.length > 10 || !s.tiles.every(isText)) {
        errors.push(`${where}: tiles 2..10 ta bo‘sh bo‘lmagan bo‘lak bo‘lsin`);
        break;
      }
      if (isText(s.word) && s.tiles.join('') !== s.word)
        errors.push(`${where}: tiles birlashganda "${s.tiles.join('')}" chiqadi, word esa "${s.word}"`);
      if (s.extra !== undefined && (!Array.isArray(s.extra) || s.extra.length > 6 || !s.extra.every(isText)))
        errors.push(`${where}: extra 0..6 ta matn bo‘lsin`);
      if (s.picture !== undefined && !PICTURE_NAMES.includes(s.picture as never)) errors.push(`${where}: noma’lum rasm "${String(s.picture)}"`);
      break;
    }
    case 'sort-groups': {
      if (!isText(s.prompt)) errors.push(`${where}: prompt kerak`);
      const groups = Array.isArray(s.groups) ? s.groups : [];
      if (groups.length < 2 || groups.length > 3) errors.push(`${where}: groups 2..3 ta bo‘lsin`);
      groups.forEach((g, i) => checkCard(g, `${where} › guruh ${i + 1}`, errors));
      if (!Array.isArray(s.items) || s.items.length < 2 || s.items.length > 12) {
        errors.push(`${where}: items 2..12 ta bo‘lsin`);
        break;
      }
      s.items.forEach((it, i) => {
        const w = `${where} › narsa ${i + 1}`;
        checkCard(it, w, errors);
        if (!isObj(it) || !isInt(it.group) || it.group < 0 || it.group >= groups.length) errors.push(`${w}: group 0..${groups.length - 1} bo‘lsin`);
      });
      break;
    }
    case 'number-line': {
      if (!isText(s.prompt)) errors.push(`${where}: prompt kerak`);
      if (!isInt(s.min) || !isInt(s.max) || s.max <= s.min || s.max - s.min > 20) {
        errors.push(`${where}: min < max va oraliq 20 dan oshmasin`);
        break;
      }
      const lo = s.min;
      const hi = s.max;
      const inRange = (n: unknown) => isInt(n) && n >= lo && n <= hi;
      if (s.start !== undefined && !inRange(s.start)) errors.push(`${where}: start ${lo}..${hi} oralig‘ida bo‘lsin`);
      if (s.answer !== undefined && !inRange(s.answer)) errors.push(`${where}: answer ${lo}..${hi} oralig‘ida bo‘lsin`);
      if (s.step !== undefined && (!isInt(s.step) || s.step === 0 || Math.abs(s.step) > 10)) errors.push(`${where}: step -10..10 (0 emas) bo‘lsin`);
      break;
    }
    case 'ten-frame': {
      if (!isText(s.prompt)) errors.push(`${where}: prompt kerak`);
      const frames = s.frames ?? 1;
      if (frames !== 1 && frames !== 2) errors.push(`${where}: frames 1 yoki 2 bo‘lsin`);
      const cap = frames === 2 ? 20 : 10;
      if (s.prefilled !== undefined && (!isInt(s.prefilled) || s.prefilled < 0 || s.prefilled > cap)) errors.push(`${where}: prefilled 0..${cap} bo‘lsin`);
      if (s.target !== undefined && (!isInt(s.target) || s.target < 0 || s.target > cap)) errors.push(`${where}: target 0..${cap} bo‘lsin`);
      break;
    }
    case 'clock':
      if (!isText(s.prompt)) errors.push(`${where}: prompt kerak`);
      if (s.start !== undefined) checkTime(s.start, `${where} › start`, errors);
      if (s.target !== undefined) checkTime(s.target, `${where} › target`, errors);
      break;
    case 'story':
      if (s.title !== undefined && !isText(s.title)) errors.push(`${where}: title matn bo‘lsin`);
      if (!Array.isArray(s.pages) || s.pages.length < 1 || s.pages.length > 8) {
        errors.push(`${where}: pages 1..8 ta bo‘lsin`);
        break;
      }
      s.pages.forEach((pg, i) => {
        const w = `${where} › sahifa ${i + 1}`;
        if (!isObj(pg) || !isText(pg.text)) return errors.push(`${w}: text kerak`);
        if (pg.visual !== undefined) checkVisual(pg.visual, w, errors);
        checkAudio(pg.audio, w, errors);
      });
      break;
    case 'recap':
      if (!isText(s.title)) errors.push(`${where}: title kerak`);
      if (!Array.isArray(s.points) || s.points.length < 1 || s.points.length > 5 || !s.points.every(isText))
        errors.push(`${where}: points 1..5 ta matn bo‘lsin`);
      if (s.praise !== undefined && !isText(s.praise)) errors.push(`${where}: praise matn bo‘lsin`);
      break;
  }
}

export function validateLesson(lesson: unknown, label = 'dars'): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!isObj(lesson)) return { errors: [`${label}: default eksport obyekt bo‘lishi kerak`], warnings };

  const n = lesson.notes;
  if (!isObj(n)) errors.push(`${label}: notes kerak`);
  else {
    if (!isText(n.goal)) errors.push(`${label}: notes.goal kerak`);
    if (!Array.isArray(n.questions) || n.questions.length !== 3 || !n.questions.every(isText))
      errors.push(`${label}: notes.questions aniq 3 ta savol bo‘lsin`);
    if (!isInt(n.minutes) || n.minutes < 1 || n.minutes > 90) errors.push(`${label}: notes.minutes 1..90 bo‘lsin`);
  }

  if (!Array.isArray(lesson.scenes)) {
    errors.push(`${label}: scenes ro‘yxat bo‘lishi kerak`);
    return { errors, warnings };
  }
  if (lesson.scenes.length === 0) errors.push(`${label}: kamida bitta sahna kerak`);
  else if (lesson.scenes.length < 6 || lesson.scenes.length > 10)
    warnings.push(`${label}: tavsiya — 6..10 ta sahna (hozir ${lesson.scenes.length})`);

  const ids = new Set<string>();
  lesson.scenes.forEach((s, i) => {
    const where = `${label} › sahna ${i + 1}`;
    checkScene(s, where, errors);
    if (isObj(s) && isText(s.id)) {
      if (ids.has(s.id)) errors.push(`${where}: id "${s.id}" takrorlangan`);
      ids.add(s.id);
    }
  });
  return { errors, warnings };
}

/** Darsdagi barcha audio yo'llari (fayl borligini skript tekshiradi) */
export function audioPaths(lesson: unknown): string[] {
  if (!isObj(lesson) || !Array.isArray(lesson.scenes)) return [];
  const out: string[] = [];
  for (const s of lesson.scenes) {
    if (!isObj(s)) continue;
    if (isText(s.audio)) out.push(s.audio);
    if (Array.isArray(s.pages)) for (const p of s.pages) if (isObj(p) && isText(p.audio)) out.push(p.audio);
  }
  return out;
}

/** Katalog va fayllar bir-biriga mosligini tekshiradi */
export function validateCatalog(catalog: TopicEntry[], fileIds: string[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seen = new Set<string>();
  for (const t of catalog) {
    const id = topicId(t);
    if (seen.has(id)) errors.push(`katalog: "${id}" takrorlangan`);
    seen.add(id);
    if (!(GRADES as readonly number[]).includes(t.grade)) errors.push(`katalog: "${id}" — noto‘g‘ri sinf`);
    if (!SUBJECT_IDS.includes(t.subject)) errors.push(`katalog: "${id}" — noma’lum fan`);
    if (!/^[a-z0-9-]+$/.test(t.slug)) errors.push(`katalog: "${id}" — slug faqat a-z, 0-9 va "-"`);
    if (!isText(t.title) || !isText(t.summary)) errors.push(`katalog: "${id}" — title va summary kerak`);
    if (!fileIds.includes(id)) errors.push(`katalog: "${id}" uchun src/content/${id}.ts fayli topilmadi`);
  }
  for (const f of fileIds) if (!seen.has(f)) errors.push(`fayl src/content/${f}.ts katalogda yo‘q`);
  return { errors, warnings };
}
