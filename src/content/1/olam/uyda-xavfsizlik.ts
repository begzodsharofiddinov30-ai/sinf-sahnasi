// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar uydagi xavfli narsalarni biladi va xavfsiz harakat qilish qoidalarini aytadi.',
    questions: ['Uyda qanday xavfli narsalar bor?', 'Gugurt bilan o‘ynash mumkinmi?', 'Xavf bo‘lsa kimga aytamiz?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'xavf',
      type: 'explain',
      title: 'Ehtiyot bo‘lamiz',
      steps: [
        { text: '**Olov** va gugurt bilan o‘ynamaymiz.', visual: { kind: 'mascot', mood: 'think' } },
        { text: '**Rozetka**ga qo‘l tiqmaymiz.' },
        { text: 'Pichoq va qaychi — faqat kattalar ruxsati bilan.' },
        {
          text: 'Xavf bo‘lsa — darhol **kattalarga** aytamiz.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'xavfli',
      type: 'sort-groups',
      prompt: 'Xavflimi yoki xavfsizmi?',
      groups: [{ label: 'Xavfli' }, { label: 'Xavfsiz' }],
      items: [
        { label: 'Gugurt bilan o‘ynash', group: 0 },
        { label: 'Kitob o‘qish', group: 1 },
        { label: 'Rozetkaga sim tiqish', group: 0 },
        { label: 'Rasm chizish', group: 1 },
        { label: 'Issiq choynakni ushlash', group: 0 },
      ],
    },
    {
      id: 'kimga',
      type: 'choose-answer',
      question: 'Uyda tutun hidi kelsa nima qilamiz?',
      options: [{ label: 'Kattalarga darhol aytamiz' }, { label: 'Yashirinamiz' }, { label: 'Hech narsa' }],
      correct: 0,
    },
    {
      id: 'eshik',
      type: 'choose-answer',
      question: 'Notanish odam eshikni taqillatsa?',
      options: [{ label: 'Ochmaymiz, kattalarni chaqiramiz' }, { label: 'Darhol ochamiz' }],
      correct: 0,
    },
    {
      id: 'dori',
      type: 'choose-answer',
      question: 'Dorilarni kim beradi?',
      options: [{ label: 'Faqat kattalar' }, { label: 'O‘zim olaman' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Olov, elektr, o‘tkir narsalar — **xavfli**.', 'Xavf bo‘lsa — **kattalarga** aytamiz.'],
    },
  ],
});
