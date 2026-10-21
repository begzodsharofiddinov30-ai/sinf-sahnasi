// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar Alisher Navoiy hayoti va ijodi haqida asosiy ma’lumotlarni biladi.',
    questions: ['Alisher Navoiy kim?', 'U qachon tug‘ilgan?', 'Navoiy nomi bilan nimalar atalgan?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'hayoti',
      type: 'story',
      title: 'Alisher Navoiy',
      pages: [
        {
          text: 'Alisher Navoiy **1441-yil 9-fevralda** Hirot shahrida tug‘ilgan.',
          visual: { kind: 'picture', item: 'kitob' },
        },
        {
          text: 'U bolaligidan **kitob o‘qishni** va she’r yozishni yaxshi ko‘rgan.',
          visual: { kind: 'picture', item: 'qalam' },
        },
        {
          text: 'Navoiy turkiy (eski o‘zbek) tilida ijod qilgan buyuk **shoir**.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        {
          text: 'Uning beshta dostondan iborat mashhur asari — «**Xamsa**».',
          visual: { kind: 'picture', item: 'kitob' },
        },
      ],
      hint: 'Ma’lumotlarni darslik bilan solishtiring.',
    },
    {
      id: 'kim',
      type: 'choose-answer',
      question: 'Alisher Navoiy kim?',
      options: [{ label: 'Buyuk shoir' }, { label: 'Sportchi' }, { label: 'Quruvchi' }],
      correct: 0,
    },
    {
      id: 'qachon',
      type: 'choose-answer',
      question: 'Navoiy qachon tug‘ilgan?',
      options: [{ label: '1441-yil' }, { label: '1991-yil' }, { label: '1841-yil' }],
      correct: 0,
    },
    {
      id: 'xamsa',
      type: 'choose-answer',
      question: '«Xamsa» nechta dostondan iborat?',
      options: [{ label: '5' }, { label: '3' }, { label: '10' }],
      correct: 0,
    },
    {
      id: 'qayerda',
      type: 'choose-answer',
      question: 'Navoiy qaysi shaharda tug‘ilgan?',
      options: [{ label: 'Hirotda' }, { label: 'Toshkentda' }, { label: 'Xivada' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Alisher Navoiy — **buyuk shoir**, 1441-yilda tug‘ilgan.', 'Mashhur asari — «**Xamsa**».'],
    },
  ],
});
