import styled from "styled-components";

export const Wrap = styled.div`
  margin-bottom: 1.25rem;
`;

export const Top = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 0.35rem;
`;

export const Timer = styled.span`
  font-variant-numeric: tabular-nums;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
`;

export const Bar = styled.div`
  height: 6px;
  background: ${({ theme }) => theme.colors.surface2};
  border-radius: ${({ theme }) => theme.radius.pill};
  overflow: hidden;
`;

export const Fill = styled.div<{ $pct: number }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.mint}
  );
  border-radius: ${({ theme }) => theme.radius.pill};
  transition: width 0.35s ease;
`;
