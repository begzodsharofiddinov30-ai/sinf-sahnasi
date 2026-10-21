import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import { CATALOG } from '../src/content/catalog';
import { topicId } from '../src/content/schema';


function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  // Mahalliy preview'da /api yo'q — ilova buni kutadi va mahalliy rejimda ishlaydi
  page.on('console', (m) => m.type() === 'error' && !m.location().url.includes('/api/') && errors.push(m.text()));
  return errors;
}

/** Darsni klaviatura bilan oxirigacha o'tadi (title — kutilayotgan dars nomi) */
async function playThrough(page: Page, title?: string) {
  await expect(page.getByTestId('player')).toBeVisible();
  if (title) await expect(page.getByTestId('player').locator('header h1')).toHaveText(title);
  const total = await page.locator('nav[aria-label="Sahnalar"] button').count();
  expect(total).toBeGreaterThanOrEqual(6);
  for (let i = 0; i < 80; i++) {
    if (await page.getByRole('button', { name: /Tugatish/ }).isVisible()) break;
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(60);
  }
  await expect(page.getByRole('button', { name: /Tugatish/ })).toBeVisible();
  await expect(page.locator('header p').first()).toContainText(`${total} / ${total}`);
}

// Barcha testlar bitta sinov hisobidan foydalanadi (admin ro'yxatida "(sinov)" deb ko'rinadi)
const TEST = { firstName: 'Sinov', lastName: 'O‘qituvchi', local: '00 000 00 00', phone: '+998000000000' };
const remote = Boolean(process.env.E2E_BASE_URL);

async function registerVia(page: Page) {
  await expect(page.getByRole('heading', { name: 'Xush kelibsiz!' })).toBeVisible();
  await expect(page.locator('input[type="password"]')).toHaveCount(0);
  await page.getByLabel('Ismingiz').fill(TEST.firstName);
  await page.getByLabel('Familiyangiz').fill(TEST.lastName);
  await page.getByLabel('Telefon raqamingiz').fill(TEST.local);
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Kirish' }).click();
  await expect(page.getByText(/Assalomu alaykum, Sinov O‘qituvchi!/)).toBeVisible({ timeout: 15_000 });
}

