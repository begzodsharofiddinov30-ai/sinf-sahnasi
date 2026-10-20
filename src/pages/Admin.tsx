// Administrator: ro'yxatdan o'tgan o'qituvchilar (faqat ADMIN_TOKEN kaliti bilan)
import { useEffect, useId, useMemo, useState, type FormEvent } from 'react';
import { Layout } from '../app/Layout';
import { formatPhone } from '../app/teacher';
import { BigButton } from '../components/BigButton';
import { matchesQuery } from '../lib/text';

interface Row {
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  lastSeen: string;
  classSize: number;
  test: boolean;
}

const KEY = 'sinf-sahnasi:adminToken';
const readToken = () => {
  try {
    return sessionStorage.getItem(KEY) ?? '';
  } catch {
    return '';
  }
};
const writeToken = (v: string | null) => {
  try {
    if (v) sessionStorage.setItem(KEY, v);
    else sessionStorage.removeItem(KEY);
  } catch {
    // e'tiborsiz
  }
};

const fmt = (iso: string) => {
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
};

function downloadCsv(rows: Row[]) {
  const head = ['Ism', 'Familiya', 'Telefon', 'Ro‘yxatdan o‘tgan', 'Oxirgi kirish', 'O‘quvchilar soni'];
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const body = rows.map((r) => [r.firstName, r.lastName, r.phone, fmt(r.createdAt), fmt(r.lastSeen), r.classSize].map(esc).join(';'));
  // BOM — Excel o'zbekcha harflarni to'g'ri ochishi uchun
  const blob = new Blob(['﻿' + [head.map(esc).join(';'), ...body].join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `oqituvchilar-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

export function AdminPage() {
  const [token, setToken] = useState(readToken);
  const [input, setInput] = useState('');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [q, setQ] = useState('');
  const [showTest, setShowTest] = useState(false);
  const tid = useId();
  const sid = useId();

  const load = async (t: string) => {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch('/api/admin', { headers: { authorization: `Bearer ${t}` }, cache: 'no-store' });
      const json = (res.headers.get('content-type') ?? '').includes('json') ? await res.json() : null;
      if (res.status === 401) {
        writeToken(null);
        setToken('');
        setError('Kalit noto‘g‘ri.');
      } else if (!json?.ok) setError(res.status === 503 ? 'Server sozlanmagan (ADMIN_TOKEN yo‘q).' : 'Server bilan bog‘lanib bo‘lmadi.');
      else setRows(json.teachers as Row[]);
    } catch {
      setError('Internet yo‘q yoki server ishlamayapti.');
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (token) void load(token);
  }, [token]);

  const shown = useMemo(
    () => (rows ?? []).filter((r) => (showTest || !r.test) && matchesQuery(`${r.firstName} ${r.lastName} ${r.phone}`, q)),
    [rows, q, showTest],
  );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    writeToken(t);
    setToken(t);
    setInput('');
  };

  return (
    <Layout crumbs={[{ label: 'Administrator' }]}>
      <h1 className="text-title font-black">Ro‘yxatdan o‘tgan o‘qituvchilar</h1>
      {!token ? (
        <form onSubmit={submit} className="mt-[2rem] flex max-w-[50rem] flex-col gap-[1rem]">
          <label htmlFor={tid} className="text-body font-extrabold">
            Administrator kaliti
          </label>
          <input
            id={tid}
            type="password"
            autoComplete="off"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="rounded-xl2 border-[0.2rem] border-line bg-surface px-[1.5rem] py-[0.7rem] text-body font-bold outline-none focus:border-primary"
          />
          <BigButton type="submit" size="lg">
            Kirish
          </BigButton>
          {error && <p className="text-body font-bold text-warn">{error}</p>}
        </form>
      ) : (
        <>
          <div className="mt-[1.5rem] flex flex-wrap items-center gap-[1rem]">
            <label htmlFor={sid} className="sr-only">
              Qidirish
            </label>
            <input
              id={sid}
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Ism yoki telefon…"
              className="min-h-tap flex-1 rounded-xl2 border-[0.15rem] border-line bg-surface px-[1.2rem] text-body font-bold outline-none focus:border-primary"
            />
            <label className="flex min-h-tap items-center gap-2 text-meta font-bold">
              <input type="checkbox" checked={showTest} onChange={(e) => setShowTest(e.target.checked)} className="h-[1.6rem] w-[1.6rem]" />
              Sinov yozuvlari
            </label>
            <BigButton size="md" variant="secondary" onClick={() => void load(token)} disabled={busy}>
              Yangilash
            </BigButton>
            <BigButton size="md" variant="secondary" onClick={() => downloadCsv(shown)} disabled={!shown.length}>
              CSV (Excel)
            </BigButton>
            <BigButton
              size="md"
              variant="ghost"
              onClick={() => {
                writeToken(null);
                setToken('');
                setRows(null);
              }}
            >
              Chiqish
            </BigButton>
          </div>
          {error && <p className="mt-[1rem] text-body font-bold text-warn">{error}</p>}
          {busy && !rows && <p className="mt-[1rem] text-body">Yuklanmoqda…</p>}
          {rows && (
            <>
              <p className="mt-[1rem] text-body font-bold">Jami: {shown.length} ta o‘qituvchi</p>
              <div className="mt-[1rem] overflow-x-auto rounded-xl2 ring-[0.15rem] ring-line">
                <table className="w-full border-collapse bg-surface text-meta">
                  <thead className="bg-surface-2 text-left">
                    <tr>
                      {['№', 'Ism', 'Familiya', 'Telefon', 'Ro‘yxatdan o‘tgan', 'Oxirgi kirish', 'O‘quvchilar'].map((h) => (
                        <th key={h} scope="col" className="px-[1rem] py-[0.8rem] font-black">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shown.map((r, i) => (
                      <tr key={r.phone} className="border-t border-line">
                        <td className="px-[1rem] py-[0.6rem]">{i + 1}</td>
                        <td className="px-[1rem] py-[0.6rem] font-bold">
                          {r.firstName}
                          {r.test ? ' (sinov)' : ''}
                        </td>
                        <td className="px-[1rem] py-[0.6rem] font-bold">{r.lastName}</td>
                        <td className="whitespace-nowrap px-[1rem] py-[0.6rem] tabular-nums">{formatPhone(r.phone)}</td>
                        <td className="whitespace-nowrap px-[1rem] py-[0.6rem]">{fmt(r.createdAt)}</td>
                        <td className="whitespace-nowrap px-[1rem] py-[0.6rem]">{fmt(r.lastSeen)}</td>
                        <td className="px-[1rem] py-[0.6rem] tabular-nums">{r.classSize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
}
