// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar masalni o‘qib, undagi saboqni aniqlaydi.',
    questions: ['Kuchukcha nima qildi?', 'Oxirida nima bo‘ldi?', 'Masaldan qanday saboq oldik?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'masal',
      type: 'story',
      title: 'Ochko‘z kuchukcha',
      pages: [
        { text: 'Kuchukchaga **uchta suyak** berishdi.', visual: { kind: 'picture', item: 'it' } },
        {
          text: 'U do‘stlariga **hech birini bermadi** — hammasini yashirdi.',
          visual: { kind: 'picture', item: 'it' },
        },
        {
          text: 'Yashirgan joyini **unutib** qo‘ydi va suyaksiz qoldi.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Do‘stlari unga o‘z suyagidan **bo‘lib berishdi**. Kuchukcha uyaldi.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
      ],
      hint: 'Asl masal.',
    },
    {
      id: 'nima',
      type: 'choose-answer',
      question: 'Kuchukcha suyaklarni nima qildi?',
      options: [{ label: 'Yashirdi' }, { label: 'Do‘stlariga berdi' }, { label: 'Yedi' }],
      correct: 0,
    },
    {
      id: 'oxiri',
      type: 'choose-answer',
      question: 'Oxirida kim yordam berdi?',
      options: [{ label: 'Do‘stlari' }, { label: 'Mushuk' }, { label: 'Hech kim' }],
      correct: 0,
    },
    {
      id: 'saboq',
      type: 'choose-answer',
      question: 'Masalning saboqi qaysi?',
      options: [
        { label: 'Ochko‘z bo‘lmaslik, bo‘lishish kerak' },
        { label: 'Suyakni yashirish kerak' },
        { label: 'Do‘st kerak emas' },
      ],
      correct: 0,
    },
    {
      id: 'fazilat',
      type: 'sort-groups',
      prompt: 'Masalda kim qanday?',
      groups: [{ label: 'Saxiy' }, { label: 'Ochko‘z' }],
      items: [{ label: 'do‘stlari', group: 0 }, { label: 'kuchukcha (boshida)', group: 1 }],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Ochko‘zlik** yaxshilikka olib bormaydi.', 'Do‘stlar bilan **bo‘lishamiz**.'],
    },
  ],
});
