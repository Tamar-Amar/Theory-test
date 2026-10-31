import type { ReactNode } from "react";
import * as S from "./StatCard.styles";

type Props = {
  /** הערך הראשי (לדוגמה "82%") */
  value: ReactNode;
  /** תיאור הערך (לדוגמה "אחוז הצלחה") */
  label: ReactNode;
  className?: string;
};

/** כרטיס נתון — ערך גדול מודגש ותווית מתחתיו (StatCard ב‑Figma) */
export function StatCard({ value, label, className }: Props) {
  return (
    <S.Root className={className}>
      <S.Value>{value}</S.Value>
      <S.Label>{label}</S.Label>
    </S.Root>
  );
}
