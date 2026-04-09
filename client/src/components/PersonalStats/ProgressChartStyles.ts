import styled, { keyframes } from "styled-components";

const skeletonPulse = keyframes`
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 0.85;
  }
`;

export const ChartCard = styled.section`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.35rem 1.35rem 1.5rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const ChartLoadingOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 3;
  border-radius: inherit;
  background: rgba(255, 255, 255, 0.86);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ChartLoadingBadge = styled.p`
  margin: 0;
  font-size: 0.92rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentDim};
  padding: 0.55rem 1.1rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.accentGlow};
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const ChartTitle = styled.h2`
  margin: 0 0 1.15rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const ChartBody = styled.div<{ $split: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  align-items: stretch;
  min-height: 0;

  @media (min-width: 720px) {
    ${({ $split }) =>
      $split
        ? `
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 0.75rem 1.25rem;
      min-height: 176px;
    `
        : `
      gap: 1.25rem;
      min-height: 0;
    `}
  }
`;

export const DonutBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 0;
`;

export const DonutWrap = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
`;

export const DonutSvg = styled.svg`
  width: 100%;
  height: 100%;

  .track {
    stroke: ${({ theme }) => theme.colors.surface2};
    stroke-width: 12;
  }

  .fill {
    stroke: ${({ theme }) => theme.colors.accent};
    stroke-width: 12;
    stroke-linecap: round;
  }
`;

export const DonutCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 0.5rem;
  pointer-events: none;
`;

export const DonutValue = styled.span`
  font-size: 1.08rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
`;

export const DonutCaption = styled.span`
  font-size: 0.62rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 0.1rem;
`;

/** טקסט משני מתחת לדונאט — עמודה כדי למנוע שבירה מוזרה בתוך עיגול צר */
export const DonutSub = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.06rem;
  margin-top: 0.2rem;
  font-size: 0.65rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.2;
  text-align: center;
  max-width: 6.75rem;
`;

export const DonutSubLine = styled.span<{ $wrap?: boolean }>`
  display: block;
  white-space: ${({ $wrap }) => ($wrap ? "normal" : "nowrap")};
  font-variant-numeric: tabular-nums;
`;

export const BarsBlock = styled.div`
  min-width: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/** כיתוב + עמודות — ממורכזים בתוך חצי הכרטיס (לצד הדונאט) */
export const BarsChartGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 100%;
  min-width: 0;
`;

export const BarsCaption = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.84rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  width: 100%;
  max-width: 20rem;
  line-height: 1.35;
  box-sizing: border-box;
`;

export const BarsEmptyState = styled.div`
  margin: 0;
  padding: 1.35rem 1rem;
  text-align: center;
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px dashed ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bg};
`;

export const BarsEmptyTitle = styled.p`
  margin: 0 0 0.35rem;
  font-size: 0.92rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const BarsEmptyHint = styled.p`
  margin: 0;
  font-size: 0.82rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.muted};
  max-width: 22rem;
  margin-inline: auto;
`;

export const BarsCluster = styled.div`
  width: max-content;
  max-width: 100%;
  min-height: 132px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  overflow-x: auto;
  overflow-y: visible;
  padding: 0.15rem 0 0.1rem;
  scrollbar-width: thin;
`;

export const BarsRow = styled.div<{ $count: number }>`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: ${({ $count }) => ($count <= 3 ? "1rem" : $count <= 6 ? "0.65rem" : "0.4rem")};
  justify-content: ${({ $count }) =>
    $count <= 6 ? "center" : "flex-start"};
  min-height: 118px;
  padding: 0 0.35rem;
  flex-shrink: 0;
`;

export const BarColumn = styled.div<{ $narrow?: boolean }>`
  flex: 0 0 auto;
  width: ${({ $narrow }) => ($narrow ? "28px" : "38px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export const SkeletonBarColumn = styled.div`
  flex: 0 0 auto;
  width: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  gap: 0.35rem;
  animation: ${skeletonPulse} 1.1s ease-in-out infinite;
`;

export const SkeletonBarTrack = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const SkeletonBarCap = styled.div`
  width: 70%;
  height: 0.5rem;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.surface2};
`;

export const BarTrack = styled.div`
  width: 30px;
  align-self: center;
  height: 100px;
  border-radius: 8px 8px 4px 4px;
  background: ${({ theme }) => theme.colors.bg};
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const BarFill = styled.div<{ $heightPct: number }>`
  width: 100%;
  height: ${({ $heightPct }) => Math.max(4, Math.min(100, $heightPct))}%;
  min-height: 4px;
  border-radius: 6px 6px 0 0;
  background: linear-gradient(
    180deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.accentDim} 100%
  );
  transition: height 0.35s ease;
`;

export const BarPercentLabel = styled.span`
  font-size: 0.62rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
  margin-top: 0.25rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
`;

export const BarIndex = styled.span`
  font-size: 0.58rem;
  color: ${({ theme }) => theme.colors.muted};
  opacity: 0.75;
  margin-top: 0.1rem;
`;
