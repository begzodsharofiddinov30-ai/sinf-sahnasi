// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar 6–9 ga ko‘paytirish jadvalini o‘rin almashtirish va qulay usullar bilan mustahkamlaydi.',
    questions: [
      '7 × 8 ni qanday eslab qolasiz?',
      '9 jadvalining qanday siri bor?',
      'O‘rin almashtirish qanday yordam beradi?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'usullar',
      type: 'explain',
      title: 'Qulay usullar',
      steps: [
        {
          text: '6 ta guruh, har birida 7 tadan: **6 × 7 = 42**',
          visual: { kind: 'groups', item: 'anor', groups: 6, each: 7 },
        },
        {
          text: 'O‘rin almashtirsak ham: 7 × 6 = **42**',
          visual: { kind: 'tiles', items: ['7', '×', '6', '=', '42'] },
          replace: true,
        },
        {
          text: '9 jadvali siri: 9 × 3 = **27**, 2 + 7 = 9',
          visual: { kind: 'tiles', items: ['9', '×', '3', '=', '27'] },
          replace: true,
        },
      ],
    },
    {
      id: 'jadval',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '6 × 8' }, target: { label: '48' } },
        { item: { label: '7 × 7' }, target: { label: '49' } },
        { item: { label: '8 × 9' }, target: { label: '72' } },
        { item: { label: '9 × 6' }, target: { label: '54' } },
      ],
    },
    {
      id: 'yetti-sakkiz',
      type: 'choose-answer',
      question: '7 × 8 = ?',
      options: [{ label: '56' }, { label: '54' }, { label: '64' }],
      correct: 0,
      retryHint: '7 × 7 = 49. Yana 7 qo‘shing.',
    },
    {
      id: 'sakkiz-olti',
      type: 'choose-answer',
      question: '8 × 6 = ?',
      options: [{ label: '48' }, { label: '46' }, { label: '42' }],
      correct: 0,
      timerSec: 20,
    },
    {
      id: 'masala',
      type: 'choose-answer',
      question: 'Har bir qutida 9 ta qalam. 4 ta qutida nechta qalam bor?',
      visual: { kind: 'groups', item: 'qalam', groups: 4, each: 9 },
      options: [{ label: '36' }, { label: '13' }, { label: '32' }],
      correct: 0,
    },
    {
      id: 'oltilab',
      type: 'number-line',
      prompt: 'Oltitalab sakrang: 6 × 3 = ?',
      min: 0,
      max: 18,
      start: 0,
      step: 6,
      answer: 18,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['6 × 7 = **42**, 7 × 8 = **56**, 8 × 9 = **72**', 'O‘rin almashsa, javob **o‘zgarmaydi**.'],
    },
  ],
});
