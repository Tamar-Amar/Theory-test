import type { AttemptQuestionReview } from "../../api";
import { formatQuestionText } from "../../utils/formatQuestionText";
import { QuestionImage } from "../QuestionImage/QuestionImage";
import * as S from "./QuestionReviewList.styles";

type Props = { items: AttemptQuestionReview[] };

function optionLabel(
  options: string[],
  index: number,
  fallback: string
): string {
  const t = options[index];
  return t !== undefined && t !== "" ? t : fallback;
}

export function QuestionReviewList({ items }: Props) {
  return (
    <S.List>
      {items.map((item, i) => (
        <S.Details key={i}>
          <S.Summary $ok={item.isCorrect}>
            <span>
              שאלה {i + 1}
              {item.isCorrect ? " · נכון" : " · שגוי"}
            </span>
          </S.Summary>
          <S.Panel>
            <S.QuestionText>{formatQuestionText(item.text)}</S.QuestionText>
            {item.imageUrl ? <QuestionImage src={item.imageUrl} /> : null}
            <S.AnswerBlock $variant={item.isCorrect ? "ok" : "wrong"}>
              <S.AnswerLabel>בחירתך</S.AnswerLabel>
              <S.AnswerText>
                {optionLabel(
                  item.options,
                  item.selectedIndex,
                  `אפשרות ${item.selectedIndex + 1}`
                )}
              </S.AnswerText>
            </S.AnswerBlock>
            <S.AnswerBlock $variant="ok">
              <S.AnswerLabel>התשובה הנכונה</S.AnswerLabel>
              <S.AnswerText>
                {optionLabel(
                  item.options,
                  item.correctIndex,
                  `אפשרות ${item.correctIndex + 1}`
                )}
              </S.AnswerText>
            </S.AnswerBlock>
          </S.Panel>
        </S.Details>
      ))}
    </S.List>
  );
}
