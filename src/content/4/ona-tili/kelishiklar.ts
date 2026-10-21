// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar oltita kelishikni, qo‘shimchalari va so‘roqlarini biladi.',
    questions: ['Nechta kelishik bor?', '“Maktabga” qaysi kelishikda?', '“Kitobni” qaysi so‘roqqa javob beradi?'],
    minutes: 25,
  },
  scenes: [
    {
      id: 'olti',
      type: 'explain',
      title: 'Oltita kelishik',
      steps: [
        { text: '**Bosh**: kim? nima? — kitob', visual: { kind: 'tiles', items: ['kitob'] } },
        { text: '**Qaratqich** (-ning): kimning? — kitobning', visual: { kind: 'tiles', items: ['-ning'] } },
        { text: '**Tushum** (-ni): kimni? nimani? — kitobni', visual: { kind: 'tiles', items: ['-ni'] } },
        { text: '**Jo‘nalish** (-ga): qayerga? — maktabga', visual: { kind: 'tiles', items: ['-ga'] } },
        { text: '**O‘rin-payt** (-da): qayerda? — maktabda', visual: { kind: 'tiles', items: ['-da'] } },
        { text: '**Chiqish** (-dan): qayerdan? — maktabdan', visual: { kind: 'tiles', items: ['-dan'] } },
      ],
    },
    {
      id: 'qoshimcha',
      type: 'drag-match',
      prompt: 'Qo‘shimchani kelishikka olib boring',
      pairs: [
        { item: { label: '-ga' }, target: { label: 'jo‘nalish' } },
        { item: { label: '-da' }, target: { label: 'o‘rin-payt' } },
        { item: { label: '-dan' }, target: { label: 'chiqish' } },
        { item: { label: '-ni' }, target: { label: 'tushum' } },
      ],
    },
    {
      id: 'maktabga',
      type: 'choose-answer',
      question: '“Maktabga” qaysi kelishikda?',
      options: [{ label: 'Jo‘nalish' }, { label: 'Chiqish' }, { label: 'Qaratqich' }],
      correct: 0,
    },
    {
      id: 'soroq',
      type: 'sort-groups',
      prompt: 'Qaysi so‘roqqa javob beradi?',
      groups: [{ label: 'Qayerda?' }, { label: 'Qayerdan?' }],
      items: [
        { label: 'uyda', group: 0 },
        { label: 'uydan', group: 1 },
        { label: 'bog‘da', group: 0 },
        { label: 'bog‘dan', group: 1 },
      ],
    },
    {
      id: 'nechta',
      type: 'choose-answer',
      question: 'O‘zbek tilida nechta kelishik bor?',
      options: [{ label: '6' }, { label: '4' }, { label: '8' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**6** ta kelishik: bosh, qaratqich, tushum, jo‘nalish, o‘rin-payt, chiqish.',
        '-ning, -ni, -ga, -da, -dan',
      ],
    },
  ],
});
