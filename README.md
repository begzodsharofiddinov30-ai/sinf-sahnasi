# Sinf Sahnasi

Boshlang‘ich sinf (1–4) o‘qituvchisi uchun **doska yoki proyektorda** ko‘rsatiladigan dars sahnalari. O‘qituvchi bitta tugma (yoki prezentatsiya pulti) bilan sahnalarni almashtiradi, bolalar doskaga chiqib mashqlarni bajaradi. Internet yo‘q bo‘lsa ham ishlaydi.

> **Diqqat: dars mazmuni — qoralama.** 54 ta mavzuning hammasi namuna sifatida yozilgan. Har bir mavzuni darsda ishlatishdan oldin o‘qituvchi tekshirib chiqishi kerak. Mazmun rasmiy o‘quv dasturiga mos ekani **da’vo qilinmaydi**.

**Jonli manzil:** <https://sinf-sahnasi.vercel.app> — uyda internet bor paytda bir marta oching va ilova sifatida o‘rnating.

## Nimalar bor

- **54 ta mavzu** (har bir sinfda 12–17 ta: matematika, ona tili, o‘qish, atrofimizdagi olam), har birida 6–10 sahna.
- **11 xil sahna:** tushuntirish, sanash, javob tanlash, moslashtirish (sudrab olib borish), so‘z yasash, guruhlarga ajratish, son o‘qi, o‘nlik ramka, soat, hikoya, yakun.
- **O‘qituvchi asboblari:** tasodifiy o‘quvchi (takrorlamasdan), jamoalar hisobi, taymer.
- **Ish varag‘i:** har bir mavzudan avtomatik tuziladi va A4 ga chop etiladi (javoblari bilan nusxasi ham bor).
- **Sozlamalar:** ovoz, sokin rejim, yengil rejim (kuchsiz kompyuter uchun), yuqori kontrast, matn o‘lchami, sinf ro‘yxati.
- **Tekshiruv sahifasi:** darsdan oldin oflayn tayyorlik, ovoz, to‘liq ekran va ekran o‘lchamini tekshiradi.
- **Onlayn kirish:** birinchi ochilishda o‘qituvchi **ism, familiya va telefon raqamini** yozadi — parol, SMS va email yo‘q. Boshqa kompyuterda xuddi shu ma’lumot bilan kirsa, **sinf ro‘yxati, sevimlilar, sozlamalar, oxirgi dars va hisob** bulutdan qaytadi. Internet bo‘lmasa ham ishlaydi — o‘zgarishlar keyin yuklanadi. Har bir bo‘lim alohida birlashtiriladi: uyda ro‘yxat, maktabda hisob o‘zgarsa — ikkalasi ham saqlanadi. Sayt ochiq turganda har daqiqada (va oynaga qaytganda) bulutdagi yangiliklar o‘zi ko‘rinadi.
- **Administrator sahifasi:** `#/admin` — ro‘yxatdan o‘tgan o‘qituvchilar jadvali va CSV (Excel). Faqat `ADMIN_TOKEN` kaliti bilan ochiladi.
- **Animatsiya ovozlari:** sahna almashishi, yangi qadam, narsani ko‘tarish, sakrash va bayram uchun yumshoq ovozlar (Sozlamalarda alohida o‘chiriladi; sokin rejimda jim).
- **Maxfiylik:** o‘qituvchining ismi, familiyasi, telefoni va sinf sozlamalari (o‘quvchilar **ismlari** ro‘yxati bilan) o‘qituvchi roziligi bilan **bulutda** (Neon Postgres, Frankfurt) saqlanadi. Boshqa hech qanday ma’lumot, analitika yoki reklama yo‘q. “Chiqish” shu kompyuterdagi nusxani o‘chiradi. **Sozlamalar → “Hisobimni butunlay o‘chirish”** bulutdagi barcha ma’lumotni o‘chiradi; administrator ham admin sahifasidan o‘chira oladi.

