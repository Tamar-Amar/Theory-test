import { Link } from "react-router-dom";
import styled from "styled-components";

export const Panel = styled.div`
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.divider};
  border-radius: 24px;
  padding: 2.25rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.125rem;

  @media (max-width: 520px) {
    padding: 1.75rem 1.25rem;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  width: 100%;
`;

export const Heading = styled.h1`
  margin: 0.25rem 0 0;
  font-size: 1.625rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
  text-align: center;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: center;
`;

export const FieldsBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ForgotLink = styled.button`
  align-self: stretch;
  margin: -0.25rem 0 0;
  padding: 0;
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.blue};
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 500;
  text-align: start;
  cursor: pointer;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const ConsentRow = styled.label`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.875rem;
  line-height: 1.4;
  color: ${({ theme }) => theme.colors.inkMuted};
  cursor: pointer;
`;

export const ConsentCheckbox = styled.input`
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  accent-color: ${({ theme }) => theme.colors.blue};
  cursor: pointer;
`;

export const ConsentLink = styled(Link)`
  color: ${({ theme }) => theme.colors.blue};
  text-decoration: underline;
  text-underline-offset: 2px;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const BackLink = styled(Link)`
  align-self: stretch;
  text-align: start;
  color: ${({ theme }) => theme.colors.blue};
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const ForgotSuccess = styled.p`
  margin: 0;
  font-size: 0.95rem;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.ink};
  text-align: right;
`;

export const PrimaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 2rem;
  border-radius: ${({ theme }) => theme.radius.button};
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  font-size: 1.0625rem;
  text-decoration: none;

  &:hover {
    filter: brightness(0.96);
  }
`;
