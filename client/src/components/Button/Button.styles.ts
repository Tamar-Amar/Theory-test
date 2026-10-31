import styled, { css } from "styled-components";

const pressable = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.9rem 1.5rem;
  border-radius: ${({ theme }) => theme.radius.button};
  border: none;
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.2;
  transition: transform 0.12s ease, filter 0.12s ease, background 0.12s ease,
    opacity 0.12s ease;

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const Primary = styled.button`
  ${pressable}
  background: ${({ theme }) => theme.colors.blue};
  color: ${({ theme }) => theme.colors.surface};
  width: 100%;
  margin-top: 0.25rem;

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const PrimaryInline = styled(Primary)`
  margin-top: 0;
  flex: 1;
`;

export const Ghost = styled.button`
  ${pressable}
  background: transparent;
  color: ${({ theme }) => theme.colors.inkMuted};
  width: 100%;
  margin-top: 0.5rem;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.ink};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const Secondary = styled.button`
  ${pressable}
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.blue};
  border: 1.5px solid ${({ theme }) => theme.colors.blue};
  flex: 1;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.blueTint};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const ResultsPrimary = styled(Primary)`
  margin-top: 1.25rem;
`;
