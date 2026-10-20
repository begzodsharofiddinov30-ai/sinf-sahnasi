// Fan kartochkalari uchun piktogrammalar
import type { SubjectIcon as Kind } from '../content/subjects';

export function SubjectIcon({ kind, className = 'h-[6rem] w-[6rem]' }: { kind: Kind; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {kind === 'math' && (
        <g fontWeight="900" fontFamily="Nunito, sans-serif" fill="currentColor">
          <text x="10" y="48" fontSize="40">1</text>
          <text x="52" y="48" fontSize="40">+</text>
          <text x="10" y="92" fontSize="40">2</text>
          <text x="52" y="92" fontSize="40">=</text>
        </g>
      )}
      {kind === 'letters' && (
        <text x="50" y="70" textAnchor="middle" fontSize="56" fontWeight="900" fontFamily="Nunito, sans-serif" fill="currentColor">
          Aa
        </text>
      )}
      {kind === 'book' && (
        <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinejoin="round">
          <path d="M50 30Q34 20 12 24v52q22-4 38 6 16-10 38-6V24q-22-4-38 6z" />
          <path d="M50 30v52" />
        </g>
      )}
      {kind === 'globe' && (
        <g fill="none" stroke="currentColor" strokeWidth="6">
          <circle cx="50" cy="50" r="36" />
          <path d="M14 50h72M50 14q-20 36 0 72M50 14q20 36 0 72" />
        </g>
      )}
    </svg>
  );
}
