import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const SubNav = styled.nav`
  display: flex;
  gap: 0.35rem;
  width: 100%;
  max-width: 760px;
  margin-inline: auto;
  margin-bottom: 1.15rem;
`;

export const SubNavLink = styled(NavLink)`
  flex: 1 1 0;
  min-width: 0;
  padding: 0.6rem 0.5rem;
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.bg};
  color: ${({ theme }) => theme.colors.muted};
  font-family: inherit;
  font-weight: 600;
  font-size: 0.88rem;
  text-decoration: none;
  text-align: center;
  transition: border-color 0.12s ease, background 0.12s ease, color 0.12s ease;

  &[aria-current="page"] {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accentGlow};
    color: ${({ theme }) => theme.colors.accentDim};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentBorder};
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: 480px) {
    font-size: 0.78rem;
    padding: 0.55rem 0.35rem;
  }
`;
