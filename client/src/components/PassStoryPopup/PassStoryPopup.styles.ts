import styled, { keyframes } from "styled-components";

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 210;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 1.25rem;
  overflow-y: auto;
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(2px);
`;

export const Modal = styled.div`
  position: relative;
  width: 100%;
  max-width: 24rem;
  margin: auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.card};
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.28);
  padding: 1.7rem 1.35rem 1.3rem;
  text-align: center;
  animation: ${popIn} 0.35s cubic-bezier(0.22, 1, 0.36, 1) both;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const Badge = styled.div`
  width: 4.2rem;
  height: 4.2rem;
  margin: 0 auto 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentGlow};
  color: ${({ theme }) => theme.colors.accent};

  svg {
    width: 2.15rem;
    height: 2.15rem;
  }
`;

export const Title = styled.h2`
  margin: 0 0 0.4rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Intro = styled.p`
  margin: 0 0 0.95rem;
  font-size: 0.95rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Close = styled.button`
  position: absolute;
  top: 0.75rem;
  inset-inline-end: 0.75rem;
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

  &:hover:not(:disabled) {
    filter: brightness(0.95);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

export const FieldWrap = styled.div`
  margin: 0 0 0.85rem;
  text-align: start;
`;

export const Skip = styled.button`
  width: 100%;
  margin-top: 0.15rem;
  padding: 0.55rem 1rem;
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
  margin: 0.2rem 0 0;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.success};
`;
