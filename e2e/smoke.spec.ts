import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { expect, test, type Page } from '@playwright/test';
import { CATALOG } from '../src/content/catalog';
import { topicId } from '../src/content/schema';

// Katalogdagi barcha darslar
const LESSONS = CATALOG.map(topicId);

function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  return errors;
}

/** Darsni klaviatura bilan oxirigacha o'tadi */
async function playThrough(page: Page) {
  await expect(page.getByTestId('player')).toBeVisible();
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

test.describe('ro‘yxatdan o‘tish', () => {
  test('ism-familiya bilan kiradi, parol so‘ralmaydi', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Xush kelibsiz!' })).toBeVisible();
    await expect(page.locator('input[type="password"]')).toHaveCount(0);
    await page.getByLabel('Ismingiz').fill('Dilnoza');
    await page.getByLabel('Familiyangiz').fill('Karimova');
    await page.getByRole('button', { name: 'Kirish' }).click();
    await expect(page.getByText(/Assalomu alaykum, Dilnoza Karimova!/)).toBeVisible();
    await page.reload();
    await expect(page.getByText(/Assalomu alaykum, Dilnoza Karimova!/)).toBeVisible();
  });
});

// Qolgan testlarda o'qituvchi allaqachon ro'yxatdan o'tgan
test.beforeEach(async ({ page }, info) => {
  if (info.titlePath.includes('ro‘yxatdan o‘tish')) return;
  await page.addInitScript(() => {
    if (!localStorage.getItem('sinf-sahnasi:teacher'))
      localStorage.setItem('sinf-sahnasi:teacher', JSON.stringify({ firstName: 'Sinov', lastName: 'O‘qituvchi', since: '2026-01-01' }));
  });
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
  for (const id of LESSONS) {
    await page.goto(`/#/dars/${id}`);
    await playThrough(page);
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
