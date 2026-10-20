import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { SCENE_TYPES } from '../src/content/schema';
import { validateLesson } from '../src/content/validate';

// CONTENT_GUIDE.md dagi har bir sahna shabloni validatordan o'tishi shart
const guide = readFileSync(resolve(process.cwd(), 'CONTENT_GUIDE.md'), 'utf-8');
const blocks = [...guide.matchAll(/```ts\n(\{\n {2}id:[\s\S]*?\n\})\n```/g)].map((m) => m[1]);

describe('CONTENT_GUIDE.md shablonlari', () => {
  it('har bir sahna turi uchun shablon bor va hammasi toʻgʻri', () => {
    const scenes = blocks.map((code) => new Function(`return (${code});`)() as { type: string });
    expect(new Set(scenes.map((s) => s.type))).toEqual(new Set(SCENE_TYPES));
    const r = validateLesson({ notes: { goal: 'g', questions: ['a', 'b', 'c'], minutes: 5 }, scenes });
    expect(r.errors).toEqual([]);
  });
});
