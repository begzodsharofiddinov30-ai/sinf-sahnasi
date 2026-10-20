// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ikki xonali sonlarni xonama-xona ayiradi (o‘tishsiz) va masalalarda qo‘llaydi.',
    questions: [
      'Avval qaysi xonani ayiramiz?',
      '47 − 23 ni qanday hisoblaymiz?',
      'Javobni qo‘shish bilan qanday tekshiramiz?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'usul',
      type: 'explain',
      title: '47 − 23',
      steps: [
        { text: '**47** — 4 o‘nlik va 7 birlik.', visual: { kind: 'blocks', tens: 4, ones: 7 } },
        {
          text: 'Birliklar: 7 − 3 = **4**',
          visual: { kind: 'tiles', items: ['7', '−', '3', '=', '4'] },
          replace: true,
        },
        {
          text: 'O‘nliklar: 40 − 20 = **20**',
          visual: { kind: 'tiles', items: ['40', '−', '20', '=', '20'] },
        },
        { text: 'Javob: **24**', visual: { kind: 'blocks', tens: 2, ones: 4 }, replace: true },
      ],
      hint: 'Tekshirish: 24 + 23 = 47.',
    },
    {
      id: 'ellik-sakkiz',
      type: 'choose-answer',
      question: '58 − 26 = ?',
      options: [{ label: '32' }, { label: '34' }, { label: '22' }],
      correct: 0,
      retryHint: 'Avval birliklar: 8 − 6. Keyin o‘nliklar: 50 − 20.',
    },
    {
      id: 'oq-10',
      type: 'number-line',
      prompt: '35 − 10 = ? Bitta o‘nlik orqaga sakrang',
      min: 20,
      max: 40,
      start: 35,
      step: -10,
      answer: 25,
    },
    {
      id: 'moslash',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '60 − 20' }, target: { label: '40' } },
        { item: { label: '45 − 15' }, target: { label: '30' } },
        { item: { label: '78 − 5' }, target: { label: '73' } },
      ],
    },
    {
      id: 'masala',
      type: 'choose-answer',
      question: 'Kutubxonada 48 ta kitob bor edi. 15 tasini o‘quvchilar olib ketishdi. Nechta qoldi?',
      visual: { kind: 'picture', item: 'kitob' },
      options: [{ label: '33' }, { label: '63' }, { label: '23' }],
      correct: 0,
      timerSec: 60,
    },
    {
      id: 'yigirma',
      type: 'sort-groups',
      prompt: 'Javobi 20 dan kattami yoki kichikmi?',
      groups: [{ label: '20 dan kichik' }, { label: '20 dan katta' }],
      items: [
        { label: '50 − 20', group: 1 },
        { label: '35 − 20', group: 0 },
        { label: '46 − 6', group: 1 },
        { label: '29 − 14', group: 0 },
        { label: '88 − 8', group: 1 },
        { label: '17 − 7', group: 0 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Birliklardan **birliklarni** ayiramiz.',
        'O‘nliklardan **o‘nliklarni** ayiramiz.',
        'Javobni **qo‘shish** bilan tekshiramiz.',
      ],
    },
  ],
});
