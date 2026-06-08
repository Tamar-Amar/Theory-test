import { parseLicenseType } from "../constants/licenseTypes.js";

export type QuestionFilterOpts = {
  category?: string;
  licenseType?: unknown;
};

export function buildQuestionFilter(opts: QuestionFilterOpts): Record<string, unknown> {
  const filter: Record<string, unknown> = {};
  const category =
    typeof opts.category === "string" ? opts.category.trim() : "";
  if (category) filter.category = category;

  const licenseType = parseLicenseType(opts.licenseType);
  if (licenseType) filter.licenseTypes = licenseType;

  return filter;
}
