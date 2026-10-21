// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar sifatning oddiy, qiyosiy va orttirma darajalarini qo‘llaydi.',
    questions: ['“Kattaroq” qanday yasalgan?', '“Eng” so‘zi nimani bildiradi?', 'Uchta narsani taqqoslang.'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'daraja',
      type: 'explain',
      title: 'Darajalar',
      steps: [
        { text: '**Oddiy**: katta', visual: { kind: 'tiles', items: ['katta'] } },
        { text: '**Qiyosiy**: katta**roq** (taqqoslab)', visual: { kind: 'tiles', items: ['kattaroq'] } },
        {
          text: '**Orttirma**: **eng** katta, **juda** katta',
          visual: { kind: 'tiles', items: ['eng katta'] },
        },
      ],
    },
    {
      id: 'qaysi',
      type: 'sort-groups',
      prompt: 'Qaysi daraja?',
      groups: [{ label: 'Oddiy' }, { label: 'Qiyosiy (-roq)' }, { label: 'Orttirma (eng, juda)' }],
      items: [
        { label: 'baland', group: 0 },
        { label: 'balandroq', group: 1 },
        { label: 'eng baland', group: 2 },
        { label: 'shirin', group: 0 },
        { label: 'shirinroq', group: 1 },
        { label: 'juda shirin', group: 2 },
      ],
    },
    {
      id: 'toldir',
      type: 'choose-answer',
      question: 'Sigir mushukdan ___.',
      options: [{ label: 'kattaroq' }, { label: 'eng katta' }, { label: 'katta' }],
      correct: 0,
    },
    {
      id: 'tezroq',
      type: 'build-word',
      prompt: 'Yasang: tezroq',
      word: 'tezroq',
      tiles: ['tez', 'roq'],
      extra: ['eng'],
    },
    {
      id: 'eng',
      type: 'choose-answer',
      question: 'Quyosh tizimidagi ___ katta sayyora — Yupiter.',
      options: [{ label: 'eng' }, { label: '-roq' }, { label: 'juda' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**-roq** — taqqoslash: kattaroq.', '**eng**, **juda** — eng yuqori daraja.'],
    },
  ],
});
