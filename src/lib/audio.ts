// Qisqa ovoz effektlari WebAudio orqali yaratiladi (fayl kerak emas)
type Sfx = 'pop' | 'correct' | 'retry' | 'chime' | 'tick' | AnimSfx;
/** Animatsiyalarga hamroh ovozlar (Sozlamalarda alohida o'chiriladi) */
export type AnimSfx = 'step' | 'swish' | 'lift' | 'boing' | 'sparkle';
const ANIM: readonly string[] = ['step', 'swish', 'lift', 'boing', 'sparkle'];

let ctx: AudioContext | null = null;
let enabled = true;
let volume = 0.6;
let calm = false;
let animSounds = true;

export function configureAudio(opts: { enabled: boolean; volume: number; calm?: boolean; animSounds?: boolean }): void {
  enabled = opts.enabled;
  volume = Math.min(1, Math.max(0, opts.volume));
  calm = Boolean(opts.calm);
  animSounds = opts.animSounds ?? true;
}

let noise: AudioBuffer | null = null;

/** "Shuvillash" uchun oq shovqin (bir marta yaratiladi) */
function noiseBuffer(c: AudioContext): AudioBuffer {
  if (noise && noise.sampleRate === c.sampleRate) return noise;
  const len = Math.floor(c.sampleRate * 0.35);
  noise = c.createBuffer(1, len, c.sampleRate);
  const data = noise.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  return noise;
}

/** Chastotasi siljiydigan ton (sakrash, ko'tarish) */
function glide(c: AudioContext, from: number, to: number, start: number, dur: number, type: OscillatorType, gain: number) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(from, start);
  osc.frequency.exponentialRampToValueAtTime(to, start + dur);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain * volume), start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(c.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

function getCtx(): AudioContext | null {
  try {
    if (!ctx) {
      const Ctor =
        window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === 'suspended') void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

function tone(c: AudioContext, freq: number, start: number, dur: number, type: OscillatorType, gain: number) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain * volume), start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(g).connect(c.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

/** Ovoz chiqarish imkoni bormi (Tekshiruv sahifasi uchun) */
export function audioSupported(): boolean {
  return typeof window !== 'undefined' && Boolean(window.AudioContext ?? (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext);
}

/** n — sanash tartibi: har bosishda ovoz biroz balandlashadi */
export function playSfx(name: Sfx, n = 0): void {
  if (!enabled || volume <= 0) return;
  // Animatsiya ovozlari: o'chirilgan bo'lsa yoki sokin rejimda — jim
  if (ANIM.includes(name) && (!animSounds || calm)) return;
  // Sokin rejimda faqat yumshoq ovozlar
  if (calm && (name === 'tick' || name === 'pop')) return;
  if (calm && name === 'correct') name = 'chime';
  const c = getCtx();
  if (!c) return;
  const t = c.currentTime;
  try {
    switch (name) {
      case 'pop':
        tone(c, 440 * Math.pow(2, Math.min(n, 20) / 12), t, 0.14, 'sine', 0.35);
        break;
      case 'correct':
        tone(c, 523.25, t, 0.18, 'triangle', 0.3);
        tone(c, 659.25, t + 0.1, 0.18, 'triangle', 0.3);
        tone(c, 783.99, t + 0.2, 0.3, 'triangle', 0.3);
        break;
      case 'retry':
        // yumshoq, qo'rqitmaydigan "hmm"
        tone(c, 330, t, 0.16, 'sine', 0.2);
        tone(c, 294, t + 0.14, 0.22, 'sine', 0.18);
        break;
      case 'chime':
        tone(c, 880, t, 0.5, 'sine', calm ? 0.15 : 0.25);
        tone(c, 1318.5, t + 0.15, 0.6, 'sine', calm ? 0.08 : 0.15);
        break;
      case 'tick':
        tone(c, 1200, t, 0.05, 'square', 0.05);
        break;
      case 'step':
        // yangi qadam ochildi: yumshoq ko'tariluvchi "tin"
        glide(c, 620, 880, t, 0.12, 'sine', 0.16);
        break;
      case 'swish': {
        // sahna almashdi: qisqa "shuv"
        const src = c.createBufferSource();
        src.buffer = noiseBuffer(c);
        const bp = c.createBiquadFilter();
        bp.type = 'bandpass';
        bp.Q.value = 1.2;
        bp.frequency.setValueAtTime(500, t);
        bp.frequency.exponentialRampToValueAtTime(2600, t + 0.28);
        const g = c.createGain();
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(Math.max(0.0002, 0.22 * volume), t + 0.06);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.3);
        src.connect(bp).connect(g).connect(c.destination);
        src.start(t);
        src.stop(t + 0.32);
        break;
      }
      case 'lift':
        // narsa qo'lga olindi
        glide(c, 480, 720, t, 0.09, 'triangle', 0.16);
        break;
      case 'boing':
        // son o'qida sakrash
        glide(c, 280, 620, t, 0.14, 'sine', 0.22);
        glide(c, 620, 380, t + 0.14, 0.16, 'sine', 0.16);
        break;
      case 'sparkle':
        // bayram uchqunlari
        [1568, 2093, 2637, 3136].forEach((f, i) => tone(c, f, t + i * 0.06, 0.18, 'sine', 0.07));
        break;
    }
  } catch {
    // ovoz chiqmasa ham dars davom etadi
  }
}
