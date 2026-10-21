// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar to‘rt ufq tomonini biladi va Quyosh orqali yo‘nalishni aniqlaydi.',
    questions: ['Quyosh qayerdan chiqadi?', 'Kompas nima uchun kerak?', 'Maktabimiz uyingizning qaysi tomonida?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'tomon',
      type: 'explain',
      title: 'To‘rt tomon',
      steps: [
        {
          text: 'Ufq tomonlari: **shimol, janub, sharq, g‘arb**.',
          visual: { kind: 'tiles', items: ['shimol', 'janub', 'sharq', 'g‘arb'] },
        },
        { text: 'Quyosh **sharq**dan chiqadi.', visual: { kind: 'picture', item: 'quyosh' }, replace: true },
        { text: 'Quyosh **g‘arb**ga botadi.', visual: { kind: 'picture', item: 'oy' }, replace: true },
      ],
      hint: 'Sinfda sharq tomonini ko‘rsatib, devorlarga nom qo‘ying.',
    },
    {
      id: 'chiqish',
      type: 'choose-answer',
      question: 'Quyosh qayerdan chiqadi?',
      options: [{ label: 'Sharqdan' }, { label: 'G‘arbdan' }, { label: 'Shimoldan' }],
      correct: 0,
    },
    {
      id: 'botish',
      type: 'choose-answer',
      question: 'Quyosh qayerga botadi?',
      options: [{ label: 'G‘arbga' }, { label: 'Sharqqa' }, { label: 'Janubga' }],
      correct: 0,
    },
    {
      id: 'qarama',
      type: 'drag-match',
      prompt: 'Qarama-qarshi tomonni toping',
      pairs: [
        { item: { label: 'shimol' }, target: { label: 'janub' } },
        { item: { label: 'sharq' }, target: { label: 'g‘arb' } },
      ],
    },
    {
      id: 'kompas',
      type: 'choose-answer',
      question: 'Yo‘nalishni qaysi asbob ko‘rsatadi?',
      options: [{ label: 'Kompas' }, { label: 'Soat' }, { label: 'Termometr' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['To‘rt tomon: **shimol, janub, sharq, g‘arb**.', 'Quyosh **sharqdan** chiqadi, **g‘arbga** botadi.'],
    },
  ],
});
