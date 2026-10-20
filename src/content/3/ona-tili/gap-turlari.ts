// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar maqsadga ko‘ra gap turlarini farqlaydi va tinish belgisini to‘g‘ri qo‘yadi.',
    questions: [
      'Savol bersak, qanday gap bo‘ladi?',
      'Undov gapni qanday ohangda aytamiz?',
      'Har bir gap turiga misol keltiring.',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'turlar',
      type: 'explain',
      title: 'Gap turlari',
      steps: [
        { text: '**Darak gap** xabar beradi: «Bugun havo issiq.»', visual: { kind: 'tiles', items: ['.'] } },
        {
          text: '**So‘roq gap** savol beradi: «Sen qayerga borasan?»',
          visual: { kind: 'tiles', items: ['?'] },
        },
        {
          text: '**Undov gap** his-tuyg‘u bildiradi: «Voy, qanday chiroyli!»',
          visual: { kind: 'tiles', items: ['!'] },
        },
      ],
      hint: 'Bitta gapni uch xil ohangda aytib ko‘ring.',
    },
    {
      id: 'ajrat',
      type: 'sort-groups',
      prompt: 'Gap turini toping',
      groups: [{ label: 'Darak' }, { label: 'So‘roq' }, { label: 'Undov' }],
      items: [
        { label: 'Qush uchdi.', group: 0 },
        { label: 'Kim keldi?', group: 1 },
        { label: 'Qanday zo‘r!', group: 2 },
        { label: 'Men kitob o‘qidim.', group: 0 },
        { label: 'Soat necha?', group: 1 },
        { label: 'Rahmat, ustoz!', group: 2 },
      ],
    },
    {
      id: 'belgi',
      type: 'choose-answer',
      question: '«Sen ertak o‘qidingmi_» Oxiriga qaysi belgi?',
      options: [{ label: '?' }, { label: '.' }, { label: '!' }],
      correct: 0,
    },
    {
      id: 'undov',
      type: 'choose-answer',
      question: 'Qaysi gap **undov** gap?',
      options: [{ label: 'Vatanim, seni sevaman!' }, { label: 'Men maktabga boraman.' }, { label: 'Ismingiz nima?' }],
      correct: 0,
    },
    {
      id: 'belgilar',
      type: 'drag-match',
      prompt: 'Belgini gap turiga olib boring',
      pairs: [
        { item: { label: '.' }, target: { label: 'Darak' } },
        { item: { label: '?' }, target: { label: 'So‘roq' } },
        { item: { label: '!' }, target: { label: 'Undov' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Darak** — nuqta (.)', '**So‘roq** — so‘roq belgisi (?)', '**Undov** — undov belgisi (!)'],
    },
  ],
});
