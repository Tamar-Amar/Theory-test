import { useTheme } from "styled-components";
import type { UserStats } from "../../api";
import * as S from "./ProgressChartStyles";

type AttemptRow = UserStats["recentAttempts"][number];

type Props = {
  loading?: boolean;
  recentAttempts: AttemptRow[];
  /** נשמרים לתאימות — אינם בשימוש בגרף הקו */
  totalCorrect?: number;
  totalAnswered?: number;
};

const W = 800;
const H = 260;
const PAD_L = 28;
const PAD_R = 28;
const PAD_T = 54;
const PAD_B = 28;
const INNER_W = W - PAD_L - PAD_R;
const INNER_H = H - PAD_T - PAD_B;
const PASS = 90;

export function ProgressChart({ recentAttempts }: Props) {
  const theme = useTheme();

  // סדר כרונולוגי — הישן ביותר משמאל, החדש ביותר מימין בגרף
  const points = [...recentAttempts]
    .sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
    .map((a) => Math.min(100, Math.max(0, a.percent)));

  const n = points.length;
  const yFor = (pct: number) => PAD_T + (1 - pct / 100) * INNER_H;
  const xFor = (i: number) =>
    n > 1 ? PAD_L + (i * INNER_W) / (n - 1) : W / 2;
  const passY = yFor(PASS);

  const coords = points.map((p, i) => ({ x: xFor(i), y: yFor(p) }));
  const linePath = coords.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <S.Card>
      <S.Header>
        <S.Title>התקדמות לאורך זמן</S.Title>
        <S.PassLabel>- - קו מעבר {PASS}%</S.PassLabel>
      </S.Header>

      {n === 0 ? (
        <S.Empty>עדיין אין מספיק נתונים להצגת התקדמות.</S.Empty>
      ) : (
        <S.Svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label="התקדמות לאורך זמן">
          {/* קו מעבר 90% — מקווקו */}
          <line
            x1={PAD_L}
            y1={passY}
            x2={W - PAD_R}
            y2={passY}
            stroke={theme.colors.successSolid}
            strokeWidth={2}
            strokeDasharray="8 7"
          />
          {/* קו ההתקדמות */}
          {n > 1 ? (
            <polyline
              points={linePath}
              fill="none"
              stroke={theme.colors.blue}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ) : null}
          {/* נקודות */}
          {coords.map((c, i) => (
            <circle
              key={i}
              cx={c.x}
              cy={c.y}
              r={6}
              fill={theme.colors.surface}
              stroke={theme.colors.blue}
              strokeWidth={2.5}
            />
          ))}
        </S.Svg>
      )}
    </S.Card>
  );
}
