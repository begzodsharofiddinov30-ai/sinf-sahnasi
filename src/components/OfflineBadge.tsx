// "Oflayn tayyor" belgisi va "Yangi versiya" tugmasi
import { Link } from 'react-router-dom';
import { usePwa } from '../app/PwaProvider';
import { Icon } from './Icon';

export function OfflineBadge() {
  const { offlineReady, needRefresh, update, portable } = usePwa();
  if (needRefresh)
    return (
      <button
        type="button"
        onClick={update}
        className="inline-flex min-h-tap items-center gap-2 rounded-full bg-accent px-5 text-meta font-extrabold text-ink"
      >
        <Icon name="retry" /> Yangi versiya — yangilash
      </button>
    );
  if (portable)
    return <span className="inline-flex min-h-tap items-center gap-2 rounded-full bg-surface-2 px-5 text-meta font-bold text-ink-soft">Portativ versiya</span>;
  return (
    <Link
      to="/ornatish"
      className={`inline-flex min-h-tap items-center gap-2 rounded-full px-5 text-meta font-extrabold ${
        offlineReady ? 'bg-success-soft text-success' : 'bg-surface-2 text-ink-soft'
      }`}
      title="Ilovani o‘rnatish va oflayn rejim"
    >
      {offlineReady ? (
        <>
          <Icon name="check" /> Oflayn tayyor
        </>
      ) : (
        'Oflayn tayyorlanmoqda…'
      )}
    </Link>
  );
}
