import styled, { css } from "styled-components";

const pressable = css`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.75rem 1.25rem;
  border-radius: ${({ theme }) => theme.radius.control};
  border: none;
  font-size: 1rem;
  font-weight: 600;
  transition: transform 0.12s ease, filter 0.12s ease, opacity 0.12s ease;

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const Primary = styled.button`
  ${pressable}
  background: linear-gradient(
    160deg,
    ${({ theme }) => theme.colors.accent},
    ${({ theme }) => theme.colors.accentDim}
  );
  color: ${({ theme }) => theme.colors.white};
  width: 100%;
  margin-top: 0.25rem;

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
  color: ${({ theme }) => theme.colors.muted};
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  width: 100%;
  margin-top: 0.5rem;
`;

export const Secondary = styled.button`
  ${pressable}
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  flex: 1;
`;

export const ResultsPrimary = styled(Primary)`
  margin-top: 1.25rem;
`;
