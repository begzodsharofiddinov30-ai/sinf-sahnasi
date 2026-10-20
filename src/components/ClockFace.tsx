// Analog soat (SVG). Millarni sudrash mumkin (onDragHand berilsa)
import { useRef, type PointerEvent } from 'react';
import { handAngles, pointAngle, type Time12 } from '../player/exercises';

type Hand = 'hour' | 'minute';

export function ClockFace({
  time,
  className = 'h-[40vh] w-[40vh]',
  onDragHand,
  hideHands = false,
}: {
  time: Time12;
  className?: string;
  onDragHand?: (hand: Hand, angle: number) => void;
  /** Ish varag'i uchun: millarni bolalar o'zi chizadi */
  hideHands?: boolean;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const active = useRef<Hand | null>(null);
  const { hour, minute } = handAngles(time);

  const angleFrom = (e: PointerEvent) => {
    const r = svg.current!.getBoundingClientRect();
    return pointAngle(r.left + r.width / 2, r.top + r.height / 2, e.clientX, e.clientY);
  };

  const start = (hand: Hand) => (e: PointerEvent<SVGElement>) => {
    if (!onDragHand) return;
    active.current = hand;
    try {
      svg.current?.setPointerCapture(e.pointerId);
    } catch {
      // e'tiborsiz
    }
    e.preventDefault();
  };

  return (
    <svg
      ref={svg}
      viewBox="0 0 200 200"
      className={`${className} ${onDragHand ? 'touch-none' : ''}`}
      role="img"
      aria-label={hideHands ? 'Millarsiz soat' : `Soat ${time.h}:${String(time.m).padStart(2, '0')}`}
      onPointerMove={(e) => active.current && onDragHand?.(active.current, angleFrom(e))}
      onPointerUp={() => (active.current = null)}
      onPointerCancel={() => (active.current = null)}
    >
      <circle cx="100" cy="100" r="94" fill="#fff" stroke="#1F2A37" strokeWidth="6" />
      {Array.from({ length: 60 }, (_, i) => (
        <line
          key={i}
          x1="100"
          y1={i % 5 === 0 ? 12 : 14}
          x2="100"
          y2={i % 5 === 0 ? 22 : 18}
          stroke="#4B5563"
          strokeWidth={i % 5 === 0 ? 3 : 1.5}
          transform={`rotate(${i * 6} 100 100)`}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => {
        const n = i + 1;
        const a = (n * 30 * Math.PI) / 180;
        return (
          <text key={n} x={100 + 68 * Math.sin(a)} y={100 - 68 * Math.cos(a) + 7} textAnchor="middle" fontSize="20" fontWeight="900" fill="#1F2A37" fontFamily="Nunito, sans-serif">
            {n}
          </text>
        );
      })}
      {!hideHands && (
        <>
      {/* soat mili — qisqa va yo'g'on */}
      <g transform={`rotate(${hour} 100 100)`} onPointerDown={start('hour')} className={onDragHand ? 'cursor-grab' : ''}>
        <line x1="100" y1="100" x2="100" y2="54" stroke="#2563A8" strokeWidth="9" strokeLinecap="round" />
        <circle cx="100" cy="54" r="14" fill="transparent" />
      </g>
      {/* daqiqa mili — uzun va ingichka */}
      <g transform={`rotate(${minute} 100 100)`} onPointerDown={start('minute')} className={onDragHand ? 'cursor-grab' : ''}>
        <line x1="100" y1="100" x2="100" y2="26" stroke="#D9473F" strokeWidth="5" strokeLinecap="round" />
        <circle cx="100" cy="30" r="14" fill="transparent" />
      </g>
        </>
      )}
      <circle cx="100" cy="100" r="6" fill="#1F2A37" />
    </svg>
  );
}
