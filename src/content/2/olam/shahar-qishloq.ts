// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar shahar va qishloq hayotining o‘xshash va farqli tomonlarini biladi.',
    questions: [
      'Siz shaharda yashaysizmi yoki qishloqda?',
      'Qishloqda odamlar nima bilan shug‘ullanadi?',
      'Shaharda qanday binolar bor?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'farq',
      type: 'explain',
      title: 'Shahar va qishloq',
      steps: [
        {
          text: '**Shahar**da baland uylar, ko‘p mashina, metro bor.',
          visual: { kind: 'picture', item: 'mashina' },
        },
        {
          text: '**Qishloq**da dalalar, bog‘lar, uy hayvonlari ko‘p.',
          visual: { kind: 'picture', item: 'sigir' },
          replace: true,
        },
        {
          text: 'Ikkalasida ham **maktab**, **shifoxona** bor.',
          visual: { kind: 'picture', item: 'kitob' },
          replace: true,
        },
      ],
    },
    {
      id: 'qayerda',
      type: 'sort-groups',
      prompt: 'Ko‘proq qayerda uchraydi?',
      groups: [{ label: 'Shaharda' }, { label: 'Qishloqda' }],
      items: [
        { label: 'ko‘p qavatli uy', group: 0 },
        { label: 'dala', group: 1 },
        { label: 'metro', group: 0 },
        { label: 'sigirxona', group: 1 },
        { label: 'ko‘p mashina', group: 0 },
        { label: 'bog‘', group: 1 },
      ],
    },
    {
      id: 'dehqon',
      type: 'choose-answer',
      question: 'Paxta va bug‘doy qayerda yetishtiriladi?',
      options: [{ label: 'Qishloq dalalarida' }, { label: 'Shahar markazida' }],
      correct: 0,
    },
    {
      id: 'ikkalasi',
      type: 'choose-answer',
      question: 'Shahar ham, qishloqda ham nima bor?',
      options: [{ label: 'Maktab' }, { label: 'Faqat metro' }, { label: 'Faqat dala' }],
      correct: 0,
    },
    {
      id: 'poytaxt',
      type: 'choose-answer',
      question: 'O‘zbekistonning eng katta shahri?',
      options: [{ label: 'Toshkent' }, { label: 'Qishloq' }, { label: 'Dala' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Shahar va qishloq — **bir-biriga kerak**.',
        'Qishloq **oziq-ovqat** yetishtiradi, shahar **mahsulot** ishlab chiqaradi.',
      ],
    },
  ],
});
