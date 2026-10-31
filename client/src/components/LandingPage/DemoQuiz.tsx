import { useMemo, useState } from "react";
import { recordDemoFinish } from "../../api";
import { formatQuestionText } from "../../utils/formatQuestionText";
import { QuestionImage } from "../QuestionImage/QuestionImage";
import { DEMO_QUESTIONS } from "./demoQuestions";
import * as S from "./LandingPage.styles";

type OptState = "idle" | "correct" | "wrong" | "missed";

/** אותיות התשובות (א׳, ב׳, ג׳ ...) לפי מיקום */
const OPTION_LETTERS = ["א", "ב", "ג", "ד", "ה", "ו"];

const SEGMENTS = 30;

/** מבחן ניסיון אינטראקטיבי המוטמע בדף הנחיתה (Desktop / דף נחיתה, מקטע מבחן ניסיון) */
export function DemoQuiz() {
  const total = DEMO_QUESTIONS.length;
  const [index, setIndex] = useState(0);
  const [picks, setPicks] = useState<(number | null)[]>(() =>
    Array(total).fill(null),
  );
  const [finished, setFinished] = useState(false);

  const q = DEMO_QUESTIONS[index];
  const pickedThis = picks[index];
  const answered = pickedThis !== null;
  const isLast = index >= total - 1;

  const score = useMemo(
    () =>
      picks.reduce<number>(
        (n, p, i) => (p === DEMO_QUESTIONS[i].correctIndex ? n + 1 : n),
        0,
      ),
    [picks],
  );

  const pick = (i: number) => {
    if (answered) return;
    setPicks((prev) => {
      const next = [...prev];
      next[index] = i;
      return next;
    });
  };

  const goNext = () => {
    if (isLast) {
      setFinished(true);
      void recordDemoFinish();
      return;
    }
    setIndex((n) => n + 1);
  };

  const goPrev = () => setIndex((n) => Math.max(0, n - 1));

  const restart = () => {
    setIndex(0);
    setPicks(Array(total).fill(null));
    setFinished(false);
  };

  const optState = (i: number): OptState => {
    if (!answered) return "idle";
    if (i === q.correctIndex) return "correct";
    if (i === pickedThis) return "wrong";
    return "idle";
  };

  // מילוי פס ההתקדמות (30 מקטעים) לפי מיקום השאלה
  const progressValue = index + (answered ? 1 : 0);
  const filled = Math.max(1, Math.round((progressValue / total) * SEGMENTS));

  if (finished) {
    return (
      <S.QuizCard>
        <S.ResultWrap>
          <S.ResultScore>
            {score}/{total}
          </S.ResultScore>
          <S.ResultLabel>
            {score === total
              ? "מושלם! אתם מוכנים להמשיך לתרגול המלא."
              : score >= total / 2
                ? "התחלה טובה - תרגול נוסף יביא אתכם לציון מלא."
                : "יש מה לחזק - בדיוק בשביל זה התרגול הממוקד שלנו."}
          </S.ResultLabel>
          <S.ResultActions>
            <S.ResultPrimary to="/login">
              הרשמה חינם והמשך לתרגול המלא
            </S.ResultPrimary>
            <S.ResultRetry type="button" onClick={restart}>
              נסו שוב
            </S.ResultRetry>
          </S.ResultActions>
        </S.ResultWrap>
      </S.QuizCard>
    );
  }

  return (
    <S.QuizCard>
      <S.CardHeader>
        <S.QCount>
          שאלה {index + 1} מתוך {total}
        </S.QCount>
        <S.TopicChip>{q.category}</S.TopicChip>
      </S.CardHeader>

      <S.Progress role="presentation">
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <S.Seg
            key={i}
            $kind={i < filled - 1 ? "done" : i === filled - 1 ? "current" : "todo"}
          />
        ))}
      </S.Progress>

      <S.QuestionText>{formatQuestionText(q.text)}</S.QuestionText>

      {q.imageUrl ? <QuestionImage src={q.imageUrl} /> : null}

      <S.DemoOptions>
        {q.options.map((opt, i) => {
          const state = optState(i);
          const letter = OPTION_LETTERS[i] ?? String(i + 1);
          return (
            <S.DemoOption
              key={i}
              type="button"
              $state={state}
              disabled={answered}
              onClick={() => pick(i)}
            >
              <S.OptMark $state={state} aria-hidden>
                {letter}
              </S.OptMark>
              {opt}
            </S.DemoOption>
          );
        })}
      </S.DemoOptions>

      {answered ? (
        <S.Explain $correct={pickedThis === q.correctIndex}>
          <S.ExplainTitle $correct={pickedThis === q.correctIndex}>
            {pickedThis === q.correctIndex ? "תשובה נכונה" : "תשובה שגויה"}
          </S.ExplainTitle>
          <S.ExplainText>{q.explanation}</S.ExplainText>
        </S.Explain>
      ) : null}

      <S.CardNav>
        <S.DemoNext type="button" disabled={!answered} onClick={goNext}>
          {isLast ? "סיום וציון" : "לשאלה הבאה"}
        </S.DemoNext>
        <S.DemoPrev type="button" disabled={index === 0} onClick={goPrev}>
          → לשאלה הקודמת
        </S.DemoPrev>
      </S.CardNav>
    </S.QuizCard>
  );
}
