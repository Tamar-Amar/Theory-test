import styled, { css } from "styled-components";

export type NavState = "current" | "answered" | "todo";
export type SegKind = "done" | "current" | "todo";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 1.5rem;
  align-items: start;
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

/* ───────── אזור השאלה (ימין) ───────── */

export const Main = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Count = styled.span`
  direction: ltr;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-variant-numeric: tabular-nums;
`;

export const TopicChip = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1.125rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1.5px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.surface};
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  white-space: nowrap;
`;

export const Progress = styled.div`
  display: flex;
  gap: 5px;
  width: 100%;

  /* מובייל: 30 נקודות מפוזרות לרוחב, במקום פסים */
  @media (max-width: 700px) {
    justify-content: space-between;
    padding-block: 2px;
  }
`;

export const Seg = styled.div<{ $kind: SegKind }>`
  flex: 1 1 0;
  min-width: 0;
  height: 5px;
  border-radius: 3px;
  background: ${({ theme, $kind }) =>
    $kind === "done"
      ? theme.colors.blue
      : $kind === "current"
        ? theme.colors.orange
        : theme.colors.divider};

  @media (max-width: 700px) {
    flex: 0 0 6px;
    height: 6px;
    border-radius: 50%;
  }
`;

export const QuestionTitle = styled.h2`
  margin: 0.25rem 0;
  font-size: clamp(1.5rem, 2.4vw, 1.625rem);
  font-weight: 700;
  line-height: 1.35;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

/* שאלה עם תמונה — תמונה בטור נפרד לצד הטקסט והתשובות */
export const QARow = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.875rem;
  }
`;

export const QABlock = styled.div`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;

  /* צר: הכותרת, התמונה והתשובות הם פריטים ישירים של QARow (לסידור בעזרת order) */
  @media (max-width: 760px) {
    display: contents;
  }
`;

/** עוטף את רשימת התשובות — במובייל מוצג אחרי התמונה */
export const Answers = styled.div`
  width: 100%;

  @media (max-width: 760px) {
    order: 2;
  }
`;

export const ImageCol = styled.div`
  width: 340px;
  flex-shrink: 0;

  @media (max-width: 760px) {
    width: 100%;
    order: 1;
  }
`;

export const NavRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;

  /* מובייל: "הקודמת" מימין ו"לשאלה הבאה" משמאל, שניהם ממלאים את השורה */
  @media (max-width: 700px) {
    flex-direction: row-reverse;
    gap: 12px;

    & > button {
      flex: 1 1 0;
      padding-inline: 1rem;
    }
  }
`;

const btn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2rem;
  border-radius: ${({ theme }) => theme.radius.button};
  font-family: inherit;
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: filter 0.12s ease, color 0.12s ease;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const NextButton = styled.button`
  ${btn}
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:disabled) {
    filter: brightness(0.96);
  }
`;

export const PrevButton = styled.button`
  ${btn}
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.ink};
  }

  @media (max-width: 700px) {
    background: ${({ theme }) => theme.colors.surface};
    border: 1.5px solid ${({ theme }) => theme.colors.blue};
    color: ${({ theme }) => theme.colors.blue};

    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.blueTint};
      color: ${({ theme }) => theme.colors.blue};
    }
  }
`;

/* ───────── סרגל צד (שמאל) ───────── */

export const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 900px) {
    order: 2;
  }

  /* מובייל: ללא סרגל הצד (הטיימר כבר מופיע בשורת הכותרת) */
  @media (max-width: 700px) {
    display: none;
  }
`;

const sideCard = css`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 1.5rem;
`;

export const TimerCard = styled.div`
  ${sideCard}
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  text-align: right;
`;

export const TimerLabel = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const TimerValue = styled.p`
  margin: 0;
  font-size: 2.125rem;
  font-weight: 700;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.ink};
  font-variant-numeric: tabular-nums;
`;

export const NavCard = styled.div`
  ${sideCard}
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
`;

export const NavTitle = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const NavGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  justify-content: flex-start;
`;

export const NavButton = styled.button<{ $state: NavState }>`
  width: 2.125rem;
  height: 2.125rem;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 10px;
  font-family: inherit;
  font-size: 0.8125rem;
  font-weight: 500;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition: filter 0.12s ease;
  background: ${({ theme, $state }) =>
    $state === "current"
      ? theme.colors.blue
      : $state === "answered"
        ? theme.colors.blueTint
        : theme.colors.bg};
  color: ${({ theme, $state }) =>
    $state === "current"
      ? theme.colors.white
      : $state === "answered"
        ? theme.colors.blue
        : theme.colors.inkMuted};

  &:hover {
    filter: brightness(0.96);
  }
`;
