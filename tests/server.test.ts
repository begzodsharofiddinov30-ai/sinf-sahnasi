import { describe, expect, it } from 'vitest';
import { adminDelete, adminList, cleanData, deleteSelf, login, memoryStore, mergeData, normalizePhone, safeEqual, sync, TEST_PHONE } from '../server/core';

const who = { firstName: 'Dilnoza', lastName: 'Karimova', phone: '90 123 45 67' };

describe('telefon raqam', () => {
  it('turli yozuvlarni bir xil ko‘rinishga keltiradi', () => {
    expect(normalizePhone('90 123 45 67')).toBe('+998901234567');
    expect(normalizePhone('+998 (90) 123-45-67')).toBe('+998901234567');
    expect(normalizePhone('998901234567')).toBe('+998901234567');
    expect(normalizePhone('12345')).toBeNull();
    expect(normalizePhone('+7 901 234 56 78')).toBeNull();
    expect(normalizePhone(42)).toBeNull();
  });
});

describe('kirish va ro‘yxatdan o‘tish', () => {
  it('yangi raqam — hisob yaratiladi, qayta kirishda o‘sha ma’lumot qaytadi', async () => {
    const store = memoryStore();
    const r1 = await login(store, { ...who, data: { classList: ['Aziz'] }, updatedAt: 100 }, 'ip');
    expect(r1.status).toBe(200);
    expect(r1.body).toMatchObject({ ok: true, created: true, updatedAt: 100 });
    const r2 = await login(store, { firstName: 'dilnoza', lastName: 'KARIMOVA', phone: '+998901234567' }, 'ip');
    expect(r2.body).toMatchObject({ ok: true, data: { classList: ['Aziz'] }, updatedAt: 100 });
    expect('created' in r2.body).toBe(false);
  });

  it('bir raqam boshqa ism bilan — rad etiladi', async () => {
    const store = memoryStore();
    await login(store, who, 'ip');
    const r = await login(store, { ...who, firstName: 'Malika' }, 'ip');
    expect(r.status).toBe(409);
    expect(r.body).toMatchObject({ ok: false, error: 'name-mismatch' });
  });

  it('noto‘g‘ri ism va raqam', async () => {
    const store = memoryStore();
    expect((await login(store, { ...who, firstName: 'A1' }, 'ip')).status).toBe(400);
    expect((await login(store, { ...who, phone: '123' }, 'ip')).body).toMatchObject({ error: 'bad-phone' });
  });

  it('so‘rovlar soni cheklangan', async () => {
    const store = memoryStore();
    for (let i = 0; i < 20; i++) await login(store, who, 'ip9');
    expect((await login(store, who, 'ip9')).status).toBe(429);
    expect((await login(store, who, 'boshqa-ip')).status).toBe(200);
  });
});

describe('sinxronlash', () => {
  it('yangiroq ma’lumot saqlanadi, eskisi rad etiladi (oxirgi o‘zgarish yutadi)', async () => {
    const store = memoryStore();
    await login(store, who, 'ip');
    const a = await sync(store, { ...who, data: { favourites: ['1/matematika/soat'] }, updatedAt: 200 }, 'ip');
    expect(a.body).toMatchObject({ ok: true, updatedAt: 200, data: { favourites: ['1/matematika/soat'] } });
    const b = await sync(store, { ...who, data: { favourites: [] }, updatedAt: 150 }, 'ip');
    expect(b.body).toMatchObject({ updatedAt: 200, data: { favourites: ['1/matematika/soat'] } });
    const c = await sync(store, who, 'ip');
    expect(c.body).toMatchObject({ updatedAt: 200 });
  });

  it('noma’lum raqam hisob yaratmaydi; begona ism o‘qiy olmaydi', async () => {
    const store = memoryStore();
    expect((await sync(store, who, 'ip')).status).toBe(404);
    expect(store.rows.size).toBe(0);
    await login(store, who, 'ip');
    expect((await sync(store, { ...who, lastName: 'Boshqa' }, 'ip')).status).toBe(403);
  });

  it('faqat ruxsat etilgan kalitlar saqlanadi, juda katta ma’lumot rad etiladi', () => {
    expect(cleanData({ settings: { a: 1 }, parol: 'x', classList: [] })).toEqual({ settings: { a: 1 }, classList: [] });
    expect(cleanData({ classList: ['x'.repeat(70_000)] })).toBeNull();
    expect(cleanData([1])).toBeNull();
  });
});

