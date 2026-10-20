// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar otning birlik va ko‘plik shaklini farqlaydi va -lar qo‘shimchasini to‘g‘ri qo‘shadi.',
    questions: ['Bitta va ko‘p narsani qanday aytamiz?', '“Kitob” ning ko‘pligi qanday?', 'Ko‘plik qo‘shimchasi qaysi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Birlik va ko‘plik',
      steps: [
        { text: 'Bitta narsa — **birlik**: olma.', visual: { kind: 'items', item: 'olma', count: 1 } },
        {
          text: 'Ko‘p narsa — **ko‘plik**: olma**lar**.',
          visual: { kind: 'items', item: 'olma', count: 5 },
          replace: true,
        },
        {
          text: 'Ko‘plik qo‘shimchasi: **-lar**',
          visual: { kind: 'tiles', items: ['kitob', '+', 'lar', '=', 'kitoblar'], highlight: [2] },
          replace: true,
        },
      ],
    },
    {
      id: 'qushlar',
      type: 'build-word',
      prompt: 'Ko‘plik shaklini yasang',
      word: 'qushlar',
      tiles: ['qush', 'lar'],
      extra: ['li'],
      picture: 'qush',
    },
    {
      id: 'gullar',
      type: 'build-word',
      prompt: 'Ko‘plik shaklini yasang',
      word: 'gullar',
      tiles: ['gul', 'lar'],
      extra: ['ga'],
      picture: 'gul',
    },
    {
      id: 'ajrat',
      type: 'sort-groups',
      prompt: 'Birlikmi yoki ko‘plikmi?',
      groups: [{ label: 'Birlik' }, { label: 'Ko‘plik' }],
      items: [
        { label: 'daftar', group: 0 },
        { label: 'daftarlar', group: 1 },
        { label: 'bola', group: 0 },
        { label: 'bolalar', group: 1 },
        { label: 'tog‘lar', group: 1 },
        { label: 'daryo', group: 0 },
      ],
    },
    {
      id: 'baliq',
      type: 'choose-answer',
      question: '«Baliq» so‘zining ko‘pligi?',
      options: [{ label: 'baliqlar' }, { label: 'baliqla' }, { label: 'baliqgar' }],
      correct: 0,
    },
    {
      id: 'rasm',
      type: 'choose-answer',
      question: 'Rasmga qaysi so‘z mos?',
      visual: { kind: 'items', item: 'quyon', count: 4 },
      options: [{ label: 'quyonlar' }, { label: 'quyon' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Bitta — **birlik**, ko‘p — **ko‘plik**.', 'Ko‘plik qo‘shimchasi: **-lar**.'],
    },
  ],
});
