// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar havoning mavjudligini va uning tirik mavjudotlar uchun ahamiyatini tushunadi.',
    questions: ['Havoni ko‘ra olamizmi?', 'Shamol nima?', 'Nega havoni toza saqlash kerak?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'havo',
      type: 'explain',
      title: 'Havo',
      steps: [
        {
          text: 'Havo **ko‘rinmaydi**, lekin u hamma joyda bor.',
          visual: { kind: 'picture', item: 'bulut' },
        },
        { text: 'Biz havo bilan **nafas** olamiz.', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'Havo harakatlansa — **shamol** bo‘ladi.',
          visual: { kind: 'picture', item: 'barg' },
          replace: true,
        },
      ],
      hint: 'Sharni puflab ko‘rsating: ichida havo bor.',
    },
    {
      id: 'nafas',
      type: 'choose-answer',
      question: 'Odamlar, hayvonlar va o‘simliklarga havo kerakmi?',
      options: [{ label: 'Ha, hammasiga kerak' }, { label: 'Faqat odamlarga' }, { label: 'Hech kimga' }],
      correct: 0,
    },
    {
      id: 'shamol',
      type: 'choose-answer',
      question: 'Shamol nima?',
      options: [{ label: 'Harakatlanayotgan havo' }, { label: 'Suv' }, { label: 'Tutun' }],
      correct: 0,
    },
    {
      id: 'toza',
      type: 'sort-groups',
      prompt: 'Havoni ifloslantiradimi?',
      groups: [{ label: 'Ifloslantiradi' }, { label: 'Tozalaydi' }],
      items: [
        { label: 'Zavod tutuni', group: 0 },
        { label: 'Daraxt ekish', group: 1 },
        { label: 'Axlat yoqish', group: 0 },
        { label: 'Gulzor', group: 1 },
      ],
    },
    {
      id: 'xona',
      type: 'choose-answer',
      question: 'Xonani qanday shamollatamiz?',
      options: [{ label: 'Derazani ochamiz' }, { label: 'Eshikni qulflaymiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Havo **ko‘rinmaydi**, ammo juda **zarur**.', 'Daraxtlar havoni **tozalaydi**.'],
    },
  ],
});
