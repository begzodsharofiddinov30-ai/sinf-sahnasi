// Kartochka mazmuni: rasm va/yoki yozuv
import type { Card } from '../content/schema';
import { Visual, type VisualSize } from './Visual';

export function cardLabel(c: Card): string {
  if (c.label) return c.label;
  const v = c.visual;
  if (!v) return '';
  switch (v.kind) {
    case 'items':
      return `${v.count} ta ${v.item}`;
    case 'number':
      return String(v.value);
    case 'word':
      return v.text;
    case 'tiles':
      return v.items.join(' ');
    case 'picture':
      return v.label ?? v.item;
    case 'clock':
      return `${v.h}:${String(v.m).padStart(2, '0')}`;
    case 'tenframe':
      return `${v.count}`;
    case 'blocks':
      return String(v.tens * 10 + v.ones);
    case 'groups':
      return `${v.groups} × ${v.each}`;
    case 'mascot':
      return 'Bo‘tajon';
  }
}

export function CardView({ card, size = 'sm', textClass = 'text-body' }: { card: Card; size?: VisualSize; textClass?: string }) {
  const showLabel = card.label && !(card.visual?.kind === 'number' && String(card.visual.value) === card.label);
  return (
    <span className="pointer-events-none flex flex-col items-center justify-center gap-[0.6vh]">
      {card.visual && <Visual visual={card.visual} size={size} />}
      {showLabel && <span className={`${textClass} font-black leading-tight`}>{card.label}</span>}
    </span>
  );
}
