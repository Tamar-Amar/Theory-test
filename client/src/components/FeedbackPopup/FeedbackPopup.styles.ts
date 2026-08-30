import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 220;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1.25rem;
  overflow-y: auto;
  background: rgba(15, 23, 42, 0.55);
  backdrop-filter: blur(2px);
`;

export const Modal = styled.div`
  position: relative;
  width: 100%;
  max-width: 28rem;
  margin: auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.35);
  padding: 1.6rem 1.4rem 1.45rem;
`;

export const Title = styled.h2`
  margin: 0 0 0.4rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  padding-inline-end: 2rem;
`;

export const Intro = styled.p`
  margin: 0 0 1.15rem;
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Close = styled.button`
  position: absolute;
  top: 0.85rem;
  inset-inline-end: 0.85rem;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.1rem;
  line-height: 1;

  &:hover {
    filter: brightness(0.95);
  }
`;

export const RatingBlock = styled.fieldset`
  margin: 0 0 1rem;
  padding: 0;
  border: none;
`;

export const RatingLegend = styled.legend`
  display: block;
  float: none;
  width: 100%;
  padding: 0;
  margin: 0 0 0.4rem;
  font-size: 0.88rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Stars = styled.div`
  display: flex;
  direction: ltr;
  justify-content: flex-start;
  gap: 0.15rem;
`;

export const StarButton = styled.button<{ $filled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.35rem;
  height: 2.35rem;
  padding: 0;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background: transparent;
  color: ${({ theme, $filled }) =>
    $filled ? "#d97706" : theme.colors.surface2};
  transition: color 0.12s ease, transform 0.12s ease;

  svg {
    width: 1.7rem;
    height: 1.7rem;
  }

  &:hover {
    transform: scale(1.08);
  }
`;

export const CommentWrap = styled.div`
  margin: 0.35rem 0 0.85rem;
`;

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
`;

export const Skip = styled.button`
  width: 100%;
  padding: 0.65rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background: transparent;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 0.9rem;
  font-weight: 600;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const Thanks = styled.p`
  margin: 0.35rem 0 0;
  text-align: center;
  font-size: 1.05rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.success};
`;
