import styled from "styled-components";

export const Row = styled.div`
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.muted};
  margin-bottom: 0.4rem;
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  font-family: inherit;
  box-sizing: border-box;

  &[data-multiline="true"] {
    min-height: 7rem;
    resize: vertical;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius.control};
  border: 1px solid ${({ theme }) => theme.colors.surface2};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
`;
