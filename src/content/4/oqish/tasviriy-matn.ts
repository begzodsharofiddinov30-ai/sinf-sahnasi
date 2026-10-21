// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar tasviriy matnni hikoya matnidan farqlaydi va qisqa tasvir tuzadi.',
    questions: ['Tasviriy matn nimani beradi?', 'Hikoya va tasvirning farqi?', 'Sinfingizni tasvirlab bering.'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'tasvir',
      type: 'story',
      title: 'Bizning hovli',
      pages: [
        { text: 'Hovlimiz **keng** va **yorug‘**.', visual: { kind: 'picture', item: 'quyosh' } },
        { text: 'O‘rtada **ko‘m-ko‘k** tok so‘risi bor.', visual: { kind: 'picture', item: 'uzum' } },
        { text: 'Burchakda **qip-qizil** atirgullar ochilgan.', visual: { kind: 'picture', item: 'gul' } },
      ],
    },
    {
      id: 'tur',
      type: 'choose-answer',
      question: 'Bu qanday matn?',
      options: [{ label: 'Tasviriy' }, { label: 'Hikoya' }, { label: 'She’r' }],
      correct: 0,
    },
    {
      id: 'farq',
      type: 'choose-answer',
      question: 'Tasviriy matnda asosan nima bo‘ladi?',
      options: [{ label: 'Narsaning belgilari (rang, shakl)' }, { label: 'Voqealar ketma-ketligi' }],
      correct: 0,
    },
    {
      id: 'qaysi',
      type: 'sort-groups',
      prompt: 'Tasvirmi yoki voqeami?',
      groups: [{ label: 'Tasvir' }, { label: 'Voqea' }],
      items: [
        { label: 'Daraxt baland va soyali.', group: 0 },
        { label: 'Keyin biz uyga qaytdik.', group: 1 },
        { label: 'Osmon moviy edi.', group: 0 },
        { label: 'Bola koptokni tepdi.', group: 1 },
      ],
    },
    {
      id: 'belgi',
      type: 'drag-match',
      prompt: 'Narsani tasviriga olib boring',
      pairs: [
        { item: { label: 'atirgul' }, target: { label: 'qip-qizil' } },
        { item: { label: 'tok' }, target: { label: 'ko‘m-ko‘k' } },
        { item: { label: 'hovli' }, target: { label: 'keng va yorug‘' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Tasviriy matn — **so‘z bilan chizilgan rasm**.', 'Rang, shakl, hid, tovushni **tasvirlaymiz**.'],
    },
  ],
});
