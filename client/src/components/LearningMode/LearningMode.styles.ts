import styled, { keyframes } from "styled-components";

const glow = keyframes`
  0%,
  100% { box-shadow: 0 0 0 rgba(46, 93, 232, 0); }
  50% { box-shadow: 0 0 0.85rem rgba(46, 93, 232, 0.3); }
`;

export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const Header = styled.div`
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 0.9rem 1rem;
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  background: linear-gradient(
    125deg,
    ${({ theme }) => theme.colors.accentGlow} 0%,
    ${({ theme }) => theme.colors.surface} 58%
  );
`;

export const HeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const HeaderTitle = styled.h2`
  margin: 0.45rem 0 0.35rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const HeaderHint = styled.p`
  margin: 0;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const StageTag = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.26rem 0.55rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accentDim};
  background: ${({ theme }) => theme.colors.accentGlow};
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
`;

export const ProgressBar = styled.div`
  margin-top: 0.55rem;
  width: 100%;
  height: 0.5rem;
  border-radius: 999px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface2};
`;

export const ProgressFill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => Math.max(0, Math.min(100, $pct))}%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent} 0%,
    ${({ theme }) => theme.colors.accentDim} 100%
  );
  transition: width 0.22s ease;
`;

export const QuestionText = styled.h3`
  margin: 0;
  font-size: 1.07rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;

export const LearnOptionList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
  margin-top: 0.85rem;
`;

export const LearnOption = styled.div<{ $kind: "correct" | "wrong" }>`
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid
    ${({ theme, $kind }) =>
      $kind === "correct" ? theme.colors.accentBorder : theme.colors.borderSubtle};
  padding: 0.6rem 0.7rem;
  background: ${({ theme, $kind }) =>
    $kind === "correct" ? theme.colors.accentGlow : theme.colors.bg};
  animation: ${({ $kind }) => ($kind === "correct" ? glow : "none")} 1.8s ease-in-out infinite;
`;

export const LearnExplain = styled.p`
  margin: 0.75rem 0 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.85rem;
`;

export const MemoryGrid = styled.div`
  margin-top: 0.9rem;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
`;

export const MemoryCard = styled.button<{
  $open: boolean;
  $matched: boolean;
}>`
  border: 1px solid
    ${({ theme, $open, $matched }) =>
      $matched || $open ? theme.colors.accent : theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.control};
  min-height: 82px;
  padding: 0.45rem;
  font: inherit;
  font-size: 0.78rem;
  cursor: pointer;
  color: ${({ theme, $open, $matched }) =>
    $matched || $open ? theme.colors.text : theme.colors.muted};
  background: ${({ theme, $open, $matched }) =>
    $matched ? theme.colors.accentGlow : $open ? theme.colors.surface : theme.colors.bg};
  transition: transform 0.14s ease, background 0.14s ease, border-color 0.14s ease;

  &:disabled {
    cursor: default;
    opacity: ${({ $matched }) => ($matched ? 0.92 : 0.85)};
  }
`;

export const TestOptions = styled.div`
  margin-top: 0.9rem;
  display: grid;
  gap: 0.55rem;
`;

export const TestOptionButton = styled.button<{
  $selected: boolean;
  $correct: boolean;
  $wrong: boolean;
}>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid
    ${({ theme, $selected, $correct, $wrong }) =>
      $correct || ($selected && !$wrong)
        ? theme.colors.accent
        : $wrong
          ? "#d96666"
          : theme.colors.borderSubtle};
  background: ${({ theme, $selected, $correct, $wrong }) =>
    $correct || ($selected && !$wrong)
      ? theme.colors.accentGlow
      : $wrong
        ? "rgba(217, 102, 102, 0.12)"
        : theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  text-align: right;
  padding: 0.62rem 0.7rem;
  font: inherit;
  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.85rem;
`;

export const ResultBox = styled.div`
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  background: ${({ theme }) => theme.colors.accentGlow};
  padding: 1rem;
  text-align: center;
`;

export const ResultTitle = styled.h3`
  margin: 0 0 0.45rem;
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const ResultLine = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
`;

