import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const SubNav = styled.nav`
  display: flex;
  gap: 1.75rem;
  width: 100%;
  justify-content: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const SubNavLink = styled(NavLink)`
  padding: 0.5rem 0.15rem 0.75rem;
  margin-bottom: -1px;
  border: none;
  border-bottom: 2px solid transparent;
  background: none;
  color: ${({ theme }) => theme.colors.inkMuted};
  font-family: inherit;
  font-weight: 500;
  font-size: 1rem;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.12s ease, border-color 0.12s ease;

  &[aria-current="page"] {
    color: ${({ theme }) => theme.colors.blue};
    border-bottom-color: ${({ theme }) => theme.colors.blue};
    font-weight: 600;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;
