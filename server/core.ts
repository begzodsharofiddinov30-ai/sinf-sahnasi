// Bulut mantig'i: o'qituvchini ism + telefon bilan tanish va ma'lumotlarini saqlash.
// Baza (Store) alohida — testlarda xotiradagi, ishda Postgres (Neon) ishlatiladi.

export interface TeacherRow {
  phone: string;
  firstName: string;
  lastName: string;
  data: Record<string, unknown>;
  dataUpdatedAt: number;
  createdAt: string;
  lastSeen: string;
}

export interface Store {
  get(phone: string): Promise<TeacherRow | null>;
  create(row: Omit<TeacherRow, 'createdAt' | 'lastSeen'>): Promise<void>;
  saveData(phone: string, data: Record<string, unknown>, updatedAt: number): Promise<void>;
  touch(phone: string): Promise<void>;
  list(): Promise<TeacherRow[]>;
  /** Cheklov: shu kalit bo'yicha daqiqada `limit` tadan ko'p so'rov bo'lsa — false */
  hit(key: string, limit: number): Promise<boolean>;
}

/** Bulutda saqlanadigan kalitlar (boshqa narsa qabul qilinmaydi) */
export const SYNC_KEYS = ['settings', 'favourites', 'lastLesson', 'classList', 'scores'] as const;
export const MAX_DATA_BYTES = 64 * 1024;
/** Avtomatik testlar uchun raqam (admin ro'yxatida "sinov" deb belgilanadi) */
export const TEST_PHONE = '+998000000000';

