// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar kitobga ehtiyotkor munosabatda bo‘lish qoidalarini biladi.',
    questions: ['Kitobni qanday asraymiz?', 'Qaysi kitob sizga yoqadi?', 'Kitobni yirtib qo‘ysak nima bo‘ladi?'],
    minutes: 10,
  },
  scenes: [
    {
      id: 'qoida',
      type: 'explain',
      title: 'Kitob qoidalari',
      steps: [
        { text: 'Kitobni **toza qo‘l** bilan ushlaymiz.', visual: { kind: 'picture', item: 'kitob' } },
        { text: 'Sahifani **bukmaymiz** — xatcho‘p ishlatamiz.' },
        { text: 'Kitobga **chizmaymiz**.', visual: { kind: 'mascot', mood: 'think' }, replace: true },
      ],
    },
    {
      id: 'togri',
      type: 'sort-groups',
      prompt: 'To‘g‘rimi yoki noto‘g‘rimi?',
      groups: [{ label: 'To‘g‘ri' }, { label: 'Noto‘g‘ri' }],
      items: [
        { label: 'Xatcho‘p qo‘yish', group: 0 },
        { label: 'Sahifani bukish', group: 1 },
        { label: 'Kitobni muqovalash', group: 0 },
        { label: 'Kitobga chizish', group: 1 },
        { label: 'Ovqatlanib o‘qish', group: 1 },
      ],
    },
    {
      id: 'xatchop',
      type: 'choose-answer',
      question: 'Qayerda to‘xtaganingizni qanday belgilaysiz?',
      options: [{ label: 'Xatcho‘p qo‘yaman' }, { label: 'Sahifani bukaman' }, { label: 'Yirtaman' }],
      correct: 0,
    },
    {
      id: 'qol',
      type: 'choose-answer',
      question: 'Kitob o‘qishdan oldin nima qilamiz?',
      options: [{ label: 'Qo‘lni yuvamiz' }, { label: 'Shokolad yeymiz' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'dost',
      type: 'choose-answer',
      question: 'Nega kitob — do‘st?',
      options: [{ label: 'Yangi narsa o‘rgatadi' }, { label: 'Og‘ir' }, { label: 'Rangli' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Kitobni **toza** saqlaymiz.', '**Xatcho‘p** ishlatamiz.'],
    },
  ],
});
