// Asl (original) sodda SVG rasmlar — 100x100 koordinatada
import type { ReactElement } from 'react';
import type { PictureName } from '../content/schema';

export const PICTURE_LABELS: Record<PictureName, string> = {
  olma: 'olma',
  nok: 'nok',
  anor: 'anor',
  uzum: 'uzum',
  yulduz: 'yulduzcha',
  koptok: 'koptok',
  baliq: 'baliq',
  gul: 'gul',
  qush: 'qush',
  mashina: 'mashina',
  qalam: 'qalam',
  barg: 'barg',
  quyosh: 'quyosh',
  bulut: 'bulut',
  tomchi: 'tomchi',
  kitob: 'kitob',
  daraxt: 'daraxt',
  qor: 'qor uchquni',
  suv: 'suv',
  muz: 'muz',
  choynak: 'choynak',
  doira: 'doira',
  kvadrat: 'kvadrat',
  uchburchak: 'uchburchak',
  tortburchak: 'to‘rtburchak',
  mushuk: 'mushuk',
  it: 'it',
  sigir: 'sigir',
  quyon: 'quyon',
  tulki: 'tulki',
  svetofor: 'svetofor',
  sayyora: 'sayyora',
  sovun: 'sovun',
  shisha: 'shisha',
  qogoz: 'qog‘oz',
  tanga: 'tanga',
  oy: 'oy',
};

