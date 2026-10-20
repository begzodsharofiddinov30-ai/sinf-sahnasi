// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar oddiy masalada nima berilganini va nimani topish kerakligini aniqlab, qo‘shish yoki ayirishni tanlaydi.',
    questions: ['Masalada nima ma’lum?', 'Nimani topish kerak?', 'Qachon qo‘shamiz, qachon ayiramiz?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qanday',
      type: 'explain',
      title: 'Masala qanday yechiladi?',
      steps: [
        { text: '**1.** Masalani diqqat bilan tinglaymiz.', visual: { kind: 'mascot', mood: 'think' } },
        { text: '**2.** Nima ma’lum? Nimani topish kerak?' },
        {
          text: '**3.** Ko‘paydimi — **qo‘shamiz**. Kamaydimi — **ayiramiz**.',
          visual: { kind: 'tiles', items: ['+', 'yoki', '−'] },
          replace: true,
        },
      ],
    },
    {
      id: 'olma-masala',
      type: 'story',
      title: 'Bo‘tajonning olmalari',
      pages: [
        { text: 'Bo‘tajonda **3** ta olma bor edi.', visual: { kind: 'items', item: 'olma', count: 3 } },
        { text: 'Do‘sti unga yana **2** ta olma berdi.', visual: { kind: 'items', item: 'olma', count: 2 } },
        { text: 'Bo‘tajonda endi nechta olma bo‘ldi?', visual: { kind: 'mascot', mood: 'think' } },
      ],
    },
    {
      id: 'javob-5',
      type: 'choose-answer',
      question: '3 + 2 = ?',
      visual: { kind: 'tiles', items: ['3', '+', '2', '=', '?'] },
      options: [{ label: '4' }, { label: '5' }, { label: '6' }],
      correct: 1,
      explanation: 'Bo‘tajonda 5 ta olma bo‘ldi.',
    },
    {
      id: 'qushlar',
      type: 'choose-answer',
      question: 'Daraxtda **6** ta qush bor edi. **2** tasi uchib ketdi. Nechta qoldi?',
      visual: { kind: 'items', item: 'qush', count: 6 },
      options: [{ label: '4' }, { label: '8' }, { label: '3' }],
      correct: 0,
      retryHint: 'Qushlar ko‘paydimi yoki kamaydimi?',
    },
    {
      id: 'amal',
      type: 'choose-answer',
      question: '«Savatda 4 ta nok bor edi, yana 3 tasini qo‘ydik.» Qaysi amal kerak?',
      options: [{ label: 'Qo‘shish (+)' }, { label: 'Ayirish (−)' }],
      correct: 0,
    },
    {
      id: 'baliqlar',
      type: 'count-and-tap',
      prompt: '5 ta baliq bor edi, yana 3 tasi suzib keldi. Hammasini sanang!',
      item: 'baliq',
      count: 8,
      layout: 'row',
    },
    {
      id: 'gullar',
      type: 'number-line',
      prompt: '7 ta gul bor edi, 3 tasini uzdik. Nechta qoldi?',
      min: 0,
      max: 10,
      start: 7,
      step: -1,
      answer: 4,
      retryHint: '7 dan boshlab 3 marta orqaga sakrang.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Avval **nima ma’lum**, keyin **nimani topish** kerakligini aniqlaymiz.',
        'Ko‘paysa — **qo‘shamiz**, kamaysa — **ayiramiz**.',
      ],
    },
  ],
});
