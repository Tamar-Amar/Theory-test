export const DEFAULT_LICENSE_TYPE = "B";

export type LicenseTypeOption = {
  id: string;
  label: string;
  questionCount: number;
};

export const FALLBACK_LICENSE_TYPES: LicenseTypeOption[] = [
  { id: "B", label: "רכב פרטי (B)", questionCount: 0 },
  { id: "A", label: "אופנוע (A)", questionCount: 0 },
  { id: "C", label: "משאית כבדה (C)", questionCount: 0 },
  { id: "C1", label: "משאית קלה (C1)", questionCount: 0 },
  { id: "D", label: "אוטובוס (D)", questionCount: 0 },
  { id: "1", label: "טרקטור (1)", questionCount: 0 },
];
