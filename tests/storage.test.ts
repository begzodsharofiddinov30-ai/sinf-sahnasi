import { afterEach, describe, expect, it, vi } from 'vitest';
import { loadSettings, sanitizeSettings, DEFAULT_SETTINGS } from '../src/app/settings';
import { readJSON, storageAvailable, writeJSON } from '../src/lib/storage';

describe('xavfsiz saqlash', () => {
  afterEach(() => vi.restoreAllMocks());

  it('oddiy holatda yozadi va o‘qiydi', () => {
    expect(writeJSON('x', { a: 1 })).toBe(true);
    expect(readJSON('x', null)).toEqual({ a: 1 });
  });

  it('localStorage xato bersa ham ishlaydi', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked');
    });
    expect(readJSON('x', 'zaxira')).toBe('zaxira');
    expect(writeJSON('x', 1)).toBe(false);
    expect(storageAvailable()).toBe(false);
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
  });

  it('buzilgan JSON va qiymatlarni tuzatadi', () => {
    localStorage.setItem('sinf-sahnasi:settings', '{buzuq');
    expect(loadSettings()).toEqual(DEFAULT_SETTINGS);
    const s = sanitizeSettings({ soundOn: 'ha', volume: 7, fontScale: 0.1 });
    expect(s.soundOn).toBe(true);
    expect(s.volume).toBe(1);
    expect(s.fontScale).toBe(0.8);
  });
});
