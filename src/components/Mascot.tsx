// Bo‘tajon — sinfning asl maskoti (kichkina tuyacha, do‘ppida)
import type { MascotMood } from '../content/schema';

export const MASCOT_NAME = 'Bo‘tajon';

const SAND = '#E8BE84';
const SAND_DARK = '#C99A62';

export function Mascot({ mood = 'neutral', className = 'h-[30vh] w-auto' }: { mood?: MascotMood; className?: string }) {
  const happyEyes = mood === 'happy' || mood === 'cheer';
  // CSS animatsiya (framer-motion'siz — bosh sahifa yengilroq yuklanadi); kayfiyat o'zgarsa qayta o'ynaydi
  const anim = mood === 'cheer' ? 'mascot-cheer' : mood === 'think' ? 'mascot-think' : '';

  return (
    <svg key={mood} viewBox="0 0 220 220" className={`${className} ${anim}`} role="img" aria-label={`${MASCOT_NAME} — maskot`}>
      {/* dum */}
      <path d="M40 140q-16 4-18 24" stroke={SAND_DARK} strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* oyoqlar */}
      <rect x="54" y="158" width="18" height="46" rx="9" fill={SAND_DARK} />
      <rect x="78" y="162" width="18" height="44" rx="9" fill={SAND} />
      <rect x="114" y="162" width="18" height="44" rx="9" fill={SAND} />
      <rect x="136" y="158" width="18" height="46" rx="9" fill={SAND_DARK} />
      {/* tana va o'rkach */}
      <ellipse cx="88" cy="122" rx="32" ry="26" fill={SAND} />
      <ellipse cx="100" cy="150" rx="62" ry="34" fill={SAND} />
      <ellipse cx="104" cy="162" rx="40" ry="16" fill="#F5DDB5" />
      {/* bo'yin */}
      <path d="M128 150q10-40 20-66l26 8q-8 28-14 58z" fill={SAND} />
      {/* bosh */}
      <ellipse cx="146" cy="52" rx="7" ry="11" fill={SAND_DARK} transform="rotate(-30 146 52)" />
      <ellipse cx="166" cy="72" rx="32" ry="28" fill={SAND} />
      <ellipse cx="184" cy="86" rx="20" ry="15" fill="#F5DDB5" />
      <ellipse cx="194" cy="81" rx="2.6" ry="2" fill="#7A5230" />
      <circle cx="176" cy="80" r="5" fill="#F2A39A" opacity=".75" />
      {/* do'ppi */}
      <path d="M146 50l4-16q16-7 32 0l4 16q-20-7-40 0z" fill="#1F2430" />
      <path d="M156 38q3 4 0 8q-3-4 0-8zM166 36q3 4 0 8q-3-4 0-8zM176 38q3 4 0 8q-3-4 0-8z" fill="#fff" />
      {/* ko'zlar */}
      {happyEyes ? (
        <path d="M154 68q8-9 16 0" stroke="#1F2430" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      ) : (
        <g>
          <circle cx="162" cy="66" r="9" fill="#fff" />
          <circle cx="164" cy={mood === 'think' ? 62 : 67} r="5" fill="#1F2430" />
          <circle cx="166" cy={mood === 'think' ? 60 : 65} r="1.8" fill="#fff" />
        </g>
      )}
      {/* og'iz */}
      {mood === 'cheer' ? (
        <ellipse cx="186" cy="94" rx="7" ry="5" fill="#7A3B2E" />
      ) : mood === 'think' ? (
        <path d="M180 95h12" stroke="#7A5230" strokeWidth="3.5" strokeLinecap="round" />
      ) : (
        <path d="M178 92q8 7 16 0" stroke="#7A5230" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      )}
      {/* o'ylash pufakchasi */}
      {mood === 'think' && (
        <g>
          <circle cx="118" cy="40" r="5" fill="#fff" stroke="#9AAABB" strokeWidth="2" />
          <circle cx="104" cy="24" r="16" fill="#fff" stroke="#9AAABB" strokeWidth="2" />
          <text x="104" y="31" textAnchor="middle" fontSize="20" fontWeight="800" fill="#2563A8">?</text>
        </g>
      )}
      {/* uchqunlar */}
      {mood === 'cheer' && (
        <g fill="#F5B82E">
          <path d="M40 40l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
          <path d="M200 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
          <path d="M20 100l3 6 6 3-6 3-3 6-3-6-6-3 6-3z" />
        </g>
      )}
    </svg>
  );
}
