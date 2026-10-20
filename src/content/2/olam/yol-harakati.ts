// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar svetofor ishoralari va yo‘ldan xavfsiz o‘tish qoidalarini biladi.',
    questions: [
      'Svetoforning qizil chirog‘i nimani bildiradi?',
      'Yo‘ldan qayerdan o‘tamiz?',
      'Maktabga kelayotganda qanday xavf bor?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'svetofor',
      type: 'explain',
      title: 'Svetofor',
      steps: [
        { text: '**Svetofor** — yo‘l yordamchisi.', visual: { kind: 'picture', item: 'svetofor' } },
        {
          text: 'Tepadagi **qizil** — to‘xta! O‘rtadagi **sariq** — tayyorlan! Pastdagi **yashil** — yur!',
          visual: { kind: 'tiles', items: ['tepada: to‘xta', 'o‘rtada: kut', 'pastda: yur'] },
        },
        {
          text: 'Yo‘ldan faqat **piyodalar o‘tish joyi**dan o‘tamiz.',
          visual: { kind: 'mascot', mood: 'think' },
          replace: true,
        },
      ],
      hint: 'Ranglarni ko‘ra olmaydigan bolalar uchun chiroqning joyini ham ayting: tepada, o‘rtada, pastda.',
    },
    {
      id: 'qizil',
      type: 'choose-answer',
      question: 'Svetoforning **qizil** chirog‘i yonsa nima qilamiz?',
      options: [{ label: 'To‘xtaymiz' }, { label: 'Yuguramiz' }, { label: 'O‘tamiz' }],
      correct: 0,
    },
    {
      id: 'qayerdan',
      type: 'choose-answer',
      question: 'Yo‘ldan qayerdan o‘tamiz?',
      options: [{ label: 'Piyodalar o‘tish joyidan' }, { label: 'Istalgan joydan' }, { label: 'Mashinalar orasidan' }],
      correct: 0,
    },
    {
      id: 'xavf',
      type: 'sort-groups',
      prompt: 'Xavfsizmi yoki xavflimi?',
      groups: [{ label: 'Xavfsiz' }, { label: 'Xavfli' }],
      items: [
        { label: 'Yashil chiroqda o‘tish', group: 0 },
        { label: 'Yo‘lda to‘p o‘ynash', group: 1 },
        { label: 'Kattalar qo‘lidan tutib yurish', group: 0 },
        { label: 'Qizil chiroqda yugurish', group: 1 },
        { label: 'Avval chapga, keyin o‘ngga qarash', group: 0 },
        { label: 'Telefonga qarab o‘tish', group: 1 },
      ],
    },
    {
      id: 'qarash',
      type: 'choose-answer',
      question: 'Yo‘ldan o‘tishdan oldin qayoqqa qaraymiz?',
      options: [{ label: 'Avval chapga, keyin o‘ngga' }, { label: 'Faqat osmonga' }, { label: 'Hech qayoqqa' }],
      correct: 0,
      timerSec: 20,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Qizil** — to‘xta, **sariq** — kut, **yashil** — yur.',
        'Yo‘ldan **piyodalar o‘tish joyidan** o‘tamiz.',
        'Avval **chapga**, keyin **o‘ngga** qaraymiz.',
      ],
    },
  ],
});
