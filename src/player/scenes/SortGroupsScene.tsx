// Guruhlarga ajratish: har bir narsani to'g'ri guruhga olib boring
import { useMemo, useRef, useState } from 'react';
import { CardView, cardLabel } from '../../components/CardView';
import { Feedback, type FeedbackState } from '../../components/Feedback';
import { RichText } from '../../components/RichText';
import type { SortGroupsScene as SortData } from '../../content/schema';
import { announce } from '../../lib/a11y';
import { playSfx } from '../../lib/audio';
import { pop, shake } from '../../lib/motion';
import { DragItem, useDropZones } from '../dnd';
import { hashSeed, shuffledIndices } from '../exercises';
import type { SceneProps } from '../sceneProps';

const GROUP_TONES = ['bg-[#DCE9F7]', 'bg-[#FDE3CC]', 'bg-[#DDF0D5]'];

export function SortGroupsScene({ scene, revealed }: SceneProps<SortData>) {
  const root = useRef<HTMLDivElement>(null);
  const order = useMemo(() => shuffledIndices(scene.items.length, hashSeed(scene.id)), [scene.id, scene.items.length]);
  const [placed, setPlaced] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [fb, setFb] = useState<{ state: FeedbackState; n: number }>({ state: 'idle', n: 0 });
  const { zoneRef, hit } = useDropZones();

  const isPlaced = (i: number) => revealed || placed.includes(i);
  const allDone = placed.length === scene.items.length;
  const fbState: FeedbackState = allDone ? 'done' : revealed ? 'revealed' : fb.state;

  const attempt = (item: number, group: number) => {
    if (scene.items[item].group !== group) {
      shake(root.current?.querySelector(`[data-item="${item}"]`));
      playSfx('retry');
      setFb((f) => ({ state: 'retry', n: f.n + 1 }));
      announce(scene.retryHint ?? 'Yana urinib ko‘ring');
      return false;
    }
    const next = [...placed, item];
    setPlaced(next);
    setSelected(null);
    window.requestAnimationFrame(() => pop(root.current?.querySelector(`[data-group="${group}"]`)));
    if (next.length === scene.items.length) {
      playSfx('correct');
      announce('Barakalla! Hammasi joyida.');
    } else {
      playSfx('pop', next.length + 4);
      setFb((f) => ({ state: 'idle', n: f.n }));
    }
    return true;
  };

  return (
    <div ref={root} className="flex h-full flex-col items-center gap-[1.5vh] px-[3vw] py-[2vh]">
      <h2 className="text-center text-lead font-black text-ink">
        <RichText text={scene.prompt} />
      </h2>

      <div className="flex min-h-[14vh] flex-wrap items-center justify-center gap-[1.2vw]" role="group" aria-label="Narsalar">
        {order
          .filter((i) => !isPlaced(i))
          .map((i) => (
            <span key={i} data-item={i} className="inline-block">
              <DragItem
                label={`${cardLabel(scene.items[i])}${selected === i ? ', tanlangan' : ''}`}
                selected={selected === i}
                onTap={() => setSelected((s) => (s === i ? null : i))}
                onDrop={(x, y) => {
                  const zone = hit(x, y);
                  return zone !== null && attempt(i, Number(zone));
                }}
                className={`grid min-h-[11vh] min-w-[11vh] place-items-center rounded-xl2 border-[0.25rem] bg-surface px-[1.2vw] py-[0.8vh] shadow-[0_0.3rem_0_rgb(0_0_0/0.1)] ${
                  selected === i ? 'border-primary ring-[0.3rem] ring-primary-soft' : 'border-line'
                }`}
              >
                <CardView card={scene.items[i]} size="sm" />
              </DragItem>
            </span>
          ))}
      </div>

      <div className={`grid w-full flex-1 gap-[2vw] ${scene.groups.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {scene.groups.map((g, gi) => {
          const inside = scene.items.map((it, i) => ({ it, i })).filter(({ it, i }) => it.group === gi && isPlaced(i));
          return (
            <button
              key={gi}
              type="button"
              ref={zoneRef(String(gi))}
              data-group={gi}
              onClick={() => selected !== null && attempt(selected, gi)}
              aria-label={`${cardLabel(g)} guruhi, ichida ${inside.length} ta`}
              className={`flex flex-col items-center gap-[1vh] rounded-xl3 border-[0.3rem] p-[1.5vh] ${GROUP_TONES[gi]} ${
                selected !== null ? 'border-primary' : 'border-transparent'
              }`}
            >
              <CardView card={g} size="sm" textClass="text-lead" />
              <span className="flex flex-wrap items-center justify-center gap-[0.8vw]">
                {inside.map(({ it, i }) => (
                  <span key={i} className="grid place-items-center rounded-xl bg-surface/80 px-[0.6vw] py-[0.4vh]">
                    <CardView card={it} size="sm" textClass="text-meta" />
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <Feedback state={fbState} attempt={fb.n} retryText={scene.retryHint} idleText={selected !== null ? 'Endi guruhni bosing' : undefined} />
    </div>
  );
}
