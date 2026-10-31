import styled from "styled-components";

export const MainCard = styled.div`
  box-sizing: border-box;
  width: 100%;
  border-radius: 20px;
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 1.1rem;
  text-align: right;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const CardTitle = styled.h2`
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;

export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

/** הצ'יפים מסודרים משמאל לימין וצמודים לימין, כמו בפיגמה (הטקסט עצמו נשאר RTL) */
export const ChipGrid = styled.div`
  direction: ltr;
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: flex-end;
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.25rem;
`;

export const StartButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.button};
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-family: inherit;
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.12s ease;

  &:hover:not(:disabled) {
    filter: brightness(0.96);
  }
  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const MetaLine = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: center;
  margin-top: 1rem;
`;

export const MetaStrong = styled.strong`
  color: ${({ theme }) => theme.colors.ink};
`;

/** תיבת "מצב חכם" והכפתור בתוך הכרטיס — דסקטופ בלבד */
export const Inside = styled.div`
  display: contents;

  @media (max-width: 700px) {
    display: none;
  }
`;

/** אותם רכיבים מחוץ לכרטיס — מובייל בלבד */
export const Outside = styled.div`
  display: none;

  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 16px;

    button {
      width: 100%;
    }
  }
`;
