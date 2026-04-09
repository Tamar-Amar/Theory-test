import styled from "styled-components";

export const List = styled.div`
  margin-top: 1.25rem;
  max-height: min(60vh, 520px);
  overflow-y: auto;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.surface};
`;

export const Details = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface2};

  &:last-child {
    border-bottom: none;
  }
`;

export const Summary = styled.summary<{ $ok: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  list-style: none;
  font-size: 0.9rem;
  font-weight: 600;
  color: ${({ theme, $ok }) =>
    $ok ? theme.colors.success : theme.colors.danger};

  &::-webkit-details-marker {
    display: none;
  }

  &::after {
    content: "▾";
    font-size: 0.75rem;
    color: ${({ theme }) => theme.colors.muted};
    transition: transform 0.15s ease;
  }

  ${Details}[open] > &::after {
    transform: rotate(-180deg);
  }
`;

export const Panel = styled.div`
  padding: 0 0.85rem 0.9rem;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const QuestionText = styled.p`
  margin: 0 0 0.65rem;
  line-height: 1.45;
`;

export const AnswerBlock = styled.div<{ $variant: "ok" | "wrong" }>`
  margin-top: 0.5rem;
  padding: 0.45rem 0.55rem;
  border-radius: ${({ theme }) => theme.radius.option};
  line-height: 1.4;
  background: ${({ $variant }) =>
    $variant === "ok"
      ? "rgba(5, 150, 105, 0.08)"
      : "rgba(220, 38, 38, 0.06)"};
  border: 1px solid
    ${({ $variant }) =>
      $variant === "ok"
        ? "rgba(5, 150, 105, 0.25)"
        : "rgba(220, 38, 38, 0.2)"};
`;

export const AnswerLabel = styled.span`
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 0.2rem;
`;

export const AnswerText = styled.span`
  color: ${({ theme }) => theme.colors.text};
`;