test.describe('ro‘yxatdan o‘tish', () => {
  test('ism, familiya va telefon bilan kiradi, parol so‘ralmaydi', async ({ page }) => {
    await page.goto('/');
    await registerVia(page);
    await page.reload();
    await expect(page.getByText(/Assalomu alaykum, Sinov O‘qituvchi!/)).toBeVisible({ timeout: 15_000 });
  });

  test('ikki kompyuter: o‘zgarishlar birlashadi va ochiq sahifa yangilanadi', async ({ browser }) => {
    test.skip(!remote, 'Faqat jonli saytda (bulut serveri bilan)');
    test.setTimeout(120_000);
    // Faqat harflardan iborat noyob ism — har safar boshqacha
    const marker = 'Sinov' + Date.now().toString().split('').map((d) => 'abcdefghij'[Number(d)]).join('');
    const synced = (p: Page) =>
      p.waitForResponse((r) => r.url().includes('/api/sync') && r.request().method() === 'POST' && r.status() === 200, { timeout: 20_000 });

    // Ikkala kompyuter ham ochiq
    const a = await (await browser.newContext()).newPage();
    await a.goto('/');
    await registerVia(a);
    const b = await (await browser.newContext()).newPage();
    await b.goto('/');
    await registerVia(b);

    // A: sinf ro'yxati o'zgaradi
    await a.goto('/#/sozlamalar');
    const sentA = synced(a);
    await a.getByRole('textbox', { name: 'Sinf ro‘yxati' }).fill(`${marker}\nAziz`);
    await a.getByRole('button', { name: 'Saqlash' }).click();
    await sentA;

    // B (hali eski ro'yxat bilan): sevimlilar o'zgaradi
    await b.goto('/#/sinf/2/matematika/soat');
    const star = b.getByRole('button', { name: /Sevimlilar/ });
    const sentB = synced(b);
    if ((await star.getAttribute('aria-pressed')) === 'true') {
      await star.click();
      await sentB;
      await star.click();
    } else await star.click();
    await synced(b).catch(() => undefined);

    // B ochiq turibdi: oynaga qaytganda A ning ro'yxati ko'rinadi (sahifa qayta yuklanmaydi)
    await b.goto('/#/sozlamalar');
    await b.waitForTimeout(16_000);
    await b.evaluate(() => window.dispatchEvent(new Event('focus')));
    await expect(b.getByRole('textbox', { name: 'Sinf ro‘yxati' })).toHaveValue(new RegExp(marker), { timeout: 20_000 });

    // Uchinchi, toza kompyuter: ikkala o'zgarish ham bor
    const c = await (await browser.newContext()).newPage();
    await c.goto('/');
    await registerVia(c);
    await c.goto('/#/sozlamalar');
    await expect(c.getByRole('textbox', { name: 'Sinf ro‘yxati' })).toHaveValue(new RegExp(marker));
    await c.goto('/');
    await expect(c.getByRole('heading', { name: 'Sevimlilar' })).toBeVisible();
    await expect(c.getByRole('link', { name: '2-sinf · Soat', exact: true })).toBeVisible();
  });

  test('ism o‘zgartiriladi, boshqa kompyuter yangi ismni so‘raydi', async ({ browser }) => {
    test.skip(!remote, 'Faqat jonli saytda (bulut serveri bilan)');
    test.setTimeout(120_000);
    const who = { firstName: 'Sinov', lastName: 'Eskiism', phone: '00 000 00 03' };
    const login = async (p: Page, last: string) => {
      await p.goto('/');
      await p.getByLabel('Ismingiz').fill(who.firstName);
      await p.getByLabel('Familiyangiz').fill(last);
      await p.getByLabel('Telefon raqamingiz').fill(who.phone);
      await p.getByRole('checkbox').check();
      await p.getByRole('button', { name: 'Kirish' }).click();
      await expect(p.getByText(new RegExp(`Assalomu alaykum, Sinov ${last}`))).toBeVisible({ timeout: 15_000 });
    };
    // Avvalgi yiqilgan sinovdan qolgan bo'lsa — tozalaymiz
    const pre = await browser.newPage();
    await pre.request.post('/api/rename', { data: { ...who, lastName: 'Yangiism', newFirstName: 'Sinov', newLastName: 'Eskiism' } });
    await pre.close();

    const a = await (await browser.newContext()).newPage();
    await login(a, 'Eskiism');
    const b = await (await browser.newContext()).newPage();
    await login(b, 'Eskiism');

    // A: ismni o'zgartiradi
    await a.goto('/#/sozlamalar');
    await a.getByRole('button', { name: 'Ismni o‘zgartirish' }).click();
    await a.getByRole('textbox', { name: 'Familiya', exact: true }).fill('Yangiism');
    const renamed = a.waitForResponse((r) => r.url().includes('/api/rename'), { timeout: 30_000 });
    await expect(a.getByTestId('rename-save')).toBeEnabled();
    await a.getByTestId('rename-save').click();
    const res = await renamed;
    expect(res.status(), await res.text()).toBe(200);
    await expect(a.getByText('Sinov Yangiism')).toBeVisible({ timeout: 15_000 });

    // B: oynaga qaytganda yangi ism so'raladi
    await b.waitForTimeout(16_000);
    await b.evaluate(() => window.dispatchEvent(new Event('focus')));
    await expect(b.getByRole('heading', { name: 'Ism o‘zgargan' })).toBeVisible({ timeout: 20_000 });

    // Tozalash: hisobni o'chiramiz
    const del = await a.request.post('/api/delete', { data: { ...who, lastName: 'Yangiism' } });
    expect(del.status()).toBe(200);
  });

  test('o‘qituvchi hisobini butunlay o‘chiradi', async ({ page }) => {
    test.skip(!remote, 'Faqat jonli saytda (bulut serveri bilan)');
    const who = { firstName: 'Sinov', lastName: 'Ochirish', phone: '00 000 00 01' };
    await page.goto('/');
    await page.getByLabel('Ismingiz').fill(who.firstName);
    await page.getByLabel('Familiyangiz').fill(who.lastName);
    await page.getByLabel('Telefon raqamingiz').fill(who.phone);
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Kirish' }).click();
    await page.goto('/#/sozlamalar');
    await page.getByRole('button', { name: 'Hisobimni butunlay o‘chirish' }).click();
    await page.getByRole('button', { name: 'Ha, butunlay o‘chirish' }).click();
    await expect(page.getByRole('heading', { name: 'Xush kelibsiz!' })).toBeVisible({ timeout: 15_000 });
    const res = await page.request.post('/api/sync', { data: who });
    expect(res.status()).toBe(404);
  });
});

