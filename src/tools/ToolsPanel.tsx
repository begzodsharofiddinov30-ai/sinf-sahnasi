// Asboblar paneli: tasodifiy o'quvchi, hisob, taymer
import { useId } from 'react';
import { RandomPicker } from './RandomPicker';
import { Scoreboard } from './Scoreboard';
import { Timer } from './Timer';

export type ToolTab = 'picker' | 'score' | 'timer';

const TABS: { id: ToolTab; label: string }[] = [
  { id: 'picker', label: 'Tasodifiy o‘quvchi' },
  { id: 'score', label: 'Hisob' },
  { id: 'timer', label: 'Taymer' },
];

export function ToolsPanel({ tab, onTab }: { tab: ToolTab; onTab: (t: ToolTab) => void }) {
  const base = useId();
  return (
    <div className="flex flex-col gap-[1.5rem]">
      <div role="tablist" aria-label="Asboblar" className="flex flex-wrap gap-[0.8rem]">
        {TABS.map((t) => (
          <button
            key={t.id}
            id={`${base}-${t.id}`}
            role="tab"
            type="button"
            aria-selected={tab === t.id}
            aria-controls={`${base}-panel`}
            onClick={() => onTab(t.id)}
            className="min-h-tap rounded-xl2 border-[0.15rem] border-line bg-surface px-6 text-meta font-extrabold aria-selected:border-primary aria-selected:bg-primary aria-selected:text-on-primary"
          >
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`${base}-panel`} aria-labelledby={`${base}-${tab}`}>
        {tab === 'picker' ? <RandomPicker /> : tab === 'score' ? <Scoreboard /> : <Timer />}
      </div>
    </div>
  );
}
