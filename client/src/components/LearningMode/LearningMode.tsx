import { useEffect, useMemo, useState } from "react";
import type { LearningQuestion } from "../../api";
import { formatQuestionText } from "../../utils/formatQuestionText";
import { PrimaryButton, SecondaryButton } from "../Button/Button";
import { Card } from "../Card/Card";
import { QuestionImage } from "../QuestionImage/QuestionImage";
import * as S from "./LearningMode.styles";

type Props = {
  questions: LearningQuestion[];
  onExit: () => void;
};

type Stage = "learn" | "memory" | "test" | "done";

type MemoryCard = {
  id: string;
  pairKey: string;
  kind: "option";
  text: string;
};

function shuffle<T>(items: T[]): T[] {
  const next = [...items];
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

function buildMemoryDeck(question: LearningQuestion): MemoryCard[] {
  const set = question.options.slice(0, 4);
  const cards: MemoryCard[] = [];
  for (let i = 0; i < set.length; i += 1) {
    const optionText = set[i];
    const pairKey = `${i}`;
    cards.push({
      id: `a-${pairKey}-1`,
      pairKey,
      kind: "option",
      text: optionText,
    });
    cards.push({
      id: `a-${pairKey}-2`,
      pairKey,
      kind: "option",
      text: optionText,
    });
  }
  return shuffle(cards);
}

const stageLabel: Record<Exclude<Stage, "done">, string> = {
  learn: "למידה",
  memory: "משחק זיכרון",
  test: "בחינה",
};

export function LearningMode({ questions, onExit }: Props) {
  const [stage, setStage] = useState<Stage>("learn");
  const [current, setCurrent] = useState(0);
  const [deck, setDeck] = useState<MemoryCard[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [memoryLocked, setMemoryLocked] = useState(false);
  const [pickedTestIndex, setPickedTestIndex] = useState<number | null>(null);
  const [testCorrectCount, setTestCorrectCount] = useState(0);

  const question = questions[current];
  const done = stage === "done" || !question;
  const memoryDone = deck.length > 0 && matched.length === deck.length;
  const testAnswered = pickedTestIndex != null;
  const isLast = current === questions.length - 1;
  const progressPct =
    questions.length > 0 ? Math.round((100 * (current + 1)) / questions.length) : 0;

  useEffect(() => {
    if (!question || stage !== "memory") return;
    setDeck(buildMemoryDeck(question));
    setFlipped([]);
    setMatched([]);
    setMemoryLocked(false);
  }, [question, stage]);

  useEffect(() => {
    if (flipped.length !== 2) return;
    const [a, b] = flipped;
    if (!deck[a] || !deck[b]) return;
    if (deck[a].pairKey === deck[b].pairKey) {
      setMatched((prev) => [...prev, a, b]);
      setFlipped([]);
      return;
    }
    setMemoryLocked(true);
    const timer = window.setTimeout(() => {
      setFlipped([]);
      setMemoryLocked(false);
    }, 1100);
    return () => window.clearTimeout(timer);
  }, [deck, flipped]);

  const headerHint = useMemo(() => {
    if (done) return "סיכום הסשן";
    if (stage === "learn") return "לומדים את התשובה הנכונה לפני המשחק";
    if (stage === "memory")
      return "משחק זיכרון על האפשרויות של השאלה הזו בלבד";
    return "עכשיו בודקים אם הפנמתם";
  }, [done, stage]);

  const onFlip = (index: number) => {
    if (memoryLocked) return;
    if (flipped.includes(index) || matched.includes(index)) return;
    setFlipped((prev) => (prev.length < 2 ? [...prev, index] : prev));
  };

  const goNextQuestion = () => {
    if (!question) return;
    if (!testAnswered) return;
    if (pickedTestIndex === question.correctIndex) {
      setTestCorrectCount((c) => c + 1);
    }
    if (isLast) {
      setStage("done");
      return;
    }
    setCurrent((c) => c + 1);
    setStage("learn");
    setPickedTestIndex(null);
  };

  if (!questions.length) {
    return (
      <Card>
        <S.ResultBox>
          <S.ResultTitle>אין כרגע שאלות ללמידה</S.ResultTitle>
          <S.ResultLine>נסו לבחור נושא אחר או כמות קטנה יותר.</S.ResultLine>
          <S.Row>
            <PrimaryButton type="button" onClick={onExit}>
              חזרה לתרגול
            </PrimaryButton>
          </S.Row>
        </S.ResultBox>
      </Card>
    );
  }

  return (
    <S.Shell>
      <S.Header>
        <S.HeaderTop>
          <span>
            שאלה {Math.min(current + 1, questions.length)} מתוך {questions.length}
          </span>
          {!done && <S.StageTag>{stageLabel[stage as Exclude<Stage, "done">]}</S.StageTag>}
        </S.HeaderTop>
        <S.HeaderTitle>אזור למידה משחקי</S.HeaderTitle>
        <S.HeaderHint>{headerHint}</S.HeaderHint>
        {!done && (
          <S.ProgressBar>
            <S.ProgressFill $pct={progressPct} />
          </S.ProgressBar>
        )}
      </S.Header>

      {!done && question && (
        <Card>
          <S.QuestionText>{formatQuestionText(question.text)}</S.QuestionText>
          {question.imageUrl ? <QuestionImage src={question.imageUrl} /> : null}

          {stage === "learn" && (
            <>
              <S.LearnOptionList>
                {question.options.map((option, i) => (
                  <S.LearnOption
                    key={`${option}-${i}`}
                    $kind={i === question.correctIndex ? "correct" : "wrong"}
                  >
                    {option}
                  </S.LearnOption>
                ))}
              </S.LearnOptionList>
              <S.LearnExplain>
                שימו לב: התשובה הנכונה מסומנת בצבע. זוכרים אותה ועוברים למשחק זיכרון.
              </S.LearnExplain>
              <S.Row>
                <PrimaryButton type="button" onClick={() => setStage("memory")}>
                  למשחק זיכרון
                </PrimaryButton>
              </S.Row>
            </>
          )}

          {stage === "memory" && (
            <>
              <S.MemoryGrid>
                {deck.map((card, i) => {
                  const open = flipped.includes(i) || matched.includes(i);
                  return (
                    <S.MemoryCard
                      key={card.id}
                      type="button"
                      $open={open}
                      $matched={matched.includes(i)}
                      disabled={matched.includes(i) || memoryLocked}
                      onClick={() => onFlip(i)}
                    >
                      {open ? card.text : "?"}
                    </S.MemoryCard>
                  );
                })}
              </S.MemoryGrid>
              <S.LearnExplain>
                כל הקלפים כאן שייכים לשאלה שמופיעה למעלה, בלי שאלות אחרות.
              </S.LearnExplain>
              <S.Row>
                <SecondaryButton type="button" onClick={() => setStage("learn")}>
                  חזרה ללמידה
                </SecondaryButton>
                <PrimaryButton
                  type="button"
                  disabled={!memoryDone}
                  onClick={() => setStage("test")}
                >
                  לבחינה
                </PrimaryButton>
              </S.Row>
            </>
          )}

          {stage === "test" && (
            <>
              <S.TestOptions>
                {question.options.map((option, i) => {
                  const selected = pickedTestIndex === i;
                  const correct = testAnswered && i === question.correctIndex;
                  const wrong = testAnswered && selected && i !== question.correctIndex;
                  return (
                    <S.TestOptionButton
                      key={`${option}-${i}`}
                      type="button"
                      $selected={selected}
                      $correct={correct}
                      $wrong={wrong}
                      disabled={testAnswered}
                      onClick={() => setPickedTestIndex(i)}
                    >
                      {option}
                    </S.TestOptionButton>
                  );
                })}
              </S.TestOptions>
              <S.Row>
                <SecondaryButton type="button" onClick={() => setStage("memory")}>
                  עוד סבב זיכרון
                </SecondaryButton>
                <PrimaryButton
                  type="button"
                  disabled={!testAnswered}
                  onClick={goNextQuestion}
                >
                  {isLast ? "לסיכום" : "לשאלה הבאה"}
                </PrimaryButton>
              </S.Row>
            </>
          )}
        </Card>
      )}

      {done && (
        <Card>
          <S.ResultBox>
            <S.ResultTitle>סיימתם סשן למידה 🎉</S.ResultTitle>
            <S.ResultLine>
              הצלחתם נכון ב-{testCorrectCount} מתוך {questions.length} בשלב הבחינה.
            </S.ResultLine>
            <S.Row>
              <PrimaryButton type="button" onClick={onExit}>
                חזרה לתרגול
              </PrimaryButton>
            </S.Row>
          </S.ResultBox>
        </Card>
      )}
    </S.Shell>
  );
}

