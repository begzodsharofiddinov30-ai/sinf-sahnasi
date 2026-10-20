// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar chiqindini saralashni, suv va elektrni tejashni va tabiatga foydali odatlarni biladi.',
    questions: [
      'Chiqindini nega saralaymiz?',
      'Uyda suvni qanday tejash mumkin?',
      'Sinfimiz tabiat uchun nima qila oladi?',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'nega',
      type: 'explain',
      title: 'Tabiat — umumiy uyimiz',
      steps: [
        { text: 'Tabiat — bizning **umumiy uyimiz**.', visual: { kind: 'picture', item: 'daraxt' } },
        {
          text: 'Chiqindini **saralab** tashlasak, uni qayta ishlash mumkin.',
          visual: { kind: 'picture', item: 'shisha' },
          replace: true,
        },
        {
          text: '**Suv** va **elektr**ni tejaymiz.',
          visual: { kind: 'picture', item: 'tomchi' },
          replace: true,
        },
      ],
    },
    {
      id: 'saralash',
      type: 'sort-groups',
      prompt: 'Chiqindini to‘g‘ri qutiga soling',
      groups: [
        { label: 'Qog‘oz', visual: { kind: 'picture', item: 'qogoz' } },
        { label: 'Plastik va shisha', visual: { kind: 'picture', item: 'shisha' } },
        { label: 'Oziq-ovqat qoldig‘i', visual: { kind: 'picture', item: 'olma' } },
      ],
      items: [
        { label: 'gazeta', group: 0 },
        { label: 'karton quti', group: 0 },
        { label: 'plastik idish', group: 1 },
        { label: 'shisha banka', group: 1 },
        { label: 'olma po‘chog‘i', group: 2 },
        { label: 'non qoldig‘i', group: 2 },
      ],
    },
    {
      id: 'jomrak',
      type: 'choose-answer',
      question: 'Tish yuvayotganda jo‘mrakni nima qilamiz?',
      options: [{ label: 'Yopib qo‘yamiz' }, { label: 'Ochiq qoldiramiz' }],
      correct: 0,
    },
    {
      id: 'daraxt',
      type: 'choose-answer',
      question: 'Daraxt nima uchun kerak?',
      options: [{ label: 'Havoni tozalaydi, soya beradi' }, { label: 'Faqat o‘tin uchun' }, { label: 'Kerak emas' }],
      correct: 0,
    },
    {
      id: 'odat',
      type: 'sort-groups',
      prompt: 'Tabiatga foydalimi yoki zararlimi?',
      groups: [{ label: 'Foydali' }, { label: 'Zararli' }],
      items: [
        { label: 'Daraxt ekish', group: 0 },
        { label: 'Axlatni yerga tashlash', group: 1 },
        { label: 'Chiroqni o‘chirish', group: 0 },
        { label: 'Suvni behuda oqizish', group: 1 },
        { label: 'Qushlarga in yasash', group: 0 },
        { label: 'Gullarni payhon qilish', group: 1 },
      ],
    },
    {
      id: 'bir-odam',
      type: 'choose-answer',
      question: 'Bitta odam tabiatga yordam bera oladimi?',
      options: [{ label: 'Ha, har bir kichik ish muhim' }, { label: 'Yo‘q, bu befoyda' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Chiqindini **saralaymiz**.',
        '**Suv** va **elektr**ni tejaymiz.',
        'Har bir kichik ish tabiatga **yordam**.',
      ],
    },
  ],
});
