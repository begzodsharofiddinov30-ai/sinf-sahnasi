// Qog'oz uchun tasvirlar: o'lchamlar mm da (ekran o'lchamiga bog'liq emas)
import { ClockFace } from '../components/ClockFace';
import { PICTURE_LABELS, Picture } from '../components/Picture';
import type { Card, PictureName, Visual } from '../content/schema';

export function Pic({ name, mm = 12 }: { name: PictureName; mm?: number }) {
  return (
    <span className="inline-block" style={{ width: `${mm}mm`, height: `${mm}mm` }}>
      <Picture name={name} title={PICTURE_LABELS[name]} />
    </span>
  );
}

export function PrintFrame({ frames, filled }: { frames: 1 | 2; filled: number }) {
  return (
    <span className="inline-flex gap-[6mm]">
      {Array.from({ length: frames }, (_, f) => (
        <span key={f} className="inline-grid grid-cols-5 border-[0.6mm] border-black">
          {Array.from({ length: 10 }, (_, k) => {
            const i = f * 10 + k;
            return (
              <span key={k} className="grid h-[11mm] w-[11mm] place-items-center border-[0.3mm] border-black">
                {i < filled && <span className="block h-[7mm] w-[7mm] rounded-full bg-black" />}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

export function PrintVisual({ v }: { v: Visual }) {
  switch (v.kind) {
    case 'items':
      return (
        <span className="inline-flex max-w-[80mm] flex-wrap gap-[2mm]">
          {Array.from({ length: v.count }, (_, i) => (
            <Pic key={i} name={v.item} mm={11} />
          ))}
        </span>
      );
    case 'number':
      return <span className="text-[28pt] font-black">{v.value}</span>;
    case 'tiles':
      return <span className="text-[16pt] font-black">{v.items.join(' ')}</span>;
    case 'word':
      return <span className="text-[20pt] font-black tracking-wide">{v.text}</span>;
    case 'picture':
      return <Pic name={v.item} mm={22} />;
    case 'clock':
      return (
        <span className="inline-block h-[34mm] w-[34mm]">
          <ClockFace time={v} className="h-full w-full" />
        </span>
      );
    case 'tenframe':
      return <PrintFrame frames={v.frames ?? 1} filled={v.count} />;
    case 'blocks':
      return (
        <span className="inline-flex items-end gap-[2mm]" aria-label={`${v.tens} o‘nlik, ${v.ones} birlik`}>
          {Array.from({ length: v.tens }, (_, t) => (
            <span key={t} className="inline-flex flex-col">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className="block h-[3mm] w-[3mm] border-[0.3mm] border-black bg-[#cfe0f5]" />
              ))}
            </span>
          ))}
          <span className="inline-grid grid-flow-col grid-rows-5 gap-[0.6mm]">
            {Array.from({ length: v.ones }, (_, i) => (
              <span key={i} className="block h-[3mm] w-[3mm] border-[0.3mm] border-black bg-[#fde3cc]" />
            ))}
          </span>
        </span>
      );
    case 'groups':
      return (
        <span className="inline-flex flex-wrap gap-[3mm]">
          {Array.from({ length: v.groups }, (_, g) => (
            <span key={g} className="inline-flex flex-wrap gap-[1mm] rounded-[3mm] border-[0.4mm] border-dashed border-black p-[1.5mm]">
              {Array.from({ length: v.each }, (_, i) => (
                <Pic key={i} name={v.item} mm={7} />
              ))}
            </span>
          ))}
        </span>
      );
    case 'mascot':
      return null;
  }
}

export function PrintCard({ c }: { c: Card }) {
  return (
    <span className="inline-flex items-center gap-[2mm]">
      {c.visual && c.visual.kind !== 'number' && <PrintVisual v={c.visual} />}
      {(c.label ?? (c.visual?.kind === 'number' ? String(c.visual.value) : '')) && <span className="text-[14pt] font-bold">{c.label ?? (c.visual?.kind === 'number' ? String(c.visual.value) : '')}</span>}
    </span>
  );
}
