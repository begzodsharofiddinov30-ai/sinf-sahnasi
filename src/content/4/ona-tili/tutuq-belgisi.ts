// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar o‘, g‘ harflarini va tutuq belgisini (’) farqlaydi hamda so‘zlarda to‘g‘ri yozadi.',
    questions: [
      'o‘ va g‘ dagi belgi tutuq belgisimi?',
      'Tutuq belgisi qanday so‘zlarda keladi?',
      '“Ma’no” so‘zini qanday talaffuz qilamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Belgilarni farqlaymiz',
      steps: [
        {
          text: '**o‘** va **g‘** — alohida harflar: **o‘**rik, **g‘**oz.',
          visual: { kind: 'word', text: 'o‘rik', highlight: [0, 1] },
        },
        {
          text: '**Tutuq belgisi** (’) tovushni ajratib aytishga yordam beradi: ma’no, san’at.',
          visual: { kind: 'tiles', items: ['ma’no', 'san’at', 'ta’lim'] },
          replace: true,
        },
        {
          text: 'o‘, g‘ dagi belgi (‘) va tutuq belgisi (’) — **boshqa-boshqa** belgilar!',
          visual: { kind: 'tiles', items: ['o‘', 'g‘', '’'] },
          replace: true,
        },
      ],
      hint: 'Doskada ikkala belgini katta qilib yozib ko‘rsating.',
    },
    {
      id: 'togri',
      type: 'choose-answer',
      question: 'Qaysi so‘z to‘g‘ri yozilgan?',
      options: [{ label: 'ma’no' }, { label: 'mano' }, { label: 'ma‘no' }],
      correct: 0,
    },
    {
      id: 'goz',
      type: 'build-word',
      prompt: 'So‘zni yig‘ing: g‘oz',
      word: 'g‘oz',
      tiles: ['g‘', 'o', 'z'],
      extra: ['g'],
      retryHint: 'g‘ — bitta harf.',
    },
    {
      id: 'ordak',
      type: 'build-word',
      prompt: 'So‘zni yig‘ing: o‘rdak',
      word: 'o‘rdak',
      tiles: ['o‘', 'r', 'd', 'a', 'k'],
      extra: ['o'],
    },
    {
      id: 'bormi',
      type: 'sort-groups',
      prompt: 'Tutuq belgisi bormi?',
      groups: [{ label: 'Tutuq belgisi bor' }, { label: 'Tutuq belgisi yo‘q' }],
      items: [
        { label: 'ta’lim', group: 0 },
        { label: 'kitob', group: 1 },
        { label: 'mo‘jiza', group: 1 },
        { label: 'san’at', group: 0 },
        { label: 'qal’a', group: 0 },
        { label: 'bog‘', group: 1 },
      ],
      retryHint: 'Diqqat: o‘ va g‘ dagi belgi tutuq belgisi emas.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['**o‘**, **g‘** — alohida harflar.', '**Tutuq belgisi** (’): ma’no, san’at, ta’lim.'],
    },
  ],
});
