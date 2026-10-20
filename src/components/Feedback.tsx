// Bolalarga fikr-mulohaza: xatoda o'ylovchi maskot, to'g'rida maqtov
import { AnimatePresence, motion } from 'framer-motion';
import { Mascot } from './Mascot';

export type FeedbackState = 'idle' | 'retry' | 'done' | 'revealed';

export const DEFAULT_RETRY = 'Yana bir bor o‘ylab ko‘ring!';

export function Feedback({
  state,
  retryText,
  doneText = 'To‘g‘ri! Barakalla!',
  detail,
  attempt = 0,
  idleText,
}: {
  state: FeedbackState;
  retryText?: string;
  doneText?: string;
  detail?: string;
  /** Har yangi xato urinishda matn qayta paydo bo'lishi uchun */
  attempt?: number;
  idleText?: string;
}) {
  return (
    <div className="flex min-h-[13vh] items-center justify-center gap-[2vw]" aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        {state === 'done' || state === 'revealed' ? (
          <motion.div key="ok" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-[2vw]">
            <span className="block h-[13vh]">
              <Mascot mood="cheer" className="h-full w-auto" />
            </span>
            <p className="text-lead font-black text-success">
              {state === 'done' ? doneText : 'To‘g‘ri javob'}
              {detail && <span className="block text-body font-bold text-ink">{detail}</span>}
            </p>
          </motion.div>
        ) : state === 'retry' ? (
          <motion.div key={`try-${attempt}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-[2vw]">
            <span className="block h-[13vh]">
              <Mascot mood="think" className="h-full w-auto" />
            </span>
            <p className="text-body font-extrabold text-ink">{retryText ?? DEFAULT_RETRY}</p>
          </motion.div>
        ) : idleText ? (
          <motion.p key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-body font-bold text-ink-soft">
            {idleText}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
