import styled from "styled-components";

/** עיגול אייקון בצ'יפ (28px) — רקע בהיר בצ'יפ רגיל, לבן בצ'יפ פעיל */
export const IconBubble = styled.span<{ $active?: boolean }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme, $active }) =>
    $active ? theme.colors.white : theme.colors.blueTint};

  img {
    display: block;
    width: 20px;
    height: 20px;
  }
`;

export const Root = styled.button<{ $active?: boolean }>`
  direction: rtl;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0.625rem 1.125rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1.5px solid
    ${({ theme, $active }) => ($active ? theme.colors.blue : theme.colors.divider)};
  background: ${({ theme, $active }) =>
    $active ? theme.colors.blue : theme.colors.surface};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.surface : theme.colors.ink};
  font-family: inherit;
  font-size: 0.9375rem;
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.blue};
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.blueTint};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
