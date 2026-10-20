// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar bo‘g‘inlarni qo‘shib so‘z o‘qiydi va o‘qilgan so‘zni rasm bilan bog‘laydi.',
    questions: [
      '“O-na” ni qo‘shib o‘qisak, qanday so‘z bo‘ladi?',
      'Qaysi so‘zni eng birinchi o‘qiy olgansiz?',
      'O‘qishni kim bilan mashq qilasiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qoshib',
      type: 'explain',
      title: 'Bo‘g‘inlarni qo‘shamiz',
      steps: [
        {
          text: '**o** + **na** = **ona**',
          visual: { kind: 'tiles', items: ['o', '+', 'na', '=', 'ona'], highlight: [4] },
        },
        {
          text: '**o‘** + **rik** = **o‘rik**',
          visual: { kind: 'tiles', items: ['o‘', '+', 'rik', '=', 'o‘rik'], highlight: [4] },
          replace: true,
        },
        {
          text: '**bo‘** + **ta** = **bo‘ta** — tuyaning bolasi!',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
      hint: 'Bolalar bo‘g‘inlarni avval sekin, keyin tez qo‘shib aytsin.',
    },
    {
      id: 'olma',
      type: 'choose-answer',
      question: 'Qaysi rasm? So‘zni o‘qing.',
      visual: { kind: 'word', text: 'olma' },
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'olma' } },
        { label: 'B', visual: { kind: 'picture', item: 'nok' } },
        { label: 'C', visual: { kind: 'picture', item: 'anor' } },
      ],
      correct: 0,
    },
    {
      id: 'qush',
      type: 'choose-answer',
      question: 'Qaysi rasm? So‘zni o‘qing.',
      visual: { kind: 'word', text: 'qush' },
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'baliq' } },
        { label: 'B', visual: { kind: 'picture', item: 'qush' } },
        { label: 'C', visual: { kind: 'picture', item: 'mushuk' } },
      ],
      correct: 1,
    },
    {
      id: 'ona',
      type: 'build-word',
      prompt: 'Bo‘g‘inlardan so‘z yasang',
      word: 'ona',
      tiles: ['o', 'na'],
      extra: ['ma'],
    },
    {
      id: 'quyon',
      type: 'build-word',
      prompt: 'Bo‘g‘inlardan so‘z yasang',
      word: 'quyon',
      tiles: ['qu', 'yon'],
      extra: ['ya'],
      picture: 'quyon',
    },
    {
      id: 'soz-rasm',
      type: 'drag-match',
      prompt: 'So‘zni o‘qib, rasmiga olib boring',
      pairs: [
        { item: { label: 'it' }, target: { visual: { kind: 'picture', item: 'it' } } },
        { item: { label: 'mushuk' }, target: { visual: { kind: 'picture', item: 'mushuk' } } },
        { item: { label: 'sigir' }, target: { visual: { kind: 'picture', item: 'sigir' } } },
      ],
    },
    {
      id: 'botajon-oqiydi',
      type: 'story',
      title: 'Bo‘tajon o‘qiydi',
      pages: [
        { text: 'Bo‘tajon **kitob** ochdi.', visual: { kind: 'picture', item: 'kitob' } },
        { text: 'U **o‘qish**ni juda yaxshi ko‘radi.', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'Siz ham o‘qing: **ona**, **ota**, **opa**.',
          visual: { kind: 'tiles', items: ['ona', 'ota', 'opa'] },
        },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Bo‘g‘inlarni **qo‘shib** o‘qiymiz.',
        'o + na = **ona**',
        'Har kuni ozgina o‘qisak, **tez** o‘qiymiz.',
      ],
    },
  ],
});
