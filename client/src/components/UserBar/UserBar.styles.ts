import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.75rem 1rem;
  margin-top: 0.85rem;
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.muted};
`;

export const LogoutLink = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  text-decoration: underline;
  font-size: inherit;
  padding: 0;
  cursor: pointer;
`;

export const Strong = styled.strong`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;
