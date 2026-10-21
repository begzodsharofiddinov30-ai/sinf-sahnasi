// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar meva va sabzavotlarni farqlaydi va ularning foydasini biladi.',
    questions: ['Qaysi mevalarni yaxshi ko‘rasiz?', 'Sabzavot qayerda o‘sadi?', 'Nega meva yeyish foydali?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'farq',
      type: 'explain',
      title: 'Meva va sabzavot',
      steps: [
        {
          text: '**Mevalar** ko‘pincha daraxtda o‘sadi: olma, o‘rik, anor.',
          visual: { kind: 'picture', item: 'olma' },
        },
        {
          text: '**Sabzavotlar** ko‘pincha polizda o‘sadi: sabzi, piyoz, kartoshka.',
          visual: { kind: 'picture', item: 'barg' },
          replace: true,
        },
        {
          text: 'Ikkalasida ham **vitamin** ko‘p!',
          visual: { kind: 'mascot', mood: 'cheer' },
          replace: true,
        },
      ],
    },
    {
      id: 'ajrat',
      type: 'sort-groups',
      prompt: 'Mevami yoki sabzavotmi?',
      groups: [{ label: 'Meva' }, { label: 'Sabzavot' }],
      items: [
        { label: 'olma', visual: { kind: 'picture', item: 'olma' }, group: 0 },
        { label: 'sabzi', group: 1 },
        { label: 'nok', visual: { kind: 'picture', item: 'nok' }, group: 0 },
        { label: 'piyoz', group: 1 },
        { label: 'uzum', visual: { kind: 'picture', item: 'uzum' }, group: 0 },
        { label: 'kartoshka', group: 1 },
      ],
    },
    {
      id: 'daraxtda',
      type: 'choose-answer',
      question: 'Qaysi biri daraxtda o‘sadi?',
      options: [{ label: 'olma', visual: { kind: 'picture', item: 'olma' } }, { label: 'sabzi' }, { label: 'piyoz' }],
      correct: 0,
    },
    {
      id: 'anorlar',
      type: 'count-and-tap',
      prompt: 'Savatdagi anorlarni sanang',
      item: 'anor',
      count: 6,
      layout: 'row',
    },
    {
      id: 'yuvish',
      type: 'choose-answer',
      question: 'Mevani yeyishdan oldin nima qilamiz?',
      options: [{ label: 'Yuvamiz' }, { label: 'Yerga tashlaymiz' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Mevalar — daraxtda, sabzavotlar — **polizda**.', 'Mevani **yuvib** yeymiz.'],
    },
  ],
});
