import styled from "styled-components";

export const Root = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  padding: 1.35rem 1.25rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadow.card};

  & + & {
    margin-top: 1rem;
  }
`;

export const Narrow = styled(Root)`
  max-width: 400px;
  margin: 0 auto;
`;
