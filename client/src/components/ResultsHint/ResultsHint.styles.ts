import styled from "styled-components";

export const Text = styled.p`
  text-align: center;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.muted};
  margin: 0 0 0.5rem;
  line-height: 1.4;
`;
