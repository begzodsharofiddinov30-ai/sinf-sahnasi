// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar tuproqning tarkibi va ahamiyatini biladi.',
    questions: ['Tuproq nima uchun kerak?', 'Tuproqda kimlar yashaydi?', 'Tuproqni qanday asraymiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'tarkib',
      type: 'explain',
      title: 'Tuproq',
      steps: [
        { text: 'Tuproq — yerning **unumdor** ustki qatlami.', visual: { kind: 'picture', item: 'barg' } },
        {
          text: 'Unda **qum, loy, chirindi, suv, havo** bor.',
          visual: { kind: 'tiles', items: ['qum', 'loy', 'chirindi', 'suv', 'havo'] },
          replace: true,
        },
        {
          text: 'Tuproqda **chuvalchanglar** yashaydi va uni yumshatadi.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'nima',
      type: 'choose-answer',
      question: 'Tuproq nima uchun kerak?',
      options: [{ label: 'O‘simliklar o‘sishi uchun' }, { label: 'Faqat yo‘l uchun' }],
      correct: 0,
    },
    {
      id: 'tarkib-2',
      type: 'sort-groups',
      prompt: 'Tuproq tarkibida bormi?',
      groups: [{ label: 'Bor' }, { label: 'Yo‘q' }],
      items: [
        { label: 'qum', group: 0 },
        { label: 'chirindi', group: 0 },
        { label: 'plastmassa', group: 1 },
        { label: 'suv', group: 0 },
        { label: 'shisha', group: 1 },
      ],
    },
    {
      id: 'asrash',
      type: 'choose-answer',
      question: 'Tuproqni qanday asraymiz?',
      options: [{ label: 'Axlat tashlamaymiz' }, { label: 'Kimyoviy chiqindi to‘kamiz' }],
      correct: 0,
    },
    {
      id: 'chuvalchang',
      type: 'choose-answer',
      question: 'Chuvalchanglar tuproqqa qanday foyda beradi?',
      options: [{ label: 'Yumshatadi' }, { label: 'Buzadi' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Tuproq — **o‘simliklar uyi**.', 'Tuproqni **ifloslantirmaymiz**.'],
    },
  ],
});
