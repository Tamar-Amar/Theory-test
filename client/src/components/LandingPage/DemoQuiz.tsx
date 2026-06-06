import { useEffect, useRef, useState } from "react";
import { recordDemoFinish } from "../../api";
import { formatQuestionText } from "../../utils/formatQuestionText";
import { QuestionImage } from "../QuestionImage/QuestionImage";
import { DEMO_QUESTIONS } from "./demoQuestions";
import * as S from "./LandingPage.styles";

type Props = {
  onClose: () => void;
};

type OptState = "idle" | "correct" | "wrong" | "missed";

export function DemoQuiz({ onClose }: Props) {
  const total = DEMO_QUESTIONS.length;
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const prevFocused = document.activeElement as HTMLElement | null;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      prevFocused?.focus?.();
    };
  }, [onClose]);

  // מלכודת פוקוס: שומרת את הטאב בתוך הדיאלוג (נגישות)
  useEffect(() => {
    const node = modalRef.current;
    if (!node) return;
    const getFocusable = () =>
      Array.from(
        node.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
        )
      );
    getFocusable()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    node.addEventListener("keydown", onKey);
    return () => node.removeEventListener("keydown", onKey);
  }, [finished, index]);

  const q = DEMO_QUESTIONS[index];
  const answered = picked !== null;
  const isLast = index >= total - 1;

  const pick = (i: number) => {
    if (answered) return;
    setPicked(i);
    if (i === q.correctIndex) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      setFinished(true);
      void recordDemoFinish();
      return;
    }
    setIndex((n) => n + 1);
    setPicked(null);
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setScore(0);
    setFinished(false);
  };

  const optState = (i: number): OptState => {
    if (!answered) return "idle";
    if (i === q.correctIndex) return picked === i ? "correct" : "missed";
    if (i === picked) return "wrong";
    return "idle";
  };

  return (
    <S.Overlay
      role="dialog"
      aria-modal="true"
      aria-label="מבחן ניסיון"
      onClick={onClose}
    >
      <S.Modal ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <S.ModalClose type="button" aria-label="סגירה" onClick={onClose}>
          ✕
        </S.ModalClose>

        {finished ? (
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
              <S.CtaPrimary to="/login">
                הרשמה חינם והמשך לתרגול המלא
              </S.CtaPrimary>
              <S.ResultRetry type="button" onClick={restart}>
                נסו שוב
              </S.ResultRetry>
            </S.ResultActions>
          </S.ResultWrap>
        ) : (
          <>
            <S.QuestionCount>
              שאלה {index + 1} מתוך {total}
            </S.QuestionCount>
            <S.DemoQuestionText>{formatQuestionText(q.text)}</S.DemoQuestionText>
            {q.imageUrl ? <QuestionImage src={q.imageUrl} /> : null}

            <S.DemoOptions>
              {q.options.map((opt, i) => {
                const state = optState(i);
                const mark =
                  state === "correct" || state === "missed"
                    ? "✓"
                    : state === "wrong"
                      ? "✗"
                      : "";
                return (
                  <S.DemoOption
                    key={i}
                    type="button"
                    $state={state}
                    disabled={answered}
                    onClick={() => pick(i)}
                  >
                    <S.OptMark $state={state} aria-hidden>
                      {mark}
                    </S.OptMark>
                    {opt}
                  </S.DemoOption>
                );
              })}
            </S.DemoOptions>

            <S.ModalActions>
              <S.NextButton type="button" disabled={!answered} onClick={next}>
                {isLast ? "סיום וציון" : "לשאלה הבאה"}
              </S.NextButton>
            </S.ModalActions>
          </>
        )}
      </S.Modal>
    </S.Overlay>
  );
}