const SHAPES: Record<PictureName, ReactElement> = {
  olma: (
    <>
      <path d="M50 30C30 18 12 32 16 55c4 25 22 37 34 31 12 6 30-6 34-31 4-23-14-37-34-25z" fill="#E5484D" />
      <path d="M50 30q2-12 6-18" stroke="#7A4B2A" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M56 20q14-12 24-4-10 12-24 4z" fill="#46A758" />
      <ellipse cx="34" cy="48" rx="6" ry="10" fill="#fff" opacity=".35" />
    </>
  ),
  nok: (
    <>
      <path d="M50 22c-10 0-12 14-14 22-14 12-14 44 14 46 28-2 28-34 14-46-2-8-4-22-14-22z" fill="#B5CC3A" />
      <path d="M50 22q0-8 4-12" stroke="#7A4B2A" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M53 15q12-8 20-2-9 9-20 2z" fill="#46A758" />
      <ellipse cx="40" cy="62" rx="5" ry="9" fill="#fff" opacity=".35" />
    </>
  ),
  anor: (
    <>
      <path d="M50 22c22 0 38 14 38 36S72 92 50 92 12 80 12 58s16-36 38-36z" fill="#C2273B" />
      <path d="M34 26l4-16 6 9 6-11 6 11 6-9 4 16q-16-6-32 0z" fill="#8E1B2B" />
      <path d="M62 40q14 6 16 22" stroke="#E2596B" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="34" cy="52" rx="6" ry="11" fill="#fff" opacity=".3" />
    </>
  ),
  uzum: (
    <>
      {[
        [38, 34], [54, 34], [70, 34], [46, 48], [62, 48], [38, 62], [54, 62], [46, 76], [54, 88],
      ].map(([x, y], i) => (
        <circle key={i} cx={x - 4} cy={y} r="9" fill="#6E4BB0" stroke="#4E3384" strokeWidth="2" />
      ))}
      <path d="M50 26q0-10 6-16" stroke="#7A4B2A" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M56 16q16-8 24 2-12 8-24-2z" fill="#46A758" />
    </>
  ),
  yulduz: <path d="M50 8l12 26 28 3-21 19 6 28-25-14-25 14 6-28-21-19 28-3z" fill="#F5B82E" stroke="#C98A0B" strokeWidth="3" strokeLinejoin="round" />,
  koptok: (
    <>
      <circle cx="50" cy="50" r="38" fill="#3E7BD6" />
      <path d="M14 42q36 14 72 0M14 58q36 14 72 0" stroke="#fff" strokeWidth="7" fill="none" />
      <path d="M50 12v76" stroke="#F5B82E" strokeWidth="7" />
    </>
  ),
  baliq: (
    <>
      <path d="M14 50q24-28 54-10l16-14v48L68 60Q38 78 14 50z" fill="#F08A24" />
      <path d="M40 38q8 12 0 24" stroke="#C25E0B" strokeWidth="4" fill="none" strokeLinecap="round" />
      <circle cx="28" cy="46" r="4.5" fill="#1F2430" />
    </>
  ),
  gul: (
    <>
      <path d="M50 58v34" stroke="#3B8C46" strokeWidth="6" strokeLinecap="round" />
      <path d="M50 78q-16-10-22 0 10 8 22 0z" fill="#46A758" />
      {[0, 72, 144, 216, 288].map((a) => (
        <ellipse key={a} cx="50" cy="22" rx="12" ry="16" fill="#E86BA8" transform={`rotate(${a} 50 40)`} />
      ))}
      <circle cx="50" cy="40" r="10" fill="#F5B82E" />
    </>
  ),
  qush: (
    <>
      <ellipse cx="48" cy="56" rx="32" ry="24" fill="#4BA3C7" />
      <circle cx="70" cy="38" r="16" fill="#4BA3C7" />
      <path d="M84 36l12 4-12 5z" fill="#F5B82E" />
      <path d="M30 52q14 20 32 4" fill="#2F7FA0" />
      <circle cx="73" cy="34" r="3.5" fill="#1F2430" />
      <path d="M40 80v10M54 80v10" stroke="#C98A0B" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  mashina: (
    <>
      <path d="M10 64V50q0-6 6-6h12l10-14h28l12 14h6q6 0 6 6v14z" fill="#D9473F" />
      <path d="M42 34h10v10H34zM56 34h8l8 10H56z" fill="#CFE6F7" />
      <circle cx="30" cy="66" r="10" fill="#1F2430" />
      <circle cx="72" cy="66" r="10" fill="#1F2430" />
      <circle cx="30" cy="66" r="4" fill="#C9CED6" />
      <circle cx="72" cy="66" r="4" fill="#C9CED6" />
    </>
  ),
  qalam: (
    <g transform="rotate(-35 50 50)">
      <rect x="20" y="42" width="52" height="16" fill="#F5B82E" />
      <rect x="14" y="42" width="8" height="16" rx="2" fill="#E86BA8" />
      <path d="M72 42l16 8-16 8z" fill="#F2D3A6" />
      <path d="M83 47.5l5 2.5-5 2.5z" fill="#1F2430" />
    </g>
  ),
  barg: (
    <>
      <path d="M20 80Q16 24 82 18q4 62-62 62z" fill="#46A758" />
      <path d="M20 80Q46 52 76 24" stroke="#2D7A3A" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  quyosh: (
    <>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
        <rect key={a} x="47" y="4" width="6" height="16" rx="3" fill="#F5A623" transform={`rotate(${a} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="24" fill="#F5C02E" />
    </>
  ),
  bulut: (
    <path d="M26 74a16 16 0 0 1 0-32 22 22 0 0 1 42-6 18 18 0 0 1 8 38z" fill="#E8EEF5" stroke="#9AAABB" strokeWidth="3" />
  ),
  tomchi: (
    <>
      <path d="M50 10Q78 46 78 62a28 28 0 0 1-56 0Q22 46 50 10z" fill="#3E9BE0" />
      <ellipse cx="40" cy="62" rx="5" ry="10" fill="#fff" opacity=".45" />
    </>
  ),
  kitob: (
    <>
      <path d="M50 28Q34 18 10 22v52q24-4 40 6z" fill="#3E7BD6" />
      <path d="M50 28q16-10 40-6v52q-24-4-40 6z" fill="#5A93E3" />
      <path d="M18 34q14-2 24 4M18 46q14-2 24 4M58 38q10-6 24-4M58 50q10-6 24-4" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  daraxt: (
    <>
      <rect x="43" y="56" width="14" height="36" rx="3" fill="#8A5A34" />
      <circle cx="50" cy="40" r="28" fill="#3B9C4B" />
      <circle cx="32" cy="50" r="16" fill="#46A758" />
      <circle cx="68" cy="50" r="16" fill="#46A758" />
    </>
  ),
  qor: (
    <g stroke="#5AA6D6" strokeWidth="6" strokeLinecap="round">
      {[0, 60, 120].map((a) => (
        <g key={a} transform={`rotate(${a} 50 50)`}>
          <path d="M50 12v76M42 20l8 8 8-8M42 80l8-8 8 8" fill="none" />
        </g>
      ))}
    </g>
  ),
  suv: (
    <>
      <path d="M6 44q11-10 22 0t22 0 22 0 22 0v46H6z" fill="#3E9BE0" />
      <path d="M6 62q11-10 22 0t22 0 22 0 22 0" stroke="#BFE1F7" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M6 78q11-10 22 0t22 0 22 0 22 0" stroke="#BFE1F7" strokeWidth="5" fill="none" strokeLinecap="round" />
    </>
  ),
  muz: (
    <>
      <path d="M22 34l28-14 28 14v34L50 84 22 68z" fill="#D7EEFA" stroke="#5AA6D6" strokeWidth="4" strokeLinejoin="round" />
      <path d="M22 34l28 14 28-14M50 48v36" stroke="#5AA6D6" strokeWidth="4" fill="none" strokeLinejoin="round" />
      <path d="M32 44l8 4" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
    </>
  ),
  choynak: (
    <>
      <path d="M40 22q0-8 10-8t10 8" stroke="#9AAABB" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M26 40q0-14 24-14t24 14l4 30q0 14-28 14T22 70z" fill="#2E6FB7" />
      <path d="M28 52h44" stroke="#fff" strokeWidth="5" />
      <circle cx="38" cy="64" r="3" fill="#fff" />
      <circle cx="50" cy="64" r="3" fill="#fff" />
      <circle cx="62" cy="64" r="3" fill="#fff" />
      <path d="M76 50q16-4 18-18" stroke="#2E6FB7" strokeWidth="7" fill="none" strokeLinecap="round" />
      <path d="M24 48q-14 0-14 14t14 12" stroke="#2E6FB7" strokeWidth="6" fill="none" />
    </>
  ),
  doira: <circle cx="50" cy="50" r="38" fill="#E5484D" stroke="#9E2A2F" strokeWidth="4" />,
  kvadrat: <rect x="14" y="14" width="72" height="72" rx="4" fill="#3E7BD6" stroke="#1B4A80" strokeWidth="4" />,
  uchburchak: <path d="M50 12L90 86H10z" fill="#F5B82E" stroke="#B07D0A" strokeWidth="4" strokeLinejoin="round" />,
  tortburchak: <rect x="6" y="28" width="88" height="44" rx="4" fill="#46A758" stroke="#2D7A3A" strokeWidth="4" />,
  mushuk: (
    <>
      <ellipse cx="50" cy="74" rx="26" ry="18" fill="#9AA4B2" />
      <path d="M28 30l4-18 14 12zM72 30l-4-18-14 12z" fill="#9AA4B2" />
      <circle cx="50" cy="44" r="24" fill="#9AA4B2" />
      <circle cx="41" cy="42" r="3.5" fill="#1F2430" />
      <circle cx="59" cy="42" r="3.5" fill="#1F2430" />
      <path d="M47 51l3 3 3-3z" fill="#E86BA8" />
      <path d="M30 50h12M30 55l12-2M70 50H58M70 55l-12-2" stroke="#4B5563" strokeWidth="1.8" strokeLinecap="round" />
    </>
  ),
  it: (
    <>
      <ellipse cx="50" cy="76" rx="26" ry="16" fill="#C98A4E" />
      <circle cx="50" cy="44" r="24" fill="#C98A4E" />
      <ellipse cx="27" cy="44" rx="8" ry="16" fill="#8A5A34" />
      <ellipse cx="73" cy="44" rx="8" ry="16" fill="#8A5A34" />
      <ellipse cx="50" cy="54" rx="11" ry="8" fill="#F2D3A6" />
      <circle cx="41" cy="40" r="3.5" fill="#1F2430" />
      <circle cx="59" cy="40" r="3.5" fill="#1F2430" />
      <ellipse cx="50" cy="50" rx="4" ry="3" fill="#1F2430" />
    </>
  ),
  sigir: (
    <>
      <path d="M26 26q-8-8-14-2M74 26q8-8 14-2" stroke="#E8E2D8" strokeWidth="6" fill="none" strokeLinecap="round" />
      <ellipse cx="50" cy="46" rx="26" ry="26" fill="#fff" stroke="#4B5563" strokeWidth="3" />
      <path d="M32 30q8 2 8 12-10 2-14-6zM64 52q8-2 10 6-8 6-12 0z" fill="#1F2430" />
      <ellipse cx="50" cy="66" rx="18" ry="12" fill="#F2A39A" />
      <circle cx="44" cy="66" r="2.5" fill="#7A3B2E" />
      <circle cx="56" cy="66" r="2.5" fill="#7A3B2E" />
      <circle cx="40" cy="44" r="3.5" fill="#1F2430" />
      <circle cx="60" cy="44" r="3.5" fill="#1F2430" />
    </>
  ),
  quyon: (
    <>
      <ellipse cx="38" cy="22" rx="7" ry="20" fill="#E8E2D8" stroke="#9AA4B2" strokeWidth="2" />
      <ellipse cx="62" cy="22" rx="7" ry="20" fill="#E8E2D8" stroke="#9AA4B2" strokeWidth="2" />
      <ellipse cx="38" cy="24" rx="3" ry="13" fill="#F2A39A" />
      <ellipse cx="62" cy="24" rx="3" ry="13" fill="#F2A39A" />
      <circle cx="50" cy="56" r="24" fill="#E8E2D8" stroke="#9AA4B2" strokeWidth="2" />
      <circle cx="42" cy="52" r="3.5" fill="#1F2430" />
      <circle cx="58" cy="52" r="3.5" fill="#1F2430" />
      <path d="M47 61l3 3 3-3z" fill="#E86BA8" />
      <path d="M50 64v6" stroke="#9AA4B2" strokeWidth="2" />
    </>
  ),
  tulki: (
    <>
      <path d="M20 14l18 26-22 6zM80 14L62 40l22 6z" fill="#F08A24" stroke="#C25E0B" strokeWidth="3" strokeLinejoin="round" />
      <path d="M24 22l9 16-11 3zM76 22l-9 16 11 3z" fill="#1F2430" />
      <path d="M16 44q34-22 68 0-6 26-34 40Q22 70 16 44z" fill="#F08A24" />
      <path d="M22 54q14 4 28 26 14-22 28-26-4 18-28 30-24-12-28-30z" fill="#fff" />
      <circle cx="38" cy="50" r="4" fill="#1F2430" />
      <circle cx="62" cy="50" r="4" fill="#1F2430" />
      <ellipse cx="50" cy="80" rx="5" ry="4" fill="#1F2430" />
    </>
  ),
  svetofor: (
    <>
      <rect x="30" y="6" width="40" height="80" rx="10" fill="#1F2430" />
      <rect x="45" y="86" width="10" height="12" fill="#4B5563" />
      <circle cx="50" cy="22" r="10" fill="#E5484D" />
      <circle cx="50" cy="46" r="10" fill="#F5B82E" />
      <circle cx="50" cy="70" r="10" fill="#46A758" />
    </>
  ),
  sayyora: (
    <>
      <circle cx="50" cy="50" r="26" fill="#F08A24" />
      <path d="M30 42q20-8 40 0M28 56q22 8 44 0" stroke="#C25E0B" strokeWidth="3" fill="none" />
      <ellipse cx="50" cy="52" rx="46" ry="12" fill="none" stroke="#F5B82E" strokeWidth="5" transform="rotate(-15 50 50)" />
    </>
  ),
  sovun: (
    <>
      <rect x="18" y="46" width="64" height="34" rx="14" fill="#E86BA8" />
      <rect x="28" y="54" width="44" height="6" rx="3" fill="#fff" opacity=".5" />
      <circle cx="32" cy="30" r="9" fill="none" stroke="#5AA6D6" strokeWidth="3" />
      <circle cx="56" cy="22" r="6" fill="none" stroke="#5AA6D6" strokeWidth="3" />
      <circle cx="72" cy="34" r="5" fill="none" stroke="#5AA6D6" strokeWidth="3" />
    </>
  ),
  shisha: (
    <>
      <rect x="42" y="6" width="16" height="10" rx="2" fill="#2D7A3A" />
      <path d="M44 16h12v14q14 8 14 24v34q0 6-6 6H36q-6 0-6-6V54q0-16 14-24z" fill="#8FD0A0" stroke="#2D7A3A" strokeWidth="3" />
      <rect x="36" y="56" width="28" height="18" fill="#fff" opacity=".7" />
    </>
  ),
  qogoz: (
    <>
      <path d="M22 8h40l18 18v66H22z" fill="#fff" stroke="#4B5563" strokeWidth="3" strokeLinejoin="round" />
      <path d="M62 8v18h18" fill="#E8E2D8" stroke="#4B5563" strokeWidth="3" strokeLinejoin="round" />
      <path d="M32 42h38M32 54h38M32 66h38M32 78h24" stroke="#9AA4B2" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  tanga: (
    <>
      <circle cx="50" cy="50" r="38" fill="#F5C02E" stroke="#B07D0A" strokeWidth="5" />
      <circle cx="50" cy="50" r="26" fill="none" stroke="#B07D0A" strokeWidth="3" />
      <path d="M50 34v32M42 42h16M42 58h16" stroke="#B07D0A" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  oy: <path d="M64 10a40 40 0 1 0 0 80 32 32 0 1 1 0-80z" fill="#F5C02E" stroke="#B07D0A" strokeWidth="3" />,
};

export function Picture({ name, className, title }: { name: PictureName; className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} role="img" aria-label={title ?? PICTURE_LABELS[name]}>
      {SHAPES[name]}
    </svg>
  );
}
