import { Link } from "react-router-dom";
import styled from "styled-components";
import { HEADER_HEIGHT } from "../SiteHeader/SiteHeader.styles";

/** מעטפת עמוד — מבנה "פוטר דביק": התוכן גדל וממלא, הפוטר נשאר בתחתית */
export const Shell = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
`;

export const Wrapper = styled.div<{ $wide?: boolean; $admin?: boolean }>`
  flex: 1 0 auto;
  width: 100%;
  max-width: ${({ $admin, $wide }) =>
    $admin ? "min(1200px, 100%)" : $wide ? "min(1160px, 100%)" : "640px"};
  margin: 0 auto;
  padding: calc(${HEADER_HEIGHT} + 1.5rem) 1.25rem 2.5rem;
  box-sizing: border-box;
`;

export const Main = styled.div`
  min-height: 0;
`;

/** אזור תוכן ברוחב מלא (fluid) — מקטעים מנהלים את הרוחב והריפוד בעצמם */
export const FluidMain = styled.div`
  flex: 1 0 auto;
  width: 100%;
  padding-top: ${HEADER_HEIGHT};
`;

/* ───────────── פוטר (Footer/Desktop + Footer/Mobile ב‑Figma) ───────────── */

const NARROW = "(max-width: 899px)";

export const Footer = styled.footer`
  flex-shrink: 0;
  background: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

/**
 * דסקטופ: שורה אחת — לוגו + משפט מימין, קישורים וזכויות משמאל, שוליים של 96px.
 * מובייל: רשת — לוגו וקישורים בשורה אחת, אחריהם משפט ההבהרה ואז שורת הזכויות.
 */
export const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 8px 20px;
  padding: 12px clamp(1.25rem, 6.67vw, 6rem);

  @media ${NARROW} {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "logo links"
      "tagline tagline"
      "legal legal";
    gap: 6px 12px;
    padding: 14px 20px;
  }
`;

/* צד המותג: לוגו + משפט ההבהרה */
export const FooterBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media ${NARROW} {
    display: contents;
  }
`;

/** לוגו הדסקטופ (28px) — במובייל מוחלף בלוגו קטן (24px) */
export const LogoSlot = styled.span`
  display: inline-flex;

  @media ${NARROW} {
    display: none;
  }
`;

/** מוצג רק בדסקטופ / רק במובייל */
export const OnlyWide = styled.span`
  @media ${NARROW} {
    display: none;
  }
`;

export const OnlyNarrow = styled.span`
  display: inline-flex;
  grid-area: logo;

  @media (min-width: 900px) {
    display: none;
  }
`;

export const FooterTagline = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.inkMuted};

  @media ${NARROW} {
    grid-area: tagline;
    font-size: 0.75rem;
  }
`;

/* צד המטא: קישורים · מפריד · זכויות */
export const FooterMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  @media ${NARROW} {
    display: contents;
  }
`;

export const FooterLinks = styled.nav`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 20px;

  @media ${NARROW} {
    grid-area: links;
    justify-self: end;
    gap: 4px 18px;
  }
`;

export const FooterLink = styled(Link)`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-decoration: none;
  white-space: nowrap;

  &:hover {
    color: ${({ theme }) => theme.colors.blue};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const FooterSep = styled.span`
  width: 1px;
  height: 14px;
  background: ${({ theme }) => theme.colors.divider};

  @media ${NARROW} {
    display: none;
  }
`;

export const FooterLegal = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  white-space: nowrap;

  @media ${NARROW} {
    grid-area: legal;
    justify-self: start;
  }
`;

export const FooterDot = styled.span`
  font-size: 0.75rem;
  user-select: none;
`;

export const FooterExternalLink = styled.a`
  font: inherit;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const FooterVersion = styled.span`
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
`;
