// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar uzunlik birliklari (sm, m) ni farqlaydi va 1 m = 100 sm ekanini biladi.',
    questions: [
      'Qalamni nima bilan o‘lchaymiz?',
      'Sinf xonasi necha metr bo‘lishi mumkin?',
      '1 metrda necha santimetr bor?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'birliklar',
      type: 'explain',
      title: 'Uzunlikni o‘lchaymiz',
      steps: [
        {
          text: 'Kichik narsalarni **santimetr** (sm) bilan o‘lchaymiz. Qalam — taxminan 15 sm.',
          visual: { kind: 'picture', item: 'qalam' },
        },
        {
          text: 'Katta narsalarni **metr** (m) bilan o‘lchaymiz.',
          visual: { kind: 'picture', item: 'daraxt' },
          replace: true,
        },
        { text: '**1 m = 100 sm**', visual: { kind: 'tiles', items: ['1 m', '=', '100 sm'] }, replace: true },
      ],
      hint: 'Chizg‘ich va metr lentasini ko‘rsating.',
    },
    {
      id: 'daftar',
      type: 'choose-answer',
      question: 'Daftarning uzunligini nima bilan o‘lchaymiz?',
      options: [{ label: 'santimetr' }, { label: 'metr' }, { label: 'kilogramm' }],
      correct: 0,
    },
    {
      id: 'xona',
      type: 'choose-answer',
      question: 'Sinf xonasining uzunligini nima bilan o‘lchaymiz?',
      options: [{ label: 'metr' }, { label: 'santimetr' }, { label: 'litr' }],
      correct: 0,
    },
    {
      id: 'uzunroq',
      type: 'choose-answer',
      question: 'Qaysi biri **uzunroq**?',
      options: [{ label: '1 m' }, { label: '90 sm' }],
      correct: 0,
      explanation: '1 m = 100 sm, 100 sm esa 90 sm dan uzun.',
    },
    {
      id: 'sm-m',
      type: 'sort-groups',
      prompt: 'Santimetrdami yoki metrda o‘lchanadi?',
      groups: [{ label: 'santimetr' }, { label: 'metr' }],
      items: [
        { label: 'qalam', group: 0 },
        { label: 'barmoq', group: 0 },
        { label: 'yo‘lak', group: 1 },
        { label: 'daraxt', group: 1 },
        { label: 'o‘chirg‘ich', group: 0 },
        { label: 'futbol maydoni', group: 1 },
      ],
    },
    {
      id: 'lenta',
      type: 'number-line',
      prompt: 'Lenta 12 sm edi, yana 5 sm ulandi. Necha sm bo‘ldi?',
      min: 10,
      max: 20,
      start: 12,
      step: 1,
      answer: 17,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Kichik narsalar — **sm**, katta narsalar — **m**.', '**1 m = 100 sm**'],
    },
  ],
});
