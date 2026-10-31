import styled from "styled-components";
import { HEADER_HEIGHT } from "../SiteHeader/SiteHeader.styles";

/** מעטפת עמוד — מרכז, רוחב עד 1248px, ומאפשרת מיקום צורת הרקע */
export const Page = styled.div`
  position: relative;
  width: 100%;
  max-width: 1248px;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 3rem;
  box-sizing: border-box;

  @media (max-width: 600px) {
    padding-inline: 1.1rem;
  }
`;

export const Deco = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  pointer-events: none;

  @media (max-width: 900px) {
    display: none;
  }
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
  text-align: right;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.25rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1.15;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Updated = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

/* ───────── פריסה: תוכן (ימין) + "בעמוד זה" (שמאל) ───────── */

export const Layout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 56px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const Article = styled.article`
  flex: 1 1 0;
  min-width: 0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 26px;
  padding: 40px 48px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  color: ${({ theme }) => theme.colors.ink};

  @media (max-width: 600px) {
    padding: 1.5rem 1.25rem;
  }

  a {
    color: ${({ theme }) => theme.colors.blue};
    font-weight: 500;
  }
`;

export const Intro = styled.p`
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
  /* גלילה לעיגון — לא מתחת לכותרת הקבועה */
  scroll-margin-top: calc(${HEADER_HEIGHT} + 1.25rem);
`;

export const SectionHeading = styled.h2`
  margin: 0;
  font-size: 1.3125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Paragraph = styled.p`
  margin: 0;
  font-size: 1.0625rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.ink};
`;

export const List = styled.ul`
  margin: 0;
  padding-inline-start: 1.25rem;
  list-style: disc;

  li {
    margin-bottom: 0.4rem;
    font-size: 1.0625rem;
    line-height: 1.65;
    color: ${({ theme }) => theme.colors.ink};
  }
`;

/* ───────── "בעמוד זה" ───────── */

export const Toc = styled.nav`
  flex: 0 0 300px;
  width: 300px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-top: 8px;
  text-align: right;
  position: sticky;
  top: calc(${HEADER_HEIGHT} + 1.5rem);

  /* במסכים צרים התוכן מוצג במלואו בלי "בעמוד זה" */
  @media (max-width: 900px) {
    display: none;
  }
`;

export const TocTitle = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const TocLink = styled.a<{ $active?: boolean }>`
  font-size: 0.9375rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.blue : theme.colors.ink};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
  }
`;

export const NotFound = styled.div`
  padding: 2rem 0;
  text-align: center;
`;