describe('admin', () => {
  const TOKEN = 'a'.repeat(24);
  it('kalitsiz yoki noto‘g‘ri kalit bilan ro‘yxat berilmaydi', async () => {
    const store = memoryStore();
    await login(store, { ...who, data: { classList: ['A', 'B'] }, updatedAt: 1 }, 'ip');
    await login(store, { firstName: 'Sinov', lastName: 'O‘qituvchi', phone: TEST_PHONE }, 'ip');
    expect((await adminList(store, null, TOKEN, 'ip')).status).toBe(401);
    expect((await adminList(store, 'b'.repeat(24), TOKEN, 'ip')).status).toBe(401);
    expect((await adminList(store, TOKEN, undefined, 'ip')).status).toBe(503);
    const ok = await adminList(store, TOKEN, TOKEN, 'ip');
    expect(ok.status).toBe(200);
    const list = (ok.body as { teachers: { phone: string; classSize: number; test: boolean }[] }).teachers;
    expect(list).toHaveLength(2);
    expect(list.find((t) => t.phone === '+998901234567')).toMatchObject({ classSize: 2, test: false });
    expect(list.find((t) => t.phone === TEST_PHONE)?.test).toBe(true);
  });
  it('kalitni xavfsiz taqqoslaydi', () => {
    expect(safeEqual('abc', 'abc')).toBe(true);
    expect(safeEqual('abc', 'abd')).toBe(false);
    expect(safeEqual('abc', 'abcd')).toBe(false);
  });
});

describe('bo‘limma-bo‘lim birlashtirish', () => {
  it('ikki kompyuterdagi turli o‘zgarishlar ikkalasi ham saqlanadi', async () => {
    const store = memoryStore();
    await login(store, { ...who, data: { classList: ['A'], scores: [{ name: 'L', score: 0 }] }, stamps: { classList: 10, scores: 10 } }, 'ip');
    // Uyda: sinf ro'yxati o'zgardi (vaqt 20)
    await sync(store, { ...who, data: { classList: ['A', 'B'], scores: [{ name: 'L', score: 0 }] }, stamps: { classList: 20, scores: 10 } }, 'ip');
    // Maktabda (eski ro'yxat bilan): hisob o'zgardi (vaqt 30)
    const r = await sync(store, { ...who, data: { classList: ['A'], scores: [{ name: 'L', score: 5 }] }, stamps: { classList: 10, scores: 30 } }, 'ip');
    expect(r.body).toMatchObject({ data: { classList: ['A', 'B'], scores: [{ name: 'L', score: 5 }] }, stamps: { classList: 20, scores: 30 } });
  });

  it('serverda yo‘q bo‘lim mijozdan olinadi; eski yozuvlar umumiy vaqtdan foydalanadi', () => {
    const m = mergeData({ data: { classList: ['X'] }, stamps: {}, dataUpdatedAt: 50 }, { classList: ['Y'], favourites: ['f'] }, { classList: 40 });
    expect(m.data).toEqual({ classList: ['X'], favourites: ['f'] });
    expect(m.stamps).toEqual({ classList: 50, favourites: 1 });
    expect(m.changed).toBe(true);
    expect(mergeData({ data: { classList: ['X'] }, stamps: { classList: 50 }, dataUpdatedAt: 50 }, { classList: ['Y'] }, { classList: 40 }).changed).toBe(false);
  });
});

describe('o‘chirish', () => {
  it('o‘qituvchi faqat o‘z ismi bilan o‘z hisobini o‘chira oladi', async () => {
    const store = memoryStore();
    await login(store, who, 'ip');
    expect((await deleteSelf(store, { ...who, firstName: 'Boshqa' }, 'ip')).status).toBe(403);
    const r = await deleteSelf(store, who, 'ip');
    expect(r.body).toMatchObject({ ok: true, deleted: true });
    expect(store.rows.size).toBe(0);
    expect((await deleteSelf(store, who, 'ip')).status).toBe(404);
  });

  it('admin faqat kalit bilan o‘chiradi', async () => {
    const store = memoryStore();
    const T = 't'.repeat(20);
    await login(store, who, 'ip');
    expect((await adminDelete(store, 'x'.repeat(20), T, 'ip', '+998901234567')).status).toBe(401);
    expect((await adminDelete(store, T, T, 'ip', 'yomon')).status).toBe(400);
    expect((await adminDelete(store, T, T, 'ip', '90 123 45 67')).status).toBe(200);
    expect((await adminDelete(store, T, T, 'ip', '90 123 45 67')).status).toBe(404);
  });
});
