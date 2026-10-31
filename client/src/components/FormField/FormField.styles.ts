import styled from "styled-components";

export const Row = styled.div`
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.9375rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.ink};
  margin-bottom: 0.4rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.radius.field};
  border: 1.5px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &[data-multiline="true"] {
    min-height: 7rem;
    resize: vertical;
  }

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.blueTint};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.inkMuted};
    opacity: 0.85;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.875rem 1rem;
  border-radius: ${({ theme }) => theme.radius.field};
  border: 1.5px solid ${({ theme }) => theme.colors.divider};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  font-size: 1rem;
  transition: border-color 0.15s ease, box-shadow 0.15s ease;

  &:focus,
  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.blueTint};
  }
`;

export const PasswordWrap = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordInput = styled(Input)`
  padding-inline-end: 2.75rem;
`;

export const ToggleVisibility = styled.button`
  position: absolute;
  inset-inline-end: 0.15rem;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  padding: 0;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  border-radius: ${({ theme }) => theme.radius.control};

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;
