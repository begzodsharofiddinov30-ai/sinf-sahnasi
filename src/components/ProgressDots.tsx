// Dars bo'yicha harakat nuqtalari: joriy nuqta kattaroq va halqali (faqat rangga tayanmaydi)
export function ProgressDots({ total, current, onJump }: { total: number; current: number; onJump?: (i: number) => void }) {
  return (
    <nav aria-label="Sahnalar" className="flex flex-wrap items-center justify-center gap-[0.6rem]">
      {Array.from({ length: total }, (_, i) => {
        const state = i === current ? 'current' : i < current ? 'done' : 'todo';
        return (
          <button
            key={i}
            type="button"
            onClick={() => onJump?.(i)}
            aria-label={`${i + 1}-sahna`}
            aria-current={state === 'current' ? 'step' : undefined}
            className="group grid h-[2.2rem] w-[2.2rem] place-items-center rounded-full"
          >
            <span
              className={
                state === 'current'
                  ? 'block h-[1.5rem] w-[1.5rem] rounded-full bg-primary ring-[0.25rem] ring-primary-soft'
                  : state === 'done'
                    ? 'block h-[0.9rem] w-[0.9rem] rounded-full bg-primary/60'
                    : 'block h-[0.9rem] w-[0.9rem] rounded-full border-[0.15rem] border-ink-soft/60 bg-transparent'
              }
            />
          </button>
        );
      })}
    </nav>
  );
}
