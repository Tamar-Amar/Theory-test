import * as S from "./ScoreDisplay.styles";

type Props = {
  percent: number;
  score: number;
  total: number;
  timeLabel: string;
};

export function ScoreDisplay({ percent, score, total, timeLabel }: Props) {
  return (
    <S.Block>
      <S.Percent>{percent}%</S.Percent>
      <S.Sub>
        {score} נכונות מתוך {total} · זמן {timeLabel}
      </S.Sub>
    </S.Block>
  );
}
