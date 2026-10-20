// O'nlik ramka: 2 qator x 5 katak (bitta yoki ikkita ramka)
export function TenFrameGrid({
  cells,
  onToggle,
  cellClass = 'h-[11vh] w-[11vh]',
}: {
  cells: boolean[];
  onToggle?: (i: number) => void;
  cellClass?: string;
}) {
  const frames = Math.ceil(cells.length / 10);
  return (
    <div className="flex flex-wrap items-center justify-center gap-[3vw]">
      {Array.from({ length: frames }, (_, f) => (
        <div key={f} className="grid grid-cols-5 gap-[0.6vh] rounded-xl2 border-[0.3rem] border-ink bg-ink p-[0.6vh]" role="group" aria-label={`${f + 1}-ramka`}>
          {cells.slice(f * 10, f * 10 + 10).map((on, k) => {
            const i = f * 10 + k;
            const content = (
              <span
                className={`block h-[70%] w-[70%] rounded-full transition-transform duration-200 ${on ? 'scale-100 bg-[#D9473F]' : 'scale-0 bg-transparent'}`}
                aria-hidden="true"
              />
            );
            return onToggle ? (
              <button
                key={i}
                type="button"
                onClick={() => onToggle(i)}
                aria-pressed={on}
                aria-label={`${i + 1}-katak${on ? ', to‘la' : ', bo‘sh'}`}
                className={`grid place-items-center rounded-lg bg-surface ${cellClass}`}
              >
                {content}
              </button>
            ) : (
              <span key={i} className={`grid place-items-center rounded-lg bg-surface ${cellClass}`}>
                {content}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