// Qolgan testlarda o'qituvchi allaqachon ro'yxatdan o'tgan
test.beforeEach(async ({ page }, info) => {
  if (info.titlePath.includes('ro‘yxatdan o‘tish')) return;
  await page.addInitScript((t) => {
    if (!localStorage.getItem('sinf-sahnasi:teacher'))
      localStorage.setItem('sinf-sahnasi:teacher', JSON.stringify({ firstName: t.firstName, lastName: t.lastName, phone: t.phone, since: '2026-01-01' }));
  }, TEST);
});

test('bosh sahifadan darsgacha va oxirigacha', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/');
  await page.getByRole('link', { name: /^1\s*sinf$/ }).click();
  await page.getByRole('link', { name: /Matematika/ }).click();
  await page.getByRole('link', { name: /Sonlar 1–10/ }).click();
  await page.getByRole('button', { name: /Darsni boshlash/ }).click();
  await playThrough(page);
  await page.getByRole('button', { name: /Tugatish/ }).click();
  await expect(page.getByRole('heading', { name: 'Sonlar 1–10: sanash' })).toBeVisible();
  expect(errors).toEqual([]);
});

test('barcha darslar boshidan oxirigacha oʻtadi', async ({ page }) => {
  // 160 ta dars — sekin CI serverida ham ulgursin
  test.setTimeout(10 * 60_000);
  const errors = watchErrors(page);
  for (const t of CATALOG) {
    await page.goto(`/#/dars/${topicId(t)}`);
    await playThrough(page, t.title);
  }
  expect(errors).toEqual([]);
});

test('oflayn: internet uzilganda ham ochiladi', async ({ page, context }) => {
  // 1-tashrif (uyda, internet bor): hamma narsa keshlanadi
  await page.goto('/');
  await expect(page.getByText('Oflayn tayyor', { exact: true })).toBeVisible({ timeout: 30_000 });
  // 2-tashrif: sahifani endi service worker boshqaradi
  await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller !== null, undefined, { timeout: 15_000 });
  // Maktabda: internet yo'q
  await context.setOffline(true);
  await page.goto('/#/dars/2/matematika/soat');
  await page.reload();
  await expect(page.getByRole('heading', { name: 'Soat bilan tanishamiz' })).toBeVisible();
  await playThrough(page);
  // shrift ham keshdan yuklangan
  expect(await page.evaluate(() => document.fonts.check('800 20px Nunito'))).toBe(true);
  await context.setOffline(false);
});

test('portativ versiya file:// orqali ishlaydi', async ({ page }) => {
  const errors = watchErrors(page);
  const url = pathToFileURL(resolve('dist-portable/index.html')).href;
  await page.goto(url);
  await expect(page.getByText('Portativ versiya')).toBeVisible();
  await page.goto(`${url}#/dars/1/ona-tili/soz-yasash`);
  await playThrough(page);
  expect(await page.evaluate(() => document.fonts.check('800 20px Nunito'))).toBe(true);
  expect(errors).toEqual([]);
});

test('kuchsiz kompyuter: CPU 4x sekin, birinchi yuklanish 3 soniyadan kam', async ({ page, context, browserName }) => {
  test.skip(browserName !== 'chromium');
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  const t0 = Date.now();
  await page.goto('/', { waitUntil: 'load' });
  await expect(page.getByRole('navigation', { name: 'Sinflar' })).toBeVisible();
  const ms = Date.now() - t0;
  console.log(`  birinchi yuklanish (CPU 4x): ${ms} ms`);
  expect(ms).toBeLessThan(3000);
});
