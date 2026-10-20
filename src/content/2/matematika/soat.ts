// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar soat millarini tanib, butun va yarim soatlarni aniqlaydi.',
    questions: [
      'Qaysi mil uzun, qaysi biri qisqa?',
      'Darsimiz soat nechada boshlanadi?',
      'Yarim soat necha daqiqa?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'tanishuv',
      type: 'explain',
      title: 'Soat bilan tanishamiz',
      steps: [
        { text: 'Soatda **12** ta raqam bor.', visual: { kind: 'clock', h: 12, m: 0 } },
        { text: '**Qisqa** mil — soatni ko‘rsatadi.' },
        { text: '**Uzun** mil — daqiqani ko‘rsatadi.' },
        { text: 'Uzun mil 12 da bo‘lsa — **butun soat**. Bu 3:00.', visual: { kind: 'clock', h: 3, m: 0 }, replace: true },
      ],
      hint: 'Haqiqiy soat bo‘lsa, uni ham ko‘rsating.',
    },
    { id: 'uch', type: 'clock', prompt: 'Soatni **3:00** ga qo‘ying', start: { h: 12, m: 0 }, target: { h: 3, m: 0 } },
    {
      id: 'nechada',
      type: 'choose-answer',
      question: 'Soat nechada?',
      visual: { kind: 'clock', h: 7, m: 0 },
      options: [{ label: '7:00' }, { label: '12:07' }, { label: '6:00' }],
      correct: 0,
      retryHint: 'Qisqa mil qaysi raqamda turibdi?',
    },
    {
      id: 'yarim',
      type: 'explain',
      title: 'Yarim soat',
      steps: [
        { text: 'Uzun mil **6** da bo‘lsa — **yarim** soat.', visual: { kind: 'clock', h: 2, m: 30 } },
        { text: 'Bu — **2:30**, ya’ni ikki yarim.', visual: { kind: 'tiles', items: ['2', ':', '30'] } },
      ],
    },
    {
      id: 'sakkiz-yarim',
      type: 'clock',
      prompt: 'Soatni **8:30** ga qo‘ying',
      start: { h: 12, m: 0 },
      target: { h: 8, m: 30 },
      hint: 'Uzun milni 6 ga, qisqasini 8 bilan 9 oralig‘iga qo‘yish kerak.',
    },
    {
      id: 'qaysi-soat',
      type: 'choose-answer',
      question: 'Qaysi soat **5:30** ni ko‘rsatyapti?',
      options: [
        { label: 'A', visual: { kind: 'clock', h: 6, m: 0 } },
        { label: 'B', visual: { kind: 'clock', h: 5, m: 30 } },
        { label: 'C', visual: { kind: 'clock', h: 5, m: 0 } },
      ],
      correct: 1,
      retryHint: 'Yarim soatda uzun mil qayerda bo‘ladi?',
    },
    {
      id: 'dars-vaqti',
      type: 'clock',
      prompt: 'Darsimiz soat nechada boshlanadi? Soatni qo‘ying.',
      start: { h: 8, m: 0 },
      showDigital: true,
      hint: 'To‘g‘ri javob maktabingiz jadvaliga bog‘liq — bolalar o‘zlari ko‘rsatsin.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Qisqa mil — **soat**, uzun mil — **daqiqa**.', 'Uzun mil 12 da — **butun** soat.', 'Uzun mil 6 da — **yarim** soat.'],
    },
  ],
});
