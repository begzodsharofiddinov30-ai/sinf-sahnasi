// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar keng tarqalgan iboralarning ko‘chma ma’nosini tushunadi.',
    questions: ['“Qo‘li gul” deganda nimani tushunasiz?', 'Iboralar nutqni qanday qiladi?', 'Qaysi iboralarni bilasiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'ibora',
      type: 'explain',
      title: 'Ibora nima?',
      steps: [
        {
          text: '**Ibora** — so‘zma-so‘z emas, **ko‘chma** ma’noda ishlatiladigan birikma.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: '«Og‘zi qulog‘ida» — **juda xursand**.',
          visual: { kind: 'mascot', mood: 'cheer' },
          replace: true,
        },
        {
          text: '«Qo‘li gul» — **usta**, hamma ishni chiroyli qiladi.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'mano',
      type: 'drag-match',
      prompt: 'Iborani ma’nosiga olib boring',
      pairs: [
        { item: { label: 'og‘zi qulog‘ida' }, target: { label: 'juda xursand' } },
        { item: { label: 'qo‘li gul' }, target: { label: 'usta' } },
        { item: { label: 'tili shirin' }, target: { label: 'muloyim gapiradi' } },
        { item: { label: 'qulog‘i ding' }, target: { label: 'diqqat bilan tinglaydi' } },
      ],
    },
    {
      id: 'gap',
      type: 'choose-answer',
      question: '«Onam qo‘li gul usta.» Bu nima degani?',
      options: [{ label: 'Onam hamma ishni chiroyli qiladi' }, { label: 'Onamning qo‘lida gul bor' }],
      correct: 0,
    },
    {
      id: 'xursand',
      type: 'choose-answer',
      question: 'Juda xursand odam haqida qanday deymiz?',
      options: [{ label: 'Og‘zi qulog‘ida' }, { label: 'Qo‘li gul' }, { label: 'Tili shirin' }],
      correct: 0,
    },
    {
      id: 'ijobiy',
      type: 'sort-groups',
      prompt: 'Iboraning ma’nosi qanday?',
      groups: [{ label: 'Yaxshi ma’noda' }, { label: 'Yomon ma’noda' }],
      items: [
        { label: 'qo‘li gul', group: 0 },
        { label: 'tili uzun (gap tashiydi)', group: 1 },
        { label: 'ko‘ngli ochiq', group: 0 },
        { label: 'ichi qora (yomon niyatli)', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Iboralar **ko‘chma** ma’noda ishlatiladi.', 'Ular nutqni **jonli** qiladi.'],
    },
  ],
});
