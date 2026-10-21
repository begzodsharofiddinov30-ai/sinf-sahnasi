// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar nuqta, so‘roq va undov belgilariga qarab gapni to‘g‘ri ohangda o‘qiydi.',
    questions: ['Nuqtada ovoz qanday bo‘ladi?', 'So‘roq gapni qanday o‘qiymiz?', 'Undov gapda ovoz qanday?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'ohang',
      type: 'explain',
      title: 'Ohang',
      steps: [
        { text: '**Nuqta (.)** — ovoz pasayadi, to‘xtaymiz.', visual: { kind: 'tiles', items: ['.'] } },
        { text: '**So‘roq (?)** — ovoz ko‘tariladi.', visual: { kind: 'tiles', items: ['?'] } },
        { text: '**Undov (!)** — his bilan, kuchliroq.', visual: { kind: 'tiles', items: ['!'] } },
      ],
      hint: 'Bitta gapni uch xil belgi bilan o‘qitib ko‘ring.',
    },
    {
      id: 'belgi',
      type: 'drag-match',
      prompt: 'Belgini ohangga olib boring',
      pairs: [
        { item: { label: '.' }, target: { label: 'ovoz pasayadi' } },
        { item: { label: '?' }, target: { label: 'ovoz ko‘tariladi' } },
        { item: { label: '!' }, target: { label: 'his bilan' } },
      ],
    },
    {
      id: 'soroq',
      type: 'choose-answer',
      question: '«Bugun maktabga borasanmi?» qanday o‘qiladi?',
      options: [{ label: 'Ovozni ko‘tarib, savol bilan' }, { label: 'Pasaytirib' }, { label: 'Baqirib' }],
      correct: 0,
    },
    {
      id: 'qaysi',
      type: 'sort-groups',
      prompt: 'Qanday o‘qiymiz?',
      groups: [{ label: 'Savol bilan' }, { label: 'His bilan' }],
      items: [
        { label: 'Kim keldi?', group: 0 },
        { label: 'Qanday chiroyli!', group: 1 },
        { label: 'Soat necha?', group: 0 },
        { label: 'Yashasin bayram!', group: 1 },
      ],
    },
    {
      id: 'vergul',
      type: 'choose-answer',
      question: 'Vergulda nima qilamiz?',
      options: [{ label: 'Qisqa to‘xtaymiz' }, { label: 'Uzoq to‘xtaymiz' }, { label: 'To‘xtamaymiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Tinish belgilari **ohang**ni ko‘rsatadi.', 'Ifodali o‘qish — **tushunib** o‘qish.'],
    },
  ],
});
