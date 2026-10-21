// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar uch xonali sonlarni o‘qiydi, xona birliklariga ajratadi va taqqoslaydi.',
    questions: ['345 sonida nechta yuzlik bor?', '100 nechta o‘nlikdan iborat?', 'Qaysi son katta: 509 yoki 590?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'xona',
      type: 'explain',
      title: 'Yuzlik',
      steps: [
        {
          text: '**10 ta o‘nlik = 1 yuzlik**: 100',
          visual: { kind: 'tiles', items: ['10 × 10', '=', '100'] },
        },
        {
          text: '**345** — 3 yuzlik, 4 o‘nlik, 5 birlik.',
          visual: { kind: 'tiles', items: ['3', '4', '5'], highlight: [0] },
          replace: true,
        },
        {
          text: '345 = 300 + 40 + 5',
          visual: { kind: 'tiles', items: ['300', '+', '40', '+', '5'] },
          replace: true,
        },
      ],
    },
    {
      id: 'yuzlik',
      type: 'choose-answer',
      question: '672 sonida nechta yuzlik bor?',
      options: [{ label: '6' }, { label: '7' }, { label: '2' }],
      correct: 0,
    },
    {
      id: 'katta',
      type: 'choose-answer',
      question: 'Qaysi son katta?',
      options: [{ label: '590' }, { label: '509' }, { label: '95' }],
      correct: 0,
      retryHint: 'Avval yuzlarni, keyin o‘nlarni taqqoslang.',
    },
    {
      id: 'yoyish',
      type: 'drag-match',
      prompt: 'Sonni yoyilmasiga olib boring',
      pairs: [
        { item: { label: '458' }, target: { label: '400 + 50 + 8' } },
        { item: { label: '307' }, target: { label: '300 + 7' } },
        { item: { label: '920' }, target: { label: '900 + 20' } },
      ],
    },
    {
      id: 'oq',
      type: 'number-line',
      prompt: '100 dan keyingi sonlar: **107** ni toping',
      min: 100,
      max: 110,
      start: 100,
      step: 1,
      answer: 107,
    },
    {
      id: 'soz',
      type: 'choose-answer',
      question: '“Uch yuz o‘n ikki” raqamda qanday yoziladi?',
      options: [{ label: '312' }, { label: '3012' }, { label: '302' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**100** = 10 ta o‘nlik.', '345 = **3** yuzlik + **4** o‘nlik + **5** birlik.'],
    },
  ],
});
