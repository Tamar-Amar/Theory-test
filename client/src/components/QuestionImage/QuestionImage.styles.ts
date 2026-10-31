import styled from "styled-components";

export const Figure = styled.figure`
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: stretch;
`;

export const FrameButton = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  border: 1.5px solid ${({ theme }) => theme.colors.divider};
  border-radius: ${({ theme }) => theme.radius.image};
  background: ${({ theme }) => theme.colors.bg};
  overflow: hidden;
  cursor: zoom-in;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.blue};
  }

  &:focus-visible {
    outline: none;
    border-color: ${({ theme }) => theme.colors.blue};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.blueTint};
  }
`;

export const Img = styled.img`
  display: block;
  width: 100%;
  max-height: 280px;
  object-fit: contain;
  background: ${({ theme }) => theme.colors.bg};
`;

export const ZoomBadge = styled.span`
  position: absolute;
  top: 0.7rem;
  left: 0.7rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  box-shadow: 0 2px 6px rgba(26, 29, 41, 0.13);

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const Caption = styled.figcaption`
  font-size: 0.8125rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  text-align: right;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(26, 29, 41, 0.78);
`;

export const OverlayImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: ${({ theme }) => theme.radius.image};
  background: ${({ theme }) => theme.colors.surface};
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.ink};
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(26, 29, 41, 0.2);

  svg {
    width: 1.35rem;
    height: 1.35rem;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.blueTint};
  }
`;
