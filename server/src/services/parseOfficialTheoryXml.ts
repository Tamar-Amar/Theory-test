import { normalizeLicenseTag, type LicenseTypeId } from "../constants/licenseTypes.js";

export type ParsedOfficialQuestion = {
  questionNum: number;
  licenseTypes: LicenseTypeId[];
};

const ITEM_RE = /<item>([\s\S]*?)<\/item>/g;
const TITLE_RE = /<title>([\s\S]*?)<\/title>/;
const DESC_RE = /<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/;

function extractLicenseTags(description: string): LicenseTypeId[] {
  const tags = [...description.matchAll(/«([^»]+)»/g)]
    .map((m) => normalizeLicenseTag(m[1]))
    .filter((t): t is LicenseTypeId => t != null);
  return [...new Set(tags)].sort();
}

function extractQuestionNum(title: string): number | null {
  const m = title.trim().match(/^(\d+)\./);
  if (!m) return null;
  return Number(m[1]);
}

/** מפרסר את ה-XML הרשמי של משרד התחבורה (TheoryExamHE). */
export function parseOfficialTheoryXml(xml: string): ParsedOfficialQuestion[] {
  const out: ParsedOfficialQuestion[] = [];
  for (const match of xml.matchAll(ITEM_RE)) {
    const item = match[1];
    const title = TITLE_RE.exec(item)?.[1];
    const desc = DESC_RE.exec(item)?.[1];
    if (!title || !desc) continue;

    const questionNum = extractQuestionNum(title);
    if (questionNum == null) continue;

    const licenseTypes = extractLicenseTags(desc);
    if (!licenseTypes.length) continue;

    out.push({ questionNum, licenseTypes });
  }
  return out;
}

/** בונה regex לחיפוש שאלה לפי מספר רשמי בתחילת הטקסט (למשל 1759.). */
export function questionNumPrefixRegex(questionNum: number): RegExp {
  const padded = String(questionNum).padStart(4, "0");
  return new RegExp(`^0*${questionNum}\\.|^${padded}\\.`);
}
