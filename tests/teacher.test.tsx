import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { loadTeacher, nameError, normalizeName } from '../src/app/teacher';
import { TeacherGate, TeacherProvider, useTeacher } from '../src/app/TeacherProvider';

function Hello() {
  const { teacher, signOut } = useTeacher();
  return (
    <div>
      <p>Salom, {teacher?.firstName} {teacher?.lastName}</p>
      <button onClick={signOut}>chiqish</button>
    </div>
  );
}

describe('o‘qituvchi ismi', () => {
  it('ismni tozalaydi va tekshiradi', () => {
    expect(normalizeName('  dilnoza   o‘ktamova ')).toBe('Dilnoza O‘ktamova');
    expect(nameError('A', 'Ism')).toMatch(/kamida 2/);
    expect(nameError('Ali3', 'Ism')).toMatch(/faqat harflar/);
    expect(nameError("G'ulom", 'Ism')).toBeNull();
    expect(nameError('Ibn-Sino', 'Familiya')).toBeNull();
    expect(nameError('x'.repeat(31), 'Ism')).toMatch(/30/);
  });

  it('roʻyxatdan oʻtmaguncha sayt ochilmaydi; parol soʻralmaydi', async () => {
    localStorage.removeItem('sinf-sahnasi:teacher');
    const user = userEvent.setup();
    render(
      <TeacherProvider>
        <TeacherGate>
          <Hello />
        </TeacherGate>
      </TeacherProvider>,
    );
    expect(screen.getByRole('heading', { name: 'Xush kelibsiz!' })).toBeInTheDocument();
    expect(document.querySelector('input[type="password"]')).toBeNull();
    expect(screen.getAllByRole('textbox')).toHaveLength(2);

    await user.click(screen.getByRole('button', { name: 'Kirish' }));
    expect(screen.getByText('Ism kamida 2 ta harf bo‘lsin')).toBeInTheDocument();

    await user.type(screen.getByLabelText('Ismingiz'), 'dilnoza');
    await user.type(screen.getByLabelText('Familiyangiz'), 'karimova');
    await user.click(screen.getByRole('button', { name: 'Kirish' }));
    expect(screen.getByText('Salom, Dilnoza Karimova')).toBeInTheDocument();
    expect(loadTeacher()).toMatchObject({ firstName: 'Dilnoza', lastName: 'Karimova' });

    await user.click(screen.getByRole('button', { name: 'chiqish' }));
    expect(screen.getByRole('heading', { name: 'Xush kelibsiz!' })).toBeInTheDocument();
    expect(loadTeacher()).toBeNull();
  });

  it('buzilgan saqlangan maʼlumot eʼtiborsiz qoldiriladi', () => {
    localStorage.setItem('sinf-sahnasi:teacher', JSON.stringify({ firstName: '1', lastName: 2 }));
    expect(loadTeacher()).toBeNull();
  });
});
