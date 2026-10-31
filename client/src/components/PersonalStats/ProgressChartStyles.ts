import styled from "styled-components";

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

export const PassLabel = styled.span`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.successSolid};
  white-space: nowrap;
`;

export const Svg = styled.svg`
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;
`;

export const Empty = styled.p`
  margin: 0;
  padding: 2rem 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
`;
