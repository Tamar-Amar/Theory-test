import styled from "styled-components";
import * as FF from "../FormField/FormField.styles";

/** כרטיס הפנייה (Figma 10:790): רדיוס 24, ריפוד 32/40, מרווח 16 */
export const Card = styled.div`
  width: 100%;
  max-width: 560px;
  margin-inline: auto;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 40px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 24px;

  @media (max-width: 520px) {
    padding: 24px 20px;
  }
`;

export const Title = styled.h1`
  margin: 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const Intro = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.45;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
`;

/** שדות הטופס — המרווח בין שדות מגיע מ‑FormField (1rem) */
export const Fields = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Note = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
`;

export const Success = styled.p`
  margin: 0;
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.answer};
  background: ${({ theme }) => theme.colors.successTint};
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.successSolid};
  text-align: right;
`;

/** שדה התוכן — גובה 140px כמו בעיצוב (עדיין ניתן להגדלה אנכית) */
export const TextArea = styled(FF.Input)`
  height: 140px;
`;
