import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserStats, type Meta, type UserStats } from "../../api";
import { LEARNING_TOPICS, resolveQuizCategory } from "./topicContent";
import * as S from "./TopicsPanel.styles";

type Props = { meta: Meta | null };

/** תיאור קצר לכל נושא (לפי העיצוב ב‑Figma) */
const BRIEF: Record<string, string> = {
  legal: "רישיונות, ביטוח ועבירות",
  risk: "עייפות, הסחות דעת וזמן תגובה",
  vehicle: "מערכות בלימה, צמיגים ותאורה",
  signs: "תמרורי אזהרה, הוראה ומודיעין",
  "traffic-rules": "רמזור, זכות קדימה, עקיפה ומהירות",
};

const HIGH_THRESHOLD = 80;

export function TopicsPanel({ meta }: Props) {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchUserStats()
      .then((s) => {
        if (!cancelled) setStats(s);
      })
      .catch(() => {
        /* ללא נתונים — המדדים יוצגו כ‑0% */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const topicPercent = (quizCategories: string[]) => {
    const cats = new Set(quizCategories);
    const rows = (stats?.recentAttempts ?? []).filter((a) =>
      cats.has(a.category)
    );
    if (!rows.length) return 0;
    return Math.round(rows.reduce((s, a) => s + a.percent, 0) / rows.length);
  };

  const goLearn = (quizCategories: string[]) => {
    const cat = resolveQuizCategory(meta, quizCategories);
    navigate(
      cat ? `/practice?category=${encodeURIComponent(cat)}` : "/practice"
    );
  };

  return (
    <S.Root>
      <S.PageHeader>
        <S.PageTitle>אזור למידה משחקי</S.PageTitle>
        <S.Subtitle>
          לומדים את התשובה הנכונה לפני המשחק, ואז בודקים אם הפנמתם.
        </S.Subtitle>
      </S.PageHeader>

      <S.TopicGrid>
        {LEARNING_TOPICS.map((topic) => {
          const pct = topicPercent(topic.quizCategories);
          const high = pct >= HIGH_THRESHOLD;
          return (
            <S.Card key={topic.id}>
              <S.CardHead>
                <S.Title>{topic.title}</S.Title>
                <S.Percent $high={high}>{pct}%</S.Percent>
              </S.CardHead>

              <S.Bar>
                <S.Fill $pct={pct} $high={high} />
              </S.Bar>

              <S.Brief>{BRIEF[topic.id] ?? topic.subtitle}</S.Brief>

              <S.Buttons>
                <S.LearnBtn
                  type="button"
                  onClick={() => goLearn(topic.quizCategories)}
                >
                  למידה
                </S.LearnBtn>
                <S.GameBtn type="button" onClick={() => navigate("/practice/game")}>
                  למשחק זיכרון
                </S.GameBtn>
              </S.Buttons>
            </S.Card>
          );
        })}
      </S.TopicGrid>
    </S.Root>
  );
}
