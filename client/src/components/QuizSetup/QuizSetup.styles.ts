import styled from "styled-components";

export const MetaLine = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
  text-align: center;
  margin-top: 1rem;
`;

export const MetaStrong = styled.strong`
  color: ${({ theme }) => theme.colors.text};
`;
