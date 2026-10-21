// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar suvning asosiy xossalarini kuzatish orqali biladi va suvni tejash zarurligini tushunadi.',
    questions: ['Suvning rangi bormi?', 'Suvda qanday narsalar eriydi?', 'Suvni qanday tejaymiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'xossa',
      type: 'explain',
      title: 'Suv xossalari',
      steps: [
        { text: 'Toza suv **rangsiz** va **hidsiz**.', visual: { kind: 'picture', item: 'tomchi' } },
        { text: 'Suv **oquvchan** — idish shaklini oladi.', visual: { kind: 'picture', item: 'suv' } },
        { text: 'Suvda shakar va tuz **eriydi**.', visual: { kind: 'mascot', mood: 'think' }, replace: true },
      ],
      hint: 'Stakanda shakar eritib ko‘rsating.',
    },
    {
      id: 'eriydi',
      type: 'sort-groups',
      prompt: 'Suvda eriydimi?',
      groups: [{ label: 'Eriydi' }, { label: 'Erimaydi' }],
      items: [
        { label: 'shakar', group: 0 },
        { label: 'tuz', group: 0 },
        { label: 'qum', group: 1 },
        { label: 'tosh', group: 1 },
      ],
    },
    {
      id: 'rang',
      type: 'choose-answer',
      question: 'Toza suvning rangi qanday?',
      options: [{ label: 'Rangsiz' }, { label: 'Ko‘k' }, { label: 'Yashil' }],
      correct: 0,
    },
    {
      id: 'shakl',
      type: 'choose-answer',
      question: 'Suvni stakanga quysak, qanday shaklga kiradi?',
      options: [{ label: 'Stakan shakliga' }, { label: 'Kvadrat bo‘lib qoladi' }, { label: 'O‘zgarmaydi' }],
      correct: 0,
    },
    {
      id: 'tejash',
      type: 'choose-answer',
      question: 'Suvni qanday tejaymiz?',
      options: [{ label: 'Jo‘mrakni yopib qo‘yamiz' }, { label: 'Ochiq qoldiramiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Suv: **rangsiz, hidsiz, oquvchan**.', 'Suvni **tejaymiz**.'],
    },
  ],
});
