// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar so‘zning o‘zagi va qo‘shimchalarini ajratadi.',
    questions: ['O‘zak nima?', '“Kitoblarim” so‘zining o‘zagi qaysi?', 'Qo‘shimcha nima beradi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'ozak',
      type: 'explain',
      title: 'O‘zak va qo‘shimcha',
      steps: [
        { text: '**O‘zak** — so‘zning asosiy ma’noli qismi.', visual: { kind: 'tiles', items: ['kitob'] } },
        {
          text: '**Qo‘shimcha** o‘zakka qo‘shiladi: kitob**lar**, kitob**im**.',
          visual: { kind: 'tiles', items: ['kitob', 'lar', 'im'], highlight: [0] },
          replace: true,
        },
      ],
    },
    {
      id: 'ozak1',
      type: 'choose-answer',
      question: '“Gulzorlar” so‘zining o‘zagi?',
      options: [{ label: 'gul' }, { label: 'gulzor' }, { label: 'lar' }],
      correct: 0,
    },
    {
      id: 'ozak2',
      type: 'choose-answer',
      question: '“Daftarimda” so‘zining o‘zagi?',
      options: [{ label: 'daftar' }, { label: 'im' }, { label: 'da' }],
      correct: 0,
    },
    {
      id: 'yig',
      type: 'build-word',
      prompt: 'O‘zak va qo‘shimchalardan yig‘ing: maktabimiz',
      word: 'maktabimiz',
      tiles: ['maktab', 'imiz'],
      extra: ['lar'],
    },
    {
      id: 'qism',
      type: 'sort-groups',
      prompt: 'O‘zakmi yoki qo‘shimchami?',
      groups: [{ label: 'O‘zak' }, { label: 'Qo‘shimcha' }],
      items: [
        { label: 'bola', group: 0 },
        { label: '-lar', group: 1 },
        { label: 'qush', group: 0 },
        { label: '-ning', group: 1 },
        { label: 'suv', group: 0 },
        { label: '-da', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['So‘z = **o‘zak** + **qo‘shimcha**.', 'O‘zak — so‘zning **asosiy** qismi.'],
    },
  ],
});
