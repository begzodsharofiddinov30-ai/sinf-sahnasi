# Sinf Sahnasi

Boshlang‘ich sinf (1–4) o‘qituvchisi uchun **doska yoki proyektorda** ko‘rsatiladigan dars sahnalari. O‘qituvchi bitta tugma (yoki prezentatsiya pulti) bilan sahnalarni almashtiradi, bolalar doskaga chiqib mashqlarni bajaradi. Internet yo‘q bo‘lsa ham ishlaydi.

> **Diqqat: dars mazmuni — qoralama.** 14 ta mavzuning hammasi namuna sifatida yozilgan. Har bir mavzuni darsda ishlatishdan oldin o‘qituvchi tekshirib chiqishi kerak. Mazmun rasmiy o‘quv dasturiga mos ekani **da’vo qilinmaydi**.

**Jonli manzil:** <https://sinf-sahnasi.vercel.app> — uyda internet bor paytda bir marta oching va ilova sifatida o‘rnating.

## Nimalar bor

- **14 ta mavzu** (1–4-sinf: matematika, ona tili, atrofimizdagi olam), har birida 6–10 sahna.
- **11 xil sahna:** tushuntirish, sanash, javob tanlash, moslashtirish (sudrab olib borish), so‘z yasash, guruhlarga ajratish, son o‘qi, o‘nlik ramka, soat, hikoya, yakun.
- **O‘qituvchi asboblari:** tasodifiy o‘quvchi (takrorlamasdan), jamoalar hisobi, taymer.
- **Ish varag‘i:** har bir mavzudan avtomatik tuziladi va A4 ga chop etiladi (javoblari bilan nusxasi ham bor).
- **Sozlamalar:** ovoz, sokin rejim, yengil rejim (kuchsiz kompyuter uchun), yuqori kontrast, matn o‘lchami, sinf ro‘yxati.
- **Tekshiruv sahifasi:** darsdan oldin oflayn tayyorlik, ovoz, to‘liq ekran va ekran o‘lchamini tekshiradi.
- **Maxfiylik:** hisob (login) yo‘q, server yo‘q, internetga hech qanday ma’lumot yuborilmaydi. Sinf ro‘yxati (faqat ismlar) va sozlamalar faqat shu kompyuter brauzerida saqlanadi.

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

## Uch xil foydalanish usuli

1. **Sayt (Vercel)** — internet orqali ochiladi. Qanday joylash: [DEPLOY.md](DEPLOY.md).
2. **O‘rnatilgan ilova (PWA)** — saytni uyda bir marta ochib, Edge/Chrome’da “Ilovani o‘rnatish” qilinadi. Keyin ish stolidagi belgidan **internetsiz** ochiladi. Ilova ichida: **Ilovani o‘rnatish** sahifasi.
3. **Portativ versiya (USB)** — bitta `index.html` fayl. Fleshkadan ikki marta bosib ochiladi, hech narsa o‘rnatish shart emas.

### Portativ versiyaning cheklovlari

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

Barcha buyruqlar Windows, macOS va Linux’da bir xil ishlaydi.

## Yangi mavzu qo‘shish

Komponentlarga tegmasdan, faqat ma’lumot fayli yozib qo‘shiladi. Batafsil: [CONTENT_GUIDE.md](CONTENT_GUIDE.md).

## Loyiha tuzilmasi

```
src/app         marshrutlar, ramka, sozlamalar, PWA holati
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
