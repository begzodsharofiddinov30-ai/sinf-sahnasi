import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { CloudSync } from '../src/app/CloudSync';
import { formatPhone, loadTeacher, nameError, normalizeName, normalizePhone } from '../src/app/teacher';
import { TeacherGate, TeacherProvider, useTeacher } from '../src/app/TeacherProvider';
import { loadMeta } from '../src/lib/cloud';
import { readJSON, writeJSON } from '../src/lib/storage';

function Hello() {
  const { teacher, signOut } = useTeacher();
  return (
    <div>
      <p>Salom, {teacher?.firstName} {teacher?.lastName}</p>
      <button onClick={() => void signOut()}>chiqish</button>
    </div>
  );
}

function app() {
  return render(
    <TeacherProvider>
      <TeacherGate>
        <Hello />
        <CloudSync />
      </TeacherGate>
    </TeacherProvider>,
  );
}

const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } });
const teacherBody = { firstName: 'Dilnoza', lastName: 'Karimova', phone: '+998901234567' };

async function fillAndSubmit(user: ReturnType<typeof userEvent.setup>, agree = true) {
  await user.type(screen.getByLabelText('Ismingiz'), 'dilnoza');
  await user.type(screen.getByLabelText('Familiyangiz'), 'karimova');
  await user.type(screen.getByLabelText('Telefon raqamingiz'), '901234567');
  if (agree) await user.click(screen.getByRole('checkbox'));
  await user.click(screen.getByRole('button', { name: 'Kirish' }));
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe('ism va telefon', () => {
  it('ismni va raqamni tozalaydi va tekshiradi', () => {
    expect(normalizeName('  dilnoza   o‘ktamova ')).toBe('Dilnoza O‘ktamova');
    expect(nameError('A', 'Ism')).toMatch(/kamida 2/);
    expect(nameError('Ali3', 'Ism')).toMatch(/faqat harflar/);
    expect(nameError("G'ulom", 'Ism')).toBeNull();
    expect(normalizePhone('90 123 45 67')).toBe('+998901234567');
    expect(normalizePhone('123')).toBeNull();
    expect(formatPhone('+998901234567')).toBe('+998 90 123 45 67');
  });
});

describe('ro‘yxatdan o‘tish (bulut)', () => {
  it('telefon va rozilik so‘raladi, parol so‘ralmaydi; bulutdagi ma’lumot qaytadi', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      ok({ ok: true, teacher: teacherBody, data: { classList: ['Aziz', 'Malika'], favourites: ['1/matematika/soat'] }, updatedAt: 500 }),
    );
    const user = userEvent.setup();
    app();
    expect(screen.getByRole('heading', { name: 'Xush kelibsiz!' })).toBeInTheDocument();
    expect(document.querySelector('input[type="password"]')).toBeNull();

    await fillAndSubmit(user, false);
    expect(screen.getByText(/rozilik belgisini/)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();

    await user.click(screen.getByRole('checkbox'));
    await user.click(screen.getByRole('button', { name: 'Kirish' }));
    expect(await screen.findByText('Salom, Dilnoza Karimova')).toBeInTheDocument();
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe('/api/login');
    expect(JSON.parse(String((init as RequestInit).body))).toMatchObject({ firstName: 'dilnoza', phone: '+998901234567' });
    expect(loadTeacher()).toMatchObject({ phone: '+998901234567' });
    expect(readJSON('classList', [])).toEqual(['Aziz', 'Malika']);
    expect(loadMeta()).toMatchObject({ updatedAt: 500, pending: false });
  });

  it('raqam boshqa ism bilan band bo‘lsa — xabar chiqadi, kirmaydi', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ ok: false, error: 'name-mismatch', message: 'Bu telefon raqam boshqa ism-familiya bilan ro‘yxatdan o‘tgan.' }), {
        status: 409,
        headers: { 'content-type': 'application/json' },
      }),
    );
    const user = userEvent.setup();
    app();
    await fillAndSubmit(user);
    expect(await screen.findByRole('alert')).toHaveTextContent('boshqa ism-familiya');
    expect(loadTeacher()).toBeNull();
  });

  it('internet bo‘lmasa — shu kompyuterda ro‘yxatdan o‘tadi', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new TypeError('Failed to fetch'));
    const user = userEvent.setup();
    app();
    await fillAndSubmit(user);
    expect(await screen.findByText('Salom, Dilnoza Karimova')).toBeInTheDocument();
    expect(loadTeacher()).toMatchObject({ phone: '+998901234567' });
  });

  it('o‘zgarishlar fonda bulutga yuboriladi; chiqishda shu kompyuterdan o‘chadi', async () => {
    writeJSON('teacher', { ...teacherBody, since: '' });
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockImplementation(async (_u, init) => {
      const body = JSON.parse(String((init as RequestInit).body));
      return ok({ ok: true, teacher: teacherBody, data: body.data ?? {}, updatedAt: body.updatedAt ?? 0 });
    });
    app();
    expect(await screen.findByText('Salom, Dilnoza Karimova')).toBeInTheDocument();
    fetchMock.mockClear();
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'Date'] });
    act(() => void writeJSON('classList', ['Sardor']));
    // bir xil qiymatni qayta yozish o'zgarish emas
    act(() => void writeJSON('classList', ['Sardor']));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3000);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const sent = JSON.parse(String((fetchMock.mock.calls[0][1] as RequestInit).body));
    expect(fetchMock.mock.calls[0][0]).toBe('/api/sync');
    expect(sent.data.classList).toEqual(['Sardor']);
    vi.useRealTimers();
    await waitFor(() => expect(loadMeta().pending).toBe(false));

    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'chiqish' }));
    expect(screen.getByRole('heading', { name: 'Xush kelibsiz!' })).toBeInTheDocument();
    expect(readJSON('classList', null)).toBeNull();
  });

  it('eski profil (telefonsiz) — raqam qo‘shish so‘raladi, ism saqlanadi', () => {
    writeJSON('teacher', { firstName: 'Dilnoza', lastName: 'Karimova', since: '' });
    app();
    expect(screen.getByRole('heading', { name: 'Ma’lumotni to‘ldiring' })).toBeInTheDocument();
    expect(screen.getByLabelText('Ismingiz')).toHaveValue('Dilnoza');
  });
});
