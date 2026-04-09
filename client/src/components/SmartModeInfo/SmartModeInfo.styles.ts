import styled from "styled-components";

export const Box = styled.div`
  margin-bottom: 1rem;
  padding: 0.75rem 0.9rem;
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  background: ${({ theme }) => theme.colors.accentGlow};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.45;
`;

export const Title = styled.strong`
  color: ${({ theme }) => theme.colors.text};
  display: block;
  margin-bottom: 0.25rem;
`;
