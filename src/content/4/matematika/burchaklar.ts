// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar burchak turlarini farqlaydi va to‘g‘ri burchakni atrofdagi narsalarda topadi.',
    questions: [
      'To‘g‘ri burchak qayerda uchraydi?',
      'O‘tkir burchak qanday?',
      'Soat 3:00 da millar qanday burchak hosil qiladi?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'tur',
      type: 'explain',
      title: 'Burchak turlari',
      steps: [
        {
          text: '**To‘g‘ri** burchak — 90°. Kvadratning burchaklari.',
          visual: { kind: 'picture', item: 'kvadrat' },
        },
        {
          text: '**O‘tkir** burchak — to‘g‘ri burchakdan kichik.',
          visual: { kind: 'picture', item: 'uchburchak' },
          replace: true,
        },
        {
          text: '**O‘tmas** burchak — to‘g‘ri burchakdan katta.',
          visual: { kind: 'mascot', mood: 'think' },
          replace: true,
        },
      ],
    },
    {
      id: 'soat3',
      type: 'choose-answer',
      question: 'Soat 3:00 da millar qanday burchak hosil qiladi?',
      visual: { kind: 'clock', h: 3, m: 0 },
      options: [{ label: 'To‘g‘ri' }, { label: 'O‘tkir' }, { label: 'O‘tmas' }],
      correct: 0,
    },
    {
      id: 'soat1',
      type: 'choose-answer',
      question: 'Soat 1:00 da millar qanday burchak hosil qiladi?',
      visual: { kind: 'clock', h: 1, m: 0 },
      options: [{ label: 'O‘tkir' }, { label: 'To‘g‘ri' }, { label: 'O‘tmas' }],
      correct: 0,
    },
    {
      id: 'soat5',
      type: 'choose-answer',
      question: 'Soat 5:00 da-chi?',
      visual: { kind: 'clock', h: 5, m: 0 },
      options: [{ label: 'O‘tmas' }, { label: 'O‘tkir' }, { label: 'To‘g‘ri' }],
      correct: 0,
    },
    {
      id: 'kvadrat',
      type: 'choose-answer',
      question: 'Kvadratda nechta to‘g‘ri burchak bor?',
      visual: { kind: 'picture', item: 'kvadrat' },
      options: [{ label: '4' }, { label: '2' }, { label: '3' }],
      correct: 0,
    },
    {
      id: 'qayerda',
      type: 'sort-groups',
      prompt: 'To‘g‘ri burchak bormi?',
      groups: [{ label: 'Bor' }, { label: 'Yo‘q' }],
      items: [
        { label: 'daftar varag‘i', group: 0 },
        { label: 'doska', group: 0 },
        { label: 'koptok', group: 1 },
        { label: 'tanga', group: 1 },
        { label: 'eshik', group: 0 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['To‘g‘ri burchak — **90°**.', 'O‘tkir — **kichik**, o‘tmas — **katta**.'],
    },
  ],
});
