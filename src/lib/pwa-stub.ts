// Portativ versiya va testlar uchun: service worker yo'q
export function registerSW(_opts?: unknown): (reload?: boolean) => Promise<void> {
  return async () => {};
}
