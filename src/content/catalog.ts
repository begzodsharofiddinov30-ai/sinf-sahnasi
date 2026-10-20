// Mavzular katalogi. Har bir yozuvga mos fayl bo'lishi shart:
// src/content/<grade>/<subject>/<slug>.ts
import { topicId, type TopicEntry } from './schema';
import type { Grade } from './subjects';

export const CATALOG: TopicEntry[] = [
  // 1-sinf · Matematika
  { grade: 1, subject: 'matematika', slug: 'sonlar-1-10', title: 'Sonlar 1–10: sanash', summary: 'Narsalarni sanaymiz va raqamni tanib olamiz.' },
  { grade: 1, subject: 'matematika', slug: 'kop-kam', title: 'Ko‘p – kam – teng', summary: 'Ikki guruhni solishtiramiz.' },
  { grade: 1, subject: 'matematika', slug: 'qoshish-10', title: '10 ichida qo‘shish', summary: 'Ikki guruhni birlashtirib, hammasini topamiz.' },
  { grade: 1, subject: 'matematika', slug: 'ayirish-10', title: '10 ichida ayirish', summary: 'Bir nechtasi ketsa, nechta qoladi?' },
  // 1-sinf · Ona tili
  { grade: 1, subject: 'ona-tili', slug: 'harf-tovush', title: 'Harf va tovush', summary: 'Tovushni eshitamiz, harfni ko‘ramiz.' },
  { grade: 1, subject: 'ona-tili', slug: 'bogin', title: 'Bo‘g‘in', summary: 'So‘zlarni bo‘g‘inlarga ajratamiz.' },
  { grade: 1, subject: 'ona-tili', slug: 'soz-yasash', title: 'So‘z yasash', summary: 'Harf va bo‘g‘inlardan so‘z tuzamiz.' },
  // 2-sinf · Matematika
  { grade: 2, subject: 'matematika', slug: 'onlik-birlik', title: 'O‘nlik va birlik', summary: 'Ikki xonali son nimadan iborat?' },
  { grade: 2, subject: 'matematika', slug: 'ikki-xonali-qoshish', title: 'Ikki xonali sonlarni qo‘shish', summary: 'O‘nliklarni o‘nliklarga, birliklarni birliklarga qo‘shamiz.' },
  { grade: 2, subject: 'matematika', slug: 'soat', title: 'Soat', summary: 'Soat millari va vaqtni aniqlash.' },
  // 3-sinf · Matematika
  { grade: 3, subject: 'matematika', slug: 'kopaytirish-2-3', title: 'Ko‘paytirish jadvali: 2 va 3', summary: 'Teng guruhlarni tez sanash.' },
  { grade: 3, subject: 'matematika', slug: 'bolish', title: 'Bo‘lish tushunchasi', summary: 'Narsalarni teng bo‘lib beramiz.' },
  // 4-sinf · Atrofimizdagi olam
  { grade: 4, subject: 'olam', slug: 'fasllar', title: 'Fasllar', summary: 'Bahor, yoz, kuz va qish belgilari.' },
  { grade: 4, subject: 'olam', slug: 'suv-aylanishi', title: 'Suvning tabiatda aylanishi', summary: 'Bug‘lanish, bulut, yomg‘ir va yana daryo.' },
];

export function findTopic(id: string): TopicEntry | undefined {
  return CATALOG.find((t) => topicId(t) === id);
}

export function topicsFor(grade: Grade, subject?: string): TopicEntry[] {
  return CATALOG.filter((t) => t.grade === grade && (subject == null || t.subject === subject));
}
