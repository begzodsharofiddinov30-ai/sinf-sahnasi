// Jamoalar hisobi: katta +/− tugmalar, har 5 ochkoda bayram
import { useState } from 'react';
import { BigButton } from '../components/BigButton';
import { Celebration } from '../components/Celebration';
import { announce } from '../lib/a11y';
import { playSfx } from '../lib/audio';
import { crossedMilestone } from './logic';
import { useTools } from './ToolsProvider';

const TONES = ['bg-[#DCE9F7]', 'bg-[#FDE3CC]', 'bg-[#DDF0D5]'];

export function Scoreboard() {
  const { teams, addScore, renameTeam, setTeamCount, resetScores } = useTools();
  const [party, setParty] = useState<{ team: number; n: number } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const change = (i: number, delta: number) => {
    const prev = teams[i].score;
    const next = Math.max(0, prev + delta);
    addScore(i, delta);
    if (crossedMilestone(prev, next)) {
      setParty((p) => ({ team: i, n: (p?.n ?? 0) + 1 }));
      playSfx('correct');
      announce(`${teams[i].name}: ${next} ochko! Barakalla!`);
    } else playSfx(delta > 0 ? 'pop' : 'tick', 6);
  };

  return (
    <div className="flex flex-col gap-[1.5rem]">
      <div className="flex flex-wrap items-center gap-[1rem]">
        <span className="text-meta font-bold text-ink-soft">Jamoalar:</span>
        {([2, 3] as const).map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={teams.length === n}
            onClick={() => setTeamCount(n)}
            className="min-h-tap min-w-tap rounded-xl2 border-[0.15rem] border-line bg-surface px-5 text-body font-black aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-on-primary"
          >
            {n}
          </button>
        ))}
      </div>
      <div className={`grid gap-[1.5rem] ${teams.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
        {teams.map((t, i) => (
          <section key={i} className={`relative flex flex-col items-center gap-[1rem] overflow-hidden rounded-xl3 p-[1.5rem] ${TONES[i]}`} aria-label={`${t.name} jamoasi`}>
            <input
              value={t.name}
              onChange={(e) => renameTeam(i, e.target.value)}
              aria-label={`${i + 1}-jamoa nomi`}
              className="w-full rounded-xl bg-transparent text-center text-lead font-black outline-none focus:bg-surface/70"
            />
            <p className="text-[7rem] font-black leading-none tabular-nums text-ink" aria-live="polite" data-testid={`score-${i}`}>
              {t.score}
            </p>
            <div className="flex gap-[1rem]">
              <button
                type="button"
                onClick={() => change(i, -1)}
                aria-label={`${t.name}: bir ochko ayirish`}
                className="grid h-[5rem] w-[5rem] place-items-center rounded-full bg-surface text-[3rem] font-black text-ink ring-[0.15rem] ring-line"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => change(i, 1)}
                aria-label={`${t.name}: bir ochko qo‘shish`}
                className="grid h-[5rem] w-[7rem] place-items-center rounded-full bg-primary text-[3rem] font-black text-on-primary shadow-[0_0.3rem_0_rgb(0_0_0/0.18)]"
              >
                +
              </button>
            </div>
            {party?.team === i && <Celebration key={party.n} show />}
          </section>
        ))}
      </div>
      <div className="flex items-center gap-[1rem]">
        {confirmReset ? (
          <>
            <span className="text-meta font-bold">Hisob nolga tushsinmi?</span>
            <BigButton
              size="md"
              variant="accent"
              onClick={() => {
                resetScores();
                setConfirmReset(false);
              }}
            >
              Ha, nolga
            </BigButton>
            <BigButton size="md" variant="ghost" onClick={() => setConfirmReset(false)}>
              Yo‘q
            </BigButton>
          </>
        ) : (
          <BigButton size="md" variant="ghost" onClick={() => setConfirmReset(true)}>
            Hisobni nolga tushirish
          </BigButton>
        )}
      </div>
    </div>
  );
}