const NAME_RE = /^[\p{L}‘’ʻʼ'`\- ]{2,30}$/u;

export function cleanName(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const v = raw.replace(/\s+/g, ' ').trim();
  return NAME_RE.test(v) ? v : null;
}

/** O'zbekiston raqami: +998 va 9 ta raqam. "90 123 45 67", "+998901234567", "998..." qabul qilinadi */
export function normalizePhone(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const d = raw.replace(/\D/g, '');
  const local = d.length === 12 && d.startsWith('998') ? d.slice(3) : d.length === 9 ? d : null;
  return local ? `+998${local}` : null;
}

const sameName = (a: string, b: string) => a.toLocaleLowerCase('uz').replace(/[‘’ʻʼ'`]/g, "'") === b.toLocaleLowerCase('uz').replace(/[‘’ʻʼ'`]/g, "'");

export function cleanData(raw: unknown): Record<string, unknown> | null {
  if (typeof raw !== 'object' || raw === null || Array.isArray(raw)) return null;
  const out: Record<string, unknown> = {};
  for (const k of SYNC_KEYS) if (k in raw) out[k] = (raw as Record<string, unknown>)[k];
  if (new TextEncoder().encode(JSON.stringify(out)).length > MAX_DATA_BYTES) return null;
  return out;
}

export type Result =
  | { status: 200; body: { ok: true; teacher: { firstName: string; lastName: string; phone: string }; data: Record<string, unknown>; updatedAt: number; created?: boolean } }
  | { status: 400 | 401 | 403 | 404 | 409 | 413 | 429 | 503; body: { ok: false; error: string; message: string } };

const fail = (status: 400 | 401 | 403 | 404 | 409 | 413 | 429 | 503, error: string, message: string): Result => ({ status, body: { ok: false, error, message } });

interface Identity {
  firstName: string;
  lastName: string;
  phone: string;
}

function identity(input: Record<string, unknown>): Identity | Result {
  const firstName = cleanName(input.firstName);
  const lastName = cleanName(input.lastName);
  const phone = normalizePhone(input.phone);
  if (!firstName || !lastName) return fail(400, 'bad-name', 'Ism va familiya 2–30 ta harfdan iborat bo‘lsin.');
  if (!phone) return fail(400, 'bad-phone', 'Telefon raqam +998 va 9 ta raqamdan iborat bo‘lsin.');
  return { firstName, lastName, phone };
}

/** Kirish yoki ro'yxatdan o'tish (raqam yangi bo'lsa — yaratiladi) */
export async function login(store: Store, input: Record<string, unknown>, ip: string): Promise<Result> {
  if (!(await store.hit(`login:${ip}`, 20))) return fail(429, 'rate', 'Juda ko‘p urinish. Bir daqiqadan keyin qayta urining.');
  const id = identity(input);
  if ('status' in id) return id;
  const row = await store.get(id.phone);
  if (!row) {
    const data = cleanData(input.data) ?? {};
    const updatedAt = typeof input.updatedAt === 'number' && Object.keys(data).length > 0 ? input.updatedAt : 0;
    await store.create({ ...id, data, dataUpdatedAt: updatedAt });
    return { status: 200, body: { ok: true, teacher: id, data, updatedAt, created: true } };
  }
  if (!sameName(row.firstName, id.firstName) || !sameName(row.lastName, id.lastName))
    return fail(409, 'name-mismatch', 'Bu telefon raqam boshqa ism-familiya bilan ro‘yxatdan o‘tgan. Ism-familiyani tekshiring.');
  await store.touch(id.phone);
  return { status: 200, body: { ok: true, teacher: { firstName: row.firstName, lastName: row.lastName, phone: row.phone }, data: row.data, updatedAt: row.dataUpdatedAt } };
}

/** Sinxronlash: yangiroq bo'lsa saqlaydi, har doim joriy holatni qaytaradi (yangi hisob yaratmaydi) */
export async function sync(store: Store, input: Record<string, unknown>, ip: string): Promise<Result> {
  if (!(await store.hit(`sync:${ip}`, 60))) return fail(429, 'rate', 'Juda ko‘p so‘rov. Biroz kuting.');
  const id = identity(input);
  if ('status' in id) return id;
  const row = await store.get(id.phone);
  if (!row) return fail(404, 'not-found', 'Bu raqam ro‘yxatdan o‘tmagan.');
  if (!sameName(row.firstName, id.firstName) || !sameName(row.lastName, id.lastName)) return fail(403, 'name-mismatch', 'Ism-familiya mos kelmadi.');
  let { data, dataUpdatedAt } = row;
  if (input.data !== undefined) {
    const clean = cleanData(input.data);
    if (!clean) return fail(413, 'bad-data', 'Ma’lumot noto‘g‘ri yoki juda katta.');
    const at = typeof input.updatedAt === 'number' && Number.isFinite(input.updatedAt) ? input.updatedAt : 0;
    // Oxirgi o'zgarish yutadi
    if (at > dataUpdatedAt) {
      await store.saveData(id.phone, clean, at);
      data = clean;
      dataUpdatedAt = at;
    } else await store.touch(id.phone);
  } else await store.touch(id.phone);
  return { status: 200, body: { ok: true, teacher: { firstName: row.firstName, lastName: row.lastName, phone: row.phone }, data, updatedAt: dataUpdatedAt } };
}

/** Vaqtga bog'liq bo'lmagan taqqoslash (admin kaliti uchun) */
export function safeEqual(a: string, b: string): boolean {
  const ea = new TextEncoder().encode(a);
  const eb = new TextEncoder().encode(b);
  let diff = ea.length ^ eb.length;
  for (let i = 0; i < Math.max(ea.length, eb.length); i++) diff |= (ea[i] ?? 0) ^ (eb[i] ?? 0);
  return diff === 0;
}

export interface AdminTeacher {
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  lastSeen: string;
  classSize: number;
  test: boolean;
}

export async function adminList(store: Store, token: string | null, adminToken: string | undefined, ip: string) {
  if (!(await store.hit(`admin:${ip}`, 30))) return { status: 429 as const, body: { ok: false, error: 'rate' } };
  if (!adminToken || adminToken.length < 16) return { status: 503 as const, body: { ok: false, error: 'not-configured' } };
  if (!token || !safeEqual(token, adminToken)) return { status: 401 as const, body: { ok: false, error: 'unauthorized' } };
  const rows = await store.list();
  const teachers: AdminTeacher[] = rows.map((r) => ({
    firstName: r.firstName,
    lastName: r.lastName,
    phone: r.phone,
    createdAt: r.createdAt,
    lastSeen: r.lastSeen,
    classSize: Array.isArray(r.data.classList) ? r.data.classList.length : 0,
    test: r.phone === TEST_PHONE,
  }));
  return { status: 200 as const, body: { ok: true, teachers } };
}

/** Xotiradagi baza — testlar uchun */
export function memoryStore(): Store & { rows: Map<string, TeacherRow> } {
  const rows = new Map<string, TeacherRow>();
  const hits = new Map<string, number>();
  const now = () => new Date().toISOString();
  return {
    rows,
    async get(p) {
      const r = rows.get(p);
      return r ? structuredClone(r) : null;
    },
    async create(r) {
      rows.set(r.phone, { ...structuredClone(r), createdAt: now(), lastSeen: now() });
    },
    async saveData(p, data, at) {
      const r = rows.get(p)!;
      rows.set(p, { ...r, data: structuredClone(data), dataUpdatedAt: at, lastSeen: now() });
    },
    async touch(p) {
      const r = rows.get(p);
      if (r) r.lastSeen = now();
    },
    async list() {
      return [...rows.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async hit(key, limit) {
      const n = (hits.get(key) ?? 0) + 1;
      hits.set(key, n);
      return n <= limit;
    },
  };
}
