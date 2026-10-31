import styled, { css } from "styled-components";

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
`;

export const TopRow = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  flex-wrap: wrap;
`;

export const Stats = styled.div`
  display: flex;
  gap: 1.25rem;
  flex: 1 1 320px;

  & > * {
    flex: 1 1 0;
    min-width: 140px;
  }
`;

export const StatUnit = styled.span`
  font-size: 0.55em;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
`;

export const ReviewCard = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 20px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 600px) {
    padding: 1.5rem 1.25rem;
  }
`;

export const ReviewTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const ReviewIntro = styled.p`
  margin: 0 0 0.5rem;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
`;

export const ResultsActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-start;
  flex-wrap: wrap;

  /* מובייל: שני הכפתורים אחד מעל השני ברוחב מלא (הראשי למעלה) */
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: stretch;

    & > button {
      width: 100%;
    }
  }
`;

const actionBtn = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem 2rem;
  border-radius: ${({ theme }) => theme.radius.button};
  font-family: inherit;
  font-size: 1.0625rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.12s ease, background 0.12s ease;
`;

export const AgainButton = styled.button`
  ${actionBtn}
  border: none;
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};

  &:hover {
    filter: brightness(0.96);
  }
`;

export const HomeButton = styled.button`
  ${actionBtn}
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.blue};
  border: 1.5px solid ${({ theme }) => theme.colors.blue};

  &:hover {
    background: ${({ theme }) => theme.colors.blueTint};
  }
`;
