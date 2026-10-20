// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar matnni qismlarga ajratadi, har bir qismga sarlavha qo‘yadi va reja asosida qayta hikoya qiladi.',
    questions: ['Reja nima uchun kerak?', 'Matnni nechta qismga bo‘ldik?', 'Reja bo‘yicha qayta hikoya qilib bering.'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'reja',
      type: 'explain',
      title: 'Reja nima?',
      steps: [
        {
          text: '**Reja** — matnning qisqa mazmuni, qismlar bo‘yicha.',
          visual: { kind: 'mascot', mood: 'think' },
        },
        {
          text: 'Har bir qismga **sarlavha** qo‘yamiz.',
          visual: { kind: 'tiles', items: ['1.', '2.', '3.', '4.'] },
        },
        {
          text: 'Reja bo‘yicha matnni **qayta hikoya** qilamiz.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'uya',
      type: 'story',
      title: 'Qushlar uyasi',
      pages: [
        {
          text: 'Bahorda deraza yonidagi daraxtga **chumchuqlar** uya qurishdi.',
          visual: { kind: 'picture', item: 'daraxt' },
        },
        {
          text: 'Tez orada uyada kichkina **jo‘jalar** paydo bo‘ldi.',
          visual: { kind: 'picture', item: 'qush' },
        },
        { text: 'Sardor har kuni ularga **don** sepib qo‘ydi.', visual: { kind: 'mascot', mood: 'happy' } },
        { text: 'Yozda jo‘jalar o‘sib, **uchib** ketishdi.', visual: { kind: 'picture', item: 'quyosh' } },
      ],
    },
    {
      id: 'sarlavha',
      type: 'drag-match',
      prompt: 'Qismni sarlavhasiga olib boring',
      pairs: [
        { item: { label: '1-qism' }, target: { label: 'Uya qurildi' } },
        { item: { label: '2-qism' }, target: { label: 'Jo‘jalar chiqdi' } },
        { item: { label: '3-qism' }, target: { label: 'Sardorning g‘amxo‘rligi' } },
        { item: { label: '4-qism' }, target: { label: 'Jo‘jalar uchib ketdi' } },
      ],
    },
    {
      id: 'nom',
      type: 'choose-answer',
      question: 'Matnga eng mos sarlavha?',
      options: [{ label: 'Qushlar uyasi' }, { label: 'Qishki o‘yinlar' }, { label: 'Mening maktabim' }],
      correct: 0,
    },
    {
      id: 'yordam',
      type: 'choose-answer',
      question: 'Sardor qushlarga qanday yordam berdi?',
      options: [{ label: 'Don sepdi' }, { label: 'Uyani buzdi' }, { label: 'Hech narsa qilmadi' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Matnni **qismlarga** ajratamiz.',
        'Har bir qismga **sarlavha** qo‘yamiz.',
        'Reja bo‘yicha **qayta hikoya** qilamiz.',
      ],
    },
  ],
});
