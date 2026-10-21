// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar so‘zni yangi qatorga bo‘g‘in bo‘yicha ko‘chirish qoidasini qo‘llaydi.',
    questions: [
      'So‘zni qanday ko‘chiramiz?',
      'Bitta harfni ko‘chirish mumkinmi?',
      '“Maktab” so‘zini qanday ko‘chiramiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Ko‘chirish qoidasi',
      steps: [
        {
          text: 'So‘z **bo‘g‘in bo‘yicha** ko‘chiriladi: ki-tob.',
          visual: { kind: 'tiles', items: ['ki-', 'tob'] },
        },
        {
          text: '**Bitta harf** qator oxirida qoldirilmaydi va ko‘chirilmaydi.',
          visual: { kind: 'tiles', items: ['o-na ✗'] },
          replace: true,
        },
        { text: 'maktab → **mak-tab**', visual: { kind: 'tiles', items: ['mak-', 'tab'] }, replace: true },
      ],
    },
    {
      id: 'maktab',
      type: 'choose-answer',
      question: 'Qaysi biri to‘g‘ri ko‘chirilgan?',
      options: [{ label: 'mak-tab' }, { label: 'ma-ktab' }, { label: 'm-aktab' }],
      correct: 0,
    },
    {
      id: 'daftar',
      type: 'choose-answer',
      question: 'Qaysi biri to‘g‘ri?',
      options: [{ label: 'daf-tar' }, { label: 'd-aftar' }, { label: 'dafta-r' }],
      correct: 0,
    },
    {
      id: 'mumkinmi',
      type: 'sort-groups',
      prompt: 'Ko‘chirish to‘g‘rimi?',
      groups: [{ label: 'To‘g‘ri' }, { label: 'Noto‘g‘ri' }],
      items: [
        { label: 'ki-tob', group: 0 },
        { label: 'o-na', group: 1 },
        { label: 'bo-la', group: 0 },
        { label: 'a-ri', group: 1 },
        { label: 'qa-lam', group: 0 },
      ],
    },
    {
      id: 'qalam',
      type: 'build-word',
      prompt: 'Bo‘g‘inlardan yig‘ing: qalam',
      word: 'qalam',
      tiles: ['qa', 'lam'],
      extra: ['la'],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['So‘z **bo‘g‘in bo‘yicha** ko‘chiriladi.', 'Bitta harf **ko‘chirilmaydi**.'],
    },
  ],
});
