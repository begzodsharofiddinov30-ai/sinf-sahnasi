// O'nlik ramka: kataklarni bosib to'ldiramiz
import { useEffect, useRef, useState } from 'react';
import { BigButton } from '../../components/BigButton';
import { Feedback } from '../../components/Feedback';
import { Icon } from '../../components/Icon';
import { RichText } from '../../components/RichText';
import { TenFrameGrid } from '../../components/TenFrameGrid';
import type { TenFrameScene as FrameData } from '../../content/schema';
import { announce } from '../../lib/a11y';
import { playSfx } from '../../lib/audio';
import { countFilled, fillTo, toggleCell } from '../exercises';
import type { SceneProps } from '../sceneProps';

export function TenFrameScene({ scene, revealed }: SceneProps<FrameData>) {
  const size = (scene.frames ?? 1) * 10;
  const [cells, setCells] = useState(() => fillTo(size, scene.prefilled ?? 0));
  const shown = revealed && scene.target !== undefined ? fillTo(size, scene.target) : cells;
  const count = countFilled(shown);
  const first = countFilled(shown.slice(0, 10));
  const solved = scene.target !== undefined && countFilled(cells) === scene.target;
  const celebrated = useRef(false);

  useEffect(() => {
    if (solved && !celebrated.current) {
      celebrated.current = true;
      playSfx('correct');
      announce('Barakalla!');
    }
    if (!solved) celebrated.current = false;
  }, [solved]);

  const toggle = (i: number) => {
    if (revealed) return;
    const next = toggleCell(cells, i);
    setCells(next);
    playSfx('pop', countFilled(next));
  };

  return (
    <div className="flex h-full flex-col items-center gap-[2vh] px-[3vw] py-[2vh]">
      <h2 className="text-center text-title font-black text-ink">
        <RichText text={scene.prompt} />
      </h2>
      <div className="flex flex-1 items-center gap-[4vw]">
        <TenFrameGrid cells={shown} onToggle={toggle} cellClass={size === 20 ? 'h-[10vh] w-[10vh]' : 'h-[13vh] w-[13vh]'} />
        <div className="flex flex-col items-center">
          <span className="text-[14vh] font-black leading-none text-primary" data-testid="frame-count">
            {count}
          </span>
          {size === 20 && count > 10 && first === 10 && (
            <span className="text-lead font-black text-ink">
              10 + {count - 10} = {count}
            </span>
          )}
          {scene.target !== undefined && <span className="text-body font-bold text-ink-soft">Kerak: {scene.target}</span>}
        </div>
      </div>
      <BigButton size="md" variant="ghost" onClick={() => setCells(fillTo(size, scene.prefilled ?? 0))}>
        <Icon name="retry" /> Qaytadan
      </BigButton>
      <Feedback state={solved ? 'done' : revealed && scene.target !== undefined ? 'revealed' : 'idle'} />
    </div>
  );
}
