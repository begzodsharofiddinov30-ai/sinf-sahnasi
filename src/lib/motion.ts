// Kichik imperativ animatsiyalar (faqat transform) — sokin rejimda o'chadi
import { prefersReducedMotion } from './a11y';

export function motionAllowed(): boolean {
  try {
    return !prefersReducedMotion() && document.documentElement.dataset.motion !== 'reduced';
  } catch {
    return false;
  }
}

/** Yumshoq "yo'q" tebranishi */
export function shake(el: Element | null | undefined): void {
  if (!el || !motionAllowed() || typeof (el as HTMLElement).animate !== 'function') return;
  (el as HTMLElement).animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-14px)' },
      { transform: 'translateX(14px)' },
      { transform: 'translateX(-8px)' },
      { transform: 'translateX(8px)' },
      { transform: 'translateX(0)' },
    ],
    { duration: 420, easing: 'ease-out' },
  );
}

/** Joyiga tushganda "pop" */
export function pop(el: Element | null | undefined): void {
  if (!el || !motionAllowed() || typeof (el as HTMLElement).animate !== 'function') return;
  (el as HTMLElement).animate([{ transform: 'scale(1)' }, { transform: 'scale(1.12)' }, { transform: 'scale(1)' }], {
    duration: 320,
    easing: 'ease-out',
  });
}
