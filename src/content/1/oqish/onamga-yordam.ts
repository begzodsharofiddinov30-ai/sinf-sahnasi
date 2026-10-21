// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar hikoyani tinglaydi, qahramonning ishini baholaydi va o‘zi uyda qanday yordam berishini aytadi.',
    questions: ['Dilshod nima qildi?', 'Onasi nima dedi?', 'Siz uyda qanday yordam berasiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'hikoya',
      type: 'story',
      title: 'Onamga yordam',
      pages: [
        { text: 'Kechqurun onam charchab ishdan keldi.', visual: { kind: 'mascot', mood: 'think' } },
        { text: '**Dilshod** dasturxonni yozdi va non qo‘ydi.', visual: { kind: 'mascot', mood: 'happy' } },
        { text: 'Ovqatdan keyin **idishlarni** yig‘ishtirdi.', visual: { kind: 'mascot', mood: 'happy' } },
        {
          text: 'Onasi uni quchoqlab: «**Rahmat**, o‘g‘lim!» — dedi.',
          visual: { kind: 'mascot', mood: 'cheer' },
        },
      ],
    },
    {
      id: 'kim',
      type: 'choose-answer',
      question: 'Hikoya qahramoni kim?',
      options: [{ label: 'Dilshod' }, { label: 'Aziz' }, { label: 'Malika' }],
      correct: 0,
    },
    {
      id: 'nima',
      type: 'choose-answer',
      question: 'Dilshod nima qildi?',
      options: [{ label: 'Dasturxon yozdi' }, { label: 'Uxlab qoldi' }, { label: 'Ko‘chaga chiqdi' }],
      correct: 0,
    },
    {
      id: 'his',
      type: 'choose-answer',
      question: 'Onasi o‘zini qanday his qildi?',
      options: [{ label: 'Xursand bo‘ldi' }, { label: 'Xafa bo‘ldi' }, { label: 'Jahli chiqdi' }],
      correct: 0,
    },
    {
      id: 'yordam',
      type: 'sort-groups',
      prompt: 'Yordammi yoki yo‘qmi?',
      groups: [{ label: 'Yordam' }, { label: 'Yordam emas' }],
      items: [
        { label: 'O‘yinchoqlarni yig‘ish', group: 0 },
        { label: 'Gul suvorish', group: 0 },
        { label: 'Uyni to‘zg‘itish', group: 1 },
        { label: 'Non olib kelish', group: 0 },
        { label: 'Baqirish', group: 1 },
      ],
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Kattalarga **yordam** beramiz.', '**Rahmat** — sehrli so‘z.'],
    },
  ],
});
