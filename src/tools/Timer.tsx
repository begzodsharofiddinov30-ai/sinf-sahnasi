// Taymer: katta halqa, yumshoq ovoz; panel yopilsa ham ishlayveradi
import { BigButton } from '../components/BigButton';
import { Icon } from '../components/Icon';
import { formatMs } from './logic';
import { useTimerLeft, useTools } from './ToolsProvider';

const PRESETS = [1, 2, 3, 5, 10];
const R = 88;
const C = 2 * Math.PI * R;

export function Timer() {
  const { timer, startTimer, pauseTimer, resetTimer } = useTools();
  const left = useTimerLeft();
  const running = timer.endAt !== null;
  const frac = timer.total > 0 ? left / timer.total : 0;
  const low = running && frac < 0.2;

  return (
    <div className="flex flex-col items-center gap-[1.5rem]">
      <div className="relative h-[18rem] w-[18rem]">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="100" cy="100" r={R} fill="none" stroke="rgb(var(--surface-2))" strokeWidth="16" />
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke={low || timer.finished ? 'rgb(var(--accent))' : 'rgb(var(--primary))'}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={C * (1 - frac)}
            style={{ transition: running ? 'stroke-dashoffset 0.25s linear' : 'none' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[4.5rem] font-black tabular-nums leading-none" role="timer" aria-live="off" data-testid="timer-left">
            {timer.finished ? '0:00' : formatMs(left)}
          </p>
          <p className="text-meta font-extrabold text-ink-soft" aria-live="polite">
            {timer.finished ? 'Vaqt tugadi!' : low ? 'Oz qoldi' : running ? 'Ketdi…' : 'Tayyor'}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-[0.8rem]" role="group" aria-label="Tayyor vaqtlar">
        {PRESETS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => resetTimer(m * 60_000)}
            aria-pressed={!running && timer.total === m * 60_000}
            className="min-h-tap min-w-tap rounded-xl2 border-[0.15rem] border-line bg-surface px-5 text-body font-black aria-pressed:border-primary aria-pressed:bg-primary-soft"
          >
            {m} daq
          </button>
        ))}
      </div>
      <div className="flex gap-[1rem]">
        {running ? (
          <BigButton size="lg" variant="secondary" onClick={pauseTimer}>
            <Icon name="pause" /> To‘xtatish
          </BigButton>
        ) : (
          <BigButton size="lg" onClick={() => startTimer()}>
            <Icon name="play" /> {timer.finished ? 'Qaytadan' : 'Boshlash'}
          </BigButton>
        )}
        <BigButton size="lg" variant="ghost" onClick={() => resetTimer()}>
          <Icon name="retry" /> Tiklash
        </BigButton>
      </div>
    </div>
  );
}
