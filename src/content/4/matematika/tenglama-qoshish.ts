// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar noma’lum qo‘shiluvchi, kamayuvchi va ayiriluvchili tenglamalarni yechadi va javobni tekshiradi.',
    questions: ['Tenglama nima?', 'x + 5 = 12 da x ni qanday topamiz?', 'Javobni qanday tekshiramiz?'],
    minutes: 25,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Tenglama',
      steps: [
        {
          text: '**Tenglama** — noma’lum son (x) qatnashgan tenglik.',
          visual: { kind: 'tiles', items: ['x', '+', '5', '=', '12'], highlight: [0] },
        },
        {
          text: 'Noma’lum qo‘shiluvchi = yig‘indi − ma’lum qo‘shiluvchi',
          visual: { kind: 'tiles', items: ['x', '=', '12 − 5', '=', '7'] },
          replace: true,
        },
        {
          text: 'Tekshiramiz: 7 + 5 = 12 ✓',
          visual: { kind: 'tiles', items: ['7', '+', '5', '=', '12'] },
          replace: true,
        },
      ],
      hint: 'Tarozi misolida tushuntiring: ikki palla teng bo‘lishi kerak.',
    },
    {
      id: 't1',
      type: 'choose-answer',
      question: 'x + 8 = 15. x = ?',
      options: [{ label: '7' }, { label: '23' }, { label: '8' }],
      correct: 0,
      retryHint: 'Yig‘indidan ma’lum qo‘shiluvchini ayiring: 15 − 8.',
    },
    {
      id: 't2',
      type: 'choose-answer',
      question: 'x − 4 = 10. x = ?',
      options: [{ label: '14' }, { label: '6' }, { label: '40' }],
      correct: 0,
      explanation: 'Noma’lum kamayuvchi = ayirma + ayiriluvchi: 10 + 4 = 14.',
    },
    {
      id: 't3',
      type: 'choose-answer',
      question: '15 − x = 6. x = ?',
      options: [{ label: '9' }, { label: '21' }, { label: '6' }],
      correct: 0,
      explanation: 'Noma’lum ayiriluvchi = kamayuvchi − ayirma: 15 − 6 = 9.',
    },
    {
      id: 'javob',
      type: 'drag-match',
      prompt: 'Tenglamani yechimiga olib boring',
      pairs: [
        { item: { label: 'x + 20 = 50' }, target: { label: 'x = 30' } },
        { item: { label: 'x − 7 = 13' }, target: { label: 'x = 20' } },
        { item: { label: '40 − x = 25' }, target: { label: 'x = 15' } },
      ],
    },
    {
      id: 'tenglamami',
      type: 'sort-groups',
      prompt: 'Tenglamami?',
      groups: [{ label: 'Tenglama' }, { label: 'Tenglama emas' }],
      items: [
        { label: 'x + 2 = 9', group: 0 },
        { label: '5 + 2 = 7', group: 1 },
        { label: 'a − 3 = 4', group: 0 },
        { label: '8 > 5', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Tenglamada **noma’lum** son bor.',
        'x + 5 = 12 → x = 12 − 5 = **7**',
        'Javobni doim **tekshiramiz**.',
      ],
    },
  ],
});
