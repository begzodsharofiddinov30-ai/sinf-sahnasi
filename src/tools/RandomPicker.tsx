// Tasodifiy o'quvchi: hamma bir martadan chiqmaguncha takrorlanmaydi
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useSettings } from '../app/SettingsProvider';
import { BigButton } from '../components/BigButton';
import { Icon } from '../components/Icon';
import { Mascot } from '../components/Mascot';
import { announce } from '../lib/a11y';
import { playSfx } from '../lib/audio';
import { motionAllowed } from '../lib/motion';
import { ClassList } from './ClassList';
import { spinDelays } from './logic';
import { useTools } from './ToolsProvider';

export function RandomPicker() {
  const { names, pool, pick, resetPool, lastPicked } = useTools();
  const { settings } = useSettings();
  const [shown, setShown] = useState<string | null>(lastPicked);
  const [spinning, setSpinning] = useState(false);
  const [editing, setEditing] = useState(false);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  if (names.length === 0 || editing)
    return (
      <div className="flex flex-col gap-[1rem]">
        {names.length === 0 && <p className="text-body font-bold">Avval sinf ro‘yxatini kiriting.</p>}
        <ClassList onSaved={() => setEditing(false)} />
      </div>
    );

  const spin = () => {
    if (spinning) return;
    const result = pick();
    if (!result) return;
    const quick = settings.calmMode || settings.lightMode || !motionAllowed();
    const frames = quick ? 0 : 16;
    const delays = spinDelays(1800, frames);
    setSpinning(true);
    let t = 0;
    delays.forEach((d, i) => {
      t += d;
      timers.current.push(
        window.setTimeout(() => {
          setShown(names[(i * 7 + names.length) % names.length]);
          playSfx('tick');
        }, t),
      );
    });
    timers.current.push(
      window.setTimeout(() => {
        setShown(result);
        setSpinning(false);
        playSfx('correct');
        announce(result);
      }, t + (quick ? 250 : 120)),
    );
  };

  return (
    <div className="flex flex-col items-center gap-[1.5rem] text-center">
      <div className="relative flex w-full items-center justify-center gap-[1.5rem] overflow-hidden rounded-xl3 bg-primary-soft px-[2rem] py-[2rem]">
        <span className="block h-[9rem] shrink-0">
          <Mascot mood={spinning ? 'think' : shown ? 'cheer' : 'happy'} className="h-full w-auto" />
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.p
            key={`${shown}-${spinning}`}
            initial={{ y: spinning ? -30 : 0, opacity: 0, scale: spinning ? 1 : 0.7 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ duration: spinning ? 0.08 : 0.35 }}
            className={`min-w-0 break-words text-[4.5rem] font-black leading-tight ${spinning ? 'text-ink-soft' : 'text-primary'}`}
            data-testid="picked-name"
          >
            {shown ?? '?'}
          </motion.p>
        </AnimatePresence>
      </div>
      <BigButton size="xl" onClick={spin} disabled={spinning}>
        Tasodifiy o‘quvchi
      </BigButton>
      <p className="text-meta font-bold text-ink-soft">
        Hali chiqmaganlar: {pool.length} / {names.length}
      </p>
      <div className="flex flex-wrap justify-center gap-[1rem]">
        <BigButton size="md" variant="secondary" onClick={resetPool}>
          <Icon name="retry" /> Yangi aylanish
        </BigButton>
        <BigButton size="md" variant="ghost" onClick={() => setEditing(true)}>
          Ro‘yxatni tahrirlash
        </BigButton>
      </div>
    </div>
  );
}
