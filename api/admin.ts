// /api/admin — GET: ro'yxatdan o'tganlar; DELETE {phone}: hisobni o'chirish (faqat ADMIN_TOKEN bilan)
import { adminDelete, adminList } from '../server/core.js';
import { clientIp, getStore, guarded, json, readBody } from '../server/http.js';

function bearer(req: Request): string | null {
  const auth = req.headers.get('authorization') ?? '';
  return auth.startsWith('Bearer ') ? auth.slice(7).trim() : null;
}

export async function GET(req: Request): Promise<Response> {
  return guarded(async () => {
    const r = await adminList(getStore(), bearer(req), process.env.ADMIN_TOKEN, clientIp(req));
    return json(r.status, r.body);
  });
}

export async function DELETE(req: Request): Promise<Response> {
  return guarded(async () => {
    const body = await readBody(req);
    const r = await adminDelete(getStore(), bearer(req), process.env.ADMIN_TOKEN, clientIp(req), body?.phone);
    return json(r.status, r.body);
  });
}
