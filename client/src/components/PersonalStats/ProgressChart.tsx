import type { UserStats } from "../../api";
import * as S from "./ProgressChartStyles";

type AttemptRow = UserStats["recentAttempts"][number];

type Props = {
  /** כיסוי שקוף + תג «טוען» - הכרטיס נשאר בגובה קבוע */
  loading?: boolean;
  recentAttempts: AttemptRow[];
  totalCorrect: number;
  totalAnswered: number;
};

function DonutRing({ percent }: { percent: number | null }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  const p =
    percent == null ? 0 : Math.min(100, Math.max(0, percent));
  const dash = (p / 100) * c;
  const gap = c - dash;

  return (
    <S.DonutSvg viewBox="0 0 120 120" aria-hidden>
      <circle cx="60" cy="60" r={r} fill="none" className="track" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        className="fill"
        strokeDasharray={`${dash} ${gap}`}
        transform="rotate(-90 60 60)"
      />
    </S.DonutSvg>
  );
}

export function ProgressChart({
  loading = false,
  recentAttempts,
  totalCorrect,
  totalAnswered,
}: Props) {
  const overallPct =
    totalAnswered > 0
      ? Math.round((100 * totalCorrect) / totalAnswered)
      : null;

  const chronological = [...recentAttempts].sort(
    (a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );
  const bars = chronological.slice(-15);
  const narrowBars = bars.length > 10;

  return (
    <S.ChartCard dir="rtl">
      {loading ? (
        <S.ChartLoadingOverlay aria-live="polite">
          <S.ChartLoadingBadge>טוען נתונים…</S.ChartLoadingBadge>
        </S.ChartLoadingOverlay>
      ) : null}

      <S.ChartTitle>מבט על התקדמות</S.ChartTitle>
      <S.ChartBody $split={loading || bars.length > 0}>
        <S.DonutBlock dir="ltr">
          <S.DonutWrap>
            <DonutRing percent={loading ? null : overallPct} />
            <S.DonutCenter dir="rtl">
              <S.DonutValue dir="ltr">
                {loading ? "…" : overallPct == null ? "-" : `${overallPct}%`}
              </S.DonutValue>
              <S.DonutCaption>דיוק כולל</S.DonutCaption>
              <S.DonutSub>
                {loading ? (
                  <S.DonutSubLine>מחשבים…</S.DonutSubLine>
                ) : totalAnswered > 0 ? (
                  <>
                    <S.DonutSubLine>{`${totalCorrect} נכונות`}</S.DonutSubLine>
                    <S.DonutSubLine>{`מתוך ${totalAnswered} תשובות`}</S.DonutSubLine>
                  </>
                ) : (
                  <S.DonutSubLine $wrap>עדיין אין נתונים</S.DonutSubLine>
                )}
              </S.DonutSub>
            </S.DonutCenter>
          </S.DonutWrap>
        </S.DonutBlock>

        <S.BarsBlock dir="ltr">
          {loading || bars.length > 0 ? (
            <S.BarsChartGroup>
              <S.BarsCaption>
                אחוזי הצלחה במבחנים (עד 15 האחרונים)
              </S.BarsCaption>
              {loading ? (
                <S.BarsCluster>
                  <S.BarsRow $count={6}>
                    {Array.from({ length: 6 }).map((_, i) => (
                      <S.SkeletonBarColumn key={i}>
                        <S.SkeletonBarTrack />
                        <S.SkeletonBarCap />
                      </S.SkeletonBarColumn>
                    ))}
                  </S.BarsRow>
                </S.BarsCluster>
              ) : (
                <S.BarsCluster>
                  <S.BarsRow $count={bars.length}>
                    {bars.map((a, i) => (
                      <S.BarColumn key={a.id} $narrow={narrowBars}>
                        <S.BarTrack>
                          <S.BarFill $heightPct={a.percent} />
                        </S.BarTrack>
                        <S.BarPercentLabel>{a.percent}%</S.BarPercentLabel>
                        <S.BarIndex>מבחן {i + 1}</S.BarIndex>
                      </S.BarColumn>
                    ))}
                  </S.BarsRow>
                </S.BarsCluster>
              )}
            </S.BarsChartGroup>
          ) : (
            <S.BarsEmptyState>
              <S.BarsEmptyTitle>עדיין אין מבחנים בגרף</S.BarsEmptyTitle>
              <S.BarsEmptyHint>
                אחרי שתשלימו מבחן בלשונית «תרגול», העמודות יראו את אחוז
                ההצלחה בכל ניסיון - עד 15 האחרונים.
              </S.BarsEmptyHint>
            </S.BarsEmptyState>
          )}
        </S.BarsBlock>
      </S.ChartBody>
    </S.ChartCard>
  );
}
