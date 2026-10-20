// QORALAMA: o'qituvchi tekshirib chiqishi kerak
import { defineLesson } from '../../schema';

export default defineLesson({
  notes: {
    goal: 'O‘quvchilar harf va bo‘g‘inlardan so‘z tuzadi (o‘, g‘, sh, ch, ng bilan).',
    questions: [
      '“Sh” bitta tovushmi yoki ikkita?',
      '“G‘” harfi bor qaysi so‘zlarni bilasiz?',
      'Bo‘g‘inlar o‘rnini almashtirsak nima bo‘ladi?',
    ],
    minutes: 15,
  },
  scenes: [
    {
      id: 'kirish',
      type: 'explain',
      title: 'So‘z yasaymiz',
      steps: [
        { text: 'Harflar birlashsa — **so‘z** bo‘ladi.', visual: { kind: 'picture', item: 'olma' } },
        { text: 'o + l + m + a = **olma**', visual: { kind: 'tiles', items: ['o', 'l', 'm', 'a'] } },
        {
          text: 'Ba’zi tovushlar ikki belgi bilan yoziladi: **sh**, **ch**, **ng**, **o‘**, **g‘**.',
          visual: { kind: 'tiles', items: ['sh', 'ch', 'ng', 'o‘', 'g‘'] },
          replace: true,
        },
      ],
      hint: '“sh” ni ikki tovush deb o‘ylamasliklari uchun ovoz chiqarib aytib bering.',
    },
    { id: 'olma', type: 'build-word', prompt: 'Rasmga qarang va so‘zni yig‘ing', word: 'olma', tiles: ['o', 'l', 'm', 'a'], picture: 'olma' },
    {
      id: 'baliq',
      type: 'build-word',
      prompt: 'So‘zni yig‘ing',
      word: 'baliq',
      tiles: ['b', 'a', 'l', 'i', 'q'],
      extra: ['o'],
      picture: 'baliq',
      retryHint: 'So‘zni sekin ayting: b-a-l-i-q.',
    },
    {
      id: 'qush',
      type: 'build-word',
      prompt: '**sh** — bitta tovush. So‘zni yig‘ing',
      word: 'qush',
      tiles: ['q', 'u', 'sh'],
      extra: ['s'],
      picture: 'qush',
      hint: 'Bolalar “s” va “sh” farqini eshitsin.',
    },
    {
      id: 'moslash',
      type: 'drag-match',
      prompt: 'So‘zni rasmiga olib boring',
      pairs: [
        { item: { label: 'gul' }, target: { visual: { kind: 'picture', item: 'gul' } } },
        { item: { label: 'kitob' }, target: { visual: { kind: 'picture', item: 'kitob' } } },
        { item: { label: 'quyosh' }, target: { visual: { kind: 'picture', item: 'quyosh' } } },
      ],
      retryHint: 'So‘zni o‘qing va rasmga qarang.',
    },
    {
      id: 'kitob',
      type: 'build-word',
      prompt: 'Bo‘g‘inlardan so‘z yasang',
      word: 'kitob',
      tiles: ['ki', 'tob'],
      extra: ['qa'],
      picture: 'kitob',
    },
    {
      id: 'tomchi',
      type: 'build-word',
      prompt: '**ch** bilan so‘z yig‘ing',
      word: 'tomchi',
      tiles: ['t', 'o', 'm', 'ch', 'i'],
      picture: 'tomchi',
    },
    {
      id: 'hikoya',
      type: 'story',
      title: 'Kichik hikoya',
      pages: [
        { text: 'Bo‘tajon **bog‘**ga bordi.', visual: { kind: 'mascot', mood: 'happy' } },
        { text: 'U yerda **gul** va **daraxt** ko‘rdi.', visual: { kind: 'picture', item: 'daraxt' } },
        { text: 'Bo‘tajon **quyosh**ga qarab kuldi.', visual: { kind: 'picture', item: 'quyosh' } },
      ],
      hint: 'Ajratilgan so‘zlarni bolalar xor bo‘lib o‘qisin.',
    },
    {
      id: 'yakun',
      type: 'recap',
      title: 'Bugun o‘rgandik',
      points: ['Harflar birlashib **so‘z** bo‘ladi.', '**sh**, **ch**, **ng** — bitta tovush.', 'So‘zni **bo‘g‘in**lardan ham yasash mumkin.'],
    },
  ],
});
