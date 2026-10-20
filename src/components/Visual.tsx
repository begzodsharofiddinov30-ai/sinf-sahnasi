// Sxemadagi Visual obyektini chizadi
import type { Visual as VisualData } from '../content/schema';
import { ClockFace } from './ClockFace';
import { Mascot } from './Mascot';
import { TenFrameGrid } from './TenFrameGrid';
import { PICTURE_LABELS, Picture } from './Picture';

const OPERATORS = new Set(['+', '−', '-', '=', '×', ':', '>', '<', '?']);

export type VisualSize = 'lg' | 'md' | 'sm';

// Soat raqamlari orqa qatordan ham o'qilsin
const CLOCK_VH: Record<VisualSize, number> = { lg: 42, md: 32, sm: 22 };

// O'lcham soniga bog'liq emas (faqat 10 dan oshsa kichrayadi) — solishtirishda adashtirmasin
function itemSize(count: number, size: VisualSize): string {
  const base = size === 'lg' ? 15 : size === 'md' ? 10 : 7;
  return `${count > 10 ? base * 0.7 : base}vh`;
}

/** O'nlik bloklar: ustun = 10 ta kub, alohida kub = 1 */
function Blocks({ tens, ones, unit }: { tens: number; ones: number; unit: number }) {
  const u = `${unit}vh`;
  const cube = 'block rounded-[0.3vh] border-[0.25vh] border-[#1B4A80] bg-[#5A93E3]';
  return (
    <div className="flex items-end gap-[1.2vw]" role="img" aria-label={`${tens} ta o‘nlik va ${ones} ta birlik`}>
      {Array.from({ length: tens }, (_, t) => (
        <span key={`t${t}`} className="flex flex-col" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={cube} style={{ width: u, height: u }} />
          ))}
        </span>
      ))}
      {ones > 0 && (
        <span className="ml-[1vw] grid grid-flow-col grid-rows-5 gap-[0.4vh]" aria-hidden="true">
          {Array.from({ length: ones }, (_, i) => (
            <span key={i} className="block rounded-[0.3vh] border-[0.25vh] border-[#8A3B0B] bg-[#F2A33A]" style={{ width: u, height: u }} />
          ))}
        </span>
      )}
    </div>
  );
}

export function Visual({ visual, size = 'lg' }: { visual: VisualData; size?: VisualSize }) {
  const scale = size === 'lg' ? 1 : size === 'md' ? 0.7 : 0.45;
  switch (visual.kind) {
    case 'items': {
      // beshtadan guruhlab chiqaramiz — sanash osonroq
      const groups: number[][] = [];
      for (let i = 0; i < visual.count; i += 5) groups.push(Array.from({ length: Math.min(5, visual.count - i) }, (_, k) => i + k));
      const s = itemSize(visual.count, size);
      return (
        <div className="flex flex-col items-center gap-[1.5vh]" role="img" aria-label={`${visual.count} ta ${PICTURE_LABELS[visual.item]}`}>
          {groups.map((g, gi) => (
            <div key={gi} className="flex gap-[1vw]">
              {g.map((i) => (
                <span key={i} style={{ width: s, height: s }} className="block shrink-0" aria-hidden="true">
                  <Picture name={visual.item} title="" />
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    }
    case 'number':
      return (
        <div className="font-black leading-none text-primary" style={{ fontSize: `${22 * scale}vh` }}>
          {visual.value}
        </div>
      );
    case 'tiles':
      return (
        <div className="flex flex-wrap items-center justify-center gap-[1vw]" style={{ fontSize: `${(visual.items.length > 6 ? 6 : 10) * scale}vh` }}>
          {visual.items.map((t, i) => {
            const isOp = OPERATORS.has(t) && t !== '?';
            const hl = visual.highlight?.includes(i);
            return (
              <span
                key={i}
                className={
                  isOp
                    ? 'px-[0.2em] font-black text-ink-soft'
                    : `min-w-[1.4em] rounded-[0.25em] border-[0.06em] px-[0.25em] text-center font-black leading-tight ${
                        hl ? 'border-accent bg-accent-soft text-ink underline decoration-[0.08em] underline-offset-[0.12em]' : 'border-line bg-surface text-ink'
                      }`
                }
              >
                {t}
              </span>
            );
          })}
        </div>
      );
    case 'word':
      return (
        <div className="flex gap-[0.08em] font-black" style={{ fontSize: `${14 * scale}vh` }} aria-label={visual.text}>
          {[...visual.text].map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={visual.highlight?.includes(i) ? 'rounded-[0.15em] bg-accent-soft px-[0.05em] text-warn underline decoration-[0.06em]' : 'text-ink'}
            >
              {ch}
            </span>
          ))}
        </div>
      );
    case 'picture':
      return (
        <figure className="flex flex-col items-center gap-[1vh]">
          <span style={{ width: `${28 * scale}vh`, height: `${28 * scale}vh` }} className="block">
            <Picture name={visual.item} title={visual.label ?? PICTURE_LABELS[visual.item]} />
          </span>
          {visual.label && <figcaption className="text-lead font-extrabold">{visual.label}</figcaption>}
        </figure>
      );
    case 'clock':
      return (
        <span className="block" style={{ width: `${CLOCK_VH[size]}vh`, height: `${CLOCK_VH[size]}vh` }}>
          <ClockFace time={visual} className="h-full w-full" />
        </span>
      );
    case 'tenframe': {
      const cells = Array.from({ length: (visual.frames ?? 1) * 10 }, (_, i) => i < visual.count);
      return (
        <div role="img" aria-label={`O‘nlik ramkada ${visual.count} ta`}>
          <TenFrameGrid cells={cells} cellClass={size === 'lg' ? 'h-[9vh] w-[9vh]' : size === 'md' ? 'h-[6.5vh] w-[6.5vh]' : 'h-[4.5vh] w-[4.5vh]'} />
        </div>
      );
    }
    case 'blocks':
      return <Blocks tens={visual.tens} ones={visual.ones} unit={size === 'lg' ? 2.6 : size === 'md' ? 2 : 1.4} />;
    case 'groups': {
      const s = `${size === 'lg' ? 7 : size === 'md' ? 5.5 : 4}vh`;
      return (
        <div className="flex flex-wrap items-center justify-center gap-[1.5vw]" role="img" aria-label={`${visual.groups} ta guruh, har birida ${visual.each} ta ${PICTURE_LABELS[visual.item]}`}>
          {Array.from({ length: visual.groups }, (_, g) => (
            <div key={g} className="flex max-w-[calc(5*var(--s)+3vw)] flex-wrap justify-center gap-[0.4vw] rounded-[2vh] border-[0.4vh] border-dashed border-ink-soft/50 p-[1vh]" style={{ ['--s' as string]: s }}>
              {Array.from({ length: visual.each }, (_, i) => (
                <span key={i} style={{ width: s, height: s }} className="block" aria-hidden="true">
                  <Picture name={visual.item} title="" />
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    }
    case 'mascot':
      return (
        <span className="block" style={{ height: `${32 * scale}vh` }}>
          <Mascot mood={visual.mood} className="h-full w-auto" />
        </span>
      );
  }
}
