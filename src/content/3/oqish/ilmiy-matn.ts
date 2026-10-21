// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ilmiy-ommabop matndan faktlarni ajratib oladi va badiiy matndan farqlaydi.',
    questions: ['Bu matn ertakmi?', 'Matndan qanday yangi narsa bildingiz?', 'Fakt nima?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'matn',
      type: 'story',
      title: 'Asalarilar',
      pages: [
        { text: 'Asalarilar **oila** bo‘lib uyada yashaydi.', visual: { kind: 'mascot', mood: 'think' } },
        {
          text: 'Uyada bitta **ona ari** bo‘ladi, u tuxum qo‘yadi.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: '**Ishchi arilar** gullardan shira yig‘ib, asal tayyorlaydi.',
          visual: { kind: 'picture', item: 'gul' },
        },
        {
          text: 'Asalarilar gullarni **changlatib**, hosilni oshiradi.',
          visual: { kind: 'picture', item: 'olma' },
        },
      ],
    },
    {
      id: 'turi',
      type: 'choose-answer',
      question: 'Bu qanday matn?',
      options: [{ label: 'Ilmiy-ommabop' }, { label: 'Ertak' }, { label: 'She’r' }],
      correct: 0,
    },
    {
      id: 'ona',
      type: 'choose-answer',
      question: 'Uyada nechta ona ari bo‘ladi?',
      options: [{ label: 'Bitta' }, { label: 'O‘nta' }, { label: 'Yo‘q' }],
      correct: 0,
    },
    {
      id: 'asal',
      type: 'choose-answer',
      question: 'Asalni kim tayyorlaydi?',
      options: [{ label: 'Ishchi arilar' }, { label: 'Ona ari' }, { label: 'Kapalaklar' }],
      correct: 0,
    },
    {
      id: 'fakt',
      type: 'sort-groups',
      prompt: 'Faktmi yoki xayolotmi?',
      groups: [{ label: 'Fakt' }, { label: 'Xayolot' }],
      items: [
        { label: 'Arilar asal tayyorlaydi', group: 0 },
        { label: 'Ari qo‘shiq aytadi', group: 1 },
        { label: 'Arilar gul changlatadi', group: 0 },
        { label: 'Ari maktabga boradi', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ilmiy matnda **faktlar** bo‘ladi.', 'Asalarilar **asal** beradi va **gullarni changlatadi**.'],
    },
  ],
});
