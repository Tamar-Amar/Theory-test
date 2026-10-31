import type { Meta } from "../../api";
import { Chip } from "../Chip/Chip";
import { SmartModeInfo } from "../SmartModeInfo/SmartModeInfo";
import { LoadingState } from "../LoadingState/LoadingState";
import * as S from "./QuizSetup.styles";

const COUNTS = [30, 20, 10] as const;

type Props = {
  meta: Meta | null;
  loadingMeta: boolean;
  count: number;
  category: string;
  starting: boolean;
  onCount: (n: number) => void;
  onCategory: (c: string) => void;
  onStart: () => void;
};

/** הגדרת מבחן — נושא ומספר שאלות. סוג הרישיון נבחר רק באזור האישי. */
export function QuizSetup({
  meta,
  loadingMeta,
  count,
  category,
  starting,
  onCount,
  onCategory,
  onStart,
}: Props) {
  if (loadingMeta || !meta) {
    return <LoadingState />;
  }

  const footer = (
    <>
      <SmartModeInfo />
      <S.Actions>
        <S.StartButton
          type="button"
          disabled={starting || !meta.questionCount}
          onClick={onStart}
        >
          {starting ? "פותחים מבחן…" : "התחילו מבחן"}
        </S.StartButton>
      </S.Actions>
    </>
  );

  return (
    <>
    <S.MainCard>
      <S.Section>
        <S.CardTitle>נושא המבחן</S.CardTitle>
        <S.ChipGrid>
          {meta.categories.map((c) => (
            <Chip
              key={c}
              active={category === c}
              onClick={() => onCategory(c)}
            >
              {c}
            </Chip>
          ))}
          <Chip active={category === ""} onClick={() => onCategory("")}>
            הכל - מעורב
          </Chip>
        </S.ChipGrid>
      </S.Section>

      <S.Section>
        <S.CardTitle>כמה שאלות במבחן?</S.CardTitle>
        <S.ChipGrid>
          {COUNTS.map((n) => (
            <Chip key={n} active={count === n} onClick={() => onCount(n)}>
              {n} שאלות
            </Chip>
          ))}
        </S.ChipGrid>
      </S.Section>

      {/* דסקטופ: בתוך הכרטיס */}
      <S.Inside>{footer}</S.Inside>
    </S.MainCard>
    {/* מובייל: מחוץ לכרטיס, כמו ב‑Figma */}
    <S.Outside>{footer}</S.Outside>
    </>
  );
}
