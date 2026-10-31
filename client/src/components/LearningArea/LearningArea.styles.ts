import styled, { css } from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
`;

/* ───────── הגדרת משחק (בחירת קטגוריה) ───────── */

export const SetupCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  padding: 1.75rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
`;

export const SetupTitle = styled.h2`
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const Intro = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
`;

export const ChipGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
`;

/* ───────── שורה עליונה: כותרת (ימין) + סטטיסטיקות (שמאל) ───────── */

export const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
  text-align: right;
`;

export const Badge = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Note = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const Stats = styled.div`
  display: flex;
  align-items: stretch;
  gap: 12px;

  & > :first-child {
    min-width: 170px;
  }
  & > :last-child {
    min-width: 140px;
  }
`;

/** מספרים מהצורה "2 / 5" — נשארים בסדר LTR גם בתוך עברית */
export const LtrNum = styled.span`
  direction: ltr;
  unicode-bidi: isolate;
  font-variant-numeric: tabular-nums;
`;

/* ───────── לוח ההתאמות ───────── */

export const MatchBoard = styled.div`
  display: grid;
  /* RTL: העמודה הראשונה (שאלות) בימין, השנייה (תשובות) בשמאל */
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
`;

export const ColumnTitle = styled.h3`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MatchCard = styled.button<{
  $matched: boolean;
  $selected?: boolean;
  $dropOver?: boolean;
  $hasImages?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  min-height: ${({ $hasImages }) => ($hasImages ? "132px" : "62px")};
  padding: 18px 20px;
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.radius.answer};
  border: 1.5px solid
    ${({ theme, $matched, $selected, $dropOver }) =>
      $matched
        ? theme.colors.successSolid
        : $selected || $dropOver
          ? theme.colors.blue
          : theme.colors.divider};
  background: ${({ theme, $matched, $selected, $dropOver }) =>
    $matched
      ? theme.colors.successTint
      : $selected || $dropOver
        ? theme.colors.blueTint
        : theme.colors.surface};
  color: ${({ theme, $matched, $selected, $dropOver }) =>
    !$matched && ($selected || $dropOver)
      ? theme.colors.blue
      : theme.colors.ink};
  font: inherit;
  font-size: 1rem;
  font-weight: ${({ $matched, $selected }) => ($matched || $selected ? 500 : 400)};
  text-align: right;
  direction: rtl;
  unicode-bidi: plaintext;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:disabled {
    cursor: default;
    opacity: 1;
  }

  &:not(:disabled):hover {
    border-color: ${({ theme }) => theme.colors.blue};
  }

  &[draggable="true"] {
    cursor: grab;
  }

  &[draggable="true"]:active {
    cursor: grabbing;
  }
`;

export const CardText = styled.span<{ $clamp?: number }>`
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $clamp }) => $clamp ?? 3};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const CardImage = styled.img`
  display: block;
  width: 100%;
  max-height: 60px;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.bg};
`;

/* ───────── הודעות ותוצאה ───────── */

export const WrongHint = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.dangerSolid};
  text-align: right;
`;

export const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 1rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.answer};
  background: ${({ theme }) => theme.colors.successTint};
  text-align: right;
`;

export const ResultTitle = styled.h3`
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.successSolid};
`;

export const ResultText = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.ink};
`;

/* ───────── כפתורים תחתונים ───────── */

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 14px;
  flex-wrap: wrap;
`;

const btn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.radius.button};
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.1;
  cursor: pointer;
  transition: filter 0.12s ease, background 0.12s ease, color 0.12s ease;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const PrimaryBtn = styled.button`
  ${btn}
  border: 1.5px solid transparent;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:disabled) {
    filter: brightness(0.96);
  }
`;

export const SecondaryBtn = styled.button`
  ${btn}
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.blue};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.blueTint};
  }
`;

export const GhostBtn = styled.button`
  ${btn}
  border: 1.5px solid transparent;
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.ink};
  }
`;
