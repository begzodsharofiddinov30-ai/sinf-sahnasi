// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar Qizil kitob nima ekanini va O‘zbekistondagi ba’zi noyob hayvonlarni biladi.',
    questions: ['Qizil kitob nima?', 'Qaysi hayvonlar kamayib ketmoqda?', 'Ularni qanday asraymiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Qizil kitob',
      steps: [
        {
          text: '**Qizil kitob** — kamayib ketayotgan hayvon va o‘simliklar ro‘yxati.',
          visual: { kind: 'picture', item: 'kitob' },
        },
        {
          text: 'O‘zbekistonda: **qor qoploni**, **jayron**, **Buxoro bug‘usi**.',
          visual: { kind: 'tiles', items: ['qor qoploni', 'jayron', 'Buxoro bug‘usi'] },
          replace: true,
        },
        {
          text: 'Ularni **qo‘riqxonalarda** himoya qilishadi.',
          visual: { kind: 'picture', item: 'daraxt' },
          replace: true,
        },
      ],
    },
    {
      id: 'nima-2',
      type: 'choose-answer',
      question: 'Qizil kitobga kimlar kiritiladi?',
      options: [{ label: 'Kamayib ketayotgan hayvon va o‘simliklar' }, { label: 'Hamma uy hayvonlari' }],
      correct: 0,
    },
    {
      id: 'qayerda',
      type: 'choose-answer',
      question: 'Noyob hayvonlar qayerda himoya qilinadi?',
      options: [{ label: 'Qo‘riqxonalarda' }, { label: 'Do‘konlarda' }],
      correct: 0,
    },
    {
      id: 'togri',
      type: 'sort-groups',
      prompt: 'Tabiatga to‘g‘ri munosabatmi?',
      groups: [{ label: 'To‘g‘ri' }, { label: 'Noto‘g‘ri' }],
      items: [
        { label: 'Qushlarga uya yasash', group: 0 },
        { label: 'Noyob gullarni terish', group: 1 },
        { label: 'Qo‘riqxonada shovqin qilmaslik', group: 0 },
        { label: 'Hayvonlarni ovlash', group: 1 },
      ],
    },
    {
      id: 'makon',
      type: 'drag-match',
      prompt: 'Hayvonni yashash joyiga olib boring',
      pairs: [
        { item: { label: 'qor qoploni' }, target: { label: 'baland tog‘lar' } },
        { item: { label: 'jayron' }, target: { label: 'cho‘l' } },
        { item: { label: 'Buxoro bug‘usi' }, target: { label: 'daryo bo‘yidagi to‘qayzor' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Qizil kitob — **himoyaga muhtoj** tabiat.', 'Qor qoploni, jayron, Buxoro bug‘usini **asraymiz**.'],
    },
  ],
});
