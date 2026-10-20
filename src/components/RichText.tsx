// **so'z** belgisini ajratib ko'rsatadi (rang + qalinlik + tagiga chiziq)
import { Fragment } from 'react';

export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**') ? (
          <mark key={i} className="hl">
            {p.slice(2, -2)}
          </mark>
        ) : (
          <Fragment key={i}>{p}</Fragment>
        ),
      )}
    </>
  );
}

export function plainText(text: string): string {
  return text.replace(/\*\*/g, '');
}
