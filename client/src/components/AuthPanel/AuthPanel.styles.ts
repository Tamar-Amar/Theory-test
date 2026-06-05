import { Link } from "react-router-dom";
import styled from "styled-components";

export const FieldsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ConsentRow = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  margin: 0.25rem 0 1rem;
  font-size: 0.85rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.muted};
  cursor: pointer;
`;

export const ConsentCheckbox = styled.input`
  margin-top: 0.2rem;
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  accent-color: ${({ theme }) => theme.colors.accent};
  cursor: pointer;
`;

export const ConsentLink = styled(Link)`
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.accentDim};
  }
`;
