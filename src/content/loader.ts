// Darslar alohida bo'laklarga ajratiladi va kerak bo'lganda yuklanadi
import type { Lesson } from './schema';

const modules = import.meta.glob<{ default: Lesson }>([
  './1/**/*.ts',
  './2/**/*.ts',
  './3/**/*.ts',
  './4/**/*.ts',
]);

const pathToId = (p: string) => p.replace(/^\.\//, '').replace(/\.ts$/, '');

export const lessonFileIds: string[] = Object.keys(modules).map(pathToId);

const cache = new Map<string, Lesson>();

export async function loadLesson(id: string): Promise<Lesson | null> {
  const hit = cache.get(id);
  if (hit) return hit;
  const load = modules[`./${id}.ts`];
  if (!load) return null;
  const mod = await load();
  cache.set(id, mod.default);
  return mod.default;
}