> **Huquqiy eslatma:** O‘zbekistonning “Shaxsga doir ma’lumotlar to‘g‘risida”gi qonuni fuqarolarning shaxsiy ma’lumotlarini O‘zbekiston hududidagi serverlarda saqlashni talab qiladi. Hozirgi bulut (Neon, Frankfurt) xorijda. Maktab yoki tuman miqyosida ishlatishdan oldin huquqshunos bilan maslahatlashing; kerak bo‘lsa, server qismi (`server/`) mahalliy Postgres’ga ko‘chiriladi — buning uchun faqat `server/pg.ts` dagi ulanish manzili o‘zgaradi.

> **Xavfsizlik:** parol yo‘qligi sababli, kimdir o‘qituvchining **ismi, familiyasi va telefonini** bilsa, uning sinf sozlamalarini ko‘ra oladi. Shuning uchun bulutda faqat dars uchun zarur ma’lumotlar saqlanadi (o‘quvchilarning familiyasi, baholari va boshqa shaxsiy ma’lumotlari saqlanmaydi).

## Pleyer tugmalari

| Tugma | Vazifasi |
| --- | --- |
| Space, Enter, →, PageDown | Keyingi qadam / sahna (prezentatsiya pulti ham ishlaydi) |
| ←, PageUp | Orqaga |
| F | To‘liq ekran |
| H | O‘qituvchi maslahati |
| J | Javobni ko‘rsatish |
| T | Asboblar (tasodifiy o‘quvchi, hisob, taymer) |
| 1–4 | Javob variantini tanlash |
| Esc | Maslahat/asboblarni yopish → to‘liq ekrandan chiqish → darsdan chiqish |

Harfli tugmalar klaviatura rus yoki o‘zbek tartibida bo‘lsa ham ishlaydi.

## Sayt muntazam ishlab turishi

- Sayt Vercel’ning statik xostingida joylashgan — server “o‘chib qolmaydi”, uxlamaydi.
- **GitHub Actions** (`.github/workflows/`):
  - `ci.yml` — har `git push` da lint, tarkib, barcha testlar, build va brauzer testlari. Xato bo‘lsa — buzilgan versiya ham baribir joylanishi mumkin, shuning uchun GitHub’dagi qizil belgiga qarang.
  - `monitor.yml` — **har 6 soatda** jonli saytni ochib, darslarni brauzerda o‘tadi. Sayt ishlamay qolsa, GitHub repozitoriy egasiga **email** yuboradi.
- GitHub ochiq repozitoriyda 60 kun hech qanday o‘zgarish bo‘lmasa, rejali tekshiruvni to‘xtatib qo‘yadi — u holda Actions sahifasida “Enable workflow” ni bosing.
- O‘rnatilgan ilova esa saytga umuman bog‘liq emas: internet yoki Vercel ishlamasa ham noutbukdagi nusxa ochilaveradi.

## Uch xil foydalanish usuli

1. **Sayt (Vercel)** — internet orqali ochiladi. Qanday joylash: [DEPLOY.md](DEPLOY.md).
2. **O‘rnatilgan ilova (PWA)** — saytni uyda bir marta ochib, Edge/Chrome’da “Ilovani o‘rnatish” qilinadi. Keyin ish stolidagi belgidan **internetsiz** ochiladi. Ilova ichida: **Ilovani o‘rnatish** sahifasi.
3. **Portativ versiya (USB)** — bitta `index.html` fayl. Fleshkadan ikki marta bosib ochiladi, hech narsa o‘rnatish shart emas.

### Portativ versiyaning cheklovlari

- **Bulut ishlamaydi:** portativ versiyada telefon so‘ralmaydi, hamma narsa faqat shu kompyuterda saqlanadi.
- `file://` orqali ochilgani uchun **service worker ishlamaydi** — lekin kerak ham emas: hamma narsa (darslar, shriftlar, rasmlar) faylning ichida.
- Sozlamalar va sinf ro‘yxati brauzerda **fayl joylashgan joyga bog‘lab** saqlanadi. Faylni boshqa papkaga ko‘chirsangiz yoki boshqa kompyuterda ochsangiz, ular qaytadan kiritiladi.
- Yangilash avtomatik emas: yangi `index.html` ni qaytadan nusxalash kerak.
- Audio fayllar (`audio/` papkasi) `index.html` bilan **bir papkada** turishi kerak.
- Edge/Chrome ishlatish tavsiya etiladi.

