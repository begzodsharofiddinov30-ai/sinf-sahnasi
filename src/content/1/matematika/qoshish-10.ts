// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ikki guruhni birlashtirish orqali 10 ichida qo‘shishni tushunadi.',
    questions: [
      'Qo‘shganda narsalar ko‘payadimi yoki kamayadimi?',
      '2 + 3 va 3 + 2 ning javobi bir xilmi?',
      'Kundalik hayotda qachon qo‘shamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Qo‘shish nima?',
      steps: [
        { text: 'Savatda **2** ta olma bor.', visual: { kind: 'items', item: 'olma', count: 2 } },
        { text: 'Yana **3** ta olma qo‘shamiz.', visual: { kind: 'items', item: 'olma', count: 3 } },
        { text: 'Hammasi — **5** ta olma!', visual: { kind: 'tiles', items: ['2', '+', '3', '=', '5'], highlight: [4] } },
      ],
      hint: '“Qo‘shish” — birlashtirish, hammasini birga sanash.',
    },
    {
      id: 'qushlar',
      type: 'count-and-tap',
      prompt: '4 ta qush keldi, yana 2 tasi uchib keldi. Hammasini sanang!',
      item: 'qush',
      count: 6,
      layout: 'row',
    },
    {
      id: 'uch-bir',
      type: 'choose-answer',
      question: '3 + 1 = ?',
      visual: { kind: 'tiles', items: ['3', '+', '1', '=', '?'] },
      options: [{ label: '3' }, { label: '4' }, { label: '5' }],
      correct: 1,
      retryHint: '3 dan keyin qaysi son keladi?',
    },
    {
      id: 'orin',
      type: 'explain',
      title: 'O‘rnini almashtirsak',
      steps: [
        { text: '2 + 4 = 6', visual: { kind: 'tiles', items: ['2', '+', '4', '=', '6'] } },
        { text: '4 + 2 = 6', visual: { kind: 'tiles', items: ['4', '+', '2', '=', '6'] } },
        { text: 'Sonlar o‘rnini almashtirsak ham, **javob o‘zgarmaydi**!', visual: { kind: 'mascot', mood: 'happy' } },
      ],
    },
    {
      id: 'besh-ikki',
      type: 'choose-answer',
      question: '5 + 2 = ?',
      options: [{ label: '6' }, { label: '7' }, { label: '8' }],
      correct: 1,
      retryHint: '5 ni eslab qoling va yana 2 ta sanang: 6, 7…',
      timerSec: 30,
    },
    {
      id: 'on',
      type: 'choose-answer',
      question: 'Qaysi misolning javobi **10**?',
      options: [{ label: '6 + 3' }, { label: '5 + 5' }, { label: '4 + 4' }],
      correct: 1,
      retryHint: 'Har bir misolni barmoqlar bilan hisoblang.',
      explanation: '5 + 5 = 10. Ikki qo‘lda — o‘nta barmoq!',
    },
    {
      id: 'barglar',
      type: 'count-and-tap',
      prompt: '6 + 3: hamma barglarni sanang!',
      item: 'barg',
      count: 9,
      layout: 'scatter',
    },
    {
      id: 'oq-3-4',
      type: 'number-line',
      prompt: '3 + 4 = ? Oldinga sakrang!',
      min: 0,
      max: 10,
      start: 3,
      step: 1,
      answer: 7,
      retryHint: '3 dan boshlab 4 marta oldinga sakrang.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Barakalla!',
      points: ['Qo‘shganda narsalar **ko‘payadi**.', 'Son o‘qida qo‘shish — **oldinga** sakrash.', '2 + 3 = 3 + 2'],
      praise: 'Siz ajoyib hisobchisiz!',
    },
  ],
});
