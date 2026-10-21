// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar muallif va qahramon tushunchalarini farqlaydi.',
    questions: ['Muallif kim?', 'Qahramon kim?', 'Sevimli kitobingiz muallifi kim?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'farq',
      type: 'explain',
      title: 'Muallif va qahramon',
      steps: [
        { text: '**Muallif** — asarni **yozgan** kishi.', visual: { kind: 'picture', item: 'qalam' } },
        {
          text: '**Qahramon** — asarda **ishtirok** etadigan kishi yoki hayvon.',
          visual: { kind: 'mascot', mood: 'happy' },
          replace: true,
        },
      ],
    },
    {
      id: 'kim',
      type: 'choose-answer',
      question: 'Kitob muqovasida odatda kimning ismi yoziladi?',
      options: [{ label: 'Muallifning' }, { label: 'Sotuvchining' }, { label: 'Kutubxonachining' }],
      correct: 0,
    },
    {
      id: 'qahramon',
      type: 'choose-answer',
      question: '«Bo‘tajon va quyoncha» ertagining qahramoni kim?',
      options: [{ label: 'Bo‘tajon' }, { label: 'Muallif' }, { label: 'O‘quvchi' }],
      correct: 0,
    },
    {
      id: 'qaysi',
      type: 'sort-groups',
      prompt: 'Muallifmi yoki qahramonmi?',
      groups: [{ label: 'Muallif' }, { label: 'Qahramon' }],
      items: [
        { label: 'kitobni yozgan', group: 0 },
        { label: 'ertakdagi tulki', group: 1 },
        { label: 'hikoyadagi Nodira', group: 1 },
        { label: 'she’r yozgan shoir', group: 0 },
      ],
    },
    {
      id: 'asosiy',
      type: 'choose-answer',
      question: 'Asosiy qahramon kim bo‘ladi?',
      options: [{ label: 'Voqealar uning atrofida bo‘ladi' }, { label: 'Eng kam gapiradigan' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Muallif** — yozadi, **qahramon** — asarda yashaydi.',
        'Asosiy qahramon atrofida **voqealar** bo‘ladi.',
      ],
    },
  ],
});
