// POST /api/delete — o'qituvchi o'z hisobini bulutdan butunlay o'chiradi
import { deleteSelf } from '../server/core.js';
import { clientIp, getStore, guarded, json, readBody } from '../server/http.js';

export async function POST(req: Request): Promise<Response> {
  return guarded(async () => {
    const body = await readBody(req);
    if (!body) return json(400, { ok: false, error: 'bad-request', message: 'Noto‘g‘ri so‘rov.' });
    const r = await deleteSelf(getStore(), body, clientIp(req));
    return json(r.status, r.body);
  });
}
