// So'z yasash: harf yoki bo'g'inlarni kataklarga qo'ying (sh, ch, ng, o‘, g‘ — bitta bo'lak)
import { useMemo, useRef, useState } from 'react';
import { Feedback, type FeedbackState } from '../../components/Feedback';
import { PICTURE_LABELS, Picture } from '../../components/Picture';
import { RichText } from '../../components/RichText';
import type { BuildWordScene as WordData } from '../../content/schema';
import { announce } from '../../lib/a11y';
import { playSfx } from '../../lib/audio';
import { pop, shake } from '../../lib/motion';
import { DragItem, useDropZones } from '../dnd';
import { hashSeed, placeTile, shuffleSeeded } from '../exercises';
import type { SceneProps } from '../sceneProps';

export function BuildWordScene({ scene, revealed }: SceneProps<WordData>) {
  const root = useRef<HTMLDivElement>(null);
  const tray = useMemo(
    () => shuffleSeeded([...scene.tiles, ...(scene.extra ?? [])].map((text, id) => ({ id, text })), hashSeed(scene.id)),
    [scene.id, scene.tiles, scene.extra],
  );
  const [slots, setSlots] = useState<(string | null)[]>(() => scene.tiles.map(() => null));
  const [used, setUsed] = useState<number[]>([]);
  const [fb, setFb] = useState<{ state: FeedbackState; n: number }>({ state: 'idle', n: 0 });
  const { zoneRef, hit } = useDropZones();

  const shownSlots = revealed ? scene.tiles : slots;
  const done = slots.every((s) => s !== null);
  const fbState: FeedbackState = done ? 'done' : revealed ? 'revealed' : fb.state;

  const attempt = (tileId: number, text: string, slotIndex?: number) => {
    const r = placeTile(slots, scene.tiles, text, slotIndex);
    if (!r.ok) {
      shake(root.current?.querySelector(`[data-tile="${tileId}"]`));
      playSfx('retry');
      setFb((f) => ({ state: 'retry', n: f.n + 1 }));
      announce(scene.retryHint ?? 'Bu bo‘lak bu yerga emas');
      return false;
    }
    setSlots(r.slots);
    setUsed((u) => [...u, tileId]);
    window.requestAnimationFrame(() => pop(root.current?.querySelector(`[data-slot="${r.index}"]`)));
    if (r.slots.every((s) => s !== null)) {
      playSfx('correct');
      announce(`Barakalla! ${scene.word}`);
    } else {
      playSfx('pop', r.index + 4);
      setFb((f) => ({ state: 'idle', n: f.n }));
    }
    return true;
  };

  const tileClass =
    'grid min-h-[13vh] min-w-[13vh] place-items-center rounded-xl2 border-[0.25rem] px-[1.2vw] text-[8vh] font-black leading-none';

  return (
    <div ref={root} className="flex h-full flex-col items-center gap-[2vh] px-[3vw] py-[2vh]">
      <h2 className="text-center text-lead font-black text-ink">
        <RichText text={scene.prompt} />
      </h2>
      {scene.picture && (
        <span className="block h-[18vh] w-[18vh]">
          <Picture name={scene.picture} title={PICTURE_LABELS[scene.picture]} />
        </span>
      )}

      {/* Kataklar */}
      <div className="flex flex-wrap items-center justify-center gap-[1vw]" role="group" aria-label="So‘z kataklari">
        {shownSlots.map((s, i) => (
          <span
            key={i}
            ref={zoneRef(String(i))}
            data-slot={i}
            className={`${tileClass} ${s ? 'border-solid border-success bg-success-soft text-ink' : 'border-dashed border-ink-soft/50 bg-surface text-transparent'}`}
            aria-label={s ? `${i + 1}-katak: ${s}` : `${i + 1}-katak, bo‘sh`}
          >
            {s ?? '·'}
          </span>
        ))}
      </div>

      {/* Bo'laklar */}
      <div className="mt-auto flex flex-wrap items-center justify-center gap-[1.2vw]" role="group" aria-label="Harflar">
        {tray
          .filter((t) => !used.includes(t.id) && !(revealed && !done))
          .map((t) => (
            <span key={t.id} data-tile={t.id} className="inline-block">
              <DragItem
                label={t.text}
                onTap={() => attempt(t.id, t.text)}
                onDrop={(x, y) => {
                  const zone = hit(x, y);
                  return zone !== null && attempt(t.id, t.text, Number(zone));
                }}
                className={`${tileClass} border-line bg-surface text-ink shadow-[0_0.3rem_0_rgb(0_0_0/0.1)]`}
              >
                {t.text}
              </DragItem>
            </span>
          ))}
      </div>

      <Feedback state={fbState} attempt={fb.n} retryText={scene.retryHint} doneText={`Barakalla! ${scene.word}`} />
    </div>
  );
}
