// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar gapning ikkinchi darajali bo‘laklarini so‘roqlari orqali topadi.',
    questions: ['Aniqlovchi qanday so‘roqqa javob beradi?', 'Hol nimani bildiradi?', '“Kitobni” qaysi bo‘lak?'],
    minutes: 25,
  },
  scenes: [
    {
      id: 'bolak',
      type: 'explain',
      title: 'Ikkinchi darajali bo‘laklar',
      steps: [
        {
          text: '**To‘ldiruvchi**: kimni? nimani? kimga? — **kitobni** o‘qidi',
          visual: { kind: 'tiles', items: ['kitobni'] },
        },
        {
          text: '**Aniqlovchi**: qanday? qaysi? kimning? — **qizil** olma',
          visual: { kind: 'tiles', items: ['qizil'] },
        },
        {
          text: '**Hol**: qayerda? qachon? qanday? — **ertalab** keldi',
          visual: { kind: 'tiles', items: ['ertalab'] },
        },
      ],
    },
    {
      id: 'soroq',
      type: 'drag-match',
      prompt: 'So‘roqni bo‘lakka olib boring',
      pairs: [
        { item: { label: 'qanday? qaysi?' }, target: { label: 'aniqlovchi' } },
        { item: { label: 'nimani? kimga?' }, target: { label: 'to‘ldiruvchi' } },
        { item: { label: 'qachon? qayerda?' }, target: { label: 'hol' } },
      ],
    },
    {
      id: 'gap1',
      type: 'choose-answer',
      question: '«Malika chiroyli rasm chizdi.» “chiroyli” qaysi bo‘lak?',
      options: [{ label: 'Aniqlovchi' }, { label: 'Hol' }, { label: 'To‘ldiruvchi' }],
      correct: 0,
    },
    {
      id: 'gap2',
      type: 'choose-answer',
      question: '«Biz kecha bog‘ga bordik.» “kecha” qaysi bo‘lak?',
      options: [{ label: 'Hol' }, { label: 'Aniqlovchi' }, { label: 'Ega' }],
      correct: 0,
    },
    {
      id: 'qaysi',
      type: 'sort-groups',
      prompt: 'Qaysi bo‘lak?',
      groups: [{ label: 'To‘ldiruvchi' }, { label: 'Hol' }],
      items: [
        { label: 'xatni (yozdi)', group: 0 },
        { label: 'tez (yugurdi)', group: 1 },
        { label: 'onasiga (aytdi)', group: 0 },
        { label: 'uyda (o‘tirdi)', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**To‘ldiruvchi** — kimni? nimani?', '**Aniqlovchi** — qanday? **Hol** — qachon? qayerda?'],
    },
  ],
});
