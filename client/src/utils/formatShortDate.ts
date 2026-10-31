/** תאריך קצר בפורמט dd.mm.yyyy עם אפסים מובילים (כמו בעיצוב), למשל "02.09.2026" */
export function formatShortDate(value: Date): string {
  const dd = String(value.getDate()).padStart(2, "0");
  const mm = String(value.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${value.getFullYear()}`;
}
