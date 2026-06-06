import styled from "styled-components";

export const QuizBody = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 1.35rem;
  align-items: stretch;
  margin-top: 0.25rem;

  @media (max-width: 820px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

export const QuestionColumn = styled.div<{ $hasImage?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  min-width: 0;
  min-height: 100%;
  justify-content: ${({ $hasImage }) => ($hasImage ? "flex-start" : "center")};
  align-items: ${({ $hasImage }) => ($hasImage ? "stretch" : "center")};

  p {
    margin: 0;
    font-size: clamp(1rem, 2.2vw, 1.12rem);
    line-height: 1.5;
    text-align: ${({ $hasImage }) => ($hasImage ? "right" : "center")};
    max-width: ${({ $hasImage }) => ($hasImage ? "none" : "92%")};
  }

  figure {
    margin: 0;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  img {
    max-height: min(380px, 52vh);
  }

  @media (max-width: 820px) {
    min-height: auto;
    justify-content: flex-start;
    align-items: stretch;

    p {
      text-align: right;
      max-width: none;
    }
  }
`;

export const AnswersColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 0;
  min-height: 100%;
  padding-inline-start: 0.25rem;
  border-inline-start: 1px solid ${({ theme }) => theme.colors.borderSubtle};

  @media (max-width: 820px) {
    padding-inline-start: 0;
    border-inline-start: none;
    padding-top: 0.15rem;
    border-top: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  }
`;

export const AnswersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  width: 100%;
`;
