import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const SubSectionTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

/* ───────── רישיון ───────── */

/** כרטיס בחירת סוג רישיון (Figma 9:845): ריפוד 32/36, רדיוס 20, מרווח 12 */
export const LicenseSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 2rem 2.25rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;

  @media (max-width: 600px) {
    padding: 1.5rem 1.25rem;
  }
`;

export const CardLabel = styled.h2`
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-start;
`;

export const Hint = styled.p`
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
`;

export const Warning = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.answer};
  background: ${({ theme }) => theme.colors.orangeTint};
  color: ${({ theme }) => theme.colors.orangeInk};
  font-size: 0.9375rem;
  line-height: 1.5;
  text-align: right;
`;

export const SaveError = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.dangerSolid};
  text-align: right;
`;

/* ───────── כרטיסי מדדים ───────── */

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
`;

/* ───────── שתי עמודות: גרף + מדדים לפי נושא ───────── */

export const TwoCol = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 400px;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ChartCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 0;
`;

export const TopicList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const TopicRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const TopicName = styled.span`
  flex: 1;
  min-width: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

/* ───────── טבלת ניסיונות ───────── */

export const TableCard = styled(Card)``;

export const TableWrap = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: right;
`;

export const Th = styled.th`
  padding: 0.75rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  white-space: nowrap;
`;

export const Td = styled.td`
  padding: 0.85rem 0.5rem;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.ink};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  vertical-align: middle;
`;

export const Tr = styled.tr<{ $clickable?: boolean }>`
  cursor: ${({ $clickable }) => ($clickable ? "pointer" : "default")};

  &:last-child td {
    border-bottom: none;
  }
`;

export const Num = styled.span`
  direction: ltr;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
`;

export const Muted = styled.span`
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const Empty = styled.p`
  margin: 0;
  padding: 1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: center;
`;

export const ExpandedCell = styled.td`
  padding: 0;
  background: ${({ theme }) => theme.colors.bg};
`;

export const ExpandedInner = styled.div`
  padding: 1rem 0.75rem 1.5rem;
`;

export const StatCardSkeleton = styled.div`
  height: 96px;
  border-radius: 18px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  opacity: 0.6;
`;

export const Loading = styled.p`
  margin: 0;
  padding: 1rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: center;
`;
