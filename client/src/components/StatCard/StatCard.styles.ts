import styled from "styled-components";

export const Root = styled.div`
  /* הכרטיס תמיד RTL, גם כשהשורה שמחזיקה אותו בסדר LTR (עיגון סדר הכרטיסים) */
  direction: rtl;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: flex-start;
  padding: 1.25rem 1.5rem;
  border-radius: ${({ theme }) => theme.radius.stat};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.surface};
  text-align: right;
`;

export const Value = styled.span`
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.1;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Label = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
