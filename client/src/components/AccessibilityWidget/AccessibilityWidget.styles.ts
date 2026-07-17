import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

/** מעל הפוטר הקבוע */
const BOTTOM_OFFSET = "calc(5.75rem + env(safe-area-inset-bottom, 0px))";

export const Root = styled.div`
  position: fixed;
  inset-inline-start: 1rem;
  bottom: ${BOTTOM_OFFSET};
  z-index: 180;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.5rem;
  font-family: ${({ theme }) => theme.fonts.main};

  @media (max-width: 480px) {
    inset-inline-start: 0.65rem;
  }
`;

export const Fab = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  min-height: 3rem;
  padding: 0.55rem 0.95rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accentDim : theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.95rem;
  font-weight: 700;
  box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
  transition: filter 0.12s ease, transform 0.12s ease;

  &:hover {
    filter: brightness(1.05);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const FabIcon = styled.span`
  display: inline-flex;
  width: 1.35rem;
  height: 1.35rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Panel = styled.div`
  width: min(20.5rem, calc(100vw - 1.5rem));
  max-height: min(70vh, 32rem);
  overflow: auto;
  padding: 1rem 1rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius.card};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

export const PanelHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
`;

export const PanelTitle = styled.h2`
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
`;

export const CloseBtn = styled.button`
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  margin: -0.25rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.25rem;
  line-height: 1;
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding: 0.65rem 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const SectionLabel = styled.p`
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.muted};
`;

export const FontControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const FontBtn = styled.button`
  flex: 0 0 auto;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  font-weight: 700;

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const FontValue = styled.span`
  flex: 1;
  text-align: center;
  font-size: 0.95rem;
  font-weight: 600;
`;

const toggleBase = css<{ $on?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  width: 100%;
  padding: 0.7rem 0.8rem;
  border: 1px solid
    ${({ theme, $on }) =>
      $on ? theme.colors.accentBorder : theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ theme, $on }) =>
    $on ? theme.colors.accentGlow : theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.95rem;
  font-weight: 600;
  text-align: start;
`;

export const Toggle = styled.button<{ $on?: boolean }>`
  ${toggleBase}
`;

export const ToggleState = styled.span<{ $on?: boolean }>`
  flex-shrink: 0;
  min-width: 2.5rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: ${({ theme, $on }) =>
    $on ? theme.colors.accent : theme.colors.muted};
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  padding-top: 0.75rem;
  border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
`;

export const ResetBtn = styled.button`
  width: 100%;
  padding: 0.7rem 0.8rem;
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  border-radius: ${({ theme }) => theme.radius.control};
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
  font-weight: 600;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const StatementLink = styled(Link)`
  display: block;
  padding: 0.55rem 0.2rem 0.15rem;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
  text-decoration: underline;
  text-underline-offset: 2px;
`;

export const Backdrop = styled.button`
  position: fixed;
  inset: 0;
  z-index: 170;
  margin: 0;
  padding: 0;
  border: none;
  background: rgba(15, 23, 42, 0.28);
  cursor: default;
`;
