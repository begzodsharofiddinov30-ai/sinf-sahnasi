// Sozlamalar turi va ularni xavfsiz o'qish
import { readJSON } from '../lib/storage';

export interface Settings {
  soundOn: boolean;
  volume: number;
  /** Sahna almashishi, qadam, sakrash kabi animatsiya ovozlari */
  animSounds: boolean;
  /** Darsni boshlashda avtomatik to'liq ekran */
  autoFullscreen: boolean;
  // 4-bosqichda UI qo'shiladi:
  calmMode: boolean;
  lightMode: boolean;
  highContrast: boolean;
  fontScale: number;
}

export interface LastLesson {
  id: string;
  scene: number;
}

export const DEFAULT_SETTINGS: Settings = {
  soundOn: true,
  volume: 0.6,
  animSounds: true,
  autoFullscreen: true,
  calmMode: false,
  lightMode: false,
  highContrast: false,
  fontScale: 1,
};

/** Saqlangan qiymat buzilgan bo'lsa ham, to'g'ri sozlama qaytaradi */
export function sanitizeSettings(raw: unknown): Settings {
  const r = (typeof raw === 'object' && raw !== null ? raw : {}) as Record<string, unknown>;
  const bool = (k: keyof Settings) => (typeof r[k] === 'boolean' ? (r[k] as boolean) : (DEFAULT_SETTINGS[k] as boolean));
  const num = (k: keyof Settings, min: number, max: number) =>
    typeof r[k] === 'number' && Number.isFinite(r[k]) ? Math.min(max, Math.max(min, r[k] as number)) : (DEFAULT_SETTINGS[k] as number);
  return {
    soundOn: bool('soundOn'),
    volume: num('volume', 0, 1),
    animSounds: bool('animSounds'),
    autoFullscreen: bool('autoFullscreen'),
    calmMode: bool('calmMode'),
    lightMode: bool('lightMode'),
    highContrast: bool('highContrast'),
    fontScale: num('fontScale', 0.8, 1.6),
  };
}

export function loadSettings(): Settings {
  return sanitizeSettings(readJSON<unknown>('settings', null));
}

export function loadFavourites(): string[] {
  const raw = readJSON<unknown>('favourites', []);
  return Array.isArray(raw) ? raw.filter((x): x is string => typeof x === 'string') : [];
}

export function loadLastLesson(): LastLesson | null {
  const raw = readJSON<unknown>('lastLesson', null) as Partial<LastLesson> | null;
  if (!raw || typeof raw.id !== 'string' || typeof raw.scene !== 'number') return null;
  return { id: raw.id, scene: Math.max(0, Math.floor(raw.scene)) };
}
