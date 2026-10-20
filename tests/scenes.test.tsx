import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionConfig } from 'framer-motion';
import { describe, expect, it, vi } from 'vitest';
import type { Scene } from '../src/content/schema';
import { getSceneEntry } from '../src/player/sceneRegistry';

function renderScene(scene: Scene, props: { revealed?: boolean; step?: number } = {}) {
  const View = getSceneEntry(scene)!.component;
  const onNext = vi.fn();
  const utils = render(
    <MotionConfig reducedMotion="always" transition={{ duration: 0 }}>
      <View scene={scene} step={props.step ?? 0} revealed={props.revealed ?? false} onNext={onNext} />
    </MotionConfig>,
  );
  return { ...utils, onNext };
}

describe('drag-match', () => {
  const scene: Scene = {
    id: 'm',
    type: 'drag-match',
    prompt: 'Moslang',
    pairs: [
      { item: { label: 'bir' }, target: { label: '1' } },
      { item: { label: 'ikki' }, target: { label: '2' } },
    ],
    retryHint: 'Yana qarang',
  };

  it('bosib tanlash: xato — ishora, to‘g‘ri — joyiga tushadi', async () => {
    const user = userEvent.setup();
    renderScene(scene);
    await user.click(screen.getByRole('button', { name: 'bir' }));
    expect(screen.getByText('Endi mos joyni bosing')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '2 joyi' }));
    expect(await screen.findByText('Yana qarang')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '1 joyi' }));
    expect(screen.getByRole('button', { name: '1 joyi: bir' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'ikki' }));
    await user.click(screen.getByRole('button', { name: '2 joyi' }));
    expect(await screen.findByText('To‘g‘ri! Barakalla!')).toBeInTheDocument();
  });

  it('sichqoncha/sensor bilan sudrab tashlash', async () => {
    renderScene(scene);
    const target = screen.getByRole('button', { name: '1 joyi' });
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ left: 100, right: 200, top: 100, bottom: 200, width: 100, height: 100, x: 100, y: 100, toJSON: () => ({}) });
    const item = screen.getByRole('button', { name: 'bir' });
    fireEvent.pointerDown(item, { clientX: 10, clientY: 10, pointerId: 1, button: 0 });
    fireEvent.pointerMove(item, { clientX: 80, clientY: 80, pointerId: 1 });
    expect(item.style.transform).toContain('translate(70px, 70px)');
    fireEvent.pointerUp(item, { clientX: 150, clientY: 150, pointerId: 1 });
    expect(screen.getByRole('button', { name: '1 joyi: bir' })).toBeInTheDocument();
  });

  it('javobni ochish hammasini joylaydi', () => {
    renderScene(scene, { revealed: true });
    expect(screen.getByRole('button', { name: '2 joyi: ikki' })).toBeInTheDocument();
    expect(screen.getByText('To‘g‘ri javob')).toBeInTheDocument();
  });
});

describe('build-word', () => {
  const scene: Scene = { id: 'w', type: 'build-word', prompt: 'Yig‘ing', word: 'qush', tiles: ['q', 'u', 'sh'], extra: ['s'] };

  it('to‘g‘ri tartibda bosilganda so‘z yig‘iladi, xatoda ishora', async () => {
    const user = userEvent.setup();
    renderScene(scene);
    await user.click(screen.getByRole('button', { name: 'u' }));
    expect(await screen.findByText('Yana bir bor o‘ylab ko‘ring!')).toBeInTheDocument();
    for (const t of ['q', 'u', 'sh']) await user.click(screen.getByRole('button', { name: t }));
    expect(await screen.findByText('Barakalla! qush')).toBeInTheDocument();
    expect(screen.getByLabelText('3-katak: sh')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 's' })).toBeInTheDocument();
  });
});

