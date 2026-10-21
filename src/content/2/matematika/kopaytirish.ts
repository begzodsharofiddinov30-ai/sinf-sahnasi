// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ko‘paytirishni bir xil qo‘shiluvchilarni qo‘shish sifatida tushunadi va × belgisini o‘qiydi.',
    questions: [
      '3 ta likopchada 2 tadan olma bo‘lsa, hammasi nechta?',
      '“3 × 2” qanday o‘qiladi?',
      'Ko‘paytirish qo‘shishdan nimasi bilan qulay?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Ko‘paytirish',
      steps: [
        {
          text: '3 ta guruhda **2 tadan** olma.',
          visual: { kind: 'groups', item: 'olma', groups: 3, each: 2 },
        },
        {
          text: 'Qo‘shamiz: 2 + 2 + 2 = **6**',
          visual: { kind: 'tiles', items: ['2', '+', '2', '+', '2', '=', '6'] },
        },
        {
          text: 'Qisqacha: **3 × 2 = 6** («3 marta 2 dan»)',
          visual: { kind: 'tiles', items: ['3', '×', '2', '=', '6'], highlight: [4] },
          replace: true,
        },
      ],
      hint: '× belgisini “marta” deb o‘qiting.',
    },
    {
      id: 'qoshish',
      type: 'choose-answer',
      question: '2 + 2 + 2 + 2 ni ko‘paytirish bilan qanday yozamiz?',
      options: [{ label: '4 × 2' }, { label: '2 + 4' }, { label: '4 + 2' }],
      correct: 0,
    },
    {
      id: 'rasm',
      type: 'choose-answer',
      question: 'Rasmga qaysi misol mos?',
      visual: { kind: 'groups', item: 'gul', groups: 4, each: 3 },
      options: [{ label: '4 × 3' }, { label: '4 + 3' }, { label: '3 + 3' }],
      correct: 0,
    },
    {
      id: 'ikkilab',
      type: 'number-line',
      prompt: '2 × 5 = ? Ikkitalab 5 marta sakrang',
      min: 0,
      max: 10,
      start: 0,
      step: 2,
      answer: 10,
    },
    {
      id: 'javob',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '2 × 3' }, target: { label: '6' } },
        { item: { label: '3 × 3' }, target: { label: '9' } },
        { item: { label: '2 × 4' }, target: { label: '8' } },
        { item: { label: '5 × 2' }, target: { label: '10' } },
      ],
    },
    {
      id: 'baliqlar',
      type: 'count-and-tap',
      prompt: '3 ta akvariumda 3 tadan baliq. Hammasini sanang!',
      item: 'baliq',
      count: 9,
      layout: 'row',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ko‘paytirish — **teng guruhlarni** tez sanash.', '3 × 2 = 2 + 2 + 2 = **6**'],
    },
  ],
});
