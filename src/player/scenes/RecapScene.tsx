// Yakun: asosiy fikrlar birma-bir ochiladi, oxirida maskot maqtaydi
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { Icon } from '../../components/Icon';
import { Mascot } from '../../components/Mascot';
import { RichText } from '../../components/RichText';
import type { RecapScene as RecapData } from '../../content/schema';
import { playSfx } from '../../lib/audio';
import type { SceneProps } from '../sceneProps';

export function RecapScene({ scene, step, revealed, onNext }: SceneProps<RecapData>) {
  const last = scene.points.length - 1;
  const upTo = revealed ? last : Math.min(step, last);
  const finished = upTo === last;

  useEffect(() => {
    if (finished) playSfx('chime');
  }, [finished]);

  return (
    <div className="flex h-full cursor-pointer items-center gap-[4vw] px-[5vw] py-[2vh]" onClick={onNext}>
      <div className="flex flex-1 flex-col gap-[3vh]">
        <h2 className="text-title font-black text-ink">{scene.title}</h2>
        <ul className="flex flex-col gap-[2vh]">
          <AnimatePresence initial={false}>
            {scene.points.slice(0, upTo + 1).map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35 }}
                className="flex items-start gap-[1.5vw] text-lead font-extrabold text-ink"
              >
                <span className="mt-[0.3vh] grid h-[3.2rem] w-[3.2rem] shrink-0 place-items-center rounded-full bg-success text-on-primary">
                  <Icon name="check" className="h-[2rem] w-[2rem]" />
                </span>
                <span>
                  <RichText text={p} />
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <div className="flex w-[34vw] flex-col items-center gap-[2vh] text-center">
        <span className="block h-[38vh]">
          <Mascot mood={finished ? 'cheer' : 'happy'} className="h-full w-auto" />
        </span>
        <AnimatePresence>
          {finished && (
            <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-lead font-black text-success">
              {scene.praise ?? 'Barakalla! Siz ajoyib ishladingiz!'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
