// Qidiruv uchun matnni bir xil ko'rinishga keltirish (o', oʻ, o‘ — bari bir)
export function normalizeForSearch(s: string): string {
  return s
    .toLowerCase()
    .replace(/[ʻʼ‘’`´']/g, "'")
    .replace(/[–—]/g, '-')
    .replace(/\s+/g, ' ')
    .trim();
}

export function matchesQuery(haystack: string, query: string): boolean {
  const q = normalizeForSearch(query);
  if (!q) return true;
  const h = normalizeForSearch(haystack);
  return q.split(' ').every((part) => h.includes(part));
}
