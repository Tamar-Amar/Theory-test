import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Details = styled.details`
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const Summary = styled.summary`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.125rem 0;
  cursor: pointer;
  list-style: none;

  &::-webkit-details-marker {
    display: none;
  }
`;

export const Num = styled.span`
  min-width: 1rem;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-variant-numeric: tabular-nums;
  text-align: center;
`;

export const QText = styled.span`
  flex: 1;
  min-width: 0;
  font-size: 1.0625rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const Arrow = styled.span`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.inkMuted};
  transition: transform 0.15s ease;

  details[open] & {
    transform: rotate(180deg);
  }

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 0 0 1.125rem;
  text-align: right;
`;

export const Line = styled.p<{ $variant: "ok" | "wrong" }>`
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme, $variant }) =>
    $variant === "ok" ? theme.colors.successSolid : theme.colors.dangerSolid};
`;

export const ReviewImage = styled.div`
  width: min(280px, 100%);
  align-self: flex-start;
  margin-top: 0.4rem;
`;