describe('sort-groups', () => {
  it('narsalarni guruhlarga ajratadi', async () => {
    const user = userEvent.setup();
    renderScene({
      id: 's',
      type: 'sort-groups',
      prompt: 'Ajrating',
      groups: [{ label: 'Yoz' }, { label: 'Qish' }],
      items: [
        { label: 'Suzish', group: 0 },
        { label: 'Qor', group: 1 },
      ],
    });
    await user.click(screen.getByRole('button', { name: 'Qor' }));
    await user.click(screen.getByRole('button', { name: /Yoz guruhi/ }));
    expect(await screen.findByText('Yana bir bor o‘ylab ko‘ring!')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /Qish guruhi/ }));
    expect(screen.getByRole('button', { name: 'Qish guruhi, ichida 1 ta' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Suzish' }));
    await user.click(screen.getByRole('button', { name: /Yoz guruhi/ }));
    expect(await screen.findByText('To‘g‘ri! Barakalla!')).toBeInTheDocument();
  });
});

describe('number-line', () => {
  it('orqaga sakraydi va javobni tekshiradi', async () => {
    const user = userEvent.setup();
    renderScene({ id: 'n', type: 'number-line', prompt: '8 − 3', min: 0, max: 10, start: 8, step: -1, answer: 5 });
    expect(screen.getByRole('button', { name: '8, belgi shu yerda' })).toBeInTheDocument();
    for (let i = 0; i < 3; i++) await user.click(screen.getByRole('button', { name: /Sakrash/ }));
    expect(screen.getByRole('button', { name: '5, belgi shu yerda' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '4' }));
    expect(await screen.findByText('Yana bir bor o‘ylab ko‘ring!')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /^5/ }));
    expect(await screen.findByText('To‘g‘ri! Barakalla!')).toBeInTheDocument();
  });
});

describe('ten-frame', () => {
  it('kataklarni bosib maqsadga yetadi', async () => {
    const user = userEvent.setup();
    renderScene({ id: 't', type: 'ten-frame', prompt: '3 ta oling', prefilled: 7, target: 4 });
    expect(screen.getByTestId('frame-count')).toHaveTextContent('7');
    for (const n of [7, 6, 5]) await user.click(screen.getByRole('button', { name: `${n}-katak, to‘la` }));
    expect(screen.getByTestId('frame-count')).toHaveTextContent('4');
    expect(await screen.findByText('To‘g‘ri! Barakalla!')).toBeInTheDocument();
  });

  it('ikki ramkada 10 + n ni ko‘rsatadi', () => {
    renderScene({ id: 't2', type: 'ten-frame', prompt: 'p', frames: 2, prefilled: 13 });
    expect(screen.getByText('10 + 3 = 13')).toBeInTheDocument();
  });
});

describe('clock', () => {
  it('tugmalar bilan vaqtni qo‘yadi', async () => {
    const user = userEvent.setup();
    renderScene({ id: 'c', type: 'clock', prompt: '1:30 ga qo‘ying', start: { h: 12, m: 0 }, target: { h: 1, m: 30 } });
    await user.click(screen.getByRole('button', { name: 'Soat mili oldinga' }));
    for (let i = 0; i < 6; i++) await user.click(screen.getByRole('button', { name: /5 daqiqa oldinga/ }));
    expect(screen.getByRole('img', { name: 'Soat 1:30' })).toBeInTheDocument();
    expect(await screen.findByText('To‘g‘ri! Barakalla!')).toBeInTheDocument();
  });
});

describe('story va recap', () => {
  it('hikoya sahifalarini qadam bo‘yicha ko‘rsatadi, bosish keyingisiga o‘tkazadi', () => {
    const scene: Scene = { id: 'st', type: 'story', pages: [{ text: 'Birinchi **sahifa**' }, { text: 'Ikkinchi sahifa' }] };
    const { rerender, onNext } = renderScene(scene);
    expect(screen.getByText('sahifa').tagName).toBe('MARK');
    fireEvent.click(screen.getByText('sahifa'));
    expect(onNext).toHaveBeenCalled();
    const View = getSceneEntry(scene)!.component;
    act(() => rerender(<View scene={scene} step={1} revealed={false} onNext={onNext} />));
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('yakun sahnasi oxirgi qadamda maqtaydi', () => {
    renderScene({ id: 'r', type: 'recap', title: 'Yakun', points: ['bir', 'ikki'] }, { step: 1 });
    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getByText('Barakalla! Siz ajoyib ishladingiz!')).toBeInTheDocument();
  });
});
