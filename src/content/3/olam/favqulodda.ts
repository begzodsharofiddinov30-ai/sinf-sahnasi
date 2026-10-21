// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar favqulodda xizmatlar raqamlarini va yong‘in, zilziladagi to‘g‘ri harakatlarni biladi.',
    questions: [
      'Yong‘in bo‘lsa qaysi raqamga qo‘ng‘iroq qilamiz?',
      'Tez yordam raqami nechchi?',
      'Zilzila paytida nima qilamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'raqam',
      type: 'explain',
      title: 'Xizmatlar raqami',
      steps: [
        { text: '**101** — yong‘in xizmati.', visual: { kind: 'tiles', items: ['101'] } },
        { text: '**102** — ichki ishlar (militsiya).', visual: { kind: 'tiles', items: ['102'] } },
        { text: '**103** — tez tibbiy yordam.', visual: { kind: 'tiles', items: ['103'] } },
        { text: '**104** — gaz xizmati.', visual: { kind: 'tiles', items: ['104'] } },
      ],
      hint: 'Raqamlar va manzilni aytishni mashq qildiring.',
    },
    {
      id: 'xizmat',
      type: 'drag-match',
      prompt: 'Vaziyatni raqamga olib boring',
      pairs: [
        { item: { label: 'yong‘in' }, target: { label: '101' } },
        { item: { label: 'kasal odam' }, target: { label: '103' } },
        { item: { label: 'gaz hidi' }, target: { label: '104' } },
      ],
    },
    {
      id: 'aytish',
      type: 'choose-answer',
      question: 'Qo‘ng‘iroq qilganda nimani aytamiz?',
      options: [{ label: 'Nima bo‘lganini va manzilni' }, { label: 'Faqat ismni' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'zilzila',
      type: 'choose-answer',
      question: 'Zilzila paytida nima qilamiz?',
      options: [
        { label: 'Mustahkam stol tagiga yoki eshik oldiga turamiz' },
        { label: 'Deraza oldida turamiz' },
        { label: 'Liftga kiramiz' },
      ],
      correct: 0,
    },
    {
      id: 'hazil',
      type: 'choose-answer',
      question: 'Bekorga 101 ga qo‘ng‘iroq qilish mumkinmi?',
      options: [{ label: 'Yo‘q, bu boshqalarga xalaqit beradi' }, { label: 'Ha, qiziq' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**101** yong‘in, **102** ichki ishlar, **103** tez yordam, **104** gaz.',
        'Xotirjam bo‘lib, **manzilni** aniq aytamiz.',
      ],
    },
  ],
});
