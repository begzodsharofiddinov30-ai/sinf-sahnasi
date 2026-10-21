// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ko‘p ma’noli so‘zlarni gapdagi ma’nosiga qarab farqlaydi.',
    questions: [
      '“Til” so‘zining qanday ma’nolari bor?',
      '“Stolning oyog‘i” deganda nimani tushunamiz?',
      'Yana qaysi so‘z ko‘p ma’noli?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'mano',
      type: 'explain',
      title: 'Bir so‘z — ko‘p ma’no',
      steps: [
        { text: '**Til** — og‘izdagi a’zo.', visual: { kind: 'mascot', mood: 'happy' } },
        { text: '**Til** — o‘zbek tili, ona tili.', visual: { kind: 'tiles', items: ['o‘zbek tili'] } },
        {
          text: '**Oyoq** — odamning oyog‘i va **stolning oyog‘i**.',
          visual: { kind: 'tiles', items: ['odam oyog‘i', 'stol oyog‘i'] },
          replace: true,
        },
      ],
    },
    {
      id: 'qaysi',
      type: 'drag-match',
      prompt: 'Gapdagi ma’nosini toping',
      pairs: [
        { item: { label: 'Bola qo‘lini yuvdi.' }, target: { label: 'tana a’zosi' } },
        { item: { label: 'Soatning mili yurdi.' }, target: { label: 'soat qismi' } },
        { item: { label: 'Kitobning boshi qiziq.' }, target: { label: 'boshlanishi' } },
      ],
    },
    {
      id: 'kop',
      type: 'choose-answer',
      question: 'Qaysi so‘z ko‘p ma’noli?',
      options: [{ label: 'ko‘z' }, { label: 'qalam' }, { label: 'olma' }],
      correct: 0,
      explanation: 'Odamning ko‘zi, buloqning ko‘zi, uzukning ko‘zi.',
    },
    {
      id: 'stol',
      type: 'choose-answer',
      question: '«Stolning oyog‘i singan.» Bu yerda “oyoq” nima?',
      options: [{ label: 'Stol ustuni' }, { label: 'Odam oyog‘i' }, { label: 'Yo‘l' }],
      correct: 0,
    },
    {
      id: 'mano-2',
      type: 'sort-groups',
      prompt: '“Til” qaysi ma’noda?',
      groups: [{ label: 'Og‘izdagi a’zo' }, { label: 'Gaplashadigan til' }],
      items: [
        { label: 'Tilim kuydi.', group: 0 },
        { label: 'Ingliz tilini o‘rganaman.', group: 1 },
        { label: 'Ona tilim — o‘zbek tili.', group: 1 },
        { label: 'Tilni chiqarib ko‘rsat.', group: 0 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ba’zi so‘zlarning **bir nechta** ma’nosi bor.', 'Ma’nosini **gapdan** bilamiz.'],
    },
  ],
});
