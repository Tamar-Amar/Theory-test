import styled from "styled-components";

export const ReviewIntro = styled.p`
  margin: 0.65rem 0 0;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.45;
`;

export const ResultsActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  margin-top: 1.25rem;
`;
