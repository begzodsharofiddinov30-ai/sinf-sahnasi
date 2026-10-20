import { describe, expect, it } from 'vitest';
import { initPlayer, isAtEnd, isAtStart, playerReducer, type PlayerEvent, type PlayerState } from '../src/player/engine';

const run = (s: PlayerState, ...events: PlayerEvent[]) => events.reduce(playerReducer, s);
const next = { type: 'next' } as const;
const prev = { type: 'prev' } as const;

describe('sahna dvigateli', () => {
  it('avval sahna ichidagi qadamlarni, keyin keyingi sahnani ochadi', () => {
    let s = initPlayer([3, 1, 2]);
    s = run(s, next);
    expect([s.index, s.step]).toEqual([0, 1]);
    s = run(s, next, next);
    expect([s.index, s.step]).toEqual([1, 0]);
    s = run(s, next, next);
    expect([s.index, s.step]).toEqual([2, 1]);
    expect(isAtEnd(s)).toBe(true);
    expect(run(s, next)).toBe(s);
  });

  it('orqaga qaytganda oldingi sahna to‘liq qurilgan holda ochiladi', () => {
    let s = run(initPlayer([3, 1]), next, next, next);
    expect([s.index, s.step]).toEqual([1, 0]);
    s = run(s, prev);
    expect([s.index, s.step]).toEqual([0, 2]);
    s = run(s, prev, prev);
    expect(isAtStart(s)).toBe(true);
    expect(run(s, prev)).toBe(s);
  });

  it('goto chegaradan chiqmaydi va holatni tozalaydi', () => {
    let s = run(initPlayer([1, 1, 1]), { type: 'toggleHint' }, { type: 'reveal' });
    s = run(s, { type: 'goto', index: 99 });
    expect(s.index).toBe(2);
    expect(s.hintOpen).toBe(false);
    expect(s.revealed).toBe(false);
    expect(run(s, { type: 'goto', index: -5 }).index).toBe(0);
  });

  it('javobni ochish barcha qadamlarni ko‘rsatadi, sahna almashsa tozalanadi', () => {
    let s = run(initPlayer([4, 1]), { type: 'reveal' });
    expect(s.revealed).toBe(true);
    expect(s.step).toBe(3);
    s = run(s, next);
    expect(s.index).toBe(1);
    expect(s.revealed).toBe(false);
  });

  it('noto‘g‘ri boshlang‘ich qiymatlarni tuzatadi', () => {
    const s = initPlayer([0, -2, 2], 10);
    expect(s.stepCounts).toEqual([1, 1, 2]);
    expect(s.index).toBe(2);
    expect(initPlayer([1, 1], Number.NaN).index).toBe(0);
  });
});
