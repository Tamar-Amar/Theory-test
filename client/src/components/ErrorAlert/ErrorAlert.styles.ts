import styled from "styled-components";

export const Box = styled.div<{ $compact?: boolean }>`
  background: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.danger};
  padding: 0.75rem 1rem;
  border-radius: ${({ theme }) => theme.radius.control};
  font-size: 0.9rem;
  margin-bottom: ${({ $compact }) => ($compact ? "0.85rem" : "1rem")};
`;
