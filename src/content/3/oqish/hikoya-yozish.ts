// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar reja asosida qisqa hikoya tuzadi.',
    questions: ['Hikoyani nimadan boshlaymiz?', 'Qahramoningiz kim?', 'Hikoyangiz qanday tugaydi?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qadam',
      type: 'explain',
      title: 'Hikoya yozish',
      steps: [
        { text: '**1.** Mavzu va qahramonni tanlaymiz.', visual: { kind: 'mascot', mood: 'think' } },
        {
          text: '**2.** Reja: boshlanish, voqea, yakun.',
          visual: { kind: 'tiles', items: ['1', '2', '3'] },
          replace: true,
        },
        {
          text: '**3.** Yozib, **tekshiramiz**: bosh harf, nuqta.',
          visual: { kind: 'picture', item: 'qalam' },
          replace: true,
        },
      ],
    },
    {
      id: 'birinchi',
      type: 'choose-answer',
      question: 'Hikoya yozishda birinchi qadam?',
      options: [{ label: 'Mavzu va qahramonni tanlash' }, { label: 'Darhol yozish' }, { label: 'Rasm chizish' }],
      correct: 0,
    },
    {
      id: 'reja',
      type: 'drag-match',
      prompt: 'Reja qismini tasviriga olib boring',
      pairs: [
        { item: { label: 'Boshlanish' }, target: { label: 'Qahramon bilan tanishamiz' } },
        { item: { label: 'Voqea' }, target: { label: 'Qiziq narsa yuz beradi' } },
        { item: { label: 'Yakun' }, target: { label: 'Voqea qanday tugadi' } },
      ],
    },
    {
      id: 'tekshir',
      type: 'choose-answer',
      question: 'Yozib bo‘lgach nima qilamiz?',
      options: [{ label: 'Xatolarni tekshiramiz' }, { label: 'Darhol yirtib tashlaymiz' }],
      correct: 0,
    },
    {
      id: 'nom',
      type: 'choose-answer',
      question: 'Hikoya nomi qanday bo‘lishi kerak?',
      options: [{ label: 'Qisqa va mazmunga mos' }, { label: 'Juda uzun' }, { label: 'Mazmunga aloqasiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Hikoya: **reja → yozish → tekshirish**.', 'Boshlanish, voqea, **yakun**.'],
    },
  ],
});
