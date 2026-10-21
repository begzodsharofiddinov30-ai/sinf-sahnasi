// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar narsalarning og‘irligini taqqoslaydi va massa birligi kilogrammni biladi.',
    questions: [
      'Qaysi biri og‘irroq: tarvuz yoki olma?',
      'Tarozi nima uchun kerak?',
      'Bozorda nimani kilogramm bilan sotib olamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'kg',
      type: 'explain',
      title: 'Massa',
      steps: [
        { text: 'Narsaning og‘irligi — **massa**.', visual: { kind: 'mascot', mood: 'think' } },
        { text: 'Massa **kilogramm** (kg) bilan o‘lchanadi.', visual: { kind: 'tiles', items: ['1 kg'] } },
        {
          text: 'Tarozining og‘ir pallasi **pastga** tushadi.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'ogir',
      type: 'choose-answer',
      question: 'Qaysi biri **og‘irroq**?',
      options: [{ label: 'tarvuz' }, { label: 'olma', visual: { kind: 'picture', item: 'olma' } }],
      correct: 0,
    },
    {
      id: 'ogir-yengil',
      type: 'sort-groups',
      prompt: '1 kg dan og‘irmi yoki yengilmi?',
      groups: [{ label: '1 kg dan yengil' }, { label: '1 kg dan og‘ir' }],
      items: [
        { label: 'qalam', group: 0 },
        { label: 'qop un', group: 1 },
        { label: 'daftar', group: 0 },
        { label: 'tarvuz', group: 1 },
        { label: 'o‘chirg‘ich', group: 0 },
      ],
    },
    {
      id: 'qoshish',
      type: 'choose-answer',
      question: 'Bir xaltada 3 kg, ikkinchisida 2 kg kartoshka. Hammasi?',
      options: [{ label: '5 kg' }, { label: '1 kg' }, { label: '6 kg' }],
      correct: 0,
    },
    {
      id: 'birlik',
      type: 'choose-answer',
      question: 'Odamning og‘irligini nima bilan o‘lchaymiz?',
      options: [{ label: 'kilogramm' }, { label: 'metr' }, { label: 'litr' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Massa **kilogramm** (kg) bilan o‘lchanadi.', 'Og‘ir palla **pastga** tushadi.'],
    },
  ],
});
