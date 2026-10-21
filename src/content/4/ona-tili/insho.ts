// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar reja asosida kichik insho tuzadi.',
    questions: ['Insho nima?', 'Inshoga reja nima uchun kerak?', '“Mening sevimli faslim” inshosini qanday boshlaysiz?'],
    minutes: 25,
  },
  scenes: [
    {
      id: 'qism',
      type: 'explain',
      title: 'Insho tuzilishi',
      steps: [
        { text: '**Reja** tuzamiz.', visual: { kind: 'picture', item: 'qalam' } },
        { text: '**Kirish** — mavzuga kirish.', visual: { kind: 'tiles', items: ['Kirish'] }, replace: true },
        { text: '**Asosiy qism** — fikrlar va misollar.', visual: { kind: 'tiles', items: ['Asosiy qism'] } },
        { text: '**Xulosa** — yakuniy fikr.', visual: { kind: 'tiles', items: ['Xulosa'] } },
      ],
    },
    {
      id: 'qism-2',
      type: 'drag-match',
      prompt: 'Gapni insho qismiga olib boring',
      pairs: [
        { item: { label: 'Har bir faslning o‘z go‘zalligi bor.' }, target: { label: 'Kirish' } },
        { item: { label: 'Bahorda gullar ochiladi, qushlar qaytadi.' }, target: { label: 'Asosiy qism' } },
        { item: { label: 'Shuning uchun men bahorni sevaman.' }, target: { label: 'Xulosa' } },
      ],
    },
    {
      id: 'reja',
      type: 'choose-answer',
      question: 'Inshoni yozishdan oldin nima qilamiz?',
      options: [{ label: 'Reja tuzamiz' }, { label: 'Darhol xulosa yozamiz' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'xulosa',
      type: 'choose-answer',
      question: 'Qaysi gap xulosaga mos?',
      options: [
        { label: 'Shunday qilib, Vatanim men uchun eng aziz.' },
        { label: 'Kecha yomg‘ir yog‘di.' },
        { label: 'Birinchidan…' },
      ],
      correct: 0,
    },
    {
      id: 'tekshir',
      type: 'choose-answer',
      question: 'Yozib bo‘lgach nima qilamiz?',
      options: [{ label: 'Qayta o‘qib, xatolarni tuzatamiz' }, { label: 'Yirtib tashlaymiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Insho: **reja → kirish → asosiy qism → xulosa**.', 'Yozgach **tekshiramiz**.'],
    },
  ],
});