## Windows’da ishga tushirish (dasturchi yoki yordamchi uchun)

O‘qituvchiga bu bo‘lim kerak emas — u tayyor sayt yoki portativ fayldan foydalanadi. Bu bo‘lim loyihani o‘zgartirmoqchi bo‘lganlar uchun.

1. **Node.js** o‘rnating: <https://nodejs.org> → “LTS” versiyasi (20 yoki yangiroq). O‘rnatishda hamma sozlamani standart qoldiring.
2. Loyiha papkasini oching, manzil satriga `cmd` deb yozib Enter bosing (yoki PowerShell oching).
3. Bir marta:
   ```
   npm install
   ```
4. Ishlab chiqish rejimi (brauzerda ochiladi, o‘zgarishlar darhol ko‘rinadi):
   ```
   npm run dev
   ```
5. Tayyor versiyalarni yig‘ish (`build` — sayt va PWA, `dist\` papkasiga; `build:portable` — bitta fayl, `dist-portable\index.html`; `build:all` — ikkalasi):
   ```
   npm run build
   npm run build:portable
   npm run build:all
   ```
6. Tekshirish (`check` — lint, tarkib, testlar va build; Playwright brauzeri faqat bir marta o‘rnatiladi):
   ```
   npm run check
   npx playwright install chromium
   npm run test:e2e
   ```

### O‘qituvchining noutbukiga ko‘chirish

- **Eng oson:** `dist-portable` papkasining ichidagini (index.html, audio, icons) USB fleshkaga nusxalang. Noutbukda papkani ish stoliga ko‘chirib, `index.html` ni Edge yoki Chrome’da oching. Qulaylik uchun unga ish stolida yorliq (shortcut) yarating.
- **Yoki:** saytni Vercel’ga joylab ([DEPLOY.md](DEPLOY.md)), noutbukda uyda bir marta ochib, ilova sifatida o‘rnating.

## Buyruqlar

| Buyruq | Vazifasi |
| --- | --- |
| `npm run dev` | Ishlab chiqish serveri |
| `npm run build` | Sayt + PWA (`dist/`) |
| `npm run build:portable` | Bitta faylli versiya (`dist-portable/`) |
| `npm run preview` | Tayyor saytni mahalliy ko‘rish (http://localhost:4173) |
| `npm test` | Unit va komponent testlari (Vitest) |
| `npm run test:e2e` | Brauzer testlari (Playwright) |
| `npm run lint` | Kod tekshiruvi |
| `npm run validate:content` | Dars fayllarini tekshirish |
| `npm run check` | Hammasi birga |
| `npm run db:migrate` | Bazada jadvallarni yaratish (bir marta; `.env.local` dagi `DATABASE_URL` bilan) |

Barcha buyruqlar Windows, macOS va Linux’da bir xil ishlaydi.

## Yangi mavzu qo‘shish

Komponentlarga tegmasdan, faqat ma’lumot fayli yozib qo‘shiladi. Batafsil: [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

## Loyiha tuzilmasi

```
api             Vercel server funksiyalari: /api/login, /api/sync, /api/admin
server          bulut mantig‘i (core.ts) va Postgres bazasi (pg.ts)
src/app         marshrutlar, ramka, sozlamalar, o‘qituvchi profili, bulut sinxronlash, PWA
src/pages       sahifalar (bosh, sinf, fan, mavzu, pleyer, ish varag‘i, asboblar, sozlamalar, tekshiruv, o‘rnatish)
src/player      pleyer, sahna dvigateli, klaviatura, sahna turlari (scenes/)
src/tools       tasodifiy o‘quvchi, hisob, taymer, sinf ro‘yxati
src/components  maskot, rasmlar, tugmalar va boshqalar
src/content     sxema, validator, katalog va darslar (<sinf>/<fan>/<mavzu>.ts)
src/worksheet   ish varag‘i
src/lib         xavfsiz saqlash, ovoz, qulaylik, to‘liq ekran, oflayn
public          ikonkalar, audio
tests/          Vitest testlari      e2e/   Playwright testlari
```

Rasm, ovoz va shriftlar manbasi: [ASSETS.md](ASSETS.md).
