// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar kutubxona qoidalarini biladi va kitobni muqovasiga qarab tanlay oladi.',
    questions: [
      'Kutubxonada o‘zimizni qanday tutamiz?',
      'Kitobni qanday tanlaymiz?',
      'Olgan kitobni qachon qaytaramiz?',
    ],
    minutes: 10,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Kutubxona',
      steps: [
        { text: 'Kutubxonada **jim** turamiz.', visual: { kind: 'picture', item: 'kitob' } },
        { text: 'Kitobni **muqova** va **sarlavha**siga qarab tanlaymiz.' },
        {
          text: 'Olgan kitobni **o‘z vaqtida** qaytaramiz.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'qoida-2',
      type: 'sort-groups',
      prompt: 'To‘g‘rimi?',
      groups: [{ label: 'To‘g‘ri' }, { label: 'Noto‘g‘ri' }],
      items: [
        { label: 'Jim gaplashish', group: 0 },
        { label: 'Baqirish', group: 1 },
        { label: 'Kitobni vaqtida qaytarish', group: 0 },
        { label: 'Kitobni uyda unutib qo‘yish', group: 1 },
      ],
    },
    {
      id: 'sarlavha',
      type: 'choose-answer',
      question: 'Kitob nima haqida ekanini qayerdan bilamiz?',
      options: [{ label: 'Sarlavha va muqovadan' }, { label: 'Og‘irligidan' }, { label: 'Rangidan' }],
      correct: 0,
    },
    {
      id: 'muallif',
      type: 'choose-answer',
      question: 'Kitobni yozgan kishi kim?',
      options: [{ label: 'Muallif' }, { label: 'Kutubxonachi' }, { label: 'Sotuvchi' }],
      correct: 0,
    },
    {
      id: 'qaytarish',
      type: 'choose-answer',
      question: 'Kitobni o‘qib bo‘lgach nima qilamiz?',
      options: [{ label: 'Kutubxonaga qaytaramiz' }, { label: 'Tashlab yuboramiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Kutubxonada **jimlik** va **tartib**.', 'Kitobni **asrab**, vaqtida qaytaramiz.'],
    },
  ],
});
