import { useEffect, useMemo, useState } from "react";
import {
  createLearningSession,
  type LearningQuestion,
  type Meta,
} from "../../api";
import { LicenseRequiredNotice } from "../LicenseRequiredNotice/LicenseRequiredNotice";
import { formatQuestionText } from "../../utils/formatQuestionText";
import { Chip } from "../Chip/Chip";
import { LoadingState } from "../LoadingState/LoadingState";
import { StatCard } from "../StatCard/StatCard";
import * as S from "./LearningArea.styles";

type Props = {
  meta: Meta | null;
  loadingMeta: boolean;
  hasLicenseType: boolean;
};

type Mode = "setup" | "game" | "done";

type QuestionCard = {
  id: string;
  pairId: string;
  text: string;
  imageUrl?: string;
};

type AnswerCard = {
  id: string;
  pairId: string;
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

function shortText(text: string, max = 120): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

function toPairs(questions: LearningQuestion[]): {
  questions: QuestionCard[];
  answers: AnswerCard[];
} {
  const qs: QuestionCard[] = [];
  const as: AnswerCard[] = [];
  for (let i = 0; i < questions.length; i += 1) {
    const q = questions[i];
    const pairId = String(i);
    qs.push({
      id: `q-${pairId}`,
      pairId,
      text: shortText(formatQuestionText(q.text)),
      imageUrl: q.imageUrl,
    });
    as.push({
      id: `a-${pairId}`,
      pairId,
      text: q.options[q.correctIndex] ?? "-",
    });
  }
  return { questions: qs, answers: shuffle(as) };
}

export function MatchingGame({ meta, loadingMeta, hasLicenseType }: Props) {
  const [mode, setMode] = useState<Mode>("setup");
  const [category, setCategory] = useState("");
  const [loadingGame, setLoadingGame] = useState(false);
  const [questionsDeck, setQuestionsDeck] = useState<QuestionCard[]>([]);
  const [answersDeck, setAnswersDeck] = useState<AnswerCard[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<string[]>([]);
  const [dragQuestionId, setDragQuestionId] = useState<string | null>(null);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(null);
  const [dropOverAnswerId, setDropOverAnswerId] = useState<string | null>(null);
  const [wrongPairPing, setWrongPairPing] = useState(false);
  const [moves, setMoves] = useState(0);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (loadingMeta) return;
    if (!meta?.categories?.length) return;
    setCategory((prev) => (prev ? prev : meta.categories[0]));
  }, [loadingMeta, meta]);

  const foundPairs = useMemo(() => matchedPairIds.length, [matchedPairIds.length]);
  const allDone = questionsDeck.length > 0 && foundPairs === questionsDeck.length;
  const hasImages = useMemo(
    () => questionsDeck.some((q) => Boolean(q.imageUrl)),
    [questionsDeck]
  );

  useEffect(() => {
    if (allDone) {
      setMode("done");
    }
  }, [allDone]);

  const startGame = async () => {
    if (!hasLicenseType) {
      setErr("יש לבחור סוג רישיון באזור האישי לפני תחילת תרגול.");
      return;
    }
    if (!category) {
      setErr("בחרו קטגוריה לפני התחלת המשחק");
      return;
    }
    setErr(null);
    setLoadingGame(true);
    try {
      const data = await createLearningSession(5, category);
      const pairs = toPairs(data.questions.slice(0, 5));
      setQuestionsDeck(pairs.questions);
      setAnswersDeck(pairs.answers);
      setMatchedPairIds([]);
      setDragQuestionId(null);
      setSelectedQuestionId(null);
      setDropOverAnswerId(null);
      setMoves(0);
      setWrongPairPing(false);
      setMode("game");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "לא ניתן להפעיל משחק זיכרון");
    } finally {
      setLoadingGame(false);
    }
  };

  const resetToSetup = () => {
    setMode("setup");
    setQuestionsDeck([]);
    setAnswersDeck([]);
    setMatchedPairIds([]);
    setDragQuestionId(null);
    setSelectedQuestionId(null);
    setDropOverAnswerId(null);
    setMoves(0);
    setWrongPairPing(false);
  };

  const tryMatch = (questionId: string, answerId: string) => {
    if (mode !== "game") return;
    const q = questionsDeck.find((x) => x.id === questionId);
    const a = answersDeck.find((x) => x.id === answerId);
    if (!q || !a) return;
    if (matchedPairIds.includes(q.pairId) || matchedPairIds.includes(a.pairId)) return;
    setMoves((m) => m + 1);
    if (q.pairId === a.pairId) {
      setMatchedPairIds((prev) => [...prev, q.pairId]);
      setErr(null);
      return;
    }
    setWrongPairPing(true);
    setErr("זה לא זוג תואם, נסו שוב");
    window.setTimeout(() => setWrongPairPing(false), 380);
  };

  const onClickQuestion = (questionId: string) => {
    if (mode !== "game") return;
    const q = questionsDeck.find((x) => x.id === questionId);
    if (!q || matchedPairIds.includes(q.pairId)) return;
    setSelectedQuestionId(questionId);
    setErr(null);
  };

  const onClickAnswer = (answerId: string) => {
    if (!selectedQuestionId) return;
    tryMatch(selectedQuestionId, answerId);
    setSelectedQuestionId(null);
  };

  const onDropToAnswer = (answerId: string) => {
    if (!dragQuestionId) return;
    tryMatch(dragQuestionId, answerId);
    setDragQuestionId(null);
    setDropOverAnswerId(null);
  };

  return (
    <>
      {mode === "setup" && !hasLicenseType && (
        <LicenseRequiredNotice />
      )}

      {mode === "setup" && hasLicenseType && (
        <S.SetupCard>
          {loadingMeta ? (
            <LoadingState label="טוען קטגוריות…" />
          ) : (
            <>
              <S.SetupTitle>קטגוריית לימוד</S.SetupTitle>
              <S.Intro>
                בחרו קטגוריה והמערכת תיצור משחק התאמות עם 5 שאלות ו-5 תשובות נכונות.
                אפשר לגרור שאלה לתשובה או לבחור בלחיצה.
              </S.Intro>
              <S.ChipGrid>
                {(meta?.categories || []).map((c) => (
                  <Chip
                    key={c}
                    active={category === c}
                    onClick={() => setCategory(c)}
                  >
                    {c}
                  </Chip>
                ))}
              </S.ChipGrid>
              {err ? <S.WrongHint>{err}</S.WrongHint> : null}
              <S.Actions>
                <S.PrimaryBtn
                  type="button"
                  onClick={startGame}
                  disabled={loadingGame || !(meta?.categories?.length ?? 0)}
                >
                  {loadingGame ? "מכינים משחק…" : "התחילו משחק התאמות"}
                </S.PrimaryBtn>
              </S.Actions>
            </>
          )}
        </S.SetupCard>
      )}

      {(mode === "game" || mode === "done") && (
        <>
          <S.TopRow>
            <S.Heading>
              <S.Badge>משחק התאמות · {category}</S.Badge>
              <S.Note>
                התאמה נכונה: שאלה בצד ימין ותשובה נכונה בצד שמאל. אפשר לגרור שאלה
                לתשובה או לבחור בלחיצה.
              </S.Note>
            </S.Heading>
            <S.Stats>
              <StatCard
                value={
                  <S.LtrNum>
                    {foundPairs} / {questionsDeck.length}
                  </S.LtrNum>
                }
                label="זוגות שנמצאו"
              />
              <StatCard value={moves} label="מהלכים" />
            </S.Stats>
          </S.TopRow>

          <S.MatchBoard>
            <S.Column>
              <S.ColumnTitle>שאלות</S.ColumnTitle>
              <S.List>
                {questionsDeck.map((q) => {
                  const donePair = matchedPairIds.includes(q.pairId);
                  return (
                    <S.MatchCard
                      key={q.id}
                      type="button"
                      draggable={mode === "game" && !donePair}
                      $matched={donePair}
                      $selected={selectedQuestionId === q.id}
                      $hasImages={hasImages}
                      disabled={mode === "done" || donePair}
                      onDragStart={() => setDragQuestionId(q.id)}
                      onDragEnd={() => {
                        setDragQuestionId(null);
                        setDropOverAnswerId(null);
                      }}
                      onClick={() => onClickQuestion(q.id)}
                    >
                      <S.CardText $clamp={q.imageUrl ? 2 : 3}>
                        {q.text}
                      </S.CardText>
                      {q.imageUrl ? (
                        <S.CardImage
                          src={q.imageUrl}
                          alt="תמונת שאלה"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : null}
                    </S.MatchCard>
                  );
                })}
              </S.List>
            </S.Column>

            <S.Column>
              <S.ColumnTitle>תשובות</S.ColumnTitle>
              <S.List>
                {answersDeck.map((a) => {
                  const donePair = matchedPairIds.includes(a.pairId);
                  return (
                    <S.MatchCard
                      key={a.id}
                      type="button"
                      $matched={donePair}
                      $dropOver={dropOverAnswerId === a.id}
                      $hasImages={hasImages}
                      disabled={mode === "done" || donePair}
                      onClick={() => onClickAnswer(a.id)}
                      onDragOver={(e) => {
                        if (mode !== "game" || donePair) return;
                        e.preventDefault();
                        setDropOverAnswerId(a.id);
                      }}
                      onDragLeave={() => {
                        if (dropOverAnswerId === a.id) setDropOverAnswerId(null);
                      }}
                      onDrop={(e) => {
                        e.preventDefault();
                        onDropToAnswer(a.id);
                      }}
                    >
                      <S.CardText>{a.text}</S.CardText>
                    </S.MatchCard>
                  );
                })}
              </S.List>
            </S.Column>
          </S.MatchBoard>

          {wrongPairPing ? (
            <S.WrongHint>לא תואם, נסו התאמה אחרת</S.WrongHint>
          ) : null}

          {mode === "done" && (
            <S.ResultBox>
              <S.ResultTitle>
                כל הכבוד! השלמתם את כל {questionsDeck.length} הזוגות 🎉
              </S.ResultTitle>
              <S.ResultText>סיימתם ב־{moves} מהלכים.</S.ResultText>
            </S.ResultBox>
          )}

          <S.Actions>
            <S.SecondaryBtn
              type="button"
              onClick={startGame}
              disabled={loadingGame}
            >
              {loadingGame ? "מכינים משחק…" : "עוד משחק באותה קטגוריה"}
            </S.SecondaryBtn>
            <S.GhostBtn type="button" onClick={resetToSetup}>
              בחירת קטגוריה אחרת
            </S.GhostBtn>
          </S.Actions>
        </>
      )}
    </>
  );
}
