// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar bo‘lishni narsalarni teng guruhlarga taqsimlash sifatida tushunadi.',
    questions: [
      '6 ta qalamni 2 kishiga teng bo‘lsak, har biriga nechta tegadi?',
      'Teng bo‘lish nima degani?',
      'Bo‘lish va ko‘paytirish qanday bog‘liq?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'teng',
      type: 'explain',
      title: 'Teng bo‘lamiz',
      steps: [
        { text: '**6** ta olma bor.', visual: { kind: 'items', item: 'olma', count: 6 } },
        { text: 'Ularni **2** bolaga teng bo‘lamiz.', visual: { kind: 'groups', item: 'olma', groups: 2, each: 3 }, replace: true },
        { text: 'Har biriga **3** tadan: 6 : 2 = 3', visual: { kind: 'tiles', items: ['6', ':', '2', '=', '3'], highlight: [4] } },
      ],
      hint: '6 ta qalamni ikki o‘quvchiga navbatma-navbat tarqatib ko‘rsating.',
    },
    {
      id: 'sakkiz',
      type: 'choose-answer',
      question: '8 : 2 = ?',
      visual: { kind: 'groups', item: 'nok', groups: 2, each: 4 },
      options: [{ label: '4' }, { label: '6' }, { label: '10' }],
      correct: 0,
    },
    {
      id: 'yulduz',
      type: 'choose-answer',
      question: '15 ta yulduz 3 guruhga teng bo‘lindi. Har bir guruhda nechta?',
      visual: { kind: 'groups', item: 'yulduz', groups: 3, each: 5 },
      options: [{ label: '5' }, { label: '3' }, { label: '15' }],
      correct: 0,
      retryHint: 'Bitta guruhdagi yulduzlarni sanang.',
    },
    {
      id: 'boglanish',
      type: 'explain',
      title: 'Bo‘lish va ko‘paytirish',
      steps: [
        { text: '3 × 4 = 12', visual: { kind: 'groups', item: 'anor', groups: 3, each: 4 } },
        { text: 'Demak, 12 : 3 = **4**', visual: { kind: 'tiles', items: ['12', ':', '3', '=', '4'] } },
      ],
      hint: 'Bo‘lish — ko‘paytirishning teskarisi.',
    },
    {
      id: 'moslash',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '12 : 3' }, target: { label: '4' } },
        { item: { label: '10 : 2' }, target: { label: '5' } },
        { item: { label: '9 : 3' }, target: { label: '3' } },
      ],
      retryHint: 'Ko‘paytirish jadvalini eslang: 3 × ? = 12',
    },
    {
      id: 'qalam',
      type: 'choose-answer',
      question: '18 ta qalamni 3 ta qutiga teng solsak, har birida nechta bo‘ladi?',
      visual: { kind: 'picture', item: 'qalam' },
      options: [{ label: '6' }, { label: '5' }, { label: '9' }],
      correct: 0,
      timerSec: 45,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Bo‘lish — **teng** taqsimlash.', '6 : 2 = 3', 'Bo‘lishni **ko‘paytirish** bilan tekshiramiz.'],
    },
  ],
});
