import { useMemo } from "react";
import type { QuizQuestion, SubmitResponse } from "../../api";
import { buildQuestionReviews } from "../../utils/buildQuestionReviews";
import { QuestionReviewList } from "../QuestionReviewList/QuestionReviewList";
import { ResultsHint } from "../ResultsHint/ResultsHint";
import { ScoreDisplay } from "../ScoreDisplay/ScoreDisplay";
import { StatCard } from "../StatCard/StatCard";
import * as RS from "./ResultsView.styles";

type Props = {
  result: SubmitResponse;
  questions: QuizQuestion[];
  elapsedMs: number;
  /** מבחן נוסף - לשונית תרגול */
  onAgain: () => void;
  /** עמוד ראשי עם לשוניות תרגול / אזור אישי */
  onGoHome: () => void;
};

/** מספר הטעויות המותר במבחן התאוריה — עד 4 (נדרשות total-4 תשובות נכונות) */
const ALLOWED_MISTAKES = 4;

export function ResultsView({
  result,
  questions,
  elapsedMs,
  onAgain,
  onGoHome,
}: Props) {
  const reviews = useMemo(
    () => buildQuestionReviews(questions, result.breakdown),
    [questions, result.breakdown]
  );

  const required = Math.max(1, result.total - ALLOWED_MISTAKES);
  const passed = result.score >= required;
  const toStrengthen = Math.max(0, result.total - result.score);
  const avgSec =
    result.total > 0 ? Math.round(elapsedMs / 1000 / result.total) : 0;

  return (
    <RS.Wrap>
      <RS.TopRow>
        <ScoreDisplay
          percent={result.percent}
          score={result.score}
          total={result.total}
          required={required}
          passed={passed}
        />
        <RS.Stats>
          <StatCard
            value={
              <>
                {avgSec}
                <RS.StatUnit> שנ׳</RS.StatUnit>
              </>
            }
            label="ממוצע לשאלה"
          />
          <StatCard value={toStrengthen} label="שאלות לחיזוק" />
        </RS.Stats>
      </RS.TopRow>

      <ResultsHint />

      <RS.ReviewCard>
        <RS.ReviewTitle>סקירת שאלות</RS.ReviewTitle>
        <RS.ReviewIntro>
          פתחו כל שאלה בשורה כדי לראות את הניסוח, מה בחרתם ומה התשובה הנכונה.
        </RS.ReviewIntro>
        <QuestionReviewList items={reviews} />
      </RS.ReviewCard>

      <RS.ResultsActions>
        <RS.AgainButton type="button" onClick={onAgain}>
          מבחן נוסף
        </RS.AgainButton>
        <RS.HomeButton type="button" onClick={onGoHome}>
          חזרה לעמוד הראשי
        </RS.HomeButton>
      </RS.ResultsActions>
    </RS.Wrap>
  );
}
