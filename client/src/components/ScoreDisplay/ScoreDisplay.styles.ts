import styled from "styled-components";

export const Block = styled.div<{ $passed: boolean }>`
  flex: 1 1 380px;
  min-width: 280px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 0.25rem;
  padding: 1.75rem 2.25rem;
  border-radius: 20px;
  text-align: right;
  background: ${({ theme, $passed }) =>
    $passed ? theme.colors.successTint : theme.colors.dangerTint};
`;

export const Status = styled.p<{ $passed: boolean }>`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme, $passed }) =>
    $passed ? theme.colors.successSolid : theme.colors.dangerSolid};
`;

export const Score = styled.p`
  margin: 0;
  direction: ltr;
  font-size: clamp(2.75rem, 6vw, 4rem);
  font-weight: 800;
  line-height: 1.05;
  color: ${({ theme }) => theme.colors.ink};
  font-variant-numeric: tabular-nums;
`;

export const Sub = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
