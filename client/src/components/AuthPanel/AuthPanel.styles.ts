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

export const ForgotLink = styled.button`
  display: block;
  margin: 0.35rem 0 0.75rem;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.accent};
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  cursor: pointer;
  text-align: start;

  &:hover {
    color: ${({ theme }) => theme.colors.accentDim};
  }
`;

export const ForgotTitle = styled.h2`
  margin: 0 0 0.35rem;
  font-size: 1.15rem;
  font-weight: 700;
`;

export const ForgotHint = styled.p`
  margin: 0 0 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.5;
`;

export const ForgotSuccess = styled.p`
  margin: 0 0 1rem;
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.55;
`;

export const ForgotBackLink = styled(Link)`
  display: block;
  margin-top: 0.85rem;
  text-align: center;
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    color: ${({ theme }) => theme.colors.accentDim};
  }
`;

export const ForgotPrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.control};
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.accentDim}
  );
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 1rem;
  text-decoration: none;
`;
