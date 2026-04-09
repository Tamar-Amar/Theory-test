import styled from "styled-components";

export const Tabs = styled.div`
  display: flex;
  gap: 0.35rem;
  margin-bottom: 1.15rem;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 0.55rem;
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.accentGlow : theme.colors.bg};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.muted};
  font-weight: 600;
  border-color: ${({ theme, $active }) =>
    $active ? theme.colors.accent : theme.colors.surface2};
`;
