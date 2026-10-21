// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar foydali va kam foydali ovqatlarni ajratadi va to‘g‘ri ovqatlanish odatlarini biladi.',
    questions: ['Nonushtada nima yeysiz?', 'Qaysi ovqatlar foydali?', 'Nega ko‘p shirinlik zararli?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'To‘g‘ri ovqatlanish',
      steps: [
        { text: 'Har kuni **meva** va **sabzavot** yeymiz.', visual: { kind: 'picture', item: 'olma' } },
        {
          text: '**Suv** ichamiz — gazli ichimlik o‘rniga.',
          visual: { kind: 'picture', item: 'tomchi' },
          replace: true,
        },
        {
          text: 'Ovqatni **vaqtida** va shoshmay yeymiz.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'foydali',
      type: 'sort-groups',
      prompt: 'Foydalimi yoki kamroq yeyish kerakmi?',
      groups: [{ label: 'Foydali' }, { label: 'Kamroq yeyish kerak' }],
      items: [
        { label: 'olma', visual: { kind: 'picture', item: 'olma' }, group: 0 },
        { label: 'chips', group: 1 },
        { label: 'sut', group: 0 },
        { label: 'gazli ichimlik', group: 1 },
        { label: 'sabzi', group: 0 },
        { label: 'ko‘p konfet', group: 1 },
      ],
    },
    {
      id: 'nonushta',
      type: 'choose-answer',
      question: 'Nonushtaga eng foydalisi?',
      options: [{ label: 'Bo‘tqa va meva' }, { label: 'Faqat konfet' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'suv',
      type: 'choose-answer',
      question: 'Chanqasak nima ichamiz?',
      options: [{ label: 'Suv' }, { label: 'Gazli ichimlik' }],
      correct: 0,
    },
    {
      id: 'yuvish',
      type: 'choose-answer',
      question: 'Ovqatdan oldin nima qilamiz?',
      options: [{ label: 'Qo‘l yuvamiz' }, { label: 'Telefon o‘ynaymiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Meva, sabzavot va **suv** — foydali.', 'Shirinlikni **kam** yeymiz.'],
    },
  ],
});
