/** סוגי רישיון במאגר הרשמי (B מסומן «В» בקובץ המקור). */
export const LICENSE_TYPE_IDS = ["B", "A", "C", "C1", "D", "1"] as const;

export type LicenseTypeId = (typeof LICENSE_TYPE_IDS)[number];

export const LICENSE_TYPE_LABELS: Record<LicenseTypeId, string> = {
  B: "רכב פרטי (B)",
  A: "אופנוע (A)",
  C: "משאית כבדה (C)",
  C1: "משאית קלה (C1)",
  D: "אוטובוס (D)",
  "1": "טרקטור (1)",
};

const VALID = new Set<string>(LICENSE_TYPE_IDS);

/** ממיר תג מה-XML הרשמי (כולל В киrilic) לקוד רישיון פנימי. */
export function normalizeLicenseTag(raw: string): LicenseTypeId | null {
  const t = raw.trim();
  if (t === "В" || t === "B") return "B";
  if (VALID.has(t)) return t as LicenseTypeId;
  return null;
}

export function parseLicenseType(raw: unknown): LicenseTypeId | "" {
  if (typeof raw !== "string") return "";
  const t = raw.trim().toUpperCase();
  if (t === "В") return "B";
  return VALID.has(t) ? (t as LicenseTypeId) : "";
}
