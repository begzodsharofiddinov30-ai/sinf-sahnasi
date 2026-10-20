import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MotionConfig } from 'framer-motion';
import { describe, expect, it, vi } from 'vitest';
import type { Lesson } from '../src/content/schema';
import { SettingsProvider } from '../src/app/SettingsProvider';
import { Player } from '../src/player/Player';
import { ToolsProvider } from '../src/tools/ToolsProvider';

const lesson: Lesson = {
  notes: { goal: 'g', questions: ['a', 'b', 'c'], minutes: 5 },
  scenes: [
    {
      id: 'e',
      type: 'explain',
      title: 'Birinchi',
      steps: [{ text: 'Qadam bir' }, { text: 'Qadam ikki' }],
      hint: 'Maxfiy maslahat',
    },
    { id: 'c', type: 'count-and-tap', prompt: 'Sanang', item: 'olma', count: 3, layout: 'row' },
    { id: 'q', type: 'choose-answer', question: '2 + 2 = ?', options: [{ label: '3' }, { label: '4' }], correct: 1, retryHint: 'Yana sanang' },
  ],
};

function setup(onExit = vi.fn()) {
  render(
    <SettingsProvider>
      <ToolsProvider>
        <MotionConfig reducedMotion="always" transition={{ duration: 0 }}>
          <Player lesson={lesson} title="Sinov darsi" onExit={onExit} />
        </MotionConfig>
      </ToolsProvider>
    </SettingsProvider>,
  );
  return { onExit };
}

const current = () => screen.getAllByRole('region', { name: /sahna$/ }).at(-1)!;

describe('Player', () => {
  it('klaviatura bilan qadam va sahnalarni almashtiradi', async () => {
    setup();
    expect(screen.getByText('Qadam bir')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(await screen.findByText('Qadam ikki')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'PageDown' });
    expect(await screen.findByText('Sanang')).toBeInTheDocument();
    expect(screen.getByText('2 / 3')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'PageUp' });
    expect(await screen.findByText('1 / 3')).toBeInTheDocument();
  });

  it('H maslahatni ochadi, Esc yopadi, keyingi Esc chiqadi', async () => {
    const { onExit } = setup();
    fireEvent.keyDown(window, { key: 'h', code: 'KeyH' });
    expect(await screen.findByText('Maxfiy maslahat')).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onExit).not.toHaveBeenCalled();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onExit).toHaveBeenCalledTimes(1);
  });

  it('sanash: har bir narsa bosilganda hisob oshadi', async () => {
    setup();
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    const scene = await screen.findByRole('group', { name: 'Sanang' });
    const items = within(scene).getAllByRole('button');
    const user = userEvent.setup();
    await user.click(items[0]);
    await user.click(items[0]);
    expect(within(current()).getByTestId('count-total')).toHaveTextContent('1');
    await user.click(items[1]);
    await user.click(items[2]);
    expect(await screen.findByText(/Jami: 3 ta/)).toBeInTheDocument();
  });

  it('javob tanlash: xato — yumshoq ishora, to‘g‘ri — maqtov', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: '3-sahna' }));
    const user = userEvent.setup();
    await user.click(await screen.findByRole('button', { name: /1-variant: 3/ }));
    expect(await screen.findByText('Yana sanang')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /2-variant: 4/ }));
    expect(await screen.findByText('To‘g‘ri! Barakalla!')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Tugatish/ })).toBeInTheDocument();
  });

  it('J javobni ochadi', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: '3-sahna' }));
    await screen.findByText('2 + 2 = ?');
    fireEvent.keyDown(window, { key: 'j', code: 'KeyJ' });
    expect(await screen.findByText('To‘g‘ri javob')).toBeInTheDocument();
  });
});

describe('Player asboblari', () => {
  it('T asboblarni ochadi, Esc avval asboblarni yopadi', async () => {
    const { onExit } = setup();
    fireEvent.keyDown(window, { key: 't', code: 'KeyT' });
    expect(await screen.findByRole('tablist', { name: 'Asboblar' })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(onExit).not.toHaveBeenCalled();
    await waitFor(() => expect(screen.queryByRole('tablist', { name: 'Asboblar' })).toBeNull());
  });
});
