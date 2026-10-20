// Ekran o'quvchilari uchun e'lonlar va harakatni kamaytirish sozlamasi
export const LIVE_REGION_ID = 'live-region';

export function announce(text: string): void {
  try {
    const el = document.getElementById(LIVE_REGION_ID);
    if (!el) return;
    el.textContent = '';
    window.setTimeout(() => {
      el.textContent = text;
    }, 30);
  } catch {
    // e'tiborsiz
  }
}

export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    return false;
  }
}

/** Fokus matn maydonida bo'lsa, klaviatura yorliqlari ishlamasin */
export function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

/** Fokus tugma yoki havolada bo'lsa (Enter/Space o'zi bosadi) */
export function isActivatableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'BUTTON' || tag === 'A' || target.getAttribute('role') === 'button';
}
