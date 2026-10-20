// GET /api/admin — ro'yxatdan o'tgan o'qituvchilar (faqat ADMIN_TOKEN bilan)
import { adminList } from '../server/core.js';
import { clientIp, getStore, guarded, json } from '../server/http.js';

export async function GET(req: Request): Promise<Response> {
  return guarded(async () => {
    const auth = req.headers.get('authorization') ?? '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7).trim() : null;
    const r = await adminList(getStore(), token, process.env.ADMIN_TOKEN, clientIp(req));
    return json(r.status, r.body);
  });
}
