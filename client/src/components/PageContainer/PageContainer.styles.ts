import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 640px;
  margin: 0 auto;
  padding: 1.5rem 1.25rem 1.25rem;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const Main = styled.div`
  flex: 1;
`;

export const Footer = styled.footer`
  margin-top: auto;
  padding-top: 2rem;
  text-align: center;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

export const FooterLink = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
