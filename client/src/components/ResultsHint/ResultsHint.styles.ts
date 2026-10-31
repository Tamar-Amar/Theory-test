import styled from "styled-components";

export const Box = styled.p`
  margin: 0;
  padding: 0.875rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.answer};
  background: ${({ theme }) => theme.colors.orangeTint};
  color: ${({ theme }) => theme.colors.orangeInk};
  font-size: 0.9375rem;
  line-height: 1.5;
  text-align: right;
`;
