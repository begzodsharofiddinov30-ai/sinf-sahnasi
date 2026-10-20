import { describe, expect, it } from 'vitest';
import type { ExplainStep } from '../src/content/schema';
import {
  completeOrder,
  evaluateChoice,
  hashSeed,
  rowLayout,
  scatterLayout,
  tapItem,
  visibleVisuals,
} from '../src/player/exercises';
import { keyToAction } from '../src/player/keyboard';

describe('sanash mashqi', () => {
  it('har bir narsa faqat bir marta sanaladi', () => {
    let order: number[] = [];
    order = tapItem(order, 2, 3);
    order = tapItem(order, 2, 3);
    order = tapItem(order, 0, 3);
    expect(order).toEqual([2, 0]);
    expect(tapItem(order, 5, 3)).toBe(order);
    expect(completeOrder(order, 3)).toEqual([2, 0, 1]);
  });

  it('tarqoq joylashuv barqaror va ekrandan chiqmaydi', () => {
    for (const count of [1, 4, 9, 13, 20]) {
      const a = scatterLayout(count, hashSeed('baliq'));
      const b = scatterLayout(count, hashSeed('baliq'));
      expect(a).toEqual(b);
      expect(a.positions).toHaveLength(count);
      expect(a.cols * a.rows).toBeGreaterThanOrEqual(count);
      for (const p of a.positions) {
        expect(p.x).toBeGreaterThan(5);
        expect(p.x).toBeLessThan(95);
        expect(p.y).toBeGreaterThan(5);
        expect(p.y).toBeLessThan(95);
      }
      // ikkita narsa bir-biriga juda yaqin emas
      const minGap = Math.min(84 / a.cols, 80 / a.rows) * 0.2;
      for (let i = 0; i < count; i++)
        for (let j = i + 1; j < count; j++) {
          const d = Math.hypot(a.positions[i].x - a.positions[j].x, a.positions[i].y - a.positions[j].y);
          expect(d).toBeGreaterThan(minGap);
        }
    }
  });

  it('qator joylashuvi chapdan o‘ngga tartiblangan', () => {
    const { positions } = rowLayout(7);
    expect(positions).toHaveLength(7);
    for (let i = 1; i < positions.length; i++) expect(positions[i].x).toBeGreaterThan(positions[i - 1].x);
  });
});

describe('javob tanlash', () => {
  it('to‘g‘ri va xato javobni ajratadi', () => {
    const scene = { correct: 1, options: [{ label: 'a' }, { label: 'b' }] };
    expect(evaluateChoice(scene, 1)).toBe('correct');
    expect(evaluateChoice(scene, 0)).toBe('wrong');
  });
});

describe('tushuntirish sahnasi', () => {
  const steps: ExplainStep[] = [
    { text: 'a', visual: { kind: 'number', value: 1 } },
    { text: 'b', visual: { kind: 'number', value: 2 } },
    { text: 'c', visual: { kind: 'number', value: 3 }, replace: true },
    { text: 'd' },
    { text: 'e', visual: { kind: 'number', value: 5 } },
  ];
  it('tasvirlar to‘planadi, "replace" esa tozalaydi', () => {
    expect(visibleVisuals(steps, 1).map((v) => v.key)).toEqual([0, 1]);
    expect(visibleVisuals(steps, 2).map((v) => v.key)).toEqual([2]);
    expect(visibleVisuals(steps, 4).map((v) => v.key)).toEqual([2, 4]);
    expect(visibleVisuals(steps, 99).map((v) => v.key)).toEqual([2, 4]);
  });
});

describe('klaviatura va pult', () => {
  const k = (key: string, code = '') => keyToAction({ key, code, altKey: false, ctrlKey: false, metaKey: false });
  it('pult va strelka tugmalarini taniydi', () => {
    expect(k('PageDown')).toBe('next');
    expect(k(' ')).toBe('next');
    expect(k('Enter')).toBe('next');
    expect(k('ArrowRight')).toBe('next');
    expect(k('PageUp')).toBe('prev');
    expect(k('ArrowLeft')).toBe('prev');
    expect(k('Escape')).toBe('exit');
  });
  it('harflarni klaviatura tilidan qat’i nazar taniydi', () => {
    expect(k('а', 'KeyF')).toBe('fullscreen');
    expect(k('р', 'KeyH')).toBe('hint');
    expect(k('j', 'KeyJ')).toBe('reveal');
    expect(keyToAction({ key: 'f', code: 'KeyF', altKey: false, ctrlKey: true, metaKey: false })).toBeNull();
  });
});
