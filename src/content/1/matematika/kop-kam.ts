// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ikki guruhni solishtirib, “ko‘p”, “kam” va “teng” so‘zlarini to‘g‘ri ishlatadi.',
    questions: [
      'Sinfda qizlar ko‘pmi yoki o‘g‘il bolalar?',
      'Ikki guruh teng ekanini qanday bilamiz?',
      'Agar bitta olma qo‘shsak, guruh ko‘payadimi yoki kamayadimi?',
    ],
    minutes: 12,
  },
  scenes: [
    {
      id: 'kirish',
      type: 'explain',
      title: 'Ko‘p va kam',
      steps: [
        { text: 'Bu yerda **5** ta olma.', visual: { kind: 'items', item: 'olma', count: 5 } },
        { text: 'Bu yerda **2** ta olma.', visual: { kind: 'items', item: 'olma', count: 2 } },
        { text: '5 ta olma — **ko‘p**, 2 ta olma — **kam**.', visual: { kind: 'tiles', items: ['5', '>', '2'] } },
      ],
      hint: 'Ikki o‘quvchiga 5 va 2 ta qalam berib, sinfga ko‘rsating.',
    },
    {
      id: 'kop-baliq',
      type: 'choose-answer',
      question: 'Qaysi guruhda baliq **ko‘p**?',
      options: [
        { label: '1-guruh', visual: { kind: 'items', item: 'baliq', count: 3 } },
        { label: '2-guruh', visual: { kind: 'items', item: 'baliq', count: 6 } },
      ],
      correct: 1,
      retryHint: 'Har bir guruhni alohida sanab ko‘ring.',
      explanation: '6 ta baliq 3 ta baliqdan ko‘p.',
    },
    {
      id: 'gullar',
      type: 'count-and-tap',
      prompt: 'Gullarni sanang.',
      item: 'gul',
      count: 4,
      layout: 'row',
    },
    {
      id: 'kam-qush',
      type: 'choose-answer',
      question: 'Qaysi guruhda qush **kam**?',
      options: [
        { label: '1-guruh', visual: { kind: 'items', item: 'qush', count: 5 } },
        { label: '2-guruh', visual: { kind: 'items', item: 'qush', count: 2 } },
      ],
      correct: 1,
      retryHint: 'Kam — bu ozroq degani.',
    },
    {
      id: 'teng',
      type: 'explain',
      title: 'Teng',
      steps: [
        { text: '3 ta olma.', visual: { kind: 'items', item: 'olma', count: 3 } },
        { text: '3 ta nok.', visual: { kind: 'items', item: 'nok', count: 3 } },
        { text: 'Ular **teng**: har birida 3 tadan.', visual: { kind: 'tiles', items: ['3', '=', '3'] } },
      ],
      hint: 'Har bir olmani bitta nok bilan juftlab ko‘rsating.',
    },
    {
      id: 'yetti-tort',
      type: 'choose-answer',
      question: 'Qaysi son **katta**?',
      options: [{ label: '7' }, { label: '4' }],
      correct: 0,
      retryHint: 'Barmoqlar bilan sanab ko‘ring: qaysi biri ko‘proq?',
      timerSec: 20,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Barakalla!',
      points: ['Ko‘proq narsa — **ko‘p**.', 'Ozroq narsa — **kam**.', 'Bir xil bo‘lsa — **teng**.'],
    },
  ],
});
