import styled from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;
  align-self: center;
  margin-inline: auto;
`;

export const Intro = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.8rem;
`;

export const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  background: ${({ theme }) => theme.colors.accentGlow};
  color: ${({ theme }) => theme.colors.accentDim};
  font-size: 0.76rem;
  font-weight: 700;
  padding: 0.2rem 0.56rem;
`;

export const Counter = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.86rem;
`;

export const MatchBoard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.9rem;
  direction: ltr;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const Column = styled.div<{ $kind: "questions" | "answers" }>`
  order: ${({ $kind }) => ($kind === "questions" ? 2 : 1)};
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surface};
  padding: 0.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  min-width: 0;

  @media (max-width: 900px) {
    order: initial;
  }
`;

export const ColumnTitle = styled.h4`
  margin: 0;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

export const List = styled.div`
  display: grid;
  gap: 0.55rem;
`;

export const MatchCard = styled.button<{
  $matched: boolean;
  $selected?: boolean;
  $dropOver?: boolean;
  $hasImages?: boolean;
}>`
  min-height: ${({ $hasImages }) => ($hasImages ? "132px" : "78px")};
  max-height: ${({ $hasImages }) => ($hasImages ? "132px" : "78px")};
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid
    ${({ theme, $matched, $selected, $dropOver }) =>
      $matched
        ? "var(--pair-border, " + theme.colors.accent + ")"
        : $dropOver
          ? theme.colors.accent
          : $selected
          ? theme.colors.accent
          : theme.colors.borderSubtle};
  background: ${({ theme, $matched, $selected, $dropOver }) =>
    $matched
      ? "var(--pair-bg, " + theme.colors.accentGlow + ")"
      : $dropOver
        ? theme.colors.accentGlow
        : $selected
        ? theme.colors.surface
        : theme.colors.bg};
  color: ${({ theme, $matched, $selected, $dropOver }) =>
    $matched
      ? "var(--pair-text, " + theme.colors.text + ")"
      : $dropOver || $selected
        ? theme.colors.text
        : theme.colors.muted};
  font: inherit;
  padding: 0.58rem;
  text-align: right;
  direction: rtl;
  unicode-bidi: plaintext;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.3rem;
  overflow: hidden;

  &:disabled {
    cursor: default;
  }

  &[draggable="true"] {
    cursor: grab;
  }

  &[draggable="true"]:active {
    cursor: grabbing;
  }

  @media (max-width: 700px) {
    min-height: ${({ $hasImages }) => ($hasImages ? "120px" : "72px")};
    max-height: ${({ $hasImages }) => ($hasImages ? "120px" : "72px")};
  }
`;

export const CardText = styled.span<{ $clamp?: number }>`
  font-size: 0.9rem;
  line-height: 1.42;
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
  border-radius: ${({ theme }) => theme.radius.option};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.bg};
`;

export const WrongHint = styled.p`
  margin: 0;
  font-size: 0.8rem;
  color: #b24d5d;
  text-align: center;
`;

export const Note = styled.p`
  margin: 0.65rem 0 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.82rem;
`;

export const ResultBox = styled.div`
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  background: ${({ theme }) => theme.colors.accentGlow};
  padding: 0.95rem;
  text-align: center;
`;

export const ResultTitle = styled.h3`
  margin: 0 0 0.45rem;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const ResultText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`;

export const Actions = styled.div`
  margin-top: 0.85rem;
  display: flex;
  gap: 0.55rem;
`;

