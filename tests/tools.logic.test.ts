import { describe, expect, it } from 'vitest';
import { changeScore, crossedMilestone, formatMs, parseNames, pickNext, spinDelays } from '../src/tools/logic';
import { mulberry32 } from '../src/player/exercises';

describe('sinf ro‘yxati', () => {
  it('ismlarni tozalaydi, takrorlarni olib tashlaydi', () => {
    expect(parseNames('  Aziz \n\nMalika, aziz;  Sardor   Bek ')).toEqual(['Aziz', 'Malika', 'Sardor Bek']);
    expect(parseNames('a'.repeat(50))[0]).toHaveLength(30);
    expect(parseNames(Array.from({ length: 80 }, (_, i) => `n${i}`).join('\n'))).toHaveLength(60);
  });
});

describe('tasodifiy o‘quvchi', () => {
  const all = ['Aziz', 'Malika', 'Sardor', 'Nodira', 'Javohir'];

  it('hamma bir martadan chiqmaguncha hech kim takrorlanmaydi', () => {
    const rand = mulberry32(7);
    let pool: string[] = [];
    let last: string | null = null;
    for (let round = 0; round < 4; round++) {
      const seen: string[] = [];
      for (let i = 0; i < all.length; i++) {
        const r = pickNext(all, pool, last, rand);
        expect(r.name).not.toBeNull();
        expect(r.name).not.toBe(last);
        seen.push(r.name!);
        pool = r.pool;
        last = r.name;
      }
      expect([...seen].sort()).toEqual([...all].sort());
    }
  });

  it('chetki holatlar', () => {
    expect(pickNext([], [], null)).toEqual({ name: null, pool: [] });
    expect(pickNext(['Yolg‘iz'], [], 'Yolg‘iz').name).toBe('Yolg‘iz');
    // ro‘yxatdan o‘chirilgan ism hovuzdan ham chiqadi
    expect(pickNext(['A', 'B'], ['C'], null).name).toMatch(/A|B/);
  });
});

describe('hisob va taymer', () => {
  it('ochko 0..999 oralig‘ida, har 5 da bayram', () => {
    expect(changeScore(0, -1)).toBe(0);
    expect(changeScore(999, 1)).toBe(999);
    expect(crossedMilestone(4, 5)).toBe(true);
    expect(crossedMilestone(5, 6)).toBe(false);
    expect(crossedMilestone(6, 5)).toBe(false);
  });
  it('vaqt yozuvi va spinner kechikishlari', () => {
    expect(formatMs(65_000)).toBe('1:05');
    expect(formatMs(400)).toBe('0:01');
    expect(formatMs(-5)).toBe('0:00');
    const d = spinDelays(1800, 16);
    expect(d).toHaveLength(16);
    expect(d[15]).toBeGreaterThan(d[0]);
    expect(Math.abs(d.reduce((a, b) => a + b, 0) - 1800)).toBeLessThan(20);
  });
});
