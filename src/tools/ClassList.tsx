// Sinf ro'yxati: faqat ismlar, faqat shu kompyuterda saqlanadi
import { useEffect, useId, useState } from 'react';
import { BigButton } from '../components/BigButton';
import { MAX_NAMES, parseNames } from './logic';
import { useTools } from './ToolsProvider';

export function ClassList({ onSaved }: { onSaved?: () => void }) {
  const { names, setNames } = useTools();
  const [text, setText] = useState(names.join('\n'));
  const [saved, setSaved] = useState(false);
  const [dirty, setDirty] = useState(false);
  // Ro'yxat boshqa joydan (bulutdan) yangilansa va o'qituvchi hozir yozmayotgan bo'lsa — ko'rsatamiz
  useEffect(() => {
    if (!dirty) setText(names.join('\n'));
  }, [names, dirty]);
  const id = useId();
  const parsed = parseNames(text);

  return (
    <div className="flex flex-col gap-[1rem]">
      <label htmlFor={id} className="text-body font-extrabold">
        Sinf ro‘yxati
      </label>
      <p className="text-meta text-ink-soft">
        Har qatorga bitta <b>ism</b> yozing (familiya shart emas). Ro‘yxat faqat shu kompyuterda saqlanadi va hech qayerga yuborilmaydi.
      </p>
      <textarea
        id={id}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setSaved(false);
          setDirty(true);
        }}
        rows={8}
        className="w-full rounded-xl2 border-[0.15rem] border-line bg-surface p-[1rem] text-body font-bold outline-none focus:border-primary"
        placeholder={'Aziz\nMalika\nSardor'}
      />
      <div className="flex flex-wrap items-center gap-[1rem]">
        <BigButton
          size="md"
          onClick={() => {
            setNames(parsed);
            setSaved(true);
            setDirty(false);
            onSaved?.();
          }}
        >
          Saqlash
        </BigButton>
        <span className="text-meta font-bold text-ink-soft" aria-live="polite">
          {saved ? `Saqlandi: ${parsed.length} ta ism` : `${parsed.length} ta ism (eng ko‘pi ${MAX_NAMES})`}
        </span>
      </div>
    </div>
  );
}
