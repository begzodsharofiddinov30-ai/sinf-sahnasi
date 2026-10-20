// Tushuntirish: har bosishda rasm bosqichma-bosqich quriladi
import { AnimatePresence, motion } from 'framer-motion';
import { RichText } from '../../components/RichText';
import { Visual, type VisualSize } from '../../components/Visual';
import type { ExplainScene as ExplainData } from '../../content/schema';
import { visibleVisuals } from '../exercises';
import type { SceneProps } from '../sceneProps';

export function ExplainScene({ scene, step, onNext }: SceneProps<ExplainData>) {
  const current = Math.min(step, scene.steps.length - 1);
  const visuals = visibleVisuals(scene.steps, current);
  const size: VisualSize = visuals.length <= 1 ? 'lg' : visuals.length === 2 ? 'md' : 'sm';
  const text = scene.steps[current]?.text ?? '';

  return (
    <div className="flex h-full cursor-pointer flex-col items-center gap-[2vh] px-[4vw] py-[2vh]" onClick={onNext}>
      <h2 className="text-center text-title font-black text-ink">{scene.title}</h2>
      <div className="flex min-h-0 w-full flex-1 flex-wrap items-center justify-center gap-x-[5vw] gap-y-[2vh]">
        <AnimatePresence mode="popLayout" initial={false}>
          {visuals.map(({ key, visual }) => (
            <motion.div
              key={key}
              layout="position"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            >
              <Visual visual={visual} size={size} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={current}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-[80vw] text-center text-lead font-extrabold text-ink"
          aria-live="polite"
        >
          <RichText text={text} />
        </motion.p>
      </AnimatePresence>
      {scene.steps.length > 1 && (
        <p className="text-meta font-bold text-ink-soft" aria-label={`Qadam ${current + 1} / ${scene.steps.length}`}>
          {current + 1} / {scene.steps.length}
        </p>
      )}
    </div>
  );
}
