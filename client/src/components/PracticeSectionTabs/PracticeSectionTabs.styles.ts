import { NavLink } from "react-router-dom";
import styled from "styled-components";

/** רוחב קבוע למסלול הלשוניות - לא נמתח עם תוכן רחב באזור אישי */
export const TabsRail = styled.div`
  width: 100%;
  max-width: 760px;
  margin-inline: auto;
  margin-bottom: 1.15rem;
`;

export const Tabs = styled.div`
  display: flex;
  gap: 0.35rem;
  width: 100%;
`;

export const TabNav = styled(NavLink)`
  flex: 1 1 0;
  min-width: 0;
  padding: 0.55rem 0.4rem;
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.muted};
  font-weight: 600;
  border-color: ${({ theme }) => theme.colors.surface2};
  cursor: pointer;
  font-family: inherit;
  font-size: 0.95rem;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  &[aria-current="page"] {
    background: ${({ theme }) => theme.colors.accentGlow};
    color: ${({ theme }) => theme.colors.text};
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const TabInner = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;

export const TabIcon = styled.svg`
  flex-shrink: 0;
  width: 1.15em;
  height: 1.15em;
`;
