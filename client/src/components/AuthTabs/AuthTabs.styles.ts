import styled from "styled-components";

/** בקרת מצב מגזרית (segmented) — רקע paper, הטאב הפעיל גלולה לבנה עם טקסט כחול */
export const Tabs = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  padding: 4px;
  gap: 0;
  border-radius: ${({ theme }) => theme.radius.button};
  background: ${({ theme }) => theme.colors.bg};
`;

export const Tab = styled.button<{ $active?: boolean }>`
  flex: 1 1 0;
  min-width: 0;
  padding: 0.625rem;
  border: none;
  border-radius: 10px;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.surface : "transparent"};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.blue : theme.colors.inkMuted};
  font-family: inherit;
  font-size: 1rem;
  font-weight: ${({ $active }) => ($active ? 600 : 400)};
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease;
  box-shadow: ${({ $active }) =>
    $active ? "0 1px 2px rgba(26, 29, 41, 0.08)" : "none"};
`;
