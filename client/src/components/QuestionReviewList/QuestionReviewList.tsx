import type { AttemptQuestionReview } from "../../api";
import { formatQuestionText } from "../../utils/formatQuestionText";
import { QuestionImage } from "../QuestionImage/QuestionImage";
import { Tag } from "../Tag/Tag";
import * as S from "./QuestionReviewList.styles";

type Props = { items: AttemptQuestionReview[] };

function Chevron() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
      {items.map((item, i) => {
        const chosen = optionLabel(
          item.options,
          item.selectedIndex,
          `אפשרות ${item.selectedIndex + 1}`
        );
        const correct = optionLabel(
          item.options,
          item.correctIndex,
          `אפשרות ${item.correctIndex + 1}`
        );
        return (
          <S.Details key={i}>
            <S.Summary>
              <S.Num>{i + 1}</S.Num>
              <S.QText>{formatQuestionText(item.text)}</S.QText>
              <Tag variant={item.isCorrect ? "success" : "danger"}>
                {item.isCorrect ? "נכון" : "שגוי"}
              </Tag>
              <S.Arrow>
                <Chevron />
              </S.Arrow>
            </S.Summary>
            <S.Panel>
              {item.isCorrect ? (
                <S.Line $variant="ok">התשובה הנכונה: {correct}</S.Line>
              ) : (
                <>
                  <S.Line $variant="wrong">הבחירה שלכם: {chosen}</S.Line>
                  <S.Line $variant="ok">התשובה הנכונה: {correct}</S.Line>
                </>
              )}
              {item.imageUrl ? (
                <S.ReviewImage>
                  <QuestionImage src={item.imageUrl} />
                </S.ReviewImage>
              ) : null}
            </S.Panel>
          </S.Details>
        );
      })}
    </S.List>
  );
}
