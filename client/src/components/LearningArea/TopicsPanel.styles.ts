import styled, { css } from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  width: 100%;
`;

export const PageHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  text-align: right;
`;

export const PageTitle = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const TopicGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
`;

export const CardHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const Percent = styled.span<{ $high: boolean }>`
  direction: ltr;
  flex-shrink: 0;
  font-size: 0.9375rem;
  font-weight: 700;
  color: ${({ theme, $high }) =>
    $high ? theme.colors.successSolid : theme.colors.orange};
`;

export const Bar = styled.div`
  height: 6px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.divider};
  overflow: hidden;
`;

export const Fill = styled.div<{ $pct: number; $high: boolean }>`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme, $high }) =>
    $high ? theme.colors.successSolid : theme.colors.orange};
`;

export const Brief = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  margin-top: 0.25rem;
`;

const btn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  border-radius: ${({ theme }) => theme.radius.button};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: filter 0.12s ease, background 0.12s ease, color 0.12s ease;
`;

export const LearnBtn = styled.button`
  ${btn}
  border: none;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    filter: brightness(0.96);
  }
`;

export const GameBtn = styled.button`
  ${btn}
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.inkMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;
