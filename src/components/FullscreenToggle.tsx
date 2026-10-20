// To'liq ekran tugmasi (F tugmasi ham ishlaydi)
import { useEffect, useState } from 'react';
import { isFullscreen, toggleFullscreen } from '../lib/fullscreen';
import { Icon } from './Icon';

export function useIsFullscreen(): boolean {
  const [fs, setFs] = useState(() => (typeof document !== 'undefined' ? isFullscreen() : false));
  useEffect(() => {
    const on = () => setFs(isFullscreen());
    document.addEventListener('fullscreenchange', on);
    document.addEventListener('webkitfullscreenchange', on);
    return () => {
      document.removeEventListener('fullscreenchange', on);
      document.removeEventListener('webkitfullscreenchange', on);
    };
  }, []);
  return fs;
}

export function FullscreenToggle({ className = '' }: { className?: string }) {
  const fs = useIsFullscreen();
  return (
    <button
      type="button"
      onClick={() => void toggleFullscreen()}
      className={className}
      aria-label={fs ? 'To‘liq ekrandan chiqish (F)' : 'To‘liq ekran (F)'}
      title={fs ? 'To‘liq ekrandan chiqish (F)' : 'To‘liq ekran (F)'}
    >
      <Icon name={fs ? 'fullscreenExit' : 'fullscreen'} />
    </button>
  );
}
