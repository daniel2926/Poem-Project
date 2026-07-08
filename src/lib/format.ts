// Small formatting helpers. Pure functions — no React, easy to test.

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** 'YYYY-MM-DD' -> 'Jul 8, 2026' */
export function formatDate(iso: string): string {
  const parts = String(iso).split('-').map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return iso;
  const [year, month, day] = parts;
  return `${MONTHS[month - 1]} ${day}, ${year}`;
}

/** Today's local date as 'YYYY-MM-DD' (no timezone surprises). */
export function todayISO(): string {
  const t = new Date();
  const mm = String(t.getMonth() + 1).padStart(2, '0');
  const dd = String(t.getDate()).padStart(2, '0');
  return `${t.getFullYear()}-${mm}-${dd}`;
}
