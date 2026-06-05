import { Link } from "react-router-dom";
import styled from "styled-components";
import { HEADER_HEIGHT } from "../SiteHeader/SiteHeader.styles";

/** מקום לפוטר קבוע בתחתית המסך */
const FOOTER_RESERVE = "5.5rem";

export const Wrapper = styled.div<{ $wide?: boolean }>`
  max-width: ${({ $wide }) => ($wide ? "min(960px, 100%)" : "640px")};
  margin: 0 auto;
  padding: calc(${HEADER_HEIGHT} + 1.25rem) 1.25rem
    calc(${FOOTER_RESERVE} + env(safe-area-inset-bottom, 0px));
  min-height: 100dvh;
  box-sizing: border-box;
`;

export const Main = styled.div`
  min-height: 0;
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0.5rem 0.75rem calc(0.5rem + env(safe-area-inset-bottom, 0px));
  background: ${({ theme }) => theme.colors.surface2};
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: 0 -6px 20px rgba(15, 23, 42, 0.06);
`;

export const FooterInner = styled.div<{ $wide?: boolean }>`
  width: 98%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 0.3rem 0.6rem;
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.35;

  @media (max-width: 949px) {
    grid-template-columns: 1fr;
  }
`;

export const FooterMeta = styled.div`
  grid-column: 2;
  justify-self: center;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  white-space: nowrap;

  @media (max-width: 949px) {
    grid-column: 1;
    justify-self: center;
  }
`;

/** הקישורים המשפטיים — צמודים לקצה השמאלי, לא מול העיניים */
export const FooterLinks = styled.nav`
  grid-column: 3;
  justify-self: end;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  gap: 0.2rem 0.7rem;
  font-size: 0.72rem;

  @media (max-width: 949px) {
    grid-column: 1;
    justify-self: center;
    justify-content: center;
  }
`;

export const FooterLink = styled(Link)`
  font: inherit;
  font-size: inherit;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accentDim};
  text-decoration: none;

  &:hover {
    color: ${({ theme }) => theme.colors.accentDim};
    text-decoration: underline;
    text-underline-offset: 2px;
  }
`;

export const FooterSep = styled.span`
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.55;
  user-select: none;
`;

export const FooterExternalLink = styled.a`
  font: inherit;
  font-size: inherit;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accentDim};
  padding: 0;
  min-width: 3.25rem;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
  text-align: center;

  &:hover {
    color: ${({ theme }) => theme.colors.accentDim};
  }
`;

export const FooterVersion = styled.span`
  font-variant-numeric: tabular-nums;
  color: ${({ theme }) => theme.colors.text};
`;
