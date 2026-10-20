// Son o'qi: "Sakrash" tugmasi bilan belgini yurgizamiz, javobni o'qdan topamiz
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BigButton } from '../../components/BigButton';
import { Feedback, type FeedbackState } from '../../components/Feedback';
import { Icon } from '../../components/Icon';
import { Mascot } from '../../components/Mascot';
import { RichText } from '../../components/RichText';
import type { NumberLineScene as LineData } from '../../content/schema';
import { announce } from '../../lib/a11y';
import { playSfx } from '../../lib/audio';
import { shake } from '../../lib/motion';
import { jump, tickPercent } from '../exercises';
import type { SceneProps } from '../sceneProps';

export function NumberLineScene({ scene, revealed }: SceneProps<LineData>) {
  const start = scene.start ?? scene.min;
  const step = scene.step ?? 1;
  const [pos, setPos] = useState(start);
  const [arcs, setArcs] = useState<{ from: number; to: number }[]>([]);
  const [fb, setFb] = useState<{ state: FeedbackState; n: number }>({ state: 'idle', n: 0 });
  const [solved, setSolved] = useState(false);

  const ticks = Array.from({ length: scene.max - scene.min + 1 }, (_, i) => scene.min + i);
  const shownPos = revealed && scene.answer !== undefined ? scene.answer : pos;
  const pct = (n: number) => tickPercent(n, scene.min, scene.max);
  const fbState: FeedbackState = solved ? 'done' : revealed && scene.answer !== undefined ? 'revealed' : fb.state;

  const doJump = () => {
    const to = jump(pos, step, scene.min, scene.max);
    if (to === pos) return;
    setArcs((a) => [...a, { from: pos, to }]);
    setPos(to);
    playSfx('boing');
    announce(String(to));
  };

  const reset = () => {
    setPos(start);
    setArcs([]);
    setSolved(false);
    setFb({ state: 'idle', n: 0 });
  };

  const tapTick = (n: number, el: HTMLElement) => {
    if (scene.answer === undefined) {
      setPos(n);
      setArcs([]);
      playSfx('pop', 3);
      return;
    }
    if (solved) return;
    if (n === scene.answer) {
      setSolved(true);
      setPos(n);
      playSfx('correct');
      announce('To‘g‘ri! Barakalla!');
    } else {
      shake(el);
      playSfx('retry');
      setFb((f) => ({ state: 'retry', n: f.n + 1 }));
    }
  };

  return (
    <div className="flex h-full flex-col items-center gap-[2vh] px-[3vw] py-[2vh]">
      <h2 className="text-center text-title font-black text-ink">
        <RichText text={scene.prompt} />
      </h2>

      <div className="relative mx-auto mt-[4vh] h-[34vh] w-[calc(100%-6rem)]">
        {/* sakrash yoylari */}
        <svg className="pointer-events-none absolute inset-x-0 top-0 h-[20vh] w-full" viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
          {arcs.map((a, i) => {
            const x1 = pct(a.from);
            const x2 = pct(a.to);
            return (
              <path key={i} d={`M${x1} 19 Q${(x1 + x2) / 2} ${2} ${x2} 19`} fill="none" stroke="rgb(var(--accent))" strokeWidth="4" vectorEffect="non-scaling-stroke" strokeLinecap="round" />
            );
          })}
        </svg>
        {arcs.map((a, i) => (
          <span
            key={i}
            className="absolute top-[2vh] -translate-x-1/2 rounded-full bg-accent-soft px-[0.6vw] text-meta font-black text-ink"
            style={{ left: `${(pct(a.from) + pct(a.to)) / 2}%` }}
            aria-hidden="true"
          >
            {a.to > a.from ? `+${a.to - a.from}` : `−${a.from - a.to}`}
          </span>
        ))}

        {/* belgi */}
        <motion.span
          className="absolute top-[6vh] block h-[12vh] -translate-x-1/2"
          animate={{ left: `${pct(shownPos)}%` }}
          initial={false}
          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
          aria-hidden="true"
        >
          <Mascot mood={solved ? 'cheer' : 'neutral'} className="h-full w-auto" />
        </motion.span>

        {/* o'q */}
        <div className="absolute inset-x-0 top-[20vh] h-[0.5vh] rounded-full bg-ink" />
        {ticks.map((n) => (
          <button
            key={n}
            type="button"
            onClick={(e) => tapTick(n, e.currentTarget)}
            className={`absolute top-[18.5vh] flex min-h-[10vh] min-w-[4rem] -translate-x-1/2 flex-col items-center rounded-xl px-[0.3vw] ${
              n === shownPos ? 'text-primary' : 'text-ink'
            }`}
            style={{ left: `${pct(n)}%` }}
            aria-label={`${n}${n === shownPos ? ', belgi shu yerda' : ''}`}
          >
            <span className="block h-[3.5vh] w-[0.5vh] rounded-full bg-ink" />
            <span className={`mt-[0.6vh] font-black leading-none ${ticks.length > 16 ? 'text-[3.6vh]' : 'text-[5vh]'} ${n === shownPos ? 'underline decoration-[0.4vh] underline-offset-[0.6vh]' : ''}`}>{n}</span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-[2vw]">
        <BigButton size="lg" onClick={doJump} disabled={jump(pos, step, scene.min, scene.max) === pos || revealed}>
          Sakrash ({step > 0 ? `+${step}` : `−${-step}`})
        </BigButton>
        <BigButton size="lg" variant="ghost" onClick={reset}>
          <Icon name="retry" /> Qaytadan
        </BigButton>
      </div>

      <Feedback
        state={fbState}
        attempt={fb.n}
        retryText={scene.retryHint}
        idleText={scene.answer !== undefined ? 'Javobni o‘qdan toping va bosing' : undefined}
      />
    </div>
  );
}
