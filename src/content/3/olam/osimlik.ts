// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar o‘simlik qismlarini va ularning vazifasini biladi, o‘simlik o‘sishi uchun nima kerakligini tushunadi.',
    questions: [
      'Ildiz nima qiladi?',
      'O‘simlikka o‘sish uchun nima kerak?',
      'Biz o‘simlikning qaysi qismlarini yeymiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qismlar',
      type: 'explain',
      title: 'O‘simlik qismlari',
      steps: [
        { text: '**Ildiz** tuproqdan suv va oziq oladi.', visual: { kind: 'picture', item: 'daraxt' } },
        { text: '**Poya** o‘simlikni tutib turadi va suvni yuqoriga o‘tkazadi.' },
        {
          text: '**Barg** quyosh nurida o‘simlik uchun oziq tayyorlaydi.',
          visual: { kind: 'picture', item: 'barg' },
          replace: true,
        },
        { text: '**Gul**dan **meva** va **urug‘** paydo bo‘ladi.', visual: { kind: 'picture', item: 'gul' } },
      ],
      hint: 'Imkon bo‘lsa, ildizi bilan kichik o‘simlik olib keling.',
    },
    {
      id: 'vazifa',
      type: 'drag-match',
      prompt: 'Qismni vazifasiga olib boring',
      pairs: [
        { item: { label: 'Ildiz' }, target: { label: 'Suv va oziq oladi' } },
        { item: { label: 'Poya' }, target: { label: 'O‘simlikni tutib turadi' } },
        { item: { label: 'Barg' }, target: { label: 'Quyosh nurini tutadi' } },
        { item: { label: 'Gul' }, target: { label: 'Meva va urug‘ beradi' } },
      ],
    },
    {
      id: 'kerak',
      type: 'choose-answer',
      question: 'O‘simlikka o‘sish uchun nima kerak?',
      options: [{ label: 'Suv, yorug‘lik va havo' }, { label: 'Faqat qorong‘ilik' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'yeymiz',
      type: 'sort-groups',
      prompt: 'Biz o‘simlikning qaysi qismini yeymiz?',
      groups: [{ label: 'Mevasi' }, { label: 'Ildizi' }, { label: 'Bargi' }],
      items: [
        { label: 'olma', group: 0 },
        { label: 'sabzi', group: 1 },
        { label: 'karam', group: 2 },
        { label: 'o‘rik', group: 0 },
        { label: 'lavlagi', group: 1 },
        { label: 'ismaloq', group: 2 },
      ],
    },
    {
      id: 'rang',
      type: 'choose-answer',
      question: 'Bahor va yozda barglar ko‘pincha qanday rangda?',
      visual: { kind: 'picture', item: 'barg' },
      options: [{ label: 'Yashil' }, { label: 'Ko‘k' }, { label: 'Qora' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Ildiz**, **poya**, **barg**, **gul**, **meva** — o‘simlik qismlari.',
        'O‘simlikka **suv**, **yorug‘lik** va **havo** kerak.',
      ],
    },
  ],
});
