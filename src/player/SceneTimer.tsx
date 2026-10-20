// Sahna taymeri: bosilganda boshlanadi, oxirida yumshoq ovoz
import { useEffect, useState } from 'react';
import { Icon } from '../components/Icon';
import { playSfx } from '../lib/audio';

export function formatTime(sec: number): string {
  const s = Math.max(0, Math.ceil(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

export function SceneTimer({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState(seconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setLeft((l) => {
        if (l <= 1) {
          window.clearInterval(id);
          setRunning(false);
          playSfx('chime');
          return 0;
        }
        return l - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running]);

  const finished = left === 0;
  const click = () => {
    if (finished) {
      setLeft(seconds);
      setRunning(true);
    } else setRunning((r) => !r);
  };

  return (
    <button
      type="button"
      onClick={click}
      className={`flex min-h-tap items-center gap-2 rounded-full px-5 text-meta font-extrabold tabular-nums ${
        finished ? 'bg-accent text-ink' : running ? 'bg-primary text-on-primary' : 'bg-surface-2 text-ink'
      }`}
      aria-label={finished ? 'Vaqt tugadi. Qayta boshlash' : running ? `Taymer: ${formatTime(left)}. To‘xtatish` : `Taymer: ${formatTime(left)}. Boshlash`}
    >
      <Icon name={running ? 'pause' : 'timer'} />
      {finished ? 'Vaqt tugadi!' : formatTime(left)}
    </button>
  );
}
