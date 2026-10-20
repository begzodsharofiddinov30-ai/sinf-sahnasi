import { describe, expect, it } from 'vitest';
import {
  addMinutes,
  angleToHour,
  angleToMinute,
  countFilled,
  fillTo,
  formatClock,
  handAngles,
  jump,
  placeTile,
  pointAngle,
  sameTime,
  shuffleSeeded,
  tickPercent,
  toggleCell,
} from '../src/player/exercises';

describe('aralashtirish', () => {
  it('barqaror, elementlarni yo‘qotmaydi va tartibni o‘zgartiradi', () => {
    const a = shuffleSeeded([1, 2, 3, 4], 42);
    expect(a).toEqual(shuffleSeeded([1, 2, 3, 4], 42));
    expect([...a].sort()).toEqual([1, 2, 3, 4]);
    for (let seed = 0; seed < 50; seed++) expect(shuffleSeeded([1, 2], seed)).toEqual([2, 1]);
  });
});

describe('so‘z yasash', () => {
  const answer = ['q', 'u', 'sh'];
  it('birinchi bo‘sh katakka faqat to‘g‘ri bo‘lakni qo‘yadi', () => {
    let slots: (string | null)[] = [null, null, null];
    expect(placeTile(slots, answer, 'u').ok).toBe(false);
    const r = placeTile(slots, answer, 'q');
    expect(r.ok).toBe(true);
    slots = r.slots;
    expect(slots).toEqual(['q', null, null]);
  });
  it('sudralganda ko‘rsatilgan katakni tekshiradi', () => {
    const slots = [null, null, null];
    expect(placeTile(slots, answer, 'sh', 2)).toMatchObject({ ok: true, index: 2 });
    expect(placeTile(slots, answer, 'sh', 1).ok).toBe(false);
    expect(placeTile(['q', null, null], answer, 'q', 0).ok).toBe(false);
  });
});

describe('son o‘qi va o‘nlik ramka', () => {
  it('sakrash chegaradan chiqmaydi', () => {
    expect(jump(8, -1, 0, 10)).toBe(7);
    expect(jump(0, -1, 0, 10)).toBe(0);
    expect(jump(9, 2, 0, 10)).toBe(10);
    expect(tickPercent(0, 0, 9)).toBeCloseTo(5);
    expect(tickPercent(9, 0, 9)).toBeCloseTo(95);
  });
  it('kataklarni to‘ldiradi va sanaydi', () => {
    const cells = fillTo(10, 7);
    expect(countFilled(cells)).toBe(7);
    expect(countFilled(toggleCell(cells, 0))).toBe(6);
    expect(countFilled(toggleCell(cells, 9))).toBe(8);
  });
});

describe('soat', () => {
  it('millar burchagi', () => {
    expect(handAngles({ h: 3, m: 0 })).toEqual({ hour: 90, minute: 0 });
    expect(handAngles({ h: 12, m: 30 })).toEqual({ hour: 15, minute: 180 });
  });
  it('daqiqa qo‘shish soatni ham surishi kerak', () => {
    expect(addMinutes({ h: 8, m: 55 }, 5)).toEqual({ h: 9, m: 0 });
    expect(addMinutes({ h: 12, m: 0 }, -5)).toEqual({ h: 11, m: 55 });
    expect(addMinutes({ h: 12, m: 30 }, 60)).toEqual({ h: 1, m: 30 });
    expect(addMinutes({ h: 1, m: 0 }, -60)).toEqual({ h: 12, m: 0 });
  });
  it('burchakdan vaqt', () => {
    expect(angleToMinute(181)).toBe(30);
    expect(angleToMinute(358)).toBe(0);
    expect(angleToHour(95)).toBe(3);
    expect(angleToHour(5)).toBe(12);
    expect(pointAngle(0, 0, 10, 0)).toBeCloseTo(90);
    expect(pointAngle(0, 0, 0, 10)).toBeCloseTo(180);
  });
  it('taqqoslash va yozish', () => {
    expect(sameTime({ h: 12, m: 0 }, { h: 12, m: 0 })).toBe(true);
    expect(sameTime({ h: 3, m: 0 }, { h: 3, m: 30 })).toBe(false);
    expect(formatClock({ h: 8, m: 5 })).toBe('8:05');
  });
});
