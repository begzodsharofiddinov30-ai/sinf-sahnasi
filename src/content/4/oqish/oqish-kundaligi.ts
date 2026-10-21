// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar o‘qish kundaligini to‘ldirish tartibini biladi.',
    questions: [
      'O‘qish kundaligiga nimalar yoziladi?',
      'Kitob haqida taassurotni qanday yozamiz?',
      'Shu oyda qaysi kitobni o‘qidingiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'ustun',
      type: 'explain',
      title: 'Kundalik ustunlari',
      steps: [
        { text: '**Sana**', visual: { kind: 'tiles', items: ['Sana'] } },
        { text: '**Kitob nomi** va **muallif**', visual: { kind: 'tiles', items: ['Kitob', 'Muallif'] } },
        { text: '**Qahramonlar**', visual: { kind: 'tiles', items: ['Qahramonlar'] } },
        { text: '**Taassurot** — menga nima yoqdi', visual: { kind: 'tiles', items: ['Taassurot'] } },
      ],
    },
    {
      id: 'birinchi',
      type: 'choose-answer',
      question: 'Kundalikka birinchi nima yoziladi?',
      options: [{ label: 'Sana' }, { label: 'Taassurot' }, { label: 'Rasm' }],
      correct: 0,
    },
    {
      id: 'taassurot',
      type: 'choose-answer',
      question: 'Qaysi biri taassurot?',
      options: [
        { label: 'Menga Bo‘tajonning mehribonligi yoqdi.' },
        { label: 'Kitob 40 betli.' },
        { label: 'Muqovasi ko‘k.' },
      ],
      correct: 0,
    },
    {
      id: 'ustun-2',
      type: 'drag-match',
      prompt: 'Ma’lumotni ustunga olib boring',
      pairs: [
        { item: { label: 'Alisher Navoiy' }, target: { label: 'Muallif' } },
        { item: { label: '21-oktabr' }, target: { label: 'Sana' } },
        { item: { label: 'Juda qiziqarli edi!' }, target: { label: 'Taassurot' } },
      ],
    },
    {
      id: 'nega',
      type: 'choose-answer',
      question: 'O‘qish kundaligi nima uchun kerak?',
      options: [{ label: 'O‘qiganlarimni eslab qolish uchun' }, { label: 'Baho olish uchun emas, shunchaki' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Kundalik: **sana, kitob, muallif, qahramon, taassurot**.', 'Har o‘qilgan kitobni **yozib boramiz**.'],
    },
  ],
});
