import styled from "styled-components";

export const Article = styled.article`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: 1.75rem 1.5rem;
  margin-top: 1rem;

  @media (max-width: 600px) {
    padding: 1.25rem 1.1rem;
  }
`;

export const Title = styled.h1`
  margin: 0 0 0.35rem;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
`;

export const Updated = styled.p`
  margin: 0 0 1.25rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Intro = styled.p`
  margin: 0 0 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
`;

export const SectionHeading = styled.h2`
  margin: 1.6rem 0 0.6rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Paragraph = styled.p`
  margin: 0 0 0.75rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
`;

export const List = styled.ul`
  margin: 0 0 0.85rem;
  padding-inline-start: 1.25rem;
  list-style: disc;

  li {
    margin-bottom: 0.4rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.6;
  }
`;
