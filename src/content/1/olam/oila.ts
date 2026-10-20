// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar oila a’zolarini nomlaydi va oilada bir-biriga yordam berish muhimligini tushunadi.',
    questions: ['Oilangizda kimlar bor?', 'Uyda kimga yordam berasiz?', 'Bobo va buvingizdan nimani o‘rgangansiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'oila',
      type: 'explain',
      title: 'Oila',
      steps: [
        { text: '**Oila** — eng yaqin odamlarimiz.', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'Ota, ona, aka, opa, uka, singil, bobo, buvi.',
          visual: { kind: 'tiles', items: ['ota', 'ona', 'aka', 'opa', 'uka', 'singil', 'bobo', 'buvi'] },
          replace: true,
        },
        {
          text: 'Oilada hamma bir-biriga **yordam** beradi.',
          visual: { kind: 'mascot', mood: 'cheer' },
          replace: true,
        },
      ],
      hint: 'Bolalar oilasi haqida bitta gap aytsin. Oilaviy holatlar turlicha bo‘lishini hisobga oling.',
    },
    {
      id: 'bobo',
      type: 'choose-answer',
      question: 'Otamning otasi — mening ...?',
      options: [{ label: 'bobom' }, { label: 'akam' }, { label: 'tog‘am' }],
      correct: 0,
    },
    {
      id: 'buvi',
      type: 'choose-answer',
      question: 'Onamning onasi — mening ...?',
      options: [{ label: 'buvim' }, { label: 'opam' }, { label: 'xolam' }],
      correct: 0,
    },
    {
      id: 'katta-kichik',
      type: 'sort-groups',
      prompt: 'Mendan kattami yoki kichikmi?',
      groups: [{ label: 'Mendan katta' }, { label: 'Mendan kichik' }],
      items: [
        { label: 'aka', group: 0 },
        { label: 'uka', group: 1 },
        { label: 'opa', group: 0 },
        { label: 'singil', group: 1 },
        { label: 'bobo', group: 0 },
        { label: 'buvi', group: 0 },
      ],
    },
    {
      id: 'yordam',
      type: 'choose-answer',
      question: 'Uyda kattalarga qanday yordam berasiz?',
      options: [
        { label: 'Idishlarni yig‘ishtiraman' },
        { label: 'Uyni to‘zg‘itaman' },
        { label: 'Hech narsa qilmayman' },
      ],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Oila** — eng yaqin odamlarimiz.',
        'Kattalarni **hurmat** qilamiz, kichiklarga **g‘amxo‘rlik** qilamiz.',
      ],
    },
  ],
});
