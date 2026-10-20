// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar matnning asosiy fikrini aniqlaydi, uni tafsilotlardan ajratadi va matnga sarlavha tanlaydi.',
    questions: ['Asosiy fikr nima?', 'Matnga boshqa qanday sarlavha qo‘yish mumkin?', 'Sizga kitob nima beradi?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'nima',
      type: 'explain',
      title: 'Asosiy fikr',
      steps: [
        { text: '**Asosiy fikr** — muallif bizga nima demoqchi.', visual: { kind: 'mascot', mood: 'think' } },
        {
          text: 'So‘raymiz: matn **nima haqida**? Qanday **saboq** beradi?',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'nodira',
      type: 'story',
      title: 'Nodira va kitob',
      pages: [
        { text: 'Nodira kitob o‘qishni **yoqtirmas** edi.', visual: { kind: 'picture', item: 'kitob' } },
        {
          text: 'Bir kuni buvisi unga ertaklar kitobini **sovg‘a** qildi.',
          visual: { kind: 'mascot', mood: 'happy' },
        },
        {
          text: 'Nodira bitta ertakni o‘qidi, keyin yana bittasini…',
          visual: { kind: 'picture', item: 'kitob' },
        },
        {
          text: 'Endi u har kuni kutubxonaga boradi. Kitob unga **yangi dunyo** ochdi.',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
      ],
    },
    {
      id: 'asosiy',
      type: 'choose-answer',
      question: 'Matnning asosiy fikri qaysi?',
      options: [
        { label: 'Kitob o‘qish qiziqarli va foydali' },
        { label: 'Buvilar sovg‘a beradi' },
        { label: 'Kutubxona uzoqda' },
      ],
      correct: 0,
    },
    {
      id: 'sarlavha',
      type: 'choose-answer',
      question: 'Matnga mos sarlavha?',
      options: [{ label: 'Kitob — do‘stim' }, { label: 'Qishki o‘yin' }, { label: 'Bog‘dagi mehnat' }],
      correct: 0,
    },
    {
      id: 'avval',
      type: 'choose-answer',
      question: 'Nodira avval qanday edi?',
      options: [{ label: 'Kitob o‘qishni yoqtirmas edi' }, { label: 'Har kuni o‘qirdi' }, { label: 'Yozuvchi edi' }],
      correct: 0,
    },
    {
      id: 'fikr-tafsilot',
      type: 'sort-groups',
      prompt: 'Asosiy fikrmi yoki tafsilotmi?',
      groups: [{ label: 'Asosiy fikr' }, { label: 'Tafsilot' }],
      items: [
        { label: 'Kitob yangi dunyo ochadi', group: 0 },
        { label: 'Buvisi kitob sovg‘a qildi', group: 1 },
        { label: 'Nodira kutubxonaga boradi', group: 1 },
        { label: 'O‘qish insonni boyitadi', group: 0 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Asosiy fikr — muallifning **asosiy xabari**.', 'Uni **tafsilotlardan** ajratamiz.'],
    },
  ],
});
