import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { AppRoutes, ROUTER_FUTURE } from '../src/app/App';
import { SettingsProvider } from '../src/app/SettingsProvider';
import { ToolsProvider } from '../src/tools/ToolsProvider';

function renderAt(path: string) {
  return render(
    <SettingsProvider>
      <ToolsProvider>
        <MemoryRouter initialEntries={[path]} future={ROUTER_FUTURE}>
          <AppRoutes />
        </MemoryRouter>
      </ToolsProvider>
    </SettingsProvider>,
  );
}

describe('sahifalar', () => {
  it('bosh sahifada 4 ta sinf tugmasi bor', () => {
    renderAt('/');
    const nav = screen.getByRole('navigation', { name: 'Sinflar' });
    expect(nav.querySelectorAll('a')).toHaveLength(4);
  });

  it('fan sahifasida qidiruv va sevimlilar ishlaydi', async () => {
    renderAt('/sinf/1/matematika');
    const user = userEvent.setup();
    expect(screen.getAllByRole('listitem')).toHaveLength(4);
    await user.type(screen.getByRole('searchbox'), "qo'shish");
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    await user.clear(screen.getByRole('searchbox'));
    await user.click(screen.getByRole('button', { name: /Ko‘p – kam – teng — sevimlilarga/ }));
    await user.click(screen.getByRole('button', { name: 'Sevimlilar' }));
    expect(screen.getAllByRole('listitem')).toHaveLength(1);
    expect(localStorage.getItem('sinf-sahnasi:favourites')).toContain('1/matematika/kop-kam');
  });

  it('mavzu sahifasi o‘qituvchi eslatmalarini ko‘rsatadi', async () => {
    renderAt('/sinf/1/matematika/sonlar-1-10');
    expect(await screen.findByText('Dars maqsadi')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
    expect(screen.getByRole('button', { name: /Darsni boshlash/ })).toBeEnabled();
  });

  it('noto‘g‘ri manzilda do‘stona xabar', () => {
    renderAt('/sinf/9');
    expect(screen.getByText('Bunday sahifa topilmadi.')).toBeInTheDocument();
  });
});
