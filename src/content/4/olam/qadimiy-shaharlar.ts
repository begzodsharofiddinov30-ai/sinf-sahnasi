// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar O‘zbekistonning qadimiy shaharlari va mashhur obidalarini biladi.',
    questions: ['Qaysi qadimiy shaharlarimizni bilasiz?', 'Registon qayerda?', 'Nega obidalarni asrash kerak?'],
    minutes: 20,
  },
  scenes: [
    {
      id: 'shahar',
      type: 'explain',
      title: 'Qadimiy shaharlar',
      steps: [
        { text: '**Samarqand** — Registon maydoni.', visual: { kind: 'tiles', items: ['Samarqand'] } },
        { text: '**Buxoro** — Ark qal’asi, Minorai Kalon.', visual: { kind: 'tiles', items: ['Buxoro'] } },
        { text: '**Xiva** — Ichan qal’a.', visual: { kind: 'tiles', items: ['Xiva'] } },
        { text: '**Shahrisabz** — Oqsaroy.', visual: { kind: 'tiles', items: ['Shahrisabz'] } },
      ],
    },
    {
      id: 'obida',
      type: 'drag-match',
      prompt: 'Obidani shaharga olib boring',
      pairs: [
        { item: { label: 'Registon' }, target: { label: 'Samarqand' } },
        { item: { label: 'Minorai Kalon' }, target: { label: 'Buxoro' } },
        { item: { label: 'Ichan qal’a' }, target: { label: 'Xiva' } },
        { item: { label: 'Oqsaroy' }, target: { label: 'Shahrisabz' } },
      ],
    },
    {
      id: 'ark',
      type: 'choose-answer',
      question: 'Ark qal’asi qaysi shaharda?',
      options: [{ label: 'Buxoro' }, { label: 'Toshkent' }, { label: 'Namangan' }],
      correct: 0,
    },
    {
      id: 'asrash',
      type: 'choose-answer',
      question: 'Obidalarni qanday asraymiz?',
      options: [{ label: 'Devorlarga yozmaymiz, tozalikka rioya qilamiz' }, { label: 'Toshlarini olib ketamiz' }],
      correct: 0,
    },
    {
      id: 'unesko',
      type: 'choose-answer',
      question: 'Bu shaharlar nega butun dunyoga mashhur?',
      options: [{ label: 'Qadimiy me’moriy obidalari uchun' }, { label: 'Baland binolari uchun' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Samarqand, Buxoro, Xiva, Shahrisabz — **qadimiy** shaharlar.', 'Obidalar — **xalqimiz merosi**.'],
    },
  ],
});
