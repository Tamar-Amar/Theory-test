import * as S from "./QuizQuestionTitle.styles";
import { formatQuestionText } from "../../utils/formatQuestionText";

export function QuizQuestionTitle({ text }: { text: string }) {
  return <S.Text>{formatQuestionText(text)}</S.Text>;
}
