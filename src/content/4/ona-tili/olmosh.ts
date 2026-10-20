// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar kishilik olmoshlarini taniydi va gapda otni olmosh bilan almashtiradi.',
    questions: [
      'Olmosh nima uchun kerak?',
      'Kishilik olmoshlarini sanab bering.',
      '“Aziz” o‘rniga qaysi olmoshni ishlatamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Olmosh',
      steps: [
        { text: '**Olmosh** — ot o‘rnida keladi.', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'Men, sen, u, biz, siz, ular.',
          visual: { kind: 'tiles', items: ['men', 'sen', 'u', 'biz', 'siz', 'ular'] },
          replace: true,
        },
        {
          text: '«Aziz keldi. **U** kitob olib keldi.»',
          visual: { kind: 'tiles', items: ['Aziz', '→', 'U'] },
          replace: true,
        },
      ],
    },
    {
      id: 'qaysi',
      type: 'choose-answer',
      question: 'Qaysi so‘z **olmosh**?',
      options: [{ label: 'biz' }, { label: 'kitob' }, { label: 'yugurdi' }],
      correct: 0,
    },
    {
      id: 'toldir',
      type: 'choose-answer',
      question: '«Malika va Sardor bog‘ga borishdi. ___ gul terishdi.»',
      options: [{ label: 'Ular' }, { label: 'Men' }, { label: 'Sen' }],
      correct: 0,
    },
    {
      id: 'ajrat',
      type: 'sort-groups',
      prompt: 'Olmoshmi yoki otmi?',
      groups: [{ label: 'Olmosh' }, { label: 'Ot' }],
      items: [
        { label: 'men', group: 0 },
        { label: 'daftar', group: 1 },
        { label: 'ular', group: 0 },
        { label: 'quyosh', group: 1 },
        { label: 'siz', group: 0 },
        { label: 'shahar', group: 1 },
      ],
    },
    {
      id: 'shaxs',
      type: 'drag-match',
      prompt: 'Olmoshni shaxsiga olib boring',
      pairs: [
        { item: { label: 'men' }, target: { label: '1-shaxs, birlik' } },
        { item: { label: 'biz' }, target: { label: '1-shaxs, ko‘plik' } },
        { item: { label: 'sen' }, target: { label: '2-shaxs, birlik' } },
        { item: { label: 'ular' }, target: { label: '3-shaxs, ko‘plik' } },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**Olmosh** ot o‘rnida keladi.', 'Kishilik olmoshlari: men, sen, u, biz, siz, ular.'],
    },
  ],
});
