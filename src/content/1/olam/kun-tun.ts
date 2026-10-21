// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar kun va tunning belgilarini biladi va ularni farqlaydi.',
    questions: ['Kunduzi osmonda nima bor?', 'Tunda osmonda nimani ko‘ramiz?', 'Qachon uxlaymiz?'],
    minutes: 10,
  },
  scenes: [
    {
      id: 'farq',
      type: 'explain',
      title: 'Kun va tun',
      steps: [
        {
          text: '**Kunduzi** osmonda **Quyosh**, hamma joy yorug‘.',
          visual: { kind: 'picture', item: 'quyosh' },
        },
        {
          text: '**Tunda** osmonda **Oy** va yulduzlar, qorong‘i.',
          visual: { kind: 'picture', item: 'oy' },
          replace: true,
        },
      ],
    },
    {
      id: 'qachon',
      type: 'sort-groups',
      prompt: 'Kunmi yoki tunmi?',
      groups: [{ label: 'Kun' }, { label: 'Tun' }],
      items: [
        { label: 'quyosh', visual: { kind: 'picture', item: 'quyosh' }, group: 0 },
        { label: 'oy', visual: { kind: 'picture', item: 'oy' }, group: 1 },
        { label: 'yulduzlar', visual: { kind: 'picture', item: 'yulduz' }, group: 1 },
        { label: 'maktabga borish', group: 0 },
        { label: 'uxlash', group: 1 },
      ],
    },
    {
      id: 'yulduzlar',
      type: 'count-and-tap',
      prompt: 'Osmondagi yulduzlarni sanang',
      item: 'yulduz',
      count: 8,
      layout: 'scatter',
    },
    {
      id: 'qorongi',
      type: 'choose-answer',
      question: 'Qachon qorong‘i bo‘ladi?',
      options: [{ label: 'Tunda' }, { label: 'Kunduzi' }],
      correct: 0,
    },
    {
      id: 'quyosh',
      type: 'choose-answer',
      question: 'Ertalab Quyosh nima qiladi?',
      options: [{ label: 'Chiqadi' }, { label: 'Botadi' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Kunduzi — **Quyosh**, tunda — **Oy** va yulduzlar.', 'Tun — dam olish vaqti.'],
    },
  ],
});
