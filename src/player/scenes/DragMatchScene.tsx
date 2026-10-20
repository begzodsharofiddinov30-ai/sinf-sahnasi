// Moslashtirish: narsani mos joyga sudrang (yoki bosib tanlang, keyin joyini bosing)
import { useMemo, useRef, useState } from 'react';
import { CardView, cardLabel } from '../../components/CardView';
import { Feedback, type FeedbackState } from '../../components/Feedback';
import { RichText } from '../../components/RichText';
import type { DragMatchScene as MatchData } from '../../content/schema';
import { announce } from '../../lib/a11y';
import { playSfx } from '../../lib/audio';
import { pop, shake } from '../../lib/motion';
import { DragItem, useDropZones } from '../dnd';
import { hashSeed, shuffledIndices } from '../exercises';
import type { SceneProps } from '../sceneProps';

export function DragMatchScene({ scene, revealed }: SceneProps<MatchData>) {
  const root = useRef<HTMLDivElement>(null);
  const order = useMemo(() => shuffledIndices(scene.pairs.length, hashSeed(scene.id)), [scene.id, scene.pairs.length]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [fb, setFb] = useState<{ state: FeedbackState; n: number }>({ state: 'idle', n: 0 });
  const { zoneRef, hit } = useDropZones();

  const isPlaced = (i: number) => revealed || placed.includes(i);
  const allDone = placed.length === scene.pairs.length;
  const fbState: FeedbackState = allDone ? 'done' : revealed ? 'revealed' : fb.state;

  const attempt = (item: number, target: number) => {
    const el = root.current?.querySelector(`[data-item="${item}"]`);
    if (item !== target) {
      shake(el);
      playSfx('retry');
      setFb((f) => ({ state: 'retry', n: f.n + 1 }));
      announce(scene.retryHint ?? 'Yana urinib ko‘ring');
      return false;
    }
    const next = [...placed, item];
    setPlaced(next);
    setSelected(null);
    window.requestAnimationFrame(() => pop(root.current?.querySelector(`[data-target="${target}"]`)));
    if (next.length === scene.pairs.length) {
      playSfx('correct');
      announce('Barakalla! Hammasi to‘g‘ri.');
    } else {
      playSfx('pop', next.length + 4);
      setFb((f) => ({ state: 'idle', n: f.n }));
    }
    return true;
  };

  return (
    <div ref={root} className="flex h-full flex-col items-center gap-[2vh] px-[3vw] py-[2vh]">
      <h2 className="text-center text-lead font-black text-ink">
        <RichText text={scene.prompt} />
      </h2>

      {/* Joylar */}
      <div className="flex w-full flex-1 flex-wrap items-stretch justify-center gap-[2vw]">
        {scene.pairs.map((p, t) => {
          const done = isPlaced(t);
          return (
            <button
              key={t}
              type="button"
              ref={zoneRef(String(t))}
              data-target={t}
              onClick={() => selected !== null && !done && attempt(selected, t)}
              aria-label={`${cardLabel(p.target)} joyi${done ? `: ${cardLabel(p.item)}` : ''}`}
              className={`flex min-w-[14vw] flex-1 basis-0 flex-col items-center justify-between gap-[1vh] rounded-xl3 border-[0.25rem] bg-surface p-[1.5vh] ${
                selected !== null && !done ? 'border-primary' : 'border-line'
              }`}
            >
              <CardView card={p.target} size="sm" />
              <span
                className={`grid min-h-[12vh] w-full place-items-center rounded-xl2 border-[0.25rem] ${
                  done ? 'border-solid border-success bg-success-soft' : 'border-dashed border-ink-soft/40'
                }`}
              >
                {done ? <CardView card={p.item} size="sm" /> : <span className="text-meta font-bold text-ink-soft">?</span>}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tanlanadigan narsalar */}
      <div className="flex min-h-[14vh] flex-wrap items-center justify-center gap-[1.5vw]" role="group" aria-label="Narsalar">
        {order
          .filter((i) => !isPlaced(i))
          .map((i) => (
            <span key={i} data-item={i} className="inline-block">
              <DragItem
                label={`${cardLabel(scene.pairs[i].item)}${selected === i ? ', tanlangan' : ''}`}
                selected={selected === i}
                onTap={() => setSelected((s) => (s === i ? null : i))}
                onDrop={(x, y) => {
                  const zone = hit(x, y);
                  return zone !== null && attempt(i, Number(zone));
                }}
                className={`grid min-h-[12vh] min-w-[12vh] place-items-center rounded-xl2 border-[0.25rem] bg-surface px-[1.5vw] py-[1vh] shadow-[0_0.3rem_0_rgb(0_0_0/0.1)] ${
                  selected === i ? 'border-primary ring-[0.3rem] ring-primary-soft' : 'border-line'
                }`}
              >
                <CardView card={scene.pairs[i].item} size="sm" />
              </DragItem>
            </span>
          ))}
      </div>

      <Feedback
        state={fbState}
        attempt={fb.n}
        retryText={scene.retryHint}
        idleText={selected !== null ? 'Endi mos joyni bosing' : undefined}
      />
    </div>
  );
}
