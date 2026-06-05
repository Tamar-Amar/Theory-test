import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

export const HEADER_HEIGHT = "3.5rem";

export const Bar = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.accentDim};
  box-shadow: 0 4px 16px rgba(15, 23, 42, 0.25);
  padding: 0 1rem;
`;

export const Inner = styled.div<{ $wide?: boolean }>`
  width:98%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const Brand = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.white};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.2rem 0.4rem;
  transition: opacity 0.12s ease;

  &:hover {
    opacity: 0.85;
  }
`;

export const LogoMark = styled.span`
  display: inline-flex;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const BrandName = styled.span`
  font-weight: 700;
  font-size: 1.05rem;
  letter-spacing: -0.01em;
  color: ${({ theme }) => theme.colors.white};
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const actionBase = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 255, 255, 0.12);
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.12s ease;

  svg {
    width: 1.15em;
    height: 1.15em;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.22);
  }
`;

export const LoginLink = styled(Link)`
  ${actionBase}
  padding: 0.4rem 0.85rem;
`;

export const AuthButton = styled.button`
  ${actionBase}
  padding: 0.4rem 0.85rem;
`;

export const IconLink = styled(Link)`
  ${actionBase}
  padding: 0.4rem;
  width: 2.1rem;
  height: 2.1rem;
`;
