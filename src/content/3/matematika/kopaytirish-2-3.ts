// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ko‘paytirishni teng guruhlarni qo‘shish sifatida tushunadi (2 va 3 jadvali).',
    questions: [
      '3 ta likopchada 2 tadan olma bor. Hammasi nechta?',
      '2 × 4 va 4 × 2 ning javobi bir xilmi?',
      'Ko‘paytirish qo‘shishdan nimasi bilan qulay?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'teng-guruh',
      type: 'explain',
      title: 'Ko‘paytirish nima?',
      steps: [
        { text: '3 ta likopchada **2 tadan** olma.', visual: { kind: 'groups', item: 'olma', groups: 3, each: 2 } },
        { text: 'Qo‘shamiz: 2 + 2 + 2 = **6**', visual: { kind: 'tiles', items: ['2', '+', '2', '+', '2', '=', '6'] } },
        { text: 'Qisqaroq: 3 × 2 = **6**', visual: { kind: 'tiles', items: ['3', '×', '2', '=', '6'], highlight: [4] }, replace: true },
      ],
      hint: '“3 marta 2 dan” deb o‘qing.',
    },
    {
      id: 'rasmga-mos',
      type: 'choose-answer',
      question: 'Qaysi misol rasmga mos?',
      visual: { kind: 'groups', item: 'yulduz', groups: 4, each: 3 },
      options: [{ label: '4 × 3' }, { label: '4 + 3' }, { label: '3 × 3' }],
      correct: 0,
      retryHint: 'Nechta guruh bor? Har birida nechta?',
    },
    {
      id: 'uchlab',
      type: 'number-line',
      prompt: '3 × 4 = ? Uchtalab 4 marta sakrang',
      min: 0,
      max: 18,
      start: 0,
      step: 3,
      answer: 12,
    },
    {
      id: 'jadval',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '2 × 5' }, target: { label: '10' } },
        { item: { label: '3 × 3' }, target: { label: '9' } },
        { item: { label: '2 × 7' }, target: { label: '14' } },
        { item: { label: '3 × 6' }, target: { label: '18' } },
      ],
      retryHint: 'Barmoqlar bilan sanab ko‘ring: 3, 6, 9…',
    },
    {
      id: 'orin',
      type: 'explain',
      title: 'O‘rnini almashtirsak',
      steps: [
        { text: '2 × 3 = 6', visual: { kind: 'groups', item: 'gul', groups: 2, each: 3 } },
        { text: '3 × 2 = 6', visual: { kind: 'groups', item: 'gul', groups: 3, each: 2 } },
        { text: 'Javob **bir xil**!', visual: { kind: 'mascot', mood: 'happy' }, replace: true },
      ],
    },
    {
      id: 'ikki-toqqiz',
      type: 'choose-answer',
      question: '2 × 9 = ?',
      options: [{ label: '11' }, { label: '18' }, { label: '16' }],
      correct: 1,
      timerSec: 20,
    },
    {
      id: 'uch-yetti',
      type: 'choose-answer',
      question: '3 × 7 = ?',
      options: [{ label: '21' }, { label: '24' }, { label: '10' }],
      correct: 0,
      retryHint: '3 × 6 = 18. Yana 3 qo‘shing.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ko‘paytirish — **teng guruhlarni** tez sanash.', '3 × 2 = 2 + 2 + 2', 'O‘rnini almashtirsak, javob **o‘zgarmaydi**.'],
    },
  ],
});
