import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import * as FF from "../FormField/FormField.styles";

/** מעטפת משותפת לחלונות קופצים (Popup / * ב‑Figma): כרטיס 520px, רדיוס 24, צל */

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 220;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1.25rem;
  overflow-y: auto;
  background: rgba(26, 29, 41, 0.6);
  backdrop-filter: blur(2px);
`;

export const Modal = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;
  margin: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px 40px 36px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(26, 29, 41, 0.2);
  text-align: right;

  @media (max-width: 520px) {
    padding: 36px 22px 28px;
  }
`;

/** ✕ בפינה השמאלית העליונה */
export const Close = styled.button`
  position: absolute;
  top: 15px;
  left: 14px;
  padding: 6px 8px;
  border: none;
  background: none;
  font-family: inherit;
  font-size: 18px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.inkMuted};
  cursor: pointer;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.ink};
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

/** עיגול האמוג'י בראש החלון */
export const Badge = styled.div`
  align-self: flex-start;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background: ${({ theme }) => theme.colors.orangeTint};
  font-size: 26px;
  line-height: 1;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 1.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Intro = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const Thanks = styled.p`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.successSolid};
`;

export const FieldWrap = styled.div`
  width: 100%;
`;

/** שדה טקסט רב‑שורות של החלונות: רקע paper וגובה קבוע */
export const TextArea = styled(FF.Input)<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  background: ${({ theme }) => theme.colors.bg};
  font-size: 0.9375rem;
  line-height: 1.55;
`;

/** שורת כפתורים: הראשי מימין והמשני משמאלו */
export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 12px;
`;

const btn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.radius.button};
  font-family: inherit;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  cursor: pointer;
  transition: filter 0.12s ease, color 0.12s ease;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const PrimaryBtn = styled.button`
  ${btn}
  border: none;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};

  &:hover:not(:disabled) {
    filter: brightness(0.96);
  }
`;

export const PrimaryLink = styled(Link)`
  ${btn}
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    filter: brightness(0.96);
  }
`;

export const GhostBtn = styled.button`
  ${btn}
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.ink};
  }
`;

/* ───────── משוב: שורות דירוג בכוכבים ───────── */

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const RatingLabel = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Stars = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const StarButton = styled.button<{ $filled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  color: ${({ theme, $filled }) =>
    $filled ? theme.colors.star : theme.colors.divider};
  transition: color 0.12s ease, transform 0.12s ease;

  svg {
    width: 30px;
    height: 30px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

/* ───────── שיתוף: תיבת ההודעה ───────── */

export const MessageBox = styled.div`
  min-height: 96px;
  box-sizing: border-box;
  padding: 14px 16px;
  background: ${({ theme }) => theme.colors.bg};
  border: 1.5px solid ${({ theme }) => theme.colors.divider};
  border-radius: 12px;
  font-size: 0.9375rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.inkMuted};
  overflow-wrap: anywhere;
`;

export const CopiedNote = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.successSolid};
`;

export const CopyError = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.dangerSolid};
`;
