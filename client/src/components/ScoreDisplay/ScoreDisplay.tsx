import * as S from "./ScoreDisplay.styles";

type Props = {
  percent: number;
  score: number;
  total: number;
  required: number;
  passed: boolean;
};

export function ScoreDisplay({ percent, score, total, required, passed }: Props) {
  return (
    <S.Block $passed={passed}>
      <S.Status $passed={passed}>
        {passed ? "עברתם! 🎉" : "לא עברתם הפעם"}
      </S.Status>
      <S.Score>
        {score} / {total}
      </S.Score>
      <S.Sub>
        {percent}% תשובות נכונות · נדרשות {required} למעבר
      </S.Sub>
    </S.Block>
  );
}
