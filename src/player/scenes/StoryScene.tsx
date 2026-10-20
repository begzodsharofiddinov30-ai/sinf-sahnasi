// Hikoya: har bosishda keyingi sahifa; muhim so'zlar ajratilgan
import { AnimatePresence, motion } from 'framer-motion';
import { RichText } from '../../components/RichText';
import { Visual } from '../../components/Visual';
import type { StoryScene as StoryData } from '../../content/schema';
import { AudioButton } from '../AudioButton';
import type { SceneProps } from '../sceneProps';

export function StoryScene({ scene, step, onNext }: SceneProps<StoryData>) {
  const i = Math.min(step, scene.pages.length - 1);
  const page = scene.pages[i];
  return (
    <div className="flex h-full cursor-pointer flex-col items-center gap-[2vh] px-[5vw] py-[2vh]" onClick={onNext}>
      {scene.title && <h2 className="text-center text-title font-black text-ink">{scene.title}</h2>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className="flex min-h-0 w-full flex-1 items-center justify-center gap-[4vw]"
        >
          {page.visual && (
            <div className="flex shrink-0 items-center justify-center">
              <Visual visual={page.visual} size="md" />
            </div>
          )}
          <p className="max-w-[60vw] text-[5vh] font-extrabold leading-snug text-ink">
            <RichText text={page.text} />
          </p>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center gap-[2vw]" onClick={(e) => e.stopPropagation()}>
        {page.audio && (
          <AudioButton
            key={page.audio}
            src={page.audio}
            className="grid min-h-tap min-w-tap place-items-center rounded-full bg-primary text-[2rem] text-on-primary"
          />
        )}
        {scene.pages.length > 1 && (
          <p className="text-meta font-bold text-ink-soft">
            {i + 1} / {scene.pages.length}
          </p>
        )}
      </div>
    </div>
  );
}
