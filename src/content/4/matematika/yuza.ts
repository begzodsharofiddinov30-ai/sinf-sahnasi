// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar yuza tushunchasini perimetrdan farqlaydi va to‘g‘ri to‘rtburchak yuzasini bo‘yi × eni bilan hisoblaydi.',
    questions: [
      'Yuza va perimetrning farqi nimada?',
      'Yuzani qanday birlikda o‘lchaymiz?',
      'Partangiz yuzasini qanday topasiz?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Yuza',
      steps: [
        { text: '**Yuza** — shakl egallagan joy.', visual: { kind: 'picture', item: 'kvadrat' } },
        {
          text: '3 qator, har birida 4 ta kvadrat santimetr — jami **12 sm²**.',
          visual: { kind: 'groups', item: 'kvadrat', groups: 3, each: 4 },
          replace: true,
        },
        {
          text: 'To‘g‘ri to‘rtburchak yuzasi = **bo‘yi × eni**: 4 × 3 = **12**',
          visual: { kind: 'tiles', items: ['4', '×', '3', '=', '12 sm²'] },
        },
      ],
      hint: 'Katakli daftarda to‘rtburchak chizib, kataklarni sanating.',
    },
    {
      id: 'besh-ikki',
      type: 'choose-answer',
      question: 'Bo‘yi 5 sm, eni 2 sm. Yuzasi?',
      visual: { kind: 'picture', item: 'tortburchak' },
      options: [{ label: '10 sm²' }, { label: '7 sm²' }, { label: '14 sm²' }],
      correct: 0,
    },
    {
      id: 'kvadrat',
      type: 'choose-answer',
      question: 'Tomoni 3 sm bo‘lgan kvadratning yuzasi?',
      visual: { kind: 'picture', item: 'kvadrat' },
      options: [{ label: '9 sm²' }, { label: '12 sm²' }, { label: '6 sm²' }],
      correct: 0,
    },
    {
      id: 'farq',
      type: 'choose-answer',
      question: 'Perimetr va yuzaning farqi?',
      options: [
        { label: 'Perimetr — chegara uzunligi, yuza — ichki joy' },
        { label: 'Ikkalasi bir xil' },
        { label: 'Yuza — tomonlar yig‘indisi' },
      ],
      correct: 0,
    },
    {
      id: 'hisob',
      type: 'drag-match',
      prompt: 'O‘lchamni yuzasiga olib boring',
      pairs: [
        { item: { label: '6 sm × 2 sm' }, target: { label: '12 sm²' } },
        { item: { label: '4 sm × 4 sm' }, target: { label: '16 sm²' } },
        { item: { label: '7 sm × 3 sm' }, target: { label: '21 sm²' } },
      ],
    },
    {
      id: 'kataklar',
      type: 'choose-answer',
      question: 'Rasmda nechta kvadrat santimetr bor?',
      visual: { kind: 'groups', item: 'kvadrat', groups: 2, each: 5 },
      options: [{ label: '10' }, { label: '7' }, { label: '12' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Yuza** — shakl egallagan joy, **sm²** da o‘lchanadi.', 'To‘g‘ri to‘rtburchak: **bo‘yi × eni**.'],
    },
  ],
});
