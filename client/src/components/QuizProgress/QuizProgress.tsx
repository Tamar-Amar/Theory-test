import * as S from "./QuizProgress.styles";
import type { SegKind } from "./QuizProgress.styles";

type Props = {
  current: number;
  total: number;
  progressPercent: number;
  elapsedLabel: string;
};

export function QuizProgress({ current, total, elapsedLabel }: Props) {
  const segmentCount = Math.max(total, 1);

  const kindFor = (i: number): SegKind => {
    if (i < current - 1) return "done";
    if (i === current - 1) return "current";
    return "todo";
  };

  return (
    <S.Wrap>
      <S.Top>
        <span>
          שאלה {current} מתוך {total}
        </span>
        <S.Timer>{elapsedLabel}</S.Timer>
      </S.Top>
      <S.Segments role="presentation">
        {Array.from({ length: segmentCount }, (_, i) => (
          <S.Seg key={i} $kind={kindFor(i)} />
        ))}
      </S.Segments>
    </S.Wrap>
  );
}
