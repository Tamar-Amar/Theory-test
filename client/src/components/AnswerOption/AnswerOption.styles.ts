import styled from "styled-components";

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
`;

export const Label = styled.label<{ $selected?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  padding: 0.85rem 1rem;
  border-radius: ${({ theme }) => theme.radius.option};
  border: 2px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.accent : theme.colors.surface2};
  background: ${({ theme, $selected }) =>
    $selected ? theme.colors.accentGlow : theme.colors.bg};
  cursor: pointer;
  text-align: right;
  transition: border-color 0.15s ease, background 0.15s ease;

  &:hover {
    border-color: ${({ theme, $selected }) =>
      $selected ? theme.colors.accent : theme.colors.accentBorder};
  }
`;

export const Radio = styled.input`
  margin-top: 0.2rem;
  accent-color: ${({ theme }) => theme.colors.accent};
`;

export const OptionText = styled.span`
  flex: 1;
  font-size: 0.98rem;
`;
