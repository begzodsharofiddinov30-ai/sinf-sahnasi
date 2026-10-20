// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar to‘rt xonali sonlarni o‘qiydi, yozadi, xona birliklariga ajratadi va taqqoslaydi.',
    questions: ['3 527 sonida nechta yuzlik bor?', 'Ming nechta yuzlikdan iborat?', 'Ikki sonni qanday taqqoslaymiz?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'xonalar',
      type: 'explain',
      title: 'Ming va undan katta',
      steps: [
        {
          text: '**10 ta yuzlik = 1 minglik**: 1000',
          visual: { kind: 'tiles', items: ['10 × 100', '=', '1000'] },
        },
        {
          text: '**3 527** — 3 minglik, 5 yuzlik, 2 o‘nlik, 7 birlik.',
          visual: { kind: 'tiles', items: ['3', '5', '2', '7'], highlight: [1] },
          replace: true,
        },
        {
          text: 'Xonalar: **minglar**, **yuzlar**, **o‘nlar**, **birlar**.',
          visual: { kind: 'tiles', items: ['minglar', 'yuzlar', 'o‘nlar', 'birlar'] },
          replace: true,
        },
      ],
    },
    {
      id: 'yuzlik',
      type: 'choose-answer',
      question: '4 208 sonida nechta yuzlik bor?',
      options: [{ label: '2' }, { label: '4' }, { label: '0' }],
      correct: 0,
      retryHint: 'O‘ngdan hisoblang: birlar, o‘nlar, yuzlar…',
    },
    {
      id: 'katta',
      type: 'choose-answer',
      question: 'Qaysi son eng katta?',
      options: [{ label: '5 099' }, { label: '5 909' }, { label: '5 990' }],
      correct: 2,
      retryHint: 'Minglar teng. Endi yuzlarni, keyin o‘nlarni solishtiring.',
    },
    {
      id: 'yozish',
      type: 'drag-match',
      prompt: 'So‘z bilan yozilgan sonni raqamiga olib boring',
      pairs: [
        { item: { label: 'ikki ming besh yuz' }, target: { label: '2 500' } },
        { item: { label: 'bir ming o‘n' }, target: { label: '1 010' } },
        { item: { label: 'uch ming uch' }, target: { label: '3 003' } },
      ],
    },
    {
      id: 'ming',
      type: 'sort-groups',
      prompt: '1000 dan kattami yoki kichikmi?',
      groups: [{ label: '1000 dan kichik' }, { label: '1000 dan katta' }],
      items: [
        { label: '999', group: 0 },
        { label: '1 001', group: 1 },
        { label: '850', group: 0 },
        { label: '2 300', group: 1 },
        { label: '100', group: 0 },
        { label: '1 100', group: 1 },
      ],
    },
    {
      id: 'oq',
      type: 'number-line',
      prompt: '1000 dan ikkitalab sakrab **1008** ni toping',
      min: 1000,
      max: 1010,
      start: 1000,
      step: 2,
      answer: 1008,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**1000** = 10 ta yuzlik.',
        'Xonalar: minglar, yuzlar, o‘nlar, birlar.',
        'Taqqoslash **katta xonadan** boshlanadi.',
      ],
    },
  ],
});
