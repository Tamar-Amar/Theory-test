import styled from "styled-components";

export const Title = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Intro = styled.p`
  margin: 0 0 1rem;
  font-size: 0.88rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
`;

export const Success = styled.p`
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.success};
`;

export const BackRow = styled.p`
  margin: 1rem 0 0;
  text-align: center;
  font-size: 0.9rem;

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;
