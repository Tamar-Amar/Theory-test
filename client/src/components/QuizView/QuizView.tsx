import type { QuizQuestion } from "../../api";
import { formatElapsed } from "../../utils/formatElapsed";
import { QuestionImage } from "../QuestionImage/QuestionImage";
import { AnswerOption, AnswerList } from "../AnswerOption/AnswerOption";
import { NarrowOnly, WideOnly } from "../Responsive/Responsive";
import * as S from "./QuizView.styles";

type Props = {
  question: QuizQuestion;
  questionIndex: number;
  total: number;
  progressPercent: number;
  elapsedMs: number;
  category: string;
  selectedIndex: number | null;
  answers: number[];
  onSelectOption: (i: number) => void;
  onJump: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onFinish: () => void;
};

/** תקציב זמן משוער למבחן — 90 שניות לשאלה (לתצוגת "זמן שנותר") */
const SECONDS_PER_QUESTION = 90;

export function QuizView({
  question,
  questionIndex,
  total,
  elapsedMs,
  category,
  selectedIndex,
  answers,
  onSelectOption,
  onJump,
  onPrev,
  onNext,
  onFinish,
}: Props) {
  const isLast = questionIndex >= total - 1;
  const topic = category || "מעורב";

  const remainingMs = Math.max(0, total * SECONDS_PER_QUESTION * 1000 - elapsedMs);
  const remainingLabel = formatElapsed(remainingMs);

  const segKind = (i: number): S.SegKind =>
    i < questionIndex ? "done" : i === questionIndex ? "current" : "todo";

  const navState = (i: number): S.NavState =>
    i === questionIndex ? "current" : answers[i] >= 0 ? "answered" : "todo";

  const answersEl = (
    <S.Answers>
    <AnswerList role="radiogroup" aria-label="בחירת תשובה">
      {question.options.map((opt, i) => (
        <AnswerOption
          key={i}
          name={`q-${questionIndex}`}
          label={opt}
          index={i}
          selected={selectedIndex === i}
          onSelect={() => onSelectOption(i)}
        />
      ))}
    </AnswerList>
    </S.Answers>
  );

  return (
    <S.Grid>
      <S.Main>
        <S.Header>
          <S.TopicChip>{topic}</S.TopicChip>
          <S.Count>
            <WideOnly>
              {questionIndex + 1} / {total} · נותרו {remainingLabel}
            </WideOnly>
            <NarrowOnly>
              {questionIndex + 1}/{total} · {remainingLabel}
            </NarrowOnly>
          </S.Count>
        </S.Header>

        <S.Progress role="presentation">
          {Array.from({ length: Math.max(total, 1) }, (_, i) => (
            <S.Seg key={i} $kind={segKind(i)} />
          ))}
        </S.Progress>

        {question.imageUrl ? (
          <S.QARow>
            <S.QABlock>
              <S.QuestionTitle>{question.text}</S.QuestionTitle>
              {answersEl}
            </S.QABlock>
            <S.ImageCol>
              <QuestionImage src={question.imageUrl} />
            </S.ImageCol>
          </S.QARow>
        ) : (
          <>
            <S.QuestionTitle>{question.text}</S.QuestionTitle>
            {answersEl}
          </>
        )}

        <S.NavRow>
          {isLast ? (
            <S.NextButton
              type="button"
              disabled={answers.some((a) => a < 0)}
              onClick={onFinish}
            >
              סיום וציון
            </S.NextButton>
          ) : (
            <S.NextButton
              type="button"
              disabled={selectedIndex === null}
              onClick={onNext}
            >
              לשאלה הבאה
              <NarrowOnly> ←</NarrowOnly>
            </S.NextButton>
          )}
          <S.PrevButton
            type="button"
            disabled={questionIndex === 0}
            onClick={onPrev}
          >
            <WideOnly>← לשאלה הקודמת</WideOnly>
            <NarrowOnly>→ הקודמת</NarrowOnly>
          </S.PrevButton>
        </S.NavRow>
      </S.Main>

      <S.Sidebar>
        <S.TimerCard>
          <S.TimerLabel>זמן שנותר</S.TimerLabel>
          <S.TimerValue>{remainingLabel}</S.TimerValue>
        </S.TimerCard>

        <S.NavCard>
          <S.NavTitle>ניווט בין שאלות</S.NavTitle>
          <S.NavGrid>
            {Array.from({ length: total }, (_, i) => (
              <S.NavButton
                key={i}
                type="button"
                $state={navState(i)}
                aria-label={`שאלה ${i + 1}`}
                aria-current={i === questionIndex ? "true" : undefined}
                onClick={() => onJump(i)}
              >
                {i + 1}
              </S.NavButton>
            ))}
          </S.NavGrid>
        </S.NavCard>
      </S.Sidebar>
    </S.Grid>
  );
}
