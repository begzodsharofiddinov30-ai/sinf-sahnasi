// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar uy va yovvoyi hayvonlarni farqlaydi, uy hayvonlariga g‘amxo‘rlik qilishni biladi.',
    questions: [
      'Uyingizda qanday hayvon bor?',
      'Yovvoyi hayvonlar qayerda yashaydi?',
      'Uy hayvoniga qanday g‘amxo‘rlik qilamiz?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'turlar',
      type: 'explain',
      title: 'Hayvonlar',
      steps: [
        {
          text: '**Uy hayvonlari** odam yonida yashaydi: sigir, mushuk, it.',
          visual: { kind: 'picture', item: 'sigir' },
        },
        { text: 'Mushuk sichqon tutadi, it uyni qo‘riqlaydi.', visual: { kind: 'picture', item: 'mushuk' } },
        {
          text: '**Yovvoyi hayvonlar** o‘rmon, tog‘ va cho‘lda yashaydi: tulki, bo‘ri, ayiq.',
          visual: { kind: 'picture', item: 'tulki' },
          replace: true,
        },
      ],
    },
    {
      id: 'uy-yovvoyi',
      type: 'sort-groups',
      prompt: 'Uy hayvonimi yoki yovvoyimi?',
      groups: [{ label: 'Uy hayvoni' }, { label: 'Yovvoyi hayvon' }],
      items: [
        { label: 'sigir', visual: { kind: 'picture', item: 'sigir' }, group: 0 },
        { label: 'tulki', visual: { kind: 'picture', item: 'tulki' }, group: 1 },
        { label: 'mushuk', visual: { kind: 'picture', item: 'mushuk' }, group: 0 },
        { label: 'it', visual: { kind: 'picture', item: 'it' }, group: 0 },
        { label: 'bo‘ri', group: 1 },
        { label: 'ayiq', group: 1 },
      ],
    },
    {
      id: 'sut',
      type: 'choose-answer',
      question: 'Qaysi hayvon sut beradi?',
      options: [
        { label: 'A', visual: { kind: 'picture', item: 'sigir' } },
        { label: 'B', visual: { kind: 'picture', item: 'tulki' } },
        { label: 'C', visual: { kind: 'picture', item: 'mushuk' } },
      ],
      correct: 0,
    },
    {
      id: 'ovoz',
      type: 'drag-match',
      prompt: 'Hayvonni ovoziga olib boring',
      pairs: [
        { item: { visual: { kind: 'picture', item: 'mushuk' } }, target: { label: 'miyov' } },
        { item: { visual: { kind: 'picture', item: 'it' } }, target: { label: 'vov-vov' } },
        { item: { visual: { kind: 'picture', item: 'sigir' } }, target: { label: 'mo‘-o‘' } },
      ],
    },
    {
      id: 'quyonlar',
      type: 'count-and-tap',
      prompt: 'Quyonlarni sanang!',
      item: 'quyon',
      count: 7,
      layout: 'scatter',
    },
    {
      id: 'gamxorlik',
      type: 'choose-answer',
      question: 'Uy hayvoniga qanday g‘amxo‘rlik qilamiz?',
      options: [{ label: 'Ovqat va suv beramiz' }, { label: 'Urib haydaymiz' }, { label: 'Yolg‘iz qoldiramiz' }],
      correct: 0,
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: [
        '**Uy hayvonlari** odam yonida yashaydi.',
        '**Yovvoyi hayvonlar** tabiatda yashaydi.',
        'Hayvonlarga **mehribon** bo‘lamiz.',
      ],
    },
  ],
});
