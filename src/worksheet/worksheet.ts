// Darsdan chop etiladigan ish varag'i topshiriqlarini yasaydi (sof funksiya)
import type { Card, ClockTime, Lesson, PictureName, Visual } from '../content/schema';
import { hashSeed, shuffleSeeded, shuffledIndices } from '../player/exercises';

export type WsItem =
  | { kind: 'count'; id: string; prompt: string; item: PictureName; count: number }
  | { kind: 'choose'; id: string; question: string; visual?: Visual; options: Card[]; correct: number }
  | { kind: 'word'; id: string; prompt: string; picture?: PictureName; slots: number; letters: string[]; answer: string }
  | { kind: 'match'; id: string; prompt: string; left: Card[]; right: Card[]; answer: number[] }
  | { kind: 'sort'; id: string; prompt: string; groups: Card[]; items: Card[]; answer: number[] }
  | { kind: 'numberline'; id: string; prompt: string; min: number; max: number; start?: number; answer?: number }
  | { kind: 'tenframe'; id: string; prompt: string; frames: 1 | 2; prefilled: number; target?: number }
  | { kind: 'clock'; id: string; prompt: string; time: ClockTime };

export interface Worksheet {
  items: WsItem[];
  remember: string[];
}

const MAX_ITEMS = 8;

export function buildWorksheet(lesson: Lesson): Worksheet {
  const items: WsItem[] = [];
  let remember: string[] = [];
  for (const s of lesson.scenes) {
    switch (s.type) {
      case 'count-and-tap':
        items.push({ kind: 'count', id: s.id, prompt: s.prompt, item: s.item, count: s.count });
        break;
      case 'choose-answer':
        items.push({ kind: 'choose', id: s.id, question: s.question, visual: s.visual, options: s.options, correct: s.correct });
        break;
      case 'build-word':
        items.push({
          kind: 'word',
          id: s.id,
          prompt: s.prompt,
          picture: s.picture,
          slots: s.tiles.length,
          letters: shuffleSeeded([...s.tiles, ...(s.extra ?? [])], hashSeed(s.id)),
          answer: s.word,
        });
        break;
      case 'drag-match': {
        // Chap ustun aralashtiriladi, o'ng ustun asl tartibda
        const order = shuffledIndices(s.pairs.length, hashSeed(s.id));
        items.push({ kind: 'match', id: s.id, prompt: s.prompt, left: order.map((i) => s.pairs[i].item), right: s.pairs.map((p) => p.target), answer: order });
        break;
      }
      case 'sort-groups': {
        const order = shuffledIndices(s.items.length, hashSeed(s.id));
        items.push({ kind: 'sort', id: s.id, prompt: s.prompt, groups: s.groups, items: order.map((i) => s.items[i]), answer: order.map((i) => s.items[i].group) });
        break;
      }
      case 'number-line':
        items.push({ kind: 'numberline', id: s.id, prompt: s.prompt, min: s.min, max: s.max, start: s.start, answer: s.answer });
        break;
      case 'ten-frame':
        items.push({ kind: 'tenframe', id: s.id, prompt: s.prompt, frames: s.frames ?? 1, prefilled: s.prefilled ?? 0, target: s.target });
        break;
      case 'clock':
        if (s.target) items.push({ kind: 'clock', id: s.id, prompt: s.prompt, time: s.target });
        break;
      case 'recap':
        remember = s.points;
        break;
    }
  }
  return { items: items.slice(0, MAX_ITEMS), remember };
}
