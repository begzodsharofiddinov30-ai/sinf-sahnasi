// Klaviatura va prezentatsiya pulti (clicker) boshqaruvi
import { useEffect, useRef } from 'react';
import { isActivatableTarget, isTypingTarget } from '../lib/a11y';

export type KeyAction = 'next' | 'prev' | 'exit' | 'fullscreen' | 'hint' | 'reveal' | 'tools';

type KeyLike = Pick<KeyboardEvent, 'key' | 'code' | 'altKey' | 'ctrlKey' | 'metaKey'>;

/** Harflar e.code orqali tekshiriladi — rus/o'zbek klaviatura tartibida ham ishlaydi */
export function keyToAction(e: KeyLike): KeyAction | null {
  if (e.altKey || e.ctrlKey || e.metaKey) return null;
  switch (e.key) {
    case ' ':
    case 'Spacebar':
    case 'Enter':
    case 'ArrowRight':
    case 'PageDown':
      return 'next';
    case 'ArrowLeft':
    case 'PageUp':
      return 'prev';
    case 'Escape':
    case 'Esc':
      return 'exit';
  }
  switch (e.code) {
    case 'KeyF':
      return 'fullscreen';
    case 'KeyH':
      return 'hint';
    case 'KeyJ':
      return 'reveal';
    case 'KeyT':
      return 'tools';
  }
  return null;
}

export function usePlayerKeys(handler: (action: KeyAction) => void): void {
  const ref = useRef(handler);
  ref.current = handler;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.repeat && e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      if (isTypingTarget(e.target)) return;
      const action = keyToAction(e);
      if (!action) return;
      // Fokuslangan tugmada Enter/Space tugmaning o'zini bosadi
      if ((e.key === 'Enter' || e.key === ' ') && isActivatableTarget(e.target)) return;
      e.preventDefault();
      ref.current(action);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
}
