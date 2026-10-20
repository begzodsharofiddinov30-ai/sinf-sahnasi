// Sahnaga biriktirilgan oldindan yozilgan audio
import { useEffect, useRef, useState } from 'react';
import { Icon } from '../components/Icon';

export function AudioButton({ src, className = '' }: { src: string; className?: string }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const a = new Audio(src);
    ref.current = a;
    const end = () => setPlaying(false);
    const err = () => {
      setFailed(true);
      setPlaying(false);
    };
    a.addEventListener('ended', end);
    a.addEventListener('error', err);
    return () => {
      a.pause();
      a.removeEventListener('ended', end);
      a.removeEventListener('error', err);
      ref.current = null;
    };
  }, [src]);

  const toggle = () => {
    const a = ref.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      a.currentTime = 0;
      a.play().then(
        () => setPlaying(true),
        () => setFailed(true),
      );
    }
  };

  if (failed) return null;
  return (
    <button type="button" onClick={toggle} className={className} aria-label={playing ? 'Audioni to‘xtatish' : 'Tinglash'} title={playing ? 'To‘xtatish' : 'Tinglash'}>
      <Icon name={playing ? 'pause' : 'volume'} />
    </button>
  );
}
