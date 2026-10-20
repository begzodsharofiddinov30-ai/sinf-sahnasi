// Sudrab tashlash: sichqoncha, sensor ekran va qalam uchun bitta kod (Pointer Events).
// Muqobil yo'l: narsani bosib tanlash, keyin joyini bosish (klaviatura ham shunday ishlaydi).
import { useCallback, useRef, type ReactNode } from 'react';
import { playSfx } from '../lib/audio';

export function useDropZones() {
  const zones = useRef(new Map<string, HTMLElement>());
  const zoneRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) zones.current.set(id, el);
      else zones.current.delete(id);
    },
    [],
  );
  /** Ko'rsatkich ostidagi zona id'si */
  const hit = useCallback((x: number, y: number): string | null => {
    for (const [id, el] of zones.current) {
      const r = el.getBoundingClientRect();
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return id;
    }
    return null;
  }, []);
  return { zoneRef, hit };
}

interface DragItemProps {
  /** Bosish (yoki Enter/Space) */
  onTap: () => void;
  /** Tashlangan nuqta; true — qabul qilindi */
  onDrop: (x: number, y: number, el: HTMLElement) => boolean;
  disabled?: boolean;
  selected?: boolean;
  label: string;
  className?: string;
  children: ReactNode;
}

const DRAG_THRESHOLD = 8;

export function DragItem({ onTap, onDrop, disabled, selected, label, className = '', children }: DragItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ id: number; x0: number; y0: number; active: boolean } | null>(null);
  const suppressClick = useRef(false);

  const reset = (el: HTMLElement) => {
    el.style.transition = 'transform 0.25s ease-out';
    el.style.transform = '';
    el.style.zIndex = '';
    delete el.dataset.dragging;
  };

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-label={label}
      aria-pressed={selected}
      className={`relative touch-none select-none ${className}`}
      onPointerDown={(e) => {
        if (disabled || e.button > 0) return;
        drag.current = { id: e.pointerId, x0: e.clientX, y0: e.clientY, active: false };
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          // e'tiborsiz
        }
      }}
      onPointerMove={(e) => {
        const d = drag.current;
        const el = ref.current;
        if (!d || d.id !== e.pointerId || !el) return;
        const dx = e.clientX - d.x0;
        const dy = e.clientY - d.y0;
        if (!d.active && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        if (!d.active) playSfx('lift');
        d.active = true;
        el.style.transition = 'none';
        el.style.transform = `translate(${dx}px, ${dy}px) scale(1.08)`;
        el.style.zIndex = '50';
        el.dataset.dragging = 'true';
      }}
      onPointerUp={(e) => {
        const d = drag.current;
        drag.current = null;
        const el = ref.current;
        if (!d?.active || !el) return;
        suppressClick.current = true;
        // Avval joyiga qaytaramiz, keyin tekshiramiz — shunda tebranish to'g'ri joyda bo'ladi
        reset(el);
        onDrop(e.clientX, e.clientY, el);
      }}
      onPointerCancel={() => {
        drag.current = null;
        if (ref.current) reset(ref.current);
      }}
      onClick={() => {
        if (suppressClick.current) {
          suppressClick.current = false;
          return;
        }
        onTap();
      }}
    >
      {children}
    </button>
  );
}
