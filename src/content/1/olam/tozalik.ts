// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar shaxsiy gigiyena qoidalarini biladi va foydali hamda zararli odatlarni ajratadi.',
    questions: ['Qachon qo‘l yuvamiz?', 'Tishni kuniga necha marta tozalaymiz?', 'Qanday ovqatlar foydali?'],
    minutes: 15,
  },
  scenes: [
    {
      id: 'qoidalar',
      type: 'explain',
      title: 'Toza bo‘lamiz',
      steps: [
        {
          text: 'Ovqatdan oldin qo‘lni **sovun** bilan yuvamiz.',
          visual: { kind: 'picture', item: 'sovun' },
        },
        {
          text: 'Tishni kuniga **2 marta** tozalaymiz: ertalab va kechqurun.',
          visual: { kind: 'tiles', items: ['ertalab', '+', 'kechqurun'] },
          replace: true,
        },
        {
          text: '**Meva** va toza **suv** — sog‘liq garovi.',
          visual: { kind: 'picture', item: 'olma' },
          replace: true,
        },
      ],
      hint: 'Qo‘l yuvish tartibini birga ko‘rsating: ho‘llash — sovunlash — ishqalash — chayish — artish.',
    },
    {
      id: 'odatlar',
      type: 'sort-groups',
      prompt: 'Foydalimi yoki zararlimi?',
      groups: [{ label: 'Foydali' }, { label: 'Zararli' }],
      items: [
        { label: 'Qo‘l yuvish', group: 0 },
        { label: 'Juda ko‘p shirinlik yeyish', group: 1 },
        { label: 'Meva yeyish', group: 0 },
        { label: 'Kech yotish', group: 1 },
        { label: 'Erta turish', group: 0 },
        { label: 'Yuvilmagan meva yeyish', group: 1 },
      ],
    },
    {
      id: 'qachon',
      type: 'choose-answer',
      question: 'Qachon qo‘l yuvamiz?',
      options: [{ label: 'Ovqatdan oldin' }, { label: 'Faqat bayramda' }, { label: 'Hech qachon' }],
      correct: 0,
    },
    {
      id: 'qancha',
      type: 'choose-answer',
      question: 'Qo‘lni qancha vaqt sovunlab yuvish kerak?',
      options: [{ label: '20 soniyacha' }, { label: '1 soniya' }, { label: '1 soat' }],
      correct: 0,
      explanation: 'Taxminan 20 soniya — ikki marta “Bo‘tajon” qo‘shig‘ini xirgoyi qilguncha.',
    },
    {
      id: 'chotka',
      type: 'choose-answer',
      question: 'Tish cho‘tkasi kimniki bo‘ladi?',
      options: [{ label: 'Har kimning o‘ziniki' }, { label: 'Butun oilaga bitta' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        'Ovqatdan oldin **qo‘l yuvamiz**.',
        'Tishni kuniga **2 marta** tozalaymiz.',
        '**Meva** yeymiz, erta yotamiz.',
      ],
    },
  ],
});
