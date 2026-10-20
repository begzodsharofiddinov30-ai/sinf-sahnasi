import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { defineConfig } from 'vitest/config';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8')) as { version: string };
// Xavfsizlik siyosati: faqat o'z fayllari, internetga so'rov yo'q (vercel.json bilan bir xil)
const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf-8')) as {
  headers: { source: string; headers: { key: string; value: string }[] }[];
};
const securityHeaders = Object.fromEntries(vercel.headers[0].headers.map((h) => [h.key, h.value]));

const pwaStub = fileURLToPath(new URL('./src/lib/pwa-stub.ts', import.meta.url));

export default defineConfig(({ mode }) => {
  // portable — USB uchun bitta HTML fayl (file:// orqali ochiladi, service worker yo'q)
  const portable = mode === 'portable';
  const test = mode === 'test';

  return {
    // Nisbiy yo'llar: Vercel, file:// va USB uchun
    base: './',
    plugins: [
      react(),
      portable && viteSingleFile({ removeViteModuleLoader: true }),
      !portable &&
        !test &&
        VitePWA({
          registerType: 'prompt',
          injectRegister: false,
          includeAssets: ['icon.svg', 'icons/*.png', 'audio/**/*.{mp3,ogg,m4a,wav}'],
          manifest: {
            name: 'Sinf Sahnasi',
            short_name: 'Sinf Sahnasi',
            description: 'Boshlang‘ich sinflar uchun oflayn dars sahnalari',
            lang: 'uz',
            dir: 'ltr',
            start_url: './',
            scope: './',
            display: 'standalone',
            background_color: '#FFF8EC',
            theme_color: '#2563A8',
            icons: [
              { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
              { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
              { src: 'icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
            ],
          },
          workbox: {
            // Hamma narsa oldindan keshlanadi: darslar, shriftlar, ovozlar
            globPatterns: ['**/*.{js,css,html,svg,png,woff2,mp3,ogg,m4a,wav}'],
            navigateFallback: 'index.html',
            cleanupOutdatedCaches: true,
            maximumFileSizeToCacheInBytes: 8 * 1024 * 1024,
          },
        }),
    ],
    resolve: {
      alias: (portable || test ? { 'virtual:pwa-register': pwaStub } : {}) as Record<string, string>,
    },
    // Mahalliy preview'da ham Vercel'dagi kabi CSP — e2e testlar shu bilan ishlaydi
    preview: { headers: securityHeaders },
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __PORTABLE__: JSON.stringify(portable),
    },
    build: {
      target: 'es2020',
      outDir: portable ? 'dist-portable' : 'dist',
      // Portativda shriftlar ham HTML ichiga joylanadi
      assetsInlineLimit: portable ? 100_000_000 : 0,
      cssCodeSplit: !portable,
      // public/ dan faqat kerakli narsalar (audio) portativga ham ko'chiriladi
      copyPublicDir: true,
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setup.ts'],
      include: ['tests/**/*.test.{ts,tsx}'],
      css: false,
    },
  };
});
