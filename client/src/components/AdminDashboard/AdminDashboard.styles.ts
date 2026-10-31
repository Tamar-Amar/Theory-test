import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
`;

/* ───────── כותרת: "לוח ניהול" (ימין) + תג (שמאל) ───────── */

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

/* ───────── כרטיסי מדדים ───────── */

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 860px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

/* ───────── טאבים ───────── */

export const Tabs = styled.div`
  display: flex;
  gap: 28px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
  overflow-x: auto;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  flex-shrink: 0;
  padding: 0 0 12px;
  margin-bottom: -1px;
  border: none;
  border-bottom: 3px solid
    ${({ theme, $active }) => ($active ? theme.colors.blue : "transparent")};
  background: none;
  font-family: inherit;
  font-size: 1.0625rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.blue : theme.colors.inkMuted};
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.12s ease;

  &:hover {
    color: ${({ theme, $active }) =>
      $active ? theme.colors.blue : theme.colors.ink};
  }
`;

/* ───────── חיפוש ───────── */

export const SearchBlock = styled.div`
  width: 100%;
  max-width: 420px;
`;

/* ───────── טבלה ───────── */

export const TableCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 12px 36px 24px;

  @media (max-width: 600px) {
    padding: 8px 16px 16px;
  }
`;

/** גלילה אופקית בלבד (למסכים צרים) — המעבר בין דפים נשאר מחוץ לגלילה */
export const TableScroll = styled.div`
  overflow-x: auto;
`;

/* ───────── מעבר בין דפי הטבלה ───────── */

export const Pager = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.75rem;
  padding-top: 16px;
`;

export const PagerInfo = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-variant-numeric: tabular-nums;
`;

export const PagerButtons = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 6px;
`;

export const PageBtn = styled.button<{ $active?: boolean }>`
  min-width: 36px;
  height: 36px;
  padding: 0 12px;
  border: none;
  border-radius: 10px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.blue : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.ink};
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: background 0.12s ease;

  &:hover:not(:disabled) {
    background: ${({ theme, $active }) =>
      $active ? theme.colors.blue : theme.colors.blueTint};
  }
  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PagerGap = styled.span`
  min-width: 20px;
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const Table = styled.table`
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  text-align: right;
  font-size: 0.9375rem;
`;

export const Th = styled.th`
  padding: 14px 8px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const SortableTh = styled(Th)<{ $active?: boolean }>`
  cursor: pointer;
  user-select: none;
  color: ${({ theme, $active }) =>
    $active ? theme.colors.ink : theme.colors.inkMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

export const SortIndicator = styled.span`
  margin-inline-start: 0.3rem;
  font-size: 0.8em;
`;

export const Td = styled.td`
  padding: 14px 8px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.ink};
  vertical-align: middle;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const TdNum = styled(Td)`
  font-variant-numeric: tabular-nums;
`;

export const Tr = styled.tr``;

export const TicketBody = styled.div`
  max-width: 520px;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  line-height: 1.5;
`;

export const StarsCell = styled.span`
  color: ${({ theme }) => theme.colors.orange};
  letter-spacing: 0.1em;
  white-space: nowrap;
`;

export const Empty = styled.p`
  margin: 0;
  padding: 1.5rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

/** פעולת מחיקה כטקסט ("מחיקה") — כמו ב‑Figma; אדום רק במעבר עכבר */
export const DeleteButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: inherit;
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.dangerSolid};
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

/* ───────── שליחת מייל לכל המשתמשים ───────── */

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 760px;
  padding: 28px 36px 32px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;

  @media (max-width: 600px) {
    padding: 20px 16px 24px;
  }
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const PanelText = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
`;

export const SendRow = styled.div`
  display: flex;
  justify-content: flex-start;
`;

export const SendButton = styled.button`
  padding: 0.9rem 2rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.button};
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.12s ease;

  &:hover:not(:disabled) {
    filter: brightness(0.96);
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const ProgressTrack = styled.div`
  height: 8px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.divider};
  overflow: hidden;
`;

export const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.blue};
  transition: width 0.3s ease;
`;

export const Notice = styled.p<{ $kind: "success" | "warn" }>`
  margin: 0;
  padding: 0.875rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.answer};
  font-size: 0.9375rem;
  line-height: 1.5;
  text-align: right;
  background: ${({ theme, $kind }) =>
    $kind === "success" ? theme.colors.successTint : theme.colors.orangeTint};
  color: ${({ theme, $kind }) =>
    $kind === "success" ? theme.colors.successSolid : theme.colors.orangeInk};
`;
