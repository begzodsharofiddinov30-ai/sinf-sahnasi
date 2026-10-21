// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ravishni taniydi va uning so‘roqlarini beradi.',
    questions: ['Ravish nimani bildiradi?', '“Tez” so‘zi qaysi so‘roqqa javob beradi?', 'Ravishlarga misol keltiring.'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'ravish',
      type: 'explain',
      title: 'Ravish',
      steps: [
        { text: '**Ravish** — harakatning belgisini bildiradi.', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'Qanday? — **tez**, sekin. Qachon? — **kecha**, ertaga.',
          visual: { kind: 'tiles', items: ['tez', 'sekin', 'kecha', 'ertaga'] },
          replace: true,
        },
        {
          text: 'Qayerda? — **uzoqda**, yaqinda. Qancha? — **ko‘p**, oz.',
          visual: { kind: 'tiles', items: ['uzoqda', 'yaqinda', 'ko‘p', 'oz'] },
          replace: true,
        },
      ],
    },
    {
      id: 'soroq',
      type: 'sort-groups',
      prompt: 'Qaysi so‘roqqa javob beradi?',
      groups: [{ label: 'Qanday?' }, { label: 'Qachon?' }],
      items: [
        { label: 'tez', group: 0 },
        { label: 'kecha', group: 1 },
        { label: 'sekin', group: 0 },
        { label: 'ertaga', group: 1 },
        { label: 'chiroyli', group: 0 },
        { label: 'hozir', group: 1 },
      ],
    },
    {
      id: 'gapda',
      type: 'choose-answer',
      question: '«Bolalar maydonda tez yugurishdi.» Ravish qaysi?',
      options: [{ label: 'tez' }, { label: 'maydonda' }, { label: 'bolalar' }],
      correct: 0,
    },
    {
      id: 'qaysi',
      type: 'choose-answer',
      question: 'Qaysi so‘z ravish?',
      options: [{ label: 'ertaga' }, { label: 'ertak' }, { label: 'erta-mi' }],
      correct: 0,
    },
    {
      id: 'zid',
      type: 'drag-match',
      prompt: 'Zid ma’noli ravishni toping',
      pairs: [
        { item: { label: 'tez' }, target: { label: 'sekin' } },
        { item: { label: 'uzoqda' }, target: { label: 'yaqinda' } },
        { item: { label: 'ko‘p' }, target: { label: 'oz' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ravish — **harakat belgisi**.', 'So‘roqlari: **qanday? qachon? qayerda? qancha?**'],
    },
  ],
});
