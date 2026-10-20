// E2E testlar: avval "npx playwright install chromium" (bir marta)
import { defineConfig, devices } from '@playwright/test';

// Mahalliy Chromium yo'lini berish mumkin (ixtiyoriy): PW_CHROMIUM_PATH=...
const executablePath = process.env.PW_CHROMIUM_PATH || undefined;

export default defineConfig({
  testDir: './e2e',
  timeout: 120_000,
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    launchOptions: { executablePath },
  },
  projects: [
    { name: '1366x768', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 768 } } },
    { name: '1920x1080', use: { ...devices['Desktop Chrome'], viewport: { width: 1920, height: 1080 } } },
  ],
  // Build + preview (Windows'da ham ishlaydi)
  webServer: {
    command: 'npm run build:all && npm run preview',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
