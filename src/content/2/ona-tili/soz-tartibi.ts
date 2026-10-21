// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar o‘zbek tilidagi gapda so‘zlarning odatiy tartibini biladi va aralash so‘zlardan gap tuzadi.',
    questions: [
      'Gapda “nima qildi?” so‘zi odatda qayerda turadi?',
      'So‘zlar aralashsa, gap tushunarli bo‘ladimi?',
      'O‘zingiz gap tuzing.',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'tartib',
      type: 'explain',
      title: 'So‘z tartibi',
      steps: [
        {
          text: 'Gap ko‘pincha **kim?** bilan boshlanadi.',
          visual: { kind: 'tiles', items: ['Bola', 'kitob', 'o‘qidi'], highlight: [0] },
        },
        {
          text: '**Nima qildi?** — gap oxirida.',
          visual: { kind: 'tiles', items: ['Bola', 'kitob', 'o‘qidi'], highlight: [2] },
          replace: true,
        },
      ],
    },
    {
      id: 'gap1',
      type: 'build-word',
      prompt: 'So‘zlardan gap tuzing',
      word: 'Qushlar uyaga uchdi.',
      tiles: ['Qushlar ', 'uyaga ', 'uchdi.'],
    },
    {
      id: 'gap2',
      type: 'build-word',
      prompt: 'So‘zlardan gap tuzing',
      word: 'Malika gul suvordi.',
      tiles: ['Malika ', 'gul ', 'suvordi.'],
    },
    {
      id: 'togri',
      type: 'choose-answer',
      question: 'Qaysi gap to‘g‘ri tuzilgan?',
      options: [
        { label: 'Aziz maktabga bordi.' },
        { label: 'Bordi maktabga Aziz.' },
        { label: 'Maktabga bordi Aziz.' },
      ],
      correct: 0,
    },
    {
      id: 'oxir',
      type: 'choose-answer',
      question: '«Mushuk sut ichdi.» Gap oxiridagi so‘z nimani bildiradi?',
      options: [{ label: 'Harakatni' }, { label: 'Kimni' }, { label: 'Nimani' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Gap: **kim?** … **nima qildi?**', 'Harakat so‘zi ko‘pincha **oxirida**.'],
    },
  ],
});
