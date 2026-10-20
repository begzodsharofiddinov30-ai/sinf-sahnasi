import { describe, expect, it } from 'vitest';
import { CATALOG } from '../src/content/catalog';
import { lessonFileIds, loadLesson } from '../src/content/loader';
import { validateCatalog, validateLesson } from '../src/content/validate';

const notes = { goal: 'Maqsad', questions: ['a', 'b', 'c'], minutes: 10 };

describe('tarkib validatori', () => {
  it('to‘g‘ri darsni qabul qiladi', () => {
    const r = validateLesson({
      notes,
      scenes: [
        { id: 'a', type: 'explain', title: 'T', steps: [{ text: 'x', visual: { kind: 'items', item: 'olma', count: 3 } }] },
        { id: 'b', type: 'count-and-tap', prompt: 'Sanang', item: 'baliq', count: 5 },
        { id: 'c', type: 'choose-answer', question: '?', options: [{ label: '1' }, { label: '2' }], correct: 0 },
      ],
    });
    expect(r.errors).toEqual([]);
  });

  it('buzilgan darsni rad etadi', () => {
    const r = validateLesson({
      notes: { goal: '', questions: ['a'], minutes: 0 },
      scenes: [
        { id: 'a', type: 'nomalum' },
        { id: 'a', type: 'choose-answer', question: '?', options: [{ label: '1' }, { label: '1' }], correct: 5 },
        { id: 'c', type: 'count-and-tap', prompt: 'x', item: 'dinozavr', count: 50 },
        { id: 'd', type: 'explain', title: 'T', steps: [], audio: 'https://example.com/a.mp3' },
      ],
    });
    const all = r.errors.join('\n');
    expect(all).toMatch(/notes.goal/);
    expect(all).toMatch(/3 ta savol/);
    expect(all).toMatch(/noma’lum sahna turi/);
    expect(all).toMatch(/takrorlangan/);
    expect(all).toMatch(/correct/);
    expect(all).toMatch(/dinozavr/);
    expect(all).toMatch(/count 1..20/);
    expect(all).toMatch(/steps 1..10/);
    expect(all).toMatch(/internet manzili emas/);
  });

  it('katalog va fayllar mosligini tekshiradi', () => {
    const r = validateCatalog(
      [{ grade: 1, subject: 'matematika', slug: 'yoq', title: 'T', summary: 'S' }],
      ['1/matematika/ortiqcha'],
    );
    expect(r.errors).toHaveLength(2);
  });

  it('barcha seed darslar va katalog to‘g‘ri', async () => {
    expect(validateCatalog(CATALOG, lessonFileIds).errors).toEqual([]);
    expect(CATALOG.length).toBeGreaterThanOrEqual(12);
    for (const id of lessonFileIds) {
      const lesson = await loadLesson(id);
      expect(validateLesson(lesson, id).errors).toEqual([]);
    }
  });
});

describe('3-bosqich sahna turlari validatori', () => {
  const lesson = (scene: unknown) => validateLesson({ notes, scenes: [scene] }).errors.join('\n');

  it('to‘g‘ri sahnalarni qabul qiladi', () => {
    const ok = [
      { id: 'a', type: 'drag-match', prompt: 'p', pairs: [{ item: { label: '1' }, target: { label: 'bir' } }, { item: { label: '2' }, target: { label: 'ikki' } }] },
      { id: 'b', type: 'build-word', prompt: 'p', word: 'qush', tiles: ['q', 'u', 'sh'], extra: ['s'], picture: 'qush' },
      { id: 'c', type: 'sort-groups', prompt: 'p', groups: [{ label: 'A' }, { label: 'B' }], items: [{ label: 'x', group: 0 }, { label: 'y', group: 1 }] },
      { id: 'd', type: 'number-line', prompt: 'p', min: 0, max: 10, start: 8, step: -1, answer: 5 },
      { id: 'e', type: 'ten-frame', prompt: 'p', frames: 2, prefilled: 3, target: 13 },
      { id: 'f', type: 'clock', prompt: 'p', start: { h: 12, m: 0 }, target: { h: 8, m: 30 } },
      { id: 'g', type: 'story', pages: [{ text: 't', visual: { kind: 'clock', h: 3, m: 0 } }] },
      { id: 'h', type: 'recap', title: 't', points: ['a'] },
    ];
    for (const s of ok) expect(lesson(s)).toBe('');
  });

  it('xatolarni topadi', () => {
    expect(lesson({ id: 'b', type: 'build-word', prompt: 'p', word: 'qush', tiles: ['q', 'sh'] })).toMatch(/birlashganda "qsh"/);
    expect(lesson({ id: 'c', type: 'sort-groups', prompt: 'p', groups: [{ label: 'A' }, { label: 'B' }], items: [{ label: 'x', group: 2 }, {}] })).toMatch(/group 0..1/);
    expect(lesson({ id: 'c', type: 'sort-groups', prompt: 'p', groups: [{ label: 'A' }, { label: 'B' }], items: [{ label: 'x', group: 0 }, { group: 0 }] })).toMatch(/label yoki visual/);
    expect(lesson({ id: 'd', type: 'number-line', prompt: 'p', min: 0, max: 50 })).toMatch(/20 dan/);
    expect(lesson({ id: 'd', type: 'number-line', prompt: 'p', min: 0, max: 10, answer: 11, step: 0 })).toMatch(/answer[\s\S]*step/);
    expect(lesson({ id: 'e', type: 'ten-frame', prompt: 'p', target: 15 })).toMatch(/target 0..10/);
    expect(lesson({ id: 'f', type: 'clock', prompt: 'p', target: { h: 13, m: 7 } })).toMatch(/5 ga karrali/);
    expect(lesson({ id: 'g', type: 'story', pages: [{ text: 't', audio: 'http://x/a.mp3' }] })).toMatch(/internet manzili emas/);
    expect(lesson({ id: 'h', type: 'recap', title: 't', points: [] })).toMatch(/points 1..5/);
  });
});
