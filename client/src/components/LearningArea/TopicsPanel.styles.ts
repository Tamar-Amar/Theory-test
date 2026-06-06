import styled from "styled-components";

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.35rem;
  width: 100%;
`;

export const PageHeader = styled.header`
  text-align: center;
`;

export const PageTitle = styled.h2`
  margin: 0 0 0.5rem;
  font-size: clamp(1.25rem, 3vw, 1.55rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

export const TopicsIntro = styled.p`
  margin: 0 auto;
  max-width: 38rem;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.muted};
  line-height: 1.65;
`;

export const TopicGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.15rem;
`;

export const TopicCard = styled.article<{
  $accent: string;
  $accentBg: string;
}>`
  position: relative;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.card};
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  background: ${({ theme }) => theme.colors.surface};
  padding: 1.15rem 1.2rem 1.25rem;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.04);

  &::before {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    background: ${({ $accent }) => $accent};
  }

  &::after {
    content: "";
    position: absolute;
    inset-inline-start: 0;
    top: 0;
    width: 100%;
    height: 4.5rem;
    background: linear-gradient(
      135deg,
      ${({ $accentBg }) => $accentBg} 0%,
      transparent 70%
    );
    pointer-events: none;
  }
`;

export const TopicCardHead = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  gap: 0.85rem;
  margin-bottom: 0.65rem;
`;

export const TopicIcon = styled.span`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: ${({ theme }) => theme.radius.control};
  background: rgba(255, 255, 255, 0.85);
  border: 1px solid ${({ theme }) => theme.colors.borderSubtle};
  font-size: 1.35rem;
  line-height: 1;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
`;

export const TopicHeadText = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

export const TopicNumber = styled.span<{ $accent: string }>`
  display: inline-flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  min-width: 1.45rem;
  height: 1.45rem;
  padding: 0 0.35rem;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ $accent }) => $accent};
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  line-height: 1;
`;

export const TopicTitle = styled.h3`
  margin: 0;
  font-size: clamp(1rem, 2.5vw, 1.12rem);
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.35;
`;

export const TopicSubtitle = styled.p`
  position: relative;
  z-index: 1;
  margin: 0 0 1rem;
  font-size: 0.9rem;
  line-height: 1.65;
  color: ${({ theme }) => theme.colors.muted};
`;

export const IncludesSection = styled.div`
  position: relative;
  z-index: 1;
  margin-bottom: 1.1rem;
`;

export const IncludesLabel = styled.h4<{ $accent: string }>`
  margin: 0 0 0.55rem;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.01em;
  color: ${({ $accent }) => $accent};
  text-transform: none;
`;

export const IncludesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const IncludesItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  font-size: 0.88rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.text};
`;

export const IncludesText = styled.span`
  flex: 1;
  min-width: 0;
`;

export const Bullet = styled.span<{ $accent: string }>`
  flex: 0 0 0.45rem;
  width: 0.45rem;
  height: 0.45rem;
  margin-top: 0.55rem;
  border-radius: 50%;
  background: ${({ $accent }) => $accent};
`;

export const PracticeBtn = styled.button<{ $accent: string }>`
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 2.65rem;
  padding: 0.55rem 1rem;
  border: none;
  border-radius: ${({ theme }) => theme.radius.control};
  background: ${({ $accent }) => $accent};
  color: #fff;
  font: inherit;
  font-size: 0.92rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    filter 0.15s ease;

  &:hover {
    filter: brightness(1.06);
    box-shadow: 0 4px 14px ${({ $accent }) => `${$accent}44`};
  }

  &:active {
    transform: scale(0.985);
  }

  &:focus-visible {
    outline: 2px solid ${({ $accent }) => $accent};
    outline-offset: 2px;
  }
`;
