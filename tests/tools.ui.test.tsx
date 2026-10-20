import { act, fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionConfig } from 'framer-motion';
import type { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ROUTER_FUTURE } from '../src/app/App';
import { SettingsProvider } from '../src/app/SettingsProvider';
import { SelfCheckPage } from '../src/pages/SelfCheck';
import { SettingsPage } from '../src/pages/Settings';
import { RandomPicker } from '../src/tools/RandomPicker';
import { Scoreboard } from '../src/tools/Scoreboard';
import { Timer } from '../src/tools/Timer';
import { ToolsProvider } from '../src/tools/ToolsProvider';

function wrap(ui: ReactNode) {
  return render(
    <SettingsProvider>
      <ToolsProvider>
        <MotionConfig reducedMotion="always" transition={{ duration: 0 }}>
          <MemoryRouter future={ROUTER_FUTURE}>{ui}</MemoryRouter>
        </MotionConfig>
      </ToolsProvider>
    </SettingsProvider>,
  );
}

afterEach(() => vi.useRealTimers());

describe('tasodifiy o‘quvchi', () => {
  it('ro‘yxat kiritiladi, hamma bir martadan tanlanadi', async () => {
    const user = userEvent.setup();
    wrap(<RandomPicker />);
    await user.type(screen.getByRole('textbox'), 'Aziz{enter}Malika{enter}Sardor');
    await user.click(screen.getByRole('button', { name: 'Saqlash' }));
    expect(screen.getByText('Hali chiqmaganlar: 3 / 3')).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem('sinf-sahnasi:classList')!)).toEqual(['Aziz', 'Malika', 'Sardor']);

    vi.useFakeTimers();
    const seen = new Set<string>();
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getByRole('button', { name: 'Tasodifiy o‘quvchi' }));
      await act(async () => {
        await vi.advanceTimersByTimeAsync(2500);
      });
      const last = JSON.parse(localStorage.getItem('sinf-sahnasi:picker')!).last as string;
      expect(screen.getAllByTestId('picked-name').some((el) => el.textContent === last)).toBe(true);
      seen.add(last);
    }
    expect(seen).toEqual(new Set(['Aziz', 'Malika', 'Sardor']));
    expect(screen.getByText('Hali chiqmaganlar: 3 / 3')).toBeInTheDocument();
  });
});

describe('hisob', () => {
  it('+/− ishlaydi, 0 dan pastga tushmaydi, 3 jamoa', async () => {
    const user = userEvent.setup();
    wrap(<Scoreboard />);
    await user.click(screen.getByRole('button', { name: 'Lolalar: bir ochko ayirish' }));
    expect(screen.getByTestId('score-0')).toHaveTextContent('0');
    for (let i = 0; i < 5; i++) await user.click(screen.getByRole('button', { name: 'Lolalar: bir ochko qo‘shish' }));
    expect(screen.getByTestId('score-0')).toHaveTextContent('5');
    await user.click(screen.getByRole('button', { name: '3' }));
    expect(screen.getByRole('region', { name: 'Bulbullar jamoasi' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Hisobni nolga tushirish' }));
    await user.click(screen.getByRole('button', { name: 'Ha, nolga' }));
    expect(screen.getByTestId('score-0')).toHaveTextContent('0');
  });
});

describe('taymer', () => {
  it('1 daqiqa sanaydi va tugaydi', async () => {
    vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval', 'Date'] });
    wrap(<Timer />);
    fireEvent.click(screen.getByRole('button', { name: '1 daq' }));
    expect(screen.getByTestId('timer-left')).toHaveTextContent('1:00');
    fireEvent.click(screen.getByRole('button', { name: /Boshlash/ }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(30_000);
    });
    expect(screen.getByTestId('timer-left')).toHaveTextContent('0:30');
    fireEvent.click(screen.getByRole('button', { name: /To‘xtatish/ }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10_000);
    });
    expect(screen.getByTestId('timer-left')).toHaveTextContent('0:30');
    fireEvent.click(screen.getByRole('button', { name: /Boshlash/ }));
    await act(async () => {
      await vi.advanceTimersByTimeAsync(31_000);
    });
    expect(screen.getByText('Vaqt tugadi!')).toBeInTheDocument();
  });
});

describe('sozlamalar', () => {
  it('rejimlar va shrift html atributlariga ta’sir qiladi', async () => {
    const user = userEvent.setup();
    wrap(<SettingsPage />);
    await user.click(screen.getByRole('checkbox', { name: /Yengil rejim/ }));
    expect(document.documentElement.dataset.perf).toBe('light');
    expect(document.documentElement.dataset.motion).toBe('reduced');
    await user.click(screen.getByRole('checkbox', { name: /Yuqori kontrast/ }));
    expect(document.documentElement.dataset.theme).toBe('contrast');
    fireEvent.change(screen.getByRole('slider', { name: /Matn o‘lchami/ }), { target: { value: '1.3' } });
    expect(document.documentElement.style.getPropertyValue('--font-scale')).toBe('1.3');
    expect(JSON.parse(localStorage.getItem('sinf-sahnasi:settings')!).lightMode).toBe(true);
  });

  it('tekshiruv sahifasi versiya va ekranni ko‘rsatadi', async () => {
    wrap(<SelfCheckPage />);
    expect(screen.getByText(/Ilova versiyasi/)).toBeInTheDocument();
    expect(screen.getByText(/Oyna:/)).toBeInTheDocument();
    expect(await screen.findByText(/oflayn rejimni qo‘llamaydi|Hali oflayn/)).toBeInTheDocument();
  });
});
