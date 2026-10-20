// Javob tanlash: xato bo'lsa yumshoq tebranish va ishora, hech qachon "yutqazding" emas
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Icon } from '../../components/Icon';
import { DEFAULT_RETRY, Feedback } from '../../components/Feedback';
import { RichText, plainText } from '../../components/RichText';
import { Visual } from '../../components/Visual';
import type { ChoiceOption, ChooseAnswerScene as ChooseData } from '../../content/schema';
import { announce, isTypingTarget } from '../../lib/a11y';
import { playSfx } from '../../lib/audio';
import { evaluateChoice } from '../exercises';
import type { SceneProps } from '../sceneProps';

type OptState = 'idle' | 'correct' | 'tried' | 'dim';

function OptionButton({
  option,
  index,
  state,
  shakeSignal,
  onChoose,
}: {
  option: ChoiceOption;
  index: number;
  state: OptState;
  shakeSignal: number;
  onChoose: (i: number) => void;
}) {
  const controls = useAnimationControls();
  useEffect(() => {
    if (shakeSignal > 0) void controls.start({ x: [0, -16, 16, -10, 10, 0], transition: { duration: 0.45 } });
  }, [shakeSignal, controls]);
  useEffect(() => {
    if (state === 'correct') void controls.start({ scale: [1, 1.08, 1], transition: { duration: 0.4 } });
  }, [state, controls]);

  const tone =
    state === 'correct'
      ? 'border-success bg-success-soft text-ink'
      : state === 'tried'
        ? 'border-dashed border-ink-soft/50 bg-surface-2 text-ink-soft'
        : state === 'dim'
          ? 'border-line bg-surface text-ink-soft opacity-60'
          : 'border-line bg-surface text-ink hover:border-primary';

  return (
    <motion.button
      type="button"
      animate={controls}
      onClick={() => onChoose(index)}
      className={`relative flex ${option.visual && option.visual.kind !== 'number' ? 'min-h-[30vh]' : 'min-h-[16vh]'} flex-col items-center justify-center gap-[1vh] rounded-xl3 border-[0.3rem] px-[2vw] py-[2vh] font-black ${tone}`}
      aria-label={`${index + 1}-variant: ${option.label}${state === 'correct' ? ', to‘g‘ri' : state === 'tried' ? ', tanlangan, yana urinib ko‘ring' : ''}`}
    >
      <span aria-hidden="true" className="absolute left-[0.8rem] top-[0.6rem] text-meta font-extrabold text-ink-soft">
        {index + 1}
      </span>
      {state === 'correct' && (
        <span aria-hidden="true" className="absolute right-[0.8rem] top-[0.6rem] grid h-[3rem] w-[3rem] place-items-center rounded-full bg-success text-on-primary">
          <Icon name="check" className="h-[2rem] w-[2rem]" />
        </span>
      )}
      {state === 'tried' && (
        <span aria-hidden="true" className="absolute right-[0.8rem] top-[0.6rem] text-ink-soft">
          <Icon name="retry" className="h-[2.2rem] w-[2.2rem]" />
        </span>
      )}
      {option.visual ? (
        <>
          <Visual visual={option.visual} size={option.visual.kind === 'number' ? 'sm' : 'md'} />
          {option.visual.kind !== 'number' && <span className="text-body">{option.label}</span>}
        </>
      ) : (
        <span className={option.label.length <= 4 ? 'text-[9vh] leading-none' : 'text-lead'}>{option.label}</span>
      )}
    </motion.button>
  );
}

export function ChooseAnswerScene({ scene, revealed }: SceneProps<ChooseData>) {
  const [tried, setTried] = useState<number[]>([]);
  const [solved, setSolved] = useState(false);
  const [shake, setShake] = useState<{ index: number; n: number }>({ index: -1, n: 0 });
  const showCorrect = solved || revealed;

  const choose = (i: number) => {
    if (showCorrect || i < 0 || i >= scene.options.length) return;
    if (evaluateChoice(scene, i) === 'correct') {
      setSolved(true);
      playSfx('correct');
      announce('To‘g‘ri! Barakalla!');
    } else {
      setTried((t) => (t.includes(i) ? t : [...t, i]));
      setShake((s) => ({ index: i, n: s.n + 1 }));
      playSfx('retry');
      announce(scene.retryHint ?? DEFAULT_RETRY);
    }
  };

  // 1–4 raqam tugmalari bilan tanlash (o'qituvchi uchun)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTypingTarget(e.target) || e.ctrlKey || e.metaKey || e.altKey) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= scene.options.length) choose(n - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const cols = scene.options.length === 4 && scene.options.some((o) => o.visual) ? 'grid-cols-2' : scene.options.length === 2 ? 'grid-cols-2' : scene.options.length === 3 ? 'grid-cols-3' : 'grid-cols-4';

  return (
    <div className="flex h-full flex-col items-center gap-[2vh] px-[4vw] py-[2vh]">
      <h2 className="text-center text-title font-black text-ink">
        <RichText text={scene.question} />
      </h2>
      {scene.visual && (
        <div className="flex min-h-0 items-center justify-center">
          <Visual visual={scene.visual} size="md" />
        </div>
      )}
      <div className={`grid w-full max-w-[90vw] gap-[2vw] ${cols}`} role="group" aria-label={plainText(scene.question)}>
        {scene.options.map((o, i) => (
          <OptionButton
            key={i}
            option={o}
            index={i}
            onChoose={choose}
            shakeSignal={shake.index === i ? shake.n : 0}
            state={showCorrect ? (i === scene.correct ? 'correct' : 'dim') : tried.includes(i) ? 'tried' : 'idle'}
          />
        ))}
      </div>
      <Feedback
        state={solved ? 'done' : revealed ? 'revealed' : tried.length > 0 ? 'retry' : 'idle'}
        attempt={tried.length + shake.n}
        retryText={scene.retryHint}
        detail={showCorrect ? scene.explanation : undefined}
      />
    </div>
  );
}
