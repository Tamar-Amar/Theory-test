import * as S from "./QuizProgress.styles";

type Props = {
  current: number;
  total: number;
  progressPercent: number;
  elapsedLabel: string;
};

export function QuizProgress({
  current,
  total,
  progressPercent,
  elapsedLabel,
}: Props) {
  return (
    <S.Wrap>
      <S.Top>
        <span>
          שאלה {current} מתוך {total}
        </span>
        <S.Timer>{elapsedLabel}</S.Timer>
      </S.Top>
      <S.Bar>
        <S.Fill $pct={progressPercent} />
      </S.Bar>
    </S.Wrap>
  );
}
