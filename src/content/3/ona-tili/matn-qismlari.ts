// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar matnning kirish, asosiy qism va xulosa qismlarini aniqlaydi.',
    questions: ['Matn qanday boshlanadi?', 'Asosiy qismda nima bo‘ladi?', 'Xulosada nima aytiladi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qism',
      type: 'explain',
      title: 'Matn qismlari',
      steps: [
        { text: '**Kirish** — nima haqida gap borishi.', visual: { kind: 'tiles', items: ['1. Kirish'] } },
        {
          text: '**Asosiy qism** — voqealar, tafsilotlar.',
          visual: { kind: 'tiles', items: ['2. Asosiy qism'] },
        },
        { text: '**Xulosa** — yakun, fikr.', visual: { kind: 'tiles', items: ['3. Xulosa'] } },
      ],
    },
    {
      id: 'matn',
      type: 'story',
      title: 'Bizning bog‘',
      pages: [
        { text: 'Uyimiz yonida kichkina **bog‘** bor.', visual: { kind: 'picture', item: 'daraxt' } },
        {
          text: 'Bahorda olma, o‘rik **gullaydi**, yozda meva pishadi.',
          visual: { kind: 'picture', item: 'olma' },
        },
        { text: 'Men bog‘imizni juda **yaxshi ko‘raman**.', visual: { kind: 'mascot', mood: 'happy' } },
      ],
    },
    {
      id: 'qaysi',
      type: 'drag-match',
      prompt: 'Gapni matn qismiga olib boring',
      pairs: [
        { item: { label: 'Uyimiz yonida kichkina bog‘ bor.' }, target: { label: 'Kirish' } },
        { item: { label: 'Bahorda olma, o‘rik gullaydi.' }, target: { label: 'Asosiy qism' } },
        { item: { label: 'Men bog‘imizni yaxshi ko‘raman.' }, target: { label: 'Xulosa' } },
      ],
    },
    {
      id: 'xulosa',
      type: 'choose-answer',
      question: 'Xulosada odatda nima bo‘ladi?',
      options: [{ label: 'Yakuniy fikr' }, { label: 'Yangi voqea boshlanishi' }, { label: 'Faqat sarlavha' }],
      correct: 0,
    },
    {
      id: 'kirish',
      type: 'choose-answer',
      question: 'Kirish qismida nima bo‘ladi?',
      options: [{ label: 'Mavzu bilan tanishtiriladi' }, { label: 'Yakuniy xulosa' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Matn: **kirish, asosiy qism, xulosa**.', 'Har qism o‘z **vazifasini** bajaradi.'],
    },
  ],
});
