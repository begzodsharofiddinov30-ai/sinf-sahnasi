// Sanash: har bir narsani bosganda raqam chiqadi
import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { BigButton } from '../../components/BigButton';
import { Icon } from '../../components/Icon';
import { Mascot } from '../../components/Mascot';
import { PICTURE_LABELS, Picture } from '../../components/Picture';
import { RichText, plainText } from '../../components/RichText';
import type { CountAndTapScene as CountData } from '../../content/schema';
import { announce } from '../../lib/a11y';
import { playSfx } from '../../lib/audio';
import { completeOrder, hashSeed, rowLayout, scatterLayout, tapItem } from '../exercises';
import type { SceneProps } from '../sceneProps';

export function CountAndTapScene({ scene, revealed }: SceneProps<CountData>) {
  const [order, setOrder] = useState<number[]>([]);
  const layout = useMemo(
    () => (scene.layout === 'row' ? rowLayout(scene.count) : scatterLayout(scene.count, hashSeed(scene.id))),
    [scene.count, scene.id, scene.layout],
  );
  const shown = revealed ? completeOrder(order, scene.count) : order;
  const done = shown.length === scene.count;
  const label = PICTURE_LABELS[scene.item];

  // Kataklarga sig'adigan o'lcham (kamida 64px @1080p ≈ 6vh)
  const size =
    scene.layout === 'row'
      ? `min(18vh, ${Math.floor(70 / (layout.cols + 1))}vw)`
      : `max(6.5vh, min(${Math.floor(46 / layout.rows)}vh, ${Math.floor(56 / layout.cols)}vw))`;

  const tap = (i: number) => {
    if (revealed) return;
    const next = tapItem(order, i, scene.count);
    if (next === order) return;
    setOrder(next);
    playSfx('pop', next.length);
    if (next.length === scene.count) {
      window.setTimeout(() => playSfx('correct'), 180);
      announce(`Barakalla! Jami ${scene.count} ta ${label}.`);
    } else announce(String(next.length));
  };

  return (
    <div className="flex h-full flex-col px-[3vw] py-[2vh]">
      <h2 className="text-center text-lead font-black text-ink">
        <RichText text={scene.prompt} />
      </h2>
      <div className="flex min-h-0 flex-1 items-stretch gap-[2vw]">
        <div className="relative min-h-0 flex-1" role="group" aria-label={plainText(scene.prompt)}>
          {layout.positions.map((p, i) => {
            const n = shown.indexOf(i);
            const counted = n >= 0;
            return (
              <motion.button
                key={i}
                type="button"
                onClick={() => tap(i)}
                aria-label={counted ? `${n + 1}-${label}` : `${label}, sanalmagan`}
                aria-pressed={counted}
                className="absolute grid place-items-center rounded-full p-[0.4vh]"
                style={{ left: `${p.x}%`, top: `${p.y}%`, width: size, height: size, x: '-50%', y: '-50%', rotate: p.rot }}
                animate={counted ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
                whileTap={{ scale: 0.92 }}
              >
                <Picture name={scene.item} className={`h-full w-full ${counted ? '' : 'drop-shadow-sm'}`} title="" />
                {counted && (
                  <span
                    aria-hidden="true"
                    className="absolute -right-[0.4em] -top-[0.4em] grid h-[1.7em] w-[1.7em] place-items-center rounded-full border-[0.12em] border-surface bg-primary text-body font-black text-on-primary"
                  >
                    {n + 1}
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
        <aside className="flex w-[18vw] min-w-[10rem] flex-col items-center justify-center gap-[2vh]">
          <p className="text-meta font-bold text-ink-soft">Sanadik</p>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={shown.length}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-[14vh] font-black leading-none text-primary"
              data-testid="count-total"
            >
              {shown.length}
            </motion.p>
          </AnimatePresence>
          {done ? (
            <div className="flex flex-col items-center gap-[1vh] text-center">
              <span className="block h-[16vh]">
                <Mascot mood="cheer" className="h-full w-auto" />
              </span>
              <p className="text-body font-black text-success">
                <Icon name="check" className="mr-2 inline h-[1em] w-[1em]" />
                Jami: {scene.count} ta!
              </p>
            </div>
          ) : (
            order.length > 0 &&
            !revealed && (
              <BigButton variant="ghost" size="md" onClick={() => setOrder([])}>
                <Icon name="retry" /> Qaytadan
              </BigButton>
            )
          )}
        </aside>
      </div>
    </div>
  );
}
