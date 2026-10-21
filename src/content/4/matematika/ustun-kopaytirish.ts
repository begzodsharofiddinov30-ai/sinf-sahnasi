// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar ko‘p xonali sonni bir xonali songa ustun usulida ko‘paytiradi.',
    questions: [
      'Ko‘paytirishni qaysi xonadan boshlaymiz?',
      'Dilga olingan son bilan nima qilamiz?',
      '156 × 4 ni hisoblang.',
    ],
    minutes: 25,
  },
  scenes: [
    {
      id: 'usul',
      type: 'explain',
      title: '156 × 4',
      steps: [
        {
          text: 'Birlar: 6 × 4 = 24 → **4** yozamiz, **2** dilga.',
          visual: { kind: 'tiles', items: ['156', '×', '4'] },
        },
        { text: 'O‘nlar: 5 × 4 = 20, + 2 = 22 → **2** yozamiz, 2 dilga.' },
        { text: 'Yuzlar: 1 × 4 = 4, + 2 = **6**.' },
        {
          text: 'Javob: **624**',
          visual: { kind: 'tiles', items: ['156', '×', '4', '=', '624'], highlight: [4] },
          replace: true,
        },
      ],
    },
    {
      id: 'k1',
      type: 'choose-answer',
      question: '243 × 3 = ?',
      options: [{ label: '729' }, { label: '649' }, { label: '739' }],
      correct: 0,
    },
    {
      id: 'k2',
      type: 'choose-answer',
      question: '125 × 4 = ?',
      options: [{ label: '500' }, { label: '480' }, { label: '520' }],
      correct: 0,
    },
    {
      id: 'k3',
      type: 'choose-answer',
      question: '1 205 × 2 = ?',
      options: [{ label: '2 410' }, { label: '2 400' }, { label: '2 510' }],
      correct: 0,
    },
    {
      id: 'javob',
      type: 'drag-match',
      prompt: 'Misolni javobiga olib boring',
      pairs: [
        { item: { label: '312 × 3' }, target: { label: '936' } },
        { item: { label: '208 × 4' }, target: { label: '832' } },
        { item: { label: '150 × 6' }, target: { label: '900' } },
      ],
    },
    {
      id: 'masala',
      type: 'choose-answer',
      question: 'Bir qutida 144 ta qalam. 5 ta qutida nechta?',
      options: [{ label: '720' }, { label: '700' }, { label: '620' }],
      correct: 0,
      timerSec: 60,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Ko‘paytirish **birlardan** boshlanadi.', 'Dilga olingan sonni keyingi xonaga **qo‘shamiz**.'],
    },
  ],
});
