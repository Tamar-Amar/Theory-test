import styled from "styled-components";

export const Block = styled.div`
  text-align: center;
  padding: 1rem 0 0.5rem;
`;

export const Percent = styled.strong`
  font-size: 2.75rem;
  font-weight: 700;
  display: block;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.gradientStart},
    ${({ theme }) => theme.colors.accent}
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

export const Sub = styled.span`
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.95rem;
`;
