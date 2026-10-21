// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar O‘zbekiston davlat ramzlarini va ularga hurmat ko‘rsatishni biladi.',
    questions: [
      'Davlat ramzlari qaysilar?',
      'Madhiya yangraganda nima qilamiz?',
      'Bayrog‘imizdagi ranglar nimani anglatadi?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'ramz',
      type: 'explain',
      title: 'Davlat ramzlari',
      steps: [
        {
          text: '**Bayroq**: ko‘k, oq, yashil rang, yarim oy va 12 yulduz.',
          visual: { kind: 'items', item: 'yulduz', count: 12 },
        },
        {
          text: '**Gerb**: markazida **Humo** qushi.',
          visual: { kind: 'picture', item: 'qush' },
          replace: true,
        },
        {
          text: '**Madhiya**: tik turib, hurmat bilan tinglanadi.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'ramz-2',
      type: 'drag-match',
      prompt: 'Ramzni belgisiga olib boring',
      pairs: [
        { item: { label: 'Bayroq' }, target: { label: '12 yulduz va yarim oy' } },
        { item: { label: 'Gerb' }, target: { label: 'Humo qushi' } },
        { item: { label: 'Madhiya' }, target: { label: 'tik turib tinglanadi' } },
      ],
    },
    {
      id: 'madhiya',
      type: 'choose-answer',
      question: 'Davlat madhiyasi yangraganda nima qilamiz?',
      options: [{ label: 'O‘rnimizdan turamiz' }, { label: 'O‘tiraveramiz' }, { label: 'Gaplashamiz' }],
      correct: 0,
    },
    {
      id: 'mustaqillik',
      type: 'choose-answer',
      question: 'O‘zbekiston mustaqilligi qaysi yilda e’lon qilingan?',
      options: [{ label: '1991' }, { label: '2001' }, { label: '1941' }],
      correct: 0,
    },
    {
      id: 'konstitutsiya',
      type: 'choose-answer',
      question: 'Konstitutsiya kuni qachon nishonlanadi?',
      options: [{ label: '8-dekabr' }, { label: '1-sentabr' }, { label: '21-mart' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Davlat ramzlari: **bayroq, gerb, madhiya**.', 'Ramzlarni **hurmat** qilamiz.'],
    },
  ],
});
