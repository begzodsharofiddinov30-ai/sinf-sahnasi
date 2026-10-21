// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar O‘zbekistonning cho‘l, adir va tog‘ zonalarini, ularning o‘simlik va hayvonlarini biladi.',
    questions: ['Cho‘lda qanday o‘simliklar o‘sadi?', 'Tog‘da qaysi hayvonlar yashaydi?', 'Adirlar qayerda joylashgan?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'zona',
      type: 'explain',
      title: 'Uch zona',
      steps: [
        {
          text: '**Cho‘l** — issiq, kam yog‘in: saksovul, jayron, toshbaqa.',
          visual: { kind: 'picture', item: 'quyosh' },
        },
        {
          text: '**Adir** — tog‘ etaklari: bahorda lola va boychechak.',
          visual: { kind: 'picture', item: 'gul' },
          replace: true,
        },
        {
          text: '**Tog‘** — salqin: archa, qor qoploni, tog‘ echkisi.',
          visual: { kind: 'picture', item: 'qor' },
          replace: true,
        },
      ],
    },
    {
      id: 'qayerda',
      type: 'sort-groups',
      prompt: 'Qaysi zonada?',
      groups: [{ label: 'Cho‘l' }, { label: 'Tog‘' }],
      items: [
        { label: 'saksovul', group: 0 },
        { label: 'archa', group: 1 },
        { label: 'jayron', group: 0 },
        { label: 'qor qoploni', group: 1 },
        { label: 'toshbaqa', group: 0 },
        { label: 'tog‘ echkisi', group: 1 },
      ],
    },
    {
      id: 'issiq',
      type: 'choose-answer',
      question: 'Qaysi zona eng issiq va quruq?',
      options: [{ label: 'Cho‘l' }, { label: 'Tog‘' }, { label: 'Adir' }],
      correct: 0,
    },
    {
      id: 'lola',
      type: 'choose-answer',
      question: 'Bahorda adirlarda qaysi gul ko‘p ochiladi?',
      options: [{ label: 'Lola' }, { label: 'Atirgul' }, { label: 'Nilufar' }],
      correct: 0,
    },
    {
      id: 'suv',
      type: 'choose-answer',
      question: 'Cho‘l o‘simliklarining ildizi qanday?',
      options: [{ label: 'Juda uzun, chuqur suvga yetadi' }, { label: 'Umuman yo‘q' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['O‘zbekiston: **cho‘l, adir, tog‘**.', 'Har zonaning **o‘z** o‘simlik va hayvonlari bor.'],
    },
  ],
});
