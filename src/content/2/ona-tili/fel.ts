// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar fe’lni harakatni bildiruvchi so‘z sifatida taniydi va nima qildi? so‘rog‘ini beradi.',
    questions: ['Fe’l nimani bildiradi?', 'Ertalab qanday ishlar qilasiz?', '“Qush” qanday harakat qiladi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'fel',
      type: 'explain',
      title: 'Fe’l',
      steps: [
        { text: '**Fe’l** — **harakat**ni bildiradi.', visual: { kind: 'mascot', mood: 'cheer' } },
        {
          text: '**Nima qildi?** — yugurdi, yozdi, o‘qidi.',
          visual: { kind: 'tiles', items: ['yugurdi', 'yozdi', 'o‘qidi'] },
          replace: true,
        },
        {
          text: '**Nima qilyapti?** — o‘ynayapti, kulyapti.',
          visual: { kind: 'tiles', items: ['o‘ynayapti', 'kulyapti'] },
          replace: true,
        },
      ],
      hint: 'O‘qituvchi harakat qiladi, bolalar fe’lni topadi: “O‘tirdi! Turdi!”',
    },
    {
      id: 'qaysi',
      type: 'choose-answer',
      question: 'Qaysi so‘z **fe’l**?',
      options: [{ label: 'olma' }, { label: 'sakradi' }, { label: 'qizil' }],
      correct: 1,
    },
    {
      id: 'ot-fel',
      type: 'sort-groups',
      prompt: 'Otmi yoki fe’lmi?',
      groups: [{ label: 'Ot' }, { label: 'Fe’l' }],
      items: [
        { label: 'qush', group: 0 },
        { label: 'uchdi', group: 1 },
        { label: 'bola', group: 0 },
        { label: 'yozdi', group: 1 },
        { label: 'kitob', group: 0 },
        { label: 'o‘qiydi', group: 1 },
      ],
    },
    {
      id: 'gapda',
      type: 'choose-answer',
      question: '«Bo‘tajon daryoda suzdi.» Fe’lni toping.',
      options: [{ label: 'Bo‘tajon' }, { label: 'daryoda' }, { label: 'suzdi' }],
      correct: 2,
    },
    {
      id: 'harakat',
      type: 'drag-match',
      prompt: 'Kim nima qiladi?',
      pairs: [
        { item: { label: 'qush', visual: { kind: 'picture', item: 'qush' } }, target: { label: 'uchadi' } },
        { item: { label: 'baliq', visual: { kind: 'picture', item: 'baliq' } }, target: { label: 'suzadi' } },
        { item: { label: 'it', visual: { kind: 'picture', item: 'it' } }, target: { label: 'huradi' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Fe’l** — harakat.', 'So‘rog‘i: **nima qildi?** **nima qilyapti?**'],
    },
  ],
});
