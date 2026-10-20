// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar O‘zbekistonning poytaxti, davlat tili, bayrog‘i va mashhur shaharlari haqida asosiy ma’lumotlarni biladi.',
    questions: [
      'Vatanimiz poytaxti qaysi shahar?',
      'Bayrog‘imizda qanday ranglar bor?',
      'Qaysi qadimiy shaharlarimizni bilasiz?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'vatan',
      type: 'explain',
      title: 'Vatanim',
      steps: [
        { text: 'Vatanimiz — **O‘zbekiston**.', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'Poytaxti — **Toshkent** shahri.',
          visual: { kind: 'tiles', items: ['Toshkent'] },
          replace: true,
        },
        {
          text: 'Davlat tilimiz — **o‘zbek tili**.',
          visual: { kind: 'tiles', items: ['o‘zbek tili'] },
          replace: true,
        },
        {
          text: 'Bayrog‘imizda **ko‘k**, **oq** va **yashil** rang, yarim **oy** va **12 ta yulduz** bor.',
          visual: { kind: 'items', item: 'yulduz', count: 12 },
          replace: true,
        },
      ],
      hint: 'Imkon bo‘lsa, haqiqiy bayroq yoki xaritani ko‘rsating.',
    },
    {
      id: 'poytaxt',
      type: 'choose-answer',
      question: 'O‘zbekistonning poytaxti qaysi?',
      options: [{ label: 'Toshkent' }, { label: 'Samarqand' }, { label: 'Buxoro' }],
      correct: 0,
    },
    {
      id: 'mustaqillik',
      type: 'choose-answer',
      question: 'Mustaqillik kuni qachon nishonlanadi?',
      options: [{ label: '1-sentabr' }, { label: '1-yanvar' }, { label: '8-mart' }],
      correct: 0,
    },
    {
      id: 'shaharlar',
      type: 'drag-match',
      prompt: 'Shaharni mashhur joyiga olib boring',
      pairs: [
        { item: { label: 'Samarqand' }, target: { label: 'Registon maydoni' } },
        { item: { label: 'Buxoro' }, target: { label: 'Minorai Kalon' } },
        { item: { label: 'Xiva' }, target: { label: 'Ichan qal’a' } },
      ],
    },
    {
      id: 'daryo',
      type: 'choose-answer',
      question: 'Qaysi biri O‘zbekistondagi katta daryo?',
      options: [{ label: 'Amudaryo' }, { label: 'Nil' }, { label: 'Volga' }],
      correct: 0,
    },
    {
      id: 'yulduzlar',
      type: 'count-and-tap',
      prompt: 'Bayroqdagi yulduzlar sonini sanang!',
      item: 'yulduz',
      count: 12,
      layout: 'row',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Poytaxt — **Toshkent**.', 'Davlat tili — **o‘zbek tili**.', 'Mustaqillik kuni — **1-sentabr**.'],
    },
  ],
});
