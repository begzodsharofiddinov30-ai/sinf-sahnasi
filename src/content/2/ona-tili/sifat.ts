// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar sifatni narsaning belgisini (rang, hajm, maza) bildiruvchi so‘z sifatida topadi.',
    questions: ['Sifat nimani bildiradi?', 'Olma qanday bo‘ladi?', 'Sinfimiz qanday?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'sifat',
      type: 'explain',
      title: 'Sifat',
      steps: [
        {
          text: '**Sifat** narsaning belgisini bildiradi: **qanday?**',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: '**Qizil** olma, **katta** uy, **shirin** uzum.',
          visual: { kind: 'tiles', items: ['qizil olma', 'katta uy', 'shirin uzum'] },
          replace: true,
        },
        {
          text: 'Rang, hajm, maza — hammasi **sifat**.',
          visual: { kind: 'picture', item: 'uzum' },
          replace: true,
        },
      ],
    },
    {
      id: 'qaysi',
      type: 'choose-answer',
      question: 'Qaysi so‘z **sifat**?',
      options: [{ label: 'yashil' }, { label: 'yugurdi' }, { label: 'daraxt' }],
      correct: 0,
    },
    {
      id: 'olma',
      type: 'choose-answer',
      question: 'Olma qanday? Rasmga qarang.',
      visual: { kind: 'picture', item: 'olma' },
      options: [{ label: 'qizil' }, { label: 'ko‘k' }, { label: 'qora' }],
      correct: 0,
    },
    {
      id: 'belgi',
      type: 'drag-match',
      prompt: 'Narsani belgisiga olib boring',
      pairs: [
        { item: { label: 'qor', visual: { kind: 'picture', item: 'qor' } }, target: { label: 'oq' } },
        {
          item: { label: 'quyosh', visual: { kind: 'picture', item: 'quyosh' } },
          target: { label: 'issiq' },
        },
        { item: { label: 'uzum', visual: { kind: 'picture', item: 'uzum' } }, target: { label: 'shirin' } },
      ],
    },
    {
      id: 'ot-sifat',
      type: 'sort-groups',
      prompt: 'Otmi yoki sifatmi?',
      groups: [{ label: 'Ot' }, { label: 'Sifat' }],
      items: [
        { label: 'baland', group: 1 },
        { label: 'tog‘', group: 0 },
        { label: 'sovuq', group: 1 },
        { label: 'muz', group: 0 },
        { label: 'yumshoq', group: 1 },
        { label: 'yostiq', group: 0 },
      ],
    },
    {
      id: 'gapda',
      type: 'choose-answer',
      question: '«Kichkina mushuk sut ichdi.» Sifatni toping.',
      options: [{ label: 'Kichkina' }, { label: 'mushuk' }, { label: 'ichdi' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Sifat** — belgi: rang, hajm, maza.', 'So‘rog‘i: **qanday?**'],
    },
  ],
});
