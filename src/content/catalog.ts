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
  // 1-sinf · yangi mavzular
  { grade: 1, subject: 'matematika', slug: 'shakllar', title: 'Geometrik shakllar', summary: 'Doira, kvadrat, uchburchak va to‘rtburchak.' },
  { grade: 1, subject: 'matematika', slug: 'sonlar-11-20', title: '11 dan 20 gacha sonlar', summary: 'O‘nlik va yana bir nechta birlik.' },
  { grade: 1, subject: 'matematika', slug: 'masalalar', title: 'Oddiy masalalar', summary: 'Masalani tinglaymiz, o‘ylaymiz, hisoblaymiz.' },
  { grade: 1, subject: 'ona-tili', slug: 'gap', title: 'So‘z va gap', summary: 'So‘zlardan gap tuzamiz.' },
  { grade: 1, subject: 'ona-tili', slug: 'bosh-harf', title: 'Bosh harf', summary: 'Ism, shahar nomi va gap boshi.' },
  { grade: 1, subject: 'oqish', slug: 'boginlab-oqish', title: 'Bo‘g‘inlab o‘qiymiz', summary: 'Bo‘g‘inlarni qo‘shib so‘z o‘qiymiz.' },
  { grade: 1, subject: 'oqish', slug: 'ertak-dostlar', title: 'Ertak: Bo‘tajon va quyoncha', summary: 'Do‘stlik haqida kichik ertak.' },
  { grade: 1, subject: 'oqish', slug: 'topishmoqlar', title: 'Topishmoqlar', summary: 'O‘ylaymiz va javobini topamiz.' },
  { grade: 1, subject: 'olam', slug: 'oila', title: 'Mening oilam', summary: 'Oila a’zolari va bir-birimizga yordam.' },
  { grade: 1, subject: 'olam', slug: 'tozalik', title: 'Tozalik va salomatlik', summary: 'Qo‘l yuvish, tish tozalash, foydali odatlar.' },
  // 2-sinf · yangi mavzular
  { grade: 2, subject: 'matematika', slug: 'ikki-xonali-ayirish', title: 'Ikki xonali sonlarni ayirish', summary: 'Birliklardan birliklarni, o‘nliklardan o‘nliklarni ayiramiz.' },
  { grade: 2, subject: 'matematika', slug: 'uzunlik', title: 'Uzunlik: santimetr va metr', summary: 'Narsalarni o‘lchaymiz.' },
  { grade: 2, subject: 'matematika', slug: 'juft-toq', title: 'Juft va toq sonlar', summary: 'Ikkitadan juftlab sanaymiz.' },
  { grade: 2, subject: 'ona-tili', slug: 'ot', title: 'Ot — kim? nima?', summary: 'Narsa, odam va hayvon nomlari.' },
  { grade: 2, subject: 'ona-tili', slug: 'fel', title: 'Fe’l — nima qildi?', summary: 'Harakatni bildiruvchi so‘zlar.' },
  { grade: 2, subject: 'ona-tili', slug: 'sifat', title: 'Sifat — qanday?', summary: 'Belgini bildiruvchi so‘zlar.' },
  { grade: 2, subject: 'oqish', slug: 'maqollar', title: 'Maqollar', summary: 'Xalq donoligi: qisqa va ma’noli gaplar.' },
  { grade: 2, subject: 'oqish', slug: 'hikoya-tushunish', title: 'Hikoyani tushunamiz', summary: 'Kim? Qayerda? Nima bo‘ldi?' },
  { grade: 2, subject: 'olam', slug: 'hayvonlar', title: 'Uy va yovvoyi hayvonlar', summary: 'Kim odam yonida, kim tabiatda yashaydi?' },
  { grade: 2, subject: 'olam', slug: 'yol-harakati', title: 'Yo‘l harakati qoidalari', summary: 'Svetofor va xavfsiz yo‘l.' },
  // 3-sinf · yangi mavzular
  { grade: 3, subject: 'matematika', slug: 'kopaytirish-4-5', title: 'Ko‘paytirish jadvali: 4 va 5', summary: 'Teng guruhlarni tez sanaymiz.' },
  { grade: 3, subject: 'matematika', slug: 'perimetr', title: 'Perimetr', summary: 'Shaklning barcha tomonlari yig‘indisi.' },
  { grade: 3, subject: 'matematika', slug: 'ulush', title: 'Ulush: yarim va chorak', summary: 'Butunni teng bo‘laklarga bo‘lamiz.' },
  { grade: 3, subject: 'ona-tili', slug: 'gap-turlari', title: 'Gap turlari', summary: 'Darak, so‘roq va undov gaplar.' },
  { grade: 3, subject: 'ona-tili', slug: 'birlik-koplik', title: 'Birlik va ko‘plik', summary: 'Ko‘plik qo‘shimchasi -lar.' },
  { grade: 3, subject: 'ona-tili', slug: 'manodosh-zid', title: 'Ma’nodosh va zid ma’noli so‘zlar', summary: 'chiroyli — go‘zal, katta — kichik.' },
  { grade: 3, subject: 'oqish', slug: 'ertak-tuzilishi', title: 'Ertakning tuzilishi', summary: 'Boshlanma, voqea va yakun.' },
  { grade: 3, subject: 'oqish', slug: 'reja', title: 'Matnga reja tuzamiz', summary: 'Har bir qismga sarlavha qo‘yamiz.' },
  { grade: 3, subject: 'olam', slug: 'osimlik', title: 'O‘simlik qismlari', summary: 'Ildiz, poya, barg, gul va meva.' },
  { grade: 3, subject: 'olam', slug: 'ozbekiston', title: 'O‘zbekiston — Vatanim', summary: 'Poytaxt, davlat ramzlari, shaharlar.' },
  // 4-sinf · yangi mavzular
  { grade: 4, subject: 'matematika', slug: 'kop-xonali', title: 'Ko‘p xonali sonlar', summary: 'Minglar, yuzlar, o‘nlar, birlar.' },
  { grade: 4, subject: 'matematika', slug: 'kopaytirish-6-9', title: 'Ko‘paytirish jadvali: 6–9', summary: 'Jadvalni tez eslab qolish usullari.' },
  { grade: 4, subject: 'matematika', slug: 'yuza', title: 'Yuza', summary: 'Kvadrat santimetr va to‘g‘ri to‘rtburchak yuzasi.' },
  { grade: 4, subject: 'ona-tili', slug: 'ega-kesim', title: 'Ega va kesim', summary: 'Gapning bosh bo‘laklari.' },
  { grade: 4, subject: 'ona-tili', slug: 'olmosh', title: 'Olmosh', summary: 'Ot o‘rnida keladigan so‘zlar.' },
  { grade: 4, subject: 'ona-tili', slug: 'tutuq-belgisi', title: 'Tutuq belgisi, o‘ va g‘', summary: 'ma’no, san’at, o‘rik, g‘oz.' },
  { grade: 4, subject: 'oqish', slug: 'asosiy-fikr', title: 'Matnning asosiy fikri', summary: 'Muallif nima demoqchi?' },
  { grade: 4, subject: 'oqish', slug: 'rollarda', title: 'Rollarda o‘qish', summary: 'Har kim o‘z qahramonining so‘zini o‘qiydi.' },
  { grade: 4, subject: 'olam', slug: 'quyosh-tizimi', title: 'Quyosh tizimi', summary: 'Quyosh, sayyoralar va Oy.' },
  { grade: 4, subject: 'olam', slug: 'tabiatni-asrash', title: 'Tabiatni asraymiz', summary: 'Chiqindini saralash, suv va elektrni tejash.' },
];

export function findTopic(id: string): TopicEntry | undefined {
  return CATALOG.find((t) => topicId(t) === id);
}

export function topicsFor(grade: Grade, subject?: string): TopicEntry[] {
  return CATALOG.filter((t) => t.grade === grade && (subject == null || t.subject === subject));
}
