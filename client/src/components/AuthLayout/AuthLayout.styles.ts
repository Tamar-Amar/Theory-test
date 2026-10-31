import styled from "styled-components";

export const Screen = styled.div`
  position: relative;
  flex: 1 0 auto;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: clamp(2rem, 6vh, 4.5rem) 1.25rem 4rem;
  box-sizing: border-box;
`;

export const Deco = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;

  svg {
    position: absolute;
  }

  @media (max-width: 640px) {
    display: none;
  }
`;

export const Content = styled.div<{ $maxWidth: number }>`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: ${({ $maxWidth }) => $maxWidth}px;
`;
