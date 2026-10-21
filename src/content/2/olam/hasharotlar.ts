// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar hasharotlarning belgilarini biladi va ularni boshqa jonzotlardan ajratadi.',
    questions: ['Hasharotning nechta oyog‘i bor?', 'Qaysi hasharotlarni bilasiz?', 'Asalari qanday foyda keltiradi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'belgi',
      type: 'explain',
      title: 'Hasharotlar',
      steps: [
        { text: 'Hasharotning **6 ta oyog‘i** bor.', visual: { kind: 'mascot', mood: 'think' } },
        {
          text: 'Masalan: **asalari, kapalak, chumoli**.',
          visual: { kind: 'tiles', items: ['asalari', 'kapalak', 'chumoli'] },
          replace: true,
        },
        {
          text: 'O‘rgimchakning 8 ta oyog‘i bor — u **hasharot emas**.',
          visual: { kind: 'tiles', items: ['8 oyoq'] },
          replace: true,
        },
      ],
    },
    {
      id: 'oyoq',
      type: 'choose-answer',
      question: 'Hasharotning nechta oyog‘i bor?',
      options: [{ label: '6' }, { label: '8' }, { label: '4' }],
      correct: 0,
    },
    {
      id: 'hasharotmi',
      type: 'sort-groups',
      prompt: 'Hasharotmi?',
      groups: [{ label: 'Hasharot' }, { label: 'Hasharot emas' }],
      items: [
        { label: 'asalari', group: 0 },
        { label: 'o‘rgimchak', group: 1 },
        { label: 'kapalak', group: 0 },
        { label: 'qush', group: 1 },
        { label: 'chumoli', group: 0 },
        { label: 'baliq', group: 1 },
      ],
    },
    {
      id: 'asal',
      type: 'choose-answer',
      question: 'Asalari bizga nima beradi?',
      options: [{ label: 'Asal' }, { label: 'Sut' }, { label: 'Jun' }],
      correct: 0,
    },
    {
      id: 'gul',
      type: 'choose-answer',
      question: 'Kapalak va asalari gullarga qanday foyda beradi?',
      options: [{ label: 'Changlatadi' }, { label: 'Yeb qo‘yadi' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Hasharotning **6** ta oyog‘i bor.', 'Asalari **asal** beradi va gullarni changlatadi.'],
    },
  ],
});
