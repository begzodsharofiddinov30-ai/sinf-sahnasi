// Yengil "bayram" effekti: yulduzchalar tarqaladi (faqat transform/opacity)
import { motion } from 'framer-motion';

const STARS = Array.from({ length: 12 }, (_, i) => {
  const a = (i / 12) * Math.PI * 2;
  return { x: Math.cos(a) * 34, y: Math.sin(a) * 30, d: (i % 3) * 0.05 };
});

export function Celebration({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden" aria-hidden="true">
      {STARS.map((s, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 20 20"
          className="absolute h-[5vh] w-[5vh]"
          initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
          animate={{ x: `${s.x}vw`, y: `${s.y}vh`, scale: 1, opacity: 0 }}
          transition={{ duration: 1.1, delay: s.d, ease: 'easeOut' }}
        >
          <path d="M10 1l2.6 5.6 6.1.7-4.5 4.2 1.2 6L10 14.5 4.6 17.5l1.2-6L1.3 7.3l6.1-.7z" fill={i % 2 ? '#F5B82E' : '#E86BA8'} />
        </motion.svg>
      ))}
    </div>
  );
}
