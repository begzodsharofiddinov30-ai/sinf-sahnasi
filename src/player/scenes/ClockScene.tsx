// Soat: millarni sudrab yoki tugmalar bilan vaqtni qo'yamiz
import { useEffect, useRef, useState } from 'react';
import { ClockFace } from '../../components/ClockFace';
import { Feedback } from '../../components/Feedback';
import { RichText } from '../../components/RichText';
import type { ClockScene as ClockData } from '../../content/schema';
import { announce } from '../../lib/a11y';
import { playSfx } from '../../lib/audio';
import { addMinutes, angleToHour, angleToMinute, formatClock, sameTime, type Time12 } from '../exercises';
import type { SceneProps } from '../sceneProps';

const ctrl =
  'grid min-h-[4.5rem] min-w-[4.5rem] place-items-center rounded-xl2 bg-surface px-[1rem] text-lead font-black text-ink ring-[0.15rem] ring-line hover:ring-primary disabled:opacity-40';

export function ClockScene({ scene, revealed }: SceneProps<ClockData>) {
  const [time, setTime] = useState<Time12>(scene.start ?? { h: 12, m: 0 });
  const [digital, setDigital] = useState(Boolean(scene.showDigital));
  const shown = revealed && scene.target ? scene.target : time;
  const solved = Boolean(scene.target && sameTime(time, scene.target));
  const celebrated = useRef(false);

  useEffect(() => {
    if (solved && !celebrated.current) {
      celebrated.current = true;
      playSfx('correct');
      announce(`To‘g‘ri! Soat ${formatClock(time)}`);
    }
    if (!solved) celebrated.current = false;
  }, [solved, time]);

  const change = (t: Time12) => {
    if (revealed) return;
    setTime(t);
    playSfx('tick');
  };

  return (
    <div className="flex h-full flex-col items-center gap-[1.5vh] px-[3vw] py-[2vh]">
      <h2 className="text-center text-title font-black text-ink">
        <RichText text={scene.prompt} />
      </h2>
      <div className="flex min-h-0 flex-1 items-center gap-[4vw]">
        <ClockFace
          time={shown}
          className="h-[48vh] w-[48vh]"
          onDragHand={(hand, angle) =>
            change(hand === 'minute' ? { h: time.h, m: angleToMinute(angle) } : { h: angleToHour(angle - time.m * 0.5 + 15), m: time.m })
          }
        />
        <div className="flex flex-col items-center gap-[1.5vh]">
          <div className="flex items-center gap-[1vw]">
            <span className="w-[7rem] text-body font-bold text-ink-soft">Soat</span>
            <button type="button" className={ctrl} onClick={() => change(addMinutes(time, -60))} aria-label="Soat mili orqaga">
              −
            </button>
            <button type="button" className={ctrl} onClick={() => change(addMinutes(time, 60))} aria-label="Soat mili oldinga">
              +
            </button>
          </div>
          <div className="flex items-center gap-[1vw]">
            <span className="w-[7rem] text-body font-bold text-ink-soft">Daqiqa</span>
            <button type="button" className={ctrl} onClick={() => change(addMinutes(time, -5))} aria-label="Daqiqa mili 5 daqiqa orqaga">
              −5
            </button>
            <button type="button" className={ctrl} onClick={() => change(addMinutes(time, 5))} aria-label="Daqiqa mili 5 daqiqa oldinga">
              +5
            </button>
          </div>
          <button type="button" onClick={() => setDigital((d) => !d)} aria-pressed={digital} className={`${ctrl} mt-[1vh] text-body`}>
            {digital ? 'Raqamni yashirish' : 'Raqamda ko‘rsatish'}
          </button>
          <p className={`text-[10vh] font-black tabular-nums leading-none ${digital || revealed ? 'text-primary' : 'invisible'}`} aria-live="polite">
            {formatClock(shown)}
          </p>
        </div>
      </div>
      {scene.target && <Feedback state={solved ? 'done' : revealed ? 'revealed' : 'idle'} detail={solved || revealed ? `Soat ${formatClock(scene.target)}` : undefined} />}
    </div>
  );
}
