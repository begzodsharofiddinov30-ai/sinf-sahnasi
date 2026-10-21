// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar matndagi tasviriy so‘zlarni (rang, tovush, his) topadi va o‘z gaplarida ishlatadi.',
    questions: ['Tasviriy so‘z nima?', '“Shildirab oqadi” — qanday tasvir?', 'Bahorni tasvirlab bering.'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Tasviriy so‘zlar',
      steps: [
        {
          text: 'Tasviriy so‘zlar **ko‘z oldimizga** rasm keltiradi.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        {
          text: 'Ariq **shildirab** oqadi. Osmon **moviy**.',
          visual: { kind: 'picture', item: 'suv' },
          replace: true,
        },
        { text: 'Quyosh **charaqlab** turibdi.', visual: { kind: 'picture', item: 'quyosh' }, replace: true },
      ],
    },
    {
      id: 'tasvir',
      type: 'drag-match',
      prompt: 'Narsani tasviriy so‘ziga olib boring',
      pairs: [
        { item: { label: 'ariq' }, target: { label: 'shildirab oqadi' } },
        { item: { label: 'quyosh' }, target: { label: 'charaqlaydi' } },
        { item: { label: 'qor' }, target: { label: 'oppoq' } },
        { item: { label: 'shamol' }, target: { label: 'g‘uvillaydi' } },
      ],
    },
    {
      id: 'qaysi',
      type: 'choose-answer',
      question: 'Qaysi gap tasviriyroq?',
      options: [{ label: 'Moviy osmonda oppoq bulutlar suzardi.' }, { label: 'Osmonda bulut bor edi.' }],
      correct: 0,
    },
    {
      id: 'tur',
      type: 'sort-groups',
      prompt: 'Bu so‘z nimani tasvirlaydi?',
      groups: [{ label: 'Rang' }, { label: 'Tovush' }],
      items: [
        { label: 'qip-qizil', group: 0 },
        { label: 'shildir-shildir', group: 1 },
        { label: 'yam-yashil', group: 0 },
        { label: 'g‘uv-g‘uv', group: 1 },
      ],
    },
    {
      id: 'yam-yashil',
      type: 'build-word',
      prompt: 'Tasviriy so‘z yasang: yam-yashil',
      word: 'yam-yashil',
      tiles: ['yam-', 'yashil'],
      extra: ['qip-'],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Tasviriy so‘zlar matnni **jonli** qiladi.', 'Rang, tovush, harakatni **tasvirlaymiz**.'],
    },
  ],
});
