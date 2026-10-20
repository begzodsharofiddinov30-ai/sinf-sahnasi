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

  test('boshqa kompyuterda kirganda sinf ro‘yxati bulutdan qaytadi', async ({ browser }) => {
    test.skip(!remote, 'Faqat jonli saytda (bulut serveri bilan)');
    // Faqat harflardan iborat noyob ism — har safar boshqacha
    const marker = 'Sinov' + Date.now().toString().split('').map((d) => 'abcdefghij'[Number(d)]).join('');
    const a = await (await browser.newContext()).newPage();
    await a.goto('/');
    await registerVia(a);
    await a.goto('/#/sozlamalar');
    await a.getByRole('textbox', { name: 'Sinf ro‘yxati' }).fill(`${marker}\nAziz`);
    const sent = a.waitForResponse((r) => r.url().includes('/api/sync') && r.request().method() === 'POST' && r.status() === 200, { timeout: 20_000 });
    await a.getByRole('button', { name: 'Saqlash' }).click();
    await sent;

    // "Boshqa kompyuter": toza brauzer
    const b = await (await browser.newContext()).newPage();
    await b.goto('/');
    await registerVia(b);
    await b.goto('/#/sozlamalar');
    await expect(b.getByRole('textbox', { name: 'Sinf ro‘yxati' })).toHaveValue(new RegExp(marker));
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
