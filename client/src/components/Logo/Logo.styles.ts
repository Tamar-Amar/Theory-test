import styled from "styled-components";

export const Root = styled.span<{ $size: number }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ $size }) => $size * 0.3}px;
`;

export const Mark = styled.span<{ $size: number }>`
  display: inline-flex;
  flex-shrink: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  color: ${({ theme }) => theme.colors.blue};

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const Word = styled.span<{ $size: number }>`
  font-size: ${({ $size }) => $size * 0.6}px;
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.colors.ink};
`;
