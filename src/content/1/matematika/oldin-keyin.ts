// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar 1–20 sonlar qatorida sondan oldingi, keyingi va orasidagi sonni topadi.',
    questions: ['5 dan keyin qaysi son keladi?', '8 dan oldin qaysi son turadi?', '3 va 5 orasida qaysi son bor?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qoshni',
      type: 'explain',
      title: 'Sonning qo‘shnilari',
      steps: [
        {
          text: '**Keyingi** son — bittaga ko‘p: 5 dan keyin **6**.',
          visual: { kind: 'tiles', items: ['5', '6'], highlight: [1] },
        },
        {
          text: '**Oldingi** son — bittaga kam: 5 dan oldin **4**.',
          visual: { kind: 'tiles', items: ['4', '5'], highlight: [0] },
          replace: true,
        },
        {
          text: '4 va 6 **orasida** — 5.',
          visual: { kind: 'tiles', items: ['4', '5', '6'], highlight: [1] },
          replace: true,
        },
      ],
      hint: 'Bolalarni qatorga tizib, “kim kimdan keyin turibdi?” deb so‘rang.',
    },
    {
      id: 'keyin',
      type: 'choose-answer',
      question: '**7** dan keyin qaysi son keladi?',
      options: [{ label: '6' }, { label: '8' }, { label: '9' }],
      correct: 1,
    },
    {
      id: 'oldin',
      type: 'choose-answer',
      question: '**10** dan oldin qaysi son turadi?',
      options: [{ label: '9' }, { label: '11' }, { label: '8' }],
      correct: 0,
    },
    {
      id: 'orasida',
      type: 'number-line',
      prompt: '**12** va **14** orasidagi sonni bosing',
      min: 10,
      max: 20,
      start: 12,
      step: 1,
      answer: 13,
    },
    {
      id: 'oldin-keyin',
      type: 'sort-groups',
      prompt: '9 ning qo‘shnisimi?',
      groups: [{ label: '9 ning qo‘shnisi' }, { label: 'Qo‘shnisi emas' }],
      items: [
        { label: '8', group: 0 },
        { label: '10', group: 0 },
        { label: '7', group: 1 },
        { label: '12', group: 1 },
        { label: '5', group: 1 },
      ],
    },
    {
      id: 'yoqolgan',
      type: 'choose-answer',
      question: 'Qaysi son tushib qolgan? 15, 16, __, 18',
      visual: { kind: 'tiles', items: ['15', '16', '?', '18'] },
      options: [{ label: '17' }, { label: '19' }, { label: '14' }],
      correct: 0,
      timerSec: 20,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Keyingi** son — bittaga ko‘p.',
        '**Oldingi** son — bittaga kam.',
        'Ikki son **orasida** — o‘rtadagi son.',
      ],
    },
  ],
});
