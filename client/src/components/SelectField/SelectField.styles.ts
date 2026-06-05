import styled from "styled-components";

export const Wrap = styled.div`
  position: relative;
  width: 100%;
`;

export const Trigger = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid
    ${({ theme, $open }) =>
      $open ? theme.colors.accent : theme.colors.surface2};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-family: inherit;
  text-align: right;
  transition: border-color 0.12s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accentBorder};
  }
`;

export const Value = styled.span`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const Chevron = styled.span<{ $open: boolean }>`
  display: inline-flex;
  color: ${({ theme }) => theme.colors.muted};
  transition: transform 0.15s ease;
  transform: rotate(${({ $open }) => ($open ? "180deg" : "0deg")});

  svg {
    width: 1.1em;
    height: 1.1em;
  }
`;

export const Popup = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  inset-inline: 0;
  z-index: 40;
  margin: 0;
  padding: 0.3rem;
  list-style: none;
  max-height: 16rem;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  border-radius: ${({ theme }) => theme.radius.control};
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.18);
`;

export const Option = styled.li<{ $selected: boolean; $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.6rem 0.7rem;
  border-radius: ${({ theme }) => theme.radius.option};
  font-size: 0.98rem;
  cursor: pointer;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.accent : theme.colors.text};
  font-weight: ${({ $selected }) => ($selected ? 600 : 400)};
  background: ${({ theme, $selected, $active }) =>
    $selected || $active ? theme.colors.accentGlow : "transparent"};

  svg {
    width: 1.05em;
    height: 1.05em;
    flex: 0 0 auto;
  }
`;
