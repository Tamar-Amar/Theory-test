import { Link, NavLink as RouterNavLink } from "react-router-dom";
import styled, { css } from "styled-components";

/** גובה הכותרת הקבועה — משתנה CSS גלובלי (דסקטופ 68px / מובייל 56px) */
export const HEADER_HEIGHT = "var(--header-h)";

const MOBILE = "(max-width: 899px)";

export const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  height: ${HEADER_HEIGHT};
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding-inline: clamp(1.25rem, 6.67vw, 6rem);
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};

  @media ${MOBILE} {
    padding-inline: 20px;
  }
`;

export const Inner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  border-radius: 8px;
  transition: opacity 0.12s ease;

  &:hover {
    opacity: 0.85;
  }
`;

/* ───────── ניווט (דסקטופ) ───────── */

const navItem = css`
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.12s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }

  &[aria-current="page"] {
    color: ${({ theme }) => theme.colors.ink};
    font-weight: 500;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;

  @media ${MOBILE} {
    display: none;
  }
`;

export const NavItem = styled(RouterNavLink)`
  ${navItem}
`;

/** קישור ניווט ללא מצב "פעיל" (לאורחים — שלושה קישורים מובילים להתחברות) */
export const NavPlain = styled(Link)`
  ${navItem}
`;

/* ───────── פעולות (כפתור משני בצד שמאל) ───────── */

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-shrink: 0;

  @media ${MOBILE} {
    display: none;
  }
`;

/** הכפתור המשני מ‑Figma (Button/Secondary) */
const secondary = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.55rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.button};
  background: ${({ theme }) => theme.colors.surface};
  border: 1.5px solid ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.blue};
  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.12s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.blueTint};
  }
`;

export const Cta = styled(Link)`
  ${secondary}
`;

export const CtaButton = styled.button`
  ${secondary}
`;

/** "התנתקות" — פעולה משנית בטקסט, כי בפיגמה אין לה עיצוב ייעודי */
export const LogoutButton = styled.button`
  padding: 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

/* ───────── מובייל: כפתור תפריט + רשימה נפתחת ───────── */

export const MenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;

  svg {
    width: 28px;
    height: 28px;
  }

  @media ${MOBILE} {
    display: inline-flex;
  }
`;

export const MobilePanel = styled.div`
  display: none;

  @media ${MOBILE} {
    display: flex;
    flex-direction: column;
    gap: 4px;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 12px 20px 20px;
    background: ${({ theme }) => theme.colors.bg};
    border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
    box-shadow: 0 12px 24px rgba(26, 29, 41, 0.08);
  }
`;

const mobileItem = css`
  display: block;
  padding: 12px 0;
  font-size: 1.0625rem;
  color: ${({ theme }) => theme.colors.ink};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};

  &[aria-current="page"] {
    color: ${({ theme }) => theme.colors.blue};
    font-weight: 600;
  }
`;

export const MobileNavItem = styled(RouterNavLink)`
  ${mobileItem}
`;

export const MobileNavPlain = styled(Link)`
  ${mobileItem}
`;

export const MobileCta = styled(Link)`
  ${secondary}
  padding: 0.8rem 1rem;
  font-size: 1.0625rem;
  margin-top: 12px;
  width: 100%;
  box-sizing: border-box;
`;

export const MobileCtaButton = styled.button`
  ${secondary}
  padding: 0.8rem 1rem;
  font-size: 1.0625rem;
  margin-top: 12px;
  width: 100%;
  box-sizing: border-box;
`;

export const MobileLogout = styled.button`
  padding: 12px 0 0;
  border: none;
  background: none;
  font-family: inherit;
  font-size: 1.0625rem;
  text-align: start;
  color: ${({ theme }) => theme.colors.inkMuted};
  cursor: pointer;
`;
