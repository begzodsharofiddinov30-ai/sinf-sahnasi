// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar so‘z va gapni farqlaydi, gap bosh harf bilan boshlanib nuqta bilan tugashini biladi.',
    questions: ['Gap nimadan tuziladi?', 'Gap qanday harf bilan boshlanadi?', 'Gap oxirida qanday belgi bo‘ladi?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'soz-gap',
      type: 'explain',
      title: 'So‘z va gap',
      steps: [
        {
          text: 'Biz **so‘zlar** bilan gaplashamiz.',
          visual: { kind: 'tiles', items: ['Bo‘tajon', 'olma', 'yedi'] },
        },
        {
          text: 'So‘zlar birikib **gap** bo‘ladi.',
          visual: { kind: 'tiles', items: ['Bo‘tajon olma yedi.'] },
          replace: true,
        },
        {
          text: 'Gap **bosh harf** bilan boshlanadi va **nuqta** bilan tugaydi.',
          visual: { kind: 'word', text: 'Bo‘tajon olma yedi.', highlight: [0, 18] },
          replace: true,
        },
      ],
      hint: 'Gapni ovoz chiqarib o‘qing, har so‘zda bitta qarsak.',
    },
    {
      id: 'nechta-soz',
      type: 'choose-answer',
      question: '«Qush uchdi.» Bu gapda nechta so‘z bor?',
      options: [{ label: '1' }, { label: '2' }, { label: '3' }],
      correct: 1,
    },
    {
      id: 'qaysi-gap',
      type: 'choose-answer',
      question: 'Qaysi biri **gap**?',
      options: [{ label: 'olma, nok' }, { label: 'Quyosh chiqdi.' }, { label: 'gul qush' }],
      correct: 1,
      retryHint: 'Gapda fikr bo‘ladi va u nuqta bilan tugaydi.',
    },
    {
      id: 'gap-tuz',
      type: 'build-word',
      prompt: 'So‘zlardan gap tuzing',
      word: 'Mushuk sut ichdi.',
      tiles: ['Mushuk ', 'sut ', 'ichdi.'],
      hint: 'Bo‘laklarni tartib bilan qo‘ying: kim? nima? nima qildi?',
    },
    {
      id: 'soz-yoki-gap',
      type: 'sort-groups',
      prompt: 'So‘zmi yoki gapmi?',
      groups: [{ label: 'So‘z' }, { label: 'Gap' }],
      items: [
        { label: 'kitob', group: 0 },
        { label: 'Men kitob o‘qiyman.', group: 1 },
        { label: 'daraxt', group: 0 },
        { label: 'Bahor keldi.', group: 1 },
        { label: 'quyosh', group: 0 },
        { label: 'Qor yog‘di.', group: 1 },
      ],
    },
    {
      id: 'nuqta',
      type: 'choose-answer',
      question: '«Biz maktabga boramiz_» Gap oxiriga qaysi belgi?',
      options: [{ label: '.' }, { label: ',' }, { label: '-' }],
      correct: 0,
      timerSec: 20,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'So‘zlar birikib **gap** bo‘ladi.',
        'Gap **bosh harf** bilan boshlanadi.',
        'Gap oxirida **nuqta** qo‘yiladi.',
      ],
    },
  ],
});
