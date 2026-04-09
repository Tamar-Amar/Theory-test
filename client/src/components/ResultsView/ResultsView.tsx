import { useMemo } from "react";
import type { QuizQuestion, SubmitResponse } from "../../api";
import { buildQuestionReviews } from "../../utils/buildQuestionReviews";
import { formatElapsed } from "../../utils/formatElapsed";
import { Card } from "../Card/Card";
import { QuestionReviewList } from "../QuestionReviewList/QuestionReviewList";
import { GhostButton, ResultsPrimaryButton } from "../Button/Button";
import { ResultsHint } from "../ResultsHint/ResultsHint";
import { ScoreDisplay } from "../ScoreDisplay/ScoreDisplay";
import * as RS from "./ResultsView.styles";

type Props = {
  result: SubmitResponse;
  questions: QuizQuestion[];
  elapsedMs: number;
  /** מבחן נוסף — לשונית תרגול */
  onAgain: () => void;
  /** עמוד ראשי עם לשוניות תרגול / אזור אישי */
  onGoHome: () => void;
};

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

  return (
    <Card>
      <ScoreDisplay
        percent={result.percent}
        score={result.score}
        total={result.total}
        timeLabel={formatElapsed(elapsedMs)}
      />
      <ResultsHint />
      <RS.ReviewIntro>
        פתחו כל שאלה בשורה כדי לראות את הניסוח, מה בחרתם ומה התשובה הנכונה.
      </RS.ReviewIntro>
      <QuestionReviewList items={reviews} />
      <RS.ResultsActions>
        <ResultsPrimaryButton
          type="button"
          style={{ marginTop: 0 }}
          onClick={onAgain}
        >
          מבחן נוסף
        </ResultsPrimaryButton>
        <GhostButton type="button" style={{ marginTop: 0 }} onClick={onGoHome}>
          חזרה לעמוד הראשי
        </GhostButton>
      </RS.ResultsActions>
    </Card>
  );
}
