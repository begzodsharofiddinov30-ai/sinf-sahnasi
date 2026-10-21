// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar asosiy foydali qazilmalarni va ulardan foydalanishni biladi.',
    questions: ['Foydali qazilma nima?', 'Gaz nima uchun kerak?', 'O‘zbekistonda qanday boyliklar bor?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Foydali qazilmalar',
      steps: [
        { text: 'Yer ostidan olinadigan **boyliklar**.', visual: { kind: 'mascot', mood: 'think' } },
        {
          text: 'Masalan: **gaz, neft, ko‘mir, oltin, mis**.',
          visual: { kind: 'tiles', items: ['gaz', 'neft', 'ko‘mir', 'oltin', 'mis'] },
          replace: true,
        },
        {
          text: 'O‘zbekistonda **oltin** va **tabiiy gaz** ko‘p qazib olinadi.',
          visual: { kind: 'picture', item: 'tanga' },
          replace: true,
        },
      ],
    },
    {
      id: 'ishlatish',
      type: 'drag-match',
      prompt: 'Qazilmani ishlatilishiga olib boring',
      pairs: [
        { item: { label: 'gaz' }, target: { label: 'oshxonada pishirish' } },
        { item: { label: 'oltin' }, target: { label: 'zargarlik buyumlari' } },
        { item: { label: 'mis' }, target: { label: 'elektr simlari' } },
        { item: { label: 'ko‘mir' }, target: { label: 'isitish' } },
      ],
    },
    {
      id: 'tejash',
      type: 'choose-answer',
      question: 'Gazni qanday tejaymiz?',
      options: [{ label: 'Keraksiz yoqib qo‘ymaymiz' }, { label: 'Doim yoqib qo‘yamiz' }],
      correct: 0,
    },
    {
      id: 'tugaydimi',
      type: 'choose-answer',
      question: 'Foydali qazilmalar cheksizmi?',
      options: [{ label: 'Yo‘q, tugashi mumkin' }, { label: 'Ha, cheksiz' }],
      correct: 0,
    },
    {
      id: 'qayerdan',
      type: 'choose-answer',
      question: 'Foydali qazilmalar qayerdan olinadi?',
      options: [{ label: 'Yer ostidan (konlardan)' }, { label: 'Daraxtlardan' }, { label: 'Bulutdan' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Foydali qazilmalar — **Yer boyligi**.', 'Ularni **tejab** ishlatamiz.'],
    },
  ],
});
