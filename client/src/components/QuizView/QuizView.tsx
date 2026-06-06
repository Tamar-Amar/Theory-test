import type { QuizQuestion } from "../../api";
import { formatElapsed } from "../../utils/formatElapsed";
import { Card } from "../Card/Card";
import { QuizProgress } from "../QuizProgress/QuizProgress";
import { QuizQuestionTitle } from "../QuizQuestionTitle/QuizQuestionTitle";
import { QuestionImage } from "../QuestionImage/QuestionImage";
import { AnswerOption } from "../AnswerOption/AnswerOption";
import { QuizNavRow } from "../QuizNav/QuizNav";
import {
  SecondaryButton,
  PrimaryInlineButton,
} from "../Button/Button";
import * as S from "./QuizView.styles";

type Props = {
  question: QuizQuestion;
  questionIndex: number;
  total: number;
  progressPercent: number;
  elapsedMs: number;
  selectedIndex: number | null;
  answers: number[];
  onSelectOption: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

export function QuizView({
  question,
  questionIndex,
  total,
  progressPercent,
  elapsedMs,
  selectedIndex,
  answers,
  onSelectOption,
  onPrev,
  onNext,
  onFinish,
}: Props) {
  const isLast = questionIndex >= total - 1;

  return (
    <Card>
      <QuizProgress
        current={questionIndex + 1}
        total={total}
        progressPercent={progressPercent}
        elapsedLabel={formatElapsed(elapsedMs)}
      />

      <S.QuizBody>
        <S.QuestionColumn $hasImage={Boolean(question.imageUrl)}>
          <QuizQuestionTitle text={question.text} />
          {question.imageUrl ? (
            <QuestionImage src={question.imageUrl} />
          ) : null}
        </S.QuestionColumn>

        <S.AnswersColumn>
          <S.AnswersList role="radiogroup" aria-label="בחירת תשובה">
            {question.options.map((opt, i) => (
              <AnswerOption
                key={i}
                name={`q-${questionIndex}`}
                label={opt}
                selected={selectedIndex === i}
                onSelect={() => onSelectOption(i)}
              />
            ))}
          </S.AnswersList>
        </S.AnswersColumn>
      </S.QuizBody>

      <QuizNavRow>
        <SecondaryButton
          type="button"
          disabled={questionIndex === 0}
          onClick={onPrev}
        >
          הקודם
        </SecondaryButton>
        {isLast ? (
          <PrimaryInlineButton
            type="button"
            disabled={answers.some((a) => a < 0)}
            onClick={onFinish}
          >
            סיום וציון
          </PrimaryInlineButton>
        ) : (
          <PrimaryInlineButton
            type="button"
            disabled={selectedIndex === null}
            onClick={onNext}
          >
            הבא
          </PrimaryInlineButton>
        )}
      </QuizNavRow>
    </Card>
  );
}
