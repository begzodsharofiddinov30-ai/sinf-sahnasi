// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar odob bilan suhbat tuzadi va yozma dialogda tire va qo‘shtirnoqdan to‘g‘ri foydalanadi.',
    questions: [
      'Suhbat qanday boshlanadi?',
      'Yozma dialogda qahramon gapi qanday belgilanadi?',
      'Kutubxonachi bilan suhbat tuzing.',
    ],
    minutes: 20,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Suhbat odobi',
      steps: [
        { text: '**Salomlashamiz**: «Assalomu alaykum!»', visual: { kind: 'mascot', mood: 'happy' } },
        { text: '**Tinglaymiz**, gapni bo‘lmaymiz.' },
        { text: '**Rahmat** aytib xayrlashamiz.', visual: { kind: 'mascot', mood: 'cheer' }, replace: true },
      ],
    },
    {
      id: 'dialog',
      type: 'story',
      title: 'Kutubxonada',
      pages: [
        { text: '— Assalomu alaykum! Ertaklar kitobi bormi?', visual: { kind: 'mascot', mood: 'happy' } },
        { text: '— Va alaykum assalom! Mana, marhamat.', visual: { kind: 'picture', item: 'kitob' } },
        { text: '— Katta rahmat! Ikki haftada qaytaraman.', visual: { kind: 'mascot', mood: 'cheer' } },
      ],
    },
    {
      id: 'javob',
      type: 'drag-match',
      prompt: 'Gapga mos javobni toping',
      pairs: [
        { item: { label: 'Assalomu alaykum!' }, target: { label: 'Va alaykum assalom!' } },
        { item: { label: 'Rahmat!' }, target: { label: 'Arzimaydi.' } },
        { item: { label: 'Xayr!' }, target: { label: 'Xayr, sog‘ bo‘ling!' } },
      ],
    },
    {
      id: 'belgi',
      type: 'choose-answer',
      question: 'Yozma dialogda har bir gap nima bilan boshlanadi?',
      options: [{ label: 'Tire (—)' }, { label: 'Nuqta' }, { label: 'Qavs' }],
      correct: 0,
    },
    {
      id: 'odob',
      type: 'choose-answer',
      question: 'Suhbatdosh gapirayotganda nima qilamiz?',
      options: [{ label: 'Diqqat bilan tinglaymiz' }, { label: 'Gapini bo‘lamiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Suhbat: **salom → savol-javob → rahmat, xayr**.', 'Yozma dialogda gap **tire** bilan boshlanadi.'],
    },
  ],
});
