// npm run validate:content — barcha darslarni tekshiradi (Windows'da ham ishlaydi)
import { existsSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { CATALOG } from '../src/content/catalog';
import { audioPaths, validateCatalog, validateLesson } from '../src/content/validate';

const contentDir = fileURLToPath(new URL('../src/content/', import.meta.url));
const publicDir = fileURLToPath(new URL('../public/', import.meta.url));

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.ts') ? [p] : [];
  });
}

const files = ['1', '2', '3', '4'].flatMap((g) => {
  try {
    return walk(join(contentDir, g));
  } catch {
    return [];
  }
});

const toId = (file: string) => relative(contentDir, file).split(sep).join('/').replace(/\.ts$/, '');

let errorCount = 0;
let warnCount = 0;

for (const file of files) {
  const id = toId(file);
  const mod = (await import(pathToFileURL(file).href)) as { default?: unknown };
  const { errors, warnings } = validateLesson(mod.default, id);
  // Audio fayllar haqiqatan public/ ichida bormi
  for (const a of audioPaths(mod.default)) if (!existsSync(join(publicDir, ...a.split('/')))) errors.push(`${id}: audio fayl topilmadi: public/${a}`);
  errors.forEach((e) => console.error(`  ✗ ${e}`));
  warnings.forEach((w) => console.warn(`  ! ${w}`));
  errorCount += errors.length;
  warnCount += warnings.length;
}

const cat = validateCatalog(CATALOG, files.map(toId));
cat.errors.forEach((e) => console.error(`  ✗ ${e}`));
errorCount += cat.errors.length;

console.log(`\n${files.length} ta dars tekshirildi: ${errorCount} xato, ${warnCount} ogohlantirish.`);
if (errorCount > 0) process.exit(1);
