// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar elektr asboblaridan xavfsiz foydalanish qoidalarini va elektrni tejashni biladi.',
    questions: ['Elektr nima uchun kerak?', 'Qanday holatlar xavfli?', 'Elektrni qanday tejaymiz?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Elektr qoidalari',
      steps: [
        { text: '**Ho‘l qo‘l** bilan elektr asbobiga tegmaymiz.', visual: { kind: 'mascot', mood: 'think' } },
        { text: '**Singan sim** va rozetkaga yaqinlashmaymiz.' },
        {
          text: 'Ishlatilmayotgan chiroqni **o‘chiramiz** — elektr tejaladi.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'xavf',
      type: 'sort-groups',
      prompt: 'Xavflimi yoki xavfsizmi?',
      groups: [{ label: 'Xavfli' }, { label: 'Xavfsiz' }],
      items: [
        { label: 'Ho‘l qo‘l bilan rozetkaga tegish', group: 0 },
        { label: 'Chiroqni o‘chirib chiqish', group: 1 },
        { label: 'Uzilgan simni ushlash', group: 0 },
        { label: 'Asbobni vilkasidan ushlab uzish', group: 1 },
      ],
    },
    {
      id: 'sim',
      type: 'choose-answer',
      question: 'Ko‘chada uzilgan simni ko‘rsangiz nima qilasiz?',
      options: [{ label: 'Yaqinlashmay, kattalarga aytaman' }, { label: 'Ushlab ko‘raman' }],
      correct: 0,
    },
    {
      id: 'tejash',
      type: 'choose-answer',
      question: 'Elektrni qanday tejaymiz?',
      options: [{ label: 'Keraksiz chiroqlarni o‘chiramiz' }, { label: 'Hamma chiroqni yoqib qo‘yamiz' }],
      correct: 0,
    },
    {
      id: 'suv',
      type: 'choose-answer',
      question: 'Elektr asbobini suv yonida ishlatish mumkinmi?',
      options: [{ label: 'Yo‘q, xavfli' }, { label: 'Ha' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Ho‘l qo‘l** va **singan sim** — xavfli.', 'Elektrni **tejaymiz**.'],
    },
  ],
});
