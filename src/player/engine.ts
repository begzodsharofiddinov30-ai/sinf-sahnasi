// Sahna dvigateli: qaysi sahna va qaysi qadam ko'rsatilayotganini boshqaradi (sof funksiya)
export interface PlayerState {
  index: number;
  step: number;
  /** Har bir sahnadagi qadamlar soni (kamida 1) */
  stepCounts: number[];
  /** O'qituvchi "javobni ko'rsatish"ni bosganmi */
  revealed: boolean;
  hintOpen: boolean;
}

export type PlayerEvent =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'goto'; index: number }
  | { type: 'reveal' }
  | { type: 'toggleHint' }
  | { type: 'closeHint' };

const lastStep = (s: PlayerState, index = s.index) => Math.max(1, s.stepCounts[index] ?? 1) - 1;
const clampIndex = (s: PlayerState, i: number) => Math.min(Math.max(0, i), Math.max(0, s.stepCounts.length - 1));

export function initPlayer(stepCounts: number[], start = 0): PlayerState {
  const counts = stepCounts.map((n) => Math.max(1, Math.floor(n) || 1));
  const index = Math.min(Math.max(0, Math.floor(start) || 0), Math.max(0, counts.length - 1));
  return { index, step: 0, stepCounts: counts, revealed: false, hintOpen: false };
}

function enterScene(s: PlayerState, index: number, step: number): PlayerState {
  return { ...s, index, step, revealed: false, hintOpen: false };
}

export function playerReducer(s: PlayerState, e: PlayerEvent): PlayerState {
  switch (e.type) {
    case 'next':
      if (s.step < lastStep(s)) return { ...s, step: s.step + 1 };
      if (s.index < s.stepCounts.length - 1) return enterScene(s, s.index + 1, 0);
      return s;
    case 'prev':
      if (s.step > 0) return { ...s, step: s.step - 1, revealed: false };
      if (s.index > 0) return enterScene(s, s.index - 1, lastStep(s, s.index - 1));
      return s;
    case 'goto': {
      const index = clampIndex(s, e.index);
      return index === s.index ? s : enterScene(s, index, 0);
    }
    case 'reveal':
      return { ...s, revealed: !s.revealed, step: s.revealed ? s.step : lastStep(s) };
    case 'toggleHint':
      return { ...s, hintOpen: !s.hintOpen };
    case 'closeHint':
      return s.hintOpen ? { ...s, hintOpen: false } : s;
  }
}

export function isAtEnd(s: PlayerState): boolean {
  return s.index === s.stepCounts.length - 1 && s.step === lastStep(s);
}

export function isAtStart(s: PlayerState): boolean {
  return s.index === 0 && s.step === 0;
}
